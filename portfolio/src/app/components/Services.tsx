import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import {
  Code2,
  Smartphone,
  Cloud,
  Database,
  Sparkles,
  Laptop,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ServicesHeader } from './service/ServicesHeader';
import { ServiceCard, type ServiceItem } from './service/ServiceCard';

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description:
        'Custom web applications built with React, Next.js, and modern frameworks for optimal performance.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Performance'],
      color: isDark
        ? 'from-red-600 to-red-400'
        : 'from-amber-600 to-yellow-500',
      link: '/services/web-development',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description:
        'Cross-platform mobile applications using React Native for iOS and Android platforms.',
      features: ['Native Feel', 'Offline Support', 'Push Notifications'],
      color: isDark
        ? 'from-blue-600 to-blue-400'
        : 'from-amber-700 to-amber-500',
      link: '/services/mobile-apps',
    },
    {
      icon: Sparkles,
      title: 'AI Integration',
      description:
        'Implement cutting-edge AI features powered by GPT-4, machine learning, and automation.',
      features: ['Smart Automation', 'NLP Processing', 'Predictive Analytics'],
      color: isDark
        ? 'from-purple-600 to-purple-400'
        : 'from-amber-500 to-yellow-400',
      link: '/services/ai-integration',
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description:
        'Scalable cloud infrastructure on AWS, Azure, or GCP with DevOps best practices.',
      features: ['Auto Scaling', 'CI/CD Pipeline', 'Monitoring'],
      color: isDark
        ? 'from-green-600 to-green-400'
        : 'from-amber-600 to-yellow-600',
      link: '/services/cloud-solutions',
    },
    {
      icon: Database,
      title: 'Backend Systems',
      description:
        'Robust APIs and database architecture for enterprise-grade applications.',
      features: ['RESTful APIs', 'GraphQL', 'Microservices'],
      color: isDark
        ? 'from-yellow-600 to-yellow-400'
        : 'from-yellow-600 to-amber-500',
      link: '/services/web-development',
    },
    {
      icon: Laptop,
      title: 'Consulting',
      description:
        'Technical consulting and code reviews to optimize your existing projects and architecture.',
      features: ['Code Audit', 'Performance', 'Best Practices'],
      color: isDark
        ? 'from-pink-600 to-pink-400'
        : 'from-amber-700 to-yellow-600',
      link: '/services/web-development',
    },
  ];

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
        </motion.div>
      </div>
    </section>
  );
}
