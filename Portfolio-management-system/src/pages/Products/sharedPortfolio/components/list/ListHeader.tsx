interface ListHeaderProps {
  isDark: boolean;
  count: number;
}

export function ListHeader({ isDark, count }: ListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2
        className={`text-xl font-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Your Portfolios
      </h2>
      <span
        className={`text-sm font-medium ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {count} {count === 1 ? "collection" : "collections"} generated
      </span>
    </div>
  );
}
