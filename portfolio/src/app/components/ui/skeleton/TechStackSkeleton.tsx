import { useTheme } from '../../../context/ThemeContext';

interface TechStackSkeletonProps {
  isDark?: boolean;
  count?: number;
}

export function TechStackSkeleton({ isDark: propIsDark, count = 8 }: TechStackSkeletonProps) {
  const { theme } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : theme === 'avengers';

  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex-shrink-0 rounded-xl px-5 py-3 w-36 h-14 animate-pulse ${
            isDark ? 'bg-slate-800/50' : 'bg-blue-100/60'
          }`}
        />
      ))}
    </div>
  );
}
