export type PricingFrequency = 'one-time' | 'monthly' | 'custom';

export interface Product {
  id: string;
  name: string;
  description: string;
  startingPrice: number | null;
  maxPrice: number | null;
  frequency: PricingFrequency;
  division: 'digital' | 'celebrations';
  category: string;
  featured: boolean;
  includes: string[];
}

export const products: Product[] = [
  {
    id: 'website-design',
    name: 'Website Design',
    description: 'Custom-built website tailored to your brand and business goals.',
    startingPrice: 8000,
    maxPrice: 15000,
    frequency: 'one-time',
    division: 'digital',
    category: 'Web Services',
    featured: true,
    includes: [
      'Custom design mockup',
      'Responsive (mobile + desktop)',
      'Up to 5 pages',
      'Contact form integration',
      'Basic SEO setup',
      '30-day post-launch support',
    ],
  },
  {
    id: 'website-maintenance',
    name: 'Website Maintenance',
    description: 'Monthly care plan: updates, backups, uptime monitoring, and support.',
    startingPrice: 1500,
    maxPrice: 2500,
    frequency: 'monthly',
    division: 'digital',
    category: 'Web Services',
    featured: true,
    includes: [
      'Content updates (up to 4/month)',
      'Plugin and security updates',
      'Daily backups',
      'Uptime monitoring',
      'Priority support',
    ],
  },
  {
    id: 'printing-system-license',
    name: 'Printing System License',
    description: 'Full-featured POS and job management system for printing shops.',
    startingPrice: 5000,
    maxPrice: 10000,
    frequency: 'one-time',
    division: 'digital',
    category: 'Software Systems',
    featured: true,
    includes: [
      'Job order management',
      'Customer records',
      'Receipt printing',
      'Sales reporting',
      'Staff accounts',
      'On-site installation and training',
    ],
  },
  {
    id: 'printing-system-maintenance',
    name: 'Printing System Maintenance',
    description: 'Monthly support, updates, and remote assistance for your printing system.',
    startingPrice: 1500,
    maxPrice: 2000,
    frequency: 'monthly',
    division: 'digital',
    category: 'Software Systems',
    featured: false,
    includes: [
      'System updates',
      'Remote technical support',
      'Data backup assistance',
      'Bug fixes',
    ],
  },
  {
    id: 'inventory-system-license',
    name: 'Inventory System License',
    description: 'Smart inventory management for retail, sari-sari stores, and small businesses.',
    startingPrice: 5000,
    maxPrice: 8000,
    frequency: 'one-time',
    division: 'digital',
    category: 'Software Systems',
    featured: true,
    includes: [
      'Product catalog management',
      'Stock level tracking',
      'Low-stock alerts',
      'Sales and purchase reports',
      'Barcode support',
      'On-site installation and training',
    ],
  },
  {
    id: 'inventory-system-maintenance',
    name: 'Inventory System Maintenance',
    description: 'Monthly support and updates for your inventory system.',
    startingPrice: 1500,
    maxPrice: 2500,
    frequency: 'monthly',
    division: 'digital',
    category: 'Software Systems',
    featured: false,
    includes: [
      'System updates',
      'Remote support',
      'Data backup',
      'Bug fixes',
    ],
  },
  {
    id: 'domain-hosting',
    name: 'Domain + Hosting Management',
    description: 'We handle your domain registration, DNS, and hosting so you don\'t have to.',
    startingPrice: 1200,
    maxPrice: null,
    frequency: 'monthly',
    division: 'digital',
    category: 'Web Services',
    featured: false,
    includes: [
      'Domain registration/renewal',
      'Hosting setup and management',
      'SSL certificate',
      'Email setup',
    ],
  },
  {
    id: 'seo-online-presence',
    name: 'SEO + Online Presence',
    description: 'Get found on Google. Local SEO, Google Business Profile, and more.',
    startingPrice: 3000,
    maxPrice: null,
    frequency: 'monthly',
    division: 'digital',
    category: 'Web Services',
    featured: false,
    includes: [
      'Google Business Profile setup/optimization',
      'Local SEO',
      'Monthly performance report',
      'Keyword monitoring',
    ],
  },
  {
    id: 'event-planning',
    name: 'Event Planning',
    description: 'Full-service event coordination — from concept to flawless execution.',
    startingPrice: null,
    maxPrice: null,
    frequency: 'custom',
    division: 'celebrations',
    category: 'Events',
    featured: true,
    includes: [
      'Initial consultation',
      'Venue coordination',
      'Vendor management',
      'Day-of coordination',
      'Timeline management',
    ],
  },
  {
    id: 'wedding-planning',
    name: 'Wedding Planning',
    description: 'Your dream wedding, thoughtfully planned and beautifully executed.',
    startingPrice: null,
    maxPrice: null,
    frequency: 'custom',
    division: 'celebrations',
    category: 'Weddings',
    featured: true,
    includes: [
      'Engagement consultation',
      'Full wedding coordination',
      'Supplier sourcing and management',
      'Ceremony and reception design',
      'Day-of team',
    ],
  },
  {
    id: 'souvenir-printing',
    name: 'Souvenir & Invitation Printing',
    description: 'Custom invitations, giveaways, and keepsakes that guests remember.',
    startingPrice: null,
    maxPrice: null,
    frequency: 'custom',
    division: 'celebrations',
    category: 'Print & Design',
    featured: true,
    includes: [
      'Custom design',
      'Professional printing',
      'Packaging',
    ],
  },
];

export function formatPrice(product: Product): string {
  if (product.frequency === 'custom' || product.startingPrice === null) {
    return 'Custom Quote';
  }
  return `Starting at PHP ${product.startingPrice.toLocaleString()}`;
}

export function getProductsByDivision(division: 'digital' | 'celebrations') {
  return products.filter((p) => p.division === division);
}

export function getFeaturedProducts(division?: 'digital' | 'celebrations') {
  return products.filter((p) => p.featured && (!division || p.division === division));
}
