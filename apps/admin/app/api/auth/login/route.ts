import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';
import pool from '../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const { rows } = await pool.query(
      'SELECT id, email, name, password_hash FROM admin_users WHERE email = $1',
      [email]
    );

    const user = rows[0];
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60,
      path: '/',
    });

    return res;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
