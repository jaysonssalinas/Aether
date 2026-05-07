# Aether Architecture Design
**Date:** 2026-05-07
**Status:** Approved
**Go-live target:** End of 2026 (flexible)

---

## Overview

Aether is a two-division business run by Jayson (Digital) and Remlyn (Celebrations). The technical system has two parts:

1. **One public website** at `aether.com.ph` — serving both divisions under a single domain
2. **One private CRM** running on a local Ubuntu server — never exposed to the internet, accessible securely via VPN

---

## Architecture

### Public Website — Cloud

| Property | Value |
|----------|-------|
| App | `apps/aether` |
| Domain | `aether.com.ph` |
| Hosting | Netlify (free tier) |
| Framework | Next.js (pnpm monorepo) |
| Cost | ~₱600/year (domain only) |

**Route structure:**

```
aether.com.ph/                    → Hub (brand + both divisions)
aether.com.ph/digital             → Aether Digital landing
aether.com.ph/digital/services    → Services
aether.com.ph/digital/pricing     → Pricing
aether.com.ph/digital/portfolio   → Portfolio
aether.com.ph/digital/contact     → Digital contact
aether.com.ph/celebrations        → Aether Celebrations landing
aether.com.ph/celebrations/services
aether.com.ph/celebrations/pricing
aether.com.ph/celebrations/galleries
aether.com.ph/celebrations/contact
aether.com.ph/about               → Founders story
aether.com.ph/contact             → Global contact
```

**Redundant apps to remove** (after content audit):
- `apps/digital` — subdomain app, routes already exist in `apps/aether`
- `apps/celebrations` — subdomain app, routes already exist in `apps/aether`

Content audit must confirm that all unique content from these apps is present in `apps/aether` before deletion.

---

### Private CRM — Local Ubuntu Server

| Property | Value |
|----------|-------|
| App | `apps/admin` |
| Framework | Next.js |
| Port | 3003 |
| Database | PostgreSQL (self-hosted) |
| Access | VPN only — never port-forwarded directly |
| Cost | Free (hardware already owned) |

**CRM modules:**
- Customers / Leads
- Pricing management
- Reports / Analytics
- Project tracking

**Database:** PostgreSQL running on the same Ubuntu machine. Schema at `apps/admin/database/schema.sql`. No cloud database — all data stays local.

---

## Network & Access

### Current (Phase 1–2): Tailscale

- Install Tailscale on Ubuntu server + Jayson's device + Remlyn's device
- Admin app accessible at the Ubuntu machine's Tailscale IP on port 3003
- Free tier supports up to 3 users / 100 devices — sufficient for founders
- Zero configuration beyond install; works through NAT without port forwarding

### Future (Phase 3+): Omada OpenVPN

When hiring staff who need CRM access:
- Configure OpenVPN server on TP-Link ER605 via OC200 controller
- Issue VPN profiles to employees
- Unlimited users, no ongoing cost — uses hardware already owned
- Founders can keep Tailscale or migrate to Omada VPN

In-office staff on local WiFi can access the CRM directly (no VPN needed).

---

## Cost Summary

| Item | Cost |
|------|------|
| `aether.com.ph` domain | ~₱600/year |
| Netlify hosting | Free |
| Tailscale (founders) | Free |
| Omada VPN (staff, future) | Free — TP-Link ER605 + OC200 owned |
| Ubuntu server | Already owned |
| PostgreSQL | Free (self-hosted) |
| **Total ongoing** | **~₱50/month equivalent** |

---

## Phased Build Plan

### Phase 1 — May to June 2026: Website Consolidation
- Content audit: compare `apps/digital` + `apps/celebrations` vs `apps/aether` routes
- Port any unique content into `apps/aether`
- Delete `apps/digital` and `apps/celebrations`
- Deploy `apps/aether` to Netlify under `aether.com.ph`
- Wire contact forms to Resend for real email delivery

### Phase 2 — July to August 2026: CRM Foundation
- Set up PostgreSQL on Ubuntu
- Configure `apps/admin` to run as a persistent service (PM2 or systemd)
- Install and configure Tailscale on Ubuntu + founder devices
- Verify CRM accessible from outside the local network

### Phase 3 — September to October 2026: CRM Features + Website Polish
- Build out CRM modules (customers, pricing, reports)
- Replace gallery placeholder divs with Remlyn's actual photos
- Add real testimonials and portfolio content
- SEO metadata and Open Graph tags

### Phase 4 — November to December 2026: Stabilization + Go-live
- Full QA pass on website and CRM
- Configure Omada OpenVPN if hiring is underway
- DNS cutover to production domain
- Go live 🚀

---

## Decisions & Rationale

**Why 1 domain instead of subdomains?**
Customer clarity — visitors shouldn't have to choose between `digital.aether.com.ph` and `celebrations.aether.com.ph`. One domain, clear navigation sections. Also reduces hosting and DNS complexity.

**Why local CRM instead of cloud?**
Zero recurring cost, data sovereignty (all customer data stays on owned hardware), and no attack surface from the internet. Business data for a small team doesn't need to be cloud-hosted.

**Why Tailscale over Omada VPN first?**
10-minute setup vs. hours of VPN config. Tailscale free tier is sufficient for 2 founders. Omada VPN is the right long-term solution for staff but adds complexity not needed now.

**Why not follow the original MD doc structure (websites/, api/, database/)?**
The current Next.js monorepo already delivers everything that doc described, in a more modern and deployable form. Restructuring would throw away working code for no gain.
