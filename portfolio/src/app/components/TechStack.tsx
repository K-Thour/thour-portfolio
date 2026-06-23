import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { fetchTechnologies } from '../../services/api';

interface Technology {
  name: string;
  category: string;
}

interface TechPillProps {
  tech: Technology;
  isDark: boolean;
}

function TechPill({ tech, isDark }: TechPillProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.15 }}
      className={`flex-shrink-0 rounded-xl px-5 py-3 min-w-fit border cursor-default select-none ${
        isDark
          ? 'bg-slate-800/70 border-red-500/20 hover:border-red-500/40 hover:bg-slate-800'
          : 'bg-white border-blue-300/40 shadow-sm hover:border-blue-400/60 hover:shadow-md'
      }`}
    >
      <div
        className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        {tech.name}
      </div>
      <div
        className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
      >
        {tech.category}
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchTechnologies();
      const mapped: Technology[] = (data || []).map((t: any) => ({
        name: t.name || t.technology || 'Unknown',
        category: t.category || 'Tool',
      }));
      if (mapped.length === 0) {
        setError(true);
      } else {
        setTechnologies(mapped);
      }
    } catch (e) {
      console.error('Failed to fetch technologies:', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section
      className={`py-20 ${
        isDark ? 'bg-slate-950/50' : 'bg-gradient-to-br from-white to-blue-50'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-xs font-semibold tracking-widest uppercase mb-3 block ${
                isDark ? 'text-red-500' : 'text-blue-600'
              }`}
            >
              {isDark ? 'ARSENAL' : 'TOOLS'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {isDark ? 'Tech Arsenal' : 'Weapons of Choice'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className={isDark ? 'text-gray-400' : 'text-gray-600'}
            >
              Technologies I work with on a daily basis
            </motion.p>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 rounded-xl px-5 py-3 w-28 h-14 animate-pulse ${
                    isDark ? 'bg-slate-800/50' : 'bg-blue-100/60'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex flex-col items-center justify-center gap-4 py-12 rounded-2xl border ${
                isDark
                  ? 'bg-slate-800/40 border-red-500/20 text-slate-400'
                  : 'bg-blue-50/60 border-blue-300/30 text-gray-500'
              }`}
            >
              <AlertTriangle
                className={`w-8 h-8 ${isDark ? 'text-red-500/70' : 'text-blue-400'}`}
              />
              <p className="text-sm font-medium">
                Failed to load technologies. Please try again.
              </p>
              <button
                onClick={loadData}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-pointer ${
                  isDark
                    ? 'bg-red-600/80 hover:bg-red-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </motion.div>
          )}

          {/* Scrolling Tech Row */}
          {!loading && !error && technologies.length > 0 && (
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-scroll w-max flex-nowrap">
                {[...technologies, ...technologies].map((tech, i) => (
                  <TechPill
                    key={`${tech.name}-${i}`}
                    tech={tech}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
