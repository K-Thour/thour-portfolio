import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ContactHeader } from '../components/contact/ContactHeader';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactForm } from '../components/contact/ContactForm';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

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
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <ContactHeader isInView={isInView} />

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ContactInfo isInView={isInView} />

            {/* Contact Form */}
            <ContactForm isInView={isInView} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
