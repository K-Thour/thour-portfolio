'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ThemeMode, ThemeContextValue } from '@/types/theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const THEME_STORAGE_KEY = 'portfolio-theme';

function applyThemeClasses(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  const isDark = theme === 'avengers';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('light', !isDark);
}

function resolveInitialTheme(): ThemeMode {
  if (typeof document !== 'undefined') {
    const active = document.documentElement.getAttribute('data-theme') as ThemeMode;
    if (active === 'avengers' || active === 'norse' || active === 'godofwar') {
      return active;
    }
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = (localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('theme')) as string | null;
      if (stored === 'avengers' || stored === 'dark') return 'avengers';
      if (stored === 'godofwar' || stored === 'norse' || stored === 'light') return 'godofwar';
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'avengers';
    } catch {
      // fallback
    }
  }
  return 'avengers';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => resolveInitialTheme());

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      localStorage.setItem('theme', newTheme === 'avengers' ? 'dark' : 'light');
    } catch {
      // Ignore storage errors in private/incognito browsing
    }
    applyThemeClasses(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'avengers' ? 'godofwar' : 'avengers');
  }, [theme, setTheme]);

  // Sync across tabs in real-time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY || e.key === 'theme') {
        const val = e.newValue;
        if (val === 'avengers' || val === 'dark') {
          setThemeState('avengers');
          applyThemeClasses('avengers');
        } else if (val === 'godofwar' || val === 'norse' || val === 'light') {
          setThemeState('godofwar');
          applyThemeClasses('godofwar');
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
