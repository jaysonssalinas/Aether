'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'website', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  }

  const inp: React.CSSProperties = { background: '#111111', border: '1px solid #1e1e1e', borderRadius: '4px', color: '#f5f5f0', padding: '12px 16px', width: '100%', fontSize: '14px', fontFamily: "'Inter', sans-serif", outline: 'none' };
  const lbl: React.CSSProperties = { display: 'block', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666', marginBottom: '8px' };

  return (
    <>
      <section className="py-32 px-6 relative" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(255,20,147,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>Contact</p>
                <h1 className="text-4xl font-medium mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
                  Let's build something great.
                </h1>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  Tell us about your project. We'll get back to you within 24 hours with a clear proposal.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { icon: '✉', label: 'Email', val: 'contact@aether.com.ph', href: 'mailto:contact@aether.com.ph' },
                  { icon: '📞', label: 'Phone / Viber / WhatsApp', val: '0966 987 3475', href: 'tel:09669873475' },
                  { icon: '📍', label: 'Location', val: 'Dasmarinas, Cavite, Philippines' },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <span className="text-lg">{c.icon}</span>
                    <div>
                      <p className="text-xs tracking-[0.1em] uppercase mb-1" style={{ color: '#444444' }}>{c.label}</p>
                      {c.href ? <a href={c.href} className="text-sm" style={{ color: '#999999' }}>{c.val}</a> : <p className="text-sm" style={{ color: '#999999' }}>{c.val}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-lg" style={{ background: '#111111', border: '1px solid rgba(255,20,147,0.15)' }}>
                <p className="text-sm font-medium mb-2" style={{ color: '#f5f5f0' }}>Typical project timeline</p>
                <div className="flex flex-col gap-2 mt-3">
                  {[['Website', '2–4 weeks'], ['POS System', '1–2 weeks (install + train)'], ['Inventory System', '1–2 weeks']].map(([s, t]) => (
                    <div key={s} className="flex justify-between text-sm">
                      <span style={{ color: '#666666' }}>{s}</span>
                      <span style={{ color: '#ff4081' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                  <span className="text-4xl gradient-text">✦</span>
                  <h3 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Got it. Thank you.</h3>
                  <p className="text-sm" style={{ color: '#666666' }}>We'll send you a proposal within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={lbl}>Your Name</label>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')} />
                    </div>
                    <div>
                      <label style={lbl}>Phone (Optional)</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inp}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')} />
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Email Address</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')} />
                  </div>
                  <div>
                    <label style={lbl}>I need</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={{ ...inp, cursor: 'pointer' }}>
                      <option value="website">A website</option>
                      <option value="pos">A POS / Printing system</option>
                      <option value="inventory">An inventory system</option>
                      <option value="hosting">Domain & hosting management</option>
                      <option value="seo">SEO / online presence</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Tell us more</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inp, resize: 'vertical' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')}
                      placeholder="Describe your business and what you're looking to build..." />
                  </div>
                  <button type="submit" disabled={status === 'sending'}
                    style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '14px 24px', fontSize: '14px', fontFamily: "'Inter',sans-serif", letterSpacing: '0.05em', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
                    {status === 'sending' ? 'Sending...' : 'Send Request →'}
                  </button>
                  {status === 'error' && <p className="text-sm text-center" style={{ color: '#ff4081' }}>Something went wrong. Email us directly at contact@aether.com.ph</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
