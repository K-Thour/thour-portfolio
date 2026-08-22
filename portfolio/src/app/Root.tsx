import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { CursorGlow } from './components/ui/CursorGlow';

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <ThemeProvider>
      <UserProvider>
        <div className="min-h-screen relative">
          <CursorGlow />
          <Navigation />
          <Outlet />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}
