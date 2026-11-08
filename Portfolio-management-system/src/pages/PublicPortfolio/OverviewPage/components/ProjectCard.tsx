import { motion } from "motion/react";
import { Github, Globe, Calendar, Tag, Folder } from "lucide-react";
import type { ProjectCardProps } from "../types";
import { useNavigate } from "react-router-dom";

export function ProjectCard({ project, index }: ProjectCardProps) {
  const navigate = useNavigate();
  const redirectToDetailPage = (id: number) => {
    navigate(`/publicPortfolio/detailPage/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
        delay: index * 0.05,
      }}
      onClick={() => redirectToDetailPage(project.id)}
      className="group rounded-3xl overflow-hidden cursor-pointer border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full active:scale-[0.99]"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-accent/20">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 bg-card/85 backdrop-blur-md text-foreground border border-border/40 shadow-xs">
          {project.categoryIconUrl ? (
            <img
              src={project.categoryIconUrl}
              alt=""
              className="w-4 h-4 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <Folder className="w-3.5 h-3.5 text-primary" />
          )}
          <span>{project.category}</span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2.5">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.date && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.date}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/60 text-muted-foreground border border-border/40"
            >
              <Tag className="w-3 h-3 text-primary/70" />
              <span>{tech}</span>
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-2 border-t border-border/20">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs bg-primary text-primary-foreground shadow-xs hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="View source code on GitHub"
            className="flex items-center justify-center px-3 py-2.5 rounded-xl font-medium text-xs bg-accent/60 hover:bg-accent text-foreground active:scale-95 transition-all duration-200 cursor-pointer border border-border/40"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

