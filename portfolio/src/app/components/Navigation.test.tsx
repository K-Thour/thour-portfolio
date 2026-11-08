import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router';
import { MotionConfig } from 'motion/react';
import { Navigation } from './Navigation';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

vi.mock('../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

vi.mock('../context/UserContext', () => ({
  useUser: vi.fn(),
}));

describe('Navigation Component', () => {
  const mockToggleTheme = vi.fn();
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: mockToggleTheme,
      setTheme: mockSetTheme,
    });
    vi.mocked(useUser).mockReturnValue({
      userData: {
        name: 'Karanveer Thour',
        email: 'karan@thour.com',
        image: '',
        experience: 5,
        completedProjects: 50,
        solvedProblems: 200,
        happyClients: 30,
        hobbies: ['Full Stack Developer'],
        languages: [],
      },
      loading: false,
    });
  });

  const renderNavigation = (initialPath = '/') => {
    return render(
      <MotionConfig reducedMotion="always">
        <MemoryRouter initialEntries={[initialPath]}>
          <Navigation />
        </MemoryRouter>
      </MotionConfig>,
    );
  };

  it('renders brand monogram, brand name and all desktop navigation items', () => {
    renderNavigation('/');

    // Brand name and initial
    expect(screen.getByText('Karanveer Thour')).toBeDefined();
    expect(screen.getByText('K')).toBeDefined();

    // Nav links
    expect(screen.getAllByRole('link', { name: /home/i })[0]).toBeDefined();
    expect(screen.getAllByRole('link', { name: /about/i })[0]).toBeDefined();
    expect(screen.getAllByRole('link', { name: /projects/i })[0]).toBeDefined();
    expect(screen.getAllByRole('link', { name: /contact/i })[0]).toBeDefined();
  });

  it('marks the active route with aria-current="page" and non-active links without aria-current', () => {
    renderNavigation('/projects');

    const links = screen.getAllByRole('link');
    const homeLink = links.find((l) => l.getAttribute('href') === '/');
    const aboutLink = links.find((l) => l.getAttribute('href') === '/about');
    const projectsLink = links.find((l) => l.getAttribute('href') === '/projects');
    const contactLink = links.find((l) => l.getAttribute('href') === '/contact');

    expect(projectsLink?.getAttribute('aria-current')).toBe('page');
    expect(homeLink?.getAttribute('aria-current')).toBeNull();
    expect(aboutLink?.getAttribute('aria-current')).toBeNull();
    expect(contactLink?.getAttribute('aria-current')).toBeNull();
  });

  it('verifies path boundary route matching (distinguishes sub-paths vs similar prefixes)', () => {
    // 1. Sub-path /projects/detail-1 should activate /projects
    const { unmount } = renderNavigation('/projects/detail-1');
    const subPathProjectsLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href') === '/projects');
    expect(subPathProjectsLink?.getAttribute('aria-current')).toBe('page');
    unmount();

    // 2. Sibling path /projects-archive should NOT activate /projects
    renderNavigation('/projects-archive');
    const siblingProjectsLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href') === '/projects');
    expect(siblingProjectsLink?.getAttribute('aria-current')).toBeNull();
  });

  it('applies dark theme translucent glass tokens in avengers mode', () => {
    renderNavigation('/');

    const nav = screen.getByRole('navigation', { name: 'Main Navigation' });
    const capsule = nav.querySelector('div.pointer-events-auto');

    expect(capsule).toBeDefined();
    expect(capsule?.className).toContain('relative');
    expect(capsule?.className).toContain('z-50');
    expect(capsule?.className).toContain('bg-slate-950/75');
    expect(capsule?.className).toContain('border-white/[0.12]');
  });

  it('applies light theme translucent glass tokens in godofwar mode', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'godofwar',
      toggleTheme: mockToggleTheme,
      setTheme: mockSetTheme,
    });

    renderNavigation('/');

    const nav = screen.getByRole('navigation', { name: 'Main Navigation' });
    const capsule = nav.querySelector('div.pointer-events-auto');

    expect(capsule).toBeDefined();
    expect(capsule?.className).toContain('relative');
    expect(capsule?.className).toContain('z-50');
    expect(capsule?.className).toContain('bg-white/80');
    expect(capsule?.className).toContain('border-black/[0.06]');
  });

  it('provides accessible min 44x44px touch targets on mobile menu toggle and correct aria-controls', () => {
    renderNavigation('/');

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toBeDefined();
    expect(menuButton.className).toContain('min-w-[44px]');
    expect(menuButton.className).toContain('min-h-[44px]');
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    // aria-controls should be null/undefined when closed
    expect(menuButton.getAttribute('aria-controls')).toBeNull();
  });

  it('opens mobile sheet drawer when hamburger button is clicked, sets aria-controls, and locks body scroll', () => {
    renderNavigation('/');

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    // After opening
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    expect(menuButton.getAttribute('aria-label')).toBe('Close menu');
    expect(menuButton.getAttribute('aria-controls')).toBe('mobile-navigation-drawer');
    expect(document.body.style.overflow).toBe('hidden');

    const drawer = screen.getByRole('dialog', { name: 'Mobile Navigation' });
    expect(drawer).toBeDefined();

    // Check items in drawer have >= 44px min height
    const mobileLinks = drawer.querySelectorAll('a');
    expect(mobileLinks.length).toBe(4);
    mobileLinks.forEach((link) => {
      expect(link.className).toContain('min-h-[44px]');
    });
  });

  it('closes mobile sheet drawer when hamburger button is clicked a second time', async () => {
    renderNavigation('/');

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    // First click -> open
    fireEvent.click(menuButton);
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    // Second click -> close
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
      expect(menuButton.getAttribute('aria-controls')).toBeNull();
      expect(screen.queryByRole('dialog', { name: 'Mobile Navigation' })).toBeNull();
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('auto-dismisses mobile drawer when a nav link is clicked', async () => {
    renderNavigation('/');

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    const drawer = screen.getByRole('dialog', { name: 'Mobile Navigation' });
    const aboutLink = drawer.querySelector('a[href="/about"]');
    expect(aboutLink).toBeDefined();

    if (aboutLink) {
      fireEvent.click(aboutLink);
    }

    await waitFor(() => {
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('dialog', { name: 'Mobile Navigation' })).toBeNull();
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('auto-dismisses mobile drawer when brand logo link is clicked', async () => {
    renderNavigation('/');

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    const brandLink = screen.getByRole('link', { name: /home page/i });
    fireEvent.click(brandLink);

    await waitFor(() => {
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('dialog', { name: 'Mobile Navigation' })).toBeNull();
    });
  });

  it('dismisses mobile drawer when backdrop scrim is clicked', async () => {
    renderNavigation('/');

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    const scrim = screen.getByTestId('mobile-drawer-scrim');
    expect(scrim).toBeDefined();

    fireEvent.click(scrim);

    await waitFor(() => {
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('dialog', { name: 'Mobile Navigation' })).toBeNull();
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('dismisses mobile drawer and restores focus on Escape key', async () => {
    renderNavigation('/');

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByRole('dialog', { name: 'Mobile Navigation' })).toBeDefined();

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('dialog', { name: 'Mobile Navigation' })).toBeNull();
    });
    expect(document.activeElement).toBe(menuButton);
  });

  it('auto-dismisses drawer when route changes without clicking nav links', async () => {
    let navigateFn!: (to: string) => void;

    function TestApp() {
      const navigate = useNavigate();
      navigateFn = navigate;
      return <Navigation />;
    }

    render(
      <MotionConfig reducedMotion="always">
        <MemoryRouter initialEntries={['/']}>
          <TestApp />
        </MemoryRouter>
      </MotionConfig>,
    );

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    // Programmatic route transition
    act(() => {
      navigateFn('/contact');
    });

    await waitFor(() => {
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('dialog', { name: 'Mobile Navigation' })).toBeNull();
    });
  });
});
