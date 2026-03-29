import { useAppSelector } from "../../../../hooks/useRedux";
import type { LeadsHeaderProps } from "../types";

export function LeadsHeader({ isDark }: LeadsHeaderProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const effectiveIsDark = isDark ?? theme === "dark";

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          className={`text-3xl font-bold mb-2 ${
            effectiveIsDark ? "text-white" : "text-gray-900"
          }`}
        >
          Leads Management
        </h1>
        <p className={effectiveIsDark ? "text-gray-400" : "text-gray-600"}>
          Track and manage your leads
        </p>
      </div>
    </div>
  );
}
