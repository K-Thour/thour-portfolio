import { useContext, useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeContext } from '../../context/ThemeContext';
import { submitContactForm } from '../../../services/api';

interface ContactFormProps {
  isInView?: boolean;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm({ isInView = true }: ContactFormProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message details are required';
        if (value.trim().length < 10) {
          return 'Please enter at least 10 characters describing your inquiry';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name as keyof FormState, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setTouched({ name: true, email: true, message: true });
    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.message) {
      toast.error('Please fix the errors in the form before submitting.');
      return;
    }

    setStatus('loading');

    try {
      await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        description: formData.message.trim(),
        mobileNumber: formData.phone.trim() || undefined,
        subject: formData.subject.trim() || undefined,
      });

      setStatus('success');
      toast.success('Your message has been sent successfully! We will connect shortly.');
      setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus('error');
      toast.error('Failed to dispatch inquiry. Please check your network or try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`relative rounded-3xl p-6 sm:p-8 border backdrop-blur-2xl overflow-hidden ${
        isDark
          ? 'bg-slate-900/60 border-white/[0.08] shadow-2xl shadow-black/40'
          : 'bg-white/80 border-black/[0.06] shadow-xl shadow-slate-200/50'
      }`}
    >
      {/* Top Specular Hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="mb-6">
        <h2
          className={`text-2xl font-bold tracking-tight mb-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {isDark ? 'Mission Briefing Form' : 'Send Quest Scroll'}
        </h2>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Fill in the details below to initiate consultation, request quotes, or propose engineering contracts.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              placeholder={isDark ? 'e.g. Tony Stark' : 'e.g. Erik Thorvaldsson'}
              className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-sm border transition-all duration-200 focus:outline-none ${
                errors.name
                  ? 'border-red-500 bg-red-500/5 focus:ring-2 focus:ring-red-500/30'
                  : isDark
                    ? 'bg-slate-800/60 border-white/[0.08] text-white placeholder-slate-500 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20'
                    : 'bg-slate-50/80 border-black/[0.08] text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs'
              }`}
            />
          </div>
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="e.g. founder@company.com"
              className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-sm border transition-all duration-200 focus:outline-none ${
                errors.email
                  ? 'border-red-500 bg-red-500/5 focus:ring-2 focus:ring-red-500/30'
                  : isDark
                    ? 'bg-slate-800/60 border-white/[0.08] text-white placeholder-slate-500 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20'
                    : 'bg-slate-50/80 border-black/[0.08] text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs'
              }`}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Two Columns: Subject & Phone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="subject"
              className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Subject / Topic
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Next.js SaaS Architecture"
              className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-sm border transition-all duration-200 focus:outline-none ${
                isDark
                  ? 'bg-slate-800/60 border-white/[0.08] text-white placeholder-slate-500 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20'
                  : 'bg-slate-50/80 border-black/[0.08] text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Phone / Telegram <span className="opacity-50">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 555-0199"
              className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-sm border transition-all duration-200 focus:outline-none ${
                isDark
                  ? 'bg-slate-800/60 border-white/[0.08] text-white placeholder-slate-500 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20'
                  : 'bg-slate-50/80 border-black/[0.08] text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs'
              }`}
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Project Scope or Inquiry <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            placeholder="Tell me about your project goals, timeline, deliverables, or technical stack..."
            className={`w-full p-4 rounded-xl text-sm border transition-all duration-200 resize-none focus:outline-none ${
              errors.message
                ? 'border-red-500 bg-red-500/5 focus:ring-2 focus:ring-red-500/30'
                : isDark
                  ? 'bg-slate-800/60 border-white/[0.08] text-white placeholder-slate-500 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20'
                  : 'bg-slate-50/80 border-black/[0.08] text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs'
            }`}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
          whileTap={{ scale: status === 'loading' ? 1 : 0.97 }}
          className={`w-full min-h-[48px] px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-lg ${
            isDark
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-red-950/50 hover:shadow-red-600/30'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-blue-500/25 hover:shadow-blue-500/40'
          } ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>{isDark ? 'Deploy Mission Inquiry' : 'Dispatch Scroll'}</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </motion.button>

        {/* Success / Error Banners */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-500 text-sm flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Thank you! Your message has been received. I typically respond within 2 hours.</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border bg-red-500/10 border-red-500/30 text-red-500 text-sm flex items-center gap-2.5"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Failed to send message. Please try again or email directly via contact channels.</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
