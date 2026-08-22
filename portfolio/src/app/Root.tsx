import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { CursorGlow } from './components/ui/CursorGlow';
import { GameLoader } from './components/ui/GameLoader';
import { ChatBot } from './components/ui/ChatBot';

function RootLayout() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const [showGameLoader, setShowGameLoader] = useState(true);

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
          <GameLoader onComplete={() => setShowGameLoader(false)} />
        )}
      </AnimatePresence>

      <CursorGlow />
      <Navigation />
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
      <ChatBot />
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
