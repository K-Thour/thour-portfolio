import { useTheme } from '../../../context/ThemeContext';

interface ProjectDetailSkeletonProps {
  isDark?: boolean;
}

export function ProjectDetailSkeleton({
  isDark: propIsDark,
}: ProjectDetailSkeletonProps) {
  const { theme } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : theme === 'avengers';

  return (
    <div className="max-w-5xl mx-auto animate-pulse space-y-8">
      {/* Back button placeholder */}
      <div
        className={`h-5 w-32 rounded ${
          isDark ? 'bg-slate-800' : 'bg-slate-200'
        }`}
      />

      {/* Header Skeleton */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div
          className={`h-4 w-28 mx-auto rounded ${
            isDark ? 'bg-slate-800' : 'bg-blue-100'
          }`}
        />
        <div
          className={`h-10 w-3/4 mx-auto rounded-lg ${
            isDark ? 'bg-slate-800' : 'bg-slate-200'
          }`}
        />
        <div
          className={`h-4 w-full mx-auto rounded ${
            isDark ? 'bg-slate-800/60' : 'bg-slate-100'
          }`}
        />
      </div>

      {/* Hero Image Skeleton */}
      <div
        className={`w-full aspect-[16/9] rounded-2xl ${
          isDark ? 'bg-slate-800/50' : 'bg-blue-100/70'
        }`}
      />

      {/* Content boxes skeleton */}
      <div className="grid md:grid-cols-2 gap-6 pt-4">
        <div
          className={`h-48 rounded-2xl ${
            isDark ? 'bg-slate-800/40' : 'bg-white/70 shadow-sm'
          }`}
        />
        <div
          className={`h-48 rounded-2xl ${
            isDark ? 'bg-slate-800/40' : 'bg-white/70 shadow-sm'
          }`}
        />
      </div>
    </div>
  );
}
