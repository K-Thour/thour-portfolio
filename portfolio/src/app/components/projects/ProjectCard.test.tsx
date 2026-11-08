import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';
import { ProjectCard, type ProjectItem } from './ProjectCard';

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

const sampleProject: ProjectItem = {
  id: 'test-proj',
  title: 'Quantum Ledger',
  subtitle: 'Distributed Database',
  description: 'Cryptographically secured immutable ledger engine.',
  image: 'https://example.com/quantum.png',
  tags: ['Rust', 'WebAssembly', 'Cryptography', 'Raft', 'RocksDB'],
  link: 'https://quantumledger.io',
  github: 'https://github.com/karan/quantum-ledger',
  status: 'Completed',
};

function renderCard(
  project = sampleProject,
  motionMode: 'always' | 'never' = 'never',
  theme = darkTheme,
) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <MemoryRouter>
          <ProjectCard project={project} index={0} />
        </MemoryRouter>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('ProjectCard Component', () => {
  it('renders title, subtitle, and description', () => {
    renderCard();
    expect(screen.getByText('Quantum Ledger')).toBeDefined();
    expect(screen.getByText('Distributed Database')).toBeDefined();
    expect(
      screen.getByText('Cryptographically secured immutable ledger engine.'),
    ).toBeDefined();
  });

  it('renders status badge', () => {
    renderCard();
    expect(screen.getByText('Completed')).toBeDefined();
  });

  it('renders technology tags with overflow count', () => {
    renderCard();
    expect(screen.getByText('Rust')).toBeDefined();
    expect(screen.getByText('WebAssembly')).toBeDefined();
    expect(screen.getByText('Cryptography')).toBeDefined();
    expect(screen.getByText('Raft')).toBeDefined();
    expect(screen.getByText('+1')).toBeDefined();
  });

  it('renders external action links with min 44x44px target and proper attributes', () => {
    renderCard();
    const githubLink = screen.getByLabelText('View Quantum Ledger source on GitHub');
    expect(githubLink.getAttribute('href')).toBe('https://github.com/karan/quantum-ledger');
    expect(githubLink.getAttribute('target')).toBe('_blank');
    expect(githubLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(githubLink.className).toContain('min-w-[44px]');
    expect(githubLink.className).toContain('min-h-[44px]');

    const demoLink = screen.getByLabelText('View Quantum Ledger live demo');
    expect(demoLink.getAttribute('href')).toBe('https://quantumledger.io');
    expect(demoLink.className).toContain('min-w-[44px]');
    expect(demoLink.className).toContain('min-h-[44px]');
  });

  it('links main card to the project case study detail route', () => {
    renderCard();
    const caseStudyLink = screen.getByRole('link', {
      name: /view case study for quantum ledger/i,
    });
    expect(caseStudyLink.getAttribute('href')).toBe('/projects/test-proj');
  });

  it('hides external links when URLs are # or empty', () => {
    renderCard({
      ...sampleProject,
      link: '#',
      github: '',
    });
    expect(screen.queryByLabelText('View Quantum Ledger source on GitHub')).toBeNull();
    expect(screen.queryByLabelText('View Quantum Ledger live demo')).toBeNull();
  });

  it('adapts styling in light theme', () => {
    renderCard(sampleProject, 'never', lightTheme);
    const card = screen.getByTestId('project-card-test-proj');
    expect(card.className).toContain('bg-white');
  });

  it('renders with reduced motion enabled', () => {
    renderCard(sampleProject, 'always');
    expect(screen.getByTestId('project-card-test-proj')).toBeDefined();
    expect(screen.getByText('Quantum Ledger')).toBeDefined();
  });
});

