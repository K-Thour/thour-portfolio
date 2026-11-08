import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { NotFound } from './NotFound';
import { ThemeContext } from '../context/ThemeContext';
import * as ReactRouter from 'react-router';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

describe('NotFound page component', () => {
  const navigateMock = vi.fn();
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
        <NotFound />
      </ThemeContext.Provider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ReactRouter.useNavigate).mockReturnValue(navigateMock);
    try {
      localStorage.clear();
    } catch {
      // Ignore
    }

    // Default history with depth
    Object.defineProperty(window, 'history', {
      value: {
        state: { idx: 1 },
      },
      writable: true,
    });

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

  it('renders 404 code, Avengers title, shield icon, and error telemetry', () => {
    renderWithTheme('avengers');

    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Mission Not Found')).toBeDefined();
    expect(
      screen.getByText(/The page you're looking for has been snapped/i),
    ).toBeDefined();
    expect(screen.getByText(/ERROR_CODE: AVENGERS_404_NOT_FOUND/i)).toBeDefined();
  });

  it('adapts visuals, copy, and runes for God of War theme', () => {
    renderWithTheme('godofwar');

    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Path Lost in the Frost')).toBeDefined();
    expect(
      screen.getByText(/The path you seek is hidden in the eternal winter/i),
    ).toBeDefined();
    expect(
      screen.getByText(/ERROR_RUNE: RAGNAROK_404_PATH_LOST/i),
    ).toBeDefined();
    expect(screen.getByText('Return to Hall')).toBeDefined();
  });

  it('integrates standardized BackButton and navigates back in history', () => {
    window.history.state.idx = 2;
    renderWithTheme('avengers');

    const backBtn = screen.getByRole('button', { name: /go back - go back/i });
    expect(backBtn).toBeDefined();
    fireEvent.click(backBtn);

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  it('navigates to fallback root path via BackButton when no history exists', () => {
    window.history.state.idx = 0;
    renderWithTheme('avengers');

    const backBtn = screen.getByRole('button', { name: /go back - go back/i });
    fireEvent.click(backBtn);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('navigates home when Return to Base button is clicked', () => {
    renderWithTheme('avengers');

    const homeBtn = screen.getByRole('button', { name: /return to base/i });
    expect(homeBtn).toBeDefined();
    fireEvent.click(homeBtn);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('navigates to suggested pages when quick access links are clicked', () => {
    renderWithTheme('avengers');

    const aboutBtn = screen.getByRole('button', { name: 'About' });
    fireEvent.click(aboutBtn);
    expect(navigateMock).toHaveBeenCalledWith('/about');

    const projectsBtn = screen.getByRole('button', { name: 'Projects' });
    fireEvent.click(projectsBtn);
    expect(navigateMock).toHaveBeenCalledWith('/projects');

    const contactBtn = screen.getByRole('button', { name: 'Contact' });
    fireEvent.click(contactBtn);
    expect(navigateMock).toHaveBeenCalledWith('/contact');
  });

  it('applies Apple translucent glass card styling', () => {
    const { container } = renderWithTheme('avengers');

    const glassCard = container.querySelector('.backdrop-blur-xl.rounded-3xl');
    expect(glassCard).toBeDefined();
    expect(glassCard?.className).toContain('shadow-2xl');
  });

  it('suppresses CodeRain and snowflake particles when prefers-reduced-motion is active', () => {
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

    // In dark mode: CodeRain should be absent
    const { container: darkContainer, unmount } = renderWithTheme('avengers');
    expect(screen.getByText('404')).toBeDefined();
    expect(darkContainer.querySelector('.motion-reduce\\:hidden')).toBeNull();
    unmount();

    // In God of War mode: Snowflakes should be absent
    const { container: lightContainer } = renderWithTheme('godofwar');
    expect(lightContainer.querySelector('.lucide-snowflake')).toBeNull();
  });
});
