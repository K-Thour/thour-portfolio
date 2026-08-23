import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export interface BackButtonProps {
  /**
   * Fallback path to navigate to when user opened page directly (no history).
   * @default '/'
   */
  fallbackPath?: string;
  /**
   * Button label text.
   * @default 'Back'
   */
  label?: string;
  /**
   * Visual style variant.
   * @default 'pill'
   */
  variant?: 'pill' | 'ghost';
  /**
   * Custom additional classes.
   */
  className?: string;
  /**
   * Optional custom click handler to run alongside navigation.
   */
  onClick?: () => void;
}

export function BackButton({
  fallbackPath = '/',
  label = 'Back',
  variant = 'pill',
  className = '',
  onClick,
}: BackButtonProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }

    // Check if previous in-app browser history exists in this session
    const hasHistory =
      typeof window !== 'undefined' &&
      window.history.state &&
      typeof window.history.state.idx === 'number' &&
      window.history.state.idx > 0;

    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  const baseStyles =
    'group inline-flex items-center gap-2.5 transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantStyles =
    variant === 'pill'
      ? isDark
        ? 'px-4 py-2 rounded-full bg-slate-900/70 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-800/80 hover:border-red-500/40 shadow-sm hover:shadow-red-500/15 backdrop-blur-md focus-visible:ring-red-500'
        : 'px-4 py-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border border-blue-200/60 hover:border-blue-400/60 shadow-sm hover:shadow-blue-500/10 backdrop-blur-md focus-visible:ring-blue-500'
      : isDark
        ? 'px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 focus-visible:ring-red-500'
        : 'px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-blue-50/60 focus-visible:ring-blue-500';

  return (
    <motion.button
      type="button"
      onClick={handleBack}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Go back - ${label}`}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-200 ease-out group-hover:-translate-x-1 text-current" />
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </motion.button>
  );
}
