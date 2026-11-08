import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme, THEME_STORAGE_KEY } from './ThemeContext';

describe('ThemeContext', () => {
  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('throws an error if useTheme is used outside of ThemeProvider', () => {
    // Suppress console.error during expected throw
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within ThemeProvider');

    consoleError.mockRestore();
  });

  it('resolves initial theme from localStorage if valid (godofwar)', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'godofwar');

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('godofwar');
    expect(document.documentElement.getAttribute('data-theme')).toBe('godofwar');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('resolves initial theme from localStorage if valid (avengers)', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'avengers');

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('avengers');
    expect(document.documentElement.getAttribute('data-theme')).toBe('avengers');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('resolves initial theme from matchMedia prefers-color-scheme: light when no saved preference', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('light'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('godofwar');
    expect(document.documentElement.getAttribute('data-theme')).toBe('godofwar');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    window.matchMedia = originalMatchMedia;
  });

  it('resolves initial theme from matchMedia prefers-color-scheme: dark when no saved preference', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('dark'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('avengers');
    expect(document.documentElement.getAttribute('data-theme')).toBe('avengers');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    window.matchMedia = originalMatchMedia;
  });

  it('falls back to avengers theme when localStorage throws an error', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Access denied');
    });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('avengers');
    expect(document.documentElement.getAttribute('data-theme')).toBe('avengers');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(warnSpy).toHaveBeenCalled();
  });

  it('toggles theme between avengers and godofwar, updating DOM and localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('avengers');
    expect(document.documentElement.getAttribute('data-theme')).toBe('avengers');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('godofwar');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('godofwar');
    expect(document.documentElement.getAttribute('data-theme')).toBe('godofwar');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('avengers');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('avengers');
    expect(document.documentElement.getAttribute('data-theme')).toBe('avengers');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('sets theme explicitly via setTheme and survives localStorage.setItem errors', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('godofwar');
    });

    expect(result.current.theme).toBe('godofwar');
    expect(document.documentElement.getAttribute('data-theme')).toBe('godofwar');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(warnSpy).toHaveBeenCalled();
  });

  it('synchronizes theme across tabs on window storage event', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('avengers');

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: THEME_STORAGE_KEY,
          newValue: 'godofwar',
        }),
      );
    });

    expect(result.current.theme).toBe('godofwar');
    expect(document.documentElement.getAttribute('data-theme')).toBe('godofwar');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('ignores storage events for unrelated keys or invalid theme values', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('avengers');

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'some-other-key',
          newValue: 'godofwar',
        }),
      );
    });
    expect(result.current.theme).toBe('avengers');

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: THEME_STORAGE_KEY,
          newValue: 'invalid-theme',
        }),
      );
    });
    expect(result.current.theme).toBe('avengers');
  });

  it('falls back to initial theme on storage removal (empty newValue)', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'godofwar');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('godofwar');

    localStorage.removeItem(THEME_STORAGE_KEY);
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: THEME_STORAGE_KEY,
          newValue: null,
        }),
      );
    });

    expect(result.current.theme).toBe('avengers');
    expect(document.documentElement.getAttribute('data-theme')).toBe('avengers');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
