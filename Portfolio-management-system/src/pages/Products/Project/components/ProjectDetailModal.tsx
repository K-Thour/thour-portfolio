import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, Tag, Cpu, ChevronRight } from "lucide-react";
import type { Project } from "./types";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  const isCompleted = project.status === "Completed";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-border/50 bg-card/95 backdrop-blur-2xl text-foreground"
          >
            {/* Hero Image */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img
                src={project.image || "https://placehold.co/800x300"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                type="button"
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 rounded-xl backdrop-blur-md bg-background/80 hover:bg-background text-foreground border border-border/50 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Status badge over image */}
              <div className="absolute bottom-4 left-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    isCompleted
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title & Category */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="text-sm font-medium text-muted-foreground">
                    {project.subtitle}
                  </p>
                )}
              </div>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2">
                {project.category && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-border/40 bg-accent/50 text-foreground">
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    <span>{project.category}</span>
                  </div>
                )}
                {project.subtitle && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-border/40 bg-accent/50 text-foreground">
                    <Cpu className="w-3.5 h-3.5 text-primary" />
                    <span>{project.subtitle}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Overview
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Long Description */}
              {project.longDescription &&
                project.longDescription !== project.description && (
                  <div className="p-4 rounded-2xl border border-border/40 bg-accent/30">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Full Details
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                      {project.longDescription}
                    </p>
                  </div>
                )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl text-xs font-medium border border-border/40 bg-accent/50 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Key Features
                  </h3>
                  <ul className="space-y-1.5">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap pt-4 border-t border-border/40">
                {project.liveUrl &&
                  project.liveUrl !== "#" &&
                  project.liveUrl !== "https://example.com" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.98] shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                {project.github &&
                  project.github !== "#" &&
                  project.github !== "https://github.com" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border border-border/60 hover:bg-accent/60 text-foreground transition-all active:scale-[0.98]"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                <button
                  onClick={onClose}
                  type="button"
                  className="px-5 py-2.5 rounded-xl font-medium text-sm border border-border/60 hover:bg-accent/60 text-foreground transition-all active:scale-[0.98] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ProjectDetailModal;
