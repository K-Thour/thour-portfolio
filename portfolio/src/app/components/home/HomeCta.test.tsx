import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { HomeCta } from './HomeCta';

const darkTheme = { theme: 'avengers' as const, toggleTheme: vi.fn() };
const lightTheme = { theme: 'godofwar' as const, toggleTheme: vi.fn() };

const mockUserData = {
  name: 'Karanveer Thour',
  email: 'hello@karanveerthour.com',
  experience: 5,
  completedProjects: 50,
  happyClients: 30,
  solvedProblems: 200,
};

function renderCta(
  motionMode: 'always' | 'never' = 'never',
  theme = darkTheme,
  userData: any = mockUserData,
) {
  return render(
    <MotionConfig reducedMotion={motionMode}>
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={{ userData, setUserData: vi.fn() }}>
          <MemoryRouter>
            <HomeCta />
          </MemoryRouter>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </MotionConfig>,
  );
}

describe('HomeCta Component', () => {
  it('renders section with available badge and heading', () => {
    renderCta();
    expect(screen.getByText('Available for New Projects')).toBeDefined();
    expect(screen.getByText(/Have a Project in Mind/i)).toBeDefined();
  });

  it('displays dynamic email from UserContext', () => {
    renderCta();
    const emailText = screen.getByTestId('cta-email-text');
    expect(emailText.textContent).toBe('hello@karanveerthour.com');
  });

  it('falls back to default email when userData has no email', () => {
    renderCta('never', darkTheme, { ...mockUserData, email: null });
    const emailText = screen.getByTestId('cta-email-text');
    expect(emailText.textContent).toBe('karan@thour.com');
  });

  it('falls back to default email when UserContext is not provided', () => {
    render(
      <MotionConfig reducedMotion="never">
        <ThemeContext.Provider value={darkTheme}>
          <MemoryRouter>
            <HomeCta />
          </MemoryRouter>
        </ThemeContext.Provider>
      </MotionConfig>,
    );
    const emailText = screen.getByTestId('cta-email-text');
    expect(emailText.textContent).toBe('karan@thour.com');
  });

  it('renders mailto link with correct email href', () => {
    renderCta();
    const emailLink = screen.getByTestId('cta-email-link');
    expect(emailLink.getAttribute('href')).toBe('mailto:hello@karanveerthour.com');
  });

  it('renders contact navigation link', () => {
    renderCta();
    const contactLink = screen.getByRole('link', { name: /start a conversation/i });
    expect(contactLink.getAttribute('href')).toBe('/contact');
  });

  it('meets min 44x44px touch target on CTA buttons', () => {
    renderCta();
    const contactLink = screen.getByRole('link', { name: /start a conversation/i });
    expect(contactLink.className).toContain('min-h-[44px]');

    const emailLink = screen.getByTestId('cta-email-link');
    expect(emailLink.className).toContain('min-h-[44px]');
  });

  it('applies optical tracking to heading', () => {
    renderCta();
    const h2 = document.querySelector('h2');
    expect(h2?.className).toContain('tracking-tight');
    expect((h2 as HTMLElement)?.style.letterSpacing).toBe('-0.02em');
  });

  it('renders with light (godofwar) theme', () => {
    renderCta('never', lightTheme);
    const section = screen.getByTestId('home-cta-section');
    expect(section).toBeDefined();
    // Light theme includes blue gradient CTA card
    const ctaCard = document.querySelector('.rounded-3xl');
    expect(ctaCard?.className).toContain('from-blue-600');
  });

  it('renders correctly with reduced motion enabled', () => {
    renderCta('always');
    expect(screen.getByText('Available for New Projects')).toBeDefined();
    const emailText = screen.getByTestId('cta-email-text');
    expect(emailText.textContent).toBe('hello@karanveerthour.com');
  });
});

