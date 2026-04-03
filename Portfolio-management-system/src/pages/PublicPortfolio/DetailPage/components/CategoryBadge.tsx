interface CategoryBadgeProps {
  category: string;
  isDark: boolean;
}

export function CategoryBadge({ category, isDark }: CategoryBadgeProps) {
  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium border ${
        isDark
          ? "bg-slate-800/80 border-red-500/30 text-gray-300"
          : "bg-blue-100 border-blue-300 text-blue-800"
      }`}
    >
      {category}
    </span>
  );
}
