'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Instagram, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '@/app/lib/sanity';

// Custom SVG Icons
const KickIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size * 26/97} viewBox="0 0 97 26" fill="none" className={className}>
    <g clipPath="url(#clip0_405_17277)">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M0 0.0307312H8.34073V5.79423H11.1163V2.91248H13.8919V0.0307312H22.2326V8.69274H19.457V11.5745H16.6815V14.4562H19.457V17.338H22.2326V26H13.8919V23.1182H11.1163V20.2365H8.34073V26H0V0.0307312ZM55.6444 0.0307312H63.9852V5.79423H66.7608V2.91248H69.5363V0.0307312H77.8771V8.69274H75.1015V11.5745H72.3259V14.4562H75.1015V17.338H77.8771V26H69.5363V23.1182H66.7608V20.2365H63.9852V26H55.6444V0.0307312ZM25.039 0.0307312H33.3797V26H25.039V0.0307312ZM38.9462 0.0307312V2.91248H36.1706V23.1029H38.9462V25.9846H52.8535V17.3226H44.5128V8.66061H52.8535V0H38.9462V0.0307312Z"
        fill="#53FC18" />
      <path
        d="M80.4771 0.0153656H83.0543C83.4817 0.0153656 83.7862 0.107559 83.9846 0.304518C84.183 0.501477 84.2738 0.792027 84.2738 1.17337C84.2738 1.55472 84.2123 1.64552 84.1061 1.79917C84 1.9668 83.8617 2.07296 83.6941 2.13442C84.0447 2.22662 84.2738 2.45431 84.4107 2.82029C84.4567 2.95718 84.4721 3.10944 84.4721 3.27706C84.4721 3.70451 84.3659 4.00903 84.183 4.20738C83.9846 4.40574 83.6801 4.49653 83.2526 4.49653H80.4771V0V0.0153656ZM83.1157 1.31166C83.1157 1.05185 82.9789 0.930318 82.7344 0.930318H81.6365V1.8299H82.7344C82.9942 1.8299 83.1157 1.70838 83.1157 1.44856V1.32703V1.31166ZM83.3141 3.09547C83.3141 2.83565 83.1772 2.71412 82.9328 2.71412H81.6365V3.61371H82.9328C83.1926 3.61371 83.3141 3.49218 83.3141 3.23236V3.11084V3.09547Z"
        fill="white" />
      <path
        d="M88.635 4.51331H85.052V0.0153809H88.635V0.914967H86.21V1.78382H88.1167V2.68341H86.21V3.61373H88.635V4.51331Z"
        fill="white" />
      <path
        d="M91.3502 4.51356H90.1908V0.915211H88.833V0.015625H92.7065V0.915211H91.3488V4.51356H91.3502Z"
        fill="white" />
      <path
        d="M92.2503 4.51331L93.9573 0.0153809H95.2536L96.962 4.51331H95.6964L95.4072 3.70452H93.791L93.5019 4.51331H92.2363H92.2517H92.2503ZM94.0802 2.88176H95.1167L94.5984 1.37174L94.0802 2.88176Z"
        fill="white" />
    </g>
    <defs>
      <clipPath id="clip0_405_17277">
        <rect width="96.9619" height="26" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DiscordIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.195.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export default function Footer() {
  const t = useTranslations('Footer');
  const [socialUrls, setSocialUrls] = useState({
    kick: 'https://kick.com/acajankovic',
    instagram: '',
    telegram: '',
    discord: ''
  });

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const settings = await client.fetch(
          `*[_type == "siteSettings"][0]{ socialLinks }`
        );
        if (settings?.socialLinks) {
          setSocialUrls({
            kick: settings.socialLinks.kick || 'https://kick.com/acajankovic',
            instagram: settings.socialLinks.instagram || '',
            telegram: settings.socialLinks.telegram || '',
            discord: settings.socialLinks.discord || ''
          });
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  const socialLinks = [
    {
      icon: KickIcon,
      name: t('kick'),
      href: socialUrls.kick,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-600",
      description: "Watch stream"
    },
    {
      icon: Instagram,
      name: t('instagram'),
      href: socialUrls.instagram,
      color: "from-pink-400 to-purple-500",
      bgColor: "bg-gradient-to-r from-pink-600 to-purple-600",
      description: "Follow updates"
    },
    {
      icon: Send,
      name: t('telegram'),
      href: socialUrls.telegram,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500",
      description: "Join channel"
    },
    {
      icon: DiscordIcon,
      name: t('discord'),
      href: socialUrls.discord,
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-600",
      description: "Join community"
    }
  ];

  return (
    <footer id="links" className="relative border-t border-purple-500/20 scroll-mt-32 overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-pink-950/20 to-purple-950/30 backdrop-blur-xl" />

      {/* Animated Gradient Wave */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3), transparent)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full blur-sm"
          style={{
            left: `${(i * 10) + 5}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2"
              style={{
                backgroundSize: '200% auto',
              }}
              animate={{
                backgroundPosition: ['0% center', '200% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {t('joinCommunity')}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 max-w-md mx-auto drop-shadow-lg"
            >
              {t('communitySubtitle')}
            </motion.p>
          </motion.div>

          {/* Social Media Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-row justify-center items-center gap-2 sm:gap-3 max-[400px]:gap-1.5 mb-8 w-full max-w-[60%] mx-auto"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                {/* Outer Glow Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: index * 0.2
                  }}
                  className={`absolute inset-0 rounded-xl max-[400px]:rounded-full bg-gradient-to-r ${social.color} blur-xl opacity-0 group-hover:opacity-100`}
                />

                <a
                  href={social.href || '#'}
                  target={social.href ? "_blank" : undefined}
                  rel={social.href ? "noopener noreferrer" : undefined}
                  onClick={(e) => !social.href && e.preventDefault()}
                  className={`relative flex items-center justify-center gap-2 px-2 py-2 sm:px-4 sm:py-3 rounded-xl max-[400px]:rounded-full max-[400px]:w-12 max-[400px]:h-12 max-[400px]:p-0 ${social.bgColor} text-white font-semibold transition-all duration-300 overflow-hidden hover:shadow-2xl backdrop-blur-sm border border-white/10 ${!social.href ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {/* Background Shimmer Effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.3
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-2">
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <social.icon
                        size={social.name === t('kick') ? 24 : 14}
                        className={social.name === t('kick') ? "sm:w-7 sm:h-auto max-[400px]:w-6 max-[400px]:h-auto text-white drop-shadow-lg" : "sm:w-4 sm:h-4 max-[400px]:w-3.5 max-[400px]:h-3.5 text-white drop-shadow-lg"}
                      />
                    </motion.div>
                    <span className="text-[10px] sm:text-sm max-[400px]:hidden text-white font-black tracking-wider">
                      {social.name}
                    </span>
                  </div>
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
          className="text-center text-gray-400 text-sm pt-6 border-t border-purple-800/50"
        >
          <motion.p
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            &copy; {new Date().getFullYear()} Aca Jankovic. {t('copyright')}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Animated Border */}
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />

      {/* Static Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
    </footer>
  );
}
