import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, ticketType, ticketSubject, ticketMessage } = await request.json();

    // ---------------------------------------------------------
    // 1. DISPATCH WHATSAPP NOTIFICATION (CallMeBot)
    // ---------------------------------------------------------
    
    const whatsappText = ` *New StackVura Ticket* \n\n*Client:* ${email}\n*Type:* ${ticketType}\n*Subject:* ${ticketSubject}\n\n*Message:*\n${ticketMessage}`;
    
    // URL-encode the text so spaces and special characters transmit safely over a GET request
    const encodedText = encodeURIComponent(whatsappText);
    
    // Construct the endpoint using your environment variables
    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.ADMIN_WHATSAPP_NUMBER}&text=${encodedText}&apikey=${process.env.CALLMEBOT_API_KEY}`;

    const whatsappPromise = fetch(callMeBotUrl);

    // ---------------------------------------------------------
    // 2. DISPATCH RESEND EMAIL
    // ---------------------------------------------------------
    const emailPromise = resend.emails.send({
      from: 'StackVura System <admin@stackvuratechnologies.online>',
      to: 'operation@stackvuratechnologies.online', 
      subject: `New Client Ticket [${ticketType.toUpperCase()}]: ${ticketSubject}`,
      html: `
        <div style="font-family: sans-serif; color: #0F172A;">
          <h2>New Support Ticket</h2>
          <p><strong>Client:</strong> ${email}</p>
          <p><strong>Category:</strong> ${ticketType}</p>
          <hr />
          <h3>Message:</h3>
          <p style="background: #F8FAFC; padding: 15px; border-radius: 5px;">${ticketMessage}</p>
        </div>
      `,
    });

    // Execute both network requests concurrently for maximum speed
    const [whatsappResult, emailResult] = await Promise.all([whatsappPromise, emailPromise]);

    // Log any silent failures to your Vercel console for easier debugging
    if (!whatsappResult.ok) {
      console.error("WhatsApp API Error: Status", whatsappResult.status);
    }
    if (emailResult.error) {
       console.error("Resend API Error:", emailResult.error.message);
    }

    return NextResponse.json({ success: true });
    
  } catch (err) {
    console.error("Critical Server Error:", err);
    return NextResponse.json({ error: 'Failed to process notifications' }, { status: 500 });
  }
}