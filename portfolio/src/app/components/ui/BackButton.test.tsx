import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackButton } from './BackButton';
import { useTheme } from '../../context/ThemeContext';
import * as ReactRouter from 'react-router';

vi.mock('../../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

describe('BackButton component', () => {
  const navigateMock = vi.fn();
  const toggleThemeMock = vi.fn();
  const setThemeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ReactRouter.useNavigate).mockReturnValue(navigateMock);
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });
    // Default history state with history depth
    Object.defineProperty(window, 'history', {
      value: {
        state: { idx: 1 },
      },
      writable: true,
    });
  });

  it('renders with default "Back" label and arrow icon', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /go back - back/i });
    expect(button).toBeDefined();
    expect(screen.getByText('Back')).toBeDefined();
  });

  it('renders custom label when provided', () => {
    render(<BackButton label="Back to Projects" />);
    expect(screen.getByText('Back to Projects')).toBeDefined();
    expect(
      screen.getByRole('button', { name: /go back - back to projects/i }),
    ).toBeDefined();
  });

  it('navigates -1 when previous history exists (idx > 0)', () => {
    window.history.state.idx = 2;
    render(<BackButton fallbackPath="/projects" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  it('navigates to fallbackPath when direct entry without history (idx === 0)', () => {
    window.history.state.idx = 0;
    render(<BackButton fallbackPath="/projects" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/projects');
  });

  it('executes custom onClick callback if provided', () => {
    const customOnClick = vi.fn();
    render(<BackButton onClick={customOnClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(customOnClick).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  it('renders ghost variant styling when specified', () => {
    render(<BackButton variant="ghost" label="Close" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('text-slate-400');
  });

  it('applies God of War light theme styling when theme is godofwar', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'godofwar',
      toggleTheme: toggleThemeMock,
      setTheme: setThemeMock,
    });

    render(<BackButton />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-white/80');
  });
});
