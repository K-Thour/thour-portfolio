interface PaginationInfoProps {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  isDark: boolean;
}

export function PaginationInfo({
  startIndex,
  endIndex,
  totalItems,
  isDark,
}: PaginationInfoProps) {
  return (
    <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
      Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
      <span className="font-medium">{Math.min(endIndex, totalItems)}</span> of{" "}
      <span className="font-medium">{totalItems}</span> leads
    </div>
  );
}
