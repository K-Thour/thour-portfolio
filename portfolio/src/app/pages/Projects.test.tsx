import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { Projects } from './Projects';

// Mock API
vi.mock('../../services/api', () => ({
  fetchProjects: vi.fn(),
}));

import { fetchProjects } from '../../services/api';

const mockProjects = [
  {
    _id: 'proj-1',
    title: 'CloudMesh Engine',
    subtitle: 'Distributed Systems',
    description: 'High-throughput mesh network for microservice telemetry.',
    image: { url: 'https://example.com/mesh.jpg' },
    techStack: [{ name: 'Go' }, { name: 'Rust' }, { name: 'gRPC' }],
    workingUrl: 'https://cloudmesh.io',
    githubUrl: 'https://github.com/karanveerthour/cloudmesh',
    isActive: true,
  },
  {
    _id: 'proj-2',
    title: 'Verve UI Kit',
    subtitle: 'Design System',
    description: 'Apple-grade fluid interface component kit for React.',
    image: null,
    techStack: ['React', 'TypeScript', 'TailwindCSS'],
    workingUrl: '#',
    githubUrl: '#',
    isActive: false,
  },
];

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

const mockUserData = {
  name: 'Karanveer Thour',
  title: 'Senior Full Stack Developer',
};

function renderProjects(motionMode: 'always' | 'never' = 'never', theme = darkTheme) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={{ userData: mockUserData, setUserData: vi.fn(), loading: false } as any}>
          <MemoryRouter>
            <Projects />
          </MemoryRouter>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('Projects Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders skeleton grid while loading data', () => {
    (fetchProjects as any).mockReturnValue(new Promise(() => {}));
    renderProjects();
    expect(screen.getByTestId('projects-skeleton-grid')).toBeDefined();
  });

  it('renders project cards after API responds', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() =>
      expect(screen.getByText('CloudMesh Engine')).toBeDefined(),
    );
    expect(screen.getByText('Verve UI Kit')).toBeDefined();
    expect(screen.getByText('Distributed Systems')).toBeDefined();
  });

  it('renders fallback projects when API fails', async () => {
    (fetchProjects as any).mockRejectedValue(new Error('Network failure'));
    renderProjects();
    await waitFor(() =>
      expect(screen.getByText('NeuroGrid AI Dashboard')).toBeDefined(),
    );
    expect(screen.getByText('Developer Portfolio OS')).toBeDefined();
  });

  it('renders ProjectsHeader with title and badge', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() =>
      expect(screen.getByTestId('projects-header')).toBeDefined(),
    );
    expect(screen.getByText('Featured Work & Case Studies')).toBeDefined();
  });

  it('renders ProjectsCta with conversion link', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects();
    await waitFor(() =>
      expect(screen.getByTestId('projects-cta')).toBeDefined(),
    );
    const link = screen.getByRole('link', { name: /start a project inquiry/i });
    expect(link.getAttribute('href')).toBe('/contact');
  });

  it('adapts styling in light theme', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects('never', lightTheme);
    await waitFor(() =>
      expect(screen.getByText('CloudMesh Engine')).toBeDefined(),
    );
    const page = screen.getByTestId('projects-page');
    expect(page.className).toContain('from-slate-50');
  });

  it('renders correctly with reduced motion enabled', async () => {
    (fetchProjects as any).mockResolvedValue(mockProjects);
    renderProjects('always');
    await waitFor(() =>
      expect(screen.getByText('CloudMesh Engine')).toBeDefined(),
    );
    expect(screen.getByTestId('projects-grid')).toBeDefined();
  });
});
