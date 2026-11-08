import { Sparkles, Cpu } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import type { ProjectFeaturesProps } from "../types";
import { FeatureItem } from "./FeatureItem";
import { TechItem } from "./TechItem";

export function ProjectFeatures({ project, isInView }: ProjectFeaturesProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <>
      {project.features && project.features.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Key Features</span>
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
      )}

      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-primary" />
            <span>Technologies & Stack</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech, index) => (
              <TechItem
                key={tech.name}
                tech={tech}
                index={index}
                isInView={isInView}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

