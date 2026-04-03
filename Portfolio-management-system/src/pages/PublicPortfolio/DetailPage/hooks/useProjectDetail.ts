import { useInView } from "motion/react";
import { useRef } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import { projectsData } from "../data/projects";
import type { ProjectData } from "../types";

interface UseProjectDetailReturn {
  projectId: string | undefined;
  project: ProjectData | undefined;
  ref: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
  theme: string;
  isDark: boolean;
}

export function useProjectDetail(): UseProjectDetailReturn {
  const { projectId } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  const id = parseInt(projectId || "", 10);
  const project = Object.values(projectsData).find((p) => p.id === id);

  return { projectId, project, ref, isInView, theme, isDark };
}
