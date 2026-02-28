import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Language' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'GraphQL', category: 'API' },
    { name: 'TensorFlow', category: 'AI/ML' },
    { name: 'Redis', category: 'Cache' },
  ];

  return (
    <section
      className={`py-16 ${isDark ? 'bg-slate-950/50' : 'bg-gradient-to-br from-white to-blue-50'}`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3
              className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {isDark ? 'Tech Arsenal' : 'Weapons of Choice'}
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>
              Technologies I work with on a daily basis
            </p>
          </div>

          {/* Scrolling tech stack */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-scroll">
              {[...technologies, ...technologies].map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className={`flex-shrink-0 rounded-lg px-6 py-3 min-w-fit border ${
                    isDark
                      ? 'bg-slate-800/50 border-red-500/20'
                      : 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300/40 shadow-sm'
                  }`}
                >
                  <div
                    className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {tech.name}
                  </div>
                  <div
                    className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-700'}`}
                  >
                    {tech.category}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
