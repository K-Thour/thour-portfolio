import { ExternalLink } from "lucide-react";
import { useResumeCard } from "./hooks/useResumeCard";
import { CardHeader } from "./components/CardHeader";
import { CardActions } from "./components/CardActions";
import type { ResumeCardProps } from "../../types/props";

export function ResumeCard({
  resume,
  isDark,
  onDownload,
  onDelete,
  onRegenerate,
  onToggleActive,
  isRegenerating = false,
}: ResumeCardProps) {
  const { DesignIcon } = useResumeCard(resume, isDark);

  return (
    <div className="rounded-3xl border border-border/40 p-6 bg-card/75 backdrop-blur-xl hover:border-primary/30 shadow-xs transition-all flex flex-col justify-between">
      <div>
        <CardHeader
          resume={resume}
          isDark={isDark}
          onToggleActive={onToggleActive}
        />
        <p className="text-xs sm:text-sm mb-4 line-clamp-2 text-muted-foreground">
          {resume.description}
        </p>

        {resume.jobLink && (
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
            <a
              href={resume.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm truncate text-primary hover:underline hover:text-primary/80 font-medium"
            >
              {resume.jobLink}
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="text-xs text-muted-foreground font-medium">
          {resume.designType ? (
            <span className="flex items-center gap-1.5">
              <DesignIcon className="w-3.5 h-3.5 text-primary" />
              <span>Template: {resume.designType.toUpperCase()}</span>
            </span>
          ) : (
            "Standard Template"
          )}
        </div>
        <CardActions
          resume={resume}
          isDark={isDark}
          onDownload={onDownload}
          onDelete={onDelete}
          onRegenerate={onRegenerate}
          isRegenerating={isRegenerating}
        />
      </div>
    </div>
  );
}

export default ResumeCard;
