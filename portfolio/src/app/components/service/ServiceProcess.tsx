import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { type ServiceData } from '../../../data/services';

interface ServiceProcessProps {
  service: ServiceData;
  isInView: boolean;
}

export function ServiceProcess({ service, isInView }: ServiceProcessProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <>
      <div className="mb-12">
        <h2
          className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          {isDark ? 'Development Process' : 'Path to Victory'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {service.process.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.7 + index * 0.1,
              }}
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-slate-800/50 border-red-500/20'
                  : 'bg-gradient-to-br from-white to-blue-50 border-blue-300/30 shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    isDark
                      ? 'bg-gradient-to-br from-red-600 to-yellow-500 text-white'
                      : 'bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/30'
                  }`}
                >
                  {index + 1}
                </div>
                <h3
                  className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {step.title}
                </h3>
              </div>
              <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className={`rounded-2xl p-8 md:p-12 text-center border ${
          isDark
            ? 'bg-gradient-to-r from-red-900/30 to-yellow-900/30 border-red-500/30'
            : 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 border-blue-400/40 shadow-xl shadow-blue-500/20'
        }`}
      >
        <h3
          className={`text-2xl md:text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {isDark
            ? 'Ready to Start Your Project?'
            : 'Ready to Embark on This Quest?'}
        </h3>
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
          {isDark
            ? "Let's discuss how this service can help achieve your goals."
            : 'Together we shall forge something legendary.'}
        </p>
        <Link
          to="/contact"
          className={`inline-block px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            isDark
              ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
          }`}
        >
          {isDark ? 'Get in Touch' : 'Send Word'}
        </Link>
      </motion.div>
    </>
  );
}
