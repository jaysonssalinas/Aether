import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import { products } from '@aether/config/products';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(products);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { productId, startingPrice, maxPrice } = await req.json();

    // In production: persist to DB
    // For now: log the change and return success
    console.log(`[Pricing Update] User: ${session.email} | Product: ${productId} | Starting: ${startingPrice} | Max: ${maxPrice} | At: ${new Date().toISOString()}`);

    return NextResponse.json({ success: true, productId, startingPrice, maxPrice });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
