import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';
import { AboutMission } from './AboutMission';

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

function renderMission(motionMode: 'always' | 'never' = 'never', theme = darkTheme) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <AboutMission />
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('AboutMission Component', () => {
  it('renders mission card with quote and narrative text', () => {
    renderMission();
    expect(screen.getByTestId('about-mission')).toBeDefined();
    expect(
      screen.getByText('"Innovation Distinguishes Leaders from Followers"'),
    ).toBeDefined();
    expect(
      screen.getByText(/I believe in writing code that not only functions reliably at scale/i),
    ).toBeDefined();
  });

  it('renders all four engineering pillars', () => {
    renderMission();
    expect(screen.getByText('Continuous Learning')).toBeDefined();
    expect(screen.getByText('Problem Solver')).toBeDefined();
    expect(screen.getByText('Team Player')).toBeDefined();
    expect(screen.getByText('Excellence in Craft')).toBeDefined();
  });

  it('renders Norse quote and pillar labels in light theme', () => {
    renderMission('never', lightTheme);
    expect(
      screen.getByText('"The Axe Forgets, But The Tree Remembers"'),
    ).toBeDefined();
    expect(screen.getByText('Eternal Growth')).toBeDefined();
    expect(screen.getByText('Challenge Seeker')).toBeDefined();
    expect(screen.getByText('Brotherhood & Honor')).toBeDefined();
    expect(screen.getByText('Crafted for Eternity')).toBeDefined();
  });

  it('safely handles missing ThemeContext', () => {
    render(
      <MotionConfig reducedMotion="never">
        <AboutMission />
      </MotionConfig>,
    );
    expect(screen.getByTestId('about-mission')).toBeDefined();
  });

  it('renders with reduced motion enabled', () => {
    renderMission('always');
    expect(screen.getByTestId('about-mission')).toBeDefined();
  });
});

