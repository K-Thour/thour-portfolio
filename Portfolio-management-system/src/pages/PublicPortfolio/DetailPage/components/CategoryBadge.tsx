import { useState } from "react";
import { Folder } from "lucide-react";

interface CategoryBadgeProps {
  category: string;
  categoryIconUrl?: string;
  isDark?: boolean;
}

export function CategoryBadge({
  category,
  categoryIconUrl,
}: CategoryBadgeProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-border/40 bg-accent/60 text-foreground shadow-xs">
      {categoryIconUrl && !imgError ? (
        <img
          src={categoryIconUrl}
          alt=""
          className="w-3.5 h-3.5 rounded-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <Folder className="w-3.5 h-3.5 text-primary" />
      )}
      <span>{category}</span>
    </span>
  );
}

