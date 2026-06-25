import { Folder } from "lucide-react";

interface CategoryBadgeProps {
  category: string;
  categoryIconUrl?: string;
  isDark: boolean;
}

export function CategoryBadge({ category, categoryIconUrl, isDark }: CategoryBadgeProps) {
  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${
        isDark
          ? "bg-slate-800/80 border-red-500/30 text-gray-300"
          : "bg-blue-100 border-blue-300 text-blue-800"
      }`}
    >
      {categoryIconUrl ? (
        <img
          src={categoryIconUrl}
          alt=""
          className="w-4 h-4 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <Folder className={`w-4 h-4 ${isDark ? 'text-red-500' : 'text-blue-600'}`} />
      )}
      {category}
    </span>
  );
}
