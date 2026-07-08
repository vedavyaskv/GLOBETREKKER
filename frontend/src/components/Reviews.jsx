import React, { useState, useEffect } from 'react';
import { API_BASE_URL, authHeaders } from '../utils/api';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          style={{
            fontSize: 28, cursor: 'pointer',
            color: star <= (hovered || value) ? '#f9d342' : 'var(--border)',
            transition: 'color 0.1s',
          }}
        >★</span>
      ))}
    </div>
  );
}

const SAMPLE_REVIEWS = [
  { username: 'RajeshK', destination: 'Bali', rating: 5, comment: 'Absolutely magical experience! GlobeTrekker made everything seamless. The Ubud rice terraces were breathtaking.', createdAt: new Date(Date.now() - 86400000 * 3) },
  { username: 'PriyaM', destination: 'Paris', rating: 5, comment: 'Paris lived up to every dream! The Eiffel Tower at sunset was unforgettable. Highly recommend the Explorer package!', createdAt: new Date(Date.now() - 86400000 * 7) },
  { username: 'AmitS', destination: 'Dubai', rating: 4, comment: 'Dubai was spectacular — the Burj Khalifa view was insane! Desert safari was the highlight. Great value for money.', createdAt: new Date(Date.now() - 86400000 * 10) },
  { username: 'DeepikaN', destination: 'Maldives', rating: 5, comment: 'Honeymoon in Maldives was pure heaven. Crystal clear waters, gorgeous overwater villa. Will definitely book again!', createdAt: new Date(Date.now() - 86400000 * 14) },
  { username: 'VikramP', destination: 'Japan', rating: 5, comment: 'Japan exceeded every expectation. The cherry blossoms in Kyoto were magical. GlobeTrekker\'s guide was phenomenal!', createdAt: new Date(Date.now() - 86400000 * 20) },
  { username: 'AnjaliR', destination: 'Thailand', rating: 4, comment: 'Phuket was stunning! The Phi Phi island tour was unforgettable. Street food was amazing. Loved every moment!', createdAt: new Date(Date.now() - 86400000 * 25) },
];

export default function ReviewsSection() {
  const { isLoggedIn, user, showToast } = useApp();
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [form, setForm] = useState({ destination: '', rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const destinations = ['Switzerland', 'Maldives', 'Italy', 'Dubai', 'Thailand', 'New Zealand', 'France', 'Japan', 'Australia'];

  const submitReview = async () => {
    if (!form.destination || !form.rating || !form.comment.trim()) {
      showToast('Please fill all fields and select a rating!', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const { review } = await res.json();
        setReviews(prev => [{ ...review, createdAt: new Date() }, ...prev]);
        setForm({ destination: '', rating: 0, comment: '' });
        setShowForm(false);
        showToast('✅ Review posted successfully!', 'success');
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to post review', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    }
    setSubmitting(false);
  };

  const avgRating =
  (reviews.reduce((a, r) => a + r.rating, 0) /
   (reviews.length || 1)).toFixed(1);

  return (
    <section style={{
      padding: '80px 24px',
      background: 'var(--bg)',
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-heading">
          <h2>Traveler Stories</h2>
          <p>Hear from thousands of happy adventurers who chose GlobeTrekker</p>
          <div className="underline" />
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 40,
          marginBottom: 40, flexWrap: 'wrap',
        }}>
          {[
            { label: 'Overall Rating', value: `${avgRating}★`, sub: 'out of 5' },
            { label: 'Total Reviews', value: '10,000+', sub: 'verified reviews' },
            { label: 'Recommend Us', value: '98%', sub: 'would book again' },
          ].map(stat => (
            <div key={stat.label} style={{
              textAlign: 'center',
              background: 'var(--bg-card)',
              padding: '20px 32px', borderRadius: 16,
              boxShadow: 'var(--shadow)',
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>{stat.value}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Write Review Button */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {isLoggedIn ? (
            <button
              onClick={() => setShowForm(f => !f)}
              style={{
                background: 'var(--gradient)', color: 'white',
                border: 'none', borderRadius: 50, padding: '12px 28px',
                fontWeight: 700, fontSize: 15, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {showForm ? '✕ Cancel' : '✍️ Write a Review'}
            </button>
          ) : (
            <p style={{ color: 'var(--text-light)', fontSize: 14 }}>
  <span
    onClick={() => navigate('/login')}
    style={{
      color: 'var(--primary)',
      fontWeight: 600,
      cursor: 'pointer'
    }}
  >
    Login
  </span>{' '}
  to share your travel experience!
</p>
          )}
        </div>

        {/* Review Form */}
        {showForm && isLoggedIn && (
          <div style={{
            background: 'var(--bg-card)', borderRadius: 20,
            padding: 28, boxShadow: 'var(--shadow)',
            marginBottom: 32, maxWidth: 600, margin: '0 auto 32px',
            animation: 'fadeUp 0.3s ease',
          }}>
            <h3 style={{ color: 'var(--primary)', margin: '0 0 20px', fontSize: 18 }}>Share Your Experience</h3>
            
            <select
              className="input-field"
              value={form.destination}
              onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
              style={{ marginBottom: 14, display: 'block' }}
            >
              <option value="">Select Destination</option>
              {destinations.map(d => <option key={d}>{d}</option>)}
            </select>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 8 }}>Rating *</label>
              <StarPicker value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
            </div>

            <textarea
              className="input-field"
              rows={4}
              placeholder="Share your experience, tips, and highlights..."
              value={form.comment}
              onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
              style={{ marginBottom: 14, display: 'block', resize: 'vertical' }}
            />

            <button
              onClick={submitReview}
              disabled={submitting}
              style={{
                width: '100%', padding: '12px',
                background: 'var(--gradient)',
                border: 'none', borderRadius: 50, color: 'white',
                fontWeight: 700, fontSize: 15, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
            >{submitting ? 'Posting...' : 'Post Review ✓'}</button>
          </div>
        )}

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {reviews.map((review, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', borderRadius: 16,
              padding: 22, boxShadow: 'var(--shadow)',
              border: '1px solid var(--border)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'var(--gradient)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 800, fontSize: 16,
                  }}>{review.username?.[0]?.toUpperCase()}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{review.username}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-light)' }}>
                      📍 {review.destination}
                    </div>
                  </div>
                </div>
                <div style={{ color: '#f9d342', fontSize: 14 }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, margin: '0 0 10px' }}>
                "{review.comment}"
              </p>
              <div style={{ fontSize: 11, color: 'var(--text-light)' }}>
                {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
