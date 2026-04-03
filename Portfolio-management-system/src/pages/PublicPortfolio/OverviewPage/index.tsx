import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../../hooks/useRedux";
import type { RootState } from "../../../store/store";
import {
  LoadingState,
  NotFoundState,
  PortfolioHeader,
  ProjectsGrid,
} from "./components";
import { allProjects } from "./data/allProjects";
import type { PortfolioData, Project, SharedPortfolio } from "./types";

function PublicPortfolioPage() {
  const { token } = useParams();
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sharedPortfolios = JSON.parse(
      localStorage.getItem("shared-portfolios") || "[]",
    );
    const portfolio = sharedPortfolios.find(
      (p: SharedPortfolio) => p.id === token,
    );

    if (portfolio) {
      const projects = portfolio.projectIds
        .map((id: number) => allProjects.find((p) => p.id === id))
        .filter(Boolean) as Project[];

      // Defer setState to avoid cascading renders
      queueMicrotask(() => {
        setPortfolioData({
          name: portfolio.name,
          projects,
          createdAt: portfolio.createdAt,
        });
      });
    }

    queueMicrotask(() => {
      setLoading(false);
    });
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
        />
        <ProjectsGrid projects={portfolioData.projects} isDark={isDark} />
      </main>
    </div>
  );
}

export default PublicPortfolioPage;
