'use client';

import { Trophy, Clock, Shield, Sparkles, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCountdown } from '../hooks/useCountdown';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '@/app/lib/sanity';

interface TournamentCardProps {
  name: string;
  description: string;
  image: string;
  prizePool: string;
  players: number;
  buyIn: string;
  winnerPrize: string;
  tableType: string;
  endDate: string;
  joinLink: string;
  tier?: string;
  index?: number;
}

export default function TournamentCard({
  name,
  description,
  image,
  prizePool,
  players,
  buyIn,
  winnerPrize,
  tableType,
  endDate,
  joinLink,
  tier = 'Platinum',
  index = 0,
}: TournamentCardProps) {
  const t = useTranslations('Tournaments');
  const { days, hours, minutes, seconds, isExpired, isMounted } = useCountdown(endDate);
  const [vavadaLink, setVavadaLink] = useState<string>('#');
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt effect for desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

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

  const handleJoin = () => {
    window.open(vavadaLink, '_blank', 'noopener,noreferrer');
  };

  // Get status badge styles based on tier
  const getTierStyles = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes('beginner') || lower.includes('bronze')) {
      return {
        gradient: 'from-orange-600 to-amber-700',
        glow: 'shadow-orange-500/20',
        borderGlow: 'border-orange-500/40',
        accentGlow: 'from-orange-500/10 via-amber-500/5 to-transparent',
      };
    } else if (lower.includes('silver')) {
      return {
        gradient: 'from-gray-400 to-gray-500',
        glow: 'shadow-gray-400/20',
        borderGlow: 'border-gray-400/40',
        accentGlow: 'from-gray-400/10 via-gray-500/5 to-transparent',
      };
    } else if (lower.includes('gold')) {
      return {
        gradient: 'from-yellow-400 to-yellow-600',
        glow: 'shadow-yellow-500/20',
        borderGlow: 'border-yellow-500/40',
        accentGlow: 'from-yellow-500/10 via-amber-500/5 to-transparent',
      };
    } else if (lower.includes('platinum') || lower.includes('diamond')) {
      return {
        gradient: 'from-cyan-400 to-blue-500',
        glow: 'shadow-cyan-500/20',
        borderGlow: 'border-cyan-500/40',
        accentGlow: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      };
    }
    return {
      gradient: 'from-purple-500 to-pink-600',
      glow: 'shadow-purple-500/20',
      borderGlow: 'border-purple-500/40',
      accentGlow: 'from-purple-500/10 via-pink-500/5 to-transparent',
    };
  };

  const tierStyles = getTierStyles(tier);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="h-full flex flex-col cursor-pointer"
    >
      <motion.div
        className={`relative flex flex-col h-full glass-elevated border-2 ${tierStyles.borderGlow} rounded-2xl shadow-2xl ${tierStyles.glow} transition-all duration-500 overflow-hidden group`}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Animated Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${tierStyles.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Image Section */}
        <div className="relative h-48 sm:h-56 overflow-hidden z-10">
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Prize Pool Badge - Top Left */}
          <motion.div
            className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <motion.div
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-black px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow-2xl border-2 border-yellow-400/50 flex items-center gap-1.5 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: ['0 0 10px rgba(245, 158, 11, 0.3)', '0 0 20px rgba(245, 158, 11, 0.5)', '0 0 10px rgba(245, 158, 11, 0.3)'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <Trophy size={13} strokeWidth={3} className="sm:w-[14px] sm:h-[14px]" />
              <span className="text-[11px] sm:text-xs tracking-wide">{prizePool}</span>
            </motion.div>
          </motion.div>

          {/* Tier Badge - Top Right */}
          <motion.div
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`bg-gradient-to-r ${tierStyles.gradient} text-white font-black px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow-2xl border-2 border-white/30 flex items-center gap-1.5 backdrop-blur-sm`}>
              <Shield size={13} strokeWidth={2.5} className="sm:w-[14px] sm:h-[14px]" />
              <span className="text-[11px] sm:text-xs tracking-wider">{tier}</span>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative flex flex-col flex-grow p-4 sm:p-6 z-10">
          {/* Tournament Title */}
          <motion.h3
            className="text-base sm:text-xl font-black text-white mb-3 sm:mb-4 line-clamp-2 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {name}
          </motion.h3>

          {/* Countdown Timer */}
          <div className="mb-4 sm:mb-5 flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={15} className="text-amber-400 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span className="text-xs sm:text-sm text-gray-300 font-semibold uppercase tracking-wide">{t('endsIn')}</span>
            </div>

            {!isMounted ? (
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="text-center">
                    <motion.div
                      className="bg-gradient-to-br from-gray-900/70 to-black/60 border-2 border-amber-500/30 rounded-xl p-2 sm:p-2.5 shadow-xl backdrop-blur-sm"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(245, 158, 11, 0.5)' }}
                    >
                      <div className="text-base sm:text-xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">00</div>
                    </motion.div>
                    <div className="text-[9px] sm:text-[10px] text-gray-500 mt-1.5 uppercase tracking-wider font-semibold">...</div>
                  </div>
                ))}
              </div>
            ) : isExpired ? (
              <motion.div
                className="text-center py-3 sm:py-4 bg-gradient-to-r from-red-900/40 to-red-800/40 rounded-xl border-2 border-red-500/50 backdrop-blur-sm shadow-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <span className="text-red-300 font-black text-sm sm:text-base tracking-wide">{t('ended')}</span>
              </motion.div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hrs', value: hours },
                  { label: 'Min', value: minutes },
                  { label: 'Sec', value: seconds }
                ].map((time, idx) => (
                  <div key={idx} className="text-center">
                    <motion.div
                      className="bg-gradient-to-br from-gray-900/70 to-black/60 border-2 border-amber-500/30 rounded-xl p-2 sm:p-2.5 shadow-xl backdrop-blur-sm"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(245, 158, 11, 0.5)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        key={time.value}
                        initial={{ scale: 1.2, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-base sm:text-xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                      >
                        {String(time.value).padStart(2, '0')}
                      </motion.div>
                    </motion.div>
                    <div className="text-[9px] sm:text-[10px] text-gray-500 mt-1.5 uppercase tracking-wider font-semibold">{time.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Join Button */}
          <motion.button
            onClick={handleJoin}
            disabled={isExpired}
            className={`w-full px-4 py-3 sm:py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-black font-black text-sm sm:text-base rounded-xl shadow-2xl border-2 border-yellow-400/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              isExpired ? 'opacity-50 cursor-not-allowed grayscale' : ''
            }`}
            whileHover={!isExpired ? {
              scale: 1.05,
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)',
            } : {}}
            whileTap={!isExpired ? { scale: 0.98 } : {}}
          >
            <Trophy size={16} strokeWidth={3} className="sm:w-5 sm:h-5" />
            <span className="tracking-wider">{isExpired ? t('ended') : 'JOIN NOW'}</span>
          </motion.button>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tierStyles.accentGlow} opacity-50`}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
