import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Shield, Axe, ChevronRight } from 'lucide-react';
import { ThemeContext, getFallbackTheme } from '../../context/ThemeContext';

interface GameLoaderProps {
  onComplete: () => void;
}

const AVENGERS_LOGS = [
  'INITIALIZING STARK_OS v4.8...',
  'CALIBRATING ARC-REACTOR POWER CELLS...',
  'SYNCHRONIZING QUANTUM TELEMETRY...',
  'COMPILING WEAPONS & TECH ARSENAL...',
  'CONNECTING NEURAL PROTOCOL // FRIDAY...',
  'ALL SYSTEMS NOMINAL. ONLINE.',
];

const NORDIC_TIPS = [
  'TIP: Clean code is forged in discipline and honor.',
  'TIP: True full-stack mastery bridges all nine realms.',
  'TIP: Strong architecture withstands the fiercest storms.',
  'TIP: Wisdom and practice unlock legendary solutions.',
];

export const GameLoader: React.FC<GameLoaderProps> = ({ onComplete }) => {
  const context = useContext(ThemeContext);
  const theme = context?.theme ?? getFallbackTheme();
  const isDark = theme === 'avengers';
  const motionReduced = useReducedMotion();
  const shouldReduceMotion =
    motionReduced ||
    (typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false);

  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const completedRef = useRef(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFinished(true);
    const exitDelay = shouldReduceMotion ? 200 : 350;
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => {
      onComplete();
    }, exitDelay);
  }, [onComplete, shouldReduceMotion]);

  // Lock body scroll while loader is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
    };
  }, []);

  // Keyboard shortcut listeners (Space, Enter, Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFinish]);

  // Smooth 60 FPS progress animation
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = shouldReduceMotion ? 600 : 2200;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth custom ease progression
      const easeProgress = Math.pow(rawProgress, 0.85);
      const currentPct = Math.min(Math.round(easeProgress * 100), 100);

      setProgress(currentPct);

      // Advance logs based on progress percentage
      if (isDark) {
        const nextLogIndex = Math.min(
          Math.floor((currentPct / 100) * AVENGERS_LOGS.length),
          AVENGERS_LOGS.length - 1,
        );
        setLogIndex(nextLogIndex);
      } else {
        const nextTipIndex = Math.min(
          Math.floor((currentPct / 100) * NORDIC_TIPS.length),
          NORDIC_TIPS.length - 1,
        );
        setLogIndex(nextTipIndex);
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
        completionTimerRef.current = setTimeout(() => {
          handleFinish();
        }, shouldReduceMotion ? 100 : 300);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
    };
  }, [isDark, handleFinish, shouldReduceMotion]);

  return (
    <motion.div
      onClick={handleFinish}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: isFinished ? 0 : 1, scale: isFinished ? 1.05 : 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.2 }
          : { type: 'spring', damping: 20, stiffness: 220 }
      }
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cursor-pointer ${
        isDark
          ? 'bg-slate-950 text-white'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-900'
      }`}
    >
      {/* Background Cyber-Grid / Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.12) 0%, rgba(234, 179, 8, 0.05) 45%, rgba(2, 6, 23, 0.95) 75%), linear-gradient(rgba(239, 68, 68, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.04) 1px, transparent 1px)'
            : 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.10) 0%, rgba(147, 197, 253, 0.06) 50%, rgba(248, 250, 252, 0.95) 80%), linear-gradient(rgba(37, 99, 235, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* CRT Scanline Overlay (Only in Avengers Dark Mode) */}
      {isDark && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.6))',
            backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* Top Header HUD Telemetry */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              shouldReduceMotion ? '' : 'animate-ping'
            } motion-reduce:animate-none ${
              isDark ? 'bg-red-500' : 'bg-blue-600'
            }`}
          />
          <div className="flex flex-col">
            <span
              className={`text-xs font-mono font-bold tracking-widest uppercase ${
                isDark ? 'text-red-500' : 'text-blue-600'
              }`}
            >
              {isDark
                ? 'STARK INDUSTRIES // HUD v4.8'
                : 'VALHALLA ARCHIVES // CHAPTER I'}
            </span>
            <span
              className={`text-[10px] font-mono ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {isDark ? 'PROTOCOL: MARK-LXXXV' : 'REALM: MIDGARD'}
            </span>
          </div>
        </div>

        {/* Skip Button */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
          aria-label="Skip introduction sequence"
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isDark
              ? 'bg-slate-900/80 border-red-500/30 text-gray-300 hover:text-white hover:border-red-500 hover:bg-red-500/20 focus-visible:ring-red-500'
              : 'bg-white/80 border-blue-300 text-blue-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm focus-visible:ring-blue-500'
          }`}
        >
          <span>SKIP</span>
          <span className="text-[10px] opacity-60">[ESC]</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Center Cinematic Game Crest / Reactor */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Outer Rotating Energy Ring */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed will-change-transform ${
              shouldReduceMotion ? '' : 'animate-[spin_10s_linear_infinite]'
            } motion-reduce:animate-none ${
              isDark
                ? 'border-red-500/50 shadow-lg shadow-red-500/20'
                : 'border-blue-500/50 shadow-lg shadow-blue-500/20'
            }`}
          />

          {/* Middle Counter-Rotating Ring */}
          <div
            className={`absolute inset-4 rounded-full border-2 border-dotted will-change-transform ${
              shouldReduceMotion ? '' : 'animate-[spin_6s_linear_infinite_reverse]'
            } motion-reduce:animate-none ${
              isDark ? 'border-yellow-500/60' : 'border-sky-400/60'
            }`}
          />

          {/* Inner Glowing Orbit Track */}
          <div
            className={`absolute inset-8 rounded-full border-2 will-change-transform ${
              shouldReduceMotion ? '' : 'animate-[spin_3s_linear_infinite]'
            } motion-reduce:animate-none ${
              isDark
                ? 'border-t-red-500 border-r-yellow-500 border-b-transparent border-l-transparent'
                : 'border-t-blue-600 border-r-sky-400 border-b-transparent border-l-transparent'
            }`}
          />

          {/* Center Emblem Core */}
          <div
            className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center border-2 shadow-2xl transition-transform ${
              isDark
                ? 'bg-slate-900/90 border-red-500/80 shadow-red-500/50 text-red-500'
                : 'bg-white/90 border-blue-500/80 shadow-blue-500/30 text-blue-600'
            }`}
          >
            {isDark ? (
              <Shield
                className={`w-10 h-10 sm:w-12 sm:h-12 text-red-500 ${
                  shouldReduceMotion ? '' : 'animate-pulse'
                } motion-reduce:animate-none`}
              />
            ) : (
              <Axe
                className={`w-10 h-10 sm:w-12 sm:h-12 text-blue-600 ${
                  shouldReduceMotion ? '' : 'animate-pulse'
                } motion-reduce:animate-none`}
              />
            )}
          </div>
        </div>

        {/* Dynamic Telemetry Log / Lore Text */}
        <div
          className={`mt-8 px-6 py-2.5 rounded-xl border max-w-md w-full text-center backdrop-blur-md transition-all ${
            isDark
              ? 'bg-slate-900/80 border-red-500/30 shadow-md shadow-red-950/50'
              : 'bg-white/80 border-blue-200/80 shadow-md shadow-blue-100'
          }`}
        >
          <p
            className={`text-xs sm:text-sm font-mono font-medium truncate ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {isDark ? (
              <span className="text-red-400 font-bold">
                &gt; {AVENGERS_LOGS[logIndex]}
              </span>
            ) : (
              <span className="text-blue-700 font-semibold">
                {NORDIC_TIPS[logIndex]}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar & Game Start Prompt */}
      <div className="relative z-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs font-mono font-bold tracking-widest uppercase ${
              isDark ? 'text-red-400' : 'text-blue-600'
            }`}
          >
            {progress >= 100
              ? isDark
                ? 'SYSTEM READY // ALL PROTOCOLS VERIFIED'
                : 'REALM UNLOCKED // READY TO BEGIN'
              : isDark
                ? 'INITIALIZING ASSETS...'
                : 'AWAKENING THE REALM...'}
          </span>
          <span
            className={`text-lg font-mono font-black ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {progress}%
          </span>
        </div>

        {/* Accessible Progress Bar Container */}
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={
            isDark
              ? 'STARK Industries system initialization progress'
              : 'Valhalla Realm awakening progress'
          }
          className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${
            isDark
              ? 'bg-slate-900 border-red-500/30'
              : 'bg-white border-blue-300/60 shadow-inner'
          }`}
        >
          <div
            className={`h-full rounded-full transition-all duration-75 will-change-transform ${
              isDark
                ? 'bg-gradient-to-r from-red-600 via-yellow-500 to-red-500 shadow-md shadow-red-500/50'
                : 'bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 shadow-md shadow-blue-500/50'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Press Space Prompt */}
        <div className="mt-3 text-center transition-opacity">
          <span
            className={`text-[11px] font-mono tracking-widest uppercase ${
              shouldReduceMotion ? '' : 'animate-pulse'
            } motion-reduce:animate-none ${
              isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-blue-700'
            }`}
          >
            {progress >= 100
              ? 'PRESS [SPACE] OR CLICK TO ENTER'
              : 'CLICK ANYWHERE TO SKIP'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
