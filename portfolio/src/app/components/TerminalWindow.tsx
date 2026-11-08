import { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Terminal, Code2, FileJson, Copy, Check } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

export type TerminalTabId = 'developer.ts' | 'mission.sh' | 'skills.json';

export interface TerminalWindowProps {
  delay?: number;
  className?: string;
  activeTab?: TerminalTabId;
  defaultTab?: TerminalTabId;
  onTabChange?: (tab: TerminalTabId) => void;
  isDark?: boolean;
}

interface Token {
  text: string;
  type:
    | 'keyword'
    | 'type'
    | 'property'
    | 'string'
    | 'number'
    | 'comment'
    | 'punctuation'
    | 'plain'
    | 'cmd'
    | 'flag'
    | 'variable';
}

interface CodeLine {
  tokens: Token[];
}

interface TabData {
  id: TerminalTabId;
  label: string;
  icon: typeof Code2;
  iconColor: string;
  language: string;
  rawCode: string;
  lines: CodeLine[];
}

const VALID_TABS: TerminalTabId[] = [
  'developer.ts',
  'mission.sh',
  'skills.json',
];

export function TerminalWindow({
  delay = 0,
  className = '',
  activeTab: controlledActiveTab,
  defaultTab = 'developer.ts',
  onTabChange,
  isDark: isDarkProp,
}: TerminalWindowProps) {
  // Direct top-level hook consumption without try...catch (React Rules of Hooks)
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);

  const isDark =
    isDarkProp !== undefined
      ? isDarkProp
      : themeContext?.theme === 'avengers';

  const userData = userContext?.userData;
  const userName = userData?.name || 'Karanveer Thour';
  const experience =
    typeof userData?.experience === 'number' ? userData.experience : 5;
  const completedProjects =
    typeof userData?.completedProjects === 'number'
      ? userData.completedProjects
      : 50;
  const happyClients =
    typeof userData?.happyClients === 'number' ? userData.happyClients : 30;

  const [internalActiveTab, setInternalActiveTab] = useState<TerminalTabId>(
    VALID_TABS.includes(defaultTab) ? defaultTab : 'developer.ts'
  );

  const rawActiveTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const currentTab: TerminalTabId = VALID_TABS.includes(rawActiveTab)
    ? rawActiveTab
    : 'developer.ts';

  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const safeUserName = JSON.stringify(userName);

  const tabs: Record<TerminalTabId, TabData> = useMemo(() => {
    return {
      'developer.ts': {
        id: 'developer.ts',
        label: 'developer.ts',
        icon: Code2,
        iconColor: isDark ? 'text-red-400' : 'text-blue-600',
        language: 'TypeScript',
        rawCode: `interface Developer {
  name: string;
  role: string;
  status: 'available' | 'building';
  experienceYears: number;
  coreStack: string[];
}

export const developer: Developer = {
  name: ${safeUserName},
  role: 'Full Stack Engineer & System Architect',
  status: 'available',
  experienceYears: ${experience},
  coreStack: [
    'React 19',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Tailwind CSS',
    'Motion'
  ],
};`,
        lines: [
          {
            tokens: [
              { text: 'interface', type: 'keyword' },
              { text: ' Developer ', type: 'type' },
              { text: '{', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  name: ', type: 'property' },
              { text: 'string', type: 'type' },
              { text: ';', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  role: ', type: 'property' },
              { text: 'string', type: 'type' },
              { text: ';', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  status: ', type: 'property' },
              { text: "'available'", type: 'string' },
              { text: ' | ', type: 'punctuation' },
              { text: "'building'", type: 'string' },
              { text: ';', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  experienceYears: ', type: 'property' },
              { text: 'number', type: 'type' },
              { text: ';', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  coreStack: ', type: 'property' },
              { text: 'string', type: 'type' },
              { text: '[]', type: 'punctuation' },
              { text: ';', type: 'punctuation' },
            ],
          },
          { tokens: [{ text: '}', type: 'punctuation' }] },
          { tokens: [{ text: '', type: 'plain' }] },
          {
            tokens: [
              { text: 'export', type: 'keyword' },
              { text: ' ', type: 'plain' },
              { text: 'const', type: 'keyword' },
              { text: ' developer: ', type: 'plain' },
              { text: 'Developer', type: 'type' },
              { text: ' = {', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  name: ', type: 'property' },
              { text: safeUserName, type: 'string' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  role: ', type: 'property' },
              { text: "'Full Stack Engineer & System Architect'", type: 'string' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  status: ', type: 'property' },
              { text: "'available'", type: 'string' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  experienceYears: ', type: 'property' },
              { text: `${experience}`, type: 'number' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  coreStack: [', type: 'property' },
            ],
          },
          {
            tokens: [
              { text: "    'React 19', 'TypeScript', 'Next.js',", type: 'string' },
            ],
          },
          {
            tokens: [
              { text: "    'Node.js', 'Tailwind CSS', 'Motion'", type: 'string' },
            ],
          },
          {
            tokens: [{ text: '  ],', type: 'punctuation' }],
          },
          { tokens: [{ text: '};', type: 'punctuation' }] },
        ],
      },
      'mission.sh': {
        id: 'mission.sh',
        label: 'mission.sh',
        icon: Terminal,
        iconColor: isDark ? 'text-yellow-400' : 'text-blue-500',
        language: 'Bash',
        rawCode: `#!/usr/bin/env bash
# Developer Mission Command Center
export DEVELOPER=${safeUserName}
export STATUS="OPERATIONAL"

# Initializing hero runtime parameters
echo "Running system pre-flight checks..."
pnpm install --frozen-lockfile
pnpm run build --mode production

# Verify 100% test coverage and zero vulnerabilities
pnpm test --run

# Execute zero-downtime deployment
deploy --target=production --region=global
echo "Mission Status: SUCCESS // Ready to save the world!"`,
        lines: [
          { tokens: [{ text: '#!/usr/bin/env bash', type: 'comment' }] },
          { tokens: [{ text: '# Developer Mission Command Center', type: 'comment' }] },
          {
            tokens: [
              { text: 'export', type: 'keyword' },
              { text: ' DEVELOPER=', type: 'plain' },
              { text: safeUserName, type: 'string' },
            ],
          },
          {
            tokens: [
              { text: 'export', type: 'keyword' },
              { text: ' STATUS=', type: 'plain' },
              { text: '"OPERATIONAL"', type: 'string' },
            ],
          },
          { tokens: [{ text: '', type: 'plain' }] },
          { tokens: [{ text: '# Initializing hero runtime parameters', type: 'comment' }] },
          {
            tokens: [
              { text: 'echo', type: 'cmd' },
              { text: ' "Running system pre-flight checks..."', type: 'string' },
            ],
          },
          {
            tokens: [
              { text: 'pnpm', type: 'cmd' },
              { text: ' install ', type: 'plain' },
              { text: '--frozen-lockfile', type: 'flag' },
            ],
          },
          {
            tokens: [
              { text: 'pnpm', type: 'cmd' },
              { text: ' run build ', type: 'plain' },
              { text: '--mode production', type: 'flag' },
            ],
          },
          { tokens: [{ text: '', type: 'plain' }] },
          {
            tokens: [
              { text: '# Verify 100% test coverage and zero vulnerabilities', type: 'comment' },
            ],
          },
          {
            tokens: [
              { text: 'pnpm', type: 'cmd' },
              { text: ' test ', type: 'plain' },
              { text: '--run', type: 'flag' },
            ],
          },
          { tokens: [{ text: '', type: 'plain' }] },
          {
            tokens: [
              { text: '# Execute zero-downtime deployment', type: 'comment' },
            ],
          },
          {
            tokens: [
              { text: 'deploy', type: 'cmd' },
              { text: ' ', type: 'plain' },
              { text: '--target=production', type: 'flag' },
              { text: ' ', type: 'plain' },
              { text: '--region=global', type: 'flag' },
            ],
          },
          {
            tokens: [
              { text: 'echo', type: 'cmd' },
              { text: ' "Mission Status: SUCCESS // Ready to save the world!"', type: 'string' },
            ],
          },
        ],
      },
      'skills.json': {
        id: 'skills.json',
        label: 'skills.json',
        icon: FileJson,
        iconColor: isDark ? 'text-emerald-400' : 'text-emerald-600',
        language: 'JSON',
        rawCode: `{
  "developer": ${safeUserName},
  "status": "Available for hire",
  "capabilities": {
    "frontend": ["React", "TypeScript", "Tailwind CSS", "Motion"],
    "backend": ["Node.js", "Express", "PostgreSQL", "REST APIs"],
    "architecture": ["Design Systems", "Web Performance", "Apple Glass UI"]
  },
  "metrics": {
    "completedProjects": ${completedProjects},
    "happyClients": ${happyClients},
    "uptime": "99.99%"
  }
}`,
        lines: [
          { tokens: [{ text: '{', type: 'punctuation' }] },
          {
            tokens: [
              { text: '  "developer": ', type: 'property' },
              { text: safeUserName, type: 'string' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '  "status": ', type: 'property' },
              { text: '"Available for hire"', type: 'string' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [{ text: '  "capabilities": {', type: 'property' }],
          },
          {
            tokens: [
              { text: '    "frontend": ', type: 'property' },
              { text: '["React", "TypeScript", "Tailwind CSS", "Motion"]', type: 'string' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '    "backend": ', type: 'property' },
              { text: '["Node.js", "Express", "PostgreSQL", "REST APIs"]', type: 'string' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '    "architecture": ', type: 'property' },
              { text: '["Design Systems", "Web Performance", "Apple Glass UI"]', type: 'string' },
            ],
          },
          { tokens: [{ text: '  },', type: 'punctuation' }] },
          {
            tokens: [{ text: '  "metrics": {', type: 'property' }],
          },
          {
            tokens: [
              { text: '    "completedProjects": ', type: 'property' },
              { text: `${completedProjects}`, type: 'number' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '    "happyClients": ', type: 'property' },
              { text: `${happyClients}`, type: 'number' },
              { text: ',', type: 'punctuation' },
            ],
          },
          {
            tokens: [
              { text: '    "uptime": ', type: 'property' },
              { text: '"99.99%"', type: 'string' },
            ],
          },
          { tokens: [{ text: '  }', type: 'punctuation' }] },
          { tokens: [{ text: '}', type: 'punctuation' }] },
        ],
      },
    };
  }, [safeUserName, experience, completedProjects, happyClients, isDark]);

  const activeTabData = tabs[currentTab] || tabs['developer.ts'];

  const handleSelectTab = (tabId: TerminalTabId) => {
    if (tabId !== currentTab) {
      setCopied(false);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = null;
      }
    }
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % VALID_TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + VALID_TABS.length) % VALID_TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = VALID_TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const nextTab = VALID_TABS[nextIndex];
    handleSelectTab(nextTab);
    const tabEl = document.getElementById(`tab-${nextTab}`);
    tabEl?.focus();
  };

  const executeCommandCopy = (text: string) => {
    if (typeof document !== 'undefined') {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (!success) {
        throw new Error('execCommand copy failed');
      }
    }
  };

  const handleCopy = async () => {
    const textToCopy = activeTabData.rawCode;
    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        try {
          await navigator.clipboard.writeText(textToCopy);
        } catch {
          // If writeText rejected (e.g. permission or un-focused document), fallback to execCommand
          executeCommandCopy(textToCopy);
        }
      } else {
        executeCommandCopy(textToCopy);
      }
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err);
    }
  };

  const getTokenClass = (type: Token['type']) => {
    switch (type) {
      case 'keyword':
        return isDark ? 'text-red-400 font-semibold' : 'text-blue-600 font-semibold';
      case 'type':
        return isDark ? 'text-yellow-300' : 'text-indigo-600';
      case 'property':
        return isDark ? 'text-sky-300' : 'text-sky-800';
      case 'string':
        return isDark ? 'text-emerald-300' : 'text-emerald-700';
      case 'number':
        return isDark ? 'text-amber-300' : 'text-amber-700';
      case 'comment':
        return isDark ? 'text-slate-400 italic' : 'text-slate-500 italic';
      case 'punctuation':
        return isDark ? 'text-slate-400' : 'text-slate-500';
      case 'cmd':
        return isDark ? 'text-red-400 font-semibold' : 'text-blue-700 font-semibold';
      case 'flag':
        return isDark ? 'text-yellow-400' : 'text-indigo-700';
      case 'variable':
        return isDark ? 'text-sky-300' : 'text-blue-800';
      case 'plain':
      default:
        return isDark ? 'text-slate-200' : 'text-slate-800';
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.2 }
          : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={`rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] shadow-2xl overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-slate-950/85 border-white/[0.12] text-slate-100 shadow-black/40'
          : 'bg-white/90 border-black/[0.08] text-slate-900 shadow-slate-300/40'
      } ${className}`}
    >
      {/* Terminal Header */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between border-b gap-3 flex-wrap sm:flex-nowrap ${
          isDark ? 'bg-slate-900/60 border-white/[0.08]' : 'bg-slate-100/80 border-black/[0.06]'
        }`}
      >
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2" aria-hidden="true">
          <div
            data-testid="traffic-light-red"
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-xs"
          />
          <div
            data-testid="traffic-light-yellow"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-xs"
          />
          <div
            data-testid="traffic-light-green"
            className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-xs"
          />
        </div>

        {/* Tab Pills with ARIA APG Arrow Key Navigation & min 44x44px touch targets */}
        <div
          role="tablist"
          aria-label="Terminal tabs"
          className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full"
        >
          {VALID_TABS.map((tabId, idx) => {
            const tab = tabs[tabId];
            const isActive = currentTab === tabId;
            return (
              <motion.button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`relative min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer select-none flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                  isActive
                    ? isDark
                      ? 'text-white'
                      : 'text-slate-900'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                } ${isDark ? 'focus-visible:ring-red-500' : 'focus-visible:ring-blue-500'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTerminalTabIndicator"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', bounce: 0, duration: 0.35 }
                    }
                    className={`absolute inset-0 rounded-lg ${
                      isDark
                        ? 'bg-slate-800/90 border border-white/10 shadow-sm'
                        : 'bg-white border border-black/10 shadow-sm'
                    }`}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <tab.icon className={`w-3.5 h-3.5 ${tab.iconColor}`} />
                  <span>{tab.label}</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Copy Button with >= 44x44px Touch Target */}
        <motion.button
          type="button"
          onClick={handleCopy}
          whileTap={{ scale: 0.97 }}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
          className={`min-w-[44px] min-h-[44px] px-3 py-1.5 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
            isDark
              ? 'bg-slate-800/70 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 focus-visible:ring-red-500'
              : 'bg-slate-100/90 border-black/10 text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 focus-visible:ring-blue-500'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-mono text-emerald-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-mono">Copy</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Terminal Content Panel with tabIndex={0} and overflow-y-auto */}
      <div
        role="tabpanel"
        id={`panel-${currentTab}`}
        aria-labelledby={`tab-${currentTab}`}
        tabIndex={0}
        className="p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto overflow-y-auto max-h-[340px] sm:max-h-[380px] leading-relaxed select-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50"
      >
        <pre className="m-0 p-0 font-mono">
          {activeTabData.lines.map((line, idx) => (
            <div key={idx} className="flex items-start">
              <span
                className={`select-none mr-4 text-right w-6 font-mono text-xs shrink-0 ${
                  isDark ? 'text-slate-600' : 'text-slate-400'
                }`}
                aria-hidden="true"
              >
                {idx + 1}
              </span>
              <span className="whitespace-pre">
                {line.tokens.map((token, tIdx) => (
                  <span key={tIdx} className={getTokenClass(token.type)}>
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>

        {/* Blinking Terminal Cursor */}
        <div className="flex items-center mt-2 pl-10" aria-hidden="true">
          <span
            data-testid="terminal-cursor"
            className={`inline-block w-2 h-4 ${
              isDark ? 'bg-red-500' : 'bg-blue-600'
            } ${shouldReduceMotion ? '' : 'animate-pulse motion-reduce:animate-none'}`}
          />
        </div>
      </div>

      {/* Terminal Status Bar Footer */}
      <div
        className={`px-4 py-2 border-t flex items-center justify-between text-[11px] font-mono select-none ${
          isDark
            ? 'bg-slate-900/40 border-white/[0.06] text-slate-400'
            : 'bg-slate-50/80 border-black/[0.04] text-slate-500'
        }`}
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span>status: ready</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>{activeTabData.language}</span>
          <span>branch: main</span>
        </div>
      </div>
    </motion.div>
  );
}
