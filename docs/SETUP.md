# Aether — Local Development Setup

## Prerequisites
- Node.js 18+ (you have v24)
- pnpm 10+ (`npm install -g pnpm`)
- PostgreSQL 14+ with pgAdmin 4

---

## 1. Install dependencies

```bash
cd C:\Projects\Aether
pnpm install
```

---

## 2. Set up PostgreSQL

1. Open **pgAdmin 4**
2. Create a new database called `aether_admin`
3. Open the Query Tool on `aether_admin`
4. Run the schema:
   ```
   File → Open → C:\Projects\Aether\apps\admin\database\schema.sql → Execute
   ```

---

## 3. Configure environment variables

For the **admin** app:

```bash
# Create the file
copy C:\Projects\Aether\.env.example C:\Projects\Aether\apps\admin\.env.local
```

Edit `apps\admin\.env.local` and fill in:
- `DB_PASSWORD` — your PostgreSQL password
- `JWT_SECRET` — any long random string (for dev, anything works)

---

## 4. Run the dev servers

Open **4 terminal windows** and run one command per window:

```bash
# Terminal 1 — aether.com.ph hub
pnpm --filter @aether/web dev
# Opens at http://localhost:3000

# Terminal 2 — digital.aether.com.ph
pnpm --filter @aether/digital dev
# Opens at http://localhost:3001

# Terminal 3 — celebrations.aether.com.ph
pnpm --filter @aether/celebrations dev
# Opens at http://localhost:3002

# Terminal 4 — admin.aether.com.ph
pnpm --filter @aether/admin dev
# Opens at http://localhost:3003
```

---

## 5. Log into Admin

Go to: `http://localhost:3003/login`

Default credentials:
- **Email:** `jayson@aether.com.ph`
- **Password:** `aether2026`

**Change this password before going live.**

---

## 6. Project structure recap

```
C:\Projects\Aether\
├── apps/
│   ├── aether/          → aether.com.ph (port 3000)
│   ├── digital/         → digital.aether.com.ph (port 3001)
│   ├── celebrations/    → celebrations.aether.com.ph (port 3002)
│   └── admin/           → admin.aether.com.ph (port 3003)
├── packages/
│   ├── config/          → Shared: brand colors, products, pricing
│   └── ui/              → Future shared component library
├── docs/
├── .env.example
└── pnpm-workspace.yaml
```

---

## Common Tasks

### Add a new product/service to pricing
Edit: `packages/config/src/products.ts`  
Add a new entry to the `products` array. It will appear on all pricing pages and in the admin panel immediately.

### Update contact information
Edit: `packages/config/src/brand.ts`  
Change the `contact` object. All sites pull from this.

### Add a gallery photo (Celebrations)
Photos go in `apps/celebrations/public/gallery/`.  
Then update `apps/celebrations/app/galleries/page.tsx` to reference them.

### Change admin password
1. Generate a new bcrypt hash:
   ```
   node -e "const b=require('bcryptjs'); console.log(b.hashSync('your_new_password',10))"
   ```
2. Update `apps/admin/app/api/auth/login/route.ts` with the new hash.
3. After DB is wired up: update the `admin_users` table directly.
