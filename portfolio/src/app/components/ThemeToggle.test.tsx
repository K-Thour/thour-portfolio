import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MotionConfig } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

vi.mock('../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle', () => {
  const toggleThemeMock = vi.fn();
  const setThemeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Avengers shield icon and correct accessibility attributes in dark mode', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    expect(button.getAttribute('title')).toBe('Switch to God of War theme');
    expect(button.getAttribute('aria-label')).toBe('Toggle theme');
    expect(button.getAttribute('aria-pressed')).toBe('false');

    // Min 44x44px touch targets
    expect(button.className).toContain('min-w-[44px]');
    expect(button.className).toContain('min-h-[44px]');
    expect(button.className).toContain('w-11');
    expect(button.className).toContain('h-11');
    expect(button.className).toContain('rounded-full');
    expect(button.className).toContain('focus-visible:ring-red-500');

    // Shield icon presence
    const svg = button.querySelector('svg');
    expect(svg).toBeDefined();
    expect(svg?.classList.contains('lucide-shield')).toBe(true);
  });

  it('renders God of War axe icon and correct accessibility attributes in light mode', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'godofwar',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    expect(button.getAttribute('title')).toBe('Switch to Avengers theme');
    expect(button.getAttribute('aria-label')).toBe('Toggle theme');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.className).toContain('focus-visible:ring-blue-500');

    // Axe icon presence
    const svg = button.querySelector('svg');
    expect(svg).toBeDefined();
    expect(svg?.classList.contains('lucide-axe')).toBe(true);
  });

  it('calls toggleTheme on user click', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard navigation and activation directly via Enter and Space keys', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    button.focus();
    expect(document.activeElement).toBe(button);

    // Standard button activation via Enter
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);

    // Standard button activation via Space
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(toggleThemeMock).toHaveBeenCalledTimes(2);
  });

  it('renders without errors when reduced motion is preferred', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(
      <MotionConfig reducedMotion="always">
        <ThemeToggle />
      </MotionConfig>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    const svg = button.querySelector('svg');
    expect(svg?.classList.contains('lucide-shield')).toBe(true);
  });

  it('triggers circular radial view transition when startViewTransition is supported', async () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    const animateMock = vi.fn().mockReturnValue({
      onfinish: null,
      oncancel: null,
    });
    document.documentElement.animate = animateMock;

    const startViewTransitionMock = vi.fn().mockImplementation((cb: () => void) => {
      cb();
      return {
        ready: Promise.resolve(),
        finished: Promise.resolve(),
      };
    });
    (document as any).startViewTransition = startViewTransitionMock;

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(startViewTransitionMock).toHaveBeenCalledTimes(1);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);

    // Allow promise microtasks to settle
    await Promise.resolve();
    await Promise.resolve();

    expect(animateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        clipPath: expect.arrayContaining([
          expect.stringContaining('circle(0px at'),
        ]),
      }),
      expect.objectContaining({
        duration: 720,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      }),
    );

    delete (document as any).startViewTransition;
  });
});
