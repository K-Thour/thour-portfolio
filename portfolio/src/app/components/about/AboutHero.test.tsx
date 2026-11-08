import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';
import { AboutHero } from './AboutHero';

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

function renderHero(motionMode: 'always' | 'never' = 'never', theme = darkTheme) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <AboutHero />
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('AboutHero Component', () => {
  it('renders hero container and badge', () => {
    renderHero();
    expect(screen.getByTestId('about-hero')).toBeDefined();
    expect(screen.getByTestId('about-hero-badge')).toBeDefined();
    expect(screen.getByText('Tech Arsenal & Philosophy')).toBeDefined();
  });

  it('renders title with optical tracking', () => {
    renderHero();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Architecting with Precision');
    expect(heading.className).toContain('tracking-tight');
    expect((heading as HTMLElement).style.letterSpacing).toBe('-0.02em');
  });

  it('renders narrative body text', () => {
    renderHero();
    expect(
      screen.getByText(/Driven by engineering rigor and a passion for high-concurrency systems/i),
    ).toBeDefined();
  });

  it('adapts typography and badge for Norse/light theme', () => {
    renderHero('never', lightTheme);
    expect(screen.getByText("Warrior's Path & Codex")).toBeDefined();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Forging Enduring Systems');
    expect(
      screen.getByText(/Forged through complex engineering challenges/i),
    ).toBeDefined();
  });

  it('safely handles missing ThemeContext', () => {
    render(
      <MotionConfig reducedMotion="never">
        <AboutHero />
      </MotionConfig>,
    );
    expect(screen.getByTestId('about-hero')).toBeDefined();
    expect(screen.getByText('Architecting with Precision')).toBeDefined();
  });

  it('supports reduced motion without crashing', () => {
    renderHero('always');
    expect(screen.getByTestId('about-hero')).toBeDefined();
    expect(screen.getByText('Tech Arsenal & Philosophy')).toBeDefined();
  });
});

