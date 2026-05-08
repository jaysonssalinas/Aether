import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import pool from '../../../lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await pool.query(`
    SELECT
      c.id,
      c.name,
      c.email,
      c.phone,
      c.address,
      c.notes,
      c.created_at,
      COUNT(s.id) FILTER (WHERE s.status = 'active') AS active_subscriptions,
      COALESCE(SUM(s.monthly_amount) FILTER (WHERE s.status = 'active'), 0) AS monthly_total
    FROM customers c
    LEFT JOIN subscriptions s ON s.customer_id = c.id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `);

  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, email, phone, address, notes } = await req.json();

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const result = await pool.query(
    `INSERT INTO customers (name, email, phone, address, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email ?? null, phone ?? null, address ?? null, notes ?? null]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
