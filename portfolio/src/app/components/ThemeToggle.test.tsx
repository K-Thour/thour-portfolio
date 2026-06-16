import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

vi.mock('../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle', () => {
  it('should render correct icon and call toggleTheme when clicked', () => {
    const toggleThemeMock = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'avengers',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button.getAttribute('title')).toBe('Switch to God of War theme');

    fireEvent.click(button);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
