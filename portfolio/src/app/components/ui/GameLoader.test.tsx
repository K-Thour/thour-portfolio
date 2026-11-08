import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { GameLoader } from './GameLoader';
import { ThemeContext } from '../../context/ThemeContext';

describe('GameLoader component', () => {
  const onCompleteMock = vi.fn();
  const toggleThemeMock = vi.fn();
  const setThemeMock = vi.fn();

  const renderWithTheme = (theme: 'avengers' | 'godofwar' = 'avengers') => {
    return render(
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme: toggleThemeMock,
          setTheme: setThemeMock,
        }}
      >
        <GameLoader onComplete={onCompleteMock} />
      </ThemeContext.Provider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
    try {
      localStorage.clear();
    } catch {
      // Ignore
    }

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    document.body.style.overflow = '';
    try {
      localStorage.clear();
    } catch {
      // Ignore
    }
  });

  it('renders progressbar, telemetry header, and skip button with accessible attributes', () => {
    renderWithTheme('avengers');

    // Progressbar role and aria attributes
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeDefined();
    expect(progressbar.getAttribute('aria-valuemin')).toBe('0');
    expect(progressbar.getAttribute('aria-valuemax')).toBe('100');
    expect(progressbar.getAttribute('aria-valuenow')).toBe('0');
    expect(progressbar.getAttribute('aria-label')).toBe(
      'STARK Industries system initialization progress',
    );

    // Stark Industries HUD
    expect(screen.getByText(/STARK INDUSTRIES \/\/ HUD/i)).toBeDefined();
    expect(screen.getByText(/PROTOCOL: MARK-LXXXV/i)).toBeDefined();

    // Skip button
    const skipButton = screen.getByRole('button', {
      name: /skip introduction sequence/i,
    });
    expect(skipButton).toBeDefined();
    expect(skipButton.className).toContain('min-w-[44px]');
    expect(skipButton.className).toContain('min-h-[44px]');
  });

  it('locks body scroll on mount and unlocks on unmount without forcing inline auto', () => {
    document.body.style.overflow = '';
    const { unmount } = renderWithTheme('avengers');

    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('triggers onComplete when Skip button is clicked', () => {
    vi.useFakeTimers();
    renderWithTheme('avengers');

    const skipButton = screen.getByRole('button', {
      name: /skip introduction sequence/i,
    });
    fireEvent.click(skipButton);

    expect(onCompleteMock).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('triggers onComplete when Space key is pressed', () => {
    vi.useFakeTimers();
    renderWithTheme('avengers');

    fireEvent.keyDown(window, { key: ' ' });

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('triggers onComplete when Enter key is pressed', () => {
    vi.useFakeTimers();
    renderWithTheme('avengers');

    fireEvent.keyDown(window, { key: 'Enter' });

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('triggers onComplete when Escape key is pressed', () => {
    vi.useFakeTimers();
    renderWithTheme('avengers');

    fireEvent.keyDown(window, { key: 'Escape' });

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('triggers onComplete when clicking the screen container', () => {
    vi.useFakeTimers();
    renderWithTheme('avengers');

    const container = screen.getByRole('progressbar').closest('.fixed')!;
    fireEvent.click(container);

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('guards against duplicate onComplete calls from multiple rapid skip triggers', () => {
    vi.useFakeTimers();
    renderWithTheme('avengers');

    const skipButton = screen.getByRole('button', {
      name: /skip introduction sequence/i,
    });
    const container = screen.getByRole('progressbar').closest('.fixed')!;

    fireEvent.click(skipButton);
    fireEvent.keyDown(window, { key: 'Escape' });
    fireEvent.keyDown(window, { key: ' ' });
    fireEvent.click(container);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('adapts visuals and telemetry for God of War theme', () => {
    renderWithTheme('godofwar');

    expect(screen.getByText(/VALHALLA ARCHIVES \/\/ CHAPTER I/i)).toBeDefined();
    expect(screen.getByText(/REALM: MIDGARD/i)).toBeDefined();
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar.getAttribute('aria-label')).toBe(
      'Valhalla Realm awakening progress',
    );
  });

  it('completes automatically when progress reaches 100%', () => {
    vi.useFakeTimers();
    renderWithTheme('avengers');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('respects reduced motion settings and uses accelerated transition on skip', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    vi.useFakeTimers();
    renderWithTheme('avengers');

    const skipButton = screen.getByRole('button', {
      name: /skip introduction sequence/i,
    });
    fireEvent.click(skipButton);

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('advances RAF to 600ms under prefers-reduced-motion and automatically completes', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    vi.useFakeTimers();
    renderWithTheme('avengers');

    // Advance 600ms (progression) + 100ms (completion delay) + 200ms (exit delay)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
});
