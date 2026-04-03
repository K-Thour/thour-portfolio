import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import type { ProjectData } from "../types";
import { ResultItem } from "./ResultItem";
import { ContactCTA } from "./ContactCTA";

interface ProjectResultsProps {
  project: ProjectData;
  isInView: boolean;
}

export function ProjectResults({ project, isInView }: ProjectResultsProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <>
      <div className="mb-12">
        <h2
          className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {isDark ? "Results & Impact" : "Spoils of War"}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {project.results.map((result, index) => (
            <ResultItem
              key={result}
              result={result}
              index={index}
              isInView={isInView}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
      <ContactCTA isInView={isInView} isDark={isDark} />
    </>
  );
}
