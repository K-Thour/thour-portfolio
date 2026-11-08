import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { useUser } from '../context/UserContext';

const MotionLink = motion.create(Link);

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  const { userData } = useUser();
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  const isDark = theme === 'avengers';

  const isItemActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Auto-dismiss mobile drawer on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle viewport resize to desktop width
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(min-width: 768px)');
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };

    if (mql.matches) {
      setIsOpen(false);
    }

    mql.addEventListener('change', handleMediaChange);
    return () => mql.removeEventListener('change', handleMediaChange);
  }, []);

  // Prevent background scrolling while mobile drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Handle Escape key to dismiss mobile drawer and return focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed top-0 left-0 right-0 z-[110] px-4 pt-3 pb-2 pointer-events-none"
    >
      {/* Floating Capsule Bar */}
      <div
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
        className={`relative z-50 pointer-events-auto max-w-5xl mx-auto rounded-full px-4 sm:px-5 py-2 sm:py-2.5 transition-colors duration-300 border flex items-center justify-between ${
          isDark
            ? 'bg-slate-950/75 border-white/[0.12] shadow-lg shadow-black/20 text-white'
            : 'bg-white/80 border-black/[0.06] shadow-md shadow-slate-200/50 text-slate-900'
        }`}
      >
        {/* Monogram / Brand Link */}
        <MotionLink
          to="/"
          onClick={() => setIsOpen(false)}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 outline-none rounded-full focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Home page"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xs transition-transform ${
              isDark
                ? 'bg-gradient-to-br from-red-600 to-yellow-500 text-white'
                : 'bg-gradient-to-br from-blue-600 to-blue-400 text-white'
            }`}
          >
            {userData?.name ? userData.name[0] : 'K'}
          </div>
          <span
            className={`font-semibold tracking-tight text-base hidden sm:block ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {userData?.name || 'Karanveer Thour'}
          </span>
        </MotionLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <div
            className={`flex items-center gap-1 p-1 rounded-full border ${
              isDark
                ? 'bg-white/[0.04] border-white/[0.06]'
                : 'bg-black/[0.03] border-black/[0.04]'
            }`}
          >
            {navItems.map((item) => {
              const active = isItemActive(item.path);
              return (
                <MotionLink
                  key={item.path}
                  to={item.path}
                  whileTap={{ scale: 0.97 }}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active
                      ? isDark
                        ? 'text-red-400 font-semibold'
                        : 'text-blue-600 font-semibold'
                      : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className={`absolute inset-0 rounded-full ${
                        isDark ? 'bg-white/10 shadow-xs' : 'bg-black/5 shadow-xs'
                      }`}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', bounce: 0, duration: 0.35 }
                      }
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </MotionLink>
              );
            })}
          </div>
          <motion.div whileTap={{ scale: 0.97 }} className="flex items-center pl-1">
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.97 }}>
            <ThemeToggle />
          </motion.div>
          <motion.button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            whileTap={{ scale: 0.97 }}
            aria-expanded={isOpen}
            aria-controls={isOpen ? 'mobile-navigation-drawer' : undefined}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className={`min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isDark
                ? 'text-white hover:bg-white/10'
                : 'text-slate-900 hover:bg-black/5'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={shouldReduceMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', damping: 20, stiffness: 300 }
                  }
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={shouldReduceMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', damping: 20, stiffness: 300 }
                  }
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Drawer & Scrim */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              key="mobile-nav-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
              data-testid="mobile-drawer-scrim"
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 pointer-events-auto md:hidden"
            />

            {/* Mobile Sheet Drawer Card */}
            <motion.div
              key="mobile-nav-drawer"
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -16, scale: 0.98 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, scale: 0.98 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.15 }
                  : { type: 'spring', damping: 20, stiffness: 220 }
              }
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
              className={`relative z-50 pointer-events-auto max-w-lg mx-auto mt-2 rounded-3xl p-3 sm:p-4 shadow-2xl border md:hidden ${
                isDark
                  ? 'bg-slate-950/85 border-white/[0.12] shadow-black/40 text-white'
                  : 'bg-white/90 border-black/[0.06] shadow-slate-300/50 text-slate-900'
              }`}
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const active = isItemActive(item.path);
                  return (
                    <MotionLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      whileTap={{ scale: 0.97 }}
                      aria-current={active ? 'page' : undefined}
                      className={`min-h-[44px] px-4 py-3 rounded-2xl flex items-center justify-between text-base font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        active
                          ? isDark
                            ? 'bg-red-500/15 text-red-400 font-semibold border border-red-500/20'
                            : 'bg-blue-600/10 text-blue-600 font-semibold border border-blue-500/20'
                          : isDark
                            ? 'text-slate-200 hover:bg-white/5 hover:text-white'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isDark ? 'bg-red-500' : 'bg-blue-600'
                          }`}
                        />
                      )}
                    </MotionLink>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
