import React from 'react';
import { useNavigate } from 'react-router-dom';

const TEAM = [
  { name: 'K Vedavyas Vishal', role: 'Web Developer', emoji: '👨‍💼' },
];

const VALUES = [
  { icon: '🌍', title: 'Authentic Experiences', desc: 'We curate genuine, off-the-beaten-path adventures beyond tourist traps.' },
  { icon: '💚', title: 'Sustainable Travel', desc: 'Committed to eco-friendly practices and supporting local communities.' },
  { icon: '🛡️', title: 'Safety First', desc: '24/7 support and comprehensive travel insurance for peace of mind.' },
  { icon: '✨', title: 'Premium Quality', desc: 'Every detail is carefully crafted for an exceptional travel experience.' },
];

const STATS = [
  { value: '10,000+', label: 'Happy Travelers', icon: '😊' },
  { value: '120+', label: 'Destinations', icon: '📍' },
  { value: '8+', label: 'Years Experience', icon: '🏆' },
  { value: '4.9★', label: 'Average Rating', icon: '⭐' },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>

      <section style={{
        paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24,
        background: 'linear-gradient(135deg, #071a2e 0%, #07406e 60%, #1a7fc1 100%)',
        textAlign: 'center', color: 'white',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 64, marginBottom: 20, animation: 'float 3s ease-in-out infinite' }}>🌍</div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, margin: '0 0 16px',
            fontFamily: "'Playfair Display', serif",
          }}>About GlobeTrekker</h1>
          <p style={{ fontSize: 18, opacity: 0.85, lineHeight: 1.8, maxWidth: 620, margin: '0 auto' }}>
            We're not just a travel company — we're your gateway to transformative adventures that
            shape who you are and expand how you see the world.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 24px', background: 'var(--bg-card)' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
        }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              textAlign: 'center', padding: 24,
              background: 'var(--bg)', borderRadius: 16,
              boxShadow: 'var(--shadow)',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--primary)' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-block', background: 'rgba(7,64,110,0.1)',
              color: 'var(--primary)', padding: '6px 16px', borderRadius: 50,
              fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 16,
            }}>OUR MISSION</div>
            <h2 style={{ color: 'var(--primary)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.3 }}>
              Making World-Class Travel Accessible to Everyone
            </h2>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
              Founded in 2017, GlobeTrekker was born from a simple belief: that travel should be transformative,
              not transactional. We've helped over 10,000 travelers discover destinations that changed their lives.
            </p>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.9, fontSize: 15 }}>
              From the snow-capped peaks of Switzerland to the turquoise waters of the Maldives, we craft
              experiences that go beyond sightseeing — we help you live the destination.
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
            borderRadius: 24, padding: 40, color: 'white',
            boxShadow: '0 20px 60px rgba(7,64,110,0.3)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✈️</div>
            <h3 style={{ margin: '0 0 16px', fontSize: 20 }}>Why Choose GlobeTrekker?</h3>
            {[
              'AI-powered personalized itineraries',
              'Best price guarantee — always',
              '24/7 dedicated travel support',
              'Fully customizable packages',
              'Vetted local guides at every stop',
              'Carbon-offset travel options',
            ].map(point => (
              <div key={point} style={{ display: 'flex', gap: 10, marginBottom: 12, fontSize: 14 }}>
                <span style={{ color: '#f9d342', flexShrink: 0 }}>✓</span>
                <span style={{ opacity: 0.9 }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-heading">
            <h2>Our Core Values</h2>
            <p>The principles that guide every journey we create</p>
            <div className="underline" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{
                background: 'var(--bg)', borderRadius: 20, padding: 28,
                boxShadow: 'var(--shadow)', border: '2px solid var(--border)',
                transition: 'all 0.2s',
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--primary-light)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ fontSize: 40, marginBottom: 14 }}>{v.icon}</div>
                <h3 style={{ color: 'var(--primary)', fontSize: 17, fontWeight: 700, margin: '0 0 10px' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-heading">
            <h2>Meet Our Team</h2>
            <p>Passionate travelers dedicated to crafting your perfect journey</p>
            <div className="underline" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
            {TEAM.map(member => (
              <div key={member.name} style={{
                background: 'var(--bg-card)', borderRadius: 20, padding: 28,
                boxShadow: 'var(--shadow)', textAlign: 'center',
                transition: 'all 0.2s',
              }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36,
                }}>{member.emoji}</div>
                <h3 style={{ color: 'var(--primary)', fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{member.name}</h3>
                <div style={{ color: 'var(--accent2)', fontSize: 12, fontWeight: 600, marginBottom: 10 }}>{member.role}</div>
                <p style={{ color: 'var(--text-light)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: '80px 24px', textAlign: 'center',
        background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
        color: 'white',
      }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, margin: '0 0 16px', fontFamily: "'Playfair Display', serif" }}>
          Ready to Start Your Adventure?
        </h2>
        <p style={{ opacity: 0.85, fontSize: 16, marginBottom: 32 }}>
          Join 10,000+ travelers who've already discovered the world with GlobeTrekker.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '14px 36px',
              background: '#f9d342',
              color: '#07406e',
              border: 'none',
              borderRadius: 50,
              fontWeight: 800,
              fontSize: 16,
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            🚀 Book a Trip
          </button>
          <button
            onClick={() => navigate('/contact')}
            style={{
              padding: '14px 36px',
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.6)',
              color: 'white',
              borderRadius: 50,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            📞 Contact Us
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section > div { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          section:nth-child(2) > div { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
