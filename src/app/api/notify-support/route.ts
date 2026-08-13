import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API Key (Ensure this is in your .env.local file)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, ticketType, ticketSubject, ticketMessage } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'StackVura System <admin@stackvuratechnologies.online>',
      to: 'operation@stackvuratechnologies.online', // Your central operations inbox
      subject: `New Client Ticket [${ticketType.toUpperCase()}]: ${ticketSubject}`,
      html: `
        <div style="font-family: sans-serif; color: #0F172A;">
          <h2>New Support Ticket Logged</h2>
          <p><strong>Client Email:</strong> ${email}</p>
          <p><strong>Category:</strong> ${ticketType}</p>
          <hr />
          <h3>Message:</h3>
          <p style="background: #F8FAFC; padding: 15px; border-radius: 5px;">
            ${ticketMessage}
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}