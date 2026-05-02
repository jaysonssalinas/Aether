'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: 'wedding', date: '', message: '' });
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(106,76,147,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>Contact</p>
                <h1 className="text-4xl font-medium mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
                  Let's plan something beautiful.
                </h1>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  Tell Remlyn about your event. We'll follow up within 24 hours to schedule your free consultation.
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
              <div className="p-6 rounded-lg" style={{ background: '#111111', border: '1px solid rgba(106,76,147,0.2)' }}>
                <p className="text-sm font-medium mb-3" style={{ color: '#f5f5f0' }}>What happens next?</p>
                {['We receive your inquiry within minutes', 'Remlyn reviews your details and responds within 24 hours', 'We schedule a free 30-minute consultation', 'You receive a custom proposal'].map((step, i) => (
                  <div key={step} className="flex items-start gap-3 py-2" style={{ borderBottom: i < 3 ? '1px solid #1e1e1e' : 'none' }}>
                    <span className="text-xs font-medium mt-0.5" style={{ color: '#6a4c93', minWidth: '16px' }}>{i + 1}</span>
                    <p className="text-sm" style={{ color: '#888888' }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                  <span className="text-4xl">✦</span>
                  <h3 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Received. Thank you.</h3>
                  <p className="text-sm" style={{ color: '#666666' }}>Remlyn will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={lbl}>Your Name</label>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(106,76,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')} />
                    </div>
                    <div>
                      <label style={lbl}>Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inp}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(106,76,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')} />
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Email Address</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(106,76,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={lbl}>Event Type</label>
                      <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} style={{ ...inp, cursor: 'pointer' }}>
                        <option value="wedding">Wedding</option>
                        <option value="debut">Debut / 18th Birthday</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="souvenirs">Souvenirs / Invitations only</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>Preferred Date</label>
                      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={inp}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(106,76,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')} />
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Tell us about your event</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inp, resize: 'vertical' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(106,76,147,0.4)')} onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')}
                      placeholder="Number of guests, venue ideas, budget range, theme..." />
                  </div>
                  <button type="submit" disabled={status === 'sending'}
                    style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '14px 24px', fontSize: '14px', fontFamily: "'Inter',sans-serif", letterSpacing: '0.05em', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
                    {status === 'sending' ? 'Sending...' : 'Send Inquiry →'}
                  </button>
                  {status === 'error' && <p className="text-sm text-center" style={{ color: '#ff4081' }}>Something went wrong. Email us at contact@aether.com.ph</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
