'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Home, Trophy, Calendar, Link2 } from 'lucide-react';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { client } from '@/app/lib/sanity';
import { useTranslations, useLocale } from 'next-intl';

export default function MiddleBar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const activeSection = useActiveSection();
  const [vavadaLink, setVavadaLink] = useState<string>('#');
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

  // Navigation handlers
  const handlePokupiBonuse = () => {
    if (pathname?.includes('/leaderboard')) {
      router.push(`/${locale}/#games`);
    } else {
      scrollToSection('games-section');
    }
  };

  const handleTurniri = () => {
    if (pathname?.includes('/leaderboard')) {
      router.push(`/${locale}/#tournaments`);
    } else {
      scrollToSection('events');
    }
  };

  const handleSocial = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const items = [
    {
      icon: ExternalLink,
      title: "VAVADA",
      color: "from-cyan-400 to-teal-500",
      textColor: "text-cyan-400",
      action: () => window.open(vavadaLink, '_blank'),
      isPage: false,
      pageId: null
    },
    {
      icon: Home,
      title: t('getBonus'),
      color: "from-orange-400 to-red-500",
      textColor: "text-orange-400",
      action: handlePokupiBonuse,
      isPage: true,
      pageId: 'pokupi-bonuse'
    },
    {
      icon: Trophy,
      title: t('leaderboard'),
      color: "from-purple-400 to-indigo-500",
      textColor: "text-purple-400",
      action: () => router.push(`/${locale}/leaderboard`),
      isPage: true,
      pageId: 'rang-lista'
    },
    {
      icon: Calendar,
      title: t('tournaments'),
      color: "from-amber-400 to-yellow-500",
      textColor: "text-amber-400",
      action: handleTurniri,
      isPage: true,
      pageId: 'turniri'
    },
    {
      icon: Link2,
      title: t('social'),
      color: "from-green-400 to-emerald-500",
      textColor: "text-green-400",
      action: handleSocial,
      isPage: false,
      pageId: null
    }
  ];

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 border-b border-white/5">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 opacity-20" />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-2 lg:px-4">
        {/* Tabs bar background */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

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
                className={`
                  group relative flex flex-col lg:flex-row items-center lg:justify-center gap-1.5 lg:gap-2 px-4 lg:px-5 py-4 lg:py-4
                  transition-all duration-300 cursor-pointer flex-1 lg:flex-none lg:min-w-[176px]
                  bg-transparent border-0
                  ${isActive
                    ? 'bg-black/40 rounded-t-xl border-t border-x border-white/10'
                    : 'hover:bg-white/5 rounded-t-lg'
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

                {/* Icon Container */}
                <div
                  className={`
                    relative p-2 lg:p-2 rounded-lg transition-all duration-300 flex-shrink-0
                    ${isActive
                      ? `bg-gradient-to-br ${item.color} shadow-lg`
                      : 'bg-gray-800/50 group-hover:bg-gradient-to-br group-hover:' + item.color
                    }
                  `}
                >
                  <item.icon
                    size={20}
                    className={`lg:w-[18px] lg:h-[18px] ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors duration-300`}
                    strokeWidth={2.5}
                  />

                  {/* Icon glow effect on active */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50 blur-lg rounded-lg -z-10`} />
                  )}
                </div>

                {/* Text Label */}
                <span
                  className={`
                    text-xs lg:text-sm font-bold tracking-wide transition-colors duration-300 text-center min-h-[2.5rem] lg:min-h-0 flex items-center justify-center
                    ${isActive
                      ? 'text-white'
                      : item.textColor + ' group-hover:text-white'
                    }
                  `}
                >
                  {item.title}
                </span>

                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color}`}
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
