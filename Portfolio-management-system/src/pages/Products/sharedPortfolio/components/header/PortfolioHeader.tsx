import { Plus } from "lucide-react";
import type { PortfolioHeaderProps } from "../../types";

export function PortfolioHeader({
  userName,
  onAdd,
}: PortfolioHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Shared Portfolios
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create tokenized project collections for clients and recruiters
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-2xl border border-border/40 bg-card/75 backdrop-blur-xl px-4 py-2.5 shadow-xs">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            URL Generator
          </p>
          <p className="text-sm font-semibold text-foreground">
            {userName}
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-primary text-primary-foreground shadow-xs hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Portfolio</span>
        </button>
      </div>
    </div>
  );
}

