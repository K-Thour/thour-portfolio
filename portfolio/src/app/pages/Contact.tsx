import { useContext, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { ContactHeader } from '../components/contact/ContactHeader';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactForm } from '../components/contact/ContactForm';
import { SEOHead } from '../components/seo/SEOHead';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;

  return (
    <div
      className={`min-h-screen pt-28 pb-24 relative overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <SEOHead
        title="Contact & Consultation | Karanveer Thour"
        description="Connect directly with Karanveer Thour for full-stack engineering collaborations, architecture consultation, technical advisory, and high-impact project development."
      />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-20 ${
            isDark ? 'bg-red-600/30' : 'bg-blue-400/40'
          }`}
        />
        <div
          className={`absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 ${
            isDark ? 'bg-amber-600/30' : 'bg-indigo-400/30'
          }`}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <ContactHeader isInView={isInView} />

          {/* 2-Column Responsive Layout */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Information (5 columns) */}
            <div className="lg:col-span-5">
              <ContactInfo isInView={isInView} />
            </div>

            {/* Lead Inquiry Form (7 columns) */}
            <div className="lg:col-span-7">
              <ContactForm isInView={isInView} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
