import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ_DATA = {
  'Booking & Payments': [
    { q: 'How do I book a tour package?', a: 'Browse our destinations, select a package that suits your budget, then click "Book Now". Fill in the registration form with your details, travel date, and number of travelers. Our team will confirm your booking within 24 hours.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards (Visa, MasterCard, RuPay), UPI (GPay, PhonePe, Paytm), net banking, and EMI options through leading banks. International cards are also accepted.' },
    { q: 'Is there an EMI option available?', a: 'Yes! We offer 0% EMI for 3 and 6 months on bookings above ₹25,000 through HDFC, ICICI, Axis, and SBI credit cards.' },
    { q: 'When will my booking be confirmed?', a: 'Bookings are confirmed within 24 hours via email. For peak season travel (Dec–Jan, May–Jun), we recommend booking at least 60 days in advance.' },
    { q: 'Can I book for a group?', a: 'Absolutely! We specialize in group travel. Groups of 10+ travelers receive special discounts. Contact us directly at groups@globetrekker.in for a custom quote.' },
  ],
  'Cancellation & Refunds': [
    { q: 'What is your cancellation policy?', a: 'Cancellations 30+ days before travel: Full refund. 15–29 days before: 50% refund. Less than 15 days: No refund. Cancellations due to medical emergencies (with documentation) are handled on a case-by-case basis.' },
    { q: 'How long does a refund take?', a: 'Refunds are processed within 7–10 business days to your original payment method. UPI refunds are typically faster (2–4 days).' },
    { q: 'Can I reschedule my trip instead of cancelling?', a: 'Yes! You can reschedule up to 15 days before your travel date at no extra charge (subject to availability). Rescheduling within 15 days may incur a rescheduling fee of ₹2,000–₹5,000.' },
  ],
  'Itinerary & Customization': [
    { q: 'Can I customize my itinerary?', a: 'Yes! All our packages are fully customizable. You can add extra nights, change hotels, include additional activities, or remove any inclusions. Just contact our travel consultants with your preferences.' },
    { q: 'Do you offer solo travel packages?', a: 'We specialize in solo travel! All packages are available for solo travelers. We also organize group tours for solo travelers to meet like-minded adventurers.' },
    { q: 'Is the itinerary fixed or flexible?', a: 'Day-wise itineraries are planned but flexible. You can swap activities, take leisure days, or add spontaneous stops. Your tour manager on-ground will accommodate reasonable changes.' },
  ],
  'Visa & Documents': [
    { q: 'Do you help with visa applications?', a: 'Yes! We provide comprehensive visa assistance for all international destinations we operate in. Our visa team prepares documents, schedules appointments, and guides you through the entire process.' },
    { q: 'What documents are required for international travel?', a: 'Typically: Valid passport (6+ months validity), visa (we help arrange), travel insurance, flight tickets, and hotel confirmations. Specific requirements vary by country — we provide a personalized checklist for your destination.' },
    { q: 'Do you offer travel insurance?', a: 'We strongly recommend and offer comprehensive travel insurance covering medical emergencies, trip cancellation, lost luggage, and flight delays. Insurance is available as an add-on starting from ₹999.' },
  ],
  'On-Trip Support': [
    { q: 'What support is available during my trip?', a: '24/7 emergency support via WhatsApp and phone. Globetrotter and Explorer package travelers get a dedicated tour manager. All travelers receive local guide assistance and hotel support numbers.' },
    { q: 'What if something goes wrong during my trip?', a: 'Our 24/7 emergency helpline (+91 98765 43210) is always available. We coordinate with local partners, embassies, and hospitals if needed. Travel insurance covers most emergencies.' },
    { q: 'Are airport transfers included?', a: 'Shared transfers are included in Voyager and Discoverer packages. Private airport transfers are included in Explorer and Globetrotter packages.' },
  ],
};

const CATEGORIES = Object.keys(FAQ_DATA);

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [openIdx, setOpenIdx] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const currentFAQs = search.trim()
    ? Object.values(FAQ_DATA).flat().filter(
        item => item.q.toLowerCase().includes(search.toLowerCase()) ||
                item.a.toLowerCase().includes(search.toLowerCase())
      )
    : FAQ_DATA[activeCategory] || [];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        paddingTop: 120, paddingBottom: 60, paddingLeft: 24, paddingRight: 24,
        background: 'linear-gradient(135deg, #071a2e 0%, #07406e 60%, #1a7fc1 100%)',
        textAlign: 'center', color: 'white',
      }}>
        <div style={{ fontSize: 56, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>❓</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 12px', fontFamily: "'Playfair Display', serif" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 500, margin: '0 auto 28px' }}>
          Everything you need to know about traveling with GlobeTrekker
        </p>

        {/* Search */}
        <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="🔍  Search questions..."
            value={search}
            onChange={e => { setSearch(e.target.value); setOpenIdx(null); }}
            style={{
              width: '100%', padding: '14px 20px', borderRadius: 50, border: 'none',
              fontSize: 15, fontFamily: "'Poppins', sans-serif", outline: 'none',
              background: 'rgba(255,255,255,0.95)', color: '#1a2332',
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#666',
            }}>✕</button>
          )}
        </div>
      </section>

      <section style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
        {!search && (
          /* Category Tabs */
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36, justifyContent: 'center' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIdx(null); }} style={{
                padding: '9px 20px', borderRadius: 50, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
                transition: 'all 0.2s',
                background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                color: activeCategory === cat ? 'white' : 'var(--text)',
                border: `2px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`,
              }}>{cat}</button>
            ))}
          </div>
        )}

        {search && (
          <p
  style={{
    color: 'var(--text-light)',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center'
  }}
>
  {currentFAQs.length} result
  {currentFAQs.length !== 1 ? 's' : ''} for
  <strong> "{search}" </strong>
</p>
        )}

        {/* FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {currentFAQs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-light)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p>
  No results found. Try different keywords or
  <span
    onClick={() => navigate('/contact')}
    style={{
      color: 'var(--primary)',
      fontWeight: 600,
      cursor: 'pointer'
    }}
  >
    contact us
  </span>.
</p>
            </div>
          ) : (
            currentFAQs.map((item, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)', borderRadius: 16,
                border: `2px solid ${openIdx === i ? 'var(--primary-light)' : 'var(--border)'}`,
                overflow: 'hidden', transition: 'all 0.3s',
                boxShadow: openIdx === i ? 'var(--shadow-hover)' : 'var(--shadow)',
              }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{
                    width: '100%', padding: '18px 22px', textAlign: 'left',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', lineHeight: 1.4 }}>
                    {item.q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                    background: openIdx === i ? 'var(--primary)' : 'var(--bg)',
                    color: openIdx === i ? 'white' : 'var(--text)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 18, transition: 'all 0.3s',
                    transform: openIdx === i ? 'rotate(45deg)' : 'none',
                  }}>+</span>
                </button>
                {openIdx === i && (
                  <div style={{
                    padding: '0 22px 20px',
                    animation: 'fadeUp 0.2s ease',
                  }}>
                    <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: 14, margin: 0 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 60, textAlign: 'center',
          background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
          borderRadius: 24, padding: '40px 32px', color: 'white',
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
          <h3 style={{ margin: '0 0 10px', fontSize: 20 }}>Still have questions?</h3>
          <p style={{ opacity: 0.85, marginBottom: 24, fontSize: 14 }}>
            Our travel experts are ready to help you plan the perfect trip.
          </p>
          <button
  onClick={() => navigate('/contact')}
  style={{
    padding: '12px 32px',
    background: '#f9d342',
    color: '#07406e',
    border: 'none',
    borderRadius: 50,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  }}
>
  📞 Contact Our Team
</button>
        </div>
      </section>
    </div>
  );
}
