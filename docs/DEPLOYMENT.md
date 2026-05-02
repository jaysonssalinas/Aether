# Aether — Deployment Guide

## Hosting: Netlify (You already have an account — use it)

Each app deploys as a separate Netlify site. Free tier supports unlimited sites.

---

## Step 1: Install the Netlify CLI

```bash
npm install -g netlify-cli
netlify login
```

---

## Step 2: Deploy each app

Run these from the **root** of the monorepo:

```bash
# Deploy aether hub → aether.com.ph
cd C:\Projects\Aether\apps\aether
netlify init        # first time: link to a new Netlify site
netlify deploy --prod

# Deploy digital → digital.aether.com.ph
cd C:\Projects\Aether\apps\digital
netlify init
netlify deploy --prod

# Deploy celebrations → celebrations.aether.com.ph
cd C:\Projects\Aether\apps\celebrations
netlify init
netlify deploy --prod

# Deploy admin → admin.aether.com.ph
cd C:\Projects\Aether\apps\admin
netlify init
netlify deploy --prod
```

Each `netlify init` will ask:

- **Create a new site** → Yes
- **Build command** → `next build`
- **Publish directory** → `.next`

---

## Step 3: Add a netlify.toml to each app

Create this file inside each app folder so Netlify knows how to build it:

**`apps/aether/netlify.toml`** (same pattern for all 4 apps):

```toml
[build]
  command = "cd ../.. && pnpm --filter @aether/web build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Install the Next.js plugin:

```bash
pnpm add -D @netlify/plugin-nextjs --filter @aether/web
pnpm add -D @netlify/plugin-nextjs --filter @aether/digital
pnpm add -D @netlify/plugin-nextjs --filter @aether/celebrations
pnpm add -D @netlify/plugin-nextjs --filter @aether/admin
```

---

## Step 4: Set environment variables

For the **admin** site in Netlify dashboard:

- Go to Site → Site Configuration → Environment Variables
- Add all variables from `.env.example`
- Use your Supabase connection string for `DB_*` variables

---

## Step 5: Connect custom domains

In Netlify dashboard for each site:

- Go to Site → Domain Management → Add a domain

| App | Domain |
|-----|--------|
| Aether Hub | `aether.com.ph` |
| Digital | `digital.aether.com.ph` |
| Celebrations | `celebrations.aether.com.ph` |
| Admin | `admin.aether.com.ph` |

Update DNS at your domain registrar to point to Netlify. SSL is automatic.

---

## Step 6: Supabase (Free hosted PostgreSQL)

1. Go to supabase.com → New Project
2. Name it `aether-admin`, choose a strong password
3. Once created: Settings → Database → Connection string (use the "URI" format)
4. In Netlify admin site env vars, set:
   ```
   DB_HOST=db.xxxx.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your_supabase_password
   ```
5. In Supabase SQL Editor, paste and run:
   `C:\Projects\Aether\apps\admin\database\schema.sql`

---

## Step 7: Replace localhost URLs before going live

Search and replace all `localhost:300x` with production domains in:
- `apps/aether/components/NavBar.tsx`
- `apps/aether/components/Footer.tsx`
- `apps/aether/app/page.tsx`
- `apps/digital/components/Footer.tsx`
- `apps/celebrations/components/Footer.tsx`

---

## Deployment Checklist

- [ ] `@netlify/plugin-nextjs` installed in all 4 apps
- [ ] `netlify.toml` added to all 4 apps
- [ ] All 4 sites deployed and building successfully on Netlify
- [ ] Custom domains connected and SSL active
- [ ] Admin login works with real credentials
- [ ] Contact forms submit successfully
- [ ] Supabase DB set up and schema applied
- [ ] All `localhost` links replaced with production URLs
- [ ] Admin password changed from default (`aether2026`)
- [ ] `.env.local` files are NOT committed to git
