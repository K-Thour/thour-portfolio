import { Share2 } from "lucide-react";

interface EmptyStateProps {
  isDark?: boolean;
}

export function EmptyState(_props: EmptyStateProps = {}) {
  return (
    <div className="text-center py-12 px-6 rounded-2xl border border-dashed border-border/60 bg-card/30 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
        <Share2 className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        No shared portfolios yet
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Curate a personalized collection of your best projects to share with prospective clients or employers.
      </p>
    </div>
  );
}

