import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { email } = await req.json();

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a2e; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #3b82f6); padding: 40px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 26px;">Welcome to NextDeveloper 🚀</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.7; color: #333;">
            Thanks for subscribing! You'll now receive updates on:
          </p>
          <ul style="font-size: 15px; line-height: 2; color: #444; padding-left: 20px;">
            <li>🛠 New templates & projects</li>
            <li>🤖 AI tools & automation tips</li>
            <li>📦 Exclusive product launches</li>
            <li>📚 Developer tutorials</li>
          </ul>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
        <div style="padding: 20px 30px; background: #f5f5f5; text-align: center; font-size: 12px; color: #999;">
          © NextDeveloper · nextdeveloper.in
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "NextDeveloper <noreply@nextdeveloper.in>",
        to: [email],
        subject: "Welcome to Next Developer 🚀",
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      throw new Error(data.message || "Failed to send welcome email");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("send-welcome-email error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
