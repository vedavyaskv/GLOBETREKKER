import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TERMS = [
  {
    icon: '📋', title: '1. Acceptance of Terms',
    content: `By accessing or using the GlobeTrekker website (globetrekker.in), mobile application, or any of our travel services, you agree to be bound by these Terms and Conditions, our Privacy Policy, and all applicable laws and regulations.

If you do not agree with any of these terms, you are prohibited from using or accessing this site. These terms apply to all visitors, users, registered members, and anyone who makes a booking through GlobeTrekker.

We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms. We will notify registered users of significant changes via email.`
  },
  {
    icon: '🧳', title: '2. Booking Terms',
    content: `**Booking Confirmation:** A booking is confirmed only after full or partial payment is received and a booking confirmation email with a unique Booking ID is sent to you.

**Accuracy of Information:** You are responsible for ensuring all traveler details (name, passport number, dates) match exactly with official documents. GlobeTrekker is not liable for issues arising from incorrect information provided.

**Minimum Age:** Travelers under 18 must be accompanied by a guardian. The account holder must be 18 or older.

**Package Changes:** GlobeTrekker reserves the right to make reasonable alterations to itineraries due to force majeure, local conditions, or operational necessity. We will always try to provide an equivalent alternative.

**Third-Party Services:** Hotels, airlines, and local tour operators are independent contractors. While we carefully vet our partners, GlobeTrekker cannot be held liable for the direct actions of third-party providers.`
  },
  {
    icon: '💳', title: '3. Payments & Pricing',
    content: `**Pricing:** All prices are displayed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. Prices are subject to change until a booking is confirmed.

**Payment:** Full payment is required at the time of booking for trips departing within 30 days. For advance bookings, a 25% deposit secures your reservation with the balance due 30 days before departure.

**Currency:** International travelers are billed in INR. Currency conversion charges, if any, are borne by the traveler.

**Price Match:** We offer a price-match guarantee for identical packages. Submit proof within 48 hours of booking.

**Taxes:** GST (5% on international tours, 18% on domestic commissions) is included in displayed prices.`
  },
  {
    icon: '❌', title: '4. Cancellation Policy',
    content: `**Cancellation by Traveler:**
• 30+ days before travel date: Full refund (100%)
• 15 - 29 days before travel date: 50% refund
• 8 - 14 days before travel date: 25% refund
• Less than 7 days or no-show: No refund

**Cancellation by GlobeTrekker:**
We may cancel a tour if minimum participation numbers are not met (for group tours), or due to force majeure events (natural disasters, political unrest, pandemics). In such cases, a full refund will be issued, or an alternative date/destination offered.

**Medical Cancellations:** Cancellations due to medical emergencies, supported by a doctor's certificate, will be reviewed individually. We strongly recommend travel insurance.

**Refund Processing:** Approved refunds are processed within 7 - 10 business days to the original payment method.`
  },
  {
    icon: '📜', title: '5. User Responsibilities',
    content: `As a GlobeTrekker user and traveler, you agree to:

**Documentation:** Ensure you hold a valid passport (minimum 6 months validity beyond travel date), required visas, and travel insurance.

**Health:** Consult a physician for destination-specific health advisories. Disclose any medical conditions relevant to your travel to ensure appropriate support.

**Conduct:** Behave respectfully toward local cultures, fellow travelers, GlobeTrekker staff, and partner service providers. GlobeTrekker reserves the right to remove disruptive travelers from tours without refund.

**Compliance:** Follow all laws of the destination country. GlobeTrekker is not responsible for legal consequences arising from traveler conduct.

**Account Security:** Maintain the confidentiality of your account credentials. You are responsible for all activity under your account.`
  },
  {
    icon: '⚠️', title: '6. Limitation of Liability',
    content: `**Force Majeure:** GlobeTrekker is not liable for delays, cancellations, or damages resulting from circumstances beyond our control, including but not limited to: natural disasters, war, terrorism, strikes, government actions, pandemics, or extreme weather.

**Maximum Liability:** Our total liability to you in respect of any claim shall not exceed the total price paid for the specific trip in question.

**Indirect Damages:** GlobeTrekker shall not be liable for any indirect, incidental, special, or consequential damages, including lost profits, lost data, or loss of enjoyment.

**Travel Insurance:** We strongly recommend comprehensive travel insurance covering medical emergencies, trip cancellation, and personal liability. Failure to obtain insurance is at the traveler's own risk.

**Third-Party Content:** Reviews and user-generated content on our platform represent individual opinions. GlobeTrekker does not verify or endorse third-party reviews.`
  },
  {
    icon: '⚖️', title: '7. Governing Law & Disputes',
    content: `**Jurisdiction:** These Terms are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka.

**Dispute Resolution:** Before pursuing legal action, both parties agree to attempt good-faith resolution through our customer support team. Unresolved disputes may be referred to arbitration under the Arbitration and Conciliation Act, 1996.

**Consumer Protection:** Your rights under the Consumer Protection Act, 2019 (India) are not affected by these terms.

**Contact for Disputes:** legal@globetrekker.in or write to: Legal Department, GlobeTrekker, 42 Travel Tower, MG Road, Bangalore — 560001.

By using our services, you acknowledge that you have read, understood, and agree to these Terms and Conditions in their entirety.`
  },
];

export default function Terms() {
  const [openIdx, setOpenIdx] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>

      <section style={{
        paddingTop: 120, paddingBottom: 60, paddingLeft: 24, paddingRight: 24,
        background: 'linear-gradient(135deg, #071a2e 0%, #07406e 60%, #1a7fc1 100%)',
        textAlign: 'center', color: 'white',
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📜</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 12px', fontFamily: "'Playfair Display', serif" }}>
          Terms & Conditions
        </h1>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 560, margin: '0 auto' }}>
          Please read these terms carefully before using GlobeTrekker services. They govern your use of our platform and travel arrangements.
        </p>
        <div style={{
          display: 'inline-block', marginTop: 20,
          background: 'rgba(249,211,66,0.15)', border: '1px solid rgba(249,211,66,0.3)',
          borderRadius: 50, padding: '6px 20px', fontSize: 13, color: '#f9d342', fontWeight: 600,
        }}>📅 Effective: June 2025</div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{
          background: 'rgba(249,211,66,0.08)', border: '1px solid rgba(249,211,66,0.3)',
          borderRadius: 16, padding: '16px 22px', marginBottom: 32,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 24 }}>ℹ️</span>
          <p style={{ color: 'var(--text)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            <strong>Summary:</strong> Book in good faith, provide accurate information, purchase travel insurance, and treat fellow travelers with respect. We'll handle the rest to make your trip amazing!
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TERMS.map((item, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', borderRadius: 20,
              border: `2px solid ${openIdx === i ? 'var(--primary-light)' : 'var(--border)'}`,
              overflow: 'hidden', transition: 'all 0.3s',
              boxShadow: openIdx === i ? 'var(--shadow-hover)' : 'var(--shadow)',
            }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: '100%', padding: '20px 24px', background: 'none', border: 'none',
                  display: 'flex', alignItems: 'center', gap: 14, justifyContent:'space-between',
                  cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span style={{
                  width: 44, height: 44, borderRadius: 12, fontSize: 22,
                  background: openIdx === i ? 'var(--primary)' : 'rgba(7,64,110,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'background 0.3s',
                }}>{item.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textAlign: 'left' }}>
                  {item.title}
                </span>
                <span style={{
                  marginLeft: 'auto', flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                  background: openIdx === i ? 'var(--primary)' : 'var(--bg)',
                  color: openIdx === i ? 'white' : 'var(--text)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 18, transition: 'all 0.3s',
                  transform: openIdx === i ? 'rotate(45deg)' : 'none',
                }}>+</span>
              </button>
              {openIdx === i && (
                <div style={{ padding: '0 24px 24px', animation: 'fadeUp 0.3s ease' }}>
                  <div style={{ height: 1, background: 'var(--border)', marginBottom: 18 }} />
                  {item.content.split('\n\n').map((para, j) => (
                    <p key={j} style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: 14, margin: '0 0 14px' }}>
                      {para.split('**').map((part, k) =>
                        k % 2 === 1
                          ? <strong key={k} style={{ color: 'var(--text)' }}>{part}</strong>
                          : part
                      )}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 40, background: 'var(--bg-card)', borderRadius: 20,
          padding: '28px 32px', border: '1px solid var(--border)', textAlign: 'center',
        }}>
          <p style={{ color: 'var(--text-light)', fontSize: 14, margin: '0 0 16px' }}>
            By booking with GlobeTrekker, you confirm that you have read and agreed to these Terms & Conditions.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
  onClick={() => navigate('/register')}
  style={{
    padding:'10px 28px',
    background:'var(--gradient)',
    color:'white',
    border:'none',
    borderRadius:50,
    fontWeight:700,
    fontSize:14,
    cursor:'pointer'
  }}
>
  🚀 Book a Trip
</button>
            <button
  onClick={() => navigate('/contact')}
  style={{
    padding:'10px 28px',
    background:'var(--bg)',
    color:'var(--primary)',
    border:'1px solid var(--border)',
    borderRadius:50,
    fontWeight:700,
    fontSize:14,
    cursor:'pointer'
  }}
>
  ❓ Ask a Question
</button>
          </div>
        </div>
      </section>
    </div>
  );
}
