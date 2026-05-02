'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
        setStatus('error');
      }
    } catch {
      setError('Connection error. Please try again.');
      setStatus('error');
    }
  }

  const inp: React.CSSProperties = {
    background: '#111111', border: '1px solid #1e1e1e', borderRadius: '4px',
    color: '#f5f5f0', padding: '12px 16px', width: '100%', fontSize: '14px',
    fontFamily: "'Inter', sans-serif", outline: 'none',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#070707' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-medium tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display',Georgia,serif", background: 'linear-gradient(135deg,#ff1493,#6a4c93)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AETHER
          </h1>
          <p className="text-xs tracking-[0.15em] mt-2" style={{ color: '#444444' }}>ADMIN PANEL</p>
        </div>

        <div className="p-8 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
          <h2 className="text-lg font-medium mb-6" style={{ color: '#f5f5f0' }}>Sign in</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase mb-2" style={{ color: '#666666' }}>Email</label>
              <input
                type="email" required autoComplete="email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inp}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')}
                onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')}
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase mb-2" style={{ color: '#666666' }}>Password</label>
              <input
                type="password" required autoComplete="current-password"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={inp}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(255,20,147,0.4)')}
                onBlur={(e) => (e.target.style.borderColor = '#1e1e1e')}
              />
            </div>

            {error && (
              <p className="text-xs text-center" style={{ color: '#ff4081' }}>{error}</p>
            )}

            <button type="submit" disabled={status === 'loading'}
              style={{
                background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none',
                borderRadius: '4px', padding: '14px 24px', fontSize: '14px',
                fontFamily: "'Inter',sans-serif", cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1, marginTop: '4px',
              }}>
              {status === 'loading' ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#333333' }}>
          Aether Internal · Not publicly accessible
        </p>
      </div>
    </div>
  );
}
