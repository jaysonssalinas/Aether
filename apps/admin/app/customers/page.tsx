'use client';

import { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Customer {
  id: number;
  name: string;
  product: string;
  monthlyAmount: number;
  renewalDate: string;
  status: 'active' | 'due' | 'overdue';
  phone?: string;
  email?: string;
  notes?: string;
}

const initialCustomers: Customer[] = [
  { id: 1, name: 'Rimando Law Office', product: 'Website Maintenance', monthlyAmount: 1500, renewalDate: '2026-06-01', status: 'active', phone: '', email: 'rimandolawoffice@gmail.com', notes: 'Website built May 2026. On monthly maintenance.' },
  { id: 2, name: 'Client B', product: 'Website Maintenance', monthlyAmount: 1500, renewalDate: '2026-05-15', status: 'due', notes: 'Follow up needed.' },
  { id: 3, name: 'Client C', product: 'Printing System Maintenance', monthlyAmount: 1500, renewalDate: '2026-07-01', status: 'active' },
  { id: 4, name: 'Client D', product: 'Website Maintenance', monthlyAmount: 1500, renewalDate: '2026-05-20', status: 'due' },
  { id: 5, name: 'Client E', product: 'Inventory System Maintenance', monthlyAmount: 1500, renewalDate: '2026-08-01', status: 'active' },
];

const statusColors = {
  active: { bg: 'rgba(0,188,212,0.1)', color: '#00bcd4', border: 'rgba(0,188,212,0.2)' },
  due: { bg: 'rgba(255,64,129,0.1)', color: '#ff4081', border: 'rgba(255,64,129,0.2)' },
  overdue: { bg: 'rgba(255,64,129,0.2)', color: '#ff1493', border: 'rgba(255,20,147,0.3)' },
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'due' | 'overdue'>('all');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', product: 'Website Maintenance', monthlyAmount: '1500', renewalDate: '', email: '', phone: '', notes: '' });

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function addCustomer() {
    if (!newCustomer.name || !newCustomer.renewalDate) return;
    const id = customers.length + 1;
    setCustomers([...customers, {
      id,
      name: newCustomer.name,
      product: newCustomer.product,
      monthlyAmount: parseInt(newCustomer.monthlyAmount) || 0,
      renewalDate: newCustomer.renewalDate,
      status: 'active',
      email: newCustomer.email,
      phone: newCustomer.phone,
      notes: newCustomer.notes,
    }]);
    setNewCustomer({ name: '', product: 'Website Maintenance', monthlyAmount: '1500', renewalDate: '', email: '', phone: '', notes: '' });
    setShowAdd(false);
  }

  const inp: React.CSSProperties = { background: '#111111', border: '1px solid #2a2a2a', borderRadius: '4px', color: '#f5f5f0', padding: '8px 12px', fontSize: '13px', outline: 'none', width: '100%' };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: '#070707' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>Customers</h1>
              <p className="text-sm mt-1" style={{ color: '#666666' }}>{customers.length} total · ₱{customers.reduce((s, c) => s + c.monthlyAmount, 0).toLocaleString()}/month MRR</p>
            </div>
            <button onClick={() => setShowAdd(true)}
              style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 18px', fontSize: '13px', cursor: 'pointer' }}>
              + Add Customer
            </button>
          </div>

          {/* Search + filter */}
          <div className="flex gap-4">
            <input type="text" placeholder="Search by name or product..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ ...inp, maxWidth: '320px' }} />
            <div className="flex gap-2">
              {(['all', 'active', 'due', 'overdue'] as const).map((s) => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className="text-xs px-3 py-2 rounded-sm capitalize transition-colors"
                  style={{ background: filterStatus === s ? '#1e1e1e' : 'transparent', color: filterStatus === s ? '#f5f5f0' : '#666666', border: '1px solid', borderColor: filterStatus === s ? '#2a2a2a' : 'transparent', cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add customer form */}
          {showAdd && (
            <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid rgba(255,20,147,0.2)' }}>
              <p className="text-sm font-medium mb-4" style={{ color: '#f5f5f0' }}>Add New Customer</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Name *', key: 'name', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Phone', key: 'phone', type: 'tel' },
                  { label: 'Monthly Amount (₱)', key: 'monthlyAmount', type: 'number' },
                  { label: 'Renewal Date *', key: 'renewalDate', type: 'date' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs mb-1" style={{ color: '#666666' }}>{f.label}</label>
                    <input type={f.type} value={(newCustomer as Record<string, string>)[f.key]} onChange={(e) => setNewCustomer({ ...newCustomer, [f.key]: e.target.value })} style={inp} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Product</label>
                  <select value={newCustomer.product} onChange={(e) => setNewCustomer({ ...newCustomer, product: e.target.value })} style={{ ...inp, cursor: 'pointer' }}>
                    <option>Website Maintenance</option>
                    <option>Website Design</option>
                    <option>Printing System License</option>
                    <option>Printing System Maintenance</option>
                    <option>Inventory System License</option>
                    <option>Inventory System Maintenance</option>
                    <option>Event Planning</option>
                    <option>Wedding Planning</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs mb-1" style={{ color: '#666666' }}>Notes</label>
                <textarea value={newCustomer.notes} onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })} rows={2} style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={addCustomer} style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer' }}>Save Customer</button>
                <button onClick={() => setShowAdd(false)} style={{ background: '#1a1a1a', color: '#888888', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Customer table */}
          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                    {['Name', 'Product', 'Monthly', 'Renewal', 'Status', ''].map((h) => (
                      <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: '#444444' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => {
                    const sc = statusColors[c.status];
                    return (
                      <tr key={c.id} style={{ borderBottom: '1px solid #111111' }}>
                        <td className="py-3 font-medium" style={{ color: '#f5f5f0' }}>{c.name}</td>
                        <td className="py-3" style={{ color: '#888888' }}>{c.product}</td>
                        <td className="py-3" style={{ color: '#f5f5f0' }}>₱{c.monthlyAmount.toLocaleString()}</td>
                        <td className="py-3" style={{ color: '#888888' }}>{c.renewalDate}</td>
                        <td className="py-3">
                          <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{c.status}</span>
                        </td>
                        <td className="py-3">
                          <button onClick={() => setSelected(c)} className="text-xs" style={{ color: '#666666', background: 'none', border: 'none', cursor: 'pointer' }}>View →</button>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-sm" style={{ color: '#444444' }}>No customers found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail drawer */}
          {selected && (
            <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSelected(null)}>
              <div className="h-full w-full max-w-sm overflow-y-auto p-8 flex flex-col gap-6" style={{ background: '#0f0f0f', borderLeft: '1px solid #1e1e1e' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>{selected.name}</h2>
                  <button onClick={() => setSelected(null)} style={{ color: '#666666', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>×</button>
                </div>
                {[
                  { label: 'Product', val: selected.product },
                  { label: 'Monthly Amount', val: `₱${selected.monthlyAmount.toLocaleString()}` },
                  { label: 'Renewal Date', val: selected.renewalDate },
                  { label: 'Status', val: selected.status },
                  { label: 'Email', val: selected.email || '—' },
                  { label: 'Phone', val: selected.phone || '—' },
                ].map((d) => (
                  <div key={d.label} className="flex flex-col gap-1 py-3" style={{ borderBottom: '1px solid #1e1e1e' }}>
                    <p className="text-xs" style={{ color: '#444444' }}>{d.label}</p>
                    <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{d.val}</p>
                  </div>
                ))}
                {selected.notes && (
                  <div>
                    <p className="text-xs mb-2" style={{ color: '#444444' }}>Notes</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{selected.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
