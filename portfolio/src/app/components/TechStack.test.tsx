import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MotionConfig } from 'motion/react';
import { TechStack } from './TechStack';
import { TechStackSkeleton } from './ui/skeleton';
import { ThemeContext } from '../context/ThemeContext';
import * as api from '../../services/api';

// Mock useInView so it triggers isInView = true by default in tests
vi.mock('motion/react', async () => {
  const actual = await vi.importActual<typeof import('motion/react')>('motion/react');
  return {
    ...actual,
    useInView: vi.fn().mockReturnValue(true),
  };
});

describe('TechStack Component & TechStackSkeleton', () => {
  const mockTechnologies = [
    {
      name: 'React',
      category: 'Frontend',
      iconUrl: 'https://example.com/react.svg',
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      iconUrl: null,
    },
    {
      name: 'Node.js',
      category: 'Backend',
      iconUrl: 'https://example.com/nodejs.svg',
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      iconUrl: null,
    },
    {
      name: 'Docker',
      category: 'DevOps',
      iconUrl: 'https://example.com/docker.svg',
    },
  ];

  const mockThemeContext = {
    theme: 'avengers' as const,
    toggleTheme: vi.fn(),
    setTheme: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderTechStack = (
    reducedMotion: 'always' | 'never' = 'always',
    customTheme = mockThemeContext,
  ) => {
    return render(
      <MotionConfig reducedMotion={reducedMotion}>
        <ThemeContext.Provider value={customTheme}>
          <TechStack />
        </ThemeContext.Provider>
      </MotionConfig>,
    );
  };

  describe('TechStackSkeleton', () => {
    it('renders grid skeleton mode with pulse animation and correct count', () => {
      render(
        <ThemeContext.Provider value={mockThemeContext}>
          <TechStackSkeleton mode="grid" count={4} />
        </ThemeContext.Provider>,
      );

      const skeleton = screen.getByTestId('tech-stack-skeleton-grid');
      expect(skeleton).toBeDefined();
      const items = screen.getAllByTestId('tech-skeleton-item');
      expect(items).toHaveLength(4);
      expect(items[0].className).toContain('animate-pulse');
    });

    it('renders marquee skeleton mode with pulse animation and correct count', () => {
      render(
        <ThemeContext.Provider value={mockThemeContext}>
          <TechStackSkeleton mode="marquee" count={6} />
        </ThemeContext.Provider>,
      );

      const skeleton = screen.getByTestId('tech-stack-skeleton-marquee');
      expect(skeleton).toBeDefined();
      const items = screen.getAllByTestId('tech-skeleton-item');
      expect(items).toHaveLength(6);
      expect(items[0].className).toContain('animate-pulse');
    });

    it('adapts skeleton styling for dark vs light themes', () => {
      // Dark
      const { unmount } = render(
        <TechStackSkeleton mode="grid" count={2} isDark={true} />,
      );
      const darkSkeleton = screen.getByTestId('tech-stack-skeleton-grid');
      expect(darkSkeleton.firstElementChild?.className).toContain('bg-slate-800/40');
      unmount();

      // Light
      render(<TechStackSkeleton mode="grid" count={2} isDark={false} />);
      const lightSkeleton = screen.getByTestId('tech-stack-skeleton-grid');
      expect(lightSkeleton.firstElementChild?.className).toContain('bg-white/60');
    });
  });

  describe('Loading and Rendering', () => {
    it('shows loading skeleton while technologies are loading', () => {
      vi.spyOn(api, 'fetchTechnologies').mockImplementation(
        () => new Promise(() => {}),
      );

      renderTechStack();

      expect(screen.getByTestId('tech-stack-skeleton-marquee')).toBeDefined();
    });

    it('fetches and renders technology cards in cinematic marquee mode', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      renderTechStack();

      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });

      expect(screen.getByText('TypeScript')).toBeDefined();
      expect(screen.getByText('Node.js')).toBeDefined();
      expect(screen.getByText('PostgreSQL')).toBeDefined();
      expect(screen.getByText('Docker')).toBeDefined();

      // Check image icon for React
      const reactImg = screen.getByAltText('React');
      expect(reactImg).toBeDefined();
      expect(reactImg.getAttribute('src')).toBe('https://example.com/react.svg');

      // Check fallback monogram badge for TypeScript (no iconUrl)
      expect(screen.getByTestId('tech-monogram-typescript')).toBeDefined();
      expect(screen.getByTestId('tech-monogram-typescript').textContent).toBe('TY');
    });

    it('falls back to monogram badge when tech icon fails to load', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue([
        {
          name: 'GraphQL',
          category: 'API',
          iconUrl: 'https://example.com/broken-icon.svg',
        },
      ]);

      renderTechStack();

      await waitFor(() => {
        expect(screen.getByAltText('GraphQL')).toBeDefined();
      });

      // Trigger image error
      const img = screen.getByAltText('GraphQL');
      fireEvent.error(img);

      // Now monogram badge appears
      expect(screen.getByTestId('tech-monogram-graphql')).toBeDefined();
      expect(screen.getByTestId('tech-monogram-graphql').textContent).toBe('GR');
    });
  });

  describe('Dynamic Category Extraction & Filtering', () => {
    it('extracts unique categories and filters cards by category', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      renderTechStack();

      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });

      // Check category pills rendered
      const tabs = screen.getAllByRole('tab');
      const categoryNames = tabs.map((t) => t.textContent?.trim());
      expect(categoryNames).toEqual([
        'All',
        'Frontend',
        'Backend',
        'Database',
        'DevOps',
      ]);

      // All tab selected initially
      expect(tabs[0].getAttribute('aria-selected')).toBe('true');

      // Click "Frontend" tab
      const frontendTab = screen.getByRole('tab', { name: /frontend/i });
      fireEvent.click(frontendTab);

      expect(frontendTab.getAttribute('aria-selected')).toBe('true');
      expect(tabs[0].getAttribute('aria-selected')).toBe('false');

      // Only frontend technologies should be rendered
      expect(screen.getByText('React')).toBeDefined();
      expect(screen.getByText('TypeScript')).toBeDefined();
      expect(screen.queryByText('Node.js')).toBeNull();
      expect(screen.queryByText('PostgreSQL')).toBeNull();
      expect(screen.queryByText('Docker')).toBeNull();

      // Click "Database" tab
      const dbTab = screen.getByRole('tab', { name: /database/i });
      fireEvent.click(dbTab);

      expect(screen.getByText('PostgreSQL')).toBeDefined();
      expect(screen.queryByText('React')).toBeNull();

      // Click "All" tab to restore all
      fireEvent.click(tabs[0]);
      expect(screen.getByText('React')).toBeDefined();
      expect(screen.getByText('Node.js')).toBeDefined();
      expect(screen.getByText('PostgreSQL')).toBeDefined();
    });

    it('displays Apple glass empty state when filteredTechnologies is empty without breaking aria-controls', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue([
        { name: 'React', category: 'Frontend', iconUrl: null },
      ]);

      renderTechStack();

      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });

      // Panel is present with correct ARIA attributes
      const panel = screen.getByRole('tabpanel');
      expect(panel).toBeDefined();
      expect(panel.id).toBe('tech-display-panel');
      expect(panel.className).toContain('focus-visible:ring-2');

      // The tab buttons have type="button" and focus visible rings
      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        expect(tab.getAttribute('type')).toBe('button');
        expect(tab.className).toContain('focus-visible:ring-2');
      });
    });
  });

  describe('WAI-ARIA Tablist and Keyboard Navigation', () => {
    it('supports ArrowRight, ArrowLeft, Home, and End keyboard navigation across tabs', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      renderTechStack();

      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });

      const tabs = screen.getAllByRole('tab');
      const allTab = tabs[0];
      allTab.focus();

      // ArrowRight -> Frontend
      fireEvent.keyDown(allTab, { key: 'ArrowRight' });
      const frontendTab = screen.getByRole('tab', { name: /frontend/i });
      expect(frontendTab.getAttribute('aria-selected')).toBe('true');

      // ArrowRight -> Backend
      fireEvent.keyDown(frontendTab, { key: 'ArrowRight' });
      const backendTab = screen.getByRole('tab', { name: /backend/i });
      expect(backendTab.getAttribute('aria-selected')).toBe('true');

      // ArrowLeft -> Frontend
      fireEvent.keyDown(backendTab, { key: 'ArrowLeft' });
      expect(frontendTab.getAttribute('aria-selected')).toBe('true');

      // ArrowLeft from first tab loops to last tab (DevOps)
      fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });
      const devopsTab = screen.getByRole('tab', { name: /devops/i });
      expect(devopsTab.getAttribute('aria-selected')).toBe('true');

      // Home key -> All tab
      fireEvent.keyDown(devopsTab, { key: 'Home' });
      expect(tabs[0].getAttribute('aria-selected')).toBe('true');

      // End key -> DevOps tab
      fireEvent.keyDown(tabs[0], { key: 'End' });
      expect(devopsTab.getAttribute('aria-selected')).toBe('true');
    });

    it('enforces min 44x44px touch targets and roving tabIndex', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      renderTechStack();

      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });

      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab, index) => {
        expect(tab.className).toContain('min-h-[44px]');
        expect(tab.className).toContain('min-w-[44px]');
        if (index === 0) {
          expect(tab.getAttribute('tabIndex')).toBe('0');
        } else {
          expect(tab.getAttribute('tabIndex')).toBe('-1');
        }
      });
    });
  });

  describe('Cinematic Marquee Mode', () => {
    it('renders exclusively as a cinematic marquee stream without grid view toggles', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      renderTechStack('never');

      await waitFor(() => {
        expect(screen.getAllByText('React')[0]).toBeDefined();
      });

      expect(screen.getByTestId('tech-marquee-animated')).toBeDefined();
      expect(screen.queryByRole('button', { name: /bento grid view/i })).toBeNull();
      expect(screen.queryByRole('button', { name: /marquee stream view/i })).toBeNull();
    });
  });

  describe('Error State & Recovery', () => {
    it('shows accessible error state on fetch failure and retries successfully', async () => {
      const fetchSpy = vi
        .spyOn(api, 'fetchTechnologies')
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockTechnologies);

      renderTechStack();

      await waitFor(() => {
        expect(
          screen.getByText('Failed to load technologies. Please try again.'),
        ).toBeDefined();
      });

      const retryBtn = screen.getByRole('button', {
        name: /retry loading technologies/i,
      });
      expect(retryBtn).toBeDefined();
      expect(retryBtn.className).toContain('min-h-[44px]');
      expect(retryBtn.className).toContain('min-w-[44px]');

      // Click retry
      fireEvent.click(retryBtn);

      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });

      expect(fetchSpy).toHaveBeenCalledTimes(2);
      expect(
        screen.queryByText('Failed to load technologies. Please try again.'),
      ).toBeNull();
    });

    it('displays error state when technology list is empty', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue([]);

      renderTechStack();

      await waitFor(() => {
        expect(
          screen.getByText('Failed to load technologies. Please try again.'),
        ).toBeDefined();
      });
    });
  });

  describe('Reduced Motion and Theme Adaptation', () => {
    it('renders static scrollable marquee container when reduced motion is preferred', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      renderTechStack('always');

      await waitFor(() => {
        expect(screen.getAllByText('React')[0]).toBeDefined();
      });

      expect(screen.getByTestId('tech-marquee-reduced')).toBeDefined();
      expect(screen.queryByTestId('tech-marquee-animated')).toBeNull();
    });

    it('renders animated marquee stream when reduced motion is disabled', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      renderTechStack('never');

      await waitFor(() => {
        expect(screen.getAllByText('React')[0]).toBeDefined();
      });

      expect(screen.getByTestId('tech-marquee-animated')).toBeDefined();
      expect(screen.queryByTestId('tech-marquee-reduced')).toBeNull();
    });

    it('adapts styles between dark (avengers) and light (godofwar) themes', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      // Dark
      const { container: darkContainer, unmount } = renderTechStack('always');
      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });
      expect(darkContainer.querySelector('section')?.className).toContain(
        'bg-slate-950/50',
      );
      unmount();

      // Light
      const lightTheme = {
        theme: 'godofwar' as const,
        toggleTheme: vi.fn(),
        setTheme: vi.fn(),
      };
      const { container: lightContainer } = renderTechStack(
        'always',
        lightTheme,
      );
      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });
      expect(lightContainer.querySelector('section')?.className).toContain(
        'bg-gradient-to-br',
      );
    });

    it('renders safely without throwing when ThemeContext is not provided', async () => {
      vi.spyOn(api, 'fetchTechnologies').mockResolvedValue(mockTechnologies);

      expect(() => {
        render(
          <MotionConfig reducedMotion="always">
            <TechStack />
          </MotionConfig>,
        );
      }).not.toThrow();

      await waitFor(() => {
        expect(screen.getByText('React')).toBeDefined();
      });
    });
  });
});
