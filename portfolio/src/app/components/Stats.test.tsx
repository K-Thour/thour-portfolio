import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MotionConfig } from 'motion/react';
import { Stats } from './Stats';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

// Mock useInView so it triggers isInView = true by default in tests
vi.mock('motion/react', async () => {
  const actual = await vi.importActual<typeof import('motion/react')>('motion/react');
  return {
    ...actual,
    useInView: vi.fn().mockReturnValue(true),
  };
});

describe('Stats Component', () => {
  const mockUserData = {
    name: 'Karanveer Thour',
    email: 'karan@thour.com',
    image: '',
    experience: 7,
    completedProjects: 65,
    happyClients: 42,
    solvedProblems: 310,
    hobbies: ['Developer'],
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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderStats = (
    reducedMotion: 'always' | 'never' = 'always',
    customTheme = mockThemeContext,
    customUser = mockUserContext,
  ) => {
    return render(
      <MotionConfig reducedMotion={reducedMotion}>
        <ThemeContext.Provider value={customTheme}>
          <UserContext.Provider value={customUser}>
            <Stats />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </MotionConfig>,
    );
  };

  it('renders dynamic metrics from UserContext with reduced motion (instant value)', () => {
    renderStats('always');

    expect(screen.getByText('Years Experience')).toBeDefined();
    expect(screen.getByText('Completed Projects')).toBeDefined();
    expect(screen.getByText('Happy Clients')).toBeDefined();
    expect(screen.getByText('Solved Problems')).toBeDefined();

    expect(screen.getByText('7+')).toBeDefined();
    expect(screen.getByText('65+')).toBeDefined();
    expect(screen.getByText('42+')).toBeDefined();
    expect(screen.getByText('310+')).toBeDefined();
  });

  it('falls back to default metric values when UserContext data is missing', () => {
    const emptyUserContext = {
      userData: null,
      loading: false,
    };

    renderStats('always', mockThemeContext, emptyUserContext);

    expect(screen.getByText('5+')).toBeDefined();
    expect(screen.getByText('50+')).toBeDefined();
    expect(screen.getByText('30+')).toBeDefined();
    expect(screen.getByText('200+')).toBeDefined();
  });

  it('runs easeOutExpo count-up animation when reduced motion is disabled', () => {
    const activeCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      activeCallbacks.push(cb);
      return activeCallbacks.length;
    });

    renderStats('never');

    // Initially count is 0+
    expect(screen.getAllByText('0+')).toHaveLength(4);

    // Initial frame call (sets startTime = 100)
    act(() => {
      const cbs = activeCallbacks.splice(0, activeCallbacks.length);
      cbs.forEach((cb) => cb(100));
    });

    // Final frame call (timestamp = 1500, elapsed = 1400ms duration, progress = 1)
    act(() => {
      const cbs = activeCallbacks.splice(0, activeCallbacks.length);
      cbs.forEach((cb) => cb(1500));
    });

    // Target values reached
    expect(screen.getByText('7+')).toBeDefined();
    expect(screen.getByText('65+')).toBeDefined();
    expect(screen.getByText('42+')).toBeDefined();
    expect(screen.getByText('310+')).toBeDefined();
  });

  it('adapts styling according to dark (avengers) vs light (godofwar) theme', () => {
    // Dark mode
    const { container: darkContainer, unmount } = renderStats('always');
    const darkSection = darkContainer.querySelector('section');
    expect(darkSection?.className).toContain('bg-slate-900');

    const darkCards = screen.getAllByRole('listitem');
    expect(darkCards[0].className).toContain('border-white/10');
    expect(darkCards[0].className).toContain('backdrop-blur-xl');
    expect(darkCards[0].className).toContain('backdrop-saturate-[180%]');
    unmount();

    // Light mode
    const lightTheme = {
      theme: 'godofwar' as const,
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    };

    const { container: lightContainer } = renderStats('always', lightTheme);
    const lightSection = lightContainer.querySelector('section');
    expect(lightSection?.className).toContain('bg-gradient-to-br');

    const lightCards = screen.getAllByRole('listitem');
    expect(lightCards[0].className).toContain('border-black/10');
    expect(lightCards[0].className).toContain('bg-white/60');
  });

  it('satisfies semantic metrics list and accessibility attributes', () => {
    renderStats('always');

    const section = screen.getByRole('region', {
      name: /key developer metrics/i,
    });
    expect(section).toBeDefined();

    const list = screen.getByRole('list');
    expect(list).toBeDefined();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);

    expect(items[0].getAttribute('aria-label')).toBe('Years Experience: 7+');
    expect(items[1].getAttribute('aria-label')).toBe('Completed Projects: 65+');
    expect(items[2].getAttribute('aria-label')).toBe('Happy Clients: 42+');
    expect(items[3].getAttribute('aria-label')).toBe('Solved Problems: 310+');
  });

  it('renders safely without throwing when ThemeContext and UserContext are not provided', () => {
    expect(() => {
      render(
        <MotionConfig reducedMotion="always">
          <Stats />
        </MotionConfig>,
      );
    }).not.toThrow();

    expect(screen.getByText('Years Experience')).toBeDefined();
    expect(screen.getByText('5+')).toBeDefined();
  });
});
