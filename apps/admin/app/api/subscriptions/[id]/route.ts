import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import pool from '../../../../lib/db';

const VALID_STATUSES = ['active', 'paused', 'cancelled'];

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { monthly_amount, renewal_date, status, notes } = await req.json();

  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const result = await pool.query(
      `UPDATE subscriptions
       SET monthly_amount = $1,
           renewal_date   = $2,
           status         = $3,
           notes          = $4,
           updated_at     = NOW()
       WHERE id = $5
       RETURNING *`,
      [monthly_amount, renewal_date, status, notes ?? null, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error('[subscriptions/[id] PUT]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const result = await pool.query('DELETE FROM subscriptions WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[subscriptions/[id] DELETE]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
