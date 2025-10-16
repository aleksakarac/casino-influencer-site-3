'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Medal, Crown, Trophy, Star } from 'lucide-react';
import { useLocale } from 'next-intl';

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  points: number | null;
  index: number;
}

const getRankStyles = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        gradient: 'from-yellow-500/30 to-amber-600/30',
        borderColor: '#F4C430',
        textColor: 'text-yellow-400',
        icon: Crown,
        glow: 'shadow-yellow-500/20',
      };
    case 2:
      return {
        gradient: 'from-gray-400/30 to-slate-500/30',
        borderColor: '#94A3B8',
        textColor: 'text-gray-300',
        icon: Medal,
        glow: 'shadow-gray-400/20',
      };
    case 3:
      return {
        gradient: 'from-amber-600/30 to-orange-700/30',
        borderColor: '#D97706',
        textColor: 'text-amber-600',
        icon: Trophy,
        glow: 'shadow-amber-600/20',
      };
    default:
      return {
        gradient: 'from-slate-700/20 to-slate-800/20',
        borderColor: '#64748B',
        textColor: 'text-slate-400',
        icon: Star,
        glow: 'shadow-slate-500/10',
      };
  }
};

export function LeaderboardEntry({
  rank,
  name,
  points,
  index,
}: LeaderboardEntryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const locale = useLocale() as 'en' | 'sr';
  const pointsLabel = locale === 'sr' ? 'poena' : 'points';
  const styles = getRankStyles(rank);
  const Icon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.1 + index * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        whileHover={{ x: 4, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`relative glass-elevated rounded-xl md:rounded-2xl transition-all duration-300 ${styles.glow} overflow-hidden`}
        style={{
          boxShadow: isHovered
            ? `0 10px 30px -10px ${styles.borderColor}40, 0 0 0 1px ${styles.borderColor}20`
            : '0 4px 15px -5px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${styles.gradient}`} />

        {/* Shimmer Effect */}
        <motion.div
          animate={{
            x: isHovered ? ['0%', '200%'] : '0%',
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
        />

        {/* Content */}
        <div className="relative flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-3 md:py-4">
          {/* Rank */}
          <div className="flex items-center justify-center min-w-[60px] md:min-w-[80px]">
            {rank <= 3 ? (
              <motion.div
                animate={{
                  rotate: isHovered ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="relative"
              >
                {/* Glow Effect for Top 3 */}
                {rank === 1 && (
                  <div className="absolute inset-0 bg-yellow-500 rounded-full blur-lg opacity-30" />
                )}
                <Icon
                  size={rank === 1 ? 32 : 28}
                  className={`relative ${styles.textColor}`}
                  strokeWidth={2.5}
                />
              </motion.div>
            ) : (
              <span className={`text-2xl md:text-3xl font-bold ${styles.textColor}`}>
                #{rank}
              </span>
            )}
          </div>

          {/* Viewer Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-lg font-bold text-white truncate">
              {name}
            </h3>
          </div>

          {/* Points */}
          <div className="text-right min-w-[90px] md:min-w-[120px]">
            <div className={`text-base md:text-xl font-bold ${styles.textColor}`}>
              {(points ?? 0).toLocaleString()}
            </div>
            <div className="text-[9px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold">
              {pointsLabel}
            </div>
          </div>
        </div>

        {/* Border Glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 rounded-xl md:rounded-2xl pointer-events-none"
          style={{
            border: `1px solid ${styles.borderColor}40`
          }}
        />
      </motion.div>
    </motion.div>
  );
}
