import React, { useState } from 'react';
import { API_BASE_URL } from '../utils/api';
import { useApp } from '../context/AppContext';

const CONTACT_INFO = [
  { icon: '📞', title: 'Phone Number', detail: '+91 9492341543' },
  { icon: '📧', title: 'Email Address', detail: 'vedavyaskv05@gmail.com' },
  { icon: 'git', title: 'Github Profile', detail: 'https://github.com/vedavyaskv' },
];

const FAQ_QUICK = [
  { q: 'How do I book a trip?', a: 'Browse our destinations, pick a package, and fill out the registration form. Our team confirms within 24 hours.' },
  { q: 'Can I customize my itinerary?', a: 'Absolutely! All our packages are fully customizable. Just mention your preferences in the Special Requests field.' },
  { q: 'What is your cancellation policy?', a: 'Full refund up to 30 days before travel. 50% refund 15–30 days before. No refund within 15 days.' },
];

export default function Contact() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      let data = {};

      try {
          data = await res.json();
      } catch {
          data = {};
      }
      if (res.ok) {
        setSent(true);
        showToast('✅ Message sent! We\'ll reply within 24 hours.', 'success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        showToast(data.error || 'Failed to send. Please try again.', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    }
    finally {
    setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>

      <section style={{
        paddingTop: 120, paddingBottom: 60, paddingLeft: 24, paddingRight: 24,
        background: 'linear-gradient(135deg, #071a2e 0%, #07406e 60%, #1a7fc1 100%)',
        textAlign: 'center', color: 'white',
      }}>
        <div style={{ fontSize: 56, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>📬</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 12px', fontFamily: "'Playfair Display', serif" }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 500, margin: '0 auto' }}>
          Have a question about a trip? Ready to plan your adventure? Our travel experts are here to help!
        </p>
      </section>

      <section style={{ padding: '60px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>

          <div>
            <h2 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>Contact Information</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: 28, fontSize: 14 }}>
              Reach out through any of the channels below. We typically respond within 2–4 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {CONTACT_INFO.map(item => (
                <div key={item.title} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  background: 'var(--bg-card)', borderRadius: 14, padding: '16px 18px',
                  boxShadow: 'var(--shadow)', border: '1px solid var(--border)',
                  transition: 'transform 0.2s',
                }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'none'}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ color: 'var(--primary)', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Quick Answers</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FAQ_QUICK.map((item, i) => (
                <details key={i} style={{
                  background: 'var(--bg-card)', borderRadius: 12, padding: '12px 16px',
                  border: '1px solid var(--border)', cursor: 'pointer',
                }}>
                  <summary style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {item.q} <span style={{ color: 'var(--primary)', marginLeft: 8 }}>+</span>
                  </summary>
                  <p style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6 }}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', borderRadius: 24, padding: '36px', boxShadow: 'var(--shadow)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h2 style={{ color: 'var(--primary)', margin: '0 0 12px' }}>Message Sent!</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: 24 }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} style={{
                  padding: '12px 28px', background: 'var(--gradient)',
                  border: 'none', borderRadius: 50, color: 'white',
                  fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                }}>Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 800, margin: '0 0 6px' }}>Send Us a Message</h2>
                <p style={{ color: 'var(--text-light)', fontSize: 14, marginBottom: 24 }}>
                  Our team of travel experts will respond within 24 hours.
                </p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Full Name *</label>
                      <input name="name" className="input-field" placeholder="Your name" value={form.name} onChange={handleChange} required style={{ display: 'block' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Email *</label>
                      <input name="email" type="email" className="input-field" placeholder="your@email.com" value={form.email} onChange={handleChange} required style={{ display: 'block' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Subject *</label>
                    <select name="subject" className="input-field" value={form.subject} onChange={handleChange} required style={{ display: 'block', cursor: 'pointer' }}>
                      <option value="">Select a subject</option>
                      <option>Trip Planning Help</option>
                      <option>Booking Inquiry</option>
                      <option>Package Customization</option>
                      <option>Cancellation / Refund</option>
                      <option>Technical Support</option>
                      <option>Partnership / Business</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Message *</label>
                    <textarea
                      name="message" className="input-field" rows={5}
                      placeholder="Tell us about your travel plans, questions, or concerns..."
                      value={form.message} onChange={handleChange} required
                      style={{ display: 'block', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" disabled={loading} style={{
                    padding: '14px', background: loading ? 'var(--border)' : 'var(--gradient)',
                    border: 'none', borderRadius: 50, color: 'white', fontWeight: 700,
                    fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: "'Poppins', sans-serif", boxShadow: '0 4px 16px rgba(7,64,110,0.3)',
                  }}>
                    {loading ? '⏳ Sending...' : '📨 Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
