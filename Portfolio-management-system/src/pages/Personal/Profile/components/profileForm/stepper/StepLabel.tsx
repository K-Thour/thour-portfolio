import type { StepLabelProps } from "../../../types";

export function StepLabel({
  title,
  description,
  isActive,
  isDark,
}: StepLabelProps) {
  return (
    <div className="mt-2 text-center">
      <p
        className={`text-sm font-medium ${
          isActive
            ? isDark
              ? "text-white"
              : "text-gray-900"
            : isDark
              ? "text-gray-500"
              : "text-gray-500"
        }`}
      >
        {title}
      </p>
      <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
        {description}
      </p>
    </div>
  );
}
