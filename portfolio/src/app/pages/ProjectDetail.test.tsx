import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { ProjectDetail } from './ProjectDetail';

vi.mock('../../services/api', () => ({
  fetchProjectById: vi.fn(),
}));

import { fetchProjectById } from '../../services/api';

const mockDetailData = {
  _id: 'sample-project',
  title: 'Apex Cloud Telemetry',
  device: 'Distributed Architecture',
  description: 'Global distributed metric aggregator handling 100k req/sec.',
  fullDescription: 'Comprehensive case study detailing high concurrency architecture with gRPC, Kafka, and Redis clustering.',
  image: { url: 'https://example.com/apex.png' },
  outcome: 'Completed successfully',
  year: 2026,
  role: 'Principal Systems Architect',
  category: { name: 'Cloud Infrastructure', iconUrl: { url: 'https://example.com/cloud.png' } },
  techStack: [
    { _id: '1', name: 'Go', category: 'Backend' },
    { _id: '2', name: 'Kubernetes', category: 'DevOps' },
    { _id: '3', name: 'Kafka', category: 'Messaging' },
  ],
  workingUrl: 'https://apextelemetry.io',
  githubUrl: 'https://github.com/karan/apex-cloud',
  features: [
    'Sub-millisecond P99 telemetry ingestion',
    'Active-active multi-region failover',
  ],
  projectMetric: [
    { title: 'High Throughput Saturation', description: 'Solved via ring buffer memory pools and zero-copy JSON parsing.' },
  ],
  projectTestimonial: [
    'Reduced P99 telemetry latency from 140ms to 2.4ms across 12 datacenters.',
  ],
};

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

const mockUserData = {
  name: 'Karanveer Thour',
  title: 'Senior Full Stack Developer',
};

function renderDetail(
  projectId = 'sample-project',
  motionMode: 'always' | 'never' = 'never',
  theme = darkTheme,
) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={{ userData: mockUserData, setUserData: vi.fn(), loading: false } as any}>
          <MemoryRouter initialEntries={[`/projects/${projectId}`]}>
            <Routes>
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
            </Routes>
          </MemoryRouter>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('ProjectDetail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders skeleton loader while fetching project details', () => {
    (fetchProjectById as any).mockReturnValue(new Promise(() => {}));
    renderDetail();
    expect(screen.getByTestId('detail-skeleton')).toBeDefined();
  });

  it('renders full project case study after data resolves', async () => {
    (fetchProjectById as any).mockResolvedValue(mockDetailData);
    renderDetail();
    await waitFor(() =>
      expect(screen.getByText('Apex Cloud Telemetry')).toBeDefined(),
    );
    expect(screen.getByText('Distributed Architecture')).toBeDefined();
    expect(screen.getByText('Cloud Infrastructure')).toBeDefined();
    expect(screen.getByText('Principal Systems Architect')).toBeDefined();
  });

  it('renders mission overview full description', async () => {
    (fetchProjectById as any).mockResolvedValue(mockDetailData);
    renderDetail();
    await waitFor(() =>
      expect(screen.getByTestId('project-mission-overview')).toBeDefined(),
    );
    expect(
      screen.getByText(/Comprehensive case study detailing high concurrency architecture/i),
    ).toBeDefined();
  });

  it('renders key features and technologies', async () => {
    (fetchProjectById as any).mockResolvedValue(mockDetailData);
    renderDetail();
    await waitFor(() =>
      expect(screen.getByTestId('project-features')).toBeDefined(),
    );
    expect(screen.getByText('Sub-millisecond P99 telemetry ingestion')).toBeDefined();
    expect(screen.getByText('Go')).toBeDefined();
    expect(screen.getByText('Kubernetes')).toBeDefined();
    expect(screen.getByText('Kafka')).toBeDefined();
  });

  it('renders technical challenges and results', async () => {
    (fetchProjectById as any).mockResolvedValue(mockDetailData);
    renderDetail();
    await waitFor(() =>
      expect(screen.getByTestId('project-challenges')).toBeDefined(),
    );
    expect(screen.getByText('High Throughput Saturation')).toBeDefined();
    expect(screen.getByTestId('project-results')).toBeDefined();
    expect(
      screen.getByText(/Reduced P99 telemetry latency from 140ms to 2.4ms/i),
    ).toBeDefined();
  });

  it('renders BackButton returning to /projects', async () => {
    (fetchProjectById as any).mockResolvedValue(mockDetailData);
    renderDetail();
    await waitFor(() =>
      expect(screen.getByText('Back to Projects')).toBeDefined(),
    );
  });

  it('renders "Project Not Found" empty state when project does not exist', async () => {
    (fetchProjectById as any).mockResolvedValue(null);
    renderDetail('non-existent-id');
    await waitFor(() =>
      expect(screen.getByTestId('detail-empty')).toBeDefined(),
    );
    expect(screen.getByText('Project Not Found')).toBeDefined();
  });

  it('renders "Project Not Found" when API throws error', async () => {
    (fetchProjectById as any).mockRejectedValue(new Error('API error'));
    renderDetail('error-id');
    await waitFor(() =>
      expect(screen.getByTestId('detail-empty')).toBeDefined(),
    );
    expect(screen.getByText('Project Not Found')).toBeDefined();
  });

  it('adapts styling in light theme', async () => {
    (fetchProjectById as any).mockResolvedValue(mockDetailData);
    renderDetail('sample-project', 'never', lightTheme);
    await waitFor(() =>
      expect(screen.getByText('Apex Cloud Telemetry')).toBeDefined(),
    );
    const page = screen.getByTestId('project-detail-page');
    expect(page.className).toContain('from-slate-50');
  });

  it('renders with reduced motion enabled', async () => {
    (fetchProjectById as any).mockResolvedValue(mockDetailData);
    renderDetail('sample-project', 'always');
    await waitFor(() =>
      expect(screen.getByText('Apex Cloud Telemetry')).toBeDefined(),
    );
    expect(screen.getByTestId('detail-content')).toBeDefined();
  });
});

