import type { PortfolioCardProps } from "../../types";
import { ProjectTags } from "./ProjectTags";
import { ActionButtons } from "./ActionButtons";

export function PortfolioCard({
  portfolio,
  allProjects,
  isDark,
  isCopied,
  onEdit,
  onDelete,
  onCopy,
}: PortfolioCardProps) {
  return (
    <div className="p-5 rounded-2xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
            {portfolio.name}
          </h3>
          <div className="p-2.5 rounded-xl font-mono text-xs text-muted-foreground bg-accent/40 border border-border/20 break-all select-all mb-3">
            {portfolio.url}
          </div>
          <ProjectTags
            projectIds={portfolio.projectIds}
            allProjects={allProjects}
            isDark={isDark}
          />
        </div>
        <ActionButtons
          url={portfolio.url}
          isDark={isDark}
          isCopied={isCopied}
          onCopy={onCopy}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

