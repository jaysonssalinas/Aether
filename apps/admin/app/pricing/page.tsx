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

  const inp: React.CSSProperties = { background: '#111111', border: '1px solid #2a2a2a', borderRadius: '4px', color: '#f5f5f0', padding: '8px 12px', fontSize: '13px', width: '120px', outline: 'none' };

  const digitalProducts = products.filter((p) => p.division === 'digital');
  const celebrationsProducts = products.filter((p) => p.division === 'celebrations');

  function ProductTable({ items }: { items: Product[] }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['Product', 'Starting Price', 'Max Price', 'Frequency', 'Actions'].map((h) => (
                <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: '#444444' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const isEditing = editing?.productId === p.id;
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid #111111' }}>
                  <td className="py-4">
                    <p className="font-medium" style={{ color: '#f5f5f0' }}>{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#666666' }}>{p.category}</p>
                  </td>
                  <td className="py-4">
                    {isEditing ? (
                      <input type="number" value={editing.startingPrice} onChange={(e) => setEditing({ ...editing, startingPrice: e.target.value })} style={inp} placeholder="e.g. 8000" />
                    ) : (
                      <span style={{ color: p.startingPrice ? '#f5f5f0' : '#444444' }}>
                        {p.startingPrice ? `₱${p.startingPrice.toLocaleString()}` : 'Custom'}
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    {isEditing ? (
                      <input type="number" value={editing.maxPrice} onChange={(e) => setEditing({ ...editing, maxPrice: e.target.value })} style={inp} placeholder="e.g. 15000" />
                    ) : (
                      <span style={{ color: p.maxPrice ? '#f5f5f0' : '#444444' }}>
                        {p.maxPrice ? `₱${p.maxPrice.toLocaleString()}` : '—'}
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ background: '#1a1a1a', color: '#888888' }}>
                      {p.frequency}
                    </span>
                  </td>
                  <td className="py-4">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button onClick={saveEdit} disabled={saving}
                          className="text-xs px-3 py-1.5 rounded-sm"
                          style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', cursor: 'pointer' }}>
                          {saving ? '...' : 'Save'}
                        </button>
                        <button onClick={() => setEditing(null)}
                          className="text-xs px-3 py-1.5 rounded-sm"
                          style={{ background: '#1a1a1a', color: '#888888', border: '1px solid #2a2a2a', cursor: 'pointer' }}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => openEdit(p)}
                        className="text-xs px-3 py-1.5 rounded-sm transition-colors"
                        style={{ background: '#1a1a1a', color: '#888888', border: '1px solid #2a2a2a', cursor: 'pointer' }}>
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
      <main className="flex-1 ml-56 p-8" style={{ background: '#070707' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>Pricing Panel</h1>
            <p className="text-sm mt-1" style={{ color: '#666666' }}>Edit prices here — changes reflect on all websites immediately.</p>
          </div>

          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: '#666666' }}>Aether Digital</p>
            <ProductTable items={digitalProducts} />
          </div>

          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: '#666666' }}>Aether Celebrations</p>
            <ProductTable items={celebrationsProducts} />
          </div>

          <div className="p-4 rounded-lg text-sm" style={{ background: 'rgba(255,20,147,0.05)', border: '1px solid rgba(255,20,147,0.1)', color: '#888888' }}>
            ℹ Note: "Custom Quote" products don't have a numeric price. Contact-based only. Edit is available but won't affect the "Custom Quote" display unless a starting price is entered.
          </div>
        </div>
      </main>
    </div>
  );
}
