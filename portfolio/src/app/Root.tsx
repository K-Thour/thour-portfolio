import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <ThemeProvider>
      <UserProvider>
        <div className="min-h-screen">
          <Navigation />
          <Outlet />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}
