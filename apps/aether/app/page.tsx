import Link from 'next/link';
import { Button } from '../components/Button';
import { AetherLogo } from '../components/AetherLogo';
import { DivisionCard } from '../components/DivisionCard';

const testimonials = [
  {
    quote:
      'Aether Digital built our law firm website with professionalism and speed. Our online presence transformed overnight.',
    author: 'Atty. Rimando',
    title: 'Rimando Law Office, Bacoor Cavite',
    division: 'digital',
  },
  {
    quote:
      'The attention to detail was extraordinary. Every element of our event was handled with grace and precision.',
    author: 'Happy Client',
    title: 'Event Client, Dasmarinas Cavite',
    division: 'celebrations',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,20,147,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8 animate-fade-in-up">
          <AetherLogo size="lg" variant="icon" className="animate-float" />
          <div className="flex flex-col gap-4">
            <h1
              className="text-5xl md:text-7xl font-medium leading-tight gradient-text"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Aether.
            </h1>
            <p className="text-lg md:text-xl tracking-[0.25em] uppercase" style={{ color: '#666666' }}>
              The Essence of Possibility
            </p>
          </div>
          <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: '#999999' }}>
            We build the digital systems that power your business — and the celebrations that mark
            your milestones. One company. Infinite possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="http://localhost:3001" size="lg">
              Explore Digital →
            </Button>
            <Button href="http://localhost:3002" variant="outline" size="lg">
              Explore Celebrations
            </Button>
          </div>
        </div>
      </section>

      <div
        className="h-px max-w-6xl mx-auto"
        style={{ background: 'linear-gradient(90deg, transparent, #1e1e1e, transparent)' }}
      />

      {/* Two divisions */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase mb-16" style={{ color: '#666666' }}>
            Our Divisions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DivisionCard
              href="http://localhost:3001"
              icon="⌗"
              iconColor="rgba(255,20,147,0.1)"
              iconBorder="rgba(255,20,147,0.2)"
              hoverBorder="rgba(255,20,147,0.3)"
              hoverBg="#131313"
              title="Aether Digital"
              description="Websites, software systems, and digital infrastructure built for Philippine businesses that want to scale."
              tags={['Websites', 'POS Systems', 'Inventory', 'SEO']}
              tagColor="#ff4081"
              tagBg="rgba(255,20,147,0.08)"
              tagBorder="rgba(255,20,147,0.15)"
              ctaColor="#ff1493"
              ctaLabel="Explore Digital"
            />
            <DivisionCard
              href="http://localhost:3002"
              icon="✦"
              iconColor="rgba(106,76,147,0.1)"
              iconBorder="rgba(106,76,147,0.2)"
              hoverBorder="rgba(106,76,147,0.4)"
              hoverBg="#131313"
              title="Aether Celebrations"
              description="Weddings, events, and souvenirs crafted with love. Every moment deserves to be remembered perfectly."
              tags={['Weddings', 'Events', 'Venues', 'Souvenirs']}
              tagColor="#a07cc8"
              tagBg="rgba(106,76,147,0.08)"
              tagBorder="rgba(106,76,147,0.2)"
              ctaColor="#6a4c93"
              ctaLabel="Explore Celebrations"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>
            Our Story
          </p>
          <h2
            className="text-3xl md:text-4xl font-medium leading-relaxed"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
          >
            Built by two people who believe every business — and every memory — deserves to be
            extraordinary.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
            Jayson leads Aether Digital, building the software and web systems that help Philippine
            businesses grow. Remlyn leads Aether Celebrations, crafting the events and moments that
            families treasure forever. Together, we are Aether.
          </p>
          <div>
            <Button href="/about" variant="outline">
              Meet the Founders
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase mb-16" style={{ color: '#666666' }}>
            What Our Clients Say
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-lg flex flex-col gap-6"
                style={{ background: '#111111', border: '1px solid #1e1e1e' }}
              >
                <div
                  className="text-3xl"
                  style={{ color: t.division === 'digital' ? '#ff1493' : '#6a4c93', lineHeight: 1 }}
                >
                  "
                </div>
                <p
                  className="text-base leading-relaxed italic"
                  style={{ color: '#cccccc', fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {t.quote}
                </p>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{t.author}</p>
                  <p className="text-xs mt-1" style={{ color: '#666666' }}>{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#080808' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(106,76,147,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2
            className="text-3xl md:text-4xl font-medium"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
          >
            Ready to begin?
          </h2>
          <p className="text-base" style={{ color: '#666666' }}>
            Whether you need a website, a software system, or a wedding that leaves everyone
            breathless — we are here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">Get in Touch</Button>
            <Button href="/about" variant="outline" size="lg">Our Story</Button>
          </div>
        </div>
      </section>
    </>
  );
}

