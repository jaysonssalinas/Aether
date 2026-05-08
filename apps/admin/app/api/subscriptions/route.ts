import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import pool from '../../../lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const result = await pool.query(`
      SELECT
        s.id,
        s.customer_id,
        s.product_id,
        s.monthly_amount,
        s.start_date,
        s.renewal_date,
        s.status,
        s.notes,
        s.created_at,
        c.name AS customer_name,
        p.name AS product_name,
        p.division
      FROM subscriptions s
      JOIN customers c ON c.id = s.customer_id
      JOIN products p ON p.id = s.product_id
      ORDER BY s.renewal_date ASC
    `);

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('[subscriptions GET]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { customer_id, product_id, monthly_amount, start_date, renewal_date, notes } =
    await req.json();

  if (!customer_id || !product_id || !start_date || !renewal_date) {
    return NextResponse.json(
      { error: 'customer_id, product_id, start_date, and renewal_date are required' },
      { status: 400 }
    );
  }

  if (monthly_amount !== undefined && (typeof monthly_amount !== 'number' || monthly_amount < 0)) {
    return NextResponse.json(
      { error: 'monthly_amount must be a non-negative number' },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `INSERT INTO subscriptions (customer_id, product_id, monthly_amount, start_date, renewal_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [customer_id, product_id, monthly_amount ?? 0, start_date, renewal_date, notes ?? null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error('[subscriptions POST]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
