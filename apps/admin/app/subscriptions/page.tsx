'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Subscription {
  id: number;
  customer_id: number;
  customer_name: string;
  product_id: string;
  product_name: string;
  division: string;
  monthly_amount: number;
  start_date: string;
  renewal_date: string;
  status: 'active' | 'paused' | 'cancelled';
  notes: string | null;
}

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: string;
  name: string;
  division: string;
  frequency: string;
  startingPrice: number | null;
}

const STATUS_COLORS = {
  active: { background: 'rgba(0,188,212,0.1)', color: '#00bcd4', border: '1px solid rgba(0,188,212,0.2)' },
  paused: { background: 'rgba(255,193,7,0.1)', color: '#ffc107', border: '1px solid rgba(255,193,7,0.2)' },
  cancelled: { background: 'rgba(100,100,100,0.1)', color: '#666666', border: '1px solid rgba(100,100,100,0.2)' },
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'cancelled'>('all');
  const [newSub, setNewSub] = useState({
    customer_id: '',
    product_id: '',
    monthly_amount: '',
    start_date: new Date().toISOString().slice(0, 10),
    renewal_date: '',
    notes: '',
  });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [subsRes, custsRes, prodsRes] = await Promise.all([
        fetch('/api/subscriptions'),
        fetch('/api/customers'),
        fetch('/api/pricing'),
      ]);
      const [subs, custs, prods] = await Promise.all([
        subsRes.json(),
        custsRes.json(),
        prodsRes.json(),
      ]);
      setSubscriptions(subs);
      setCustomers(custs);
      setProducts(prods);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = subscriptions.filter(
    (s) => filterStatus === 'all' || s.status === filterStatus
  );

  const totalMRR = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + Number(s.monthly_amount), 0);

  async function addSubscription() {
    if (!newSub.customer_id || !newSub.product_id || !newSub.renewal_date) return;
    setSaving(true);
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: parseInt(newSub.customer_id),
          product_id: newSub.product_id,
          monthly_amount: parseInt(newSub.monthly_amount) || 0,
          start_date: newSub.start_date,
          renewal_date: newSub.renewal_date,
          notes: newSub.notes || null,
        }),
      });
      if (res.ok) {
        setShowAdd(false);
        setNewSub({ customer_id: '', product_id: '', monthly_amount: '', start_date: new Date().toISOString().slice(0, 10), renewal_date: '', notes: '' });
        await fetchAll();
      }
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(id: number, sub: Subscription, status: Subscription['status']) {
    await fetch(`/api/subscriptions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...sub, status }),
    });
    await fetchAll();
  }

  const inp: React.CSSProperties = {
    background: '#111111', border: '1px solid #2a2a2a', borderRadius: '4px',
    color: '#f5f5f0', padding: '8px 12px', fontSize: '13px', outline: 'none', width: '100%',
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: '#070707' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>Subscriptions</h1>
              <p className="text-sm mt-1" style={{ color: '#666666' }}>
                {subscriptions.filter((s) => s.status === 'active').length} active · ₱{totalMRR.toLocaleString()}/month MRR
              </p>
            </div>
            <button onClick={() => setShowAdd(true)}
              style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 18px', fontSize: '13px', cursor: 'pointer' }}>
              + Add Subscription
            </button>
          </div>

          <div className="flex gap-2">
            {(['all', 'active', 'paused', 'cancelled'] as const).map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)} className="text-xs px-3 py-2 rounded-sm capitalize"
                style={{ background: filterStatus === s ? '#1e1e1e' : 'transparent', color: filterStatus === s ? '#f5f5f0' : '#666666', border: '1px solid', borderColor: filterStatus === s ? '#2a2a2a' : 'transparent', cursor: 'pointer' }}>
                {s}
              </button>
            ))}
          </div>

          {showAdd && (
            <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid rgba(255,20,147,0.2)' }}>
              <p className="text-sm font-medium mb-4" style={{ color: '#f5f5f0' }}>Add Subscription</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Customer *</label>
                  <select value={newSub.customer_id} onChange={(e) => setNewSub({ ...newSub, customer_id: e.target.value })} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="">Select customer...</option>
                    {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Product *</label>
                  <select value={newSub.product_id} onChange={(e) => {
                    const product = products.find((p) => p.id === e.target.value);
                    setNewSub({ ...newSub, product_id: e.target.value, monthly_amount: product?.startingPrice?.toString() ?? '' });
                  }} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="">Select product...</option>
                    {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Monthly Amount (₱)</label>
                  <input type="number" value={newSub.monthly_amount} onChange={(e) => setNewSub({ ...newSub, monthly_amount: e.target.value })} style={inp} placeholder="e.g. 1500" />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Start Date *</label>
                  <input type="date" value={newSub.start_date} onChange={(e) => setNewSub({ ...newSub, start_date: e.target.value })} style={inp} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Renewal Date *</label>
                  <input type="date" value={newSub.renewal_date} onChange={(e) => setNewSub({ ...newSub, renewal_date: e.target.value })} style={inp} />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs mb-1" style={{ color: '#666666' }}>Notes</label>
                <textarea value={newSub.notes} onChange={(e) => setNewSub({ ...newSub, notes: e.target.value })} rows={2} style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={addSubscription} disabled={saving}
                  style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Saving...' : 'Save Subscription'}
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
                    {['Customer', 'Product', 'Monthly', 'Renewal', 'Status', ''].map((h) => (
                      <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: '#444444' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={6} className="py-8 text-center text-sm" style={{ color: '#444444' }}>Loading...</td></tr>
                  )}
                  {!loading && filtered.map((s) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid #111111' }}>
                      <td className="py-3 font-medium" style={{ color: '#f5f5f0' }}>{s.customer_name}</td>
                      <td className="py-3" style={{ color: '#888888' }}>{s.product_name}</td>
                      <td className="py-3" style={{ color: '#f5f5f0' }}>
                        {s.monthly_amount > 0 ? `₱${Number(s.monthly_amount).toLocaleString()}` : '—'}
                      </td>
                      <td className="py-3" style={{ color: '#888888' }}>
                        {new Date(s.renewal_date).toLocaleDateString('en-PH')}
                      </td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={STATUS_COLORS[s.status]}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <select value={s.status} onChange={(e) => updateStatus(s.id, s, e.target.value as Subscription['status'])}
                          style={{ background: '#111111', border: '1px solid #2a2a2a', color: '#888888', fontSize: '11px', padding: '4px 6px', borderRadius: '3px', cursor: 'pointer' }}>
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-sm" style={{ color: '#444444' }}>No subscriptions found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
