import { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
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

          {/* Features & Tech Stack */}
          <ServiceFeatures service={service} />

          {/* Pricing / Duration / Deliverables */}
          {(service.pricing ||
            service.duration ||
            (Array.isArray(service.deliverables) &&
              service.deliverables.length > 0)) && (
            <div className="mb-12 grid sm:grid-cols-3 gap-4">
              {service.pricing && (
                <div
                  className={`p-5 rounded-2xl border text-center ${
                    isDark
                      ? 'bg-slate-800/50 border-yellow-500/20'
                      : 'bg-white border-blue-300/30 shadow-md'
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-widest mb-1 ${isDark ? 'text-yellow-500' : 'text-blue-500'}`}
                  >
                    Pricing
                  </p>
                  <p
                    className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {service.pricing}
                  </p>
                </div>
              )}
              {service.duration && (
                <div
                  className={`p-5 rounded-2xl border text-center ${
                    isDark
                      ? 'bg-slate-800/50 border-yellow-500/20'
                      : 'bg-white border-blue-300/30 shadow-md'
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-widest mb-1 ${isDark ? 'text-yellow-500' : 'text-blue-500'}`}
                  >
                    Duration
                  </p>
                  <p
                    className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {service.duration}
                  </p>
                </div>
              )}
              {Array.isArray(service.deliverables) &&
                service.deliverables.length > 0 && (
                  <div
                    className={`p-5 rounded-2xl border ${
                      isDark
                        ? 'bg-slate-800/50 border-yellow-500/20'
                        : 'bg-white border-blue-300/30 shadow-md'
                    }`}
                  >
                    <p
                      className={`text-xs uppercase tracking-widest mb-3 ${isDark ? 'text-yellow-500' : 'text-blue-500'}`}
                    >
                      Deliverables
                    </p>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((d: string, i: number) => (
                        <li
                          key={i}
                          className={`text-sm flex items-start gap-2 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isDark ? 'text-yellow-500' : 'text-blue-500'
                            }`}
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
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
