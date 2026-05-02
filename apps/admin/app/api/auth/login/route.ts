import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';

// Hardcoded admin credentials — replace with DB lookup in production
const ADMIN_USERS = [
  {
    id: 1,
    email: 'jayson@aether.com.ph',
    name: 'Jayson Salinas',
    passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhjW', // "aether2026"
  },
  {
    id: 2,
    email: 'remlyn@aether.com.ph',
    name: 'Remlyn Salinas',
    passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhjW', // "aether2026"
  },
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = ADMIN_USERS.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60,
      path: '/',
    });

    return res;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
