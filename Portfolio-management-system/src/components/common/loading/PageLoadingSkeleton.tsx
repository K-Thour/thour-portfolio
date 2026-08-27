import React from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface PageLoadingSkeletonProps {
  count?: number;
  type?: "card" | "table" | "grid";
  className?: string;
}

export const PageLoadingSkeleton: React.FC<PageLoadingSkeletonProps> = ({
  count = 3,
  type = "card",
  className,
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  const placeholderBg = isDark ? "bg-slate-700/60" : "bg-slate-200/80";

  if (type === "grid") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
          className,
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "p-6 rounded-2xl border animate-pulse flex flex-col items-center justify-center min-h-[180px]",
              isDark
                ? "bg-slate-800/40 border-slate-700/50"
                : "bg-white border-slate-200 shadow-sm",
            )}
          >
            <div className={cn("w-16 h-16 rounded-2xl mb-4", placeholderBg)} />
            <div className={cn("h-4 w-24 rounded mb-2", placeholderBg)} />
            <div className={cn("h-3 w-16 rounded", placeholderBg)} />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div
        className={cn(
          "rounded-2xl border overflow-hidden animate-pulse",
          isDark
            ? "bg-slate-800/40 border-slate-700/50"
            : "bg-white border-slate-200 shadow-sm",
          className,
        )}
      >
        <div
          className={cn(
            "h-12 border-b",
            isDark
              ? "border-slate-700 bg-slate-800/80"
              : "border-slate-200 bg-slate-50",
          )}
        />
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between p-4 border-b last:border-b-0",
              isDark ? "border-slate-700/40" : "border-slate-100",
            )}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={cn("w-10 h-10 rounded-full", placeholderBg)} />
              <div className="space-y-2 flex-1 max-w-sm">
                <div className={cn("h-4 w-3/4 rounded", placeholderBg)} />
                <div className={cn("h-3 w-1/2 rounded", placeholderBg)} />
              </div>
            </div>
            <div className={cn("h-8 w-24 rounded-lg", placeholderBg)} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "p-6 rounded-2xl border animate-pulse flex items-center gap-6",
            isDark
              ? "bg-slate-800/40 border-slate-700/50"
              : "bg-white border-slate-200 shadow-sm",
          )}
        >
          <div className={cn("w-24 h-24 rounded-xl shrink-0", placeholderBg)} />
          <div className="flex-1 space-y-3">
            <div className={cn("h-6 w-1/3 rounded", placeholderBg)} />
            <div className={cn("h-4 w-1/4 rounded", placeholderBg)} />
            <div className="flex gap-2 pt-2">
              <div className={cn("h-6 w-16 rounded-full", placeholderBg)} />
              <div className={cn("h-6 w-20 rounded-full", placeholderBg)} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className={cn("w-9 h-9 rounded-lg", placeholderBg)} />
            <div className={cn("w-9 h-9 rounded-lg", placeholderBg)} />
            <div className={cn("w-9 h-9 rounded-lg", placeholderBg)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageLoadingSkeleton;
