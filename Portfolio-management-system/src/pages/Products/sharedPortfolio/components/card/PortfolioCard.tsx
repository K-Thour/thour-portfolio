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
  const cardClass = isDark
    ? "bg-slate-900/50 border-slate-700 hover:border-red-500/30"
    : "bg-white border-gray-200 hover:border-blue-400/50 hover:shadow-md";
  return (
    <div className={`p-5 rounded-xl border transition-all ${cardClass}`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3
            className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {portfolio.name}
          </h3>
          <div
            className={`p-3 rounded-lg font-mono text-sm break-all mb-3 ${isDark ? "bg-slate-800 text-gray-300" : "bg-gray-100 text-gray-800"}`}
          >
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
