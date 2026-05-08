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
  const res = await fetch('http://localhost:3003/api/dashboard', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to load dashboard data');
  return res.json();
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const data = await getDashboardData();
  const { mrr, totalCustomers, renewalDue, revenueByProduct, renewalAlerts } = data;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: '#070707' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>Overview</h1>
              <p className="text-sm mt-1" style={{ color: '#666666' }}>Welcome back, {session.name}.</p>
            </div>
            <p className="text-xs" style={{ color: '#444444' }}>
              {new Date().toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Big metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-8 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: '#666666' }}>Monthly Recurring Revenue</p>
              <p className="text-4xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", background: 'linear-gradient(135deg,#ff1493,#6a4c93)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ₱{mrr.toLocaleString()}
              </p>
              <p className="text-xs mt-2" style={{ color: '#444444' }}>MRR · All products</p>
            </div>
            <div className="p-8 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: '#666666' }}>Total Customers</p>
              <p className="text-4xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>{totalCustomers}</p>
              <p className="text-xs mt-2" style={{ color: '#444444' }}>Active subscriptions</p>
            </div>
            <div className="p-8 rounded-lg" style={{ background: '#0f0f0f', border: renewalDue > 0 ? '1px solid rgba(255,64,129,0.3)' : '1px solid #1e1e1e' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: '#666666' }}>Due for Renewal</p>
              <p className="text-4xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: renewalDue > 0 ? '#ff4081' : '#f5f5f0' }}>{renewalDue}</p>
              <p className="text-xs mt-2" style={{ color: '#444444' }}>Next 30 days</p>
            </div>
          </div>

          {/* Revenue breakdown */}
          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: '#666666' }}>Revenue by Product</p>
            <div className="flex flex-col gap-3">
              {revenueByProduct.filter((item) => item.amount > 0).map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="w-40 text-xs truncate" style={{ color: '#888888' }}>{item.name}</div>
                  <div className="flex-1 h-2 rounded-full" style={{ background: '#1a1a1a' }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${mrr > 0 ? (item.amount / mrr) * 100 : 0}%`,
                        background: item.division === 'digital' ? '#ff1493' : '#6a4c93',
                      }}
                    />
                  </div>
                  <div className="w-24 text-right text-sm font-medium" style={{ color: '#f5f5f0' }}>
                    ₱{item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              {mrr === 0 && (
                <p className="text-sm text-center py-4" style={{ color: '#444444' }}>
                  No active subscriptions yet. Add customers to start tracking MRR.
                </p>
              )}
            </div>
          </div>

          {/* Renewal alerts */}
          {renewalAlerts.length > 0 && (
            <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid rgba(255,64,129,0.2)' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: '#ff4081' }}>Renewal Alerts — Next 30 Days</p>
              <div className="flex flex-col gap-3">
                {renewalAlerts.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1e1e1e' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{c.customer_name}</p>
                      <p className="text-xs" style={{ color: '#666666' }}>{c.product_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: '#ff4081' }}>
                        {new Date(c.renewal_date).toLocaleDateString('en-PH')}
                      </p>
                      <p className="text-xs" style={{ color: '#666666' }}>₱{c.monthly_amount.toLocaleString()}/mo</p>
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
