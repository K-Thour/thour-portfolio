import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

export interface TechStackSkeletonProps {
  isDark?: boolean;
  count?: number;
  mode?: 'grid' | 'marquee';
}

export function TechStackSkeleton({
  isDark: propIsDark,
  count = 8,
  mode = 'grid',
}: TechStackSkeletonProps) {
  const themeContext = useContext(ThemeContext);
  const isDark =
    propIsDark !== undefined
      ? propIsDark
      : themeContext
        ? themeContext.theme === 'avengers'
        : true;

  if (mode === 'marquee') {
    return (
      <div
        role="status"
        aria-label="Loading technologies"
        data-testid="tech-stack-skeleton-marquee"
        className="flex gap-4 overflow-hidden py-4"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            data-testid="tech-skeleton-item"
            className={`flex-shrink-0 rounded-2xl p-4 w-44 h-16 border backdrop-blur-xl backdrop-saturate-[180%] animate-pulse flex items-center gap-3.5 ${
              isDark
                ? 'bg-slate-800/40 border-white/5'
                : 'bg-white/60 border-black/5 shadow-sm'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl shrink-0 ${
                isDark ? 'bg-white/10' : 'bg-slate-200'
              }`}
            />
            <div className="space-y-1.5 flex-1 min-w-0">
              <div
                className={`h-3.5 w-20 rounded ${
                  isDark ? 'bg-white/10' : 'bg-slate-200'
                }`}
              />
              <div
                className={`h-2.5 w-12 rounded ${
                  isDark ? 'bg-white/5' : 'bg-slate-100'
                }`}
              />
            </div>
          </div>
        ))}
        <span className="sr-only">Loading technologies...</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Loading technologies"
      data-testid="tech-stack-skeleton-grid"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          data-testid="tech-skeleton-item"
          className={`rounded-2xl p-5 border relative overflow-hidden backdrop-blur-xl backdrop-saturate-[180%] animate-pulse flex flex-col justify-between min-h-[140px] ${
            isDark
              ? 'bg-slate-800/40 border-white/5'
              : 'bg-white/60 border-black/5 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-xl ${
                isDark ? 'bg-white/10' : 'bg-slate-200'
              }`}
            />
            <div
              className={`w-14 h-5 rounded-full ${
                isDark ? 'bg-white/5' : 'bg-slate-200/70'
              }`}
            />
          </div>
          <div className="space-y-2">
            <div
              className={`h-4 w-3/4 rounded ${
                isDark ? 'bg-white/10' : 'bg-slate-200'
              }`}
            />
            <div
              className={`h-3 w-1/2 rounded ${
                isDark ? 'bg-white/5' : 'bg-slate-100'
              }`}
            />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading technologies...</span>
    </div>
  );
}
