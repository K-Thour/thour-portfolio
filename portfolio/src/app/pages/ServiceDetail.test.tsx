import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { ServiceDetail } from './ServiceDetail';

vi.mock('../../services/api', () => ({
  fetchServiceById: vi.fn(),
}));

import { fetchServiceById } from '../../services/api';

const mockServiceData = {
  _id: 'fullstack-dev',
  title: 'Full Stack Engineering',
  subtitle: 'Enterprise Architecture',
  description: 'Production-ready full-stack applications with React, Node, and Kubernetes.',
  longDescription: 'Comprehensive service overview detailing end-to-end architecture, API contracts, automated CI/CD pipelines, and observability.',
  pricing: '$8,000 / milestone',
  duration: '4-8 weeks',
  deliverables: [
    'Fully tested React frontend with 100% responsive coverage',
    'High throughput REST / GraphQL API with OpenAPI documentation',
    'Dockerized Kubernetes manifests and Helm charts',
  ],
  benefits: [
    'Accelerated time-to-market with zero technical debt',
    'Sub-100ms response times globally',
  ],
  features: [
    'Microservices architecture',
    'Real-time WebSocket streaming',
  ],
  technologies: [
    { _id: '1', name: 'React', category: 'Frontend' },
    { _id: '2', name: 'TypeScript', category: 'Language' },
    { _id: '3', name: 'Node.js', category: 'Backend' },
  ],
  process: [
    { title: 'Discovery & Architecture', description: 'Analyze requirements and define system boundaries.' },
    { title: 'Iterative Implementation', description: 'Two-week sprint delivery with automated testing.' },
  ],
};

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

const mockUserData = {
  name: 'Karanveer Thour',
  title: 'Senior Full Stack Developer',
};

function renderServiceDetail(
  serviceId = 'fullstack-dev',
  motionMode: 'always' | 'never' = 'never',
  theme = darkTheme,
) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={{ userData: mockUserData, setUserData: vi.fn(), loading: false } as any}>
          <MemoryRouter initialEntries={[`/services/${serviceId}`]}>
            <Routes>
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
            </Routes>
          </MemoryRouter>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('ServiceDetail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders skeleton loader while fetching service details', () => {
    (fetchServiceById as any).mockReturnValue(new Promise(() => {}));
    renderServiceDetail();
    expect(screen.getByTestId('service-skeleton')).toBeDefined();
  });

  it('renders service header, title, and overview after data resolves', async () => {
    (fetchServiceById as any).mockResolvedValue(mockServiceData);
    renderServiceDetail();
    await waitFor(() =>
      expect(screen.getByText('Full Stack Engineering')).toBeDefined(),
    );
    expect(screen.getByText('Enterprise Architecture')).toBeDefined();
    expect(screen.getByTestId('service-header')).toBeDefined();
  });

  it('renders long description and mission overview', async () => {
    (fetchServiceById as any).mockResolvedValue(mockServiceData);
    renderServiceDetail();
    await waitFor(() =>
      expect(screen.getByTestId('service-long-description')).toBeDefined(),
    );
    expect(
      screen.getByText(/Comprehensive service overview detailing end-to-end architecture/i),
    ).toBeDefined();
  });

  it('renders features, technologies, and key benefits', async () => {
    (fetchServiceById as any).mockResolvedValue(mockServiceData);
    renderServiceDetail();
    await waitFor(() =>
      expect(screen.getByTestId('service-features')).toBeDefined(),
    );
    expect(screen.getByText('Microservices architecture')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByTestId('service-benefits')).toBeDefined();
    expect(
      screen.getByText('Accelerated time-to-market with zero technical debt'),
    ).toBeDefined();
  });

  it('renders commercial terms cards (pricing, duration, deliverables)', async () => {
    (fetchServiceById as any).mockResolvedValue(mockServiceData);
    renderServiceDetail();
    await waitFor(() =>
      expect(screen.getByTestId('service-commercial-terms')).toBeDefined(),
    );
    expect(screen.getByTestId('service-pricing-card')).toBeDefined();
    expect(screen.getByText('$8,000 / milestone')).toBeDefined();
    expect(screen.getByTestId('service-duration-card')).toBeDefined();
    expect(screen.getByText('4-8 weeks')).toBeDefined();
    expect(screen.getByTestId('service-deliverables-card')).toBeDefined();
    expect(
      screen.getByText('Fully tested React frontend with 100% responsive coverage'),
    ).toBeDefined();
  });

  it('renders delivery roadmap and consultation CTA banner', async () => {
    (fetchServiceById as any).mockResolvedValue(mockServiceData);
    renderServiceDetail();
    await waitFor(() =>
      expect(screen.getByTestId('service-process')).toBeDefined(),
    );
    expect(screen.getByText('Discovery & Architecture')).toBeDefined();
    expect(screen.getByTestId('service-cta-banner')).toBeDefined();
    const ctaLink = screen.getByRole('link', { name: /initiate service consultation/i });
    expect(ctaLink.getAttribute('href')).toBe('/contact');
  });

  it('renders BackButton returning to services overview', async () => {
    (fetchServiceById as any).mockResolvedValue(mockServiceData);
    renderServiceDetail();
    await waitFor(() =>
      expect(screen.getByText('Back to Services')).toBeDefined(),
    );
  });

  it('renders "Service Not Found" empty state when service is null', async () => {
    (fetchServiceById as any).mockResolvedValue(null);
    renderServiceDetail('missing-id');
    await waitFor(() =>
      expect(screen.getByTestId('service-empty')).toBeDefined(),
    );
    expect(screen.getByText('Service Not Found')).toBeDefined();
  });

  it('renders "Service Not Found" when API throws error', async () => {
    (fetchServiceById as any).mockRejectedValue(new Error('Fetch failed'));
    renderServiceDetail('error-id');
    await waitFor(() =>
      expect(screen.getByTestId('service-empty')).toBeDefined(),
    );
    expect(screen.getByText('Service Not Found')).toBeDefined();
  });

  it('adapts styling in light theme', async () => {
    (fetchServiceById as any).mockResolvedValue(mockServiceData);
    renderServiceDetail('fullstack-dev', 'never', lightTheme);
    await waitFor(() =>
      expect(screen.getByText('Full Stack Engineering')).toBeDefined(),
    );
    const page = screen.getByTestId('service-detail-page');
    expect(page.className).toContain('from-slate-50');
  });

  it('renders with reduced motion enabled', async () => {
    (fetchServiceById as any).mockResolvedValue(mockServiceData);
    renderServiceDetail('fullstack-dev', 'always');
    await waitFor(() =>
      expect(screen.getByText('Full Stack Engineering')).toBeDefined(),
    );
    expect(screen.getByTestId('service-content')).toBeDefined();
  });
});

