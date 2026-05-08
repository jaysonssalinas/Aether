-- Aether Admin Database Schema
-- Run this in pgAdmin 4 against your 'aether_admin' database.
-- After running: psql -U postgres -d aether_admin -f schema.sql

-- ============================================================
-- ADMIN USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id          SERIAL PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Default admin accounts (password: aether2026)
-- Generate new hashes with: node -e "const b=require('bcryptjs'); console.log(b.hashSync('yourpassword',10))"
INSERT INTO admin_users (email, name, password_hash) VALUES
  ('jayson@aether.com.ph', 'Jayson Salinas', '$2a$10$Q3jzSMkdtRmgd4NyLbo9Eu.eVefuWH3frKvCDnx3cg.IaOD7dOsTO'),
  ('remlyn@aether.com.ph', 'Remlyn Salinas', '$2a$10$Q3jzSMkdtRmgd4NyLbo9Eu.eVefuWH3frKvCDnx3cg.IaOD7dOsTO')
ON CONFLICT (email) DO NOTHING;


-- ============================================================
-- PRODUCTS / PRICING (source of truth for live prices)
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id              TEXT PRIMARY KEY,        -- matches products.ts id
  name            TEXT NOT NULL,
  description     TEXT,
  starting_price  INTEGER,                 -- NULL = custom quote
  max_price       INTEGER,                 -- NULL = no max
  frequency       TEXT NOT NULL,           -- 'one-time' | 'monthly' | 'custom'
  division        TEXT NOT NULL,           -- 'digital' | 'celebrations'
  category        TEXT NOT NULL,
  featured        BOOLEAN DEFAULT FALSE,
  updated_by      INTEGER REFERENCES admin_users(id),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Seed from products.ts defaults
INSERT INTO products (id, name, description, starting_price, max_price, frequency, division, category, featured) VALUES
  ('website-design',              'Website Design',                   'Custom-built website', 8000,  15000, 'one-time', 'digital',       'Web Services',     TRUE),
  ('website-maintenance',         'Website Maintenance',              'Monthly care plan',    1500,  2500,  'monthly',  'digital',       'Web Services',     TRUE),
  ('printing-system-license',     'Printing System License',          'POS for print shops',  5000,  10000, 'one-time', 'digital',       'Software Systems', TRUE),
  ('printing-system-maintenance', 'Printing System Maintenance',      'Monthly support',      1500,  2000,  'monthly',  'digital',       'Software Systems', FALSE),
  ('inventory-system-license',    'Inventory System License',         'Inventory software',   5000,  8000,  'one-time', 'digital',       'Software Systems', TRUE),
  ('inventory-system-maintenance','Inventory System Maintenance',     'Monthly support',      1500,  2500,  'monthly',  'digital',       'Software Systems', FALSE),
  ('piso-wifi-license',           'Piso Wifi System License',         'Coin-op WiFi hotspot',  3500, 6000,  'one-time', 'digital',       'Software Systems', TRUE),
  ('piso-wifi-maintenance',       'Piso Wifi Maintenance',            'Monthly remote support', 800, 1500,  'monthly',  'digital',       'Software Systems', FALSE),
  ('domain-hosting',              'Domain + Hosting Management',      'End-to-end hosting',   1200,  NULL,  'monthly',  'digital',       'Web Services',     FALSE),
  ('seo-online-presence',         'SEO + Online Presence',            'Get found on Google',  3000,  NULL,  'monthly',  'digital',       'Web Services',     FALSE),
  ('event-planning',              'Event Planning',                   'Full coordination',    NULL,  NULL,  'custom',   'celebrations',  'Events',           TRUE),
  ('wedding-planning',            'Wedding Planning',                 'Full wedding service', NULL,  NULL,  'custom',   'celebrations',  'Weddings',         TRUE),
  ('souvenir-printing',           'Souvenir & Invitation Printing',   'Custom print design',  NULL,  NULL,  'custom',   'celebrations',  'Print & Design',   TRUE)
ON CONFLICT (id) DO NOTHING;

-- Audit log for price changes
CREATE TABLE IF NOT EXISTS price_change_log (
  id          SERIAL PRIMARY KEY,
  product_id  TEXT REFERENCES products(id),
  changed_by  INTEGER REFERENCES admin_users(id),
  old_starting_price INTEGER,
  new_starting_price INTEGER,
  old_max_price      INTEGER,
  new_max_price      INTEGER,
  changed_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- CUSTOMERS
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT,
  phone           TEXT,
  address         TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SUBSCRIPTIONS (what each customer is paying for)
-- ============================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id              SERIAL PRIMARY KEY,
  customer_id     INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  product_id      TEXT REFERENCES products(id),
  monthly_amount  INTEGER NOT NULL DEFAULT 0,
  start_date      DATE NOT NULL,
  renewal_date    DATE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'active', -- 'active' | 'paused' | 'cancelled'
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACT FORM SUBMISSIONS (from all 3 public sites)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          SERIAL PRIMARY KEY,
  site        TEXT NOT NULL, -- 'aether' | 'digital' | 'celebrations'
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT,
  message     TEXT NOT NULL,
  status      TEXT DEFAULT 'new', -- 'new' | 'replied' | 'closed'
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- MRR view: sum of all active monthly subscriptions
CREATE OR REPLACE VIEW mrr_summary AS
SELECT
  SUM(s.monthly_amount) AS total_mrr,
  COUNT(DISTINCT s.customer_id) AS total_customers,
  COUNT(CASE WHEN s.renewal_date <= CURRENT_DATE + 30 AND s.status = 'active' THEN 1 END) AS renewals_due_30d
FROM subscriptions s
WHERE s.status = 'active';

-- Revenue by product
CREATE OR REPLACE VIEW revenue_by_product AS
SELECT
  p.name AS product_name,
  p.division,
  COUNT(s.id) AS customer_count,
  COALESCE(SUM(s.monthly_amount), 0) AS monthly_revenue
FROM products p
LEFT JOIN subscriptions s ON s.product_id = p.id AND s.status = 'active'
GROUP BY p.id, p.name, p.division
ORDER BY monthly_revenue DESC;
