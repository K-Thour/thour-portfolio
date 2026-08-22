import React from 'react';
import { Shield, Axe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const HeroAvatarLoader: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <div
      aria-label="Loading profile"
      className={`relative w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center select-none ${
        isDark
          ? 'bg-slate-950/80 border-4 border-red-500/40 shadow-2xl shadow-red-500/20'
          : 'bg-white/80 border-4 border-blue-500/40 shadow-2xl shadow-blue-500/20 backdrop-blur-md'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className={`absolute inset-0 rounded-full blur-xl opacity-60 ${
          isDark
            ? 'bg-gradient-to-tr from-red-600/30 via-yellow-500/20 to-red-900/40'
            : 'bg-gradient-to-tr from-blue-600/20 via-sky-400/20 to-indigo-100'
        }`}
      />

      {/* Outer Rotating Track 1 (Clockwise) */}
      <div
        className={`absolute inset-3 sm:inset-4 rounded-full border border-dashed will-change-transform animate-[spin_12s_linear_infinite] ${
          isDark ? 'border-red-500/40' : 'border-blue-400/50'
        }`}
      />

      {/* Middle Rotating Track 2 (Counter-Clockwise) */}
      <div
        className={`absolute inset-8 sm:inset-10 rounded-full border border-dotted will-change-transform animate-[spin_8s_linear_infinite_reverse] ${
          isDark ? 'border-yellow-500/50' : 'border-sky-500/60'
        }`}
      />

      {/* Inner Glowing Orbit Ring */}
      <div
        className={`absolute inset-14 sm:inset-16 rounded-full border-2 will-change-transform animate-[spin_5s_linear_infinite] ${
          isDark
            ? 'border-t-red-500 border-r-yellow-500 border-b-transparent border-l-transparent shadow-sm shadow-red-500/50'
            : 'border-t-blue-600 border-r-sky-400 border-b-transparent border-l-transparent shadow-sm shadow-blue-500/50'
        }`}
      />

      {/* Central Core */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Core Pulsing Halo */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border shadow-lg transition-transform animate-pulse ${
            isDark
              ? 'bg-slate-900/90 border-red-500/60 shadow-red-500/40 text-red-500'
              : 'bg-white/90 border-blue-400/60 shadow-blue-500/30 text-blue-600'
          }`}
        >
          {isDark ? (
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 animate-pulse" />
          ) : (
            <Axe className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 animate-pulse" />
          )}
        </div>

        {/* Status Text / Hologram Beacon */}
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full border bg-black/20 backdrop-blur-xs">
          <div
            className={`w-2 h-2 rounded-full animate-ping ${
              isDark ? 'bg-red-500' : 'bg-blue-600'
            }`}
          />
          <span
            className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase ${
              isDark ? 'text-red-400' : 'text-blue-600'
            }`}
          >
            {isDark ? 'ONLINE // READY' : 'INITIALIZING'}
          </span>
        </div>
      </div>

      {/* Sweeping Radar / Crystalline Line Effect */}
      <div
        className={`absolute inset-0 rounded-full opacity-20 pointer-events-none will-change-transform animate-[spin_4s_linear_infinite] ${
          isDark
            ? 'bg-gradient-to-t from-red-500 via-transparent to-transparent'
            : 'bg-gradient-to-t from-blue-500 via-transparent to-transparent'
        }`}
      />
    </div>
  );
};
