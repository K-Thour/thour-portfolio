import { Loader2 } from "lucide-react";
import type { LoadingStateProps } from "../../../pages/PublicPortfolio/OverviewPage/types";

export function LoadingState({ isDark }: LoadingStateProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${isDark ? "bg-linear-to-br from-slate-950 to-slate-900" : "bg-linear-to-br from-slate-50 to-blue-50"}`}
    >
      <div className="text-center">
        <div
          className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark ? "bg-linear-to-br from-red-600 to-yellow-500" : "bg-linear-to-br from-blue-600 to-blue-400"}`}
        >
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
        <p
          className={`text-lg font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          {isDark ? "Loading project..." : "Summoning legends..."}
        </p>
      </div>
    </div>
  );
}
