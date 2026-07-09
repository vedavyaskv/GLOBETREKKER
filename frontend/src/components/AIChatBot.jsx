import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from "react-markdown";

const QUICK_PROMPTS = [
  '🏖️ Best beaches under ₹50k?',
  '🗓️ 5-day Bali itinerary',
  '💰 Budget trip under ₹20k',
  '🏔️ Adventure destinations',
];

import { API_BASE_URL } from "../utils/api";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm GlobeBot, your AI travel assistant! I can help you plan trips, find destinations, suggest budgets, and more. What adventure are you planning? 🌍"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = {
      role: 'user',
      content: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: text
          })
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error('Invalid server response');
      }

      console.log("FRONTEND DATA:", data);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            data?.reply ||
            data?.message ||
            'No response received.'
        }
      ]);
    } catch (error) {
      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            '🔌 I\'m having connection issues. Please check your internet and try again!'
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9000,
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(7,64,110,0.5)',
          fontSize: 26,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
          transform: isOpen ? 'rotate(45deg)' : 'none',
          animation: isOpen ? 'none' : 'borderPulse 2s infinite',
        }}
        title="Ask GlobeBot"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', bottom: 100, right: 28, zIndex: 9000,
          width: 360, maxWidth: 'calc(100vw - 40px)',
          background: 'var(--bg-card)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          animation: 'fadeUp 0.3s ease',
        }}>
          {}
          <div style={{
            background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
            padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
            }}>🤖</div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>GlobeBot</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                <span style={{
                  display: 'inline-block', width: 7, height: 7,
                  borderRadius: '50%', background: '#4ade80',
                  marginRight: 4,
                }} />AI Travel Assistant
              </div>
            </div>
          </div>

          <div style={{
            height: 320, overflowY: 'auto', padding: 14,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #07406e, #1a7fc1)'
                    : 'var(--bg)',
                  color: msg.role === 'user' ? 'white' : 'var(--text)',
                  fontSize: 13, lineHeight: 1.5,
                  boxShadow: 'var(--shadow)',
                }}>
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px', borderRadius: '18px 18px 18px 4px',
                  background: 'var(--bg)', fontSize: 20,
                }}>💭 ...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            padding: '0 12px 8px',
            display: 'flex', flexWrap: 'wrap', gap: 6,
          }}>
            {QUICK_PROMPTS.map(p => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                style={{
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: 50, padding: '4px 10px', fontSize: 11,
                  cursor: 'pointer', color: 'var(--primary)', fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--primary)' }
                onMouseOut={e => e.currentTarget.style.background = 'var(--bg)'}
              >{p}</button>
            ))}
          </div>

          <div style={{
            padding: '8px 12px 12px',
            display: 'flex', gap: 8,
            borderTop: '1px solid var(--border)',
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about destinations, budget, tips..."
              style={{
                flex: 1, padding: '10px 14px',
                border: '1px solid var(--border)',
                borderRadius: 50, fontSize: 13,
                fontFamily: "'Poppins', sans-serif",
                background: 'var(--bg)', color: 'var(--text)',
                outline: 'none',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'var(--primary)', border: 'none',
                cursor: 'pointer', fontSize: 16, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (loading || !input.trim()) ? 0.5 : 1,
              }}
            >→</button>
          </div>
        </div>
      )}
    </>
  );
}