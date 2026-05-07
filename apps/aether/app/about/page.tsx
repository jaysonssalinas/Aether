import type { Metadata } from 'next';
import { Button } from '../../components/Button';
import { ScrollReveal, StaggerReveal, StaggerItem } from '../../components/animated/ScrollReveal';
import { TextGenerateEffect } from '../../components/ui/TextGenerateEffect';

export const metadata: Metadata = {
  title: 'About — Aether',
  description: 'Meet Jayson and Remlyn, the founders of Aether. Our story, our philosophy, our values.',
};

const values = [
  {
    icon: '◈',
    title: 'Innovation',
    description: 'We embrace new technology with discipline, using it to solve real problems for real people.',
  },
  {
    icon: '◇',
    title: 'Excellence',
    description: 'Good enough is never enough. We hold ourselves and our work to the highest standard.',
  },
  {
    icon: '◉',
    title: 'Trust',
    description: 'We are honest about what we can do, transparent about how we do it, and consistent in delivery.',
  },
  {
    icon: '✦',
    title: 'Magic',
    description: 'We believe that extraordinary outcomes start with imagination — and then precise execution.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#ffffff' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,20,147,0.04) 0%, transparent 70%)',
          }}
        />
        <StaggerReveal className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <StaggerItem>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#aaaaaa' }}>
              Our Story
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1
              className="text-4xl md:text-5xl font-medium leading-tight gradient-text"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <TextGenerateEffect text="Who is Aether?" wordDelay={80} />
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#666666' }}>
              Aether is named for the ancient concept of the fifth element — the invisible force that
              fills the universe, connects all things, and makes the infinite feel tangible. We believe
              that is what great technology and beautiful experiences do: they connect people to what
              matters most.
            </p>
          </StaggerItem>
        </StaggerReveal>
      </section>

      {/* Founders */}
      <section className="py-24 px-6" style={{ background: '#f8f5ff' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-center text-xs tracking-[0.3em] uppercase mb-16" style={{ color: '#aaaaaa' }}>
              The Founders
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Jayson */}
            <StaggerItem hoverLift>
              <div
                className="p-10 rounded-lg flex flex-col gap-6"
                style={{ background: '#ffffff', border: '1px solid #e8e0f5' }}
              >
                <div className="flex flex-col gap-1">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4"
                    style={{ background: 'rgba(255,20,147,0.06)', border: '1px solid rgba(255,20,147,0.15)' }}
                  >
                    ⌗
                  </div>
                  <h2
                    className="text-2xl font-medium"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a' }}
                  >
                    Jayson Salinas
                  </h2>
                  <p className="text-sm tracking-wide" style={{ color: '#ff4081' }}>
                    Founder, Aether Digital
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>
                  Jayson builds the systems that make businesses run smoothly. With deep expertise in
                  web development, software systems, and digital infrastructure, he has helped
                  Philippine businesses move from manual processes to elegant digital operations.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>
                  His vision for Aether Digital is simple: every Philippine business, no matter how
                  small, deserves professional, reliable, and beautiful digital tools.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Web Development', 'POS Systems', 'Software Architecture', 'SEO'].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,20,147,0.06)', color: '#ff4081', border: '1px solid rgba(255,20,147,0.15)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Remlyn */}
            <StaggerItem hoverLift>
              <div
                className="p-10 rounded-lg flex flex-col gap-6"
                style={{ background: '#ffffff', border: '1px solid #e8e0f5' }}
              >
                <div className="flex flex-col gap-1">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4"
                    style={{ background: 'rgba(106,76,147,0.06)', border: '1px solid rgba(106,76,147,0.15)' }}
                  >
                    ✦
                  </div>
                  <h2
                    className="text-2xl font-medium"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a' }}
                  >
                    Remlyn Salinas
                  </h2>
                  <p className="text-sm tracking-wide" style={{ color: '#a07cc8' }}>
                    Founder, Aether Celebrations
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>
                  Remlyn transforms ordinary moments into extraordinary memories. With a gift for
                  design, logistics, and human connection, she leads Aether Celebrations — bringing
                  weddings, events, and curated souvenirs to life across Cavite and beyond.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>
                  Her philosophy: every detail matters. Every flower, every timeline, every souvenir
                  box should feel intentional and beautiful.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Wedding Planning', 'Event Coordination', 'Design', 'Client Relations'].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: 'rgba(106,76,147,0.06)', color: '#a07cc8', border: '1px solid rgba(106,76,147,0.15)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6" style={{ background: '#ffffff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <StaggerReveal className="flex flex-col gap-8">
            <StaggerItem>
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#aaaaaa' }}>
                Philosophy
              </p>
            </StaggerItem>
            <StaggerItem>
              <h2
                className="text-3xl md:text-4xl font-medium leading-relaxed"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a' }}
              >
                Why &ldquo;Aether&rdquo;?
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                In ancient philosophy, Aether was the fifth element — pure, radiant, and infinite. It
                connected the heavens to the earth, the seen to the unseen. We chose this name because
                we believe technology and human experience share the same invisible thread: both, when
                done right, feel like magic.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                Digital and Celebrations may seem like two separate worlds. But at Aether, they are one:
                both require precision, both require creativity, and both serve the same human need — to
                connect, to grow, and to feel that something extraordinary is possible.
              </p>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6" style={{ background: '#f8f5ff' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-center text-xs tracking-[0.3em] uppercase mb-16" style={{ color: '#aaaaaa' }}>
              Our Values
            </p>
          </ScrollReveal>
          <StaggerReveal slow className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title} hoverLift>
                <div
                  className="p-8 rounded-lg flex flex-col gap-4"
                  style={{ background: '#ffffff', border: '1px solid #e8e0f5' }}
                >
                  <span className="text-2xl gradient-text">{v.icon}</span>
                  <h3
                    className="text-lg font-medium"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a' }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                    {v.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ background: '#ffffff' }}>
        <StaggerReveal className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <StaggerItem>
            <h2
              className="text-3xl font-medium"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a' }}
            >
              Let&rsquo;s build something together.
            </h2>
          </StaggerItem>
          <StaggerItem className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">Get in Touch</Button>
            <Button href="/digital" variant="outline" size="lg">Explore Digital</Button>
          </StaggerItem>
        </StaggerReveal>
      </section>
    </>
  );
}
