import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../../hooks/useRedux";
import type { RootState } from "../../../store/store";
import { NotFoundState, PortfolioHeader, ProjectsGrid } from "./components";
import type { PortfolioData } from "./types";
import { LoadingState } from "../../../components/common/loadingState/LoadingState";
import {
  fetchCurrentUser,
  fetchPortfolios,
  fetchProjects,
} from "../../../services/api";
import { buildPublicPortfolioData } from "./utils/portfolioData";
import { allProjects } from "./data/allProjects";

const getDisplayNameFromValue = (value: unknown, fallback = "User") => {
  if (!value) return fallback;

  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  if (typeof value === "object") {
    const candidate = value as Record<string, unknown>;
    const name =
      (candidate.name as string | undefined) ||
      (candidate.username as string | undefined) ||
      (candidate.fullName as string | undefined) ||
      (candidate.firstName as string | undefined) ||
      (candidate.lastName as string | undefined);

    if (typeof name === "string" && name.trim()) {
      return name.trim();
    }
  }

  return fallback;
};

function PublicPortfolioOverviewPage() {
  const params = useParams();
  const { token } = params;
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const loadUser = async () => {
      if (!localStorage.getItem("token")) {
        return;
      }

      try {
        const data = await fetchCurrentUser();
        setUserName(
          getDisplayNameFromValue(
            data?.name ||
              data?.username ||
              data?.firstName ||
              data?.fullName ||
              data,
          ),
        );
      } catch {
        setUserName((current) => current || "User");
      }
    };

    void loadUser();
  }, []);

  useEffect(() => {
    const loadPortfolio = async () => {
      setLoading(true);
      try {
        const [portfolioDataResponse, projectsResponse] = await Promise.all([
          fetchPortfolios(),
          fetchProjects(),
        ]);
        const portfolio = (portfolioDataResponse || []).find(
          (p: any) => p._id === token,
        );

        if (portfolio) {
          const normalizedProjects = Array.isArray(projectsResponse)
            ? projectsResponse
            : projectsResponse?.data || [];
          const builtPortfolio = buildPublicPortfolioData(
            portfolio,
            normalizedProjects,
          );

          if (!builtPortfolio.projects.length) {
            const fallbackProjects = allProjects.filter((project: any) =>
              (
                portfolio.project ||
                portfolio.projects ||
                portfolio.projectIds ||
                []
              ).some((id: any) => {
                const selectedId =
                  typeof id === "object" ? id._id || String(id) : String(id);
                return String(project.id) === selectedId;
              }),
            );

            builtPortfolio.projects = fallbackProjects;
          }

          setUserName((current) => {
            if (current && current !== "User") {
              return current;
            }
            return getDisplayNameFromValue(portfolio.createdBy, "User");
          });
          setPortfolioData(builtPortfolio as PortfolioData);
        } else {
          setPortfolioData(null);
        }
      } catch (error) {
        console.error("Failed to load public portfolio:", error);
        setPortfolioData(null);
      } finally {
        setLoading(false);
      }
    };

    void loadPortfolio();
  }, [token]);

  if (loading) {
    return <LoadingState isDark={isDark} />;
  }

  if (!portfolioData) {
    return <NotFoundState isDark={isDark} />;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center overflow-hidden transition-colors duration-500`}
    >
      {/* Main Content */}
      <main className="container relative p-4">
        <PortfolioHeader
          isDark={isDark}
          projectCount={portfolioData.projects.length}
          userName={userName}
        />
        <ProjectsGrid projects={portfolioData.projects} isDark={isDark} />
      </main>
    </div>
  );
}

export default PublicPortfolioOverviewPage;
