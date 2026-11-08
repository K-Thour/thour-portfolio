export type ThemeMode = 'avengers' | 'norse' | 'godofwar';

export interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

