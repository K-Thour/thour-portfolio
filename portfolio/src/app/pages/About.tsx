import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AboutHero } from '../components/about/AboutHero';
import { AboutStats } from '../components/about/AboutStats';
import { AboutSkills } from '../components/about/AboutSkills';
import { AboutMission } from '../components/about/AboutMission';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <div
      className={`min-h-screen pt-24 pb-20 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <AboutHero isInView={isInView} />

          {/* Stats */}
          <AboutStats isInView={isInView} />

          {/* Skills Grid */}
          <AboutSkills isInView={isInView} />

          {/* Mission Statement */}
          <AboutMission isInView={isInView} />
        </motion.div>
      </div>
    </div>
  );
}
