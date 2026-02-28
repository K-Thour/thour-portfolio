import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  const isDark = theme === 'avengers';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-red-500/20'
          : 'bg-white/95 border-blue-300/30 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                isDark
                  ? 'bg-gradient-to-br from-red-600 to-yellow-500 text-white'
                  : 'bg-gradient-to-br from-blue-600 to-blue-400 text-white'
              }`}
            >
              K
            </div>
            <span
              className={`font-bold text-xl hidden sm:block ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Karanveer Thour
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-colors ${
                  location.pathname === item.path
                    ? isDark
                      ? 'text-red-500'
                      : 'text-blue-600'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute -bottom-6 left-0 right-0 h-0.5 ${
                      isDark
                        ? 'bg-gradient-to-r from-red-600 to-yellow-500'
                        : 'bg-gradient-to-r from-blue-600 to-blue-400'
                    }`}
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block font-medium transition-colors ${
                      location.pathname === item.path
                        ? isDark
                          ? 'text-red-500'
                          : 'text-blue-600'
                        : isDark
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
