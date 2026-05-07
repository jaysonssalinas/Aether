# Aether — Deployment Guide

## Architecture

| Part                               | Where               | How                                    |
|------------------------------------|---------------------|----------------------------------------|
| Customer website (`aether.com.ph`) | Netlify (free)      | `apps/aether`                          |
| CRM / Admin                        | Local Ubuntu server | `apps/admin` — accessed via Tailscale  |

---

## Website — Netlify Deployment

### First-time setup

```bash
npm install -g netlify-cli
netlify login
```

### Deploy apps/aether

```bash
cd C:\Projects\Aether\apps\aether
netlify init        # first time: create new site
netlify deploy --prod
```

When prompted:

- **Build command:** `cd ../.. && pnpm --filter @aether/web build`
- **Publish directory:** `.next`

### netlify.toml (add to apps/aether/)

```toml
[build]
  command = "cd ../.. && pnpm --filter @aether/web build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Install the plugin:

```bash
pnpm add -D @netlify/plugin-nextjs --filter @aether/web
```

### Connect the domain

In Netlify dashboard → Site → Domain Management → Add domain: `aether.com.ph`

Update your domain registrar DNS to point to Netlify. SSL is automatic.

---

## CRM — Ubuntu Server Setup

### 1. Install PostgreSQL

```bash
sudo apt update && sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb aether_admin
```

Run the schema:

```bash
sudo -u postgres psql aether_admin < /path/to/apps/admin/database/schema.sql
```

### 2. Configure environment

```bash
cp .env.example apps/admin/.env.local
# Edit .env.local: set DB_PASSWORD and JWT_SECRET
```

### 3. Run as a persistent service (PM2)

```bash
npm install -g pm2
cd /path/to/apps/admin
pm2 start "pnpm dev" --name aether-admin
pm2 startup   # auto-start on reboot
pm2 save
```

Admin accessible at `http://localhost:3003`

### 4. Remote access via Tailscale

```bash
# On Ubuntu server
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# On your device (Windows/Mac/iOS/Android)
# Download Tailscale → sign in with same account
```

Access CRM from anywhere at: `http://<tailscale-ip>:3003`

### 5. Future: employee access via Omada OpenVPN

When hiring staff, configure OpenVPN on the TP-Link ER605 via OC200 controller.
Issue VPN profiles to employees. No monthly cost — uses hardware already owned.

---

## Pre-Launch Checklist

- [ ] `apps/aether` builds cleanly (`pnpm --filter @aether/web build`)
- [ ] Netlify deploy succeeds
- [ ] `aether.com.ph` domain connected + SSL active
- [ ] Contact forms working (Resend API key set)
- [ ] Gallery photos replaced with real images
- [ ] PostgreSQL running on Ubuntu
- [ ] `apps/admin` accessible via Tailscale IP
- [ ] Admin password changed from default (`aether2026`)
- [ ] `.env.local` files NOT committed to git
- [ ] Analytics tracking active
