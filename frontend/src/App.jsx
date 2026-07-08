import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Destinations from './components/Destinations.jsx';
import Packages from './components/Packages.jsx';
import Reviews from './components/Reviews.jsx';
import WeatherWidget from './components/WeatherWidget.jsx';
import InteractiveMap from './components/InteractiveMap.jsx';
import AIChatBot from './components/AIChatBot.jsx';
import CurrencyConverter from './components/CurrencyConverter.jsx';
import Toast from './components/Toast.jsx';

import LoginSignup from './pages/LoginSignup.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import FAQ from './pages/Faq.jsx';
import PrivacyPolicy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AITripPlanner from './pages/AITripPlanner.jsx';
import Admin from './pages/Admin.jsx';
import DestinationDetail from './pages/DestinationDetail.jsx';

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
  }

  function HomePage() {
    return (
      <>
        <Hero />
        <Destinations />
        <InteractiveMap />
        <Packages />
        <WeatherWidget />
        <CurrencyConverter />
        <Reviews />
      </>
    );
  }

  const NO_LAYOUT_PAGES = ['/admin'];
const NO_FOOTER_PAGES = ['/login', '/admin'];

function Layout() {
  const location = useLocation();

  const hideLayout = NO_LAYOUT_PAGES.includes(location.pathname);
  const hideFooter = NO_FOOTER_PAGES.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {!hideLayout && <Header />}

      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trip-planner" element={<AITripPlanner />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />

          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Poppins', sans-serif",
                  textAlign: 'center',
                  background: 'var(--bg)',
                  padding: '0 24px',
                }}
              >
                <div style={{ fontSize: 80, marginBottom: 16 }}>🗺️</div>

                <h1
                  style={{
                    color: 'var(--primary)',
                    fontSize: 48,
                    margin: '0 0 12px',
                    fontWeight: 900,
                  }}
                >
                  404
                </h1>

                <p
                  style={{
                    color: 'var(--text-light)',
                    fontSize: 18,
                    marginBottom: 28,
                  }}
                >
                  Oops! This destination doesn't exist on our map.
                </p>

                <a
                  href="/"
                  style={{
                    padding: '14px 32px',
                    background: 'var(--gradient)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: 50,
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  ← Back to Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      {!hideFooter && <Footer />}

      {!hideLayout && <AIChatBot />}
      {!hideLayout && <Toast />}
    </>
  );
}

  export default function App() {
    return (
      <Router>
        <Layout />
      </Router>
    );
  }