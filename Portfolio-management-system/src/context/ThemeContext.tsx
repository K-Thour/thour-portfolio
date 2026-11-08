/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setTheme as setReduxTheme } from "../store/slices/theme.slice";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return "light";
    }
  } catch (e) {
    console.warn("LocalStorage access failed for theme preference:", e);
  }
  return "dark";
}

function applyThemeToDOM(theme: Theme) {
  try {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  } catch {
    // DOM safety
  }
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const reduxTheme = useAppSelector((state) => state.theme.theme);

  const [theme, setThemeState] = useState<Theme>(() => {
    const initial = getInitialTheme();
    applyThemeToDOM(initial);
    return initial;
  });

  const [prevReduxTheme, setPrevReduxTheme] = useState(reduxTheme);
  if (reduxTheme && reduxTheme !== prevReduxTheme) {
    setPrevReduxTheme(reduxTheme);
    setThemeState(reduxTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, reduxTheme);
    } catch {
      // ignore
    }
    applyThemeToDOM(reduxTheme);
  }

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch (e) {
        console.warn("Failed to persist theme in localStorage:", e);
      }
      applyThemeToDOM(newTheme);
      dispatch(setReduxTheme(newTheme));
    },
    [dispatch],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Synchronize across multiple open tabs in real-time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) {
        const val = e.newValue;
        if (val === "light" || val === "dark") {
          setThemeState(val);
          applyThemeToDOM(val);
          dispatch(setReduxTheme(val));
        } else if (!val) {
          const fallback = getInitialTheme();
          setThemeState(fallback);
          applyThemeToDOM(fallback);
          dispatch(setReduxTheme(fallback));
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
