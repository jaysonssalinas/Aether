# Phase 1: Website Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the monorepo to a single deployable customer website (`apps/aether`) by removing the redundant `apps/digital` and `apps/celebrations` subdomain apps, adding the Piso Wifi product to the catalog, wiring the contact forms to real email delivery via Resend, and preparing the Netlify deployment config.

**Architecture:** `apps/aether` already contains all customer-facing routes (`/digital/*`, `/celebrations/*`, `/about`, `/contact`). The subdomain apps duplicate this content with an older design. We delete them and ship one app to one Netlify site at `aether.com.ph`. Contact forms already call `/api/contact` — the route just doesn't exist yet.

**Tech Stack:** Next.js 16, pnpm monorepo, Resend (free tier — 3,000 emails/month), Netlify free tier, TypeScript.

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `apps/aether/app/api/contact/route.ts` | Email handler — sends form data via Resend |
| Create | `apps/aether/netlify.toml` | Netlify build config for this app |
| Modify | `packages/config/src/products.ts` | Add Piso Wifi product |
| Modify | `apps/admin/database/schema.sql` | Add Piso Wifi to seed data |
| Modify | `apps/aether/package.json` | Add `resend` dependency |
| Delete | `apps/digital/` | Redundant subdomain app — content already in `apps/aether/app/digital/` |
| Delete | `apps/celebrations/` | Redundant subdomain app — content already in `apps/aether/app/celebrations/` |

---

## Pre-Flight Checklist (read before starting)

The content audit is already done — both subdomain apps have been compared to `apps/aether`. Nothing unique was found. The `apps/aether` versions are newer and more polished. Safe to delete.

Before starting Task 4, you need a free Resend account:
1. Go to [resend.com](https://resend.com) → Sign up free
2. Dashboard → API Keys → Create API Key → copy it
3. You will add it to `apps/aether/.env.local` as `RESEND_API_KEY`

---

## Task 1: Add Piso Wifi to product catalog

**Files:**
- Modify: `packages/config/src/products.ts`
- Modify: `apps/admin/database/schema.sql`

- [ ] **Step 1: Add Piso Wifi to `packages/config/src/products.ts`**

Open `packages/config/src/products.ts`. After the `inventory-system-maintenance` entry (around line 125), add this product before the `domain-hosting` entry:

```typescript
  {
    id: 'piso-wifi-license',
    name: 'Piso Wifi System License',
    description: 'Automated coin-operated WiFi hotspot system for internet cafes, boarding houses, and waiting areas.',
    startingPrice: 3500,
    maxPrice: 6000,
    frequency: 'one-time',
    division: 'digital',
    category: 'Software Systems',
    featured: true,
    includes: [
      'Piso Wifi software setup',
      'Coin slot integration',
      'Admin dashboard access',
      'Session time management',
      'On-site installation and training',
    ],
  },
  {
    id: 'piso-wifi-maintenance',
    name: 'Piso Wifi Maintenance',
    description: 'Monthly remote support and updates for your Piso Wifi system.',
    startingPrice: 800,
    maxPrice: 1500,
    frequency: 'monthly',
    division: 'digital',
    category: 'Software Systems',
    featured: false,
    includes: [
      'Remote technical support',
      'System updates',
      'Bug fixes',
      'Performance monitoring',
    ],
  },
```

- [ ] **Step 2: Add Piso Wifi seed rows to `apps/admin/database/schema.sql`**

Open `apps/admin/database/schema.sql`. Find the `INSERT INTO products` block. After the `inventory-system-maintenance` row and before `domain-hosting`, add:

```sql
  ('piso-wifi-license',     'Piso Wifi System License',    'Coin-op WiFi hotspot',  3500, 6000,  'one-time', 'digital', 'Software Systems', TRUE),
  ('piso-wifi-maintenance', 'Piso Wifi Maintenance',       'Monthly remote support', 800, 1500,  'monthly',  'digital', 'Software Systems', FALSE),
```

- [ ] **Step 3: Verify the products file compiles**

```bash
pnpm --filter @aether/web build
```

Expected: Build completes with no TypeScript errors. The Piso Wifi products will appear in the pricing pages automatically.

- [ ] **Step 4: Commit**

```bash
git add packages/config/src/products.ts apps/admin/database/schema.sql
git commit -m "feat: add Piso Wifi system to product catalog"
```

---

## Task 2: Add Netlify deployment config

**Files:**
- Create: `apps/aether/netlify.toml`

- [ ] **Step 1: Create `apps/aether/netlify.toml`**

```toml
[build]
  command = "cd ../.. && pnpm --filter @aether/web build"
  publish = "apps/aether/.next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- [ ] **Step 2: Verify `@netlify/plugin-nextjs` is in devDependencies**

Open `apps/aether/package.json` and confirm this line exists in `devDependencies`:

```json
"@netlify/plugin-nextjs": "^5.15.10"
```

It is already there — no action needed.

- [ ] **Step 3: Commit**

```bash
git add apps/aether/netlify.toml
git commit -m "feat: add netlify.toml for aether web deployment"
```

---

## Task 3: Remove redundant subdomain apps

**Files:**
- Delete: `apps/digital/` (entire directory)
- Delete: `apps/celebrations/` (entire directory)

> **Note:** `pnpm-workspace.yaml` uses `apps/*` glob — deleting the directories is sufficient. No workspace config changes needed.

- [ ] **Step 1: Confirm no unique files remain in `apps/digital`**

```bash
ls apps/digital/app/
```

Expected output lists: `page.tsx`, `layout.tsx` (or similar). All routes here have equivalents in `apps/aether/app/digital/`. No action needed — safe to delete.

- [ ] **Step 2: Confirm no unique files remain in `apps/celebrations`**

```bash
ls apps/celebrations/app/
```

Expected output: same structure. All content is in `apps/aether/app/celebrations/`. Safe to delete.

- [ ] **Step 3: Delete `apps/digital`**

```bash
rm -rf apps/digital
```

- [ ] **Step 4: Delete `apps/celebrations`**

```bash
rm -rf apps/celebrations
```

- [ ] **Step 5: Verify remaining workspace apps**

```bash
ls apps/
```

Expected output: `aether/  admin/`

- [ ] **Step 6: Reinstall to clean workspace**

```bash
pnpm install
```

Expected: Runs without errors. Any references to `@aether/digital` or `@aether/celebrations` that fail here indicate a cross-dependency to fix.

- [ ] **Step 7: Build `apps/aether` to confirm nothing broke**

```bash
pnpm --filter @aether/web build
```

Expected: Build succeeds. No import errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: remove redundant apps/digital and apps/celebrations subdomain apps"
```

---

## Task 4: Wire contact forms to Resend

**Files:**
- Create: `apps/aether/app/api/contact/route.ts`
- Modify: `apps/aether/package.json` (add resend)

All three contact forms in `apps/aether` already call `POST /api/contact`:
- `apps/aether/app/contact/page.tsx` sends: `{ name, email, interest, message }`
- `apps/aether/app/digital/contact/page.tsx` sends: `{ name, email, phone, service, budget, timeline, message, interest: 'digital' }`
- `apps/aether/app/celebrations/contact/page.tsx` sends its own fields with `interest: 'celebrations'`

The API route accepts all of these without the pages needing any changes.

- [ ] **Step 1: Get a Resend API key**

1. Go to [resend.com](https://resend.com) → sign up (free, no credit card)
2. Dashboard → API Keys → Create API Key (name: "Aether Contact")
3. Copy the key — you will not see it again

- [ ] **Step 2: Add the key to your `.env.local`**

Create or edit `apps/aether/.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=jaysonssalinas@gmail.com
```

> `.env.local` is already in `.gitignore` — never commit this file.

- [ ] **Step 3: Install the Resend SDK**

```bash
pnpm add resend --filter @aether/web
```

Expected: `resend` appears in `apps/aether/package.json` dependencies.

- [ ] **Step 4: Create `apps/aether/app/api/contact/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'jaysonssalinas@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interest, service, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const division = interest === 'celebrations' ? 'Aether Celebrations' : 'Aether Digital';
    const subject = `New inquiry from ${name} — ${division}`;

    const lines: string[] = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Division: ${division}`,
      service ? `Service: ${service}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      '',
      `Message:\n${message}`,
    ].filter(Boolean) as string[];

    await resend.emails.send({
      from: 'Aether Contact <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      text: lines.join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API]', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
```

> **Note on `from` address:** Resend's free tier requires sending from `onboarding@resend.dev` until you verify a custom domain. Once `aether.com.ph` is live and DNS is set up, update this to `contact@aether.com.ph` and verify the domain in the Resend dashboard.

- [ ] **Step 5: Test the contact form locally**

```bash
pnpm --filter @aether/web dev
```

1. Open `http://localhost:3000/contact`
2. Fill in the form and submit
3. Check `jaysonssalinas@gmail.com` for the email

Expected: Email arrives within 1–2 minutes. Check spam folder if it doesn't appear.

- [ ] **Step 6: Build to confirm no TypeScript errors**

```bash
pnpm --filter @aether/web build
```

Expected: Build succeeds with no errors.

- [ ] **Step 7: Commit**

```bash
git add apps/aether/app/api/contact/route.ts apps/aether/package.json pnpm-lock.yaml
git commit -m "feat: wire contact forms to Resend email delivery"
```

---

## Task 5: Final build verification

- [ ] **Step 1: Clean install**

```bash
pnpm install
```

- [ ] **Step 2: Build both remaining apps**

```bash
pnpm --filter @aether/web build
pnpm --filter @aether/admin build
```

Both should exit with code 0.

- [ ] **Step 3: Smoke test dev server**

```bash
pnpm --filter @aether/web dev
```

Visit these routes and confirm each loads:

| Route | Expected |
|-------|----------|
| `http://localhost:3000/` | Hub homepage |
| `http://localhost:3000/digital` | Digital section |
| `http://localhost:3000/digital/services` | Services page |
| `http://localhost:3000/digital/pricing` | Pricing with Piso Wifi visible |
| `http://localhost:3000/celebrations` | Celebrations section |
| `http://localhost:3000/celebrations/pricing` | Celebrations pricing |
| `http://localhost:3000/contact` | Contact form |
| `http://localhost:3000/about` | About page |

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: phase 1 complete — single-app website ready for Netlify deploy"
```

---

## Netlify Deployment (when ready)

Run these from the project root:

```bash
npm install -g netlify-cli
netlify login
cd apps/aether
netlify init
# → Create new site
# → Build command: cd ../.. && pnpm --filter @aether/web build
# → Publish dir: .next
netlify deploy --prod
```

Then in Netlify dashboard:
1. Site → Domain Management → Add domain: `aether.com.ph`
2. Site → Environment Variables → Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
3. Update the `from` address in `route.ts` to `contact@aether.com.ph` once domain DNS is verified in Resend
