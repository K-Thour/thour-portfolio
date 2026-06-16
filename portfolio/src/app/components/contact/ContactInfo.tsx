import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';
import { fetchPublicUser, fetchActiveContact } from '../../../services/api';

interface ContactInfoProps {
  isInView: boolean;
}

export function ContactInfo({ isInView }: ContactInfoProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [userData, setUserData] = useState<any>(null);
  const [activeContact, setActiveContact] = useState<any>(null);

  useEffect(() => {
    fetchPublicUser().then(setUserData).catch(console.error);
    fetchActiveContact().then(setActiveContact).catch(console.error);
  }, []);

  const emailVal = userData?.email || (isDark ? 'hero@avengers.com' : 'warrior@valhalla.com');
  const phoneVal = userData?.phoneNumber || (isDark ? '+1 (555) AVG-HERO' : '+1 (555) NOR-DWAR');
  
  let locationVal = isDark ? 'Avengers Tower, NYC' : 'Midgard Realm';
  if (activeContact) {
    locationVal = activeContact.Address1;
    if (activeContact.Address2) {
      locationVal += `, ${activeContact.Address2}`;
    }
  }

  const contactInfo = [
    {
      id: 'email',
      icon: Mail,
      title: 'Email',
      value: emailVal,
      link: `mailto:${emailVal}`,
    },
    {
      id: 'phone',
      icon: Phone,
      title: isDark ? 'Phone' : 'Raven Call',
      value: phoneVal,
      link: `tel:${phoneVal.replace(/\s+/g, '')}`,
    },
    {
      id: 'location',
      icon: MapPin,
      title: 'Location',
      value: locationVal,
      link: '#',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3
        className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {isDark ? 'Contact Channels' : 'Reach the Hall'}
      </h3>
      <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
        {isDark
          ? 'Reach out through any secure channel. Response time: Lightning fast ⚡'
          : 'Send your message by raven or mystic portal. Swift as the northern wind ❄️'}
      </p>

      <div className="space-y-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <motion.a
              key={info.id}
              href={info.link}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.1,
              }}
              className="flex items-start gap-4 group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg ${
                  isDark
                    ? 'bg-gradient-to-br from-red-600 to-yellow-500'
                    : 'bg-gradient-to-br from-amber-600 to-yellow-500 shadow-amber-500/30'
                }`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4
                  className={`font-medium mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {info.title}
                </h4>
                <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>
                  {info.value}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>

      <div
        className={`mt-12 p-6 rounded-2xl border ${
          isDark
            ? 'bg-slate-800/50 border-red-500/20'
            : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300/40 shadow-md'
        }`}
      >
        <h4
          className={`font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {isDark ? 'Availability' : 'When to Call'}
        </h4>
        <p className={`mb-2 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          {activeContact ? (
            `${activeContact.startWorkingDay} - ${activeContact.endWorkingDay}: ${activeContact.startWorkingHour} - ${activeContact.endWorkingHour}`
          ) : isDark
            ? 'Monday - Friday: 9:00 AM - 6:00 PM EST'
            : 'Sunrise to Sunset: All Days'}
        </p>
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          {isDark
            ? 'Emergency missions: 24/7 on-call'
            : 'Urgent quests: Any hour'}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-500 text-sm font-medium">
            {isDark ? 'Currently Available' : 'Ready for Battle'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
