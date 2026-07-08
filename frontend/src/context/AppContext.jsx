import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL, authHeaders } from '../utils/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('gt_theme') || 'light');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('gt_token'));
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gt_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (token) {
      const stored = localStorage.getItem('gt_user');

      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          logout();
        }
      }

      fetchWishlist();
    } else {
      setUser(null);
      setWishlist([]);
    }
  }, [token]);

  const fetchWishlist = async () => {
    if (!localStorage.getItem('gt_token')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/wishlist`, {
        headers: authHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setWishlist(data.wishlist || []);
      }
    } catch {}
  };

  const login = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem('gt_token', userToken);
    localStorage.setItem('gt_user', JSON.stringify(userData));
    if (userData.username) localStorage.setItem('username', userData.username);
    if (userData.email) localStorage.setItem('email', userData.email);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setWishlist([]);
    localStorage.removeItem('gt_token');
    localStorage.removeItem('gt_user');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  };

  const toggleWishlist = async (destination) => {
    if (!token) {
      showToast('Please login to save to wishlist!', 'error');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/wishlist/toggle`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ destination })
      });
      if (res.ok) {
        const data = await res.json();
        setWishlist(data.wishlist || []);
        const added = (data.wishlist || []).includes(destination);
        showToast(added ? `❤️ ${destination} added to wishlist!` : `💔 Removed from wishlist`, added ? 'success' : 'info');
      }
    } catch {
      showToast('Failed to update wishlist', 'error');
    }
  };

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      user, token, login, logout,
      wishlist, toggleWishlist, fetchWishlist,
      toasts, showToast,
      isLoggedIn: !!token
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
};