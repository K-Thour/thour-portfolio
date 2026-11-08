import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { CursorGlow } from './CursorGlow';
import { useTheme } from '../../context/ThemeContext';

vi.mock('../../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('CursorGlow Component', () => {
  const toggleThemeMock = vi.fn();
  const setThemeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    // Default matchMedia mock: desktop, no reduced motion
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
  });

  it('renders fixed pointer follower and tracks mouse using hardware-accelerated translate3d', () => {
    render(<CursorGlow />);

    const container = screen.getByTestId('cursor-glow-container');
    expect(container).toBeDefined();
    expect(container.className).toContain('fixed');
    expect(container.className).toContain('pointer-events-none');
    expect(container.className).toContain('opacity-0');

    // Simulate mouse move
    act(() => {
      fireEvent.mouseMove(window, { clientX: 250, clientY: 350 });
    });

    expect(container.className).toContain('opacity-100');

    const core = screen.getByTestId('cursor-glow-core');
    expect(core.style.transform).toContain('translate3d(250px, 350px, 0)');
  });

  it('preserves imperative translate3d coordinates during hover state re-renders', () => {
    render(
      <div>
        <button data-testid="interactive-btn">Interactive</button>
        <CursorGlow />
      </div>,
    );

    const button = screen.getByTestId('interactive-btn');
    const core = screen.getByTestId('cursor-glow-core');

    // Move mouse over button to trigger hover re-render
    act(() => {
      fireEvent.mouseMove(button, { clientX: 345, clientY: 678 });
    });

    expect(core.className).toContain('w-44');
    expect(core.style.transform).toContain('translate3d(345px, 678px, 0)');
  });

  it('animates ambient spotlight using requestAnimationFrame with translate3d', () => {
    let rAFCallback: FrameRequestCallback | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rAFCallback = cb;
      return 123;
    });

    render(<CursorGlow />);

    act(() => {
      fireEvent.mouseMove(window, { clientX: 300, clientY: 400 });
      if (rAFCallback) {
        rAFCallback(performance.now());
      }
    });

    const ambient = screen.getByTestId('cursor-glow-ambient');
    expect(ambient.style.transform).toContain('translate3d(');
  });

  it('unmounts / returns null on touch devices', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('pointer: coarse'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<CursorGlow />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('cursor-glow-container')).toBeNull();
  });

  it('unmounts / returns null when prefers-reduced-motion is active', () => {
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

    const { container } = render(<CursorGlow />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('cursor-glow-container')).toBeNull();
  });

  it('dynamically unmounts when motion media query changes to prefers-reduced-motion', () => {
    const listeners: Record<string, ((e: any) => void)[]> = {};

    window.matchMedia = vi.fn().mockImplementation((query: string) => {
      listeners[query] = listeners[query] || [];
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event: string, cb: any) => {
          if (event === 'change') {
            listeners[query].push(cb);
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    render(<CursorGlow />);
    expect(screen.getByTestId('cursor-glow-container')).toBeDefined();

    // Dispatch change event on prefers-reduced-motion query
    act(() => {
      const motionCbs = listeners['(prefers-reduced-motion: reduce)'] || [];
      motionCbs.forEach((cb) => cb({ matches: true } as MediaQueryListEvent));
    });

    expect(screen.queryByTestId('cursor-glow-container')).toBeNull();
  });

  it('expands core halo on hover over interactive elements', () => {
    render(
      <div>
        <button data-testid="interactive-btn">Click Me</button>
        <div data-testid="non-interactive">Static Div</div>
        <CursorGlow />
      </div>,
    );

    const button = screen.getByTestId('interactive-btn');
    const nonInteractive = screen.getByTestId('non-interactive');
    const core = screen.getByTestId('cursor-glow-core');

    // Initially standard size
    expect(core.className).toContain('w-28');
    expect(core.className).toContain('h-28');

    // Move over button
    act(() => {
      fireEvent.mouseMove(button, {
        clientX: 100,
        clientY: 100,
      });
    });

    expect(core.className).toContain('w-44');
    expect(core.className).toContain('h-44');

    // Move away to generic div
    act(() => {
      fireEvent.mouseMove(nonInteractive, {
        clientX: 400,
        clientY: 400,
      });
    });

    expect(core.className).toContain('w-28');
    expect(core.className).toContain('h-28');
  });

  it('does not expand core halo on hover over disabled controls', () => {
    render(
      <div>
        <button disabled data-testid="disabled-btn">Disabled</button>
        <button aria-disabled="true" data-testid="aria-disabled-btn">Aria Disabled</button>
        <CursorGlow />
      </div>,
    );

    const disabledBtn = screen.getByTestId('disabled-btn');
    const ariaDisabledBtn = screen.getByTestId('aria-disabled-btn');
    const core = screen.getByTestId('cursor-glow-core');

    // Hover over disabled button
    act(() => {
      fireEvent.mouseMove(disabledBtn, { clientX: 100, clientY: 100 });
    });
    expect(core.className).toContain('w-28');
    expect(core.className).not.toContain('w-44');

    // Hover over aria-disabled button
    act(() => {
      fireEvent.mouseMove(ariaDisabledBtn, { clientX: 150, clientY: 150 });
    });
    expect(core.className).toContain('w-28');
    expect(core.className).not.toContain('w-44');
  });

  it('adapts ambient spotlight colors based on theme', () => {
    // Avengers Dark Mode
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    const { rerender } = render(<CursorGlow />);
    let ambient = screen.getByTestId('cursor-glow-ambient');
    expect(ambient.style.background).toContain('rgba(239, 68, 68');

    // God of War Light Mode
    vi.mocked(useTheme).mockReturnValue({
      theme: 'godofwar',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    rerender(<CursorGlow />);
    ambient = screen.getByTestId('cursor-glow-ambient');
    expect(ambient.style.background).toContain('rgba(37, 99, 235');
  });

  it('hides cursor glow on mouseleave and document visibility hidden', () => {
    render(<CursorGlow />);
    const container = screen.getByTestId('cursor-glow-container');

    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    });
    expect(container.className).toContain('opacity-100');

    act(() => {
      fireEvent(document, new Event('mouseleave'));
    });
    expect(container.className).toContain('opacity-0');

    act(() => {
      fireEvent(document, new Event('mouseenter'));
    });
    expect(container.className).toContain('opacity-100');

    // Document visibility change to hidden
    Object.defineProperty(document, 'hidden', { value: true, configurable: true });
    act(() => {
      fireEvent(document, new Event('visibilitychange'));
    });
    expect(container.className).toContain('opacity-0');
  });

  it('cleans up animation frame and event listeners on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<CursorGlow />);

    // Start animation loop by moving mouse
    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    });

    unmount();

    expect(cancelSpy).toHaveBeenCalled();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });
});
