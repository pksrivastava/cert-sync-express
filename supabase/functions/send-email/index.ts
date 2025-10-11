import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Simple email sending without external dependencies
// For production, you'll need to add your RESEND_API_KEY as a secret

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  type?: "registration" | "approval" | "rejection";
  partnerName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, type, partnerName }: EmailRequest = await req.json();

    console.log(`Sending ${type || 'general'} email to:`, to);

    // Determine the email content based on type
    let emailHtml = html;
    let emailSubject = subject;

    if (type === "registration") {
      emailSubject = "Registration Confirmation - iGOT Karmayogi Bharat Partner Platform";
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Thank you for registering, ${partnerName}!</h1>
          <p>We have received your partner registration request for the iGOT Karmayogi Bharat platform.</p>
          <p>Our team will review your application and get back to you within 2-3 business days.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #1f2937;">What happens next?</h2>
            <ol style="color: #4b5563;">
              <li>Our team reviews your application</li>
              <li>We may contact you for additional information</li>
              <li>Once approved, you'll receive onboarding instructions</li>
            </ol>
          </div>

          <p>If you have any questions, please contact us at <a href="mailto:partners@igot.gov.in">partners@igot.gov.in</a></p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            iGOT Karmayogi Bharat Team
          </p>
        </div>
      `;
    } else if (type === "approval") {
      emailSubject = "Congratulations! Your Partner Application is Approved";
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Welcome to iGOT Karmayogi Bharat, ${partnerName}!</h1>
          <p>We're excited to inform you that your partner application has been <strong>approved</strong>!</p>
          
          <div style="background-color: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h2 style="margin-top: 0; color: #065f46;">Next Steps</h2>
            <ul style="color: #047857;">
              <li>Access your partner dashboard to upload courses</li>
              <li>Configure your SSO integration</li>
              <li>Set up your certificate templates</li>
              <li>Configure payment and revenue sharing settings</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get('SITE_URL') || 'https://yourdomain.com'}/admin" 
               style="background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Access Partner Dashboard
            </a>
          </div>

          <p>Need help? Check out our <a href="${Deno.env.get('SITE_URL') || 'https://yourdomain.com'}/knowledge-centre">Knowledge Centre</a> for API documentation and integration guides.</p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            iGOT Karmayogi Bharat Team
          </p>
        </div>
      `;
    } else if (type === "rejection") {
      emailSubject = "Update on Your Partner Application";
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Thank you for your interest, ${partnerName}</h1>
          <p>Thank you for your interest in partnering with iGOT Karmayogi Bharat.</p>
          
          <p>After careful review, we regret to inform you that we are unable to approve your partner application at this time.</p>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              This decision doesn't reflect the quality of your offerings. We encourage you to reapply in the future as our partnership criteria may evolve.
            </p>
          </div>

          <p>If you have questions about this decision or would like feedback, please contact us at <a href="mailto:partners@igot.gov.in">partners@igot.gov.in</a></p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            iGOT Karmayogi Bharat Team
          </p>
        </div>
      `;
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "iGOT Karmayogi Bharat <onboarding@resend.dev>",
        to: [to],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
