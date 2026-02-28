import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import { servicesData } from '../../data/services';
import { ServiceHeader } from '../components/service/ServiceHeader';
import { ServiceFeatures } from '../components/service/ServiceFeatures';
import { ServiceProcess } from '../components/service/ServiceProcess';

export function ServiceDetail() {
  const { serviceId } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const service = servicesData[serviceId as keyof typeof servicesData];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Service Not Found
          </h1>
          <Link to="/" className="text-red-500 hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

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
          className="max-w-5xl mx-auto"
        >
          {/* Back Button */}
          <Link
            to="/"
            className={`inline-flex items-center gap-2 mb-8 transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{isDark ? 'Back to Home' : 'Return to Hall'}</span>
          </Link>

          {/* Header & Hero Image */}
          <ServiceHeader service={service} isInView={isInView} />

          {/* Core Capabilities & Tech Stack */}
          <ServiceFeatures service={service} isInView={isInView} />

          {/* Development Process & CTA */}
          <ServiceProcess service={service} isInView={isInView} />
        </motion.div>
      </div>
    </div>
  );
}
