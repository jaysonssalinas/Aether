'use client';

import { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { products as initialProducts, Product, formatPrice } from '@aether/config/products';

interface EditingState {
  productId: string;
  startingPrice: string;
  maxPrice: string;
}

export default function PricingPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  function openEdit(product: Product) {
    setEditing({
      productId: product.id,
      startingPrice: product.startingPrice?.toString() ?? '',
      maxPrice: product.maxPrice?.toString() ?? '',
    });
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: editing.productId,
          startingPrice: editing.startingPrice ? parseInt(editing.startingPrice) : null,
          maxPrice: editing.maxPrice ? parseInt(editing.maxPrice) : null,
        }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editing.productId
              ? { ...p, startingPrice: editing.startingPrice ? parseInt(editing.startingPrice) : null, maxPrice: editing.maxPrice ? parseInt(editing.maxPrice) : null }
              : p
          )
        );
        setSaved(editing.productId);
        setTimeout(() => setSaved(null), 2000);
        setEditing(null);
      }
    } finally {
      setSaving(false);
    }
  }

  const inp: React.CSSProperties = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    padding: '8px 12px',
    fontSize: '13px',
    width: '120px',
    outline: 'none',
  };

  const digitalProducts = products.filter((p) => p.division === 'digital');
  const celebrationsProducts = products.filter((p) => p.division === 'celebrations');

  function ProductTable({ items }: { items: Product[] }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              {['Product', 'Starting Price', 'Max Price', 'Frequency', 'Actions'].map((h) => (
                <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: 'var(--color-subtle)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const isEditing = editing?.productId === p.id;
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--color-surface)' }}>
                  <td className="py-4">
                    <p className="font-medium" style={{ color: 'var(--color-text)' }}>{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{p.category}</p>
                  </td>
                  <td className="py-4">
                    {isEditing ? (
                      <input type="number" value={editing.startingPrice} onChange={(e) => setEditing({ ...editing, startingPrice: e.target.value })} style={inp} placeholder="e.g. 8000" />
                    ) : (
                      <span style={{ color: p.startingPrice ? 'var(--color-text)' : 'var(--color-subtle)' }}>
                        {p.startingPrice ? `₱${p.startingPrice.toLocaleString()}` : 'Custom'}
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    {isEditing ? (
                      <input type="number" value={editing.maxPrice} onChange={(e) => setEditing({ ...editing, maxPrice: e.target.value })} style={inp} placeholder="e.g. 15000" />
                    ) : (
                      <span style={{ color: p.maxPrice ? 'var(--color-text)' : 'var(--color-subtle)' }}>
                        {p.maxPrice ? `₱${p.maxPrice.toLocaleString()}` : '—'}
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ background: 'var(--color-bg)', color: 'var(--color-muted)' }}>
                      {p.frequency}
                    </span>
                  </td>
                  <td className="py-4">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button onClick={saveEdit} disabled={saving}
                          className="text-xs px-3 py-1.5 rounded-sm"
                          style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', cursor: 'pointer' }}>
                          {saving ? '...' : 'Save'}
                        </button>
                        <button onClick={() => setEditing(null)}
                          className="text-xs px-3 py-1.5 rounded-sm"
                          style={{ background: 'var(--color-bg)', color: 'var(--color-muted)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => openEdit(p)}
                        className="text-xs px-3 py-1.5 rounded-sm transition-colors"
                        style={{ background: 'var(--color-bg)', color: 'var(--color-muted)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                        {saved === p.id ? '✓ Saved' : 'Edit'}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Pricing Panel</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Edit prices here — changes reflect on all websites immediately.</p>
          </div>

          <div className="p-6 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--card-shadow)' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6">
              <span style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--color-accent)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', fontWeight: 500 }}>
                Digital
              </span>
            </p>
            <ProductTable items={digitalProducts} />
          </div>

          <div className="p-6 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--card-shadow)' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6">
              <span style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', fontWeight: 500 }}>
                Celebrations
              </span>
            </p>
            <ProductTable items={celebrationsProducts} />
          </div>

          <div className="p-4 rounded-lg text-sm" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
            ℹ Note: "Custom Quote" products don't have a numeric price. Contact-based only. Edit is available but won't affect the "Custom Quote" display unless a starting price is entered.
          </div>
        </div>
      </main>
    </div>
  );
}
