import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ServicesHeader } from './service/ServicesHeader';
import { ServiceCard, type ServiceItem } from './service/ServiceCard';
import { fetchServices } from '../../services/api';
import { servicesData } from '../../data/services';

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchServices();
        const mappedData = data.map((s: any) => {
          // Normalize name to lookup static fallback
          const nameNormalized = (s.name || '')
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

          return {
            icon: s.iconUrl?.url || (fallback ? fallback.icon : Code2),
            title: s.name || (fallback ? fallback.title : ''),
            description: s.decription || (fallback ? fallback.description : ''),
            features: fallback ? fallback.features : [],
            color: isDark
              ? 'from-red-600 to-red-400'
              : 'from-blue-600 to-blue-400',
            link: `/services/${s._id}`,
          };
        });
        setServices(mappedData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [isDark]);

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
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <ServicesHeader isInView={isInView} />

          {/* Services Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No services found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service as ServiceItem}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
