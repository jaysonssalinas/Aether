'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn } from '../../lib/motion';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: 'digital',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const shouldReduce = useReducedMotion();

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
    background: '#faf8ff',
    border: '1px solid #e0d7f0',
    borderRadius: '4px',
    color: '#1a1a1a',
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
    color: '#888888',
    marginBottom: '8px',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <>
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#ffffff' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(106,76,147,0.04) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left: info */}
            <motion.div
              className="flex flex-col gap-8"
              variants={shouldReduce ? undefined : staggerContainer}
              initial={shouldReduce ? undefined : 'hidden'}
              animate="visible"
            >
              <motion.div
                className="flex flex-col gap-4"
                variants={shouldReduce ? undefined : fadeUp}
              >
                <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#aaaaaa' }}>
                  Contact
                </p>
                <h1
                  className="text-4xl md:text-5xl font-medium leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a' }}
                >
                  Let&rsquo;s start a conversation.
                </h1>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  Whether you have a project in mind or just want to explore what&rsquo;s possible, we
                  respond within 24 hours.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col gap-6"
                variants={shouldReduce ? undefined : fadeUp}
              >
                <ContactInfo icon="✉" label="Email" value="contact@aether.com.ph" href="mailto:contact@aether.com.ph" />
                <ContactInfo icon="📞" label="Phone" value="0966 987 3475" href="tel:09669873475" />
                <ContactInfo icon="📍" label="Location" value="Dasmarinas, Cavite, Philippines" />
              </motion.div>

              <motion.div
                className="flex flex-col gap-3"
                variants={shouldReduce ? undefined : fadeUp}
              >
                <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#aaaaaa' }}>
                  Divisions
                </p>
                <p className="text-sm" style={{ color: '#666666' }}>
                  <span style={{ color: '#ff4081' }}>Aether Digital</span> — Jayson Salinas
                </p>
                <p className="text-sm" style={{ color: '#666666' }}>
                  <span style={{ color: '#a07cc8' }}>Aether Celebrations</span> — Remlyn Salinas
                </p>
              </motion.div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              className="p-8 rounded-lg"
              style={{ background: '#f8f5ff', border: '1px solid #e8e0f5' }}
              initial={shouldReduce ? undefined : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
            >
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="success"
                    variants={shouldReduce ? undefined : scaleIn}
                    initial={shouldReduce ? undefined : 'hidden'}
                    animate="visible"
                    exit={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center"
                  >
                    <div className="text-4xl gradient-text">✦</div>
                    <h3
                      className="text-2xl font-medium"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a' }}
                    >
                      Message received.
                    </h3>
                    <p className="text-sm" style={{ color: '#666666' }}>
                      We&rsquo;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    initial={{ opacity: 1 }}
                    exit={shouldReduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } }}
                  >
                    <div>
                      <label style={labelStyle}>Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')}
                        onBlur={(e) => (e.target.style.borderColor = '#e0d7f0')}
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
                        onBlur={(e) => (e.target.style.borderColor = '#e0d7f0')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>I&rsquo;m interested in</label>
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
                        onBlur={(e) => (e.target.style.borderColor = '#e0d7f0')}
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
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.p
                          initial={shouldReduce ? undefined : { opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="text-sm text-center"
                          style={{ color: '#ff4081' }}
                        >
                          Something went wrong. Please email us directly at contact@aether.com.ph
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
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
        <p className="text-xs tracking-[0.1em] uppercase mb-1" style={{ color: '#aaaaaa' }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: '#555555' }}>
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
