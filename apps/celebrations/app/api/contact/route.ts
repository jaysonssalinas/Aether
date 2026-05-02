import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, eventType, date, message } = body;
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    console.log('Celebrations inquiry:', { name, email, eventType, date, message });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
