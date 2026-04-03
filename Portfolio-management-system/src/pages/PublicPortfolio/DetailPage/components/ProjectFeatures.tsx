import { Zap, Shield, Swords } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import type { ProjectFeaturesProps } from "../types";
import { FeatureItem } from "./FeatureItem";
import { TechItem } from "./TechItem";
import { ChallengeItem } from "./ChallengeItem";

export function ProjectFeatures({ project, isInView }: ProjectFeaturesProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <>
      <div className="mb-12">
        <h2
          className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {isDark ? (
            <Shield className="w-6 h-6 text-red-500" />
          ) : (
            <Swords className="w-6 h-6 text-blue-600" />
          )}
          {isDark ? "Key Features" : "Legendary Features"}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {project.features.map((feature, index) => (
            <FeatureItem
              key={feature}
              feature={feature}
              index={index}
              isInView={isInView}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
      <div className="mb-12">
        <h2
          className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          <Zap
            className={
              isDark ? "w-6 h-6 text-yellow-500" : "w-6 h-6 text-blue-500"
            }
          />
          {isDark ? "Technologies Used" : "Weapons Wielded"}
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech, index) => (
            <TechItem
              key={tech}
              tech={tech}
              index={index}
              isInView={isInView}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
      <div className="mb-12">
        <h2
          className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {isDark ? "Technical Challenges" : "Trials Overcome"}
        </h2>
        <div className="space-y-4">
          {project.challenges.map((challenge, index) => (
            <ChallengeItem
              key={challenge.title}
              challenge={challenge}
              index={index}
              isInView={isInView}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </>
  );
}
