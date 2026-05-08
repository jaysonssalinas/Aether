# Admin CRM UI Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current hot-pink/dark decorative design with a professional light-first CRM UI, with a user-selectable theme system (Light, Dark Professional, Dark Indigo).

**Architecture:** All colors become CSS custom properties on `[data-theme]` selectors. A `ThemeProvider` client component reads/writes `localStorage` and sets `document.documentElement.dataset.theme`. Every component uses `var(--color-*)` tokens — no hardcoded hex values remain in components.

**Spec:** `docs/superpowers/specs/2026-05-08-admin-ui-redesign.md`

**Tech Stack:** Next.js 16, Tailwind CSS v4, TypeScript, React 19

---

### Task 1: CSS Variable Foundation in globals.css

**Files:**
- Modify: `apps/admin/app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

The current file has `@theme inline` with brand-specific Tailwind tokens, `--color-brand-*` variables, and gradient utilities (`.gradient-text`, `.gradient-bg`, `.gradient-border`). Replace the entire file with the following:

```css
@import "tailwindcss";

/* ============================================================
   THEME TOKENS — three [data-theme] blocks
   ============================================================ */

[data-theme="light"] {
  --color-bg:             #f8fafc;
  --color-surface:        #ffffff;
  --color-border:         #e2e8f0;
  --color-text:           #0f172a;
  --color-muted:          #64748b;
  --color-subtle:         #94a3b8;
  --color-accent:         #3b82f6;
  --color-accent-hover:   #2563eb;
  --color-success:        #16a34a;
  --color-danger:         #ef4444;
  --color-sidebar-bg:     #ffffff;
  --color-sidebar-border: #e2e8f0;
  --card-shadow:          0 1px 3px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] {
  --color-bg:             #0f172a;
  --color-surface:        #1e293b;
  --color-border:         #334155;
  --color-text:           #f1f5f9;
  --color-muted:          #94a3b8;
  --color-subtle:         #64748b;
  --color-accent:         #3b82f6;
  --color-accent-hover:   #60a5fa;
  --color-success:        #22c55e;
  --color-danger:         #f87171;
  --color-sidebar-bg:     #0f172a;
  --color-sidebar-border: #1e293b;
  --card-shadow:          none;
}

[data-theme="dark-indigo"] {
  --color-bg:             #1c1c1e;
  --color-surface:        #2c2c2e;
  --color-border:         #3a3a3c;
  --color-text:           #ffffff;
  --color-muted:          #8e8e93;
  --color-subtle:         #636366;
  --color-accent:         #6366f1;
  --color-accent-hover:   #818cf8;
  --color-success:        #30d158;
  --color-danger:         #ff453a;
  --color-sidebar-bg:     #1c1c1e;
  --color-sidebar-border: #3a3a3c;
  --card-shadow:          none;
}

/* ============================================================
   BASE
   ============================================================ */

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'Inter', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ============================================================
   ANIMATIONS (kept for future use)
   ============================================================ */

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.animate-float      { animation: float 6s ease-in-out infinite; }
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
.animate-fade-in    { animation: fadeIn 1s ease-out forwards; }

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/globals.css
git commit -m "feat(admin): replace brand tokens with CSS variable theme system"
```

---

### Task 2: ThemeProvider Component + Layout Update

**Files:**
- Create: `apps/admin/components/ThemeProvider.tsx`
- Modify: `apps/admin/app/layout.tsx`

- [ ] **Step 1: Create ThemeProvider.tsx**

```tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'dark-indigo';

const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: 'light',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const saved = (localStorage.getItem('aether_admin_theme') as Theme) || 'light';
    setThemeState(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem('aether_admin_theme', t);
    document.documentElement.dataset.theme = t;
  }

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
```

- [ ] **Step 2: Update layout.tsx**

Replace the entire file:

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Aether Admin',
  description: 'Internal admin dashboard — Aether Digital & Celebrations',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

Note: removed Playfair Display from the Google Fonts URL. Removed `style` from `<body>` — globals.css now sets `background` and `color` via CSS vars.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/components/ThemeProvider.tsx apps/admin/app/layout.tsx
git commit -m "feat(admin): add ThemeProvider with localStorage persistence"
```

---

### Task 3: AdminSidebar Restyle

**Files:**
- Modify: `apps/admin/components/AdminSidebar.tsx`

- [ ] **Step 1: Replace AdminSidebar.tsx entirely**

The current sidebar uses hardcoded dark hex values, hot-pink gradient for the logo, Playfair Display, and Unicode symbols for nav icons. Replace with CSS vars, Inter, and inline SVG:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: '/customers',
    label: 'Customers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    href: '/subscriptions',
    label: 'Subscriptions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    href: '/pricing',
    label: 'Pricing',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    href: '/reports',
    label: 'Reports',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

export function AdminSidebar() {
  const path = usePathname();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-56 flex flex-col"
      style={{
        background: 'var(--color-sidebar-bg)',
        borderRight: '1px solid var(--color-sidebar-border)',
      }}
    >
      {/* Logo */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--color-sidebar-border)' }}>
        <p className="text-sm font-semibold tracking-widest" style={{ color: 'var(--color-text)' }}>
          AETHER
        </p>
        <p className="text-xs mt-0.5 tracking-widest" style={{ color: 'var(--color-subtle)' }}>
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {nav.map((item) => {
          const active = path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors"
              style={{
                color: active ? 'var(--color-text)' : 'var(--color-muted)',
                background: active ? 'var(--color-bg)' : 'transparent',
                borderLeft: active ? '3px solid var(--color-accent)' : '3px solid transparent',
                fontWeight: active ? 500 : 400,
              }}
            >
              <span style={{ color: active ? 'var(--color-accent)' : 'var(--color-subtle)', flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 flex flex-col gap-0.5" style={{ borderTop: '1px solid var(--color-sidebar-border)', paddingTop: '12px' }}>
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors"
          style={{ color: 'var(--color-subtle)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Website
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left w-full transition-colors"
          style={{ color: 'var(--color-subtle)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/components/AdminSidebar.tsx
git commit -m "feat(admin): restyle sidebar with CSS vars and SVG icons"
```

---

### Task 4: Login Page Restyle

**Files:**
- Modify: `apps/admin/app/login/page.tsx`

- [ ] **Step 1: Replace login/page.tsx entirely**

```tsx
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

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-2xl font-semibold tracking-widest"
            style={{ color: 'var(--color-text)' }}
          >
            AETHER
          </h1>
          <p className="text-xs tracking-widest mt-1.5 uppercase" style={{ color: 'var(--color-subtle)' }}>
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div
          className="p-8 rounded-xl"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <h2 className="text-base font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
            Sign in to your account
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label
                className="block text-xs font-medium uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--color-muted)' }}
              >
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  color: 'var(--color-text)',
                  padding: '9px 12px',
                  width: '100%',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
              />
            </div>

            <div>
              <label
                className="block text-xs font-medium uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--color-muted)' }}
              >
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  color: 'var(--color-text)',
                  padding: '9px 12px',
                  width: '100%',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
              />
            </div>

            {error && (
              <p className="text-xs text-center rounded-md py-2" style={{ color: 'var(--color-danger)', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: 'var(--color-accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                marginTop: '4px',
              }}
            >
              {status === 'loading' ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-subtle)' }}>
          Aether Internal · Not publicly accessible
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/login/page.tsx
git commit -m "feat(admin): restyle login page with CSS var tokens"
```

---

### Task 5: Dashboard Page Restyle

**Files:**
- Modify: `apps/admin/app/dashboard/page.tsx`

- [ ] **Step 1: Replace dashboard/page.tsx entirely**

```tsx
import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth';
import { AdminSidebar } from '../../components/AdminSidebar';

interface DashboardData {
  mrr: number;
  totalCustomers: number;
  renewalDue: number;
  revenueByProduct: { name: string; division: string; amount: number }[];
  renewalAlerts: {
    id: number;
    customer_name: string;
    product_name: string;
    monthly_amount: number;
    renewal_date: string;
    status: string;
  }[];
}

async function getDashboardData(): Promise<DashboardData> {
  const res = await fetch('http://localhost:3003/api/dashboard', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load dashboard data');
  return res.json();
}

const card: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: '10px',
  boxShadow: 'var(--card-shadow)',
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  let data: DashboardData;
  try {
    data = await getDashboardData();
  } catch {
    data = { mrr: 0, totalCustomers: 0, renewalDue: 0, revenueByProduct: [], renewalAlerts: [] };
  }
  const { mrr, totalCustomers, renewalDue, revenueByProduct, renewalAlerts } = data;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                Overview
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
                Welcome back, {session.name}.
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
              {new Date().toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl" style={card}>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>
                Monthly Recurring Revenue
              </p>
              <p className="text-3xl font-semibold" style={{ color: 'var(--color-text)' }}>
                ₱{mrr.toLocaleString()}
              </p>
              <p className="text-xs mt-1.5" style={{ color: 'var(--color-subtle)' }}>All products</p>
            </div>

            <div className="p-6 rounded-xl" style={card}>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>
                Total Customers
              </p>
              <p className="text-3xl font-semibold" style={{ color: 'var(--color-text)' }}>
                {totalCustomers}
              </p>
              <p className="text-xs mt-1.5" style={{ color: 'var(--color-subtle)' }}>Active subscriptions</p>
            </div>

            <div
              className="p-6 rounded-xl"
              style={{
                ...card,
                border: renewalDue > 0
                  ? '1px solid rgba(239,68,68,0.3)'
                  : '1px solid var(--color-border)',
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>
                Due for Renewal
              </p>
              <p
                className="text-3xl font-semibold"
                style={{ color: renewalDue > 0 ? 'var(--color-danger)' : 'var(--color-text)' }}
              >
                {renewalDue}
              </p>
              <p className="text-xs mt-1.5" style={{ color: 'var(--color-subtle)' }}>Next 30 days</p>
            </div>
          </div>

          {/* Revenue by Product */}
          <div className="p-6 rounded-xl" style={card}>
            <p className="text-xs font-medium uppercase tracking-wider mb-5" style={{ color: 'var(--color-muted)' }}>
              Revenue by Product
            </p>
            <div className="flex flex-col gap-3">
              {revenueByProduct.filter((item) => item.amount > 0).map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="w-44 text-xs truncate" style={{ color: 'var(--color-muted)' }}>
                    {item.name}
                  </div>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-border)' }}>
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${mrr > 0 ? (item.amount / mrr) * 100 : 0}%`,
                        background: item.division === 'digital' ? 'var(--color-accent)' : '#8b5cf6',
                      }}
                    />
                  </div>
                  <div className="w-24 text-right text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    ₱{item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              {mrr === 0 && (
                <p className="text-sm text-center py-4" style={{ color: 'var(--color-subtle)' }}>
                  No active subscriptions yet.
                </p>
              )}
            </div>
          </div>

          {/* Renewal Alerts */}
          {renewalAlerts.length > 0 && (
            <div
              className="p-6 rounded-xl"
              style={{ ...card, border: '1px solid rgba(239,68,68,0.25)' }}
            >
              <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: 'var(--color-danger)' }}>
                Renewal Alerts — Next 30 Days
              </p>
              <div className="flex flex-col">
                {renewalAlerts.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between py-3"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        {c.customer_name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                        {c.product_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: 'var(--color-danger)' }}>
                        {new Date(c.renewal_date).toLocaleDateString('en-PH')}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                        ₱{c.monthly_amount.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/dashboard/page.tsx
git commit -m "feat(admin): restyle dashboard with CSS var tokens"
```

---

### Task 6: Customers Page Restyle

**Files:**
- Modify: `apps/admin/app/customers/page.tsx`

- [ ] **Step 1: Read the current customers/page.tsx to understand full structure before editing**

Run: read `apps/admin/app/customers/page.tsx` in full.

- [ ] **Step 2: Replace all hardcoded hex values with CSS vars**

Apply these substitutions throughout the file:

| Old value | Replace with |
|-----------|-------------|
| `background: '#070707'` (main) | `background: 'var(--color-bg)'` |
| `background: '#0f0f0f'` (card) | `background: 'var(--color-surface)'` |
| `border: '1px solid #1e1e1e'` | `border: '1px solid var(--color-border)'` |
| `color: '#f5f5f0'` (primary text) | `color: 'var(--color-text)'` |
| `color: '#666666'` (muted) | `color: 'var(--color-muted)'` |
| `color: '#444444'` (subtle) | `color: 'var(--color-subtle)'` |
| `background: '#111111'` (input) | `background: 'var(--color-surface)'` |
| `color: '#22c55e'` or `color: '#16a34a'` (success) | `color: 'var(--color-success)'` |
| `color: '#ef4444'` or `color: '#ff4081'` (danger) | `color: 'var(--color-danger)'` |
| gradient button background | `background: 'var(--color-accent)'` |
| `fontFamily: "'Playfair Display'..."` | remove the fontFamily property |
| `borderBottom: '1px solid #1e1e1e'` (table rows) | `borderBottom: '1px solid var(--color-border)'` |

Also add `boxShadow: 'var(--card-shadow)'` to card elements (the main panel containers).

Page `<main>` background: `var(--color-bg)`.

Page heading `<h1>`: `text-xl font-semibold`, `color: var(--color-text)`.

Error banner (if present): `background: 'rgba(239,68,68,0.08)'`, `border: '1px solid rgba(239,68,68,0.2)'`, `color: 'var(--color-danger)'`.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/customers/page.tsx
git commit -m "feat(admin): restyle customers page with CSS var tokens"
```

---

### Task 7: Subscriptions Page Restyle

**Files:**
- Modify: `apps/admin/app/subscriptions/page.tsx`

- [ ] **Step 1: Read the current subscriptions/page.tsx in full**

Run: read `apps/admin/app/subscriptions/page.tsx` in full.

- [ ] **Step 2: Apply CSS var substitutions (same pattern as Task 6)**

Apply the same hex → CSS var substitutions as Task 6.

Additionally, replace the `STATUS_COLORS` constant at the top of the file:

```tsx
const STATUS_COLORS: Record<string, React.CSSProperties> = {
  active: {
    background: 'rgba(22,163,74,0.1)',
    color: 'var(--color-success)',
    border: '1px solid rgba(22,163,74,0.2)',
  },
  paused: {
    background: 'rgba(100,116,139,0.1)',
    color: 'var(--color-muted)',
    border: '1px solid var(--color-border)',
  },
  cancelled: {
    background: 'rgba(239,68,68,0.08)',
    color: 'var(--color-danger)',
    border: '1px solid rgba(239,68,68,0.2)',
  },
};
```

Status badge usage — wherever the badge is rendered, ensure it includes `borderRadius: '12px', padding: '2px 10px', fontSize: '11px', fontWeight: 500`.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/subscriptions/page.tsx
git commit -m "feat(admin): restyle subscriptions page with CSS var tokens"
```

---

### Task 8: Pricing Page Restyle

**Files:**
- Modify: `apps/admin/app/pricing/page.tsx`

- [ ] **Step 1: Read the current pricing/page.tsx in full**

Run: read `apps/admin/app/pricing/page.tsx` in full.

- [ ] **Step 2: Apply CSS var substitutions**

Apply the same hex → CSS var substitutions as Task 6.

Additionally:
- The `inp` inline style object currently uses `background: '#111111'` — replace with `background: 'var(--color-surface)'`
- Remove `fontFamily` from `<h1>` (currently Playfair Display)
- The info note at the bottom currently has `background: 'rgba(255,20,147,0.05)'` and `border: '1px solid rgba(255,20,147,0.1)'` — replace with `background: 'var(--color-bg)'` and `border: '1px solid var(--color-border)'`
- Division labels: add small badge-style pills — `Digital` in accent tones, `Celebrations` in purple tones:
  ```tsx
  // Digital badge
  { background: 'rgba(59,130,246,0.1)', color: 'var(--color-accent)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', padding: '2px 8px', fontSize: '11px' }
  // Celebrations badge
  { background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', padding: '2px 8px', fontSize: '11px' }
  ```
  These replace the current plain text division headers on the section cards.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/pricing/page.tsx
git commit -m "feat(admin): restyle pricing page with CSS var tokens"
```

---

### Task 9: Reports Page Restyle

**Files:**
- Modify: `apps/admin/app/reports/page.tsx`

- [ ] **Step 1: Read the current reports/page.tsx in full**

Run: read `apps/admin/app/reports/page.tsx` in full.

- [ ] **Step 2: Apply CSS var substitutions**

Apply the same hex → CSS var substitutions as Task 6. This page is likely minimal — just restyle the shell (`<main>` background, heading, any cards).

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/reports/page.tsx
git commit -m "feat(admin): restyle reports page with CSS var tokens"
```

---

### Task 10: Settings Page with Theme Picker

**Files:**
- Create: `apps/admin/app/settings/page.tsx`

- [ ] **Step 1: Create settings/page.tsx**

```tsx
'use client';

import { AdminSidebar } from '../../components/AdminSidebar';
import { useTheme, Theme } from '../../components/ThemeProvider';

const THEMES: {
  key: Theme;
  label: string;
  description: string;
  preview: {
    bg: string;
    surface: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
  };
}[] = [
  {
    key: 'light',
    label: 'Light',
    description: 'Clean white surfaces, easy on the eyes during long sessions.',
    preview: { bg: '#f8fafc', surface: '#ffffff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#3b82f6' },
  },
  {
    key: 'dark',
    label: 'Dark Professional',
    description: 'Deep slate dark. Like Vercel or Linear dashboards.',
    preview: { bg: '#0f172a', surface: '#1e293b', border: '#334155', text: '#f1f5f9', muted: '#94a3b8', accent: '#3b82f6' },
  },
  {
    key: 'dark-indigo',
    label: 'Dark Indigo',
    description: 'Warm neutral dark with indigo accent. macOS-inspired.',
    preview: { bg: '#1c1c1e', surface: '#2c2c2e', border: '#3a3a3c', text: '#ffffff', muted: '#8e8e93', accent: '#6366f1' },
  },
];

function ThemePreview({ p }: { p: (typeof THEMES)[0]['preview'] }) {
  return (
    <div
      style={{
        background: p.bg,
        borderRadius: '6px',
        padding: '10px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
      }}
    >
      {/* Mock stat row */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
        {['MRR', 'Customers', 'Renewals'].map((label) => (
          <div
            key={label}
            style={{
              flex: 1,
              background: p.surface,
              border: `1px solid ${p.border}`,
              borderRadius: '5px',
              padding: '6px',
            }}
          >
            <div style={{ color: p.muted, marginBottom: '3px' }}>{label}</div>
            <div
              style={{
                color: label === 'MRR' ? p.accent : p.text,
                fontWeight: 600,
                fontSize: '11px',
              }}
            >
              {label === 'MRR' ? '₱48.5k' : label === 'Customers' ? '24' : '3'}
            </div>
          </div>
        ))}
      </div>
      {/* Mock table row */}
      <div
        style={{
          background: p.surface,
          border: `1px solid ${p.border}`,
          borderRadius: '5px',
          padding: '6px 8px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: p.text }}>Rimando Law Office</span>
        <span style={{ color: p.accent }}>₱3,500</span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
              Settings
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
              Preferences for your admin session.
            </p>
          </div>

          {/* Appearance */}
          <div
            className="p-6 rounded-xl"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <p
              className="text-xs font-medium uppercase tracking-wider mb-5"
              style={{ color: 'var(--color-muted)' }}
            >
              Appearance
            </p>

            <div className="grid grid-cols-3 gap-4">
              {THEMES.map((t) => {
                const selected = theme === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    style={{
                      background: 'transparent',
                      border: selected
                        ? '2px solid var(--color-accent)'
                        : '2px solid var(--color-border)',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <ThemePreview p={t.preview} />
                    <div className="mt-3">
                      <p
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {t.label}
                      </p>
                      <p
                        className="text-xs mt-0.5 leading-relaxed"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {t.description}
                      </p>
                    </div>
                    {selected && (
                      <div
                        className="mt-2 text-xs font-medium"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        ✓ Active
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/settings/page.tsx
git commit -m "feat(admin): add Settings page with theme picker"
```

---

## Final Verification

After all tasks complete:

- [ ] Run `pnpm --filter @aether/admin dev` and open `http://localhost:3003`
- [ ] Log in, verify login page looks clean (no gradients, no serif)
- [ ] Check sidebar — AETHER wordmark is plain Inter, SVG icons visible, active state shows left blue border
- [ ] Check dashboard — stat cards are white/bordered in light theme, numbers readable
- [ ] Navigate to Settings, switch to Dark theme, verify all pages switch correctly
- [ ] Switch back to Light, verify `localStorage` persists after page reload
- [ ] Navigate all pages to confirm no pages still have hardcoded dark backgrounds
