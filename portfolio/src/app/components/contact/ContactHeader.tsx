import { motion } from 'motion/react';
import { Shield, Axe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ContactHeaderProps {
  isInView: boolean;
}

export function ContactHeader({ isInView }: ContactHeaderProps) {
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
          <Axe className="w-6 h-6 text-blue-600" />
        )}
        <span
          className={`font-medium uppercase tracking-wider text-sm ${
            isDark ? 'text-red-500' : 'text-blue-600'
          }`}
        >
          {isDark ? 'Assemble' : 'Summon'}
        </span>
      </motion.div>
      <h1
        className={`text-4xl md:text-5xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {isDark ? 'Join Forces' : 'Gather the Warriors'}
      </h1>
      <p
        className={`text-xl max-w-2xl mx-auto ${
          isDark ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        {isDark
          ? "Have a mission in mind? Let's team up and create something legendary."
          : 'A great quest awaits. Send word and we shall forge glory together.'}
      </p>
    </div>
  );
}
