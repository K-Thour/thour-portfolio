import { FileQuestion, Swords } from "lucide-react";
import { BackButton } from "./BackButton";

interface ProjectNotFoundProps {
  isDark?: boolean;
}

export function ProjectNotFound({ isDark = true }: ProjectNotFoundProps) {
  return (
    <div
      className={`min-h-screen flex items-center-safe justify-center -mt-12`}
    >
      <div className="text-center px-6">
        <div
          className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark ? "bg-linear-to-br from-red-600 to-yellow-500" : "bg-linear-to-br from-blue-600 to-blue-400"}`}
        >
          {isDark ? (
            <FileQuestion className="w-12 h-12 text-white" />
          ) : (
            <Swords className="w-12 h-12 text-white" />
          )}
        </div>
        <h1
          className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {isDark ? "Project Not Found" : "Quest Unavailable"}
        </h1>
        <p
          className={`text-lg max-w-md mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          {isDark
            ? "The project you're looking for doesn't exist or has been moved."
            : "This legend has yet to be written, or the scroll has been misplaced."}
        </p>
        <div className="flex items-center justify-center">
          <BackButton isDark={isDark} />
        </div>
      </div>
    </div>
  );
}
