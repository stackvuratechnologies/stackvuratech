import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name, message } = await request.json();

    // Validate the incoming payload
    if (!email || !name || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, or message' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'StackVura Technologies <admin@stackvuratechnologies.online>',
      to: email, // Sending directly to the client's provided email
      subject: `Project Update for ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #0F172A; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #1E3A8A; margin-bottom: 20px;">Project Update</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <div style="background-color: #F8FAFC; padding: 15px; border-left: 4px solid #1E3A8A; margin: 20px 0; border-radius: 4px; line-height: 1.6;">
            ${message.replace(/\n/g, '<br />')}
          </div>
          <p style="margin-top: 30px; font-size: 14px; color: #64748B;">
            Best regards,<br/>
            <strong>The StackVura Engineering Team</strong><br/>
            <a href="https://stackvuratechnologies.online" style="color: #1E3A8A; text-decoration: none;">stackvuratechnologies.online</a>
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error while dispatching email.' },
      { status: 500 }
    );
  }
}