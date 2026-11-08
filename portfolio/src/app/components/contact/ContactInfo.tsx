import { useContext, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Copy, Check, ExternalLink, Globe } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { fetchActiveContact } from '../../../services/api';

interface ContactInfoProps {
  isInView?: boolean;
}

// GitHub icon SVG component
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// LinkedIn icon SVG component
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74V9.94H5.06v8.56h2.8z" />
    </svg>
  );
}

// Twitter / X icon SVG component
function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ContactInfo({ isInView = true }: ContactInfoProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const userCtx = useContext(UserContext);
  const userData = userCtx?.userData;

  const [activeContact, setActiveContact] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetchActiveContact().then(setActiveContact).catch(console.error);
  }, []);

  const handleCopy = async (key: string, value: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else if (typeof document !== 'undefined' && typeof document.execCommand === 'function') {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const emailVal =
    userData?.email ||
    activeContact?.email ||
    (isDark ? 'hero@avengers.com' : 'warrior@valhalla.com');

  const phoneVal =
    userData?.phoneNumber ||
    activeContact?.phone ||
    (isDark ? '+1 (555) 284-4376' : '+1 (555) 667-3927');

  const locationParts = activeContact
    ? [
        activeContact.address,
        activeContact.city,
        activeContact.state,
        activeContact.country,
      ].filter(Boolean)
    : [];

  const locationVal =
    locationParts.length > 0
      ? locationParts.join(', ')
      : userData?.location ||
        (isDark ? 'Avengers Tower, New York, NY' : 'Midgard Realm, Earth');

  const locationLink =
    locationParts.length > 0
      ? `https://maps.google.com/?q=${encodeURIComponent(locationVal)}`
      : 'https://maps.google.com/?q=New+York';

  const channels = [
    {
      key: 'email',
      icon: Mail,
      title: 'Direct Email',
      value: emailVal,
      href: `mailto:${emailVal}`,
      copyable: true,
    },
    {
      key: 'phone',
      icon: Phone,
      title: isDark ? 'Direct Phone' : 'Raven Dispatch',
      value: phoneVal,
      href: `tel:${phoneVal.replace(/\s+/g, '')}`,
      copyable: true,
    },
    {
      key: 'location',
      icon: MapPin,
      title: 'Primary Location',
      value: locationVal,
      href: locationLink,
      copyable: false,
      external: true,
    },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: GithubIcon,
      url: userData?.socialLinks?.github || 'https://github.com/karanveersingh',
      handle: '@karanveersingh',
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      url:
        userData?.socialLinks?.linkedin ||
        'https://linkedin.com/in/karanveersingh',
      handle: 'in/karanveersingh',
    },
    {
      name: 'Twitter / X',
      icon: TwitterXIcon,
      url: userData?.socialLinks?.twitter || 'https://twitter.com/karanveersingh',
      handle: '@karanveersingh',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      <div>
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight mb-3 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {isDark ? 'Direct Communication' : 'Gathering Hall Channels'}
        </h2>
        <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {isDark
            ? 'Connect directly via encrypted mail, phone line, or discover active repositories across developer channels.'
            : 'Dispatch word by raven, wire, or inspect open scrolls across our digital domains.'}
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="space-y-3.5">
        {channels.map((ch, idx) => {
          const Icon = ch.icon;
          const isCopied = copiedKey === ch.key;

          return (
            <motion.div
              key={ch.key}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{
                duration: 0.45,
                delay: 0.1 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -2 }}
              className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 backdrop-blur-xl flex items-center justify-between gap-4 ${
                isDark
                  ? 'bg-slate-900/60 border-white/[0.08] hover:border-red-500/40 hover:bg-slate-900/80'
                  : 'bg-white/80 border-black/[0.06] hover:border-blue-400 hover:bg-white shadow-xs'
              }`}
            >
              <a
                href={ch.href}
                target={ch.external ? '_blank' : undefined}
                rel={ch.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 flex-1 min-w-0"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm ${
                    isDark
                      ? 'bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-red-950/40'
                      : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {ch.title}
                    </span>
                    {ch.external && (
                      <ExternalLink className="w-3 h-3 text-slate-400 opacity-60" />
                    )}
                  </div>
                  <p
                    className={`font-semibold text-sm sm:text-base truncate transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-red-400'
                        : 'text-slate-900 group-hover:text-blue-600'
                    }`}
                  >
                    {ch.value}
                  </p>
                </div>
              </a>

              {ch.copyable && (
                <button
                  type="button"
                  onClick={() => handleCopy(ch.key, ch.value)}
                  aria-label={`Copy ${ch.title}`}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shrink-0 ${
                    isCopied
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500'
                      : isDark
                        ? 'bg-slate-800/80 border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                        : 'bg-slate-100 border-black/[0.06] text-slate-600 hover:text-slate-900 hover:border-black/15'
                  }`}
                  title={isCopied ? 'Copied to clipboard!' : `Copy ${ch.title}`}
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Social Profiles Grid */}
      <div>
        <h3
          className={`text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Verified Profiles & Repositories
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {socialLinks.map((soc) => {
            const SocIcon = soc.icon;
            return (
              <motion.a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all duration-200 group ${
                  isDark
                    ? 'bg-slate-900/60 border-white/[0.08] hover:border-red-500/30 hover:bg-slate-800/80 text-slate-300'
                    : 'bg-white/80 border-black/[0.06] hover:border-blue-400 hover:bg-white text-slate-700 shadow-xs'
                }`}
              >
                <SocIcon className="w-5 h-5 mb-1.5 transition-transform group-hover:scale-110" />
                <span className="text-xs font-semibold">{soc.name}</span>
                <span className="text-[10px] opacity-60 truncate w-full mt-0.5">
                  {soc.handle}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Availability Status Bento Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`p-5 rounded-2xl border relative overflow-hidden backdrop-blur-xl ${
          isDark
            ? 'bg-slate-900/50 border-white/[0.08]'
            : 'bg-white/80 border-black/[0.06] shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              {isDark ? 'Active Availability' : 'Ready for New Quests'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium opacity-70">
            <Globe className="w-3.5 h-3.5" />
            <span>{activeContact?.timezone || 'UTC / EST / IST'}</span>
          </div>
        </div>

        <p className={`text-sm mb-2 font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
          {activeContact?.availability || 'Monday - Friday • 9:00 AM - 6:00 PM EST'}
        </p>

        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Open for full-time senior engineering roles, high-impact consulting contracts, and technical advisory.
        </p>
      </motion.div>
    </motion.div>
  );
}
