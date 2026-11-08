import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

export type Theme = 'avengers' | 'godofwar';

export const THEME_STORAGE_KEY = 'portfolio-theme';

export function getFallbackTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (saved === 'avengers' || saved === 'godofwar') {
      return saved;
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      return 'godofwar';
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'avengers';
    }
  } catch (e) {
    console.warn('LocalStorage not accessible for theme preference:', e);
  }
  return 'avengers';
}

function getInitialTheme(): Theme {
  return getFallbackTheme();
}

function applyThemeToDOM(theme: Theme) {
  try {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'avengers') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    // DOM safety
  }
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Synchronous priority initializer - runs before first frame paint
  const [theme, setThemeState] = useState<Theme>(() => {
    const initial = getInitialTheme();
    applyThemeToDOM(initial);
    return initial;
  });

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to save theme in localStorage:', e);
    }
    applyThemeToDOM(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'avengers' ? 'godofwar' : 'avengers');
  }, [theme, setTheme]);

  // Synchronize across multiple open tabs in real time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) {
        if (!e.newValue) {
          const fallback = getInitialTheme();
          setThemeState(fallback);
          applyThemeToDOM(fallback);
        } else if (e.newValue === 'avengers' || e.newValue === 'godofwar') {
          setThemeState(e.newValue);
          applyThemeToDOM(e.newValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
