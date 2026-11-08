import React from "react";
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
  const placeholderBg = "bg-accent/60 animate-pulse";

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
            className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl flex flex-col items-center justify-center min-h-[180px] shadow-xs"
          >
            <div className={cn("w-14 h-14 rounded-2xl mb-4", placeholderBg)} />
            <div className={cn("h-4 w-24 rounded-lg mb-2", placeholderBg)} />
            <div className={cn("h-3 w-16 rounded-md", placeholderBg)} />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div
        className={cn(
          "rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl overflow-hidden shadow-xs",
          className,
        )}
      >
        <div className="h-12 border-b border-border/40 bg-accent/20" />
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border-b border-border/30 last:border-b-0"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={cn("w-10 h-10 rounded-full", placeholderBg)} />
              <div className="space-y-2 flex-1 max-w-sm">
                <div className={cn("h-4 w-3/4 rounded-lg", placeholderBg)} />
                <div className={cn("h-3 w-1/2 rounded-md", placeholderBg)} />
              </div>
            </div>
            <div className={cn("h-8 w-24 rounded-xl", placeholderBg)} />
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
          className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl flex items-center gap-6 shadow-xs"
        >
          <div className={cn("w-24 h-24 rounded-2xl shrink-0", placeholderBg)} />
          <div className="flex-1 space-y-3">
            <div className={cn("h-5 w-1/3 rounded-lg", placeholderBg)} />
            <div className={cn("h-4 w-1/4 rounded-md", placeholderBg)} />
            <div className="flex gap-2 pt-2">
              <div className={cn("h-6 w-16 rounded-full", placeholderBg)} />
              <div className={cn("h-6 w-20 rounded-full", placeholderBg)} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className={cn("w-9 h-9 rounded-xl", placeholderBg)} />
            <div className={cn("w-9 h-9 rounded-xl", placeholderBg)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageLoadingSkeleton;
