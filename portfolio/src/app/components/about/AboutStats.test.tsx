import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { AboutStats } from './AboutStats';

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

const mockUserData = {
  name: 'Karanveer Thour',
  completedProjects: 42,
  experience: 6,
  solvedProblems: 150,
};

function renderStats(
  motionMode: 'always' | 'never' = 'never',
  theme = darkTheme,
  userData: any = mockUserData,
) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={{ userData, setUserData: vi.fn() }}>
          <AboutStats />
        </UserContext.Provider>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('AboutStats Component', () => {
  it('renders all three stat cards with dynamic metrics from UserContext', () => {
    renderStats();
    expect(screen.getByTestId('about-stat-card-projects')).toBeDefined();
    expect(screen.getByTestId('about-stat-card-experience')).toBeDefined();
    expect(screen.getByTestId('about-stat-card-problems')).toBeDefined();

    expect(screen.getByTestId('about-stat-value-projects').textContent).toBe('42+');
    expect(screen.getByTestId('about-stat-value-experience').textContent).toBe('6+');
    expect(screen.getByTestId('about-stat-value-problems').textContent).toBe('150+');
  });

  it('renders fallback values when UserContext data is empty', () => {
    renderStats('never', darkTheme, null);
    expect(screen.getByTestId('about-stat-value-projects').textContent).toBe('50+');
    expect(screen.getByTestId('about-stat-value-experience').textContent).toBe('5+');
    expect(screen.getByTestId('about-stat-value-problems').textContent).toBe('100+');
  });

  it('renders dual-theme labels in Avengers dark mode', () => {
    renderStats();
    expect(screen.getByText('Projects Delivered')).toBeDefined();
    expect(screen.getByText('Years of Experience')).toBeDefined();
    expect(screen.getByText('Problems Solved')).toBeDefined();
  });

  it('renders dual-theme labels in Norse light mode', () => {
    renderStats('never', lightTheme);
    expect(screen.getByText('Victories Claimed')).toBeDefined();
    expect(screen.getByText('Years of Battle')).toBeDefined();
    expect(screen.getByText('Challenges Conquered')).toBeDefined();
  });

  it('applies optical tracking to metric values', () => {
    renderStats();
    const valueEl = screen.getByTestId('about-stat-value-projects');
    expect(valueEl.className).toContain('tracking-tight');
    expect((valueEl as HTMLElement).style.letterSpacing).toBe('-0.02em');
  });

  it('safely handles missing providers without crashing', () => {
    render(
      <MotionConfig reducedMotion="never">
        <AboutStats />
      </MotionConfig>,
    );
    expect(screen.getByTestId('about-stats-grid')).toBeDefined();
    expect(screen.getByTestId('about-stat-value-projects').textContent).toBe('50+');
  });

  it('renders with reduced motion enabled', () => {
    renderStats('always');
    expect(screen.getByTestId('about-stats-grid')).toBeDefined();
    expect(screen.getByTestId('about-stat-value-experience').textContent).toBe('6+');
  });
});

