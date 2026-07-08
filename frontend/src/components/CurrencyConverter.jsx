import React, { useState, useEffect, useCallback } from 'react';

const CURRENCIES = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'NZD', name: 'NZ Dollar', symbol: 'NZ$', flag: '🇳🇿' },
];

const FALLBACK_RATES = {
  INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0094,
  AED: 0.044, THB: 0.42, JPY: 1.82, AUD: 0.019,
  CHF: 0.011, NZD: 0.020,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(10000);
  const [from, setFrom] = useState('INR');
  const [to, setTo] = useState('USD');
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [lastUpdated, setLastUpdated] = useState('Approximate rates');
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://api.frankfurter.app/latest?from=INR');
        if (res.ok) {
          const data = await res.json();
          setRates({ INR: 1, ...data.rates });
          setLastUpdated(`Live · ${new Date().toLocaleTimeString()}`);
        }
      } catch {
      }
    };
    fetchRates();
  }, []);

  const convert = useCallback(() => {
    const rateFrom = rates[from] || 1;
    const rateTo = rates[to] || 1;
    const inINR = amount / rateFrom;
    return (inINR * rateTo).toFixed(2);
  }, [amount, from, to, rates]);

  const swap = () => { setFrom(to); setTo(from); };

  const converted = convert();
  const toCurrency = CURRENCIES.find(c => c.code === to);
  const fromCurrency = CURRENCIES.find(c => c.code === from);

  const QUICK_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];

  return (
    <section style={{
      padding: '60px 24px',
      background: 'var(--bg)',
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div className="section-heading">
          <h2>Currency Converter</h2>
          <p>Plan your budget with live exchange rates for 150+ currencies</p>
          <div className="underline" />
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
          borderRadius: 28, padding: '32px',
          boxShadow: '0 20px 60px rgba(7,64,110,0.35)',
          color: 'white',
        }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, opacity: 0.8, display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Amount to Convert
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value) || 0)}
              min={0}
              style={{
                width: '100%', padding: '16px 20px', fontSize: 24, fontWeight: 800,
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: 16, background: 'rgba(255,255,255,0.15)',
                color: 'white', fontFamily: "'Poppins', sans-serif",
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {QUICK_AMOUNTS.map(a => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                style={{
                  padding: '5px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600,
                  background: amount === a ? '#f9d342' : 'rgba(255,255,255,0.15)',
                  color: amount === a ? '#07406e' : 'white',
                  border: 'none', cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s',
                }}
              >₹{a >= 100000 ? `${a / 100000}L` : `${a / 1000}k`}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 12, opacity: 0.75, display: 'block', marginBottom: 6, fontWeight: 600 }}>From</label>
              <select
                value={from}
                onChange={e => setFrom(e.target.value)}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 12,
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.15)', color: 'white',
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', outline: 'none',
                }}
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code} style={{ background: '#07406e' }}>
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={swap} style={{
              width: 42, height: 42, borderRadius: '50%', marginTop: 20,
              background: 'rgba(249,211,66,0.3)', border: '2px solid rgba(249,211,66,0.5)',
              color: '#f9d342', fontSize: 18, cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(249,211,66,0.5)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(249,211,66,0.3)'}
            >⇄</button>

            <div>
              <label style={{ fontSize: 12, opacity: 0.75, display: 'block', marginBottom: 6, fontWeight: 600 }}>To</label>
              <select
                value={to}
                onChange={e => setTo(e.target.value)}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 12,
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.15)', color: 'white',
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', outline: 'none',
                }}
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code} style={{ background: '#07406e' }}>
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '24px',
            textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <div style={{ fontSize: 14, opacity: 0.75, marginBottom: 8 }}>
              {fromCurrency?.flag} {amount.toLocaleString()} {from} =
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: '#f9d342', lineHeight: 1 }}>
              {toCurrency?.symbol}{parseFloat(converted).toLocaleString()}
            </div>
            <div style={{ fontSize: 16, opacity: 0.85, marginTop: 6 }}>{to}</div>
            <div style={{ fontSize: 12, opacity: 0.55, marginTop: 10 }}>
              1 {from} = {toCurrency?.symbol}{(rates[to] / rates[from]).toFixed(4)} {to}
            </div>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 16, fontSize: 11, opacity: 0.6,
          }}>
            <span>🕒 {lastUpdated}</span>
            <span>Powered by Frankfurter.app</span>
          </div>
        </div>

        <div style={{
          marginTop: 20, background: 'var(--bg-card)', borderRadius: 16, padding: '16px 20px',
          border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
          <p style={{ color: 'var(--text-light)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>Travel Tip:</strong> Airport currency exchange desks typically offer rates 5–15% worse than bank rates. Use your international debit card at local ATMs for better rates at your destination.
          </p>
        </div>
      </div>
    </section>
  );
}
