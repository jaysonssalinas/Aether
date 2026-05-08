'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Customer {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  active_subscriptions: number;
  monthly_total: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '', email: '', phone: '', address: '', notes: '',
  });

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/customers');
      if (res.ok) {
        setCustomers(await res.json());
      } else {
        setError('Failed to load customers.');
      }
    } catch {
      setError('Failed to load customers.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.email ?? '').toLowerCase().includes(search.toLowerCase())
  );

  async function addCustomer() {
    if (!newCustomer.name) return;
    setSaving(true);
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });
      if (res.ok) {
        setNewCustomer({ name: '', email: '', phone: '', address: '', notes: '' });
        setShowAdd(false);
        await fetchCustomers();
      } else {
        alert('Failed to save customer. Please try again.');
      }
    } catch {
      alert('Failed to save customer. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteCustomer(id: number) {
    if (!confirm('Delete this customer and all their subscriptions?')) return;
    try {
      await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      setSelected(null);
      await fetchCustomers();
    } catch {
      alert('Failed to delete customer. Please try again.');
    }
  }

  const inp: React.CSSProperties = {
    background: '#111111', border: '1px solid #2a2a2a', borderRadius: '4px',
    color: '#f5f5f0', padding: '8px 12px', fontSize: '13px', outline: 'none', width: '100%',
  };

  const totalMRR = customers.reduce((s, c) => s + Number(c.monthly_total), 0);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: '#070707' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>Customers</h1>
              <p className="text-sm mt-1" style={{ color: '#666666' }}>
                {customers.length} total · ₱{totalMRR.toLocaleString()}/month MRR
              </p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 18px', fontSize: '13px', cursor: 'pointer' }}
            >
              + Add Customer
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-lg text-sm" style={{ background: 'rgba(255,64,129,0.1)', border: '1px solid rgba(255,64,129,0.2)', color: '#ff4081' }}>
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inp, maxWidth: '320px' }}
          />

          {showAdd && (
            <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid rgba(255,20,147,0.2)' }}>
              <p className="text-sm font-medium mb-4" style={{ color: '#f5f5f0' }}>Add New Customer</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Name *', key: 'name', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Phone', key: 'phone', type: 'tel' },
                  { label: 'Address', key: 'address', type: 'text' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs mb-1" style={{ color: '#666666' }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={(newCustomer as Record<string, string>)[f.key]}
                      onChange={(e) => setNewCustomer({ ...newCustomer, [f.key]: e.target.value })}
                      style={inp}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-xs mb-1" style={{ color: '#666666' }}>Notes</label>
                <textarea
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  rows={2}
                  style={{ ...inp, resize: 'vertical' }}
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={addCustomer} disabled={saving}
                  style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Saving...' : 'Save Customer'}
                </button>
                <button onClick={() => setShowAdd(false)}
                  style={{ background: '#1a1a1a', color: '#888888', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                    {['Name', 'Email', 'Subscriptions', 'MRR', ''].map((h) => (
                      <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: '#444444' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={5} className="py-8 text-center text-sm" style={{ color: '#444444' }}>Loading...</td></tr>
                  )}
                  {!loading && filtered.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #111111' }}>
                      <td className="py-3 font-medium" style={{ color: '#f5f5f0' }}>{c.name}</td>
                      <td className="py-3" style={{ color: '#888888' }}>{c.email ?? '—'}</td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-1 rounded-full"
                          style={c.active_subscriptions > 0
                            ? { background: 'rgba(0,188,212,0.1)', color: '#00bcd4', border: '1px solid rgba(0,188,212,0.2)' }
                            : { background: '#1a1a1a', color: '#555555', border: '1px solid #222222' }}>
                          {c.active_subscriptions} active
                        </span>
                      </td>
                      <td className="py-3" style={{ color: '#f5f5f0' }}>
                        {c.monthly_total > 0 ? `₱${Number(c.monthly_total).toLocaleString()}` : '—'}
                      </td>
                      <td className="py-3">
                        <button onClick={() => setSelected(c)} className="text-xs" style={{ color: '#666666', background: 'none', border: 'none', cursor: 'pointer' }}>View →</button>
                      </td>
                    </tr>
                  ))}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={5} className="py-8 text-center text-sm" style={{ color: '#444444' }}>No customers found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {selected && (
            <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSelected(null)}>
              <div className="h-full w-full max-w-sm overflow-y-auto p-8 flex flex-col gap-6" style={{ background: '#0f0f0f', borderLeft: '1px solid #1e1e1e' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>{selected.name}</h2>
                  <button onClick={() => setSelected(null)} style={{ color: '#666666', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>×</button>
                </div>
                {[
                  { label: 'Email', val: selected.email ?? '—' },
                  { label: 'Phone', val: selected.phone ?? '—' },
                  { label: 'Address', val: selected.address ?? '—' },
                  { label: 'MRR', val: selected.monthly_total > 0 ? `₱${Number(selected.monthly_total).toLocaleString()}/mo` : '—' },
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
                <div className="mt-auto pt-4" style={{ borderTop: '1px solid #1e1e1e' }}>
                  <a href={`/subscriptions?customer=${selected.id}`} className="text-sm" style={{ color: '#ff1493' }}>
                    View Subscriptions →
                  </a>
                </div>
                <button onClick={() => deleteCustomer(selected.id)} className="text-xs"
                  style={{ color: '#ff4081', background: 'none', border: '1px solid rgba(255,64,129,0.2)', borderRadius: '4px', padding: '8px', cursor: 'pointer' }}>
                  Delete Customer
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
