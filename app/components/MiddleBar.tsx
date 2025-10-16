'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Gift, Crown, Swords, Share2 } from 'lucide-react';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { client } from '@/app/lib/sanity';
import { useTranslations, useLocale } from 'next-intl';

export default function MiddleBar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const activeSection = useActiveSection();
  const [vavadaLink, setVavadaLink] = useState<string>('#');
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallPhone, setIsSmallPhone] = useState(false);
  const t = useTranslations('MiddleBar');

  // Fetch Vavada link from Sanity
  useEffect(() => {
    const fetchVavadaLink = async () => {
      try {
        const settings = await client.fetch(
          `*[_type == "siteSettings"][0]{ vavadaRefLink }`
        );
        if (settings?.vavadaRefLink) {
          setVavadaLink(settings.vavadaRefLink);
        }
      } catch (error) {
        console.error('Error fetching Vavada link:', error);
      }
    };

    fetchVavadaLink();
  }, []);

  // Track window width for mobile detection (≤800px) and small phone (≤430px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 800);
      setIsSmallPhone(window.innerWidth <= 430);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Determine active button
  const activeButton =
    pathname?.includes('/leaderboard')
      ? 'rang-lista'
      : activeSection === 'games-section'
      ? 'pokupi-bonuse'
      : activeSection === 'events'
      ? 'turniri'
      : activeSection === 'links'
      ? 'social'
      : null;

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Navigation handlers - memoized for performance
  const handlePokupiBonuse = useCallback(() => {
    if (pathname?.includes('/leaderboard')) {
      router.push(`/${locale}/`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, locale, router]);

  const handleTurniri = useCallback(() => {
    if (pathname?.includes('/leaderboard')) {
      router.push(`/${locale}/#tournaments`);
    } else {
      scrollToSection('events');
    }
  }, [pathname, locale, router]);

  const handleSocial = useCallback(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoize items array to prevent recreation on every render
  const items = useMemo(() => [
    {
      icon: Sparkles,
      title: "VAVADA",
      useLogo: true,
      color: "from-cyan-400 to-blue-500",
      textColor: "text-cyan-400",
      action: () => window.open(vavadaLink, '_blank'),
      isPage: false,
      pageId: null
    },
    {
      icon: Gift,
      title: isMobile ? 'Bonus' : t('getBonus'),
      color: "from-orange-400 to-red-500",
      textColor: "text-orange-400",
      action: handlePokupiBonuse,
      isPage: true,
      pageId: 'pokupi-bonuse'
    },
    {
      icon: Crown,
      title: isMobile ? 'Top 10' : t('leaderboard'),
      color: "from-yellow-400 to-amber-500",
      textColor: "text-yellow-400",
      action: () => router.push(`/${locale}/leaderboard`),
      isPage: true,
      pageId: 'rang-lista'
    },
    {
      icon: Swords,
      title: t('tournaments'),
      color: "from-purple-400 to-pink-500",
      textColor: "text-purple-400",
      action: handleTurniri,
      isPage: true,
      pageId: 'turniri'
    },
    {
      icon: Share2,
      title: t('social'),
      color: "from-green-400 to-emerald-500",
      textColor: "text-green-400",
      action: handleSocial,
      isPage: false,
      pageId: null
    }
  ], [vavadaLink, isMobile, t, handlePokupiBonuse, handleTurniri, handleSocial, router, locale]);

  return (
    <div className="relative glass border-b border-white/10 shadow-lg shadow-black/50">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-purple-500/5 animate-pulse" />

      {/* Top decorative line - double layer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent blur-sm" />

      <div className="relative max-w-7xl mx-auto px-2 lg:px-4">
        {/* Tabs bar background */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Tabs Container */}
        <div className="flex justify-center items-end gap-0.5 lg:gap-1 overflow-x-auto scrollbar-hide">
          {items.map((item, index) => {
            const isActive = item.pageId === activeButton;

            return (
              <motion.button
                key={index}
                onClick={item.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className={`
                  group relative flex flex-col lg:flex-row items-center lg:justify-center gap-0.5 lg:gap-2 px-2 sm:px-4 lg:px-5 py-3 lg:py-4
                  transition-all duration-300 cursor-pointer flex-1 lg:flex-none lg:min-w-[176px] min-w-0
                  bg-transparent border-0
                  ${isActive
                    ? 'bg-gradient-to-b from-gray-800/60 to-black/40 rounded-t-xl border-t border-x border-white/20 shadow-xl'
                    : 'hover:bg-gradient-to-b hover:from-gray-700/80 hover:to-gray-800/80 rounded-t-lg'
                  }
                `}
                style={{
                  marginBottom: isActive ? '-1px' : '0',
                  paddingBottom: isActive ? 'calc(0.75rem + 1px)' : '0.75rem'
                }}
              >
                {/* Chrome Tab Curves (Active Only) */}
                {isActive && (
                  <>
                    {/* Left curve */}
                    <div className="absolute left-0 bottom-0 w-2 h-2 overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-4 h-4 bg-white/10 rounded-br-full" />
                    </div>
                    {/* Right curve */}
                    <div className="absolute right-0 bottom-0 w-2 h-2 overflow-hidden">
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-white/10 rounded-bl-full" />
                    </div>

                    {/* Active tab highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl pointer-events-none" />
                  </>
                )}

                {/* Text Label or Logo */}
                {item.useLogo ? (
                  <>
                    {/* Mobile: Icon + Text */}
                    <div className="lg:hidden flex flex-col items-center gap-1">
                      {/* Icon Container */}
                      <div
                        className={`
                          relative p-1 sm:p-2.5 rounded-lg transition-all duration-300 flex-shrink-0
                          ${isActive
                            ? `bg-gradient-to-br ${item.color} shadow-xl`
                            : 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 group-hover:bg-gradient-to-br group-hover:' + item.color
                          }
                        `}
                      >
                        <item.icon
                          size={14}
                          className={`sm:w-5 sm:h-5 ${isActive ? 'text-white drop-shadow-lg' : item.textColor + ' group-hover:text-white'} transition-colors duration-300`}
                          strokeWidth={2.5}
                        />

                        {/* Icon glow effect on active */}
                        {isActive && (
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60 blur-xl rounded-xl -z-10 animate-pulse`} />
                        )}

                        {/* Hover glow effect on inactive */}
                        {!isActive && (
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-40 blur-lg rounded-xl -z-10 transition-opacity duration-300`} />
                        )}
                      </div>

                      {/* Text Label */}
                      <span
                        className={`
                          text-[8px] sm:text-xs font-black tracking-tight uppercase transition-colors duration-300 text-center flex items-center justify-center leading-[1.1] whitespace-nowrap
                          ${isActive
                            ? 'text-white'
                            : 'text-[#FE284A] group-hover:text-white'
                          }
                        `}
                        style={{
                          filter: isActive
                            ? 'drop-shadow(0 2px 8px rgba(254, 40, 74, 0.5))'
                            : 'drop-shadow(0 1px 4px rgba(254, 40, 74, 0.3))'
                        }}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* Desktop: Logo SVG */}
                    <div className="hidden lg:flex w-[161px] h-[50px] items-center justify-center pt-2.5 px-2.5 pb-3.5 relative">
                      <Image
                        src="/vavada_logo.svg"
                        alt="Vavada"
                        fill
                        className={`object-contain transition-all duration-300 animate-[breathing_3s_ease-in-out_infinite] ${
                          isActive
                            ? 'brightness-100'
                            : 'brightness-75 group-hover:brightness-100'
                        }`}
                        style={{
                          filter: isActive
                            ? 'drop-shadow(0 2px 8px rgba(254, 40, 74, 0.5))'
                            : undefined
                        }}
                        priority
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Icon Container */}
                    <div
                      className={`
                        relative p-1 sm:p-2.5 rounded-lg transition-all duration-300 flex-shrink-0
                        ${isActive
                          ? `bg-gradient-to-br ${item.color} shadow-xl`
                          : 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 group-hover:bg-gradient-to-br group-hover:' + item.color
                        }
                      `}
                    >
                      <item.icon
                        size={14}
                        className={`sm:w-5 sm:h-5 ${isActive ? 'text-white drop-shadow-lg' : item.textColor + ' group-hover:text-white'} transition-colors duration-300`}
                        strokeWidth={2.5}
                      />

                      {/* Icon glow effect on active */}
                      {isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60 blur-xl rounded-xl -z-10 animate-pulse`} />
                      )}

                      {/* Hover glow effect on inactive */}
                      {!isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-40 blur-lg rounded-xl -z-10 transition-opacity duration-300`} />
                      )}
                    </div>
                  </>
                )}

                {/* Text Label (for non-logo items) */}
                {!item.useLogo && (
                  <span
                    className={`
                      text-[8px] sm:text-xs lg:text-sm font-black tracking-tight uppercase transition-colors duration-300 text-center lg:min-h-0 flex items-center justify-center leading-[1.1] whitespace-nowrap
                      ${isActive
                        ? 'text-white'
                        : item.textColor + ' group-hover:text-white'
                      }
                    `}
                    style={{
                      filter: isActive
                        ? 'drop-shadow(0 2px 8px rgba(255,255,255,0.5))'
                        : undefined
                    }}
                  >
                    {item.title}
                  </span>
                )}

                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} shadow-lg`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
