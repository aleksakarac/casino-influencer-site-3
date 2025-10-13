'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, Play, Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      whileHover={{ scale: 1.02, x: 8 }}
      className="group cursor-pointer"
    >
      <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 ring-[0.5px] ring-inset ring-amber-500/20 hover:ring-amber-400/40">
        {/* Hot Badge */}
        {isHot && (
          <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <Flame size={12} />
            {t('hot')}
          </div>
        )}

        {/* Game Image */}
        <div className="relative h-32 lg:h-40 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 bg-amber-500/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg shadow-amber-500/50">
              <Play size={20} className="text-black ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="p-4">
          <h3 className="text-white text-base font-bold truncate group-hover:text-amber-400 transition-colors mb-1">
            {name}
          </h3>

          <p className="text-gray-400 text-sm mb-3 truncate">
            {subtitle}
          </p>

          {/* Stats */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1.5 text-green-400">
              <Users size={14} />
              <span className="font-semibold">{players}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Trophy size={14} />
              <span className="font-semibold">{prize}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
