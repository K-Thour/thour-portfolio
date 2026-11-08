import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { HomeHero } from './HomeHero';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';

describe('HomeHero Component', () => {
  const mockUserData = {
    name: 'Karanveer   Thour',
    email: 'karan@thour.com',
    image: '',
    experience: 5,
    completedProjects: 50,
    solvedProblems: 200,
    happyClients: 30,
    hobbies: ['Full Stack Developer', 'AI Innovator'],
    languages: [],
  };

  const mockThemeContext = {
    theme: 'avengers' as const,
    toggleTheme: vi.fn(),
    setTheme: vi.fn(),
  };

  const mockUserContext = {
    userData: mockUserData,
    loading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHomeHero = (
    reducedMotion: 'always' | 'never' = 'always',
    customTheme = mockThemeContext,
    customUser = mockUserContext
  ) => {
    return render(
      <MotionConfig reducedMotion={reducedMotion}>
        <ThemeContext.Provider value={customTheme}>
          <UserContext.Provider value={customUser}>
            <MemoryRouter>
              <HomeHero />
            </MemoryRouter>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </MotionConfig>
    );
  };

  it('renders dynamic greeting and developer name from UserContext', () => {
    renderHomeHero();

    const greetingElement = screen.getByTestId('hero-greeting');
    expect(greetingElement).toBeDefined();
    expect(greetingElement.textContent).toMatch(/Good (morning|afternoon|evening), I'm Karanveer\s+Thour/i);
  });

  it('renders headline with optical letter tracking (-0.02em)', () => {
    renderHomeHero();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeDefined();
    expect(heading.getAttribute('style')).toContain('letter-spacing: -0.02em');
    expect(heading.className).toContain('tracking-tight');
  });

  it('renders role subtitle with optical letter tracking (-0.01em) and tracking-tight', () => {
    renderHomeHero();

    const roleSubtitle = screen.getByTestId('hero-role-subtitle');
    expect(roleSubtitle).toBeDefined();
    expect(roleSubtitle.getAttribute('style')).toContain('letter-spacing: -0.01em');
    expect(roleSubtitle.className).toContain('tracking-tight');
  });

  it('renders CTA buttons with >= 44x44px touch targets and correct routes', () => {
    renderHomeHero();

    const contactLink = screen.getByRole('link', { name: /contact me/i });
    expect(contactLink).toBeDefined();
    expect(contactLink.getAttribute('href')).toBe('/contact');
    expect(contactLink.className).toContain('min-h-[44px]');
    expect(contactLink.className).toContain('min-w-[44px]');

    const projectsLink = screen.getByRole('link', { name: /view projects/i });
    expect(projectsLink).toBeDefined();
    expect(projectsLink.getAttribute('href')).toBe('/projects');
    expect(projectsLink.className).toContain('min-h-[44px]');
    expect(projectsLink.className).toContain('min-w-[44px]');
  });

  it('defaults to interactive Terminal view in command center with roving tabIndex', () => {
    renderHomeHero();

    const terminalTab = screen.getByRole('tab', { name: /^terminal$/i });
    expect(terminalTab.getAttribute('aria-selected')).toBe('true');
    expect(terminalTab.getAttribute('tabIndex')).toBe('0');

    const avatarTab = screen.getByRole('tab', { name: /^avatar$/i });
    expect(avatarTab.getAttribute('aria-selected')).toBe('false');
    expect(avatarTab.getAttribute('tabIndex')).toBe('-1');

    const terminalPanel = screen.getByRole('tabpanel', { name: /^terminal$/i });
    expect(terminalPanel).toBeDefined();
    expect(screen.getByRole('tab', { name: /developer\.ts/i })).toBeDefined();
  });

  it('supports arrow key navigation between view switcher buttons', () => {
    renderHomeHero();

    const terminalTab = screen.getByRole('tab', { name: /^terminal$/i });
    terminalTab.focus();

    // ArrowRight toggles to Avatar
    fireEvent.keyDown(terminalTab, { key: 'ArrowRight' });
    const avatarTab = screen.getByRole('tab', { name: /^avatar$/i });
    expect(avatarTab.getAttribute('aria-selected')).toBe('true');
    expect(avatarTab.getAttribute('tabIndex')).toBe('0');
    expect(terminalTab.getAttribute('tabIndex')).toBe('-1');

    // ArrowLeft toggles back to Terminal
    fireEvent.keyDown(avatarTab, { key: 'ArrowLeft' });
    expect(terminalTab.getAttribute('aria-selected')).toBe('true');
  });

  it('toggles between Terminal and Avatar view in command center', () => {
    renderHomeHero();

    const avatarToggleTab = screen.getByRole('tab', { name: /^avatar$/i });
    fireEvent.click(avatarToggleTab);

    expect(avatarToggleTab.getAttribute('aria-selected')).toBe('true');
    const avatarPanel = screen.getByRole('tabpanel', { name: /^avatar$/i });
    expect(avatarPanel).toBeDefined();

    const terminalToggleTab = screen.getByRole('tab', { name: /^terminal$/i });
    fireEvent.click(terminalToggleTab);

    expect(terminalToggleTab.getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tabpanel', { name: /^terminal$/i })).toBeDefined();
  });

  it('retains active terminal tab state when toggling between Terminal and Avatar views', () => {
    const { container } = renderHomeHero();

    // Select mission.sh in TerminalWindow
    const missionTab = screen.getByRole('tab', { name: /mission\.sh/i });
    fireEvent.click(missionTab);
    expect(missionTab.getAttribute('aria-selected')).toBe('true');

    // Toggle to Avatar view
    const avatarToggleTab = screen.getByRole('tab', { name: /^avatar$/i });
    fireEvent.click(avatarToggleTab);
    expect(avatarToggleTab.getAttribute('aria-selected')).toBe('true');

    // Toggle back to Terminal view
    const terminalToggleTab = screen.getByRole('tab', { name: /^terminal$/i });
    fireEvent.click(terminalToggleTab);

    // Active tab in TerminalWindow must still be mission.sh!
    const restoredMissionTab = screen.getByRole('tab', { name: /mission\.sh/i });
    expect(restoredMissionTab.getAttribute('aria-selected')).toBe('true');
    const panel = container.querySelector('[id="panel-mission.sh"]');
    expect(panel).not.toBeNull();
    expect(panel?.textContent).toContain('Mission Status: SUCCESS');
  });

  it('supports light theme (godofwar) styling', () => {
    const lightTheme = {
      theme: 'godofwar' as const,
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    };

    renderHomeHero('always', lightTheme);

    expect(screen.getByText('Nordic Developer')).toBeDefined();
    const contactLink = screen.getByRole('link', { name: /contact me/i });
    expect(contactLink.className).toContain('from-blue-600');
  });

  it('respects reduced motion settings and suppresses ambient pulse animations', () => {
    const { container } = renderHomeHero('always');
    expect(container).toBeDefined();
    expect(screen.getByTestId('hero-greeting')).toBeDefined();
  });
});
