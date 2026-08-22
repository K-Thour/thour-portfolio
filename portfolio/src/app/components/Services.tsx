import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ServicesHeader } from './service/ServicesHeader';
import { ServiceCard, type ServiceItem } from './service/ServiceCard';
import { ServiceSkeletonCard } from './ui/skeleton';
import { fetchServices } from '../../services/api';

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await fetchServices();
        if (!isMounted) return;
        const mappedData = data.map((s: any) => ({
          icon: s.icon || Code2,
          title: s.title || s.name || '',
          description: s.description || '',
          features: Array.isArray(s.features) ? s.features : [],
          color: 'from-blue-600 to-blue-400',
          link: `/services/${s._id}`,
        }));
        setServices(mappedData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className={`py-20 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <ServicesHeader isInView={isInView} />

          {/* Services Grid with Smooth Skeleton Transitions */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="services-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <ServiceSkeletonCard key={i} />
                ))}
              </motion.div>
            ) : services.length === 0 ? (
              <motion.div
                key="services-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-slate-500"
              >
                No services found.
              </motion.div>
            ) : (
              <motion.div
                key="services-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.link || service.title}
                    service={{
                      ...service,
                      color: isDark
                        ? 'from-red-600 to-red-400'
                        : 'from-blue-600 to-blue-400',
                    }}
                    index={index}
                    isInView={true}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
