import { Plus } from "lucide-react";
import type { PortfolioHeaderProps } from "../../types";

export function PortfolioHeader({
  isDark,
  userName,
  onAdd,
}: PortfolioHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1
          className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {isDark ? "Share Mission Portfolio" : "Share Battle Portfolio"}
        </h1>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Create shareable project collections
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div
          className={`rounded-2xl border px-4 py-3 ${
            isDark
              ? "border-red-500/20 bg-slate-900/70"
              : "border-blue-200 bg-white/80 shadow-sm"
          }`}
        >
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${
              isDark ? "text-red-400" : "text-blue-600"
            }`}
          >
            URL Generator
          </p>
          <p
            className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {userName}
          </p>
        </div>

        <button
          onClick={onAdd}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
            isDark
              ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
              : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
          }`}
        >
          <Plus className="w-5 h-5" />
          Generate Portfolio
        </button>
      </div>
    </div>
  );
}
