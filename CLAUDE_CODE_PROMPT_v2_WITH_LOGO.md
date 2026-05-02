# CLAUDE CODE PROMPT: AETHER WEBSITE BUILDER v2
**For:** VS Code Claude Code Extension  
**Project:** C:\Projects\Aether  
**Status:** Ready to Execute  
**Logo:** A + Heart + Pixels (FINAL, LOCKED)

---

## INSTRUCTIONS FOR YOU (Before Pasting)

1. **Copy this entire prompt** (everything below)
2. **Open VS Code**
3. **Open Claude Code extension** (Command Palette: "Claude Code: Open")
4. **Paste this prompt** in the chat
5. **Hit Enter** and Claude Code will start building

Claude Code will ask clarifying questions. Answer them and it will build everything.

**You don't need to code. You review what it builds, say "looks good" or "fix X", and it does.**

---

# AETHER WEBSITE BUILDER PROMPT v2

You are the Aether Website Architect. Your job: Build three beautiful, minimalist websites for Aether using the official logo and brand guidelines.

## YOUR MISSION

Build three interconnected websites that serve Aether Digital and Aether Celebrations, with minimalist design, admin panels for pricing/customers, and your official AETHER logo integrated throughout.

**Projects to build:**
1. **aether.com.ph** — Corporate hub (tells the Aether story)
2. **digital.aether.com.ph** — Aether Digital (Jayson's division: websites, POS, printing, software)
3. **celebrations.aether.com.ph** — Aether Celebrations (Remlyn's division: events, weddings, souvenirs)

## LOGO SPECIFICATIONS (LOCKED - Don't Change)

### The Official AETHER Logo
**Design:** "A" with heart inside + scattered pixel particles + sparkle accents  
**Colors:** Pink-to-purple gradient (top-left to bottom-right)  
**Tagline:** "THE ESSENCE OF POSSIBILITY"  
**Descriptor:** "DIGITAL • CELEBRATIONS"  

### Logo Colors (Exact Hex Codes)
```
Bright Pink: #ff1493
Mid Magenta: #ff4081
Deep Purple: #6a4c93
Navy Text: #1a1a1a
White Accents: #ffffff
Dark Background: #0a0a0a
```

### Logo Usage
- **Website Headers:** Icon + wordmark "AETHER" (280×140px)
- **Favicon:** Icon only (16×16px, 32×32px, 64×64px)
- **Social Media:** Icon only (400×400px)
- **Throughout site:** Consistent use of official logo
- **Never:** Distort, stretch, change colors, or remove elements

### Logo Files Available
- Located in: `C:\Projects\Aether\assets\logo\`
- Formats: SVG (web), PNG (backup), PDF (print), AI (editable)
- Always use SVG for web (scalable, sharp at any size)

---

## DESIGN PRINCIPLES (CRITICAL - Follow These Exactly)

### Aesthetic: "Simple Yet Elegant + Modern Futuristic"

**Visual Vibe:**
- Clean, minimal layouts (don't clutter)
- Strategic use of the gradient (pink-to-purple)
- Dark mode friendly (dark navy/black backgrounds)
- Generous white space (luxury feel)
- Subtle animations (no heavy effects)
- Professional + warm (technical + emotional)

**NOT:**
- ❌ Neon, overly bright, harsh colors
- ❌ Too many effects or animations
- ❌ Cluttered layouts or tiny fonts
- ❌ Generic or templated look
- ❌ Dark mode only (test on light too)

**YES:**
- ✅ Elegant, refined typography
- ✅ Strategic use of gradient (accents, buttons, lines)
- ✅ Clean, organized sections
- ✅ Plenty of breathing room
- ✅ Purposeful, subtle interactions
- ✅ Professional, premium feel
- ✅ Accessible, readable, beautiful

### Logo Integration
- **Header:** Logo on every page (links to homepage)
- **Favicon:** Logo icon (shown in browser tab)
- **Accents:** Use gradient in buttons, links, lines
- **Hero Section:** Logo can be featured with tagline
- **CTA Buttons:** Use gradient for call-to-action buttons
- **Hover States:** Subtle gradient animation on interactive elements

### Color Palette (Beyond Logo)

```
Primary: Navy #1a1a1a (text, primary elements)
Secondary: White #ffffff (backgrounds, text on dark)
Accent: Gradient (buttons, links, accents)
Dark Background: #0a0a0a or #1a1a1a (dark mode)
Light Background: #ffffff or #f5f5f5 (light mode)
Text Secondary: #666666 (muted text, descriptions)
Border: #cccccc (light borders on light mode)
Border Dark: #333333 (dark borders on dark mode)
```

---

## WEBSITE STRUCTURE

### aether.com.ph (Hub) — The Story

**Pages:**

1. `/` (Homepage)
   - **Hero:** Large AETHER logo + "THE ESSENCE OF POSSIBILITY" tagline
   - **Headline:** "Where Digital Meets Love"
   - **Two Equal Sections:**
     - Left: "Aether Digital" (icon + brief description)
     - Right: "Aether Celebrations" (icon + brief description)
   - **Story Section:** 2-3 paragraphs about Aether's philosophy
   - **Testimonials:** 2-3 from both divisions
   - **CTA Buttons:** "Explore Digital" | "Explore Celebrations"
   - **Footer:** Logo, contact info, links

2. `/about`
   - **Founders Section:** Jayson (Digital) + Remlyn (Celebrations)
   - **Story:** Why AETHER exists, the philosophy
   - **Values:** Innovation, Excellence, Trust, Magic
   - **Photos:** Team photos (if available), warm, human
   - **Mission Statement:** Short, powerful

3. `/contact`
   - **Contact Form:** Name, email, message, service type
   - **Email:** contact@aether.com.ph
   - **Phone:** (to be provided by you)
   - **Address:** (to be provided by you)
   - **Response Time:** "We respond within 24 hours"

### digital.aether.com.ph (Aether Digital) — Services

**Pages:**

1. `/` (Homepage)
   - **Hero:** Logo + "Aether Digital" | "Systems that Scale"
   - **Services Offered** (cards with gradient accents):
     - Custom websites
     - Software systems (POS, Inventory, Printing)
     - Domain + hosting management
     - SEO + online presence
   - **Portfolio Section:** rimandolaw.com case study
   - **Pricing Section:** (pulls from admin panel)
   - **CTA:** "Get Started" → Contact form

2. `/services`
   - **Detailed Service Descriptions**
   - **What's Included** in each service
   - **Process:** "How We Work" (timeline)
   - **Timeline Expectations**
   - **FAQ Section**

3. `/portfolio`
   - **Case Studies** (rimandolaw.com featured)
   - **Format:** Problem → Solution → Results
   - **Technologies Used**
   - **Client Testimonial**
   - **Link:** "Visit Site" button

4. `/pricing`
   - **Services + Prices** (pulls from admin panel)
   - **Pricing Breakdown:** One-time vs recurring
   - **No Hardcoded Prices** (all from database)
   - **Optional Add-ons:** Listed with prices
   - **FAQ:** "Why does X cost Y?"
   - **CTA:** "Request Quote" → Contact form

5. `/contact`
   - **Contact Form**
   - **"Request a Quote" CTA**
   - **Office Hours**

### celebrations.aether.com.ph (Aether Celebrations) — Magic

**Pages:**

1. `/` (Homepage)
   - **Hero:** Logo + "Aether Celebrations" | "Turning Moments into Memories"
   - **Gallery:** 4-6 beautiful event photos (landscape images)
   - **Services** (cards with warm tones):
     - Wedding planning
     - Event coordination
     - Venue design
     - Souvenirs + invitations
   - **Testimonials:** Happy couples/clients
   - **CTA:** "Plan Your Event" → Contact form

2. `/galleries`
   - **Photo Gallery** (beautiful, high-quality images)
   - **Filtering:** By event type (wedding, corporate, birthday, etc.)
   - **Image Captions:** Event name, date, brief description
   - **Layout:** Grid, responsive, elegant
   - **Lightbox:** Click to expand

3. `/services`
   - **Wedding Packages** (detailed breakdown)
   - **Event Planning Services**
   - **Souvenir Options** (with photos)
   - **Pricing:** (pulls from admin panel)
   - **Customization:** "Can we customize?" → FAQ + contact form

4. `/pricing`
   - **Package Pricing**
   - **Customization Options**
   - **What's Included** in each package
   - **FAQ:** Common questions
   - **CTA:** "Book a Consultation" → Contact form

5. `/contact`
   - **Contact Form** (event type, date, guest count fields)
   - **"Book a Consultation" CTA**
   - **Response Time:** "We'll contact you within 24 hours"

---

## ADMIN PANELS (Internal Only - Behind Login)

### Admin Dashboard: admin.aether.com.ph

**Authentication:**
- Simple login (email + password)
- Session expires after 8 hours inactivity

**Dashboard Pages:**

1. **Overview** (First thing users see)
   - **MRR Display:** Bold number at top (Monthly Recurring Revenue)
   - **Total Customers** count
   - **Revenue Breakdown:** Pie chart (Websites / Printing / Inventory / Events)
   - **Customers Due for Renewal:** (next 30 days list)
   - **Quick Stats:** New customers this month, churn rate

2. **Pricing Panel**
   - **Table:** Product | Current Price | Frequency | Last Updated
   - **Edit:** Click row → modal opens → update price → save
   - **All Changes Logged:** Who changed what, when
   - **Live Update:** Website pulls prices immediately
   - **Products Locked:**
     ```
     Website Design | PHP 8,000-15,000 | One-time
     Website Maintenance | PHP 1,500-2,500 | Monthly
     Domain Management | PHP 500-1,000 | Monthly
     Printing System License | PHP 5,000-10,000 | One-time
     Printing System Maintenance | PHP 1,500-2,000 | Monthly
     Inventory System License | PHP 5,000-8,000 | One-time
     Inventory System Maintenance | PHP 1,500-2,500 | Monthly
     Event Planning | Custom | Custom
     Souvenir Printing | Custom | Custom
     ```

3. **Customers**
   - **Table:** Name | Product | Monthly Amount | Renewal Date | Status
   - **View:** Click customer → see all purchases + subscriptions
   - **Add New:** Form to add customer or update subscription
   - **Search:** By name
   - **Filter:** By product, status (active/due/overdue)
   - **Actions:** Mark renewed, mark churned, edit details

4. **Reports** (Simple Stats)
   - **MRR Trend:** Graph (last 12 months)
   - **Customers by Product:** Bar chart
   - **Churn Rate:** Percentage
   - **New Customers This Month:** Count
   - **Top Customers:** List (highest MRR)
   - **Export:** CSV download

---

## TECHNICAL STACK (Recommended)

**Frontend:**
- React (functional components, hooks)
- Next.js (file-based routing, API routes)
- Tailwind CSS (utility-first styling)
- TypeScript (optional but recommended)
- Framer Motion (subtle animations)

**Backend:**
- Node.js + Express (simple API)
- PostgreSQL (database)
- Netlify Functions or Vercel Functions (serverless)
- Authentication: Session-based (not OAuth yet)

**CMS:**
- Sanity.io (headless CMS, free tier)
- OR Contentful (alternative)
- Content models: Services, Portfolio, Testimonials, Gallery

**Hosting:**
- Netlify or Vercel (free tier works)
- Custom domains (aether.com.ph, digital.aether, celebrations.aether)
- SSL: Automatic

**Database:**
- PostgreSQL for customer/pricing data
- Connection string from environment variables

---

## FOLDER STRUCTURE

```
C:\Projects\Aether\
├── ROADMAP.md (business roadmap)
├── DESIGN_BRIEF.md (design system)
├── CLAUDE_CODE_PROMPT.md (this file)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── .env.example
│
├── src/
│   ├── config/
│   │   ├── products.js (ALL PRICES - source of truth)
│   │   └── sites.js (site-specific config)
│   │
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Hero.tsx
│   │   ├── NavBar.tsx (includes AETHER logo)
│   │   ├── Footer.tsx
│   │   ├── Form.tsx
│   │   ├── PricingTable.tsx
│   │   └── Gallery.tsx
│   │
│   ├── pages/
│   │   ├── aether/
│   │   │   ├── index.tsx
│   │   │   ├── about.tsx
│   │   │   └── contact.tsx
│   │   ├── digital/
│   │   │   ├── index.tsx
│   │   │   ├── services.tsx
│   │   │   ├── portfolio.tsx
│   │   │   ├── pricing.tsx
│   │   │   └── contact.tsx
│   │   ├── celebrations/
│   │   │   ├── index.tsx
│   │   │   ├── galleries.tsx
│   │   │   ├── services.tsx
│   │   │   ├── pricing.tsx
│   │   │   └── contact.tsx
│   │   └── api/
│   │       ├── contact.ts
│   │       ├── pricing.ts
│   │       └── admin/
│   │           ├── login.ts
│   │           ├── prices.ts
│   │           └── customers.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   └── lib/
│       ├── db.ts
│       ├── auth.ts
│       └── utils.ts
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
├── assets/
│   └── logo/
│       ├── aether-logo-icon.svg
│       ├── aether-logo-wordmark.svg
│       ├── aether-logo-full.svg
│       ├── aether-favicon.ico
│       ├── aether-logo.png
│       └── aether-logo.pdf
│
├── docs/
│   ├── DEPLOYMENT.md
│   ├── SETUP.md
│   ├── API.md
│   └── FAQ.md
│
└── .github/
    └── TEAM_GUIDELINES.md
```

---

## IMPLEMENTATION ORDER

**Phase 1: Foundation** (Week 1-2)
1. Set up Next.js project
2. Configure Tailwind + design system
3. Import and set up AETHER logo files
4. Create component library
5. Set up database schema (products, customers, subscriptions)

**Phase 2: Customer Websites** (Week 2-3)
1. Build all three customer-facing websites
   - aether.com.ph
   - digital.aether.com.ph
   - celebrations.aether.com.ph
2. Integrate logo on every page
3. Integrate CMS for content
4. Contact forms working

**Phase 3: Admin Panels** (Week 3-4)
1. Authentication (login)
2. Pricing panel
3. Customer dashboard
4. Reports/analytics

**Phase 4: Deployment & Polish** (Week 4+)
1. Deploy to Netlify/Vercel
2. Set up custom domains
3. Testing + bug fixes
4. Documentation

---

## CRITICAL CONSTRAINTS (Don't Break These)

🔒 **Logo Integrity**
- Use official AETHER logo (from assets/logo/)
- Never distort, stretch, or change colors
- Always use SVG for web (sharp at any size)
- Favicon uses icon-only version
- Header uses icon + wordmark version

🔒 **Single Source of Truth for Pricing**
- ALL prices in `src/config/products.js`
- Website pulls prices dynamically
- Admin panel updates this file
- NO hardcoded prices anywhere

🔒 **No Hardcoded Customer Data**
- All customers in database
- API endpoints manage customers
- Admin dashboard shows real data

🔒 **CMS for Content**
- Blog posts, galleries, testimonials from CMS
- Non-technical updates allowed (Remlyn can add photos)
- Website pulls content, not hardcoded

🔒 **Clean, Documented Code**
- Every function has comments
- Components have TypeScript types
- README in every folder
- Future developers understand immediately

🔒 **Brand Consistency**
- Logo on every page (header)
- Gradient used in buttons, accents, lines
- Navy for text, white for backgrounds
- Minimalist, elegant, simple
- No design drift

---

## WHAT TO DO STEP BY STEP

1. **Ask Clarifying Questions**
   - Do we have official logo files? (Yes, in assets/logo/)
   - Color preferences? (Pink-purple gradient locked)
   - Any content/photos ready? (Jayson will provide)
   - Admin features priority? (Pricing panel first)

2. **Set Up the Project**
   - Create folder structure
   - Install dependencies
   - Configure Tailwind
   - Set up database

3. **Build the Design System**
   - Import logo files
   - Set up color palette
   - Create component library
   - Test responsive design

4. **Build the Websites**
   - All three customer sites
   - Logo on every page
   - Forms working
   - CMS integrated

5. **Build the Admin Panels**
   - Authentication
   - Pricing management
   - Customer management
   - Reports

6. **Deploy & Launch**
   - Test all functionality
   - Deploy to Netlify
   - Set up domains
   - Monitor for issues

7. **Iterate & Refine**
   - Gather feedback
   - Fix bugs
   - Optimize performance
   - Document everything

---

## HOW I'LL HELP YOU

✅ Ask clarifying questions upfront  
✅ Show you code as it's built (review before proceeding)  
✅ Explain architecture decisions  
✅ Accept feedback ("change this color" / "make that larger")  
✅ Test thoroughly before deploying  
✅ Document everything  
✅ Keep the ROADMAP in mind  
✅ Check the LOGO BRAND GUIDE for accuracy  

---

## WHAT I NEED FROM YOU

✅ Approval to start ("Build the Aether websites")  
✅ Contact info: email, phone, address for footer  
✅ Pricing confirmation (from products.js)  
✅ Content + photos for galleries (Remlyn's responsibility)  
✅ rimandolaw.com case study details (portfolio section)  
✅ Feedback on designs (review, request changes)  
✅ Final approval before deployment  

---

## LET'S START

Ready? Say:

**"Start building the Aether websites. Use the official logo from assets/logo/. Begin with clarifying questions about content and preferences, then proceed with the build."**

Or tell me:
- "Add more pages"
- "Change the color to X"
- "Focus on mobile-first"
- "Any other preferences?"

Then I'll build everything and show you as we go.

---

**Created:** May 3, 2026  
**For:** Jayson + Remlyn (Aether Co-Founders)  
**Project:** C:\Projects\Aether  
**Logo:** A + Heart + Pixels (FINAL, LOCKED)  
**Status:** Ready for Claude Code Execution  
**Brand Guide:** AETHER_LOGO_BRAND_GUIDE_FINAL_v4_YOUR_DESIGN.md
