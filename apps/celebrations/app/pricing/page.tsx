import type { Metadata } from 'next';
import { Button } from '../../components/Button';
import { getProductsByDivision, formatPrice } from '@aether/config/products';

export const metadata: Metadata = {
  title: 'Pricing — Aether Celebrations',
  description: 'Custom wedding, event, and souvenir pricing. Every package is tailored to your needs.',
};

const faqs = [
  { q: 'Can we customize a package?', a: 'Absolutely. Every client gets a bespoke proposal. Our packages are starting frameworks, not rigid structures.' },
  { q: 'Do you require a down payment?', a: 'Yes. We require a reservation fee to secure your date. The amount depends on the package size.' },
  { q: 'Do you travel outside Cavite?', a: 'Yes. We serve all of the Philippines. Travel costs are quoted separately for events outside Cavite.' },
  { q: 'How early should we book?', a: 'For weddings, 3–6 months in advance is ideal. For smaller events, 4–8 weeks is usually sufficient.' },
  { q: 'What if we want to add services later?', a: 'No problem. We can add or adjust services up to 2 weeks before your event, subject to availability.' },
];

export default function PricingPage() {
  const products = getProductsByDivision('celebrations');

  return (
    <>
      <section className="py-32 px-6 relative" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(106,76,147,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>Pricing</p>
          <h1 className="text-4xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Every event is unique. Every price is custom.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#999999' }}>
            We don't believe in one-size-fits-all. Book a free consultation and we'll build a package just for you.
          </p>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="p-8 rounded-lg flex flex-col gap-5" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: '#6a4c93' }}>{p.category}</p>
                  <h3 className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{p.name}</h3>
                </div>
                <p className="text-2xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{formatPrice(p)}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{p.description}</p>
                <ul className="flex flex-col gap-2">
                  {p.includes.map((item) => (
                    <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                      <span style={{ color: '#6a4c93' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Button href="/contact" size="sm" className="mt-auto">Get a Quote →</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-12 text-center" style={{ color: '#666666' }}>Common Questions</p>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <p className="text-sm font-medium mb-3" style={{ color: '#f5f5f0' }}>{faq.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Ready to start planning?
          </h2>
          <p className="text-sm" style={{ color: '#666666' }}>A 30-minute consultation with Remlyn is free and comes with no obligation.</p>
          <Button href="/contact" size="lg">Book a Free Consultation →</Button>
        </div>
      </section>
    </>
  );
}
