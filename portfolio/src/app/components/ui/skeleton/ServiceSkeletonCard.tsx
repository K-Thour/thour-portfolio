import { useTheme } from '../../../context/ThemeContext';

interface ServiceSkeletonCardProps {
  isDark?: boolean;
}

export function ServiceSkeletonCard({ isDark: propIsDark }: ServiceSkeletonCardProps) {
  const { theme } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : theme === 'avengers';

  return (
    <div
      className={`flex flex-col gap-3 p-5 rounded-xl border min-h-[220px] animate-pulse ${
        isDark
          ? 'bg-slate-800/40 border-slate-700/40'
          : 'bg-white/70 border-blue-200/50 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-xl shrink-0 ${
            isDark ? 'bg-slate-700/60' : 'bg-blue-100'
          }`}
        />
        <div
          className={`h-5 w-36 rounded-md ${
            isDark ? 'bg-slate-700/60' : 'bg-blue-100'
          }`}
        />
      </div>
      <div className="space-y-2 mt-2">
        <div
          className={`h-3 w-full rounded ${
            isDark ? 'bg-slate-700/40' : 'bg-slate-100'
          }`}
        />
        <div
          className={`h-3 w-4/5 rounded ${
            isDark ? 'bg-slate-700/40' : 'bg-slate-100'
          }`}
        />
        <div
          className={`h-3 w-2/3 rounded ${
            isDark ? 'bg-slate-700/40' : 'bg-slate-100'
          }`}
        />
      </div>
      <div className="space-y-1.5 mt-auto pt-3 border-t border-slate-700/20">
        <div
          className={`h-2.5 w-1/2 rounded ${
            isDark ? 'bg-slate-700/40' : 'bg-slate-100'
          }`}
        />
        <div
          className={`h-2.5 w-2/5 rounded ${
            isDark ? 'bg-slate-700/40' : 'bg-slate-100'
          }`}
        />
      </div>
    </div>
  );
}
