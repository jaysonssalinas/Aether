# Aether Admin CRM — UI Redesign Spec

**Date:** 2026-05-08
**Status:** Approved

---

## Goal

Replace the current decorative dark/hot-pink design with a professional, business-grade CRM UI. Default to a light clean theme and support user-selectable themes via a Settings page.

---

## Design Direction

**Default theme: Light Professional**

The current design reads decorative (hot pink gradients, Playfair Display serif, near-black backgrounds). The target is a clean, data-forward tool that feels like Stripe or HubSpot — where the data is the focus, not the chrome.

**Chosen by user:** B — Light Clean base, Slate Blue accent.

---

## Color System — CSS Custom Properties

All colors are defined as CSS variables on `[data-theme]` selectors in `globals.css`. No hardcoded hex values in components — components use `var(--color-*)` tokens only.

### Token names

```
--color-bg          Page background
--color-surface     Card / panel background
--color-border      Default border color
--color-text        Primary text
--color-muted       Secondary / label text
--color-subtle      Tertiary / placeholder text
--color-accent      Primary action color (buttons, active nav, links)
--color-accent-hover  Hover state of accent
--color-success     Revenue / positive values (green)
--color-danger      Alerts / errors (red)
--color-sidebar-bg  Sidebar background
--color-sidebar-border  Sidebar right border
```

### Theme: light (default)

```css
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
}
```

### Theme: dark (Dark Professional — like Vercel/Linear)

```css
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
}
```

### Theme: dark-indigo (Neutral Dark + Indigo — like macOS)

```css
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
}
```

---

## Typography

- Remove `Playfair Display` entirely — it's the source of the decorative feel.
- Remove the Google Fonts `<link>` for Playfair Display from `layout.tsx`. Keep Inter.
- All headings, labels, and body text use Inter (`font-sans`).
- No gradient text anywhere in the admin app.

---

## ThemeProvider

A client component that:
1. Reads theme from `localStorage` on mount (key: `aether_admin_theme`, default: `"light"`)
2. Sets `document.documentElement.dataset.theme = theme`
3. Provides `useTheme()` hook returning `{ theme, setTheme }`
4. Wraps the body in `layout.tsx`

```tsx
// apps/admin/components/ThemeProvider.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'dark-indigo';
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

The `<html>` element gets `data-theme="light"` as a default SSR attribute to prevent flash. The `ThemeProvider` corrects it client-side on mount.

---

## globals.css

Replace the current brand-centric theme with:
1. The three `[data-theme]` blocks above
2. A base body rule using CSS vars: `background: var(--color-bg); color: var(--color-text)`
3. Remove `--color-brand-*` tokens, gradient utilities (`.gradient-text`, `.gradient-bg`, `.gradient-border`)
4. Remove `@theme inline` block entirely — colors are now runtime CSS vars, not Tailwind tokens
5. Keep the animation keyframes (`float`, `fadeInUp`, `fadeIn`) and `.animate-*` utilities

---

## Shared UI Conventions

All components follow these rules consistently:

**Cards / panels:**
```
background: var(--color-surface);
border: 1px solid var(--color-border);
border-radius: 8px;
```
Light theme cards get `box-shadow: 0 1px 3px rgba(0,0,0,0.06)` in addition.

**Labels (section headers, column headers):**
```
font-size: 11px; font-weight: 500; text-transform: uppercase;
letter-spacing: 0.07em; color: var(--color-muted);
```

**Primary button:**
```
background: var(--color-accent); color: #fff; border: none;
padding: 8px 16px; border-radius: 6px; font-size: 14px;
```

**Hover:** `background: var(--color-accent-hover)`

**Secondary / ghost button:**
```
background: transparent; border: 1px solid var(--color-border);
color: var(--color-text); padding: 8px 16px; border-radius: 6px;
```

**Form inputs:**
```
background: var(--color-surface); border: 1px solid var(--color-border);
border-radius: 6px; color: var(--color-text); padding: 9px 12px; font-size: 14px;
```
Focus: `border-color: var(--color-accent); outline: none`

**Table rows:** alternating via `nth-child` or simple hover highlight:
```
hover: background: var(--color-bg)
```

---

## Sidebar (AdminSidebar.tsx)

- Background: `var(--color-sidebar-bg)`, right border: `1px solid var(--color-sidebar-border)`
- Width stays 224px (w-56)
- Logo area: plain `AETHER` in Inter, font-semibold, `color: var(--color-text)`. No gradient, no serif.
- Sub-label `Admin Panel` in `color: var(--color-subtle)`
- Nav links:
  - Default: `color: var(--color-muted)`
  - Active: `color: var(--color-text)`, left border `3px solid var(--color-accent)`, `background: var(--color-bg)`
  - Replace Unicode icons with Lucide React icons (or simple SVG inline): LayoutDashboard, Tag, Users, CreditCard, BarChart2, Settings
- Add **Settings** nav link pointing to `/settings`
- Replace Unicode symbols (◈, ◇, ◉) with small inline SVG paths — no new icon package needed (`lucide-react` is not installed and should not be added)
- Logout and View Website links keep similar style, muted

---

## Login Page (app/login/page.tsx)

- Page background: `var(--color-bg)` (note: login page renders outside ThemeProvider's auth shell — ThemeProvider wraps the whole layout, so login gets it too)
- Card: `var(--color-surface)`, bordered, max-w-sm centered
- `AETHER` wordmark: Inter semibold, `color: var(--color-text)`. No gradient.
- `Admin Panel` sublabel: `color: var(--color-subtle)`
- Input focus highlight: `var(--color-accent)`
- Submit button: primary button style
- Remove all `style={{ fontFamily: "Playfair Display..." }}`

---

## Dashboard Page (app/dashboard/page.tsx)

- Page title `Overview` in Inter, `text-xl font-semibold`
- Stat cards: standard card style, value in `text-3xl font-semibold color: var(--color-text)`
- MRR value: `color: var(--color-text)` — no gradient text
- Renewals Due card: if `renewalDue > 0`, value `color: var(--color-danger)`, card border `color: var(--color-danger)` at 30% opacity
- Revenue by Product bar chart: bars use `var(--color-accent)` for digital, `#8b5cf6` (fixed purple) for celebrations. Bar track: `var(--color-border)`
- Renewal Alerts section: card with `border-color: var(--color-danger)` at 30% opacity, section label in `var(--color-danger)`

---

## Customers Page (app/customers/page.tsx)

- Full-width table inside a card
- Table header row: `var(--color-bg)` background, column labels in standard label style
- Rows: `var(--color-surface)`, hover `var(--color-bg)`
- "Add Customer" button: primary button, top-right of the card header
- Customer detail drawer (if present): standard surface/border
- Error banner: `background: rgba(ef4444, 0.08)`, `border: 1px solid var(--color-danger)`, `color: var(--color-danger)`

---

## Subscriptions Page (app/subscriptions/page.tsx)

Same table conventions as Customers. Status badges:
- `active`: `background: rgba(22,163,74,0.1)`, `color: var(--color-success)`, `border: 1px solid rgba(22,163,74,0.2)`, `border-radius: 12px`, `padding: 2px 10px`
- `paused`: muted colors using `var(--color-muted)` and `var(--color-border)`
- `cancelled`: danger colors using `var(--color-danger)`

---

## Pricing Page (app/pricing/page.tsx)

- Product rows in a table/list; editable price fields on click
- Division badges: `Digital` in accent blue tones, `Celebrations` in purple tones — both subtle, label-like

---

## Reports Page (app/reports/page.tsx)

- Currently minimal/placeholder — just restyle the shell (heading, page container) to match other pages

---

## Settings Page (NEW — app/settings/page.tsx)

New page, linked from sidebar.

### Theme Picker section

Three theme cards displayed in a horizontal row (or 3-column grid on larger screens). Each card:
- Mini preview showing the theme's actual colors (a small mock sidebar + stat card rendered inline with hardcoded colors, not CSS vars — so the preview is always visible regardless of current theme)
- Theme name below the preview
- Selected state: `border: 2px solid var(--color-accent)`
- Unselected: `border: 2px solid var(--color-border)`
- Clicking a card calls `setTheme(themeKey)`

Preview content per card (hardcoded, not themeable):

**Light preview** — white surface, slate border, blue accent, slate text
**Dark preview** — #0f172a surface, #334155 border, blue accent, light text  
**Dark Indigo preview** — #2c2c2e surface, #3a3a3c border, #6366f1 accent, white text

Section header: `Appearance` with standard label style.

---

## Files Changed

| File | Action |
|------|--------|
| `apps/admin/app/globals.css` | Replace brand tokens with CSS variable theme blocks |
| `apps/admin/app/layout.tsx` | Add ThemeProvider wrapper; remove Playfair Display font link; add `data-theme="light"` to `<html>` |
| `apps/admin/components/ThemeProvider.tsx` | **Create** — theme context + localStorage persistence |
| `apps/admin/components/AdminSidebar.tsx` | Restyle to CSS vars; add Settings link; replace icons |
| `apps/admin/app/login/page.tsx` | Restyle to CSS vars, remove gradients/serif |
| `apps/admin/app/dashboard/page.tsx` | Restyle to CSS vars, remove gradients/serif |
| `apps/admin/app/customers/page.tsx` | Restyle to CSS vars, table conventions |
| `apps/admin/app/subscriptions/page.tsx` | Restyle to CSS vars, status badges |
| `apps/admin/app/pricing/page.tsx` | Restyle to CSS vars |
| `apps/admin/app/reports/page.tsx` | Restyle shell to CSS vars |
| `apps/admin/app/settings/page.tsx` | **Create** — theme picker Settings page |

---

## What This Is Not

- No backend changes (no DB columns, no API routes)
- No new features beyond the Settings theme picker
- No animation or transition library added
- No Lucide or other icon package required (inline SVG is acceptable; keep it simple)
