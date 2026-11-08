import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

interface ActionButtonsProps {
  link: string;
  github: string;
  isInView: boolean;
  isDark?: boolean;
}

export function ActionButtons({
  link,
  github,
  isInView,
}: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ type: "spring", damping: 26, stiffness: 280, delay: 0.15 }}
      className="flex flex-wrap gap-3"
    >
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-primary text-primary-foreground shadow-xs hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Live Project</span>
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/40 bg-accent/60 hover:bg-accent text-foreground font-medium text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <Github className="w-4 h-4" />
          <span>Source Code</span>
        </a>
      )}
    </motion.div>
  );
}

