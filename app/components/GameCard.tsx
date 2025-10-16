'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, Play, Flame, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface GameCardProps {
  name: string;
  subtitle: string;
  image: string;
  players: string;
  prize: string;
  isHot?: boolean;
  index?: number;
}

export default function GameCard({ name, subtitle, image, players, prize, isHot, index = 0 }: GameCardProps) {
  const t = useTranslations('FeaturedGames');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer h-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="relative h-full glass-elevated rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
        style={{
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(244, 196, 48, 0.25), 0 0 0 1px rgba(244, 196, 48, 0.1)'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Hot Badge */}
        {isHot && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            className="absolute top-3 right-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
          >
            <Flame size={14} fill="currentColor" />
            <span className="tracking-wide">{t('hot')}</span>
          </motion.div>
        )}

        {/* Trending Indicator */}
        {!isHot && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-3 right-3 z-20 glass-elevated px-2.5 py-1 rounded-lg flex items-center gap-1"
          >
            <TrendingUp size={12} className="text-green-400" />
            <span className="text-xs font-semibold text-green-400">+{Math.floor(Math.random() * 30 + 10)}%</span>
          </motion.div>
        )}

        {/* Image Container */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          {/* Image */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90" />

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

          {/* Play Button Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold-500 rounded-full blur-xl opacity-60" />

              {/* Button */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-gold-300/50">
                <Play size={24} className="text-slate-900 ml-1" fill="currentColor" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative p-5">
          {/* Title */}
          <h3 className="text-white text-lg font-bold mb-1 truncate group-hover:text-gold-400 transition-colors duration-300">
            {name}
          </h3>

          {/* Subtitle */}
          <p className="text-slate-400 text-sm mb-4 truncate">
            {subtitle}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-4" />

          {/* Stats */}
          <div className="flex justify-between items-center">
            {/* Players */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <Users size={16} className="text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">Players</span>
                <span className="text-sm font-bold text-green-400">{players}</span>
              </div>
            </div>

            {/* Prize */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/20">
                <Trophy size={16} className="text-gold-400" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-500 font-medium">Prize</span>
                <span className="text-sm font-bold text-gold-400">{prize}</span>
              </div>
            </div>
          </div>

          {/* Bottom Glow */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.3 : 0,
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
        </div>

        {/* Border Glow on Hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 rounded-2xl border border-gold-500/20 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
