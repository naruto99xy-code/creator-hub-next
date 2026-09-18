import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function getAuthenticatedUserId(req: Request, anonClient: ReturnType<typeof createClient>): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await anonClient.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { product_id } = await req.json();

    if (!product_id) {
      return new Response(JSON.stringify({ error: "Missing product_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
    const adminClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const userId = await getAuthenticatedUserId(req, anonClient);

    const { data: product, error: productError } = await adminClient
      .from("products")
      .select("id, title, price, file_url, is_active")
      .eq("id", product_id)
      .eq("is_active", true)
      .single();

    if (productError || !product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!product.file_url) {
      return new Response(JSON.stringify({ error: "No file attached to this product" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let authorized = Number(product.price) === 0;

    if (!authorized && userId) {
      const { data: isAdmin } = await adminClient.rpc("has_role", { _user_id: userId, _role: "admin" });
      if (isAdmin) authorized = true;
    }

    if (!authorized && userId) {
      const { data: purchase } = await adminClient
        .from("purchases")
        .select("id")
        .eq("user_id", userId)
        .eq("product_name", product.title)
        .eq("payment_status", "paid")
        .limit(1)
        .maybeSingle();
      if (purchase) authorized = true;
    }

    if (!authorized) {
      return new Response(JSON.stringify({ error: "Purchase required to download this product" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: signed, error: signError } = await adminClient.storage
      .from("product-files")
      .createSignedUrl(product.file_url, 600);

    if (signError || !signed?.signedUrl) {
      console.error("Sign error:", signError);
      return new Response(JSON.stringify({ error: "Failed to generate download link" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ file_url: signed.signedUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
