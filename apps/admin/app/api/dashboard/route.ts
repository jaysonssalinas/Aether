import { NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import pool from '../../../lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [summaryResult, revenueResult, renewalsResult] = await Promise.all([
    pool.query('SELECT * FROM mrr_summary'),
    pool.query('SELECT * FROM revenue_by_product LIMIT 10'),
    pool.query(`
      SELECT
        s.id,
        c.name AS customer_name,
        p.name AS product_name,
        s.monthly_amount,
        s.renewal_date,
        s.status
      FROM subscriptions s
      JOIN customers c ON c.id = s.customer_id
      JOIN products p ON p.id = s.product_id
      WHERE s.status = 'active'
        AND s.renewal_date <= CURRENT_DATE + INTERVAL '30 days'
      ORDER BY s.renewal_date ASC
      LIMIT 10
    `),
  ]);

  const summary = summaryResult.rows[0] ?? {
    total_mrr: 0,
    total_customers: 0,
    renewals_due_30d: 0,
  };

  return NextResponse.json({
    mrr: Number(summary.total_mrr ?? 0),
    totalCustomers: Number(summary.total_customers ?? 0),
    renewalDue: Number(summary.renewals_due_30d ?? 0),
    revenueByProduct: revenueResult.rows.map((r) => ({
      name: r.product_name,
      division: r.division,
      amount: Number(r.monthly_revenue ?? 0),
      customerCount: Number(r.customer_count ?? 0),
    })),
    renewalAlerts: renewalsResult.rows,
  });
}
