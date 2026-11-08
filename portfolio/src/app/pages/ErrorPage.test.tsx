import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ErrorPage } from './ErrorPage';
import { ThemeContext } from '../context/ThemeContext';
import * as ReactRouter from 'react-router';

vi.mock('react-router', () => ({
  useRouteError: vi.fn(),
  useNavigate: vi.fn(),
}));

describe('ErrorPage component', () => {
  const navigateMock = vi.fn();
  const toggleThemeMock = vi.fn();
  const setThemeMock = vi.fn();
  const originalLocation = window.location;

  const renderWithTheme = (
    theme?: 'avengers' | 'godofwar',
  ) => {
    if (theme) {
      return render(
        <ThemeContext.Provider
          value={{
            theme,
            toggleTheme: toggleThemeMock,
            setTheme: setThemeMock,
          }}
        >
          <ErrorPage />
        </ThemeContext.Provider>,
      );
    }
    return render(<ErrorPage />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ReactRouter.useNavigate).mockReturnValue(navigateMock);
    vi.mocked(ReactRouter.useRouteError).mockReturnValue(
      new Error('Simulated reactor meltdown'),
    );

    delete (window as any).location;
    window.location = { ...originalLocation, reload: vi.fn(), href: '' } as any;

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

    try {
      localStorage.clear();
    } catch {
      // Ignore
    }
  });

  afterEach(() => {
    window.location = originalLocation;
    try {
      localStorage.clear();
    } catch {
      // Ignore
    }
  });

  it('renders 500 error code, Avengers title, recovery buttons, and error telemetry', () => {
    renderWithTheme('avengers');

    expect(screen.getByText('500')).toBeDefined();
    expect(
      screen.getByText('Shield Failure / System Malfunction'),
    ).toBeDefined();
    expect(
      screen.getByText(
        /An unexpected error occurred in the Helicarrier systems/i,
      ),
    ).toBeDefined();
    expect(
      screen.getByText(/ERROR_CODE: AVENGERS_500_SYSTEM_MALFUNCTION/i),
    ).toBeDefined();
    expect(screen.getByRole('button', { name: /try again/i })).toBeDefined();
    expect(
      screen.getByRole('button', { name: /return to base/i }),
    ).toBeDefined();
    expect(
      screen.getByRole('button', { name: /go back - go back/i }),
    ).toBeDefined();
  });

  it('adapts visuals, copy, and runes for God of War theme', () => {
    renderWithTheme('godofwar');

    expect(screen.getByText('500')).toBeDefined();
    expect(
      screen.getByText('Bifrost Shattered / Ragnarok Unleashed'),
    ).toBeDefined();
    expect(screen.getByText(/The Bifrost has shattered/i)).toBeDefined();
    expect(
      screen.getByText(/ERROR_RUNE: RAGNAROK_500_BIFROST_SHATTERED/i),
    ).toBeDefined();
    expect(
      screen.getByRole('button', { name: /return to hall/i }),
    ).toBeDefined();
  });

  it('toggles collapsible technical error details when button is clicked', () => {
    renderWithTheme('avengers');

    const detailsButton = screen.getByRole('button', {
      name: /technical error details/i,
    });
    expect(detailsButton.getAttribute('aria-expanded')).toBe('false');
    expect(
      screen.queryByText(/Message: Simulated reactor meltdown/i),
    ).toBeNull();

    // Click to expand
    fireEvent.click(detailsButton);
    expect(detailsButton.getAttribute('aria-expanded')).toBe('true');
    expect(
      screen.getByText(/Message: Simulated reactor meltdown/i),
    ).toBeDefined();

    // Click to collapse
    fireEvent.click(detailsButton);
    expect(detailsButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('safely extracts error details from plain string and object errors', () => {
    vi.mocked(ReactRouter.useRouteError).mockReturnValue(
      'Direct string kernel panic',
    );
    const { unmount } = renderWithTheme('avengers');

    const detailsButton = screen.getByRole('button', {
      name: /technical error details/i,
    });
    fireEvent.click(detailsButton);
    expect(
      screen.getByText(/Message: Direct string kernel panic/i),
    ).toBeDefined();

    unmount();

    // Object error with statusText
    vi.mocked(ReactRouter.useRouteError).mockReturnValue({
      statusText: '502 Bad Gateway from Proxy',
    });
    renderWithTheme('avengers');
    const detailsButton2 = screen.getByRole('button', {
      name: /technical error details/i,
    });
    fireEvent.click(detailsButton2);
    expect(
      screen.getByText(/Message: 502 Bad Gateway from Proxy/i),
    ).toBeDefined();
  });

  it('triggers window.location.reload when Try Again button is clicked', () => {
    renderWithTheme('avengers');

    const tryAgainBtn = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainBtn);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it('navigates to "/" when Return to Base button is clicked', () => {
    renderWithTheme('avengers');

    const homeBtn = screen.getByRole('button', { name: /return to base/i });
    fireEvent.click(homeBtn);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('gracefully handles missing ThemeContext by falling back to localStorage or default dark theme', () => {
    localStorage.setItem('portfolio-theme', 'godofwar');
    const { unmount } = render(<ErrorPage />);

    expect(
      screen.getByText('Bifrost Shattered / Ragnarok Unleashed'),
    ).toBeDefined();
    unmount();

    localStorage.removeItem('portfolio-theme');
    render(<ErrorPage />);
    expect(
      screen.getByText('Shield Failure / System Malfunction'),
    ).toBeDefined();
  });

  it('renders Apple translucent glass card styling and tactile buttons', () => {
    const { container } = renderWithTheme('avengers');

    const glassCard = container.querySelector('.backdrop-blur-xl.rounded-3xl');
    expect(glassCard).toBeDefined();
    expect(glassCard?.className).toContain('shadow-2xl');

    const tryAgainBtn = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainBtn.className).toContain('min-h-[44px]');
  });

  it('does not render CodeRain when prefers-reduced-motion is active', () => {
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

    const { container } = renderWithTheme('avengers');
    expect(screen.getByText('500')).toBeDefined();
    expect(container.querySelector('.motion-reduce\\:hidden')).toBeNull();
  });
});
