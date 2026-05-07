# Phase 2: CRM Database Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all mock/in-memory data in `apps/admin` with real PostgreSQL queries. Build the subscriptions management page. Produce a fully working CRM accessible at `http://localhost:3003` with live MRR, real customer records, and real subscription tracking.

**Architecture:** `apps/admin` uses Next.js API routes as a thin server layer over PostgreSQL (`pg` package already installed). A shared `lib/db.ts` pool is the only DB entry point — all API routes import from it. Pages fetch data from these API routes using standard `fetch`. The database schema and views are already defined in `apps/admin/database/schema.sql` and require no changes.

**Tech Stack:** Next.js 16, PostgreSQL (via `pg` v8 — already installed), TypeScript, pnpm monorepo. No ORM — raw SQL for simplicity and full control.

---

## Prerequisites

Before starting, PostgreSQL must be running locally with the schema applied:

```bash
# 1. Create the database (if not done already)
# In pgAdmin 4: create database named 'aether_admin'
# OR in terminal:
psql -U postgres -c "CREATE DATABASE aether_admin;"

# 2. Apply the schema
psql -U postgres -d aether_admin -f apps/admin/database/schema.sql

# 3. Create apps/admin/.env.local (never commit this file)
```

`apps/admin/.env.local` must contain:

```
DATABASE_URL=postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/aether_admin
JWT_SECRET=any-long-random-string-for-dev
```

Replace `YOUR_POSTGRES_PASSWORD` with your pgAdmin password.

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `apps/admin/lib/db.ts` | Shared PostgreSQL connection pool |
| Create | `apps/admin/app/api/customers/route.ts` | GET list + POST new customer |
| Create | `apps/admin/app/api/customers/[id]/route.ts` | GET one + PUT + DELETE customer |
| Create | `apps/admin/app/api/subscriptions/route.ts` | GET list + POST new subscription |
| Create | `apps/admin/app/api/subscriptions/[id]/route.ts` | PUT + DELETE subscription |
| Create | `apps/admin/app/api/dashboard/route.ts` | GET MRR summary + revenue by product |
| Create | `apps/admin/app/subscriptions/page.tsx` | Subscriptions management UI |
| Modify | `apps/admin/app/dashboard/page.tsx` | Replace mock data with real API calls |
| Modify | `apps/admin/app/customers/page.tsx` | Replace in-memory state with real API |
| Modify | `apps/admin/app/api/pricing/route.ts` | Persist price changes to DB |
| Modify | `apps/admin/components/AdminSidebar.tsx` | Add Subscriptions nav link |

---

## Task 1: Database connection utility

**Files:**
- Create: `apps/admin/lib/db.ts`

- [ ] **Step 1: Create `apps/admin/lib/db.ts`**

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
```

- [ ] **Step 2: Verify the connection works**

Create a temporary test file `apps/admin/lib/db-test.ts` (delete after testing):

```typescript
import pool from './db';

async function test() {
  const client = await pool.connect();
  const result = await client.query('SELECT NOW() as now');
  console.log('DB connected:', result.rows[0].now);
  client.release();
  await pool.end();
}

test().catch(console.error);
```

Run it:

```bash
cd apps/admin && npx ts-node --project tsconfig.json lib/db-test.ts
```

Expected output: `DB connected: 2026-05-07T...`

Delete `apps/admin/lib/db-test.ts` after confirming connection.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/lib/db.ts
git commit -m "feat: add PostgreSQL connection pool to admin"
```

---

## Task 2: Customer API routes

**Files:**
- Create: `apps/admin/app/api/customers/route.ts`
- Create: `apps/admin/app/api/customers/[id]/route.ts`

- [ ] **Step 1: Create `apps/admin/app/api/customers/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import pool from '../../../lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await pool.query(`
    SELECT
      c.id,
      c.name,
      c.email,
      c.phone,
      c.address,
      c.notes,
      c.created_at,
      COUNT(s.id) FILTER (WHERE s.status = 'active') AS active_subscriptions,
      COALESCE(SUM(s.monthly_amount) FILTER (WHERE s.status = 'active'), 0) AS monthly_total
    FROM customers c
    LEFT JOIN subscriptions s ON s.customer_id = c.id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `);

  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, email, phone, address, notes } = await req.json();

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const result = await pool.query(
    `INSERT INTO customers (name, email, phone, address, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email ?? null, phone ?? null, address ?? null, notes ?? null]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
```

- [ ] **Step 2: Create `apps/admin/app/api/customers/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import pool from '../../../../lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const customerResult = await pool.query(
    'SELECT * FROM customers WHERE id = $1',
    [id]
  );

  if (customerResult.rows.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const subscriptionsResult = await pool.query(
    `SELECT s.*, p.name AS product_name, p.division
     FROM subscriptions s
     JOIN products p ON p.id = s.product_id
     WHERE s.customer_id = $1
     ORDER BY s.created_at DESC`,
    [id]
  );

  return NextResponse.json({
    ...customerResult.rows[0],
    subscriptions: subscriptionsResult.rows,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { name, email, phone, address, notes } = await req.json();

  const result = await pool.query(
    `UPDATE customers
     SET name = $1, email = $2, phone = $3, address = $4, notes = $5
     WHERE id = $6
     RETURNING *`,
    [name, email ?? null, phone ?? null, address ?? null, notes ?? null, id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  await pool.query('DELETE FROM customers WHERE id = $1', [id]);

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Test the customer endpoints**

```bash
pnpm --filter @aether/admin dev
```

In a separate terminal (after logging in at `http://localhost:3003/login`):

```bash
# Get all customers (should return empty array initially)
curl -s http://localhost:3003/api/customers \
  -H "Cookie: $(curl -s -c - -X POST http://localhost:3003/api/auth/login \
    -H 'Content-Type: application/json' \
    -d '{"email":"jayson@aether.com.ph","password":"aether2026"}' \
    -o /dev/null -w '%{cookie_jar}' 2>/dev/null)" | python -m json.tool
```

Expected: `[]` (empty array — no customers yet)

Or simply log in at `http://localhost:3003/login` and verify the UI doesn't throw errors.

- [ ] **Step 4: Commit**

```bash
git add apps/admin/app/api/customers/
git commit -m "feat: customer CRUD API routes connected to PostgreSQL"
```

---

## Task 3: Subscription API routes

**Files:**
- Create: `apps/admin/app/api/subscriptions/route.ts`
- Create: `apps/admin/app/api/subscriptions/[id]/route.ts`

- [ ] **Step 1: Create `apps/admin/app/api/subscriptions/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import pool from '../../../lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await pool.query(`
    SELECT
      s.id,
      s.customer_id,
      s.product_id,
      s.monthly_amount,
      s.start_date,
      s.renewal_date,
      s.status,
      s.notes,
      s.created_at,
      c.name AS customer_name,
      p.name AS product_name,
      p.division
    FROM subscriptions s
    JOIN customers c ON c.id = s.customer_id
    JOIN products p ON p.id = s.product_id
    ORDER BY s.renewal_date ASC
  `);

  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { customer_id, product_id, monthly_amount, start_date, renewal_date, notes } =
    await req.json();

  if (!customer_id || !product_id || !start_date || !renewal_date) {
    return NextResponse.json(
      { error: 'customer_id, product_id, start_date, and renewal_date are required' },
      { status: 400 }
    );
  }

  const result = await pool.query(
    `INSERT INTO subscriptions (customer_id, product_id, monthly_amount, start_date, renewal_date, notes)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      customer_id,
      product_id,
      monthly_amount ?? 0,
      start_date,
      renewal_date,
      notes ?? null,
    ]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
```

- [ ] **Step 2: Create `apps/admin/app/api/subscriptions/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import pool from '../../../../lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { monthly_amount, renewal_date, status, notes } = await req.json();

  const result = await pool.query(
    `UPDATE subscriptions
     SET monthly_amount = $1,
         renewal_date   = $2,
         status         = $3,
         notes          = $4,
         updated_at     = NOW()
     WHERE id = $5
     RETURNING *`,
    [monthly_amount, renewal_date, status, notes ?? null, id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  await pool.query('DELETE FROM subscriptions WHERE id = $1', [id]);

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/api/subscriptions/
git commit -m "feat: subscription CRUD API routes connected to PostgreSQL"
```

---

## Task 4: Dashboard API route

**Files:**
- Create: `apps/admin/app/api/dashboard/route.ts`

- [ ] **Step 1: Create `apps/admin/app/api/dashboard/route.ts`**

The database already has two views that do the heavy lifting: `mrr_summary` and `revenue_by_product`.

```typescript
import { NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import pool from '../../../lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [summaryResult, revenueResult, renewalsResult] = await Promise.all([
    pool.query('SELECT * FROM mrr_summary'),
    pool.query('SELECT * FROM revenue_by_product LIMIT 10'),
    pool.query(`
      SELECT
        s.id,
        c.name AS customer_name,
        p.name AS product_name,
        s.monthly_amount,
        s.renewal_date,
        s.status
      FROM subscriptions s
      JOIN customers c ON c.id = s.customer_id
      JOIN products p ON p.id = s.product_id
      WHERE s.status = 'active'
        AND s.renewal_date <= CURRENT_DATE + INTERVAL '30 days'
      ORDER BY s.renewal_date ASC
      LIMIT 10
    `),
  ]);

  const summary = summaryResult.rows[0] ?? {
    total_mrr: 0,
    total_customers: 0,
    renewals_due_30d: 0,
  };

  return NextResponse.json({
    mrr: Number(summary.total_mrr ?? 0),
    totalCustomers: Number(summary.total_customers ?? 0),
    renewalDue: Number(summary.renewals_due_30d ?? 0),
    revenueByProduct: revenueResult.rows.map((r) => ({
      name: r.product_name,
      division: r.division,
      amount: Number(r.monthly_revenue ?? 0),
      customerCount: Number(r.customer_count ?? 0),
    })),
    renewalAlerts: renewalsResult.rows,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/admin/app/api/dashboard/route.ts
git commit -m "feat: dashboard API route queries live PostgreSQL views"
```

---

## Task 5: Connect dashboard page to real data

**Files:**
- Modify: `apps/admin/app/dashboard/page.tsx`

- [ ] **Step 1: Replace mock data with real API fetch in `apps/admin/app/dashboard/page.tsx`**

Replace the entire file content with:

```typescript
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
  const res = await fetch('http://localhost:3003/api/dashboard', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to load dashboard data');
  return res.json();
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const data = await getDashboardData();
  const { mrr, totalCustomers, renewalDue, revenueByProduct, renewalAlerts } = data;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: '#070707' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>Overview</h1>
              <p className="text-sm mt-1" style={{ color: '#666666' }}>Welcome back, {session.name}.</p>
            </div>
            <p className="text-xs" style={{ color: '#444444' }}>
              {new Date().toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Big metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-8 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: '#666666' }}>Monthly Recurring Revenue</p>
              <p className="text-4xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", background: 'linear-gradient(135deg,#ff1493,#6a4c93)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ₱{mrr.toLocaleString()}
              </p>
              <p className="text-xs mt-2" style={{ color: '#444444' }}>MRR · All products</p>
            </div>
            <div className="p-8 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: '#666666' }}>Total Customers</p>
              <p className="text-4xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>{totalCustomers}</p>
              <p className="text-xs mt-2" style={{ color: '#444444' }}>Active subscriptions</p>
            </div>
            <div className="p-8 rounded-lg" style={{ background: '#0f0f0f', border: renewalDue > 0 ? '1px solid rgba(255,64,129,0.3)' : '1px solid #1e1e1e' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: '#666666' }}>Due for Renewal</p>
              <p className="text-4xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: renewalDue > 0 ? '#ff4081' : '#f5f5f0' }}>{renewalDue}</p>
              <p className="text-xs mt-2" style={{ color: '#444444' }}>Next 30 days</p>
            </div>
          </div>

          {/* Revenue breakdown */}
          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: '#666666' }}>Revenue by Product</p>
            <div className="flex flex-col gap-3">
              {revenueByProduct.filter((item) => item.amount > 0).map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="w-40 text-xs truncate" style={{ color: '#888888' }}>{item.name}</div>
                  <div className="flex-1 h-2 rounded-full" style={{ background: '#1a1a1a' }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${mrr > 0 ? (item.amount / mrr) * 100 : 0}%`,
                        background: item.division === 'digital' ? '#ff1493' : '#6a4c93',
                      }}
                    />
                  </div>
                  <div className="w-24 text-right text-sm font-medium" style={{ color: '#f5f5f0' }}>
                    ₱{item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              {mrr === 0 && (
                <p className="text-sm text-center py-4" style={{ color: '#444444' }}>
                  No active subscriptions yet. Add customers to start tracking MRR.
                </p>
              )}
            </div>
          </div>

          {/* Renewal alerts */}
          {renewalAlerts.length > 0 && (
            <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid rgba(255,64,129,0.2)' }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: '#ff4081' }}>⚠ Renewal Alerts — Next 30 Days</p>
              <div className="flex flex-col gap-3">
                {renewalAlerts.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1e1e1e' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{c.customer_name}</p>
                      <p className="text-xs" style={{ color: '#666666' }}>{c.product_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: '#ff4081' }}>
                        {new Date(c.renewal_date).toLocaleDateString('en-PH')}
                      </p>
                      <p className="text-xs" style={{ color: '#666666' }}>₱{c.monthly_amount.toLocaleString()}/mo</p>
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

- [ ] **Step 2: Verify dashboard loads**

```bash
pnpm --filter @aether/admin dev
```

Visit `http://localhost:3003/dashboard`. Should show MRR = ₱0, Customers = 0 (real empty DB). No JavaScript errors in console.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/dashboard/page.tsx
git commit -m "feat: dashboard page connected to real PostgreSQL data"
```

---

## Task 6: Connect customers page to real API

**Files:**
- Modify: `apps/admin/app/customers/page.tsx`

The existing customers page uses local React state. We replace the data layer while keeping the same UI.

- [ ] **Step 1: Replace data layer in `apps/admin/app/customers/page.tsx`**

Replace only the data-handling sections. The full updated file:

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Customer {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  active_subscriptions: number;
  monthly_total: number;
}

const statusColors = {
  active: { bg: 'rgba(0,188,212,0.1)', color: '#00bcd4', border: 'rgba(0,188,212,0.2)' },
  due: { bg: 'rgba(255,64,129,0.1)', color: '#ff4081', border: 'rgba(255,64,129,0.2)' },
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '', email: '', phone: '', address: '', notes: '',
  });

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/customers');
      if (res.ok) setCustomers(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.email ?? '').toLowerCase().includes(search.toLowerCase())
  );

  async function addCustomer() {
    if (!newCustomer.name) return;
    setSaving(true);
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });
      if (res.ok) {
        setNewCustomer({ name: '', email: '', phone: '', address: '', notes: '' });
        setShowAdd(false);
        await fetchCustomers();
      }
    } finally {
      setSaving(false);
    }
  }

  async function deleteCustomer(id: number) {
    if (!confirm('Delete this customer and all their subscriptions?')) return;
    await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    setSelected(null);
    await fetchCustomers();
  }

  const inp: React.CSSProperties = {
    background: '#111111', border: '1px solid #2a2a2a', borderRadius: '4px',
    color: '#f5f5f0', padding: '8px 12px', fontSize: '13px', outline: 'none', width: '100%',
  };

  const totalMRR = customers.reduce((s, c) => s + c.monthly_total, 0);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: '#070707' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>Customers</h1>
              <p className="text-sm mt-1" style={{ color: '#666666' }}>
                {customers.length} total · ₱{totalMRR.toLocaleString()}/month MRR
              </p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 18px', fontSize: '13px', cursor: 'pointer' }}
            >
              + Add Customer
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inp, maxWidth: '320px' }}
          />

          {/* Add form */}
          {showAdd && (
            <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid rgba(255,20,147,0.2)' }}>
              <p className="text-sm font-medium mb-4" style={{ color: '#f5f5f0' }}>Add New Customer</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Name *', key: 'name', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Phone', key: 'phone', type: 'tel' },
                  { label: 'Address', key: 'address', type: 'text' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs mb-1" style={{ color: '#666666' }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={(newCustomer as Record<string, string>)[f.key]}
                      onChange={(e) => setNewCustomer({ ...newCustomer, [f.key]: e.target.value })}
                      style={inp}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-xs mb-1" style={{ color: '#666666' }}>Notes</label>
                <textarea
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  rows={2}
                  style={{ ...inp, resize: 'vertical' }}
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addCustomer}
                  disabled={saving}
                  style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? 'Saving...' : 'Save Customer'}
                </button>
                <button
                  onClick={() => setShowAdd(false)}
                  style={{ background: '#1a1a1a', color: '#888888', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                    {['Name', 'Email', 'Subscriptions', 'MRR', ''].map((h) => (
                      <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: '#444444' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={5} className="py-8 text-center text-sm" style={{ color: '#444444' }}>Loading...</td></tr>
                  )}
                  {!loading && filtered.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #111111' }}>
                      <td className="py-3 font-medium" style={{ color: '#f5f5f0' }}>{c.name}</td>
                      <td className="py-3" style={{ color: '#888888' }}>{c.email ?? '—'}</td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-1 rounded-full" style={c.active_subscriptions > 0 ? statusColors.active : { bg: '#1a1a1a', color: '#555555', border: '#222222' } as React.CSSProperties}>
                          {c.active_subscriptions} active
                        </span>
                      </td>
                      <td className="py-3" style={{ color: '#f5f5f0' }}>
                        {c.monthly_total > 0 ? `₱${c.monthly_total.toLocaleString()}` : '—'}
                      </td>
                      <td className="py-3">
                        <button onClick={() => setSelected(c)} className="text-xs" style={{ color: '#666666', background: 'none', border: 'none', cursor: 'pointer' }}>View →</button>
                      </td>
                    </tr>
                  ))}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={5} className="py-8 text-center text-sm" style={{ color: '#444444' }}>No customers found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail drawer */}
          {selected && (
            <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSelected(null)}>
              <div className="h-full w-full max-w-sm overflow-y-auto p-8 flex flex-col gap-6" style={{ background: '#0f0f0f', borderLeft: '1px solid #1e1e1e' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>{selected.name}</h2>
                  <button onClick={() => setSelected(null)} style={{ color: '#666666', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>×</button>
                </div>
                {[
                  { label: 'Email', val: selected.email ?? '—' },
                  { label: 'Phone', val: selected.phone ?? '—' },
                  { label: 'Address', val: selected.address ?? '—' },
                  { label: 'MRR', val: selected.monthly_total > 0 ? `₱${selected.monthly_total.toLocaleString()}/mo` : '—' },
                ].map((d) => (
                  <div key={d.label} className="flex flex-col gap-1 py-3" style={{ borderBottom: '1px solid #1e1e1e' }}>
                    <p className="text-xs" style={{ color: '#444444' }}>{d.label}</p>
                    <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{d.val}</p>
                  </div>
                ))}
                {selected.notes && (
                  <div>
                    <p className="text-xs mb-2" style={{ color: '#444444' }}>Notes</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{selected.notes}</p>
                  </div>
                )}
                <div className="mt-auto pt-4" style={{ borderTop: '1px solid #1e1e1e' }}>
                  <a
                    href={`/subscriptions?customer=${selected.id}`}
                    className="text-sm"
                    style={{ color: '#ff1493' }}
                  >
                    View Subscriptions →
                  </a>
                </div>
                <button
                  onClick={() => deleteCustomer(selected.id)}
                  className="text-xs"
                  style={{ color: '#ff4081', background: 'none', border: '1px solid rgba(255,64,129,0.2)', borderRadius: '4px', padding: '8px', cursor: 'pointer' }}
                >
                  Delete Customer
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Add a customer through the UI and verify it persists**

1. Visit `http://localhost:3003/customers`
2. Click "+ Add Customer"
3. Enter: Name = "Rimando Law Office", Email = "rimandolawoffice@gmail.com"
4. Click "Save Customer"

Expected: Customer appears in the table. Refresh the page — customer still there (data is now in PostgreSQL, not memory).

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/customers/page.tsx
git commit -m "feat: customers page connected to real PostgreSQL via API"
```

---

## Task 7: Create subscriptions management page

**Files:**
- Create: `apps/admin/app/subscriptions/page.tsx`
- Modify: `apps/admin/components/AdminSidebar.tsx`

- [ ] **Step 1: Add Subscriptions link to sidebar**

Open `apps/admin/components/AdminSidebar.tsx`. Find the nav links array (look for `/customers`, `/pricing`, etc.) and add a subscriptions entry:

```typescript
{ href: '/subscriptions', label: 'Subscriptions', icon: '◈' },
```

Add it after the Customers link.

- [ ] **Step 2: Create `apps/admin/app/subscriptions/page.tsx`**

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

interface Subscription {
  id: number;
  customer_id: number;
  customer_name: string;
  product_id: string;
  product_name: string;
  division: string;
  monthly_amount: number;
  start_date: string;
  renewal_date: string;
  status: 'active' | 'paused' | 'cancelled';
  notes: string | null;
}

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: string;
  name: string;
  division: string;
  frequency: string;
  startingPrice: number | null;
}

const STATUS_COLORS = {
  active: { bg: 'rgba(0,188,212,0.1)', color: '#00bcd4', border: 'rgba(0,188,212,0.2)' },
  paused: { bg: 'rgba(255,193,7,0.1)', color: '#ffc107', border: 'rgba(255,193,7,0.2)' },
  cancelled: { bg: 'rgba(100,100,100,0.1)', color: '#666666', border: 'rgba(100,100,100,0.2)' },
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'cancelled'>('all');
  const [newSub, setNewSub] = useState({
    customer_id: '',
    product_id: '',
    monthly_amount: '',
    start_date: new Date().toISOString().slice(0, 10),
    renewal_date: '',
    notes: '',
  });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [subsRes, custsRes, prodsRes] = await Promise.all([
        fetch('/api/subscriptions'),
        fetch('/api/customers'),
        fetch('/api/pricing'),
      ]);
      const [subs, custs, prods] = await Promise.all([
        subsRes.json(),
        custsRes.json(),
        prodsRes.json(),
      ]);
      setSubscriptions(subs);
      setCustomers(custs);
      setProducts(prods);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = subscriptions.filter(
    (s) => filterStatus === 'all' || s.status === filterStatus
  );

  const totalMRR = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + s.monthly_amount, 0);

  async function addSubscription() {
    if (!newSub.customer_id || !newSub.product_id || !newSub.renewal_date) return;
    setSaving(true);
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: parseInt(newSub.customer_id),
          product_id: newSub.product_id,
          monthly_amount: parseInt(newSub.monthly_amount) || 0,
          start_date: newSub.start_date,
          renewal_date: newSub.renewal_date,
          notes: newSub.notes || null,
        }),
      });
      if (res.ok) {
        setShowAdd(false);
        setNewSub({ customer_id: '', product_id: '', monthly_amount: '', start_date: new Date().toISOString().slice(0, 10), renewal_date: '', notes: '' });
        await fetchAll();
      }
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(id: number, sub: Subscription, status: Subscription['status']) {
    await fetch(`/api/subscriptions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...sub, status }),
    });
    await fetchAll();
  }

  const inp: React.CSSProperties = {
    background: '#111111', border: '1px solid #2a2a2a', borderRadius: '4px',
    color: '#f5f5f0', padding: '8px 12px', fontSize: '13px', outline: 'none', width: '100%',
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: '#070707' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: '#f5f5f0' }}>Subscriptions</h1>
              <p className="text-sm mt-1" style={{ color: '#666666' }}>
                {subscriptions.filter((s) => s.status === 'active').length} active · ₱{totalMRR.toLocaleString()}/month MRR
              </p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 18px', fontSize: '13px', cursor: 'pointer' }}
            >
              + Add Subscription
            </button>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {(['all', 'active', 'paused', 'cancelled'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className="text-xs px-3 py-2 rounded-sm capitalize"
                style={{ background: filterStatus === s ? '#1e1e1e' : 'transparent', color: filterStatus === s ? '#f5f5f0' : '#666666', border: '1px solid', borderColor: filterStatus === s ? '#2a2a2a' : 'transparent', cursor: 'pointer' }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Add subscription form */}
          {showAdd && (
            <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid rgba(255,20,147,0.2)' }}>
              <p className="text-sm font-medium mb-4" style={{ color: '#f5f5f0' }}>Add Subscription</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Customer *</label>
                  <select value={newSub.customer_id} onChange={(e) => setNewSub({ ...newSub, customer_id: e.target.value })} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="">Select customer...</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Product *</label>
                  <select value={newSub.product_id} onChange={(e) => {
                    const product = products.find((p) => p.id === e.target.value);
                    setNewSub({
                      ...newSub,
                      product_id: e.target.value,
                      monthly_amount: product?.startingPrice?.toString() ?? '',
                    });
                  }} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="">Select product...</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Monthly Amount (₱)</label>
                  <input type="number" value={newSub.monthly_amount} onChange={(e) => setNewSub({ ...newSub, monthly_amount: e.target.value })} style={inp} placeholder="e.g. 1500" />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Start Date *</label>
                  <input type="date" value={newSub.start_date} onChange={(e) => setNewSub({ ...newSub, start_date: e.target.value })} style={inp} />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#666666' }}>Renewal Date *</label>
                  <input type="date" value={newSub.renewal_date} onChange={(e) => setNewSub({ ...newSub, renewal_date: e.target.value })} style={inp} />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs mb-1" style={{ color: '#666666' }}>Notes</label>
                <textarea value={newSub.notes} onChange={(e) => setNewSub({ ...newSub, notes: e.target.value })} rows={2} style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={addSubscription} disabled={saving} style={{ background: 'linear-gradient(135deg,#ff1493,#6a4c93)', color: '#fff', border: 'none', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Saving...' : 'Save Subscription'}
                </button>
                <button onClick={() => setShowAdd(false)} style={{ background: '#1a1a1a', color: '#888888', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="p-6 rounded-lg" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                    {['Customer', 'Product', 'Monthly', 'Renewal', 'Status', ''].map((h) => (
                      <th key={h} className="pb-3 text-left text-xs tracking-[0.1em] uppercase font-normal" style={{ color: '#444444' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={6} className="py-8 text-center text-sm" style={{ color: '#444444' }}>Loading...</td></tr>
                  )}
                  {!loading && filtered.map((s) => {
                    const sc = STATUS_COLORS[s.status];
                    return (
                      <tr key={s.id} style={{ borderBottom: '1px solid #111111' }}>
                        <td className="py-3 font-medium" style={{ color: '#f5f5f0' }}>{s.customer_name}</td>
                        <td className="py-3" style={{ color: '#888888' }}>{s.product_name}</td>
                        <td className="py-3" style={{ color: '#f5f5f0' }}>
                          {s.monthly_amount > 0 ? `₱${s.monthly_amount.toLocaleString()}` : '—'}
                        </td>
                        <td className="py-3" style={{ color: '#888888' }}>
                          {new Date(s.renewal_date).toLocaleDateString('en-PH')}
                        </td>
                        <td className="py-3">
                          <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <select
                            value={s.status}
                            onChange={(e) => updateStatus(s.id, s, e.target.value as Subscription['status'])}
                            style={{ background: '#111111', border: '1px solid #2a2a2a', color: '#888888', fontSize: '11px', padding: '4px 6px', borderRadius: '3px', cursor: 'pointer' }}
                          >
                            <option value="active">Active</option>
                            <option value="paused">Paused</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-sm" style={{ color: '#444444' }}>No subscriptions found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Test end-to-end**

1. Visit `http://localhost:3003/customers` → Add "Rimando Law Office"
2. Visit `http://localhost:3003/subscriptions` → Click "+ Add Subscription"
3. Select the customer and "Website Maintenance" product → Set renewal date → Save
4. Visit `http://localhost:3003/dashboard` → Confirm MRR now shows ₱1,500 (or whatever amount you entered)

Expected: All three pages show consistent live data.

- [ ] **Step 4: Commit**

```bash
git add apps/admin/app/subscriptions/page.tsx apps/admin/components/AdminSidebar.tsx
git commit -m "feat: subscriptions management page + sidebar nav link"
```

---

## Task 8: Persist pricing changes to DB

**Files:**
- Modify: `apps/admin/app/api/pricing/route.ts`

Currently the pricing API just logs changes. Wire it to PostgreSQL.

- [ ] **Step 1: Update `apps/admin/app/api/pricing/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import { products } from '@aether/config/products';
import pool from '../../../lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Try DB first; fall back to config if DB isn't seeded yet
  try {
    const result = await pool.query(
      'SELECT id, name, starting_price AS "startingPrice", max_price AS "maxPrice", frequency, division, category, featured FROM products ORDER BY division, category, name'
    );
    if (result.rows.length > 0) return NextResponse.json(result.rows);
  } catch {
    // DB not ready — fall through to static config
  }

  return NextResponse.json(products);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId, startingPrice, maxPrice } = await req.json();

  await pool.query(
    `UPDATE products
     SET starting_price = $1, max_price = $2, updated_at = NOW(), updated_by = $3
     WHERE id = $4`,
    [startingPrice ?? null, maxPrice ?? null, session.id ?? null, productId]
  );

  await pool.query(
    `INSERT INTO price_change_log (product_id, changed_by, new_starting_price, new_max_price)
     VALUES ($1, $2, $3, $4)`,
    [productId, session.id ?? null, startingPrice ?? null, maxPrice ?? null]
  );

  return NextResponse.json({ success: true, productId, startingPrice, maxPrice });
}
```

> **Note:** `session.id` may not exist yet depending on the auth implementation. If it causes an error, replace `session.id ?? null` with `null` temporarily.

- [ ] **Step 2: Verify pricing page still works**

Visit `http://localhost:3003/pricing` → Edit a price → Save.
Refresh the page — the updated price should persist (loaded from DB now, not from the static config file).

- [ ] **Step 3: Commit**

```bash
git add apps/admin/app/api/pricing/route.ts
git commit -m "feat: pricing API persists changes to PostgreSQL with audit log"
```

---

## Task 9: Ubuntu server + Tailscale setup

This task documents the production deployment of `apps/admin` to the Ubuntu machine.

- [ ] **Step 1: Install Node.js and pnpm on Ubuntu**

```bash
# On the Ubuntu server:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm pm2
```

- [ ] **Step 2: Clone the repo and install dependencies**

```bash
cd ~
git clone <your-repo-url> aether
cd aether
pnpm install
```

- [ ] **Step 3: Create `.env.local` on Ubuntu**

```bash
cat > apps/admin/.env.local << 'EOF'
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/aether_admin
JWT_SECRET=change-this-to-a-long-random-string
EOF
```

- [ ] **Step 4: Apply the database schema**

```bash
psql -U postgres -c "CREATE DATABASE aether_admin;"
psql -U postgres -d aether_admin -f apps/admin/database/schema.sql
```

- [ ] **Step 5: Build and start with PM2**

```bash
cd ~/aether
pnpm --filter @aether/admin build
pm2 start "pnpm --filter @aether/admin start" --name aether-admin
pm2 startup   # auto-start on reboot — run the printed command
pm2 save
```

Verify it's running: `pm2 status` → aether-admin should show `online`.

- [ ] **Step 6: Install Tailscale on Ubuntu**

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Copy the Tailscale IP shown (e.g., `100.x.x.x`).

- [ ] **Step 7: Install Tailscale on your devices**

1. Download Tailscale on your Windows/Mac/phone from [tailscale.com/download](https://tailscale.com/download)
2. Sign in with the same account used in Step 6
3. Visit `http://100.x.x.x:3003` in your browser

Expected: The Aether admin login page loads from anywhere on any device.

- [ ] **Step 8: Share access with Remlyn**

In Tailscale dashboard → Settings → Users → Invite `remlyn@aether.com.ph`.
She installs Tailscale on her device, signs in, and can access `http://100.x.x.x:3003`.

- [ ] **Step 9: Final commit**

```bash
git add docs/
git commit -m "docs: add Ubuntu + Tailscale deployment notes to plan"
```

---

## Verification Checklist

- [ ] Dashboard shows live MRR from PostgreSQL
- [ ] Adding a customer via UI persists after page refresh
- [ ] Adding a subscription updates MRR on dashboard
- [ ] Status change (active → paused) updates immediately
- [ ] Pricing page saves changes to DB — verified by refreshing
- [ ] CRM accessible at `http://100.x.x.x:3003` via Tailscale from a non-local device
