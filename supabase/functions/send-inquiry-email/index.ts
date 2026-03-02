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

    const { name, email, project_type, budget_range, message } = await req.json();

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #3b82f6); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">🚀 New Project Inquiry</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">nextdeveloper.in</p>
        </div>
        <div style="padding: 30px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #888; width: 130px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #fff; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #888;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #888;">Project Type</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #fff;">${project_type || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #888;">Budget</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1e1e2e; color: #fff;">${budget_range || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #fff; line-height: 1.6;">${message}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 20px 30px; background: #0d0d14; text-align: center; font-size: 12px; color: #555;">
          Sent from nextdeveloper.in inquiry form
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
        to: ["nextdeveloperx@gmail.com"],
        subject: "New Inquiry from nextdeveloper.in",
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("send-inquiry-email error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
