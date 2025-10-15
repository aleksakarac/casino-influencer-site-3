'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Crown, Swords, Share2, Star } from 'lucide-react';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { client } from '@/app/lib/sanity';
import { useTranslations, useLocale } from 'next-intl';
import { haptics } from '@/app/utils/haptics';

export default function MiddleBar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const activeSection = useActiveSection();
  const [vavadaLink, setVavadaLink] = useState<string>('#');
  const t = useTranslations('MiddleBar');

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
      icon: Sparkles,
      title: "VAVADA",
      useLogo: true,
      color: "from-red-500 via-pink-500 to-purple-600",
      bgGradient: "from-red-500/20 to-pink-600/20",
      glowColor: "rgba(254, 40, 74, 0.6)",
      action: () => {
        haptics.light();
        window.open(vavadaLink, '_blank');
      },
      pageId: null
    },
    {
      icon: Gift,
      title: t('getBonus'),
      mobileTitle: "BONUS",
      color: "from-orange-400 via-red-500 to-pink-500",
      bgGradient: "from-orange-400/20 to-red-500/20",
      glowColor: "rgba(251, 146, 60, 0.6)",
      action: () => {
        haptics.light();
        handlePokupiBonuse();
      },
      pageId: 'pokupi-bonuse'
    },
    {
      icon: Crown,
      title: t('leaderboard'),
      mobileTitle: "TOP 10",
      color: "from-yellow-400 via-amber-500 to-orange-500",
      bgGradient: "from-yellow-400/20 to-amber-500/20",
      glowColor: "rgba(250, 204, 21, 0.6)",
      action: () => {
        haptics.light();
        router.push(`/${locale}/leaderboard`);
      },
      pageId: 'rang-lista'
    },
    {
      icon: Swords,
      title: t('tournaments'),
      color: "from-purple-400 via-violet-500 to-fuchsia-500",
      bgGradient: "from-purple-400/20 to-pink-500/20",
      glowColor: "rgba(192, 132, 252, 0.6)",
      action: () => {
        haptics.light();
        handleTurniri();
      },
      pageId: 'turniri'
    },
    {
      icon: Share2,
      title: t('social'),
      color: "from-green-400 via-emerald-500 to-teal-500",
      bgGradient: "from-green-400/20 to-emerald-500/20",
      glowColor: "rgba(74, 222, 128, 0.6)",
      action: () => {
        haptics.light();
        handleSocial();
      },
      pageId: null
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-4 overflow-hidden"
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-purple-900/10 backdrop-blur-2xl border-y border-white/10" />

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
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3), transparent)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, -40, -20],
            x: [0, Math.sin(i) * 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
          className="absolute w-1 h-1 bg-purple-400 rounded-full blur-sm"
          style={{
            left: `${(i * 12) + 10}%`,
            top: '50%',
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Navigation Bubbles Container */}
        <div className="flex justify-center items-center gap-3 md:gap-4 lg:gap-6 flex-wrap">
          {items.map((item, index) => {
            const isActive = item.pageId === activeButton;

            return (
              <motion.button
                key={index}
                onClick={item.action}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.1,
                  rotateZ: [-1, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                {/* Morphing Bubble Container */}
                <motion.div
                  animate={isActive ? {
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Main Bubble */}
                  <div className={`
                    relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                    rounded-3xl
                    bg-gradient-to-br ${isActive ? item.color : item.bgGradient}
                    backdrop-blur-xl
                    border ${isActive ? 'border-white/30' : 'border-white/10'}
                    shadow-2xl
                    transition-all duration-500
                    flex items-center justify-center
                    overflow-hidden
                  `}>
                    {/* Inner Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-${isActive ? '40' : '0'} group-hover:opacity-30 blur-xl transition-opacity duration-500`} />

                    {/* Animated Border Gradient */}
                    {isActive && (
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: `conic-gradient(from 0deg, transparent, ${item.glowColor}, transparent)`,
                        }}
                      />
                    )}

                    {/* Logo or Icon */}
                    {item.useLogo ? (
                      <motion.div
                        animate={isActive ? {
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative z-10 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      >
                        <img
                          src="/vavada_logo.svg"
                          alt="Vavada"
                          className={`w-full h-full object-contain transition-all duration-300 ${
                            isActive ? 'brightness-110 drop-shadow-2xl' : 'brightness-90 group-hover:brightness-110'
                          }`}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={isActive ? {
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative z-10"
                      >
                        <item.icon
                          size={32}
                          className={`md:w-9 md:h-9 lg:w-10 lg:h-10 ${
                            isActive ? 'text-white drop-shadow-2xl' : 'text-white/70 group-hover:text-white'
                          } transition-colors duration-300`}
                          strokeWidth={2}
                        />
                      </motion.div>
                    )}

                    {/* Sparkle Effects */}
                    <AnimatePresence>
                      {isActive && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              rotate: [0, 180],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                            className="absolute top-2 right-2"
                          >
                            <Star size={12} className="text-yellow-300 fill-yellow-300" />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              rotate: [0, -180],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: 1
                            }}
                            className="absolute bottom-2 left-2"
                          >
                            <Star size={10} className="text-cyan-300 fill-cyan-300" />
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Outer Glow Ring */}
                  {isActive && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} blur-2xl`}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="mt-2 text-center"
                >
                  <span className={`
                    text-xs md:text-sm font-black tracking-wider uppercase
                    ${isActive
                      ? 'text-transparent bg-gradient-to-r bg-clip-text ' + item.color
                      : 'text-white/60 group-hover:text-white/90'
                    }
                    transition-colors duration-300
                    drop-shadow-lg
                  `}>
                    {item.mobileTitle || item.title}
                  </span>

                  {/* Active Indicator Dot */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="mt-1 mx-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Glow Line */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />
    </motion.div>
  );
}
