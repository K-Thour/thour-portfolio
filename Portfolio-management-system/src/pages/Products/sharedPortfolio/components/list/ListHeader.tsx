interface ListHeaderProps {
  isDark?: boolean;
  count: number;
}

export function ListHeader({ count }: ListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg font-semibold text-foreground">
        Your Portfolios
      </h2>
      <span className="text-xs font-medium text-muted-foreground bg-accent/60 px-2.5 py-1 rounded-full border border-border/30">
        {count} {count === 1 ? "collection" : "collections"} generated
      </span>
    </div>
  );
}

