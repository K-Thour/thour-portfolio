import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Contact } from './Contact';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import * as api from '../../services/api';

vi.mock('../../services/api', () => ({
  fetchActiveContact: vi.fn(),
  submitContactForm: vi.fn(),
  fetchPublicUser: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Contact Page (Story 6.1)', () => {
  const mockUserData = {
    name: 'Karanveer Thour',
    email: 'karan@example.com',
    phoneNumber: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    socialLinks: {
      github: 'https://github.com/testuser',
      linkedin: 'https://linkedin.com/in/testuser',
      twitter: 'https://twitter.com/testuser',
    },
  };

  const mockActiveContact = {
    address: '100 Silicon Way',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    email: 'contact@karanveer.com',
    phone: '+1 555-987-6543',
    availability: 'Mon - Fri • 9:00 AM - 6:00 PM PST',
    timezone: 'PST (UTC-8)',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(api.fetchActiveContact).mockResolvedValue(mockActiveContact);
    vi.mocked(api.submitContactForm).mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderWithProviders = (theme: 'avengers' | 'godofwar' = 'avengers') => {
    return render(
      <MemoryRouter>
        <ThemeContext.Provider
          value={{
            theme,
            setTheme: vi.fn(),
            toggleTheme: vi.fn(),
          }}
        >
          <UserContext.Provider
            value={{
              userData: mockUserData,
              loading: false,
              refreshUser: vi.fn(),
            }}
          >
            <Contact />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </MemoryRouter>,
    );
  };

  it('renders ContactHeader with title, description, and response time badge', () => {
    renderWithProviders('avengers');

    expect(screen.getByText(/Let's Build Something/i)).toBeDefined();
    expect(screen.getByText(/Legendary/i)).toBeDefined();
    expect(screen.getByText(/Response Time: Typically within 2 hours/i)).toBeDefined();
  });

  it('adapts ContactHeader for God of War theme', () => {
    renderWithProviders('godofwar');

    expect(screen.getByText(/Forge Your Vision with/i)).toBeDefined();
    expect(screen.getByText(/Precision/i)).toBeDefined();
    expect(screen.getByText(/Hall of Council/i)).toBeDefined();
  });

  it('renders direct contact channels and social profile links', async () => {
    renderWithProviders('avengers');

    await waitFor(() => {
      expect(screen.getByText('Direct Email')).toBeDefined();
      expect(screen.getByText('karan@example.com')).toBeDefined();
      expect(screen.getByText('+1 (555) 123-4567')).toBeDefined();
      expect(screen.getByText(/100 Silicon Way, San Francisco, CA, USA/i)).toBeDefined();
    });

    expect(screen.getByText('GitHub')).toBeDefined();
    expect(screen.getByText('LinkedIn')).toBeDefined();
    expect(screen.getByText('Twitter / X')).toBeDefined();
  });

  it('copies email to clipboard on copy button click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    renderWithProviders('avengers');

    await waitFor(() => {
      expect(screen.getByText('karan@example.com')).toBeDefined();
    });

    const copyBtn = screen.getByRole('button', { name: /Copy Direct Email/i });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('karan@example.com');
    });
  });

  it('validates required fields inline on empty submit', async () => {
    renderWithProviders('avengers');

    const submitBtn = screen.getByRole('button', { name: /Deploy Mission Inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeDefined();
      expect(screen.getByText('Email address is required')).toBeDefined();
      expect(screen.getByText('Message details are required')).toBeDefined();
    });

    expect(api.submitContactForm).not.toHaveBeenCalled();
  });

  it('validates email format and minimum message length', async () => {
    renderWithProviders('avengers');

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const messageInput = screen.getByLabelText(/Project Scope or Inquiry/i);

    fireEvent.change(nameInput, { target: { value: 'Tony Stark' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(messageInput, { target: { value: 'short' } });

    const submitBtn = screen.getByRole('button', { name: /Deploy Mission Inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeDefined();
      expect(
        screen.getByText('Please enter at least 10 characters describing your inquiry'),
      ).toBeDefined();
    });

    expect(api.submitContactForm).not.toHaveBeenCalled();
  });

  it('submits form successfully with valid inputs and resets form', async () => {
    renderWithProviders('avengers');

    const nameInput = screen.getByLabelText(/Your Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    const subjectInput = screen.getByLabelText(/Subject \/ Topic/i) as HTMLInputElement;
    const phoneInput = screen.getByLabelText(/Phone \/ Telegram/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Project Scope or Inquiry/i) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'Bruce Wayne' } });
    fireEvent.change(emailInput, { target: { value: 'bruce@wayne.corp' } });
    fireEvent.change(subjectInput, { target: { value: 'Cloud Architecture' } });
    fireEvent.change(phoneInput, { target: { value: '+1 555-0100' } });
    fireEvent.change(messageInput, {
      target: { value: 'Need enterprise React and Next.js development expertise.' },
    });

    const submitBtn = screen.getByRole('button', { name: /Deploy Mission Inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.submitContactForm).toHaveBeenCalledWith({
        name: 'Bruce Wayne',
        email: 'bruce@wayne.corp',
        subject: 'Cloud Architecture',
        mobileNumber: '+1 555-0100',
        description: 'Need enterprise React and Next.js development expertise.',
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Thank you! Your message has been received/i),
      ).toBeDefined();
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('displays error banner when submitContactForm API fails', async () => {
    vi.mocked(api.submitContactForm).mockRejectedValueOnce(new Error('Network error'));

    renderWithProviders('avengers');

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const messageInput = screen.getByLabelText(/Project Scope or Inquiry/i);

    fireEvent.change(nameInput, { target: { value: 'Bruce Wayne' } });
    fireEvent.change(emailInput, { target: { value: 'bruce@wayne.corp' } });
    fireEvent.change(messageInput, {
      target: { value: 'Valid inquiry message for consulting.' },
    });

    const submitBtn = screen.getByRole('button', { name: /Deploy Mission Inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to send message\. Please try again/i),
      ).toBeDefined();
    });
  });
});
