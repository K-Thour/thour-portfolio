import { useRef, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import {
  CheckCircle2,
  Award,
  TrendingUp,
  CreditCard,
  Clock,
  Briefcase,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { ServiceHeader } from '../components/service/ServiceHeader';
import { ServiceFeatures } from '../components/service/ServiceFeatures';
import { ServiceProcess } from '../components/service/ServiceProcess';
import { ServiceDetailSkeleton } from '../components/ui/skeleton';
import { BackButton } from '../components/ui/BackButton';
import { fetchServiceById } from '../../services/api';
import { SEOHead } from '../components/seo/SEOHead';

export function ServiceDetail() {
  const { serviceId } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasPricing = service?.pricing;
  const hasDuration = service?.duration;
  const hasDeliverables =
    Array.isArray(service?.deliverables) && service.deliverables.length > 0;

  useEffect(() => {
    let isMounted = true;
    if (!serviceId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchServiceById(serviceId)
      .then((data) => {
        if (isMounted) setService(data);
      })
      .catch((err) => {
        console.error('Failed to fetch service:', err);
        if (isMounted) setError('Service not found or failed to load.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [serviceId]);

  return (
    <div
      ref={ref}
      data-testid="service-detail-page"
      className={`min-h-screen pt-24 pb-20 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
      }`}
    >
      <SEOHead
        title={service ? `${service.title || service.name} | Services` : 'Service Offerings'}
        description={service?.description || 'Professional engineering services, architecture, and consulting.'}
      />
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="service-detail-skeleton"
              data-testid="service-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ServiceDetailSkeleton />
            </motion.div>
          ) : !service || error ? (
            <motion.div
              key="service-detail-error"
              data-testid="service-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 max-w-md mx-auto"
            >
              <h1
                className={`text-3xl font-extrabold mb-4 tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
                style={{ letterSpacing: '-0.02em' }}
              >
                Service Not Found
              </h1>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                {error || 'The requested service offering is currently unavailable or has been archived.'}
              </p>
              <div className="flex justify-center">
                <BackButton
                  fallbackPath="/#services"
                  label="Back to Services"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="service-detail-content"
              data-testid="service-content"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              {/* Back Button */}
              <div className="mb-8">
                <BackButton
                  fallbackPath="/#services"
                  label="Back to Services"
                />
              </div>

              {/* Header & Hero Image */}
              <ServiceHeader service={service} />

              {/* Long Description / Mission Overview */}
              {service.longDescription &&
                service.longDescription !== service.description && (
                  <div
                    data-testid="service-long-description"
                    className={`mb-14 rounded-3xl p-8 sm:p-10 border backdrop-blur-xl backdrop-saturate-[180%] shadow-lg relative overflow-hidden ${
                      isDark
                        ? 'bg-slate-900/60 border-white/[0.08]'
                        : 'bg-white/90 border-black/[0.06] shadow-sm'
                    }`}
                  >
                    {/* Top hairline */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />

                    <h2
                      className={`text-2xl font-bold mb-4 tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                      style={{ letterSpacing: '-0.01em' }}
                    >
                      {isDark ? 'Scope & Architectural Overview' : 'Service Blueprint'}
                    </h2>
                    <div
                      className={`border-l-4 pl-5 ${
                        isDark ? 'border-red-500' : 'border-blue-500'
                      }`}
                    >
                      <p
                        className={`text-base leading-relaxed whitespace-pre-line ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {service.longDescription}
                      </p>
                    </div>
                  </div>
                )}

              {/* Features & Tech Stack */}
              <ServiceFeatures service={service} />

              {/* Key Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div data-testid="service-benefits" className="mb-14">
                  <h2
                    className={`text-2xl font-bold mb-6 flex items-center gap-2 tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {isDark ? (
                      <Award className="w-5 h-5 text-red-500" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    )}
                    <span>{isDark ? 'Mission Advantages & Benefits' : 'Key Advantages'}</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit: string, index: number) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.04,
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -2, scale: 1.01, transition: { type: 'spring', bounce: 0, duration: 0.25 } }
                        }
                        className={`relative p-5 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] flex items-start gap-3.5 shadow-sm overflow-hidden ${
                          isDark
                            ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/30'
                            : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-300'
                        }`}
                      >
                        {/* Top hairline */}
                        <div
                          aria-hidden="true"
                          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isDark
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-sm leading-relaxed ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commercial Terms: Pricing / Duration / Deliverables */}
              {(hasPricing || hasDuration || hasDeliverables) && (
                <div
                  data-testid="service-commercial-terms"
                  className={`mb-14 grid grid-cols-1 gap-6 ${
                    hasPricing && hasDuration && hasDeliverables
                      ? 'md:grid-cols-4'
                      : (hasPricing && hasDeliverables) ||
                          (hasDuration && hasDeliverables)
                        ? 'md:grid-cols-3'
                        : hasPricing && hasDuration
                          ? 'md:grid-cols-2'
                          : 'grid-cols-1'
                  }`}
                >
                  {hasPricing && (
                    <motion.div
                      data-testid="service-pricing-card"
                      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                      className={`relative p-7 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] text-center flex flex-col justify-between shadow-lg overflow-hidden ${
                        isDark
                          ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/40 hover:shadow-red-500/10'
                          : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-400/50 hover:shadow-md'
                      } ${hasPricing && hasDuration && hasDeliverables ? 'md:col-span-1' : ''}`}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                      <div>
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                            isDark
                              ? 'bg-gradient-to-br from-red-600/20 to-yellow-500/20 text-red-400 border border-red-500/20'
                              : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/50'
                          }`}
                        >
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <p
                          className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                            isDark ? 'text-red-400' : 'text-blue-600'
                          }`}
                        >
                          Pricing Tier
                        </p>
                      </div>
                      <p
                        className={`text-2xl font-extrabold tracking-tight capitalize mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {service.pricing}
                      </p>
                    </motion.div>
                  )}

                  {hasDuration && (
                    <motion.div
                      data-testid="service-duration-card"
                      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                      className={`relative p-7 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] text-center flex flex-col justify-between shadow-lg overflow-hidden ${
                        isDark
                          ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/40 hover:shadow-red-500/10'
                          : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-400/50 hover:shadow-md'
                      } ${hasPricing && hasDuration && hasDeliverables ? 'md:col-span-1' : ''}`}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                      <div>
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                            isDark
                              ? 'bg-gradient-to-br from-red-600/20 to-yellow-500/20 text-red-400 border border-red-500/20'
                              : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/50'
                          }`}
                        >
                          <Clock className="w-6 h-6" />
                        </div>
                        <p
                          className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                            isDark ? 'text-red-400' : 'text-blue-600'
                          }`}
                        >
                          Timeline
                        </p>
                      </div>
                      <p
                        className={`text-2xl font-extrabold tracking-tight capitalize mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {service.duration}
                      </p>
                    </motion.div>
                  )}

                  {hasDeliverables && (
                    <motion.div
                      data-testid="service-deliverables-card"
                      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                      className={`relative p-7 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] shadow-lg overflow-hidden ${
                        isDark
                          ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/40 hover:shadow-red-500/10'
                          : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-400/50 hover:shadow-md'
                      } ${
                        hasPricing && hasDuration && hasDeliverables
                          ? 'md:col-span-2'
                          : (hasPricing && hasDeliverables) ||
                              (hasDuration && hasDeliverables)
                            ? 'md:col-span-2'
                            : ''
                      }`}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                      <div className="flex items-center gap-3.5 mb-5">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                            isDark
                              ? 'bg-gradient-to-br from-red-600/20 to-yellow-500/20 text-red-400 border border-red-500/20'
                              : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/50'
                          }`}
                        >
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <p
                          className={`text-xs font-bold uppercase tracking-widest ${
                            isDark ? 'text-red-400' : 'text-blue-600'
                          }`}
                        >
                          Included Deliverables
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {service.deliverables.map((d: string, i: number) => (
                          <li
                            key={i}
                            className={`text-sm flex items-start gap-2.5 ${
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                isDark ? 'text-red-400' : 'text-blue-500'
                              }`}
                            />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Consultation Process & CTA */}
              <ServiceProcess service={service} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
