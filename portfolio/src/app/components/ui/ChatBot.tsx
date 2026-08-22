import React, { useState, useEffect, useRef } from 'react';
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
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
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
    query: 'What are your core technical skills and tools?',
    icon: Layers,
  },
  {
    label: 'Featured Projects',
    query: 'Showcase your best projects with live demos',
    icon: Code2,
  },
  {
    label: 'Work Experience',
    query: 'Tell me about your software engineering experience',
    icon: Briefcase,
  },
  {
    label: 'Hire / Contact Me',
    query: 'How can I get in touch or hire you for a project?',
    icon: Mail,
  },
];

/**
 * Safe clipboard copy with fallback
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

/**
 * Parses markdown with bolding, inline code chips, bullet points, and internal links
 */
function MarkdownContent({ text, isDark }: { text: string; isDark: boolean }) {
  const formatParagraph = (paragraph: string, pIdx: number) => {
    // Process markdown links [label](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(paragraph)) !== null) {
      if (match.index > lastIndex) {
        parts.push(paragraph.substring(lastIndex, match.index));
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
      parts.push(paragraph.substring(lastIndex));
    }

    // Now format bold text (**text**) & inline code (`code`) inside string segments
    const renderedParts = parts.map((part, partIdx) => {
      if (typeof part !== 'string') return part;

      // Handle bold **text**
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const subParts = [];
      let subLastIdx = 0;
      let bMatch;

      while ((bMatch = boldRegex.exec(part)) !== null) {
        if (bMatch.index > subLastIdx) {
          subParts.push(part.substring(subLastIdx, bMatch.index));
        }
        subParts.push(
          <strong
            key={`bold-${partIdx}-${bMatch.index}`}
            className="font-bold text-foreground"
          >
            {bMatch[1]}
          </strong>,
        );
        subLastIdx = bMatch.index + bMatch[0].length;
      }
      if (subLastIdx < part.length) {
        subParts.push(part.substring(subLastIdx));
      }
      return subParts;
    });

    return (
      <p key={pIdx} className="mb-2 last:mb-0 leading-relaxed">
        {renderedParts}
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

  return <div className="text-sm">{renderedElements}</div>;
}

export function ChatBot() {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const { userData } = useUser();
  const developerName = userData?.name || 'Karanveer Thour';

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const [messages, setMessages] = useState<FormattedMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hello! 👋 I'm **${developerName}'s AI Assistant**.\n\nI can provide verified insights on **${developerName}'s** full-stack projects, architecture experience, core technical skills, or direct contact links. How may I assist you?`,
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

  // Focus input on open without forcing scroll to bottom
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // When a new message arrives, scroll smoothly to the start/top of that message
  useEffect(() => {
    if (messages.length > 1) {
      latestMessageRef.current?.scrollIntoView({
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
        `I'm sorry, I couldn't process that. Feel free to contact ${developerName} directly!`;
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
      setLoading(false);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: FormattedMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        content: `Sorry, I ran into an issue reaching the AI backend. You can connect with **${developerName}** directly on the **/contact** page!`,
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`w-[380px] sm:w-[440px] max-w-[calc(100vw-24px)] h-[580px] max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border backdrop-blur-2xl mb-4 will-change-transform ${
              isDark
                ? 'bg-slate-950/90 border-red-500/30 text-white shadow-red-950/50'
                : 'bg-white/90 border-blue-200/80 text-slate-800 shadow-blue-500/20'
            }`}
          >
            {/* Header */}
            <div
              className={`px-5 py-4 border-b flex items-center justify-between select-none ${
                isDark
                  ? 'bg-linear-to-r from-slate-950 via-slate-900 to-red-950/50 border-red-500/20'
                  : 'bg-linear-to-r from-blue-50 via-white to-blue-100/70 border-blue-200/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                    isDark
                      ? 'bg-linear-to-br from-red-600 to-yellow-500 text-white shadow-red-500/30'
                      : 'bg-linear-to-br from-blue-600 to-blue-400 text-white shadow-blue-500/30'
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
                  <span className="text-[11px] text-muted-foreground opacity-80">
                    Gemini AI • Verified Portfolio Context
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Reset conversation"
                  aria-label="Clear chat"
                  className="p-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
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
                            ? 'bg-linear-to-r from-red-600 to-red-700 text-white'
                            : 'bg-linear-to-r from-blue-600 to-blue-700 text-white'
                          : isDark
                            ? 'bg-slate-900 border border-red-500/30 text-red-400'
                            : 'bg-blue-100 border border-blue-300 text-blue-700'
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
                              ? 'bg-linear-to-r from-red-600 to-red-700 text-white rounded-tr-xs shadow-red-950/30'
                              : 'bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-tr-xs shadow-blue-200'
                            : isDark
                              ? 'bg-slate-900/90 border border-red-500/20 text-slate-100 rounded-tl-xs shadow-black/40'
                              : 'bg-slate-50/90 border border-blue-100 text-slate-800 rounded-tl-xs shadow-slate-100'
                        }`}
                      >
                        <MarkdownContent text={msg.content} isDark={isDark} />
                      </div>

                      {/* Footer: Timestamp & Copy button */}
                      <div
                        className={`flex items-center gap-2 mt-1 px-1 text-[10px] opacity-60 ${
                          isUser ? 'justify-end' : 'justify-between'
                        }`}
                      >
                        {!isUser && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-[10px]"
                            title="Copy response"
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
                        ? 'bg-slate-900 border border-red-500/30 text-red-400'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div
                    className={`rounded-2xl rounded-tl-xs px-4 py-3 border flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-slate-900/90 border-red-500/20 text-red-400'
                        : 'bg-slate-50 border-blue-100 text-blue-600'
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
                    <span className="text-xs font-mono ml-1 opacity-70">
                      Synthesizing...
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Categorized Quick Prompt Chips */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 sm:px-5 pb-2 pt-1">
                <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-2 opacity-70">
                  Suggested Inquiries
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIZED_PROMPTS.map((prompt, i) => {
                    const IconComponent = prompt.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt.query)}
                        className={`text-xs p-2.5 rounded-xl border flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left cursor-pointer shadow-xs ${
                          isDark
                            ? 'bg-slate-900/80 border-red-500/20 hover:border-red-500/60 text-slate-200 hover:bg-slate-800'
                            : 'bg-blue-50/80 border-blue-200 hover:border-blue-400 text-blue-900 hover:bg-blue-100/60'
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
                  ? 'bg-slate-950/90 border-red-500/20'
                  : 'bg-slate-50/90 border-blue-200/60'
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
                className={`flex-1 px-4 py-2.5 rounded-2xl text-sm border focus:outline-none transition-colors shadow-xs ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 focus:border-red-500 text-white placeholder-slate-400'
                    : 'bg-white border-blue-200 focus:border-blue-500 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || loading}
                aria-label="Send message"
                className={`p-3 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer shadow-md ${
                  isDark
                    ? 'bg-linear-to-r from-red-600 to-yellow-500 shadow-red-500/30'
                    : 'bg-linear-to-r from-blue-600 to-blue-500 shadow-blue-500/30'
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
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full border shadow-2xl cursor-pointer transition-all duration-300 select-none ${
          isDark
            ? 'bg-linear-to-r from-slate-900 via-slate-950 to-slate-900 border-red-500/60 text-white shadow-red-600/30 hover:border-red-500 hover:shadow-red-500/40'
            : 'bg-linear-to-r from-white via-blue-50 to-white border-blue-300 text-blue-700 shadow-blue-500/25 hover:border-blue-400 hover:shadow-blue-500/35'
        }`}
        title={isOpen ? 'Close AI Assistant' : 'Chat with AI Assistant'}
        aria-label="Toggle AI Assistant"
      >
        {/* Pulsing Ambient Halo */}
        <span
          className={`absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none ${
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
