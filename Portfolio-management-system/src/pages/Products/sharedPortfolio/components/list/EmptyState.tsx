interface EmptyStateProps {
  isDark: boolean;
}

export function EmptyState({ isDark }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        No portfolios yet. Create your first collection!
      </p>
    </div>
  );
}
