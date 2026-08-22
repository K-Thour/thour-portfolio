import { useTheme } from '../../../context/ThemeContext';

interface ProjectSkeletonCardProps {
  isDark?: boolean;
}

export function ProjectSkeletonCard({
  isDark: propIsDark,
}: ProjectSkeletonCardProps) {
  const { theme } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : theme === 'avengers';

  return (
    <div
      className={`rounded-2xl overflow-hidden border animate-pulse ${
        isDark
          ? 'bg-slate-800/40 border-slate-700/40'
          : 'bg-white/80 border-blue-200/50 shadow-sm'
      }`}
    >
      {/* Image Skeleton */}
      <div
        className={`h-64 w-full ${
          isDark ? 'bg-slate-700/50' : 'bg-blue-100/70'
        }`}
      />

      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        <div
          className={`h-3 w-24 rounded ${
            isDark ? 'bg-slate-700/60' : 'bg-blue-200/70'
          }`}
        />
        <div
          className={`h-6 w-3/4 rounded ${
            isDark ? 'bg-slate-700/60' : 'bg-slate-200'
          }`}
        />
        <div className="space-y-2 pt-1">
          <div
            className={`h-3 w-full rounded ${
              isDark ? 'bg-slate-700/40' : 'bg-slate-100'
            }`}
          />
          <div
            className={`h-3 w-5/6 rounded ${
              isDark ? 'bg-slate-700/40' : 'bg-slate-100'
            }`}
          />
        </div>
        <div className="flex gap-2 pt-3">
          <div
            className={`h-6 w-16 rounded-full ${
              isDark ? 'bg-slate-700/50' : 'bg-blue-100'
            }`}
          />
          <div
            className={`h-6 w-20 rounded-full ${
              isDark ? 'bg-slate-700/50' : 'bg-blue-100'
            }`}
          />
          <div
            className={`h-6 w-14 rounded-full ${
              isDark ? 'bg-slate-700/50' : 'bg-blue-100'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
