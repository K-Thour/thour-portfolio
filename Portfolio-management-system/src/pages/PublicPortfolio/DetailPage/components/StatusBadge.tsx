interface StatusBadgeProps {
  status: string;
  isDark: boolean;
}

export function StatusBadge({ status, isDark }: StatusBadgeProps) {
  const isCompleted = status === "Completed";
  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium border ${
        isCompleted
          ? isDark
            ? "bg-green-500/20 text-green-400 border-green-500/50"
            : "bg-green-100 text-green-700 border-green-300"
          : isDark
            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
            : "bg-yellow-100 text-yellow-700 border-yellow-300"
      }`}
    >
      {isCompleted
        ? isDark
          ? "Completed"
          : "Victory Achieved"
        : isDark
          ? "In Progress"
          : "Battle Ongoing"}
    </span>
  );
}
