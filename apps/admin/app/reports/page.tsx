import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth';
import { AdminSidebar } from '../../components/AdminSidebar';

// Mock MRR history (last 12 months)
const mrrHistory = [
  { month: 'Jun 25', mrr: 0 }, { month: 'Jul 25', mrr: 0 }, { month: 'Aug 25', mrr: 0 },
  { month: 'Sep 25', mrr: 0 }, { month: 'Oct 25', mrr: 0 }, { month: 'Nov 25', mrr: 0 },
  { month: 'Dec 25', mrr: 0 }, { month: 'Jan 26', mrr: 0 }, { month: 'Feb 26', mrr: 0 },
  { month: 'Mar 26', mrr: 0 }, { month: 'Apr 26', mrr: 1500 }, { month: 'May 26', mrr: 7500 },
];

const productBreakdown = [
  { product: 'Website Maintenance', customers: 3, mrr: 4500 },
  { product: 'Printing System Maintenance', customers: 1, mrr: 1500 },
  { product: 'Inventory System Maintenance', customers: 1, mrr: 1500 },
  { product: 'Celebrations', customers: 0, mrr: 0 },
];

const maxMrr = Math.max(...mrrHistory.map((m) => m.mrr), 1);

export default async function ReportsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const totalMrr = productBreakdown.reduce((s, p) => s + p.mrr, 0);
  const totalCustomers = productBreakdown.reduce((s, p) => s + p.customers, 0);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Reports</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Business performance overview</p>
          </div>

          {/* MRR trend */}
          <div className="p-6 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: 'var(--color-muted)' }}>MRR Trend — Last 12 Months</p>
            <div className="flex items-end gap-2 h-40">
              {mrrHistory.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${(m.mrr / maxMrr) * 120}px`,
                      minHeight: m.mrr > 0 ? '4px' : '2px',
                      background: m.mrr > 0 ? 'var(--color-accent)' : 'var(--color-subtle)',
                    }}
                  />
                  <p className="text-xs" style={{ color: 'var(--color-subtle)', fontSize: '9px' }}>{m.month}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Current MRR</p>
              <p className="text-xl font-medium" style={{ color: 'var(--color-accent)' }}>
                ₱{totalMrr.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Product breakdown */}
          <div className="p-6 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: 'var(--color-muted)' }}>Revenue by Product</p>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {['Product', 'Customers', 'MRR', '% of Total'].map((h) => (
                    <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: 'var(--color-subtle)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productBreakdown.map((p) => (
                  <tr key={p.product} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-3 font-medium" style={{ color: 'var(--color-text)' }}>{p.product}</td>
                    <td className="py-3" style={{ color: 'var(--color-muted)' }}>{p.customers}</td>
                    <td className="py-3" style={{ color: 'var(--color-text)' }}>{p.mrr > 0 ? `₱${p.mrr.toLocaleString()}` : '—'}</td>
                    <td className="py-3" style={{ color: 'var(--color-muted)' }}>
                      {totalMrr > 0 && p.mrr > 0 ? `${Math.round((p.mrr / totalMrr) * 100)}%` : '—'}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="pt-4 font-medium text-xs uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Total</td>
                  <td className="pt-4 font-medium" style={{ color: 'var(--color-text)' }}>{totalCustomers}</td>
                  <td className="pt-4 font-medium" style={{ color: 'var(--color-text)' }}>₱{totalMrr.toLocaleString()}</td>
                  <td className="pt-4" style={{ color: 'var(--color-muted)' }}>100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Milestones */}
          <div className="p-6 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: 'var(--color-muted)' }}>Road to ₱30,000 MRR</p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Phase 1 Launch', target: 0, done: true },
                { label: 'First ₱5,000 MRR', target: 5000, done: totalMrr >= 5000 },
                { label: '₱15,000 MRR (Month 6)', target: 15000, done: totalMrr >= 15000 },
                { label: '₱30,000 MRR (Month 12)', target: 30000, done: totalMrr >= 30000 },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-4">
                  <span style={{ color: m.done ? 'var(--color-accent)' : 'var(--color-subtle)', fontSize: '16px' }}>{m.done ? '✓' : '○'}</span>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: m.done ? 'var(--color-text)' : 'var(--color-muted)' }}>{m.label}</p>
                  </div>
                  {m.target > 0 && (
                    <div className="w-32 h-1.5 rounded-full" style={{ background: 'var(--color-subtle)' }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${Math.min((totalMrr / m.target) * 100, 100)}%`, background: 'var(--color-accent)' }} />
                    </div>
                  )}
                  {m.target > 0 && <p className="text-xs w-16 text-right" style={{ color: 'var(--color-muted)' }}>{Math.min(Math.round((totalMrr / m.target) * 100), 100)}%</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'New Customers This Month', value: '4', sub: 'May 2026' },
              { label: 'Churn This Month', value: '0', sub: 'No cancellations' },
              { label: 'Runway to ₱15k', value: `₱${(15000 - totalMrr).toLocaleString()}`, sub: 'Still needed' },
            ].map((s) => (
              <div key={s.label} className="p-6 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <p className="text-xs tracking-[0.1em] uppercase mb-2" style={{ color: 'var(--color-subtle)' }}>{s.label}</p>
                <p className="text-2xl font-medium" style={{ color: 'var(--color-text)' }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-subtle)' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
