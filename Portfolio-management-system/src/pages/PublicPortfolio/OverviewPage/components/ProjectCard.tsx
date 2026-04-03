import { motion } from "motion/react";
import { Github, Globe, Calendar, Tag } from "lucide-react";
import type { ProjectCardProps } from "../types";

export function ProjectCard({ project, index, isDark }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl overflow-hidden border transition-all hover:scale-105 flex flex-col h-full ${
        isDark
          ? "bg-slate-800/50 border-red-500/20 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20"
          : "bg-white border-blue-300/40 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/20"
      }`}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
            isDark ? "bg-slate-900/90 text-white" : "bg-white/90 text-gray-900"
          }`}
        >
          {project.category}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-xs">
            <Calendar
              className={`w-3 h-3 ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            />
            <span className={isDark ? "text-gray-500" : "text-gray-500"}>
              {project.date}
            </span>
          </div>
        </div>

        <p
          className={`text-sm mb-4 line-clamp-3 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                isDark
                  ? "bg-slate-700/50 text-gray-300"
                  : "bg-blue-100 text-gray-800"
              }`}
            >
              <Tag className="w-3 h-3" />
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
              isDark
                ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg"
                : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
            }`}
          >
            <Globe className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
              isDark
                ? "bg-slate-700 text-white hover:bg-slate-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
