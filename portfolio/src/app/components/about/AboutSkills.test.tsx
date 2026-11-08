import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';
import { AboutSkills } from './AboutSkills';

// Mock API
vi.mock('../../../services/api', () => ({
  fetchServices: vi.fn(),
}));

import { fetchServices } from '../../../services/api';

const mockServices = [
  {
    _id: 'svc-1',
    title: 'Cloud Architecture',
    name: 'Cloud Architecture',
    subtitle: 'Enterprise Scale',
    description: 'High-availability Kubernetes and distributed cloud architectures.',
    features: ['Multi-region active-active', 'Zero-downtime deployment', 'Terraform IaC'],
    technologies: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    duration: '2-4 weeks',
    pricing: '$5,000+',
    icon: 'https://example.com/cloud.png',
  },
  {
    _id: 'svc-2',
    title: 'Full-Stack Engineering',
    name: 'Full-Stack Engineering',
    subtitle: 'Modern Web Apps',
    description: 'End-to-end web apps built with Next.js, React, Node, and TypeScript.',
    features: ['Server-side rendering', 'Real-time WebSockets'],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    duration: '3-6 weeks',
    pricing: '$4,000+',
    icon: null,
  },
];

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

function renderSkills(motionMode: 'always' | 'never' = 'never', theme = darkTheme) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <MemoryRouter>
          <AboutSkills />
        </MemoryRouter>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('AboutSkills Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeleton while fetching data', () => {
    (fetchServices as any).mockReturnValue(new Promise(() => {}));
    renderSkills();
    expect(screen.getByTestId('about-skills-skeleton')).toBeDefined();
  });

  it('renders skill cards after data loads', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderSkills();
    await waitFor(() =>
      expect(screen.getByText('Cloud Architecture')).toBeDefined(),
    );
    expect(screen.getByText('Full-Stack Engineering')).toBeDefined();
    expect(screen.getByText('Enterprise Scale')).toBeDefined();
  });

  it('renders highlights and technologies chips', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderSkills();
    await waitFor(() =>
      expect(screen.getByText('Multi-region active-active')).toBeDefined(),
    );
    expect(screen.getByText('Kubernetes')).toBeDefined();
    expect(screen.getByText('Terraform')).toBeDefined();
  });

  it('renders duration and pricing metadata in card footer', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderSkills();
    await waitFor(() =>
      expect(screen.getByText('2-4 weeks')).toBeDefined(),
    );
    expect(screen.getByText('$5,000+')).toBeDefined();
  });

  it('supports keyboard navigation via Enter and Space keys', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderSkills();
    await waitFor(() =>
      expect(screen.getByText('Cloud Architecture')).toBeDefined(),
    );
    const card = screen.getByTestId('about-skill-card-0');
    expect(card.getAttribute('role')).toBe('link');
    expect(card.getAttribute('tabIndex')).toBe('0');

    // Trigger Enter key
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    // Trigger Space key
    fireEvent.keyDown(card, { key: ' ', code: 'Space' });
  });

  it('renders empty state when no services returned', async () => {
    (fetchServices as any).mockResolvedValue([]);
    renderSkills();
    await waitFor(() =>
      expect(screen.getByText('No skills or services found.')).toBeDefined(),
    );
  });

  it('adapts to light theme styling', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderSkills('never', lightTheme);
    await waitFor(() =>
      expect(screen.getByText('Cloud Architecture')).toBeDefined(),
    );
    const card = screen.getByTestId('about-skill-card-0');
    expect(card.className).toContain('bg-white');
  });

  it('renders with reduced motion enabled', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderSkills('always');
    await waitFor(() =>
      expect(screen.getByText('Cloud Architecture')).toBeDefined(),
    );
    expect(screen.getByTestId('about-skills-grid')).toBeDefined();
  });
});

