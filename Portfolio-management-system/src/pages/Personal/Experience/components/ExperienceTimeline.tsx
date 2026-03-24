import React from "react";
import type { Experience } from "./experienceCard/ExperienceCard";
import { ExperienceCard } from "./experienceCard/ExperienceCard";

interface ExperienceTimelineProps {
  experiences: Experience[];
  isDark: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  isDark,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-0">
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          isDark={isDark}
          isLast={index === experiences.length - 1}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ExperienceTimeline;
