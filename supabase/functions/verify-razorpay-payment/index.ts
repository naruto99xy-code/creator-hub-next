import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function verifySignature(orderId: string, paymentId: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const data = encoder.encode(`${orderId}|${paymentId}`);
  const sig = await crypto.subtle.sign("HMAC", key, data);
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex === signature;
}

async function sendTelegramNotification(
  productName: string,
  userName: string,
  userMobile: string,
  paymentId: string,
  orderId: string,
  amount: number
) {
  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

  if (!botToken || !chatId) {
    console.warn("Telegram credentials not configured, skipping notification");
    return;
  }

  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const message = `🎉 *New Payment Received*

📦 *Product:* ${productName}
👤 *Name:* ${userName}
📱 *Mobile:* ${userMobile}
💳 *Payment ID:* \`${paymentId}\`
🧾 *Order ID:* \`${orderId}\`
💰 *Amount:* ₹${amount}
🌐 *Source:* nextdeveloper.in
🕐 *Time:* ${now}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram send failed:", err);
    }
  } catch (err) {
    console.error("Telegram error:", err);
  }
}

async function getAuthenticatedUserId(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return null;
    return data.user.id;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract authenticated user ID if available (supports guest checkout too)
    const authenticatedUserId = await getAuthenticatedUserId(req);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, product_name, amount, user_name, user_mobile } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: "Missing payment details" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const secret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
    const isValid = await verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature, secret);

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Payment verification failed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Store purchase using service role
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: insertError } = await adminClient.from("purchases").insert({
      user_id: authenticatedUserId || null,
      product_name: product_name || "Unknown Product",
      amount: amount || 0,
      razorpay_order_id,
      razorpay_payment_id,
      payment_status: "paid",
    });

    if (insertError) {
      console.error("Insert error:", insertError);
    }

    // Send Telegram notification
    await sendTelegramNotification(
      product_name || "Unknown",
      user_name || "N/A",
      user_mobile || "N/A",
      razorpay_payment_id,
      razorpay_order_id,
      amount || 0
    );

    return new Response(JSON.stringify({ success: true }), {
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
