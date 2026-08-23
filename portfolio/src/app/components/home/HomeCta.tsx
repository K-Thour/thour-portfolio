import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export function HomeCta() {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const { userData } = useUser();

  const userEmail = userData?.email || 'karan@thour.com';

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-8 sm:p-12 md:p-16 border text-center relative overflow-hidden shadow-2xl ${
            isDark
              ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950/80 border-red-500/30'
              : 'bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-800 border-blue-400/40 text-white'
          }`}
        >
          {/* Background Glow Accents */}
          <div
            aria-hidden="true"
            className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30 ${
              isDark ? 'bg-red-500' : 'bg-white/30'
            }`}
          />
          <div
            aria-hidden="true"
            className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30 ${
              isDark ? 'bg-yellow-500' : 'bg-cyan-300/30'
            }`}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${
                isDark
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-white/20 border-white/40 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Available for New Projects</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Have a Project in Mind? <br className="hidden sm:inline" />
              Let&apos;s Build Something Extraordinary.
            </h2>

            <p
              className={`text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-blue-100'
              }`}
            >
              Whether you need full-stack web architecture, scalable API microservices, or an
              interactive AI experience, I am ready to bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] shadow-lg ${
                  isDark
                    ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-red-500/30'
                    : 'bg-white text-blue-700 hover:bg-slate-50 hover:shadow-white/20'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`mailto:${userEmail}`}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 border hover:scale-[1.03] active:scale-[0.98] ${
                  isDark
                    ? 'border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700'
                    : 'border-white/40 bg-blue-700/50 text-white hover:bg-blue-700/80'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span>{userEmail}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
