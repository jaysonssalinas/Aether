import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'aether-admin-secret-change-in-production';
const SESSION_DURATION = 8 * 60 * 60; // 8 hours in seconds

export interface AdminUser {
  id: number;
  email: string;
  name: string;
}

export function signToken(user: AdminUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: SESSION_DURATION });
}

export async function getSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return null;
    const payload = jwt.verify(token, JWT_SECRET) as AdminUser;
    return payload;
  } catch {
    return null;
  }
}

export function verifyToken(token: string): AdminUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminUser;
  } catch {
    return null;
  }
}
