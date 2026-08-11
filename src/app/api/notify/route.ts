import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name, message } = await request.json();

    const data = await resend.emails.send({
      from: 'StackVura Architecture <admin@stackvuratechnologies.online>',
      to: email,
      subject: 'StackVura Technologies - Project Update',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1e3a8a; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Project Status Update</h2>
          </div>
          <div style="padding: 30px; background-color: #f8fafc; color: #334155;">
            <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #475569;">${message}</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #cbd5e1; font-size: 12px; color: #64748b; text-align: center;">
              <p>StackVura Technologies | Enterprise Cloud & Software</p>
              <p>Machakos, Kenya</p>
            </div>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
