import { motion } from "motion/react";
import { Edit2, Trash2, GraduationCap, Calendar } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { EducationCardProps } from "../types";
import { baseCard, iconBox, actionBtn } from "../utils/utils";

export function EducationCard({
  edu,
  index,
  onEdit,
  onDelete,
}: EducationCardProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
        delay: index * 0.05,
      }}
      className={baseCard(isDark)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-3">
            <div className={iconBox(isDark)}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                {edu.degree}
              </h3>
              <p className="text-sm font-medium text-muted-foreground mt-0.5">
                {edu.institution}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{edu.period}</span>
            </div>
            {edu.grade && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                {edu.grade}
              </span>
            )}
          </div>

          {edu.description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {edu.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(edu)}
            type="button"
            className={actionBtn(isDark, "edit")}
            aria-label="Edit education"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(edu.id)}
            type="button"
            className={actionBtn(isDark, "delete")}
            aria-label="Delete education"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
