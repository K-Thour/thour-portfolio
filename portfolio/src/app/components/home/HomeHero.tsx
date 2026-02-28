import { motion } from 'motion/react';
import {
  ArrowDown,
  Shield,
  Code,
  Cpu,
  Terminal,
  Axe,
  Snowflake,
} from 'lucide-react';
import { Link } from 'react-router';
import { TerminalWindow } from '../../components/TerminalWindow';
import { CodeRain } from '../../components/CodeRain';
import { CodeSnippet } from '../../components/CodeSnippet';
import { useTheme } from '../../context/ThemeContext';

interface HomeHeroProps {
  profileImage?: string;
}

export function HomeHero({ profileImage }: HomeHeroProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <section
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-16 ${
        isDark
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
      }`}
    >
      {/* Code Rain Background - Only in dark mode */}
      {isDark && <CodeRain />}

      {/* Snowflakes for light mode */}
      {!isDark && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-300"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 100],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <Snowflake className="w-4 h-4" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated background stars/particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-white' : 'bg-blue-400'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-red-600/20' : 'bg-blue-600/20'
          }`}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className={`absolute w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-yellow-500/20' : 'bg-blue-400/20'
          }`}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-2 mb-4"
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
                  {isDark ? 'Developer Portfolio' : 'Nordic Developer'}
                </span>
              </motion.div>

              <h1
                className={`text-5xl md:text-6xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="block"
                >
                  {isDark ? 'Building The Future' : 'Forging Digital Realms'}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className={`block bg-clip-text text-transparent ${
                    isDark
                      ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-red-500'
                      : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700'
                  }`}
                >
                  {isDark ? 'One Line at a Time' : 'With Code & Honor'}
                </motion.span>
              </h1>

              <motion.p
                className={`text-xl mb-8 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {isDark
                  ? 'Full Stack Developer | AI Enthusiast | Tech Innovator'
                  : 'Full Stack Developer | Code Warrior | Digital Craftsman'}
              </motion.p>

              <motion.p
                className={`text-lg mb-10 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {isDark
                  ? 'Crafting intelligent solutions with modern technologies, from sleek interfaces to powerful backends.'
                  : 'Building legendary applications with the strength of modern frameworks and the wisdom of best practices.'}
              </motion.p>

              {/* Tech Icons */}
              <motion.div
                className="flex gap-4 mb-10 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-slate-800/50 border-red-500/20'
                      : 'bg-white border-blue-300/30 shadow-sm'
                  }`}
                >
                  <Code
                    className={`w-5 h-5 ${isDark ? 'text-red-500' : 'text-blue-600'}`}
                  />
                  <span
                    className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Clean Code
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-slate-800/50 border-yellow-500/20'
                      : 'bg-white border-blue-300/30 shadow-sm'
                  }`}
                >
                  <Cpu
                    className={`w-5 h-5 ${isDark ? 'text-yellow-500' : 'text-blue-500'}`}
                  />
                  <span
                    className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    AI Powered
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-slate-800/50 border-blue-500/20'
                      : 'bg-white border-blue-300/30 shadow-sm'
                  }`}
                >
                  <Terminal
                    className={`w-5 h-5 ${isDark ? 'text-blue-500' : 'text-blue-700'}`}
                  />
                  <span
                    className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Full Stack
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <Link
                  to="/contact"
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50'
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                  }`}
                >
                  {isDark ? 'Hire Me' : 'Begin Quest'}
                </Link>
                <Link
                  to="/projects"
                  className={`px-8 py-3 border-2 rounded-lg font-medium transition-all duration-300 ${
                    isDark
                      ? 'border-red-500 text-white hover:bg-red-500/10'
                      : 'border-blue-600 text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {isDark ? 'View Projects' : 'View Victories'}
                </Link>
              </motion.div>
            </motion.div>

            {/* Profile Image or Terminal */}
            <div className="relative">
              {profileImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    {/* Glowing ring effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-full blur-2xl opacity-50 ${
                        isDark
                          ? 'bg-gradient-to-r from-red-600 to-yellow-500'
                          : 'bg-gradient-to-r from-blue-600 to-blue-400'
                      }`}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Image container */}
                    <div
                      className={`relative rounded-full overflow-hidden border-4 shadow-2xl ${
                        isDark
                          ? 'border-red-500 shadow-red-500/50'
                          : 'border-blue-500 shadow-blue-500/30'
                      }`}
                    >
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Corner accents */}
                    <div
                      className={`absolute -top-4 -right-4 w-20 h-20 border-t-4 border-r-4 rounded-tr-3xl ${
                        isDark ? 'border-yellow-500' : 'border-blue-400'
                      }`}
                    />
                    <div
                      className={`absolute -bottom-4 -left-4 w-20 h-20 border-b-4 border-l-4 rounded-bl-3xl ${
                        isDark ? 'border-red-500' : 'border-blue-600'
                      }`}
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <TerminalWindow delay={0.4} />
                  <CodeSnippet delay={1.0} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown
          className={isDark ? 'w-6 h-6 text-red-500' : 'w-6 h-6 text-blue-600'}
        />
      </motion.div>
    </section>
  );
}
