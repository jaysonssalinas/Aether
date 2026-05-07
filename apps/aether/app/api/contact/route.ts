import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'jaysonssalinas@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interest, service, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const division = interest === 'celebrations' ? 'Aether Celebrations' : 'Aether Digital';
    const subject = `New inquiry from ${name} — ${division}`;

    const lines: string[] = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Division: ${division}`,
      service ? `Service: ${service}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      '',
      `Message:\n${message}`,
    ].filter(Boolean) as string[];

    await resend.emails.send({
      from: 'Aether Contact <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      text: lines.join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API]', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
