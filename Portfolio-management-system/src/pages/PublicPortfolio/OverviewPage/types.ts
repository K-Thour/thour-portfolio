export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  date: string;
}

export interface PortfolioData {
  name: string;
  projects: Project[];
  createdAt: string;
}

export interface SharedPortfolio {
  id: string;
  name: string;
  projectIds: number[];
  createdAt: string;
}

export interface LoadingStateProps {
  isDark: boolean;
}

export interface NotFoundStateProps {
  isDark: boolean;
}

export interface PortfolioHeaderProps {
  isDark: boolean;
  projectCount: number;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  isDark: boolean;
}

export interface ProjectsGridProps {
  projects: Project[];
  isDark: boolean;
}
