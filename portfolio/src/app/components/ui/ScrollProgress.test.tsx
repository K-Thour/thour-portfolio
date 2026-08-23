import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollProgress } from './ScrollProgress';
import { useTheme } from '../../context/ThemeContext';

vi.mock('../../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('ScrollProgress component', () => {
  const toggleThemeMock = vi.fn();
  const setThemeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders fixed progress bar with pointer-events-none and z-[60]', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<ScrollProgress />);
    const bar = screen.getByTestId('scroll-progress-bar');
    expect(bar).toBeDefined();
    expect(bar.className).toContain('fixed');
    expect(bar.className).toContain('top-0');
    expect(bar.className).toContain('pointer-events-none');
    expect(bar.className).toContain('z-[60]');
  });

  it('applies red/gold gradient in Avengers theme', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<ScrollProgress />);
    const bar = screen.getByTestId('scroll-progress-bar');
    expect(bar.className).toContain('from-red-600');
    expect(bar.className).toContain('via-yellow-500');
  });

  it('applies icy blue gradient in God of War theme', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'godofwar',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<ScrollProgress />);
    const bar = screen.getByTestId('scroll-progress-bar');
    expect(bar.className).toContain('from-blue-600');
    expect(bar.className).toContain('via-sky-400');
  });

  it('applies custom className if provided', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<ScrollProgress className="custom-scroll-bar" />);
    const bar = screen.getByTestId('scroll-progress-bar');
    expect(bar.className).toContain('custom-scroll-bar');
  });
});
