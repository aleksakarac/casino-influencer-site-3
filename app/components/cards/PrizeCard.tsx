'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

interface PrizeCardProps {
  prizeNumber: number;
  prizeImage: string;
  prizeTitle: string;
  index: number;
  locale: 'en' | 'sr';
}

const getPrizeColors = (prizeNumber: number) => {
  switch (prizeNumber) {
    case 1:
      return {
        gradient: 'from-yellow-500/30 to-amber-600/30',
        borderColor: '#F4C430',
        iconBg: 'from-yellow-500 to-amber-600',
        icon: Crown,
      };
    case 2:
      return {
        gradient: 'from-gray-400/30 to-slate-500/30',
        borderColor: '#94A3B8',
        iconBg: 'from-gray-400 to-slate-500',
        icon: Medal,
      };
    case 3:
      return {
        gradient: 'from-amber-600/30 to-orange-700/30',
        borderColor: '#D97706',
        iconBg: 'from-amber-600 to-orange-700',
        icon: Award,
      };
    case 4:
      return {
        gradient: 'from-green-500/30 to-emerald-600/30',
        borderColor: '#10B981',
        iconBg: 'from-green-500 to-emerald-600',
        icon: Trophy,
      };
    default:
      return {
        gradient: 'from-slate-700/30 to-slate-800/30',
        borderColor: '#64748B',
        iconBg: 'from-slate-600 to-slate-700',
        icon: Trophy,
      };
  }
};

const getRankLabel = (prizeNumber: number, locale: 'en' | 'sr') => {
  if (prizeNumber === 4) {
    return locale === 'sr' ? '4. - 10. Mesto' : '4th - 10th Place';
  }

  if (locale === 'sr') {
    return `${prizeNumber}. Mesto`;
  }

  const suffixes = ['st', 'nd', 'rd', 'th'];
  const suffix = prizeNumber <= 3 ? suffixes[prizeNumber - 1] : suffixes[3];
  return `${prizeNumber}${suffix} Place`;
};

export function PrizeCard({ prizeNumber, prizeImage, prizeTitle, index, locale }: PrizeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = getPrizeColors(prizeNumber);
  const rankLabel = getRankLabel(prizeNumber, locale);
  const Icon = colors.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.1 + index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full"
    >
      <motion.a
        href="https://kick.com/acajankovic"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="block relative h-full rounded-2xl overflow-hidden glass-elevated shadow-lg transition-all duration-300 hover:shadow-2xl"
        style={{
          boxShadow: isHovered
            ? `0 20px 40px -12px ${colors.borderColor}40, 0 0 0 1px ${colors.borderColor}30`
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Image Container */}
        <div className="relative h-32 overflow-hidden">
          {/* Background Image */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${prizeImage})` }}
          />

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />

          {/* Shimmer Effect */}
          <motion.div
            animate={{
              x: isHovered ? ['0%', '200%'] : '0%',
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />

          {/* Rank Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            className="absolute top-2 right-2 z-10"
          >
            <div className="relative">
              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-[2px] rounded-lg blur-sm"
                style={{ backgroundColor: colors.borderColor }}
              />

              <div className="relative px-2.5 py-1 glass-elevated rounded-lg border-2 shadow-lg"
                style={{ borderColor: colors.borderColor }}
              >
                <span className="text-xs font-bold" style={{ color: colors.borderColor }}>
                  {rankLabel}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
            className={`absolute top-2 left-2 z-10 bg-gradient-to-br ${colors.iconBg} p-2 rounded-lg shadow-lg`}
          >
            <Icon size={14} className="text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative p-3 glass">
          <h3 className="text-white text-sm font-bold text-center leading-tight">
            {prizeTitle}
          </h3>
        </div>

        {/* Border Glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `1px solid ${colors.borderColor}40`
          }}
        />
      </motion.a>
    </motion.div>
  );
}
