import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  Shield,
  Axe,
  Snowflake,
  Cpu,
  Terminal,
  Code,
} from 'lucide-react';
import { Link } from 'react-router';
import { CodeRain } from '../../components/CodeRain';
import { HeroAvatarLoader } from './HeroAvatarLoader';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const STATIC_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${((i * 19 + 7) % 95) + 2}%`,
  left: `${((i * 23 + 11) % 94) + 3}%`,
  duration: `${3 + (i % 4) * 0.8}s`,
  delay: `${(i * 0.4) % 3}s`,
  size: i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1',
}));

const STATIC_SNOWFLAKES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 6.2 + 2) % 96}%`,
  duration: `${6 + (i % 5) * 1.5}s`,
  delay: `${(i * 0.5) % 4}s`,
}));

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export function HomeHero() {
  const { userData, loading: userLoading } = useUser();
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const profileImage = userData?.image?.trim() || '';

  // Preload image when profileImage URL becomes available
  useEffect(() => {
    if (!profileImage) {
      setImageLoaded(false);
      return;
    }

    const img = new Image();
    img.src = profileImage;
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      setImageLoaded(false);
      setImageError(true);
    };
  }, [profileImage]);

  const particles = useMemo(() => STATIC_PARTICLES, []);
  const snowflakes = useMemo(() => STATIC_SNOWFLAKES, []);

  const showLoader = userLoading || (!imageLoaded && !imageError && Boolean(profileImage));
  const showMonogram = (!userLoading && !profileImage) || imageError;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Dark Mode Atmosphere Layer (GPU Cross-fade) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-in-out ${
          isDark ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900`}
      >
        <CodeRain />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse bg-red-600/20"
          style={{ top: '10%', left: '10%' }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse bg-yellow-500/20"
          style={{ bottom: '10%', right: '10%', animationDelay: '1.5s' }}
        />
      </div>

      {/* Light Mode Atmosphere Layer (GPU Cross-fade) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none select-none transition-opacity duration-500 ease-in-out ${
          !isDark ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100`}
      >
        <div className="absolute inset-0 overflow-hidden motion-reduce:hidden">
          {snowflakes.map((snow) => (
            <div
              key={snow.id}
              className="absolute text-blue-300 will-change-transform"
              style={{
                left: snow.left,
                top: '-20px',
                animation: `snowflake-fall ${snow.duration} linear ${snow.delay} infinite`,
              }}
            >
              <Snowflake className="w-4 h-4" />
            </div>
          ))}
        </div>
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse bg-blue-600/20"
          style={{ top: '10%', left: '10%' }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse bg-blue-400/20"
          style={{ bottom: '10%', right: '10%', animationDelay: '1.5s' }}
        />
      </div>

      {/* GPU Twinkling Stars/Particles */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none select-none motion-reduce:hidden"
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full will-change-transform ${p.size} ${
              isDark ? 'bg-white/80' : 'bg-blue-400/80'
            }`}
            style={{
              top: p.top,
              left: p.left,
              animation: `particle-twinkle ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content with Unified Smooth Motion */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: SMOOTH_EASE }}
                className="flex items-center gap-2 mb-4"
              >
                {isDark ? (
                  <Shield className="w-5 h-5 text-red-500" />
                ) : (
                  <Axe className="w-5 h-5 text-blue-600" />
                )}
                <span
                  className={`font-semibold uppercase tracking-wider text-xs ${
                    isDark ? 'text-red-500' : 'text-blue-600'
                  }`}
                >
                  {isDark ? 'Developer Portfolio' : 'Nordic Developer'}
                </span>
              </motion.div>

              {/* Headline */}
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: SMOOTH_EASE }}
                  className="block"
                >
                  {isDark ? 'Building The Future' : 'Forging Digital Realms'}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: SMOOTH_EASE }}
                  className={`block bg-clip-text text-transparent ${
                    isDark
                      ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-red-500'
                      : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700'
                  }`}
                >
                  {isDark ? 'One Line at a Time' : 'With Code & Honor'}
                </motion.span>
              </h1>

              {/* Sub-headline / Hobbies */}
              <motion.p
                className={`text-lg sm:text-xl font-medium mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: SMOOTH_EASE }}
              >
                {userData?.hobbies && userData.hobbies.length > 0
                  ? userData.hobbies.join(' | ')
                  : isDark
                    ? 'Full Stack Developer | AI Enthusiast | Tech Innovator'
                    : 'Full Stack Developer | Code Warrior | Digital Craftsman'}
              </motion.p>

              {/* Description */}
              <motion.p
                className={`text-base sm:text-lg mb-8 max-w-xl leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: SMOOTH_EASE }}
              >
                {isDark
                  ? 'Crafting intelligent solutions with modern technologies, from sleek interfaces to powerful backends.'
                  : 'Building legendary applications with the strength of modern frameworks and the wisdom of best practices.'}
              </motion.p>

              {/* Tech Badges */}
              <motion.div
                className="flex gap-3 mb-8 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium ${
                    isDark
                      ? 'bg-slate-800/60 border-red-500/20 text-gray-300'
                      : 'bg-white border-blue-300/40 shadow-xs text-gray-700'
                  }`}
                >
                  <Code className={`w-4 h-4 ${isDark ? 'text-red-500' : 'text-blue-600'}`} />
                  <span>Clean Code</span>
                </div>
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium ${
                    isDark
                      ? 'bg-slate-800/60 border-yellow-500/20 text-gray-300'
                      : 'bg-white border-blue-300/40 shadow-xs text-gray-700'
                  }`}
                >
                  <Cpu className={`w-4 h-4 ${isDark ? 'text-yellow-500' : 'text-blue-500'}`} />
                  <span>AI Powered</span>
                </div>
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium ${
                    isDark
                      ? 'bg-slate-800/60 border-blue-500/20 text-gray-300'
                      : 'bg-white border-blue-300/40 shadow-xs text-gray-700'
                  }`}
                >
                  <Terminal className={`w-4 h-4 ${isDark ? 'text-blue-500' : 'text-blue-700'}`} />
                  <span>Full Stack</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex gap-4 items-center flex-wrap"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: SMOOTH_EASE }}
              >
                <Link
                  to="/contact"
                  className={`px-7 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${
                    isDark
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-md hover:shadow-red-500/30'
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-blue-500/30'
                  }`}
                >
                  {isDark ? 'Hire Me' : 'Begin Quest'}
                </Link>
                <Link
                  to="/projects"
                  className={`px-7 py-3 border-2 rounded-lg font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${
                    isDark
                      ? 'border-red-500/80 text-white hover:bg-red-500/10'
                      : 'border-blue-600 text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {isDark ? 'View Projects' : 'View Victories'}
                </Link>
              </motion.div>
            </motion.div>

            {/* Profile Avatar Container with Zero-CLS Constraint */}
            <div className="relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: SMOOTH_EASE }}
                className="relative w-full max-w-sm sm:max-w-md aspect-square"
              >
                {/* Glowing ring effect */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse transition-colors duration-500 ${
                    isDark
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500'
                      : 'bg-gradient-to-r from-blue-600 to-blue-400'
                  }`}
                />

                {/* Main Avatar Container */}
                <div className="relative w-full h-full rounded-full">
                  {/* Theme-Adaptive Animated Loader (Shown while loading or before image is ready) */}
                  {showLoader && <HeroAvatarLoader />}

                  {/* Real Profile Image (Cross-fades in once bytes are decoded) */}
                  {imageLoaded && profileImage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`relative w-full h-full rounded-full overflow-hidden border-4 shadow-2xl ${
                        isDark
                          ? 'border-red-500/80 shadow-red-500/30 bg-slate-800'
                          : 'border-blue-500/80 shadow-blue-500/20 bg-blue-50'
                      }`}
                    >
                      <img
                        src={profileImage}
                        alt={userData?.name || 'Profile'}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Fallback Branded Monogram (If user has no picture configured) */}
                  {showMonogram && (
                    <div
                      className={`relative w-full h-full rounded-full overflow-hidden border-4 shadow-2xl flex flex-col items-center justify-center ${
                        isDark
                          ? 'border-red-500/80 shadow-red-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white'
                          : 'border-blue-500/80 shadow-blue-500/20 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 text-blue-900'
                      }`}
                    >
                      <div
                        className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-2 mb-2 ${
                          isDark
                            ? 'bg-red-500/10 border-red-500/40 text-red-400'
                            : 'bg-blue-100 border-blue-400/60 text-blue-700'
                        }`}
                      >
                        <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-wider">
                          {userData?.name
                            ? userData.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()
                                .slice(0, 2)
                            : 'KT'}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-semibold tracking-widest uppercase ${
                          isDark ? 'text-gray-400' : 'text-blue-600'
                        }`}
                      >
                        {userData?.name || 'Karanveer Thour'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Corner accents */}
                <div
                  aria-hidden="true"
                  className={`absolute -top-3 -right-3 w-16 h-16 border-t-4 border-r-4 rounded-tr-3xl pointer-events-none ${
                    isDark ? 'border-yellow-500' : 'border-blue-400'
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`absolute -bottom-3 -left-3 w-16 h-16 border-b-4 border-l-4 rounded-bl-3xl pointer-events-none ${
                    isDark ? 'border-red-500' : 'border-blue-600'
                  }`}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-none select-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown
          className={isDark ? 'w-5 h-5 text-red-500/80' : 'w-5 h-5 text-blue-600/80'}
        />
      </motion.div>
    </section>
  );
}
