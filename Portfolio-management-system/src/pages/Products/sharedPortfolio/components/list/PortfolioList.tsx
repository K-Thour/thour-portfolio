import { motion } from "motion/react";
import type { PortfolioListProps } from "../../types";
import { ListHeader } from "./ListHeader";
import { PortfolioCard } from "../card/PortfolioCard";
import { EmptyState } from "./EmptyState";

export function PortfolioList({
  portfolios,
  allProjects,
  isDark,
  copiedId,
  onEdit,
  onDelete,
  onCopy,
}: PortfolioListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl border ${isDark ? "bg-slate-800/50 border-red-500/20" : "bg-linear-to-br from-white to-blue-50 border-blue-300/40 shadow-md"}`}
    >
      <ListHeader isDark={isDark} count={portfolios.length} />
      {portfolios.length === 0 ? (
        <EmptyState isDark={isDark} />
      ) : (
        <div className="space-y-4">
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              allProjects={allProjects}
              isDark={isDark}
              isCopied={copiedId === portfolio.id}
              onEdit={() => onEdit(portfolio)}
              onDelete={() => onDelete(portfolio.id)}
              onCopy={() => onCopy(portfolio.url, portfolio.id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
