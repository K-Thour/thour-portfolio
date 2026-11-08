interface StatusBadgeProps {
  status: string;
  isDark?: boolean;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isCompleted = status === "Completed successfully" || status === "Completed";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
        isCompleted
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
          : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
      }`}
    >
      {isCompleted ? "Completed" : "In Progress"}
    </span>
  );
}

