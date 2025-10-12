'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

// Custom SVG Icons
const KickIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.5 4.5v15l7-7.5-7-7.5z" />
    <path d="M15.5 8.5L19 12l-3.5 3.5" />
  </svg>
);

const DiscordIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.195.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export default function Footer() {
  const t = useTranslations('Footer');

  const socialLinks = [
    {
      icon: KickIcon,
      name: t('kick'),
      href: "https://kick.com/acajankovic",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-600",
      description: "Watch stream"
    },
    {
      icon: Instagram,
      name: t('instagram'),
      href: "https://instagram.com/placeholder",
      color: "from-pink-400 to-purple-500",
      bgColor: "bg-gradient-to-r from-pink-600 to-purple-600",
      description: "Follow updates"
    },
    {
      icon: DiscordIcon,
      name: t('discord'),
      href: "https://discord.gg/placeholder",
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-600",
      description: "Join community"
    }
  ];

  return (
    <footer id="links" className="relative bg-gradient-to-b from-gray-900 to-black border-t border-amber-500/20 scroll-mt-32">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
              {t('joinCommunity')}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {t('communitySubtitle')}
            </p>
          </motion.div>

          {/* Social Media Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-row justify-center items-center gap-2 sm:gap-4 mb-8 max-w-2xl mx-auto"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative flex items-center justify-center gap-2 px-3 py-3 sm:px-8 sm:py-4 rounded-xl ${social.bgColor} text-white font-semibold transition-all duration-300 overflow-hidden group min-w-[80px] sm:min-w-[200px] hover:shadow-2xl hover:shadow-black/30`}
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    <social.icon
                      size={16}
                      className="sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-xs sm:text-base text-white group-hover:text-white/90 transition-colors duration-300">
                      {social.name}
                    </span>
                  </div>

                  {/* Hover border glow */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10`} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 text-sm pt-6 border-t border-gray-800"
        >
          <p>&copy; {new Date().getFullYear()} Aca Jankovic. {t('copyright')}</p>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
    </footer>
  );
}
