import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChatBot } from './ChatBot';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import * as api from '../../../services/api';

vi.mock('../../../services/api', () => ({
  sendChatMessage: vi.fn(),
}));

describe('ChatBot Component (Story 6.2)', () => {
  const mockUserData = {
    name: 'Karanveer Thour',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(api.sendChatMessage).mockResolvedValue({
      reply: 'Here are details on **Next.js** and `TypeScript` architecture. Visit [/projects](/projects) for more.',
      source: 'gemini',
    });
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
              userData: mockUserData as any,
              loading: false,
              refreshUser: vi.fn(),
            }}
          >
            <ChatBot />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </MemoryRouter>,
    );
  };

  it('renders floating trigger button with accessible attributes', () => {
    renderWithProviders('avengers');

    const triggerBtn = screen.getByRole('button', { name: /Toggle AI Assistant/i });
    expect(triggerBtn).toBeDefined();
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('JARVIS AI')).toBeDefined();
  });

  it('adapts trigger button label for God of War theme', () => {
    renderWithProviders('godofwar');

    expect(screen.getByText('ASK AI')).toBeDefined();
  });

  it('expands chat sheet when trigger is clicked, displaying welcome message and prompt chips', () => {
    renderWithProviders('avengers');

    const triggerBtn = screen.getByRole('button', { name: /Toggle AI Assistant/i });
    fireEvent.click(triggerBtn);

    expect(triggerBtn.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('JARVIS AI Protocol')).toBeDefined();
    expect(screen.getByText(/Hello!/i)).toBeDefined();
    expect(screen.getByText('Core Tech Stack')).toBeDefined();
    expect(screen.getByText('Featured Projects')).toBeDefined();
    expect(screen.getByText('Work Experience')).toBeDefined();
    expect(screen.getByText('Hire / Contact Me')).toBeDefined();
  });

  it('closes chat window when header close button is clicked', () => {
    renderWithProviders('avengers');

    const triggerBtn = screen.getByRole('button', { name: /Toggle AI Assistant/i });
    fireEvent.click(triggerBtn);

    const closeBtn = screen.getByRole('button', { name: /Close chat/i });
    fireEvent.click(closeBtn);

    expect(triggerBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('clears conversation when reset conversation button is clicked', () => {
    renderWithProviders('avengers');

    const triggerBtn = screen.getByRole('button', { name: /Toggle AI Assistant/i });
    fireEvent.click(triggerBtn);

    const resetBtn = screen.getByRole('button', { name: /Clear chat/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText(/Conversation reset!/i)).toBeDefined();
  });

  it('dispatches inquiry when a quick prompt chip is clicked', async () => {
    renderWithProviders('avengers');

    const triggerBtn = screen.getByRole('button', { name: /Toggle AI Assistant/i });
    fireEvent.click(triggerBtn);

    const promptChip = screen.getByRole('button', { name: /Core Tech Stack/i });
    fireEvent.click(promptChip);

    await waitFor(() => {
      expect(api.sendChatMessage).toHaveBeenCalledWith(
        'What are your core technical skills and architecture strengths?',
        expect.any(Array),
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeDefined();
      expect(screen.getByText('TypeScript')).toBeDefined();
    });
  });

  it('sends user input message on Enter key or Send button click', async () => {
    renderWithProviders('avengers');

    const triggerBtn = screen.getByRole('button', { name: /Toggle AI Assistant/i });
    fireEvent.click(triggerBtn);

    const input = screen.getByPlaceholderText(/Ask anything about Karanveer Thour\.\.\./i);
    fireEvent.change(input, { target: { value: 'What databases do you specialize in?' } });

    const sendBtn = screen.getByRole('button', { name: /Send message/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(api.sendChatMessage).toHaveBeenCalledWith(
        'What databases do you specialize in?',
        expect.any(Array),
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeDefined();
    });
  });

  it('copies AI response to clipboard with confirmation checkmark', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    renderWithProviders('avengers');

    const triggerBtn = screen.getByRole('button', { name: /Toggle AI Assistant/i });
    fireEvent.click(triggerBtn);

    const copyBtn = screen.getByRole('button', { name: /Copy response welcome/i });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
      expect(screen.getByText('Copied!')).toBeDefined();
    });
  });

  it('handles backend AI error with fallback message', async () => {
    vi.mocked(api.sendChatMessage).mockRejectedValueOnce(new Error('Backend error'));

    renderWithProviders('avengers');

    const triggerBtn = screen.getByRole('button', { name: /Toggle AI Assistant/i });
    fireEvent.click(triggerBtn);

    const input = screen.getByPlaceholderText(/Ask anything about Karanveer Thour\.\.\./i);
    fireEvent.change(input, { target: { value: 'Will this trigger an error?' } });

    const sendBtn = screen.getByRole('button', { name: /Send message/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Sorry, I encountered an issue reaching the AI backend/i),
      ).toBeDefined();
    });
  });
});

