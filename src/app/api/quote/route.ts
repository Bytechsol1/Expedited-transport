import nodemailer from "nodemailer";

export const runtime = "nodejs";

type QuotePayload = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  companyName?: string;
  serviceNeeded?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as QuotePayload;

    const fullName = (payload.fullName ?? "").trim();
    const phoneNumber = (payload.phoneNumber ?? "").trim();
    const email = (payload.email ?? "").trim();
    const companyName = (payload.companyName ?? "").trim();
    const serviceNeeded = (payload.serviceNeeded ?? "").trim();
    const message = (payload.message ?? "").trim();

    if (!fullName || !phoneNumber || !email || !companyName || !serviceNeeded || !message) {
      return Response.json({ ok: false, error: "All fields are required." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const secure = (process.env.SMTP_SECURE ?? "true").toLowerCase() !== "false";
    const port = Number(process.env.SMTP_PORT ?? (secure ? "465" : "587"));
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.QUOTE_TO_EMAIL || "c.taveras@expeditedtransportservices.net";

    if (!host || !port || !user || !pass || !from) {
      return Response.json(
        {
          ok: false,
          error:
            "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, and QUOTE_TO_EMAIL in Vercel.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const subject = `Quote Request${serviceNeeded ? ` - ${serviceNeeded}` : ""}`;
    const text = [
      `Full Name: ${fullName}`,
      `Phone Number: ${phoneNumber}`,
      `Email: ${email}`,
      `Company Name: ${companyName}`,
      `Service Needed: ${serviceNeeded}`,
      "",
      `Message: ${message}`,
    ].join("\n");

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html: `
        <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
          <h2 style="margin: 0 0 16px;">Quote Request</h2>
          <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 720px;">
            <tr><td style="padding: 8px 0; font-weight: 700; width: 180px;">Full Name</td><td style="padding: 8px 0;">${fullName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Phone Number</td><td style="padding: 8px 0;">${phoneNumber}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Company Name</td><td style="padding: 8px 0;">${companyName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Service Needed</td><td style="padding: 8px 0;">${serviceNeeded}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message.replace(/\n/g, "<br />")}</td></tr>
          </table>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send email.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}


