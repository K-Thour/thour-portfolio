import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './context/ThemeContext';

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navigation />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
