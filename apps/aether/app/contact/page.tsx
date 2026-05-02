'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

// Note: metadata can't be exported from 'use client' components — moved to layout if needed.

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: 'digital',
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
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    background: '#111111',
    border: '1px solid #1e1e1e',
    borderRadius: '4px',
    color: '#f5f5f0',
    padding: '12px 16px',
    width: '100%',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#666666',
    marginBottom: '8px',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <>
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(106,76,147,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left: info */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>
                  Contact
                </p>
                <h1
                  className="text-4xl md:text-5xl font-medium leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
                >
                  Let's start a conversation.
                </h1>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  Whether you have a project in mind or just want to explore what's possible, we
                  respond within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <ContactInfo icon="✉" label="Email" value="contact@aether.com.ph" href="mailto:contact@aether.com.ph" />
                <ContactInfo icon="📞" label="Phone" value="0966 987 3475" href="tel:09669873475" />
                <ContactInfo icon="📍" label="Location" value="Dasmarinas, Cavite, Philippines" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#444444' }}>
                  Divisions
                </p>
                <p className="text-sm" style={{ color: '#666666' }}>
                  <span style={{ color: '#ff4081' }}>Aether Digital</span> — Jayson Salinas
                </p>
                <p className="text-sm" style={{ color: '#666666' }}>
                  <span style={{ color: '#a07cc8' }}>Aether Celebrations</span> — Remlyn Salinas
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div
              className="p-8 rounded-lg"
              style={{ background: '#111111', border: '1px solid #1e1e1e' }}
            >
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                  <div className="text-4xl">✦</div>
                  <h3
                    className="text-2xl font-medium"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
                  >
                    Message received.
                  </h3>
                  <p className="text-sm" style={{ color: '#666666' }}>
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')}
                      onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')}
                      onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>I'm interested in</label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="digital">Aether Digital (websites, software)</option>
                      <option value="celebrations">Aether Celebrations (events, weddings)</option>
                      <option value="both">Both divisions</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')}
                      onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')}
                      placeholder="Tell us about your project or idea..."
                    />
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
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '0.05em',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message →'}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-center" style={{ color: '#ff4081' }}>
                      Something went wrong. Please email us directly at contact@aether.com.ph
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfo({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="text-lg mt-0.5">{icon}</span>
      <div>
        <p className="text-xs tracking-[0.1em] uppercase mb-1" style={{ color: '#444444' }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: '#999999' }}>
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="hover:opacity-70 transition-opacity">
        {content}
      </a>
    );
  }
  return content;
}
