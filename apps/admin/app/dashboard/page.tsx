import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth';
import { AdminSidebar } from '../../components/AdminSidebar';

// Mock data — replace with real DB queries once PostgreSQL is set up
const mockData = {
  mrr: 7500,
  totalCustomers: 5,
  renewalDue: 2,
  revenueByProduct: [
    { name: 'Website Maintenance', amount: 4500, color: '#ff1493' },
    { name: 'Printing System', amount: 1500, color: '#ff4081' },
    { name: 'Inventory System', amount: 1500, color: '#6a4c93' },
    { name: 'Celebrations', amount: 0, color: '#a07cc8' },
  ],
  customers: [
    { name: 'Rimando Law Office', product: 'Website Maintenance', amount: 1500, renewal: '2026-06-01', status: 'active' },
    { name: 'Client B', product: 'Website Maintenance', amount: 1500, renewal: '2026-05-15', status: 'due' },
    { name: 'Client C', product: 'Printing System Maintenance', amount: 1500, renewal: '2026-07-01', status: 'active' },
    { name: 'Client D', product: 'Website Maintenance', amount: 1500, renewal: '2026-05-20', status: 'due' },
    { name: 'Client E', product: 'Inventory System Maintenance', amount: 1500, renewal: '2026-08-01', status: 'active' },
  ],
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const { mrr, totalCustomers, renewalDue, revenueByProduct, customers } = mockData;
  const dueCustomers = customers.filter((c) => c.status === 'due');

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
            <p className="text-xs" style={{ color: '#444444' }}>May 2026</p>
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
              {revenueByProduct.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="w-32 text-xs" style={{ color: '#888888' }}>{item.name}</div>
                  <div className="flex-1 h-2 rounded-full" style={{ background: '#1a1a1a' }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${mrr > 0 ? (item.amount / mrr) * 100 : 0}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                  <div className="w-20 text-right text-sm font-medium" style={{ color: '#f5f5f0' }}>
                    {item.amount > 0 ? `₱${item.amount.toLocaleString()}` : '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Renewal alerts */}
          {dueCustomers.length > 0 && (
            <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid rgba(255,64,129,0.2)' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: '#ff4081' }}>⚠ Renewal Alerts</p>
              <div className="flex flex-col gap-3">
                {dueCustomers.map((c) => (
                  <div key={c.name} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1e1e1e' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{c.name}</p>
                      <p className="text-xs" style={{ color: '#666666' }}>{c.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: '#ff4081' }}>{c.renewal}</p>
                      <p className="text-xs" style={{ color: '#666666' }}>Renewal date</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer table */}
          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs tracking-[0.15em] uppercase" style={{ color: '#666666' }}>All Customers</p>
              <a href="/customers" className="text-xs" style={{ color: '#ff1493' }}>Manage →</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                    {['Name', 'Product', 'Monthly', 'Renewal', 'Status'].map((h) => (
                      <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: '#444444' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #111111' }}>
                      <td className="py-3 font-medium" style={{ color: '#f5f5f0' }}>{c.name}</td>
                      <td className="py-3" style={{ color: '#888888' }}>{c.product}</td>
                      <td className="py-3" style={{ color: '#f5f5f0' }}>₱{c.amount.toLocaleString()}</td>
                      <td className="py-3" style={{ color: '#888888' }}>{c.renewal}</td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-1 rounded-full" style={{
                          background: c.status === 'active' ? 'rgba(0,188,212,0.1)' : 'rgba(255,64,129,0.1)',
                          color: c.status === 'active' ? '#00bcd4' : '#ff4081',
                          border: `1px solid ${c.status === 'active' ? 'rgba(0,188,212,0.2)' : 'rgba(255,64,129,0.2)'}`,
                        }}>
                          {c.status === 'active' ? 'Active' : 'Due'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
