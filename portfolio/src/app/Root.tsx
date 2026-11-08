import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { CursorGlow } from './components/ui/CursorGlow';
import { GameLoader } from './components/ui/GameLoader';
import { ChatBot } from './components/ui/ChatBot';
import { SEOHead } from './components/seo/SEOHead';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Toaster } from 'sonner';

function RootLayout() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const [showGameLoader, setShowGameLoader] = useState(() => {
    try {
      return !sessionStorage.getItem('portfolio_intro_seen');
    } catch {
      return false;
    }
  });

  const handleGameLoaderComplete = () => {
    setShowGameLoader(false);
    try {
      sessionStorage.setItem('portfolio_intro_seen', 'true');
    } catch {
      // Storage safety
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div
      className={`min-h-screen relative transition-colors duration-500 ease-in-out ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <AnimatePresence mode="wait">
        {showGameLoader && (
          <GameLoader onComplete={handleGameLoaderComplete} />
        )}
      </AnimatePresence>

      <SEOHead />
      <ScrollProgress />
      <CursorGlow />
      {!showGameLoader && <Navigation />}
      <Toaster richColors position="bottom-right" theme={isDark ? 'dark' : 'light'} />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Outlet />
      </motion.main>
      {!showGameLoader && <ChatBot />}
    </div>
  );
}

export function Root() {
  return (
    <ThemeProvider>
      <UserProvider>
        <RootLayout />
      </UserProvider>
    </ThemeProvider>
  );
}
