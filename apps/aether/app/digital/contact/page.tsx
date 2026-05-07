'use client';

import { useState } from 'react';

const DIGITAL_BG = {
  background: `
    radial-gradient(circle at 20% 10%, rgba(96,165,250,0.18), transparent 42%),
    radial-gradient(circle at 80% 15%, rgba(167,139,250,0.16), transparent 45%),
    #05070d
  `,
} as React.CSSProperties;

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(12,18,32,0.82)',
  border: '1px solid rgba(96,165,250,0.22)',
  boxShadow: 'inset 0 0 0 1px rgba(34,211,238,0.06)',
};

const INPUT_STYLE: React.CSSProperties = {
  background: 'rgba(6,10,20,0.8)',
  border: '1px solid rgba(96,165,250,0.22)',
  borderRadius: '4px',
  color: '#f3f7ff',
  padding: '12px 16px',
  width: '100%',
  fontSize: '14px',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
};

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '0.6875rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: '#7dd3fc',
  marginBottom: '8px',
  fontFamily: "'Inter', sans-serif",
};

export default function DigitalContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'website',
    budget: '',
    timeline: 'flexible',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, interest: 'digital' }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div data-section="digital" className="on-dark">
      <section className="py-32 px-6 min-h-screen relative" style={DIGITAL_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* ── Left: info ── */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <span className="text-label">Aether Digital — Contact</span>
                <h1>
                  <span className="text-gradient">Let's build</span>
                  <br />
                  <span style={{ color: '#f3f7ff' }}>something great.</span>
                </h1>
                <p className="text-lead" style={{ color: '#b8c4dc' }}>
                  Tell us about your project and we'll get back to you within 24 business hours
                  with a clear plan and price.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <ContactDetail icon="✉" label="Email" value="contact@aether.com.ph" href="mailto:contact@aether.com.ph" />
                <ContactDetail icon="📞" label="Phone" value="0966 987 3475" href="tel:09669873475" />
                <ContactDetail icon="📍" label="Location" value="Dasmarinas, Cavite, Philippines" />
              </div>

              <p className="text-sm" style={{ color: '#8ea0c8', letterSpacing: '0.03em' }}>
                We respond within 24 business hours.
              </p>
            </div>

            {/* ── Right: form ── */}
            <div className="p-8 rounded-lg" style={CARD_STYLE}>
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-16 text-center">
                  <div
                    className="text-5xl"
                    style={{ color: '#7dd3fc', fontFamily: "'Poppins', sans-serif" }}
                  >
                    ⌗
                  </div>
                  <h3 style={{ color: '#f3f7ff', margin: 0 }}>Thanks for reaching out!</h3>
                  <p className="text-sm" style={{ color: '#b8c4dc', lineHeight: '1.7' }}>
                    We'll contact you soon — usually within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={LABEL_STYLE}>Name *</label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(125,211,252,0.55)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(96,165,250,0.22)')} />
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Phone *</label>
                      <input type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(125,211,252,0.55)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(96,165,250,0.22)')} />
                    </div>
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Email *</label>
                    <input type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={INPUT_STYLE}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(125,211,252,0.55)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(96,165,250,0.22)')} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Service Type *</label>
                    <select value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
                      <option value="website">Website Design</option>
                      <option value="pos">POS System</option>
                      <option value="inventory">Inventory System</option>
                      <option value="domain">Domain & Hosting</option>
                      <option value="seo">SEO & Online Presence</option>
                      <option value="other">Other / Not sure yet</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={LABEL_STYLE}>Budget Range</label>
                      <input type="text" placeholder="e.g. ₱10,000" value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(125,211,252,0.55)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(96,165,250,0.22)')} />
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Timeline</label>
                      <select value={form.timeline}
                        onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                        style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
                        <option value="asap">ASAP</option>
                        <option value="1-3months">1–3 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Tell Us About Your Project *</label>
                    <textarea required rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...INPUT_STYLE, resize: 'vertical' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(125,211,252,0.55)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(96,165,250,0.22)')}
                      placeholder="What do you need? Any specific requirements?" />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #a78bfa 100%)',
                      color: '#05070d',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '14px 24px',
                      fontSize: '14px',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Inquiry →'}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-center" style={{ color: '#60a5fa' }}>
                      Something went wrong. Email us at contact@aether.com.ph
                    </p>
                  )}
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

function ContactDetail({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="text-base mt-0.5" style={{ color: '#7dd3fc' }}>{icon}</span>
      <div>
        <p
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#7dd3fc',
            marginBottom: '4px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {label}
        </p>
        <p className="text-sm" style={{ color: '#b8c4dc' }}>{value}</p>
      </div>
    </div>
  );
  return href
    ? <a href={href} style={{ textDecoration: 'none', transition: 'opacity 0.2s' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
      >{content}</a>
    : <>{content}</>;
}
