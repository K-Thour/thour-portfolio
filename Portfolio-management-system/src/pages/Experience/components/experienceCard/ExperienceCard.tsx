import React from "react";
import { Briefcase, Calendar, MapPin, Pencil, Trash2 } from "lucide-react";
import utils from "../../../../utils";

const { cn } = utils.tailwindUtils;

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  achievements: string[];
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
  isDark,
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
    <div className="relative flex gap-4">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            experience.isCurrent
              ? isDark
                ? "bg-linear-to-r from-orange-500 to-red-500"
                : "bg-blue-500"
              : isDark
                ? "bg-slate-600"
                : "bg-slate-300",
          )}
        />
        {!isLast && (
          <div
            className={cn(
              "w-0.5 flex-1 mt-2",
              isDark ? "bg-slate-700" : "bg-slate-200",
            )}
          />
        )}
      </div>

      {/* Card content */}
      <div
        className={cn(
          "flex-1 rounded-2xl p-6 mb-6 border",
          isDark
            ? "bg-slate-800/50 border-slate-700"
            : "bg-white border-slate-200",
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* Company icon */}
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                isDark
                  ? "bg-linear-to-br from-orange-500 to-red-500"
                  : "bg-blue-500",
              )}
            >
              {experience.icon || <Briefcase className="w-6 h-6 text-white" />}
            </div>

            {/* Job details */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3
                  className={cn(
                    "text-lg font-bold",
                    isDark ? "text-white" : "text-slate-900",
                  )}
                >
                  {experience.jobTitle}
                </h3>
                {experience.isCurrent && (
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full",
                      isDark
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-green-100 text-green-600 border border-green-200",
                    )}
                  >
                    Current
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "text-sm font-medium mt-0.5",
                  isDark ? "text-slate-400" : "text-slate-500",
                )}
              >
                {experience.company}
              </p>

              {/* Date and location */}
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-sm",
                    isDark ? "text-slate-500" : "text-slate-400",
                  )}
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {experience.startDate} -{" "}
                    {experience.isCurrent ? "Present" : experience.endDate}
                  </span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-sm",
                    isDark ? "text-slate-500" : "text-slate-400",
                  )}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isDark
                  ? "hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                  : "hover:bg-slate-100 text-slate-500 hover:text-slate-700",
              )}
              aria-label="Edit experience"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isDark
                  ? "hover:bg-slate-700 text-slate-400 hover:text-red-400"
                  : "hover:bg-slate-100 text-slate-500 hover:text-red-600",
              )}
              aria-label="Delete experience"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Achievements */}
        {experience.achievements.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {experience.achievements.map((achievement, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-start gap-2 text-sm",
                  isDark ? "text-slate-400" : "text-slate-600",
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                    isDark ? "bg-red-500" : "bg-blue-500",
                  )}
                />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
