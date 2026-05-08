import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import { products } from '@aether/config/products';
import pool from '../../../lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const result = await pool.query(
      'SELECT id, name, starting_price AS "startingPrice", max_price AS "maxPrice", frequency, division, category, featured FROM products ORDER BY division, category, name'
    );
    if (result.rows.length > 0) return NextResponse.json(result.rows);
  } catch {
    // DB not ready — fall through to static config
  }

  return NextResponse.json(products);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { productId, startingPrice, maxPrice } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    // Fetch old values for audit log
    const oldResult = await pool.query(
      'SELECT starting_price, max_price FROM products WHERE id = $1',
      [productId]
    );
    const oldRow = oldResult.rows[0];
    const oldStartingPrice = oldRow?.starting_price || null;
    const oldMaxPrice = oldRow?.max_price || null;

    // Update products with new prices and updated_by
    await pool.query(
      `UPDATE products
       SET starting_price = $1, max_price = $2, updated_by = $3, updated_at = NOW()
       WHERE id = $4`,
      [startingPrice ?? null, maxPrice ?? null, session.id, productId]
    );

    // Log the change with changed_by
    await pool.query(
      `INSERT INTO price_change_log (product_id, changed_by, old_starting_price, new_starting_price, old_max_price, new_max_price)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [productId, session.id, oldStartingPrice, startingPrice ?? null, oldMaxPrice, maxPrice ?? null]
    );

    return NextResponse.json({ success: true, productId, startingPrice, maxPrice });
  } catch (err) {
    console.error('[Pricing PUT]', err);
    return NextResponse.json({ error: 'Failed to update pricing' }, { status: 500 });
  }
}
