import React from "react";
import { Briefcase, Calendar, MapPin, Pencil, Trash2 } from "lucide-react";
import { motion } from "motion/react";

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  employmentType?: string;
  achievements: string[];
  technologies?: string[];
  icon?: React.ReactNode;
}

export interface ExperienceCardProps {
  experience: Experience;
  isDark: boolean;
  isLast?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  isLast = false,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    onEdit?.(experience.id);
  };

  const handleDelete = () => {
    onDelete?.(experience.id);
  };

  return (
    <div className="relative flex items-stretch gap-0">
      {/* Timeline marker and vertical line */}
      <div className="w-8 sm:w-10 flex flex-col items-center shrink-0 pt-6">
        <motion.div
          className={`w-3.5 h-3.5 rounded-full z-10 ${
            experience.isCurrent
              ? "bg-emerald-500 ring-4 ring-emerald-500/20"
              : "bg-muted-foreground/40 border-2 border-background"
          }`}
          animate={
            experience.isCurrent
              ? {
                  scale: [1, 1.15, 1],
                }
              : {}
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-border/60 my-2" />
        )}
      </div>

      {/* Card content */}
      <div className="flex-1 rounded-2xl p-5 sm:p-6 mb-6 border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs hover:border-primary/30 transition-all">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 text-primary border border-primary/20 shadow-xs">
              {experience.icon || <Briefcase className="w-5 h-5" />}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                  {experience.jobTitle}
                </h3>
                {experience.isCurrent && (
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-0.5">
                {experience.company}
              </p>

              {/* Date, location and employment type */}
              <div className="flex items-center gap-4 mt-2 flex-wrap text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>
                    {experience.startDate} -{" "}
                    {experience.isCurrent ? "Present" : experience.endDate}
                  </span>
                </div>
                {experience.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{experience.location}</span>
                  </div>
                )}
                {experience.employmentType && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-accent/60 text-foreground border border-border/40">
                    {experience.employmentType}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleEdit}
              type="button"
              className="p-2 rounded-xl transition-colors hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 cursor-pointer"
              aria-label="Edit experience"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="p-2 rounded-xl transition-colors hover:bg-destructive/10 text-muted-foreground hover:text-destructive active:scale-95 cursor-pointer"
              aria-label="Delete experience"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Achievements / features */}
        {experience.achievements && experience.achievements.length > 0 && (
          <ul className="mt-4 space-y-2">
            {experience.achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-primary/70" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-accent/50 text-foreground border border-border/40"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
