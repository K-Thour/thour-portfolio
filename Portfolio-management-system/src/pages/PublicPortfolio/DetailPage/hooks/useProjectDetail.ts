import { useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import { fetchProjects } from "../../../../services/api";
import { allProjects } from "../../OverviewPage/data/allProjects";
import type { ProjectData } from "../types";

interface UseProjectDetailReturn {
  projectId: string | undefined;
  project: ProjectData | undefined;
  isLoading: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
  theme: string;
  isDark: boolean;
}

export function normalizeProjectList(payload: any): any[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.projects)) {
    return payload.projects;
  }

  return [];
}

export function useProjectDetail(): UseProjectDetailReturn {
  const { projectId } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";
  const [project, setProject] = useState<ProjectData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProjects();
        const projects = normalizeProjectList(data);
        const matched = projects.find((item: any) => {
          const id = item._id || item.id;
          return String(id) === String(projectId);
        });

        if (matched) {
          setProject({
            id: matched._id || matched.id,
            title: matched.title || "Untitled project",
            subtitle: matched.device || "web",
            category:
              typeof matched.category === "object"
                ? matched.category?.name || "Uncategorized"
                : matched.category || "Uncategorized",
            categoryIconUrl:
              typeof matched.category === "object"
                ? matched.category?.iconUrl?.url ||
                  matched.category?.iconUrl ||
                  undefined
                : undefined,
            description: matched.description || matched.fullDescription || "",
            fullDescription:
              matched.fullDescription || matched.description || "",
            image: matched.image?.url || matched.image || "",
            status: matched.outcome || "Completed",
            date: matched.year ? String(matched.year) : "",
            team: matched.client || "Personal",
            technologies: (matched.techStack || []).map((tech: any) => ({
              name: tech.name || tech,
              iconUrl: tech.iconUrl?.url || tech.iconUrl || "",
            })),
            link: matched.workingUrl || "",
            github: matched.githubUrl || "",
            challenges:
              Array.isArray(matched.challenges) && matched.challenges.length > 0
                ? matched.challenges.map((challenge: any) => ({
                    title: challenge.title || "Challenge",
                    description: challenge.description || "",
                  }))
                : [
                    {
                      title: "Implementation",
                      description:
                        matched.fullDescription || matched.description || "",
                    },
                  ],
            features:
              Array.isArray(matched.features) && matched.features.length > 0
                ? matched.features
                : [
                    matched.description ||
                      matched.fullDescription ||
                      "Project details",
                  ],
            results:
              Array.isArray(matched.results) && matched.results.length > 0
                ? matched.results
                : [matched.outcome || "Completed successfully"],
          });
        } else {
          const fallbackProject = allProjects.find(
            (item) => String(item.id) === String(projectId),
          );

          if (fallbackProject) {
            setProject({
              id: fallbackProject.id,
              title: fallbackProject.title,
              subtitle: "Project",
              category: fallbackProject.category,
              description: fallbackProject.description,
              image: fallbackProject.image,
              status: "Completed",
              date: fallbackProject.date,
              team: "Personal",
              technologies: fallbackProject.technologies.map(
                (tech: string) => ({
                  name: tech,
                  iconUrl: "",
                }),
              ),
              link: fallbackProject.liveUrl,
              github: fallbackProject.githubUrl,
              challenges: [
                {
                  title: "Overview",
                  description: fallbackProject.description,
                },
              ],
              features: [fallbackProject.description],
              results: [fallbackProject.date],
            });
          } else {
            setProject(undefined);
          }
        }
      } catch (error) {
        console.error("Failed to load public project detail:", error);
        const fallbackProject = allProjects.find(
          (item) => String(item.id) === String(projectId),
        );
        setProject(
          fallbackProject
            ? {
                id: fallbackProject.id,
                title: fallbackProject.title,
                subtitle: "Project",
                category: fallbackProject.category,
                description: fallbackProject.description,
                image: fallbackProject.image,
                status: "Completed",
                date: fallbackProject.date,
                team: "Personal",
                technologies: fallbackProject.technologies.map(
                  (tech: string) => ({
                    name: tech,
                    iconUrl: "",
                  }),
                ),
                link: fallbackProject.liveUrl,
                github: fallbackProject.githubUrl,
                challenges: [
                  {
                    title: "Overview",
                    description: fallbackProject.description,
                  },
                ],
                features: [fallbackProject.description],
                results: [fallbackProject.date],
              }
            : undefined,
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProject();
  }, [projectId]);

  return { projectId, project, isLoading, ref, isInView, theme, isDark };
}
