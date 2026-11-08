import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';
import { HomeFeaturedProjects } from './HomeFeaturedProjects';

// Mock API
vi.mock('../../../services/api', () => ({
  fetchProjects: vi.fn(),
}));

import { fetchProjects } from '../../../services/api';

const mockProjects = [
  {
    _id: 'proj-1',
    title: 'NeuroGrid',
    subtitle: 'AI Platform',
    description: 'An AI-powered dashboard for real-time data visualization.',
    image: { url: 'https://example.com/img1.jpg' },
    techStack: [{ name: 'React' }, { name: 'TypeScript' }, { name: 'Vite' }, { name: 'Node' }],
    workingUrl: 'https://neurogrid.dev',
    githubUrl: 'https://github.com/karan/neurogrid',
  },
  {
    _id: 'proj-2',
    title: 'PortfolioOS',
    subtitle: 'Portfolio App',
    description: 'A macOS-inspired developer portfolio.',
    image: { url: 'https://example.com/img2.jpg' },
    techStack: [{ name: 'Next.js' }, { name: 'TailwindCSS' }],
    workingUrl: '#',
    githubUrl: '#',
  },
  {
    _id: 'proj-3',
    title: 'APIForge',
    subtitle: 'API Gateway',
    description: 'High-throughput REST API management layer.',
    image: null,
    techStack: [],
    workingUrl: 'https://apiforge.io',
    githubUrl: '',
  },
];

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

function renderProjects(
  motionMode: 'always' | 'never' = 'never',
  theme = darkTheme,
) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <MemoryRouter>
          <HomeFeaturedProjects />
        </MemoryRouter>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('HomeFeaturedProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows skeleton loaders while projects are loading', async () => {
    (fetchProjects as any).mockReturnValue(new Promise(() => {}));
    renderProjects();
    const skeletons = screen.getAllByTestId('project-skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('renders project cards after data loads', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() =>
      expect(screen.getByText('NeuroGrid')).toBeDefined(),
    );
    expect(screen.getByText('PortfolioOS')).toBeDefined();
    expect(screen.getByText('APIForge')).toBeDefined();
  });

  it('renders section with subtitle, title, and explore link', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() => expect(screen.getByText('Featured Work')).toBeDefined());
    expect(screen.getByText('Explore All Projects')).toBeDefined();
    const exploreLink = screen.getByRole('link', { name: /explore all projects/i });
    expect(exploreLink.getAttribute('href')).toBe('/projects');
  });

  it('renders tech stack tags and +N overflow badge', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() => expect(screen.getByText('React')).toBeDefined());
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('Vite')).toBeDefined();
    expect(screen.getByText('+1')).toBeDefined();
  });

  it('renders GitHub and Live Demo action links with min touch target and aria-label', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() =>
      expect(screen.getByLabelText('View NeuroGrid source code on GitHub')).toBeDefined(),
    );
    const githubLink = screen.getByLabelText('View NeuroGrid source code on GitHub');
    expect(githubLink.getAttribute('href')).toBe('https://github.com/karan/neurogrid');
    expect(githubLink.getAttribute('target')).toBe('_blank');
    expect(githubLink.className).toContain('min-w-[44px]');
    expect(githubLink.className).toContain('min-h-[44px]');

    const demoLink = screen.getByLabelText('View NeuroGrid live demo');
    expect(demoLink.getAttribute('href')).toBe('https://neurogrid.dev');
  });

  it('does not render GitHub/Demo links when URLs are # or empty', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() => expect(screen.getByText('PortfolioOS')).toBeDefined());
    // proj-2 has both # - no links should appear for it
    expect(screen.queryByLabelText('View PortfolioOS source code on GitHub')).toBeNull();
    expect(screen.queryByLabelText('View PortfolioOS live demo')).toBeNull();
  });

  it('applies optical tracking to section heading', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() => expect(screen.getByText('NeuroGrid')).toBeDefined());
    const h2 = document.querySelector('h2');
    expect(h2?.className).toContain('tracking-tight');
  });

  it('renders with light theme styling', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects('never', lightTheme);
    await waitFor(() => expect(screen.getByText('NeuroGrid')).toBeDefined());
    const section = screen.getByTestId('featured-projects-section');
    expect(section.className).toContain('bg-white');
  });

  it('renders correctly with reduced motion enabled', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects('always');
    await waitFor(() => expect(screen.getByText('NeuroGrid')).toBeDefined());
    expect(screen.queryByTestId('projects-grid')).toBeDefined();
  });

  it('returns null when no projects available', async () => {
    (fetchProjects as any).mockResolvedValue([]);
    const { container } = renderProjects();
    await waitFor(() =>
      expect(container.firstChild).toBeNull(),
    );
  });
});

