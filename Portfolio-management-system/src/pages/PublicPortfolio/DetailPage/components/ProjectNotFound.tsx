import { FolderX } from "lucide-react";
import { BackButton } from "./BackButton";

interface ProjectNotFoundProps {
  isDark?: boolean;
}

export function ProjectNotFound(_props: ProjectNotFoundProps = {}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/60 border border-border/40 flex items-center justify-center text-muted-foreground">
          <FolderX className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
          Project Not Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          The project you're looking for doesn't exist or may have been unlinked from this collection.
        </p>
        <div className="flex items-center justify-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}

