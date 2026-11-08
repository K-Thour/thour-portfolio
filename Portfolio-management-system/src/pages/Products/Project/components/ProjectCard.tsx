import { motion } from "motion/react";
import { Edit2, Trash2, ExternalLink, Eye, Github } from "lucide-react";
import type { ProjectCardProps } from "./types";

export function ProjectCard({
  project,
  index,
  onEdit,
  onDelete,
  onView,
}: ProjectCardProps) {
  const isCompleted = project.status === "Completed";

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
        delay: index * 0.05,
      }}
      className="p-5 sm:p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl hover:border-primary/30 shadow-xs transition-all"
    >
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <img
          src={project.image || "https://placehold.co/400x300"}
          alt={project.title}
          className="w-full sm:w-28 h-40 sm:h-28 rounded-2xl object-cover border border-border/40 shadow-xs shrink-0"
        />

        <div className="flex-1 flex flex-col justify-between w-full min-h-28">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap mb-1">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    isCompleted
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25"
                  }`}
                >
                  {project.status}
                </span>
                {project.category && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/60 text-muted-foreground border border-border/40 font-medium">
                    {project.category}
                  </span>
                )}
              </div>

              {project.subtitle && (
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-2">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onView(project)}
                type="button"
                className="p-2 rounded-xl transition-colors hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 cursor-pointer"
                aria-label={`View ${project.title}`}
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEdit(project)}
                type="button"
                className="p-2 rounded-xl transition-colors hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 cursor-pointer"
                aria-label={`Edit ${project.title}`}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(project.id)}
                type="button"
                className="p-2 rounded-xl transition-colors hover:bg-destructive/10 text-muted-foreground hover:text-destructive active:scale-95 cursor-pointer"
                aria-label={`Delete ${project.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Links & metrics */}
          <div className="flex items-center gap-4 pt-3 mt-2 border-t border-border/30 flex-wrap text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span>{project.views} views</span>
            </div>

            {project.github &&
              project.github !== "#" &&
              project.github !== "https://github.com" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  <Github className="w-3.5 h-3.5" />
                  Source Code
                </a>
              )}

            {project.liveUrl &&
              project.liveUrl !== "#" &&
              project.liveUrl !== "https://example.com" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Live
                </a>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
