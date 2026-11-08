import { motion } from "motion/react";
import type { PortfolioListProps } from "../../types";
import { ListHeader } from "./ListHeader";
import { PortfolioCard } from "../card/PortfolioCard";
import { EmptyState } from "./EmptyState";
import PageLoadingSkeleton from "../../../../../components/common/loading/PageLoadingSkeleton";

export function PortfolioList({
  portfolios,
  allProjects,
  isDark,
  isLoading = false,
  copiedId,
  onEdit,
  onDelete,
  onCopy,
}: PortfolioListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280 }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <ListHeader isDark={isDark} count={portfolios.length} />
      {isLoading ? (
        <div className="mt-4">
          <PageLoadingSkeleton count={3} type="card" />
        </div>
      ) : portfolios.length === 0 ? (
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

