import { FolderX } from "lucide-react";
import type { NotFoundStateProps } from "../types";

export function NotFoundState(_props: NotFoundStateProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/60 border border-border/40 flex items-center justify-center text-muted-foreground">
          <FolderX className="w-8 h-8" />
        </div>
        <div className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Portfolio Not Found
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This portfolio link may have expired or been removed by its owner. Please verify the URL or contact the sender.
        </p>
      </div>
    </div>
  );
}

