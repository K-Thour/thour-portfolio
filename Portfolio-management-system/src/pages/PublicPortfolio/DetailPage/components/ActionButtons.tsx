import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

interface ActionButtonsProps {
  link: string;
  github: string;
  isInView: boolean;
  isDark: boolean;
}

export function ActionButtons({
  link,
  github,
  isInView,
  isDark,
}: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex gap-4"
    >
      <a
        href={link}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        <ExternalLink className="w-5 h-5" />
        {isDark ? "View Live" : "See in Action"}
      </a>
      <a
        href={github}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all hover:scale-105 ${
          isDark
            ? "border-red-500/50 text-white hover:bg-red-500/10"
            : "border-blue-500 text-blue-700 hover:bg-blue-50"
        }`}
      >
        <Github className="w-5 h-5" />
        {isDark ? "Source Code" : "View Runes"}
      </a>
    </motion.div>
  );
}
