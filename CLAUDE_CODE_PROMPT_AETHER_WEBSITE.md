# CLAUDE CODE PROMPT: AETHER WEBSITE BUILDER
**For:** VS Code Claude Code Extension  
**Project:** C:\Projects\Aether  
**Status:** Ready to Execute  

---

## INSTRUCTIONS FOR YOU (Before Pasting)

1. **Copy this entire prompt** (everything below)
2. **Open VS Code**
3. **Open Claude Code extension** (Command Palette: "Claude Code: Open")
4. **Paste this prompt** in the chat
5. **Hit Enter** and Claude Code will start building

Claude Code will ask clarifying questions. Answer them and it will build.

**You don't need to code. You review what it builds, say "looks good" or "fix X", and it does.**

---

# AETHER WEBSITE BUILDER PROMPT

You are the Aether Website Architect. Your job: Build three beautiful, minimalist websites for Aether (a Philippine software + events company).

## YOUR MISSION

Build three interconnected websites that serve Aether Digital and Aether Celebrations, with minimalist design, admin panels for pricing/customers, and zero technical debt.

**Projects to build:**
1. **aether.com.ph** — Corporate hub (tells the Aether story)
2. **digital.aether.com.ph** — Aether Digital (Jayson's division: websites, POS, printing, software)
3. **celebrations.aether.com.ph** — Aether Celebrations (Remlyn's division: events, weddings, souvenirs)

## DESIGN PRINCIPLES (CRITICAL - Follow These Exactly)

### Aesthetic: "Elegant Futuristic Minimalist"

**NOT:**
- ❌ Neon gradients
- ❌ Huge hero videos
- ❌ Hover effects everywhere
- ❌ Stock photos
- ❌ Overly minimal (cold)

**YES:**
- ✅ Sophisticated color palette (navy, gold, cream, electric cyan)
- ✅ Elegant typography (serif display + clean sans-serif body)
- ✅ Purposeful animation (reveals, transitions, micro-interactions)
- ✅ Real photography or artistic illustrations
- ✅ White space (breathing room)
- ✅ Accessible, readable, beautiful

### Color Palette

```
Primary: Deep Navy (#1a365d)
Secondary: Rich Gold (#b8860b)
Accent: Electric Cyan (#00bcd4)
Neutral: Warm Off-White (#f5f5f0)
Dark: Charcoal (#2c2c2c)
Text Primary: #1a1a1a
Text Secondary: #666666
```

### Typography

- **Display Font**: "Playfair Display" or equivalent elegant serif
- **Body Font**: "Inter" or "SF Pro Display" (clean, readable)
- **Mono Font**: "Courier New" or "Monaco" (code examples)
- **Hierarchy**: H1 28px | H2 24px | H3 20px | Body 16px

### Components to Build (Reusable)

```javascript
// All components in src/components/:
- Button (primary, secondary, outline)
- Card (service, portfolio, testimonial)
- Hero (headline + CTA)
- NavBar (minimalist, logo + menu)
- Footer (links + contact)
- Form (contact, booking)
- PricingTable
- testimonialBlock
- CallToAction
```

## WEBSITE STRUCTURE

### aether.com.ph (Hub) — The Story

**Pages:**
1. `/` (Homepage)
   - Hero: "Aether. The essence of possibility."
   - Two equal cards: "Aether Digital" + "Aether Celebrations"
   - Brief story (2-3 sentences) about Aether
   - Testimonials (2-3 from both divisions)
   - CTA: "Explore Digital" / "Explore Celebrations"

2. `/about`
   - Who is Aether?
   - Founders: Jayson (Digital) + Remlyn (Celebrations)
   - Philosophy: Why "Aether"? The infinite connection.
   - Values: Innovation, Excellence, Trust, Magic

3. `/contact`
   - Contact form
   - Email: contact@aether.com.ph
   - Phone: (TBD - you provide)
   - Physical address: (TBD - you provide)

### digital.aether.com.ph (Aether Digital) — Services

**Pages:**
1. `/` (Homepage)
   - Hero: "Digital systems that scale"
   - Services offered (cards):
     - Custom websites
     - Software systems (POS, Inventory, Printing)
     - Domain + hosting management
     - SEO + online presence
   - Portfolio section (show rimandolaw.com as case study)
   - Pricing section (pulls from admin panel)
   - CTA: "Get started" → Contact form

2. `/services`
   - Detailed service descriptions
   - What's included in each service
   - Process: "How we work"
   - Timeline expectations

3. `/portfolio` (or `/case-studies`)
   - rimandolaw.com (case study)
   - Format: Problem → Solution → Results
   - Include: Technologies used, timeline, client testimonial

4. `/pricing`
   - All prices pull from admin panel (NO hardcoded prices)
   - Transparent pricing
   - Optional add-ons
   - FAQ: "Why does service X cost Y?"

5. `/contact`
   - Contact form
   - "Request a quote" CTA

### celebrations.aether.com.ph (Aether Celebrations) — Magic

**Pages:**
1. `/` (Homepage)
   - Hero: "Turning moments into memories"
   - Gallery: 4-6 beautiful event photos
   - Services (cards):
     - Wedding planning
     - Event coordination
     - Venue design
     - Souvenirs + invitations
   - Testimonials from happy couples/clients
   - CTA: "Plan your event" → Contact form

2. `/galleries`
   - Photo gallery (weddings, events)
   - Filtering: By event type (wedding, corporate, birthday, etc.)
   - High-quality images, minimalist gallery layout

3. `/services`
   - Wedding packages (breakdown of what's included)
   - Event planning services
   - Souvenir options
   - Pricing (pulls from admin panel)

4. `/pricing`
   - Package pricing
   - Customization options
   - FAQ: "Can we customize?"

5. `/contact`
   - Contact form
   - "Book a consultation" CTA
   - Estimated response time: "Within 24 hours"

## ADMIN PANELS (Internal Only - Behind Login)

### Admin Dashboard: admin.aether.com.ph

**Authentication:**
- Simple login (email + password for now, no OAuth needed yet)
- Session expires after 8 hours of inactivity

**Dashboard Pages:**

1. **Overview** (First thing you see)
   - MRR (Monthly Recurring Revenue) - BIG NUMBER at top
   - Total customers
   - Revenue by product (pie chart: Websites / Printing / Inventory / Events)
   - Customers due for renewal (next 30 days)

2. **Pricing Panel**
   - Table of all products + services
   - Columns: Product | Current Price | Frequency | Last Updated
   - Can edit: Click row → modal opens → update price → save
   - All changes logged (who changed what, when)
   - Changes apply immediately (website pulls live prices)
   - Example products:
     ```
     Website Design | PHP 8,000-15,000 | One-time | Today
     Website Maintenance | PHP 1,500-2,500 | Monthly | Today
     Printing System License | PHP 5,000-10,000 | One-time | Today
     Printing System Maintenance | PHP 1,500-2,000 | Monthly | Today
     Inventory System License | PHP 5,000-8,000 | One-time | Today
     Inventory System Maintenance | PHP 1,500-2,500 | Monthly | Today
     Event Planning | Custom | Custom | Today
     Souvenir Printing | Custom | Custom | Today
     ```

3. **Customers**
   - Table of all customers
   - Columns: Name | Product | Monthly Amount | Renewal Date | Status
   - Can view: Click customer → see all their purchases + subscriptions
   - Can log: New purchase → form to add customer / update subscription
   - Search by name
   - Filter by product / status (active / due for renewal / overdue)

4. **Reports** (Simple stats)
   - MRR trend (last 12 months)
   - Customers by product (how many website vs printing vs inventory)
   - Churn (customers who left)
   - New customers this month
   - Top customers (highest MRR)

## TECHNICAL STACK (What We Build With)

**Frontend:**
- React (functional components, hooks)
- Next.js (file-based routing, API routes)
- Tailwind CSS (utility-first styling)
- TypeScript (optional, but recommended for maintainability)
- Framer Motion (for elegant animations, optional)

**Backend:**
- Node.js + Express (simple API)
- PostgreSQL (database for admin panel)
- Netlify Functions or Vercel Functions (serverless, simple)
- Authentication: Simple session-based (not OAuth yet)

**CMS:**
- Sanity.io (headless CMS, free tier available)
- OR Contentful (alternative)
- Content models: Services, Portfolio, Testimonials, Blog (future)

**Hosting:**
- Netlify (free tier: 2 sites) OR Vercel (free tier: unlimited)
- Custom domains (aether.com.ph, digital.aether.com.ph, celebrations.aether.com.ph)
- SSL: Automatic with Netlify/Vercel

## FOLDER STRUCTURE (Create This)

```
C:\Projects\Aether\
├── ROADMAP.md (the business roadmap)
├── DESIGN_BRIEF.md (design system, colors, typography)
├── package.json (dependencies)
├── tsconfig.json
├── tailwind.config.js
├── .env.example (environment variables template)
│
├── src/
│   ├── config/
│   │   ├── products.js (ALL PRICES - single source of truth)
│   │   └── sites.js (which content goes to which site)
│   │
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Hero.tsx
│   │   ├── NavBar.tsx
│   │   ├── Footer.tsx
│   │   ├── Form.tsx
│   │   ├── PricingTable.tsx
│   │   └── Testimonial.tsx
│   │
│   ├── pages/
│   │   ├── aether/
│   │   │   ├── index.tsx (aether.com.ph)
│   │   │   ├── about.tsx
│   │   │   └── contact.tsx
│   │   ├── digital/
│   │   │   ├── index.tsx (digital.aether.com.ph)
│   │   │   ├── services.tsx
│   │   │   ├── portfolio.tsx
│   │   │   ├── pricing.tsx
│   │   │   └── contact.tsx
│   │   ├── celebrations/
│   │   │   ├── index.tsx (celebrations.aether.com.ph)
│   │   │   ├── galleries.tsx
│   │   │   ├── services.tsx
│   │   │   ├── pricing.tsx
│   │   │   └── contact.tsx
│   │   └── api/
│   │       ├── contact.ts (form submission)
│   │       ├── pricing.ts (fetch prices)
│   │       └── admin/
│   │           ├── login.ts
│   │           ├── prices.ts (update prices)
│   │           └── customers.ts (CRUD customers)
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css (CSS custom properties for colors)
│   │
│   └── lib/
│       ├── db.ts (database connection)
│       ├── auth.ts (authentication helpers)
│       └── utils.ts (helpers)
│
├── admin/
│   ├── pages/
│   │   ├── login.tsx
│   │   ├── dashboard.tsx
│   │   ├── pricing.tsx
│   │   ├── customers.tsx
│   │   └── reports.tsx
│   │
│   └── components/
│       ├── AdminNav.tsx
│       ├── PricingTable.tsx
│       ├── CustomerTable.tsx
│       └── Charts.tsx
│
├── docs/
│   ├── DEPLOYMENT.md (how to deploy)
│   ├── SETUP.md (how to set up locally)
│   ├── API.md (admin API endpoints)
│   └── FAQ.md (common questions)
│
└── .github/
    └── TEAM_GUIDELINES.md (for future developers)
```

## IMPLEMENTATION ORDER

**Phase 1: Foundation** (Week 1-2)
1. Set up Next.js project
2. Configure Tailwind + design system
3. Create component library
4. Set up database schema (products, customers, subscriptions)

**Phase 2: Customer Websites** (Week 2-3)
1. Build all three customer-facing websites
   - aether.com.ph
   - digital.aether.com.ph
   - celebrations.aether.com.ph
2. Integrate Sanity CMS for content management
3. Contact forms working + sending emails

**Phase 3: Admin Panels** (Week 3-4)
1. Authentication (login)
2. Pricing panel (CRUD prices)
3. Customer dashboard (view + manage customers)
4. Reports (simple MRR dashboard)

**Phase 4: Deployment & Polish** (Week 4+)
1. Deploy all three sites to Netlify
2. Set up custom domains
3. Testing + bug fixes
4. Documentation

## CRITICAL CONSTRAINTS (Don't Break These)

🔒 **Single Source of Truth for Pricing**
- ALL prices stored in `src/config/products.js`
- Website pulls prices dynamically
- Admin panel updates this file
- NO hardcoded prices anywhere

🔒 **No Hardcoded Customer Data**
- All customers in database (PostgreSQL)
- API endpoints manage customers
- Admin dashboard shows real data

🔒 **CMS for Content**
- Blog posts, galleries, testimonials from CMS
- Allows non-technical updates (Remlyn can add gallery photos)
- Website pulls content, not hardcoded

🔒 **Clean, Documented Code**
- Every function has comments
- Components have PropTypes/TypeScript
- README in every folder
- Future developers (or AI assistants) understand immediately

🔒 **No Dark Patterns**
- No dark mode toggle that breaks (if not implemented, don't add it)
- No "coming soon" sections
- No broken links
- Everything that appears = fully functional

## WHAT TO DO STEP BY STEP

1. **Ask clarifying questions** (if anything above is unclear)
2. **Set up the project** (create folder structure, install dependencies)
3. **Build the design system** (colors, typography, components)
4. **Build the websites** (all three customer-facing sites)
5. **Build the admin panels** (pricing, customers, reports)
6. **Set up deployment** (Netlify, custom domains)
7. **Ask for review** (Jayson approves before deployment)
8. **Deploy** (go live)
9. **Iterate** (fix bugs, refine based on feedback)

## HOW I'LL HELP YOU

✅ Ask clarifying questions upfront  
✅ Show you code as it's built (so you can review)  
✅ Explain decisions (why I chose X over Y)  
✅ Accept feedback ("change this color" / "make that larger")  
✅ Test thoroughly before deploying  
✅ Document everything (for future team)  
✅ Check the ROADMAP regularly to stay aligned  

## WHAT I NEED FROM YOU

✅ Approval to start (just say "start building")  
✅ Content + photos for galleries (Remlyn's responsibility)  
✅ Contact info: email, phone, address for footer  
✅ Pricing: Confirm all prices in products.js (see config section above)  
✅ Logo + branding assets (if you have them; I can design if not)  
✅ Feedback on designs (you review, I refine)  
✅ Final approval before deployment  

## LET'S START

Ready? Say:

**"Start building the Aether websites. Begin with clarifying questions about design preferences, then proceed with the project."**

Or tell me:
- "Change the primary color from navy to X"
- "Use font Y instead of Z"
- "Add/remove any pages"
- "Any other preferences?"

Then I'll build everything and show you as we go.

---

**Created:** May 3, 2026  
**For:** Jayson + Remlyn (Aether Co-Founders)  
**Project:** C:\Projects\Aether  
**Status:** Ready for Claude Code Execution
