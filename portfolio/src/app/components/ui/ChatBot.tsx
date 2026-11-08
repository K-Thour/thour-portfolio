import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  User,
  Shield,
  Axe,
  ArrowRight,
  Copy,
  Check,
  Code2,
  Briefcase,
  Layers,
  Mail,
} from 'lucide-react';
import { Link } from 'react-router';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { sendChatMessage, type ChatMessage } from '../../../services/api';

interface FormattedMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

const CATEGORIZED_PROMPTS = [
  {
    label: 'Core Tech Stack',
    query: 'What are your core technical skills and architecture strengths?',
    icon: Layers,
  },
  {
    label: 'Featured Projects',
    query: 'Showcase your best production projects with architecture highlights',
    icon: Code2,
  },
  {
    label: 'Work Experience',
    query: 'Tell me about your software engineering experience and impact',
    icon: Briefcase,
  },
  {
    label: 'Hire / Contact Me',
    query: 'How can I get in touch or hire you for a consulting engagement?',
    icon: Mail,
  },
];

/**
 * Safe clipboard copy with fallback
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    if (typeof document !== 'undefined' && typeof document.execCommand === 'function') {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
    return false;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

/**
 * Parses markdown inline text with bolding, inline code chips, and plain text
 */
function formatInlineText(text: string, isDark: boolean, pIdx: number): React.ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={`b-${pIdx}-${idx}`} className="font-bold opacity-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={`c-${pIdx}-${idx}`}
          className={`font-mono text-xs px-1.5 py-0.5 rounded-md ${
            isDark
              ? 'bg-white/10 text-emerald-400 border border-white/10'
              : 'bg-black/5 text-emerald-600 border border-black/5'
          }`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

/**
 * Parses markdown with bolding, inline code chips, bullet points, and internal/external links
 */
export function MarkdownContent({ text, isDark }: { text: string; isDark: boolean }) {
  const formatParagraph = (paragraph: string, pIdx: number) => {
    // Process markdown links [label](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(paragraph)) !== null) {
      if (match.index > lastIndex) {
        const textSegment = paragraph.substring(lastIndex, match.index);
        parts.push(...formatInlineText(textSegment, isDark, pIdx));
      }
      const label = match[1];
      const url = match[2];
      const isInternal = url.startsWith('/');

      if (isInternal) {
        parts.push(
          <Link
            key={`link-${pIdx}-${match.index}`}
            to={url}
            className={`font-semibold underline inline-flex items-center gap-1 transition-colors px-1 py-0.5 rounded-md ${
              isDark
                ? 'text-yellow-400 hover:text-yellow-300 bg-yellow-400/10'
                : 'text-blue-600 hover:text-blue-800 bg-blue-50'
            }`}
          >
            {label}
            <ArrowRight className="w-3 h-3 inline" />
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={`link-${pIdx}-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold underline inline-flex items-center gap-1 transition-colors px-1 py-0.5 rounded-md ${
              isDark
                ? 'text-yellow-400 hover:text-yellow-300 bg-yellow-400/10'
                : 'text-blue-600 hover:text-blue-800 bg-blue-50'
            }`}
          >
            {label}
          </a>,
        );
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < paragraph.length) {
      const remaining = paragraph.substring(lastIndex);
      parts.push(...formatInlineText(remaining, isDark, pIdx));
    }

    return (
      <p key={pIdx} className="mb-2 last:mb-0 leading-relaxed">
        {parts}
      </p>
    );
  };

  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      renderedElements.push(
        <ul
          key={`ul-${renderedElements.length}`}
          className="list-disc pl-4 space-y-1.5 mb-2.5"
        >
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {formatParagraph(item, i)}
            </li>
          ))}
        </ul>,
      );
      currentList = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (
      trimmed.startsWith('•') ||
      trimmed.startsWith('-') ||
      trimmed.startsWith('* ')
    ) {
      const itemContent = trimmed.replace(/^[•\-*]\s*/, '');
      currentList.push(itemContent);
    } else if (trimmed === '') {
      flushList();
    } else {
      flushList();
      renderedElements.push(formatParagraph(line, renderedElements.length));
    }
  });
  flushList();

  return <div className="text-sm leading-relaxed">{renderedElements}</div>;
}

export function ChatBot() {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const userCtx = useContext(UserContext);
  const developerName = userCtx?.userData?.name || 'Karanveer Thour';

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const [messages, setMessages] = useState<FormattedMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hello! 👋 I'm **${developerName}'s AI Assistant**.\n\nI can provide verified insights on **${developerName}'s** architecture experience, ` +
        `core technical skills, production projects, and direct contact options. How may I assist you?`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mobile background scroll lock
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // When a new message arrives, scroll smoothly
  useEffect(() => {
    if (
      messages.length > 1 &&
      typeof latestMessageRef.current?.scrollIntoView === 'function'
    ) {
      latestMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [messages.length, loading]);

  const handleCopy = async (id: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    }
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || inputMessage).trim();
    if (!textToSend || loading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: FormattedMessage = {
      id: userMessageId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const historyContext: ChatMessage[] = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.content.slice(0, 4000),
        }));

      const res = await sendChatMessage(textToSend, historyContext);
      const fullReply =
        res.reply ||
        `I'm sorry, I couldn't process that. Feel free to connect with ${developerName} directly on /contact!`;
      const modelId = `model-${Date.now()}`;
      const timestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      setMessages((prev) => [
        ...prev,
        {
          id: modelId,
          role: 'model',
          content: fullReply,
          timestamp,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: FormattedMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        content: `Sorry, I encountered an issue reaching the AI backend. You can connect with **${developerName}** directly on the **/contact** page!`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: `Conversation reset! What else would you like to discover about **${developerName}**?`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`w-[380px] sm:w-[440px] max-w-[calc(100vw-24px)] h-[580px] max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border backdrop-blur-2xl mb-4 will-change-transform ${
              isDark
                ? 'bg-slate-950/90 border-white/[0.12] text-white shadow-black/60'
                : 'bg-white/95 border-black/[0.08] text-slate-800 shadow-slate-300/60'
            }`}
          >
            {/* Top Specular Hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            {/* Header */}
            <div
              className={`px-5 py-4 border-b flex items-center justify-between select-none relative z-10 ${
                isDark
                  ? 'bg-slate-900/80 border-white/[0.08]'
                  : 'bg-slate-50/90 border-black/[0.06]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                    isDark
                      ? 'bg-gradient-to-br from-red-600 to-amber-500 text-white shadow-red-950/40'
                      : 'bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-blue-500/20'
                  }`}
                >
                  {isDark ? (
                    <Shield className="w-5 h-5" />
                  ) : (
                    <Axe className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm tracking-tight">
                      {isDark ? 'JARVIS AI Protocol' : 'Mimir Realm Guide'}
                    </h3>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground opacity-75">
                    Gemini AI • Verified Portfolio Context
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title="Reset conversation"
                  aria-label="Clear chat"
                  className="p-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  aria-label="Close chat"
                  className="p-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Thread */}
            <div
              ref={scrollContainerRef}
              className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 scroll-smooth"
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const isLatest = idx === messages.length - 1;
                return (
                  <motion.div
                    key={msg.id}
                    ref={isLatest ? latestMessageRef : undefined}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${
                        isUser
                          ? isDark
                            ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : isDark
                            ? 'bg-slate-900 border border-white/10 text-red-400'
                            : 'bg-blue-100 border border-blue-200 text-blue-700'
                      }`}
                    >
                      {isUser ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </div>

                    {/* Bubble Container */}
                    <div className="flex flex-col group max-w-[82%]">
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-xs ${
                          isUser
                            ? isDark
                              ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-tr-xs shadow-red-950/30'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs shadow-blue-200'
                            : isDark
                              ? 'bg-slate-900/90 border border-white/[0.08] text-slate-100 rounded-tl-xs shadow-black/40'
                              : 'bg-slate-50 border border-black/[0.06] text-slate-800 rounded-tl-xs shadow-slate-100'
                        }`}
                      >
                        <MarkdownContent text={msg.content} isDark={isDark} />
                      </div>

                      {/* Footer: Timestamp & Copy button */}
                      <div
                        className={`flex items-center gap-2 mt-1 px-1 text-[10px] opacity-65 ${
                          isUser ? 'justify-end' : 'justify-between'
                        }`}
                      >
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-[10px]"
                            title="Copy response"
                            aria-label={`Copy response ${msg.id}`}
                          >
                            {copiedMessageId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500 font-medium">
                                  Copied!
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Shimmering Kinetic Wave Thinking State */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isDark
                        ? 'bg-slate-900 border border-white/10 text-red-400'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div
                    className={`rounded-2xl rounded-tl-xs px-4 py-3 border flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-slate-900/90 border-white/[0.08] text-red-400'
                        : 'bg-slate-50 border-black/[0.06] text-blue-600'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full bg-current animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-current animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-current animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                    <span className="text-xs font-mono ml-1.5 opacity-80">
                      Synthesizing...
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Categorized Quick Prompt Chips */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 sm:px-5 pb-3 pt-1">
                <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-2 opacity-75">
                  Suggested Inquiries
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIZED_PROMPTS.map((prompt, i) => {
                    const IconComponent = prompt.icon;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSend(prompt.query)}
                        className={`text-xs p-2.5 rounded-xl border flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left cursor-pointer shadow-xs ${
                          isDark
                            ? 'bg-slate-900/80 border-white/[0.08] hover:border-red-500/50 text-slate-200 hover:bg-slate-805'
                            : 'bg-blue-50/80 border-black/[0.06] hover:border-blue-400 text-blue-900 hover:bg-blue-100/60'
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        <span className="truncate font-medium">
                          {prompt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div
              className={`p-3 sm:p-4 border-t flex items-center gap-2.5 ${
                isDark
                  ? 'bg-slate-950/90 border-white/[0.08]'
                  : 'bg-slate-50/90 border-black/[0.06]'
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={1000}
                placeholder={`Ask anything about ${developerName}...`}
                disabled={loading}
                className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-2xl text-sm border focus:outline-none transition-colors shadow-xs ${
                  isDark
                    ? 'bg-slate-900 border-white/[0.08] focus:border-red-500 text-white placeholder-slate-500'
                    : 'bg-white border-black/[0.08] focus:border-blue-500 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || loading}
                aria-label="Send message"
                className={`min-h-[44px] min-w-[44px] p-3 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer shadow-md flex items-center justify-center ${
                  isDark
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 shadow-red-950/40'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/25'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full border shadow-2xl cursor-pointer transition-all duration-300 select-none ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-white/[0.12] text-white shadow-black/50 hover:border-red-500/60'
            : 'bg-gradient-to-r from-white via-blue-50 to-white border-black/[0.08] text-blue-700 shadow-blue-500/20 hover:border-blue-400'
        }`}
        title={isOpen ? 'Close AI Assistant' : 'Chat with AI Assistant'}
        aria-label="Toggle AI Assistant"
        aria-expanded={isOpen}
      >
        {/* Pulsing Ambient Halo */}
        <span
          className={`absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none ${
            isDark ? 'bg-red-500' : 'bg-blue-400'
          }`}
        />

        <div className="relative flex items-center gap-2">
          {isOpen ? (
            <X className="w-5 h-5 text-current" />
          ) : (
            <>
              {isDark ? (
                <Shield className="w-5 h-5 text-red-500 animate-pulse" />
              ) : (
                <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              )}
              <span className="font-bold text-xs tracking-wider">
                {isDark ? 'JARVIS AI' : 'ASK AI'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
}
