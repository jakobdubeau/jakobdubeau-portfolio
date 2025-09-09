import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, subject, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["jakobdubeau@gmail.com"],
      reply_to: [email],
      subject: `Portfolio Contact: ${subject}`,
      html: `<div><h3>New message from ${email}</h3><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message}</p></div>`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
