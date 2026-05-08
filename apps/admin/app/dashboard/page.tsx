import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth';
import { AdminSidebar } from '../../components/AdminSidebar';

interface DashboardData {
  mrr: number;
  totalCustomers: number;
  renewalDue: number;
  revenueByProduct: { name: string; division: string; amount: number }[];
  renewalAlerts: {
    id: number;
    customer_name: string;
    product_name: string;
    monthly_amount: number;
    renewal_date: string;
    status: string;
  }[];
}

async function getDashboardData(): Promise<DashboardData> {
  const res = await fetch('http://localhost:3003/api/dashboard', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load dashboard data');
  return res.json();
}

const card: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: '10px',
  boxShadow: 'var(--card-shadow)',
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  let data: DashboardData;
  try {
    data = await getDashboardData();
  } catch {
    data = { mrr: 0, totalCustomers: 0, renewalDue: 0, revenueByProduct: [], renewalAlerts: [] };
  }
  const { mrr, totalCustomers, renewalDue, revenueByProduct, renewalAlerts } = data;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                Overview
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
                Welcome back, {session.name}.
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
              {new Date().toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl" style={card}>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>
                Monthly Recurring Revenue
              </p>
              <p className="text-3xl font-semibold" style={{ color: 'var(--color-text)' }}>
                ₱{mrr.toLocaleString()}
              </p>
              <p className="text-xs mt-1.5" style={{ color: 'var(--color-subtle)' }}>All products</p>
            </div>

            <div className="p-6 rounded-xl" style={card}>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>
                Total Customers
              </p>
              <p className="text-3xl font-semibold" style={{ color: 'var(--color-text)' }}>
                {totalCustomers}
              </p>
              <p className="text-xs mt-1.5" style={{ color: 'var(--color-subtle)' }}>Active subscriptions</p>
            </div>

            <div
              className="p-6 rounded-xl"
              style={{
                ...card,
                border: renewalDue > 0
                  ? '1px solid rgba(239,68,68,0.3)'
                  : '1px solid var(--color-border)',
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>
                Due for Renewal
              </p>
              <p
                className="text-3xl font-semibold"
                style={{ color: renewalDue > 0 ? 'var(--color-danger)' : 'var(--color-text)' }}
              >
                {renewalDue}
              </p>
              <p className="text-xs mt-1.5" style={{ color: 'var(--color-subtle)' }}>Next 30 days</p>
            </div>
          </div>

          {/* Revenue by Product */}
          <div className="p-6 rounded-xl" style={card}>
            <p className="text-xs font-medium uppercase tracking-wider mb-5" style={{ color: 'var(--color-muted)' }}>
              Revenue by Product
            </p>
            <div className="flex flex-col gap-3">
              {revenueByProduct.filter((item) => item.amount > 0).map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="w-44 text-xs truncate" style={{ color: 'var(--color-muted)' }}>
                    {item.name}
                  </div>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-border)' }}>
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${mrr > 0 ? (item.amount / mrr) * 100 : 0}%`,
                        background: item.division === 'digital' ? 'var(--color-accent)' : '#8b5cf6',
                      }}
                    />
                  </div>
                  <div className="w-24 text-right text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    ₱{item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              {mrr === 0 && (
                <p className="text-sm text-center py-4" style={{ color: 'var(--color-subtle)' }}>
                  No active subscriptions yet.
                </p>
              )}
            </div>
          </div>

          {/* Renewal Alerts */}
          {renewalAlerts.length > 0 && (
            <div
              className="p-6 rounded-xl"
              style={{ ...card, border: '1px solid rgba(239,68,68,0.25)' }}
            >
              <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: 'var(--color-danger)' }}>
                Renewal Alerts — Next 30 Days
              </p>
              <div className="flex flex-col">
                {renewalAlerts.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between py-3"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        {c.customer_name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                        {c.product_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: 'var(--color-danger)' }}>
                        {new Date(c.renewal_date).toLocaleDateString('en-PH')}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                        ₱{c.monthly_amount.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
