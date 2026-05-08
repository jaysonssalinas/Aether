import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import pool from '../../../../lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const customerResult = await pool.query(
    'SELECT * FROM customers WHERE id = $1',
    [id]
  );

  if (customerResult.rows.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const subscriptionsResult = await pool.query(
    `SELECT s.*, p.name AS product_name, p.division
     FROM subscriptions s
     JOIN products p ON p.id = s.product_id
     WHERE s.customer_id = $1
     ORDER BY s.created_at DESC`,
    [id]
  );

  return NextResponse.json({
    ...customerResult.rows[0],
    subscriptions: subscriptionsResult.rows,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { name, email, phone, address, notes } = await req.json();

  const result = await pool.query(
    `UPDATE customers
     SET name = $1, email = $2, phone = $3, address = $4, notes = $5
     WHERE id = $6
     RETURNING *`,
    [name, email ?? null, phone ?? null, address ?? null, notes ?? null, id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  await pool.query('DELETE FROM customers WHERE id = $1', [id]);

  return NextResponse.json({ success: true });
}
