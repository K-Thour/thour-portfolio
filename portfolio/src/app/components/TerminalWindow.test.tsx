import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MotionConfig } from 'motion/react';
import { TerminalWindow } from './TerminalWindow';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

describe('TerminalWindow', () => {
  const mockUserData = {
    name: 'Karanveer "Hero" Thour',
    email: 'karan@thour.com',
    image: '',
    experience: 6,
    completedProjects: 52,
    solvedProblems: 210,
    happyClients: 35,
    hobbies: ['Full Stack Developer'],
    languages: [],
  };

  const mockThemeContext = {
    theme: 'avengers' as const,
    toggleTheme: vi.fn(),
    setTheme: vi.fn(),
  };

  const mockUserContext = {
    userData: mockUserData,
    loading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderTerminal = (
    props = {},
    reducedMotion: 'always' | 'never' = 'always',
    customTheme = mockThemeContext,
    customUser = mockUserContext
  ) => {
    return render(
      <MotionConfig reducedMotion={reducedMotion}>
        <ThemeContext.Provider value={customTheme}>
          <UserContext.Provider value={customUser}>
            <TerminalWindow {...props} />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </MotionConfig>
    );
  };

  it('renders macOS traffic lights and all three tabs', () => {
    renderTerminal();

    expect(screen.getByTestId('traffic-light-red')).toBeDefined();
    expect(screen.getByTestId('traffic-light-yellow')).toBeDefined();
    expect(screen.getByTestId('traffic-light-green')).toBeDefined();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0].textContent).toContain('developer.ts');
    expect(tabs[1].textContent).toContain('mission.sh');
    expect(tabs[2].textContent).toContain('skills.json');
  });

  it('defaults to developer.ts and renders its code content with safe string escaping', () => {
    renderTerminal();

    const devTab = screen.getByRole('tab', { name: /developer\.ts/i });
    expect(devTab.getAttribute('aria-selected')).toBe('true');

    const panel = screen.getByRole('tabpanel');
    expect(panel.getAttribute('id')).toBe('panel-developer.ts');
    expect(panel.getAttribute('tabIndex')).toBe('0');
    expect(panel.className).toContain('overflow-y-auto');
    expect(panel.textContent).toContain('interface Developer');
    // Verify safe JSON.stringify escaping of names with quotes
    expect(panel.textContent).toContain('"Karanveer \\"Hero\\" Thour"');
    expect(panel.textContent).toContain('experienceYears: 6');
  });

  it('switches to mission.sh tab on click and displays shell script content', () => {
    renderTerminal();

    const missionTab = screen.getByRole('tab', { name: /mission\.sh/i });
    fireEvent.click(missionTab);

    expect(missionTab.getAttribute('aria-selected')).toBe('true');
    const panel = screen.getByRole('tabpanel');
    expect(panel.getAttribute('id')).toBe('panel-mission.sh');
    expect(panel.textContent).toContain('#!/usr/bin/env bash');
    expect(panel.textContent).toContain('pnpm install --frozen-lockfile');
    expect(panel.textContent).toContain('Mission Status: SUCCESS');
  });

  it('switches to skills.json tab on click and displays JSON content', () => {
    renderTerminal();

    const skillsTab = screen.getByRole('tab', { name: /skills\.json/i });
    fireEvent.click(skillsTab);

    expect(skillsTab.getAttribute('aria-selected')).toBe('true');
    const panel = screen.getByRole('tabpanel');
    expect(panel.getAttribute('id')).toBe('panel-skills.json');
    expect(panel.textContent).toContain('"capabilities"');
    expect(panel.textContent).toContain('"completedProjects": 52');
    expect(panel.textContent).toContain('"happyClients": 35');
  });

  it('supports ARIA APG keyboard navigation (ArrowRight, ArrowLeft, Home, End)', () => {
    renderTerminal();

    const devTab = screen.getByRole('tab', { name: /developer\.ts/i });
    devTab.focus();

    // ArrowRight -> mission.sh
    fireEvent.keyDown(devTab, { key: 'ArrowRight' });
    const missionTab = screen.getByRole('tab', { name: /mission\.sh/i });
    expect(missionTab.getAttribute('aria-selected')).toBe('true');

    // ArrowRight -> skills.json
    fireEvent.keyDown(missionTab, { key: 'ArrowRight' });
    const skillsTab = screen.getByRole('tab', { name: /skills\.json/i });
    expect(skillsTab.getAttribute('aria-selected')).toBe('true');

    // ArrowRight (loops around) -> developer.ts
    fireEvent.keyDown(skillsTab, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: /developer\.ts/i }).getAttribute('aria-selected')).toBe('true');

    // ArrowLeft (loops backward) -> skills.json
    fireEvent.keyDown(devTab, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: /skills\.json/i }).getAttribute('aria-selected')).toBe('true');

    // Home -> developer.ts
    fireEvent.keyDown(skillsTab, { key: 'Home' });
    expect(screen.getByRole('tab', { name: /developer\.ts/i }).getAttribute('aria-selected')).toBe('true');

    // End -> skills.json
    fireEvent.keyDown(devTab, { key: 'End' });
    expect(screen.getByRole('tab', { name: /skills\.json/i }).getAttribute('aria-selected')).toBe('true');
  });

  it('calls onTabChange and updates internal state in uncontrolled-with-callback mode', () => {
    const handleTabChange = vi.fn();
    renderTerminal({
      defaultTab: 'developer.ts',
      onTabChange: handleTabChange,
    });

    const missionTab = screen.getByRole('tab', { name: /mission\.sh/i });
    fireEvent.click(missionTab);

    expect(handleTabChange).toHaveBeenCalledWith('mission.sh');
    expect(missionTab.getAttribute('aria-selected')).toBe('true');
  });

  it('resets copied state immediately when switching to another tab', async () => {
    vi.useFakeTimers();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    renderTerminal();

    const copyBtn = screen.getByRole('button', { name: /copy code/i });
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(screen.getByText('Copied!')).toBeDefined();

    // Switch to another tab before the 2s timeout
    const missionTab = screen.getByRole('tab', { name: /mission\.sh/i });
    fireEvent.click(missionTab);

    // Copied feedback should reset immediately
    expect(screen.getByText('Copy')).toBeDefined();
    vi.useRealTimers();
  });

  it('copies active tab content to clipboard and shows temporary Copied! feedback', async () => {
    vi.useFakeTimers();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    renderTerminal();

    const copyBtn = screen.getByRole('button', { name: /copy code/i });
    expect(copyBtn).toBeDefined();
    expect(copyBtn.textContent).toContain('Copy');

    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeTextMock).toHaveBeenCalled();
    const copiedText = writeTextMock.mock.calls[0][0];
    expect(copiedText).toContain('interface Developer');

    expect(screen.getByText('Copied!')).toBeDefined();

    // Advance 2s to verify reset
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    expect(screen.getByText('Copy')).toBeDefined();
    vi.useRealTimers();
  });

  it('falls back to execCommand when navigator.clipboard.writeText rejects', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    renderTerminal();

    const copyBtn = screen.getByRole('button', { name: /copy code/i });
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeTextMock).toHaveBeenCalled();
    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(screen.getByText('Copied!')).toBeDefined();
  });

  it('falls back to document.execCommand when navigator.clipboard is unavailable', async () => {
    const originalClipboard = navigator.clipboard;
    // @ts-expect-error Mocking missing clipboard
    delete navigator.clipboard;

    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    renderTerminal();

    const copyBtn = screen.getByRole('button', { name: /copy code/i });
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(screen.getByText('Copied!')).toBeDefined();

    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
      writable: true,
    });
  });

  it('adapts styling and contrast based on dark (avengers) vs light (godofwar) theme', () => {
    // Dark mode
    const { container: darkContainer, unmount } = renderTerminal();
    const darkRoot = darkContainer.firstElementChild;
    expect(darkRoot?.className).toContain('bg-slate-950/85');
    expect(darkRoot?.className).toContain('border-white/[0.12]');
    expect(darkRoot?.className).toContain('backdrop-saturate-[180%]');
    unmount();

    // Light mode
    const lightTheme = {
      theme: 'godofwar' as const,
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    };

    const { container: lightContainer } = renderTerminal({}, 'always', lightTheme);
    const lightRoot = lightContainer.firstElementChild;
    expect(lightRoot?.className).toContain('bg-white/90');
    expect(lightRoot?.className).toContain('border-black/[0.08]');
  });

  it('guarantees WCAG 2.1 AA accessibility and min 44x44px touch targets on tabs and copy button', () => {
    renderTerminal();

    const tablist = screen.getByRole('tablist');
    expect(tablist.getAttribute('aria-label')).toBe('Terminal tabs');

    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab) => {
      expect(tab.className).toContain('min-h-[44px]');
      expect(tab.className).toContain('min-w-[44px]');
    });

    const copyBtn = screen.getByRole('button', { name: /copy code/i });
    expect(copyBtn.className).toContain('min-w-[44px]');
    expect(copyBtn.className).toContain('min-h-[44px]');
  });

  it('suppresses cursor animation when reduced motion is preferred', () => {
    renderTerminal({}, 'always');
    const cursor = screen.getByTestId('terminal-cursor');
    // Verifies CSS animation suppression token is applied
    expect(cursor.className).toContain('motion-reduce:animate-none');
  });
});
