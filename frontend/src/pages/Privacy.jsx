import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'collection', icon: '📥', title: 'Information We Collect',
    content: `We collect information you provide directly to us, including:

**Personal Information:** Name, email address, phone number, date of birth, gender, and payment information when you register for an account or make a booking.

**Travel Information:** Passport details, travel preferences, special requirements (dietary, accessibility), and destination preferences.

**Usage Data:** Pages visited, time spent on site, features used, device information (browser type, OS, IP address), and referral sources.

**Communications:** Messages sent through our contact forms, reviews, and support requests.

We collect this information when you: create an account, make a booking, subscribe to our newsletter, contact customer support, or use our AI travel planner.`
  },
  {
    id: 'use', icon: '🔧', title: 'How We Use Your Information',
    content: `We use your information to:

**Provide Services:** Process bookings, arrange travel, coordinate with hotels and tour operators, and send booking confirmations and itineraries.

**Personalization:** Tailor destination recommendations, package suggestions, and AI trip plans based on your preferences and travel history.

**Communications:** Send booking confirmations, trip reminders, travel tips, and newsletters (only if you've subscribed).

**Improve Our Platform:** Analyze usage patterns to enhance user experience, fix bugs, and develop new features.

**Legal Compliance:** Meet regulatory requirements, prevent fraud, and protect the safety of our users and partners.

We do NOT sell your personal data to third parties for marketing purposes.`
  },
  {
    id: 'sharing', icon: '🤝', title: 'Information Sharing',
    content: `We share your information only in these limited circumstances:

**Travel Partners:** We share necessary booking details (name, contact) with hotels, airlines, and tour operators to fulfill your travel arrangements.

**Payment Processors:** Payment information is processed by PCI-DSS compliant payment gateways. We do not store full card numbers.

**Service Providers:** Trusted third parties who assist us in operating our website (cloud hosting, email delivery, analytics) under strict confidentiality agreements.

**Legal Requirements:** When required by law, court order, or government authority to protect rights, property, or safety.

**Business Transfers:** In the event of a merger, acquisition, or sale of assets, your information may be transferred (you will be notified).

We never share your data with advertising networks or data brokers.`
  },
  {
    id: 'security', icon: '🔒', title: 'Data Security',
    content: `We implement industry-standard security measures to protect your personal information:

**Encryption:** All data transmitted between your browser and our servers is encrypted using TLS/SSL (HTTPS). Passwords are hashed using bcrypt with salt rounds.

**JWT Authentication:** Your session tokens are signed with a secret key and expire after 7 days for security.

**Access Controls:** Only authorized personnel can access user data, governed by role-based access controls.

**Regular Audits:** We conduct periodic security assessments and vulnerability testing.

**Infrastructure:** We use trusted cloud providers (MongoDB Atlas, Render) with SOC 2 compliance and automatic security updates.

However, no method of internet transmission is 100% secure. We encourage you to use strong passwords and keep your login credentials confidential.`
  },
  {
    id: 'rights', icon: '⚖️', title: 'Your Rights',
    content: `You have the following rights regarding your personal data:

**Access:** Request a copy of all personal data we hold about you.

**Correction:** Update or correct inaccurate information through your account dashboard or by contacting us.

**Deletion:** Request deletion of your account and associated data (subject to legal retention requirements).

**Data Portability:** Request your data in a machine-readable format (JSON/CSV).

**Opt-Out:** Unsubscribe from marketing emails at any time using the unsubscribe link in any email.

**Objection:** Object to specific types of data processing.

To exercise any of these rights, contact us at privacy@globetrekker.in. We will respond within 30 days. Identity verification may be required.`
  },
  {
    id: 'cookies', icon: '🍪', title: 'Cookies & Tracking',
    content: `We use cookies and similar technologies to enhance your experience:

**Essential Cookies:** Required for the website to function (session management, security). Cannot be disabled.

**Preference Cookies:** Remember your settings like dark/light mode and language preferences. Stored in localStorage.

**Analytics Cookies:** Help us understand how visitors interact with our site (pages visited, time spent). Data is anonymized.

**No Advertising Cookies:** We do not use cookies for advertising targeting or share cookie data with ad networks.

You can control cookie preferences through your browser settings. Disabling essential cookies may affect site functionality.`
  },
  {
    id: 'contact', icon: '📧', title: 'Contact & Updates',
    content: `**Privacy Officer:**
Email: privacy@globetrekker.in
Phone: +91 98765 43210
Address: 42 Travel Tower, MG Road, Bangalore — 560001, India

**Policy Updates:**
We may update this Privacy Policy periodically. When we make significant changes, we will:
- Display a prominent notice on our website
- Send an email notification to registered users
- Update the "Last Revised" date below

**Grievance Redressal:**
Under the Information Technology Act, 2000 and the IT (Intermediary Guidelines) Rules, 2021, our Grievance Officer can be contacted at the address above. We will acknowledge your grievance within 24 hours and resolve it within 30 days.

Last Revised: June 2025`
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        paddingTop: 120, paddingBottom: 60, paddingLeft: 24, paddingRight: 24,
        background: 'linear-gradient(135deg, #071a2e 0%, #07406e 60%, #1a7fc1 100%)',
        textAlign: 'center', color: 'white',
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 12px', fontFamily: "'Playfair Display', serif" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 560, margin: '0 auto' }}>
          We value your privacy. This policy explains how GlobeTrekker collects, uses, and protects your personal information.
        </p>
        <div style={{
          display: 'inline-block', marginTop: 20,
          background: 'rgba(249,211,66,0.15)', border: '1px solid rgba(249,211,66,0.3)',
          borderRadius: 50, padding: '6px 20px', fontSize: 13, color: '#f9d342', fontWeight: 600,
        }}>📅 Last updated: June 2025</div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
        {/* Quick Nav */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 20, padding: '24px 28px',
          marginBottom: 36, boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
        }}>
          <h3 style={{ color: 'var(--primary)', margin: '0 0 14px', fontSize: 15 }}>Quick Navigation</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{
                padding: '6px 16px', borderRadius: 50, fontSize: 12, fontWeight: 600,
                background: 'var(--bg)', color: 'var(--primary)', textDecoration: 'none',
                border: '1px solid var(--border)', transition: 'all 0.2s',
              }}
                onMouseOver={e => { e.target.style.background = 'var(--primary)'; e.target.style.color = 'white'; }}
                onMouseOut={e => { e.target.style.background = 'var(--bg)'; e.target.style.color = 'var(--primary)'; }}
              >{s.icon} {s.title}</a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SECTIONS.map((section) => (
            <div key={section.id} id={section.id} style={{
              background: 'var(--bg-card)', borderRadius: 20,
              border: '1px solid var(--border)', overflow: 'hidden',
              boxShadow: 'var(--shadow)',
            }}>
              <button
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                style={{
                  width: '100%', padding: '20px 24px', background: 'none', border: 'none',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: activeSection === section.id ? 'var(--primary)' : 'rgba(7,64,110,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0, transition: 'background 0.3s',
                }}>{section.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', textAlign: 'left' }}>
                  {section.title}
                </span>
                <span style={{
                  marginLeft: 'auto', width: 28, height: 28, borderRadius: '50%',
                  background: activeSection === section.id ? 'var(--primary)' : 'var(--bg)',
                  color: activeSection === section.id ? 'white' : 'var(--text)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 18, flexShrink: 0,
                  transition: 'all 0.3s',
                  transform: activeSection === section.id ? 'rotate(45deg)' : 'none',
                }}>+</span>
              </button>
              {activeSection === section.id && (
                <div style={{ padding: '0 24px 24px', animation: 'fadeUp 0.3s ease' }}>
                  <div style={{ height: 1, background: 'var(--border)', marginBottom: 18 }} />
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} style={{
                      color: 'var(--text-light)', lineHeight: 1.8, fontSize: 14,
                      margin: '0 0 14px',
                    }}>
                      {para.split('**').map((part, j) =>
                        j % 2 === 1
                          ? <strong key={j} style={{ color: 'var(--text)' }}>{part}</strong>
                          : part
                      )}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          marginTop: 40, textAlign: 'center',
          background: 'var(--bg-card)', borderRadius: 20, padding: '32px',
          border: '1px solid var(--border)',
        }}>
          <p style={{ color: 'var(--text-light)', fontSize: 14, marginBottom: 16 }}>
            Questions about our privacy practices? We're happy to help.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
  onClick={() => navigate('/contact')}
  style={{
    padding: '10px 24px',
    background: 'var(--gradient)',
    color: 'white',
    border: 'none',
    borderRadius: 50,
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  }}
>
  📧 Contact Privacy Team
</button>
            <button
  onClick={() => navigate('/faq')}
  style={{
    padding: '10px 24px',
    background: 'var(--bg)',
    color: 'var(--primary)',
    borderRadius: 50,
    fontWeight: 700,
    fontSize: 14,
    border: '1px solid var(--border)',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  }}
>
  ❓ View FAQ
</button>
          </div>
        </div>
      </section>
    </div>
  );
}
