const getCategoryName = (category: any) => {
  if (!category) return "Uncategorized";

  if (typeof category === "string") {
    return category;
  }

  if (typeof category === "object") {
    if (typeof category.name === "string" && category.name.trim()) {
      return category.name;
    }

    if (typeof category.title === "string" && category.title.trim()) {
      return category.title;
    }

    return category._id || "Uncategorized";
  }

  return String(category);
};

const getCategoryIconUrl = (category: any) => {
  if (!category) return undefined;

  if (typeof category === "object") {
    if (category.iconUrl?.url) {
      return category.iconUrl.url;
    }
    if (category.iconUrl) {
      return category.iconUrl;
    }
  }

  return undefined;
};

export function buildPublicPortfolioData(portfolio: any, projects: any[]) {
  const selectedIds = (
    portfolio.project ||
    portfolio.projects ||
    portfolio.projectIds ||
    []
  ).map((id: any) =>
    typeof id === "object" ? id._id || String(id) : String(id),
  );

  const matchedProjects = (projects || []).filter((project: any) => {
    const projectId = project._id || project.id;
    return selectedIds.includes(String(projectId));
  });

  return {
    name: portfolio.name,
    projects: matchedProjects.map((project: any) => ({
      id: project._id || project.id,
      title: project.title || "Untitled project",
      category: getCategoryName(project.category),
      categoryIconUrl: getCategoryIconUrl(project.category),
      image: project.image?.url || project.image || "",
      description: project.description || project.fullDescription || "",
      technologies: (project.techStack || []).map(
        (tech: any) => tech.name || tech,
      ),
      liveUrl: project.workingUrl || project.liveUrl || "",
      githubUrl: project.githubUrl || project.github || "",
      date: project.year ? String(project.year) : "",
    })),
    createdAt: portfolio.createdAt,
  };
}
