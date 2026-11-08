import { Loader2 } from "lucide-react";
import type { LoadingStateProps } from "../../../pages/PublicPortfolio/OverviewPage/types";

export function LoadingState(_props: LoadingStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center p-8 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <p className="text-base font-semibold tracking-tight text-foreground">
          Loading Portfolio...
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Preparing interactive project presentation
        </p>
      </div>
    </div>
  );
}
