import type { Metadata } from 'next';
import { Button } from '../../components/Button';

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
      <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,20,147,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>
            Our Story
          </p>
          <h1
            className="text-4xl md:text-5xl font-medium leading-tight gradient-text"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Who is Aether?
          </h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#999999' }}>
            Aether is named for the ancient concept of the fifth element — the invisible force that
            fills the universe, connects all things, and makes the infinite feel tangible. We believe
            that is what great technology and beautiful experiences do: they connect people to what
            matters most.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase mb-16" style={{ color: '#666666' }}>
            The Founders
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Jayson */}
            <div
              className="p-10 rounded-lg flex flex-col gap-6"
              style={{ background: '#111111', border: '1px solid #1e1e1e' }}
            >
              <div className="flex flex-col gap-1">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4"
                  style={{ background: 'rgba(255,20,147,0.08)', border: '1px solid rgba(255,20,147,0.15)' }}
                >
                  ⌗
                </div>
                <h2
                  className="text-2xl font-medium"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
                >
                  Jayson Salinas
                </h2>
                <p className="text-sm tracking-wide" style={{ color: '#ff4081' }}>
                  Founder, Aether Digital
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                Jayson builds the systems that make businesses run smoothly. With deep expertise in
                web development, software systems, and digital infrastructure, he has helped
                Philippine businesses move from manual processes to elegant digital operations.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                His vision for Aether Digital is simple: every Philippine business, no matter how
                small, deserves professional, reliable, and beautiful digital tools.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Web Development', 'POS Systems', 'Software Architecture', 'SEO'].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,20,147,0.08)', color: '#ff4081', border: '1px solid rgba(255,20,147,0.15)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Remlyn */}
            <div
              className="p-10 rounded-lg flex flex-col gap-6"
              style={{ background: '#111111', border: '1px solid #1e1e1e' }}
            >
              <div className="flex flex-col gap-1">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4"
                  style={{ background: 'rgba(106,76,147,0.08)', border: '1px solid rgba(106,76,147,0.15)' }}
                >
                  ✦
                </div>
                <h2
                  className="text-2xl font-medium"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
                >
                  Remlyn Salinas
                </h2>
                <p className="text-sm tracking-wide" style={{ color: '#a07cc8' }}>
                  Founder, Aether Celebrations
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                Remlyn transforms ordinary moments into extraordinary memories. With a gift for
                design, logistics, and human connection, she leads Aether Celebrations — bringing
                weddings, events, and curated souvenirs to life across Cavite and beyond.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                Her philosophy: every detail matters. Every flower, every timeline, every souvenir
                box should feel intentional and beautiful.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Wedding Planning', 'Event Coordination', 'Design', 'Client Relations'].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(106,76,147,0.08)', color: '#a07cc8', border: '1px solid rgba(106,76,147,0.15)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>
            Philosophy
          </p>
          <h2
            className="text-3xl md:text-4xl font-medium leading-relaxed"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
          >
            Why "Aether"?
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
            In ancient philosophy, Aether was the fifth element — pure, radiant, and infinite. It
            connected the heavens to the earth, the seen to the unseen. We chose this name because
            we believe technology and human experience share the same invisible thread: both, when
            done right, feel like magic.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
            Digital and Celebrations may seem like two separate worlds. But at Aether, they are one:
            both require precision, both require creativity, and both serve the same human need — to
            connect, to grow, and to feel that something extraordinary is possible.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase mb-16" style={{ color: '#666666' }}>
            Our Values
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-8 rounded-lg flex flex-col gap-4"
                style={{ background: '#111111', border: '1px solid #1e1e1e' }}
              >
                <span className="text-2xl gradient-text">{v.icon}</span>
                <h3
                  className="text-lg font-medium"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2
            className="text-3xl font-medium"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}
          >
            Let's build something together.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">Get in Touch</Button>
            <Button href="http://localhost:3001" variant="outline" size="lg">Explore Digital</Button>
          </div>
        </div>
      </section>
    </>
  );
}
