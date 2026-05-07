import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'jaysonssalinas@gmail.com';

export async function POST(req: NextRequest) {
  let body: {
    name?: unknown; email?: unknown; phone?: unknown;
    interest?: unknown; service?: unknown; budget?: unknown;
    timeline?: unknown; message?: unknown;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined;
    const interest = typeof body.interest === 'string' ? body.interest : undefined;
    const service = typeof body.service === 'string' ? body.service.trim() : undefined;
    const budget = typeof body.budget === 'string' ? body.budget.trim() : undefined;
    const timeline = typeof body.timeline === 'string' ? body.timeline.trim() : undefined;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
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

    const { error } = await resend.emails.send({
      from: 'Aether Contact <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      text: lines.join('\n'),
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API]', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
