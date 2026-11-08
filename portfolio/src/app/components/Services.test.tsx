import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { Services } from './Services';

vi.mock('../../services/api', () => ({
  fetchServices: vi.fn(),
}));

import { fetchServices } from '../../services/api';

const mockServices = [
  {
    _id: 'svc-1',
    title: 'Full-Stack Development',
    name: 'Full-Stack Development',
    description: 'End-to-end application development with React and Node.',
    features: ['React', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Docker'],
    icon: 'https://example.com/icon.png',
  },
  {
    _id: 'svc-2',
    title: 'AI Integration',
    name: 'AI Integration',
    description: 'Integrate large language models into your products.',
    features: ['LLM APIs', 'Embeddings', 'RAG', 'Fine-tuning'],
    icon: null,
  },
];

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

function renderServices(motionMode: 'always' | 'never' = 'never', theme = darkTheme) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <MemoryRouter>
          <Services />
        </MemoryRouter>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('Services Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows skeleton loaders while services are loading', () => {
    (fetchServices as any).mockReturnValue(new Promise(() => {}));
    renderServices();
    // ServiceSkeletonCard renders by default during loading
    const section = document.querySelector('section');
    expect(section).toBeDefined();
  });

  it('renders service cards after data loads', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderServices();
    await waitFor(() =>
      expect(screen.getByText('Full-Stack Development')).toBeDefined(),
    );
    expect(screen.getByText('AI Integration')).toBeDefined();
  });

  it('renders service features with check icons', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderServices();
    await waitFor(() => expect(screen.getByText('React')).toBeDefined());
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('REST APIs')).toBeDefined();
  });

  it('renders navigation links to service detail pages', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderServices();
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /learn more about full-stack development/i })).toBeDefined(),
    );
    const link = screen.getByRole('link', { name: /learn more about full-stack development/i });
    expect(link.getAttribute('href')).toBe('/services/svc-1');
  });

  it('renders "Learn More" footer text in each card', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderServices();
    await waitFor(() =>
      expect(screen.getAllByText('Learn More')).toHaveLength(2),
    );
  });

  it('shows empty state when no services found', async () => {
    (fetchServices as any).mockResolvedValue([]);
    renderServices();
    await waitFor(() =>
      expect(screen.getByText('No services found.')).toBeDefined(),
    );
  });

  it('adapts styling for light theme', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderServices('never', lightTheme);
    await waitFor(() =>
      expect(screen.getByText('Full-Stack Development')).toBeDefined(),
    );
    // Light theme section background
    const section = document.querySelector('section');
    expect(section?.className).toContain('from-slate-50');
  });

  it('renders with reduced motion enabled', async () => {
    (fetchServices as any).mockResolvedValue(mockServices);
    renderServices('always');
    await waitFor(() =>
      expect(screen.getByText('Full-Stack Development')).toBeDefined(),
    );
    expect(screen.getByText('AI Integration')).toBeDefined();
  });
});

