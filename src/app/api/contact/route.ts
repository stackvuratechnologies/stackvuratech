import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body;
    
    let content = '';

    // Format the payload based on whether it came from the Booking Modal or the Contact Form
    if (type === 'booking') {
      content = `📅 **New Consultation Booking**\n**Name:** \`${data.fullName}\`\n**Phone:** \`${data.phone}\`\n**Service:** ${data.service}\n**Date:** ${data.date}\n**Time:** ${data.time}`;
    } else {
      content = `📬 **New Project Inquiry**\n**Contact:** \`${data.contactName}\`\n**Company:** ${data.companyName || '*None*'}\n**Email:** \`${data.email}\`\n**Service Needed:** ${data.service}\n**Project Details:**\n\`\`\`text\n${data.details}\n\`\`\``;
    }

    // Securely transmit to Discord without exposing the webhook URL to the browser
    const discordRes = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });

    if (!discordRes.ok) {
      throw new Error('Failed to transmit to Discord Operations channel.');
    }

    return NextResponse.json({ success: true, message: 'Lead successfully captured.' });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}