import { motion } from 'motion/react';
import { Shield, Swords } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ProjectsHeaderProps {
  isInView: boolean;
}

export function ProjectsHeader({ isInView }: ProjectsHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 mb-4"
      >
        {isDark ? (
          <Shield className="w-6 h-6 text-red-500" />
        ) : (
          <Swords className="w-6 h-6 text-amber-700" />
        )}
        <span
          className={`font-medium uppercase tracking-wider text-sm ${
            isDark ? 'text-red-500' : 'text-amber-700'
          }`}
        >
          {isDark ? 'Project Showcase' : 'Saga of Triumphs'}
        </span>
      </motion.div>
      <h1
        className={`text-4xl md:text-5xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {isDark ? 'Featured Work' : 'Legendary Conquests'}
      </h1>
      <p
        className={`text-xl max-w-2xl mx-auto ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {isDark
          ? 'A collection of recent projects showcasing my technical skills and creative solutions.'
          : 'Tales of battles won through code, strategy, and unwavering determination.'}
      </p>
    </div>
  );
}
