import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { CursorGlow } from './components/ui/CursorGlow';
import { GameLoader } from './components/ui/GameLoader';

export function Root() {
  const { pathname } = useLocation();
  const [showGameLoader, setShowGameLoader] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <ThemeProvider>
      <UserProvider>
        <AnimatePresence mode="wait">
          {showGameLoader && (
            <GameLoader onComplete={() => setShowGameLoader(false)} />
          )}
        </AnimatePresence>

        <div className="min-h-screen relative">
          <CursorGlow />
          <Navigation />
          <Outlet />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}
