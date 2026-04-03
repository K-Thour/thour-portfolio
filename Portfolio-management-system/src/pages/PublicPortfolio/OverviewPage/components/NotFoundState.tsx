import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { NotFoundStateProps } from "../types";

export function NotFoundState({ isDark }: NotFoundStateProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark
          ? "bg-linear-to-br from-slate-950 to-slate-900"
          : "bg-linear-to-br from-slate-50 to-blue-50"
      }`}
    >
      <div className="text-center">
        <div
          className={`text-6xl font-bold mb-4 ${
            isDark ? "text-red-500" : "text-blue-600"
          }`}
        >
          404
        </div>
        <div
          className={`text-xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Portfolio Not Found
        </div>
        <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          This portfolio link may be invalid or has been removed.
        </p>
        <Link
          to="/"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
            isDark
              ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg"
              : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
