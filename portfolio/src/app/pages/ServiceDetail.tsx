import { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  TrendingUp,
  CreditCard,
  Clock,
  Briefcase,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ServiceHeader } from '../components/service/ServiceHeader';
import { ServiceFeatures } from '../components/service/ServiceFeatures';
import { ServiceProcess } from '../components/service/ServiceProcess';
import { fetchServiceById } from '../../services/api';

export function ServiceDetail() {
  const { serviceId } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasPricing = service?.pricing;
  const hasDuration = service?.duration;
  const hasDeliverables =
    Array.isArray(service?.deliverables) && service.deliverables.length > 0;

  useEffect(() => {
    if (!serviceId) return;
    setLoading(true);
    setError(null);
    fetchServiceById(serviceId)
      .then((data) => setService(data))
      .catch((err) => {
        console.error('Failed to fetch service:', err);
        setError('Service not found or failed to load.');
      })
      .finally(() => setLoading(false));
  }, [serviceId]);

  /* ── Loading ─────────────────────────────────────────── */
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center pt-16 ${
          isDark
            ? 'bg-gradient-to-b from-slate-950 to-slate-900 text-white'
            : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white text-gray-900'
        }`}
      >
        <div
          className={`w-10 h-10 border-4 border-t-transparent rounded-full animate-spin ${
            isDark ? 'border-red-500' : 'border-blue-500'
          }`}
        />
      </div>
    );
  }

  /* ── Error / not found ────────────────────────────────── */
  if (!service || error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center pt-16 ${
          isDark
            ? 'bg-gradient-to-b from-slate-950 to-slate-900'
            : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
        }`}
      >
        <div className="text-center">
          <h1
            className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Service Not Found
          </h1>
          {error && <p className="text-gray-400 mb-4 text-sm">{error}</p>}
          <Link
            to="/"
            className={`hover:underline font-semibold ${
              isDark
                ? 'text-red-500 hover:text-red-400'
                : 'text-blue-600 hover:text-blue-500'
            }`}
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  /* ── Main render ──────────────────────────────────────── */
  return (
    <div
      ref={ref}
      className={`min-h-screen pt-24 pb-20 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
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
            <span>Back to Home</span>
          </Link>

          {/* Header & Hero Image */}
          <ServiceHeader service={service} />

          {/* Long Description */}
          {service.longDescription &&
            service.longDescription !== service.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`mb-12 rounded-2xl p-8 border ${
                  isDark
                    ? 'bg-slate-900/60 border-red-500/20'
                    : 'bg-white/70 border-blue-200 shadow-lg shadow-blue-500/5'
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {isDark ? 'Mission Overview' : 'About This Project'}
                </h2>
                <div
                  className={`border-l-4 pl-5 ${
                    isDark ? 'border-red-500' : 'border-blue-500'
                  }`}
                >
                  <p
                    className={`text-base leading-relaxed whitespace-pre-line ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {service.longDescription}
                  </p>
                </div>
              </motion.div>
            )}

          {/* Features & Tech Stack */}
          <ServiceFeatures service={service} />

          {/* Key Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="mb-12">
              <h2
                className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {isDark ? (
                  <Award className="w-6 h-6 text-red-500" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                )}
                {isDark ? 'Mission Advantages' : 'Key Benefits'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.benefits.map((benefit: string, index: number) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.05,
                    }}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                      isDark
                        ? 'bg-slate-900/40 border-red-500/20 text-white hover:border-red-500/40'
                        : 'bg-white/60 border-blue-200/60 text-gray-900 hover:border-blue-400/60 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDark
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          {/* Pricing / Duration / Deliverables */}
          {(hasPricing || hasDuration || hasDeliverables) && (
            <div
              className={`mb-12 grid grid-cols-1 gap-6 ${
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
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-6 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                    isDark
                      ? 'bg-slate-900/60 border-red-500/20 hover:border-red-500/40 shadow-lg shadow-red-950/20 hover:shadow-red-500/10'
                      : 'bg-white/70 border-blue-200 hover:border-blue-400/50 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10'
                  } ${hasPricing && hasDuration && hasDeliverables ? 'md:col-span-1' : ''}`}
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                        isDark
                          ? 'bg-gradient-to-br from-red-600/10 to-yellow-500/10 text-red-500 border border-red-500/20'
                          : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/50'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
                        isDark ? 'text-red-500' : 'text-blue-600'
                      }`}
                    >
                      Pricing
                    </p>
                  </div>
                  <p
                    className={`text-xl font-bold tracking-tight capitalize mt-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {service.pricing}
                  </p>
                </motion.div>
              )}

              {hasDuration && (
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-6 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                    isDark
                      ? 'bg-slate-900/60 border-red-500/20 hover:border-red-500/40 shadow-lg shadow-red-950/20 hover:shadow-red-500/10'
                      : 'bg-white/70 border-blue-200 hover:border-blue-400/50 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10'
                  } ${hasPricing && hasDuration && hasDeliverables ? 'md:col-span-1' : ''}`}
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                        isDark
                          ? 'bg-gradient-to-br from-red-600/10 to-yellow-500/10 text-red-500 border border-red-500/20'
                          : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/50'
                      }`}
                    >
                      <Clock className="w-6 h-6" />
                    </div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
                        isDark ? 'text-red-500' : 'text-blue-600'
                      }`}
                    >
                      Duration
                    </p>
                  </div>
                  <p
                    className={`text-xl font-bold tracking-tight capitalize mt-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {service.duration}
                  </p>
                </motion.div>
              )}

              {hasDeliverables && (
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-slate-900/60 border-red-500/20 hover:border-red-500/40 shadow-lg shadow-red-950/20 hover:shadow-red-500/10'
                      : 'bg-white/70 border-blue-200 hover:border-blue-400/50 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10'
                  } ${
                    hasPricing && hasDuration && hasDeliverables
                      ? 'md:col-span-2'
                      : (hasPricing && hasDeliverables) ||
                          (hasDuration && hasDeliverables)
                        ? 'md:col-span-2'
                        : ''
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isDark
                          ? 'bg-gradient-to-br from-red-600/10 to-yellow-500/10 text-red-500 border border-red-500/20'
                          : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/50'
                      }`}
                    >
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-widest ${
                        isDark ? 'text-red-500' : 'text-blue-600'
                      }`}
                    >
                      Deliverables
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((d: string, i: number) => (
                      <li
                        key={i}
                        className={`text-sm flex items-start gap-2.5 ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isDark ? 'text-red-500' : 'text-blue-500'
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

          {/* CTA */}
          <ServiceProcess service={service} />
        </div>
      </div>
    </div>
  );
}
