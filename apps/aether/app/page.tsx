import { Button } from '../components/Button';
import { AetherLogo } from '../components/AetherLogo';
import { DivisionCard } from '../components/DivisionCard';
import { ScrollReveal, StaggerReveal, StaggerItem } from '../components/animated/ScrollReveal';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';

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
        style={{ background: '#ffffff' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,20,147,0.05) 0%, transparent 70%)',
          }}
        />
        <StaggerReveal className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
          <StaggerItem>
            <AetherLogo size="lg" variant="icon" className="animate-float" />
          </StaggerItem>
          <StaggerItem className="flex flex-col gap-4">
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight gradient-text"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}
            >
              Aether.
            </h1>
            <p className="text-lg md:text-xl tracking-[0.25em] uppercase" style={{ color: '#aaaaaa' }}>
              <TextGenerateEffect text="The Essence of Possibility" wordDelay={70} />
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-base md:text-lg max-w-xl" style={{ color: '#666666', lineHeight: '1.75', letterSpacing: '0.01em' }}>
              We build the digital systems that power your business — and the celebrations that mark
              your milestones. One company. Infinite possibilities.
            </p>
          </StaggerItem>
          <StaggerItem className="flex flex-col sm:flex-row gap-4">
            <Button href="/digital" size="lg">
              Explore Digital →
            </Button>
            <Button href="/celebrations" variant="outline" size="lg">
              Explore Celebrations
            </Button>
          </StaggerItem>
        </StaggerReveal>
      </section>

      <ScrollReveal>
        <div
          className="h-px max-w-6xl mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, #e0d7f0, transparent)' }}
        />
      </ScrollReveal>

      {/* Two divisions */}
      <section className="py-24 px-6" style={{ background: '#f8f5ff' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <span className="text-eyebrow text-center mb-16">Our Divisions</span>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerItem>
              <DivisionCard
                href="/digital"
                icon="⌗"
                iconColor="rgba(255,20,147,0.08)"
                iconBorder="rgba(255,20,147,0.2)"
                hoverBorder="rgba(255,20,147,0.3)"
                hoverBg="#fff8fc"
                title="Aether Digital"
                description="Websites, software systems, and digital infrastructure built for Philippine businesses that want to scale."
                tags={['Websites', 'POS Systems', 'Inventory', 'SEO']}
                tagColor="#ff4081"
                tagBg="rgba(255,20,147,0.06)"
                tagBorder="rgba(255,20,147,0.15)"
                ctaColor="#ff1493"
                ctaLabel="Explore Digital"
                spotlightColor="rgba(255, 20, 147, 0.06)"
              />
            </StaggerItem>
            <StaggerItem>
              <DivisionCard
                href="/celebrations"
                icon="✦"
                iconColor="rgba(106,76,147,0.08)"
                iconBorder="rgba(106,76,147,0.2)"
                hoverBorder="rgba(106,76,147,0.35)"
                hoverBg="#faf7ff"
                title="Aether Celebrations"
                description="Weddings, events, and souvenirs crafted with love. Every moment deserves to be remembered perfectly."
                tags={['Weddings', 'Events', 'Venues', 'Souvenirs']}
                tagColor="#6a4c93"
                tagBg="rgba(106,76,147,0.06)"
                tagBorder="rgba(106,76,147,0.2)"
                ctaColor="#6a4c93"
                ctaLabel="Explore Celebrations"
                spotlightColor="rgba(106, 76, 147, 0.06)"
              />
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6" style={{ background: '#ffffff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <StaggerReveal className="flex flex-col gap-8">
            <StaggerItem>
              <span className="text-eyebrow text-center">Our Story</span>
            </StaggerItem>
            <StaggerItem>
              <h2
                className="text-3xl md:text-4xl font-semibold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a', lineHeight: '1.35', letterSpacing: '-0.01em' }}
              >
                <TextGenerateEffect
                  text="Built by two people who believe every business — and every memory — deserves to be extraordinary."
                  wordDelay={55}
                />
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-base" style={{ color: '#666666', lineHeight: '1.75', letterSpacing: '0.01em' }}>
                Jayson leads Aether Digital, building the software and web systems that help Philippine
                businesses grow. Remlyn leads Aether Celebrations, crafting the events and moments that
                families treasure forever. Together, we are Aether.
              </p>
            </StaggerItem>
            <StaggerItem>
              <Button href="/about" variant="outline">
                Meet the Founders
              </Button>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ background: '#f8f5ff' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <span className="text-eyebrow text-center mb-16">What Our Clients Say</span>
          </ScrollReveal>
          <StaggerReveal slow className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div
                  className="p-8 rounded-lg flex flex-col gap-6"
                  style={{ background: '#ffffff', border: '1px solid #e8e0f5' }}
                >
                  <div
                    className="text-4xl"
                    style={{ color: t.division === 'digital' ? '#ff1493' : '#6a4c93', lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    &ldquo;
                  </div>
                  <p
                    className="text-base italic"
                    style={{ color: '#444444', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: '1.75', letterSpacing: '0.01em' }}
                  >
                    {t.quote}
                  </p>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1a1a1a', letterSpacing: '0.02em' }}>{t.author}</p>
                    <p className="text-xs mt-1" style={{ color: '#888888', letterSpacing: '0.05em' }}>{t.title}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#ffffff' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(106,76,147,0.04) 0%, transparent 70%)',
          }}
        />
        <StaggerReveal className="relative z-10 max-w-2xl mx-auto text-center flex flex-col gap-6">
          <StaggerItem>
            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a', lineHeight: '1.25', letterSpacing: '-0.01em' }}
            >
              Ready to begin?
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-base" style={{ color: '#666666', lineHeight: '1.75', letterSpacing: '0.01em' }}>
              Whether you need a website, a software system, or a wedding that leaves everyone
              breathless — we are here.
            </p>
          </StaggerItem>
          <StaggerItem className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">Get in Touch</Button>
            <Button href="/about" variant="outline" size="lg">Our Story</Button>
          </StaggerItem>
        </StaggerReveal>
      </section>
    </>
  );
}
