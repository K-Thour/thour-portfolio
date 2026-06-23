import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ServiceHeader } from '../components/service/ServiceHeader';
import { ServiceFeatures } from '../components/service/ServiceFeatures';
import { ServiceProcess } from '../components/service/ServiceProcess';
import { servicesData } from '../../data/services';
import { fetchServiceById } from '../../services/api';

export function ServiceDetail() {
  const { serviceId } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serviceId) {
      fetchServiceById(serviceId)
        .then((data) => {
          // Normalize name to lookup static fallback
          const nameNormalized = (data.name || '')
            .toLowerCase()
            .replace(/[^a-z]/g, '');
          const fallback =
            Object.values(servicesData).find(
              (item) =>
                item.title.toLowerCase().replace(/[^a-z]/g, '') ===
                nameNormalized,
            ) ||
            Object.values(servicesData).find(
              (item) =>
                nameNormalized.includes(item.title.toLowerCase()) ||
                item.title.toLowerCase().includes(nameNormalized),
            );

          setService({
            ...data,
            title: data.name || (fallback ? fallback.title : ''),
            subtitle: data.subtitle || (fallback ? fallback.subtitle : ''),
            description:
              data.decription || (fallback ? fallback.description : ''),
            image: data.mainImageUrl?.url || (fallback ? fallback.image : ''),
            icon: data.iconUrl?.url || (fallback ? fallback.icon : Code2),
            features:
              data.features && data.features.length > 0
                ? data.features
                : fallback
                  ? fallback.features
                  : [],
            capabilities:
              data.features && data.features.length > 0
                ? data.features
                : fallback
                  ? fallback.features
                  : [],
            technologies:
              data.technologies && data.technologies.length > 0
                ? data.technologies
                : fallback
                  ? fallback.technologies
                  : [],
            process:
              data.process && data.process.length > 0
                ? data.process
                : fallback
                  ? fallback.process
                  : [],
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
