'use client';

import { useState } from 'react';

const CELEB_BG: React.CSSProperties = {
  background: `
    radial-gradient(circle at 85% 12%, rgba(255,20,147,0.09), transparent 42%),
    radial-gradient(circle at 12% 85%, rgba(255,64,129,0.07), transparent 44%),
    #fffaf8
  `,
};

const CARD_STYLE: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(255,20,147,0.15)',
};

const CARD_WARM: React.CSSProperties = {
  background: '#fff8f5',
  border: '1px solid rgba(255,20,147,0.12)',
};

const INPUT_STYLE: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(255,20,147,0.22)',
  borderRadius: '4px',
  color: '#1a1a1a',
  padding: '12px 16px',
  width: '100%',
  fontSize: '14px',
  fontFamily: "'Lato', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
};

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '0.6875rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: '#c0006a',
  marginBottom: '8px',
  fontFamily: "'Lato', sans-serif",
};

export default function CelebrationsContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'wedding',
    eventDate: '',
    guestCount: '',
    budget: '',
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
        body: JSON.stringify({ ...form, interest: 'celebrations' }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div data-section="celebrations">
      <section className="py-32 px-6 min-h-screen relative" style={CELEB_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(192,0,106,0.35), transparent)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* ── Left: info ── */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <span className="text-label">Aether Celebrations — Contact</span>
                <h1>Let's <em>celebrate</em><br />together.</h1>
                <p className="text-lead">
                  Tell us about your event and we'll reach out within 24 hours to schedule
                  your free consultation with Remlyn.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <ContactDetail icon="✉" label="Email" value="contact@aether.com.ph" href="mailto:contact@aether.com.ph" />
                <ContactDetail icon="📞" label="Phone" value="0966 987 3475" href="tel:09669873475" />
                <ContactDetail icon="📍" label="Location" value="Dasmarinas, Cavite, Philippines" />
              </div>

              <div className="p-6 rounded-lg" style={CARD_WARM}>
                <span className="text-label" style={{ marginBottom: '0.5rem' }}>Remlyn Salinas</span>
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: '#c0006a', fontFamily: "'Lato', sans-serif", letterSpacing: '0.02em' }}
                >
                  Founder, Aether Celebrations
                </p>
                <p className="text-sm" style={{ lineHeight: '1.75' }}>
                  Remlyn personally handles all event inquiries. You'll be in direct contact with
                  the person planning your event from day one.
                </p>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="p-8 rounded-lg" style={CARD_STYLE}>
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-16 text-center">
                  <div
                    className="text-5xl gradient-text"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    ✦
                  </div>
                  <h3 style={{ margin: 0 }}>Thank you!</h3>
                  <p className="text-sm" style={{ lineHeight: '1.75' }}>
                    We're excited to celebrate with you. Remlyn will reach out within 24 hours.
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
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(192,0,106,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.22)')} />
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Phone *</label>
                      <input type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(192,0,106,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.22)')} />
                    </div>
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Email *</label>
                    <input type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={INPUT_STYLE}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(192,0,106,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.22)')} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Event Type *</label>
                    <select value={form.eventType}
                      onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                      style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday / Debut</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={LABEL_STYLE}>Event Date</label>
                      <input type="date" value={form.eventDate}
                        onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(192,0,106,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.22)')} />
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Est. Guest Count</label>
                      <input type="number" placeholder="e.g. 100" value={form.guestCount}
                        onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(192,0,106,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.22)')} />
                    </div>
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Budget Range</label>
                    <input type="text" placeholder="e.g. ₱50,000 – ₱100,000" value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      style={INPUT_STYLE}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(192,0,106,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.22)')} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Tell Us About Your Event *</label>
                    <textarea required rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...INPUT_STYLE, resize: 'vertical' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(192,0,106,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.22)')}
                      placeholder="Share your vision, theme ideas, or anything you'd like us to know..." />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background: 'linear-gradient(135deg, #ff1493 0%, #ff4081 40%, #6a4c93 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '14px 24px',
                      fontSize: '14px',
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Inquiry →'}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-center" style={{ color: '#c0006a' }}>
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
      <span className="text-base mt-0.5" style={{ color: '#c0006a' }}>{icon}</span>
      <div>
        <p style={{
          fontSize: '0.6875rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: '#c0006a',
          marginBottom: '4px',
          fontFamily: "'Lato', sans-serif",
        }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: '#555555', fontFamily: "'Lato', sans-serif" }}>{value}</p>
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
