import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ContactFormProps {
  isInView: boolean;
}

export function ContactForm({ isInView }: ContactFormProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`rounded-2xl p-8 border ${
        isDark
          ? 'bg-slate-800/50 border-red-500/20'
          : 'bg-gradient-to-br from-white to-blue-50 border-blue-300/40 shadow-xl shadow-blue-500/10'
      }`}
    >
      <h3
        className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {isDark ? 'Mission Briefing' : 'Quest Details'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-800'
            }`}
          >
            {isDark ? 'Your Name' : 'Warrior Name'}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
              isDark
                ? 'bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500'
                : 'bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 shadow-sm'
            }`}
            placeholder={isDark ? 'Tony Stark' : 'Ragnar Lothbrok'}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-800'
            }`}
          >
            {isDark ? 'Email Address' : 'Raven Address'}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
              isDark
                ? 'bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500'
                : 'bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 shadow-sm'
            }`}
            placeholder={
              isDark ? 'tony@starkindustries.com' : 'ragnar@midgard.com'
            }
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-800'
            }`}
          >
            {isDark ? 'Mission Details' : 'Quest Description'}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none ${
              isDark
                ? 'bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500'
                : 'bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 shadow-sm'
            }`}
            placeholder={
              isDark
                ? 'Describe your project or mission...'
                : 'Tell the tale of your quest...'
            }
          />
        </div>

        <button
          type="submit"
          className={`w-full px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group ${
            isDark
              ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
          }`}
        >
          {isDark ? 'Launch Mission' : 'Send to Valhalla'}
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
}
