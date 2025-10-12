'use client';

import { Users, Trophy, Play, Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface GameCardProps {
  name: string;
  subtitle: string;
  image: string;
  players: string;
  prize: string;
  isHot?: boolean;
}

export default function GameCard({ name, subtitle, image, players, prize, isHot }: GameCardProps) {
  const t = useTranslations('FeaturedGames');

  return (
    <div className="group cursor-pointer">
      <div className="relative bg-gradient-to-b from-gray-800/90 to-black/90 border border-amber-500/30 rounded-xl overflow-hidden backdrop-blur-sm hover:border-amber-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 hover:scale-105">
        {/* Hot Badge */}
        {isHot && (
          <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <Flame size={10} />
            {t('hot')}
          </div>
        )}

        {/* Game Image */}
        <div className="relative h-24 lg:h-32 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-amber-500/90 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play size={16} className="text-black ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="p-3">
          <h3 className="text-white text-sm font-semibold truncate group-hover:text-amber-200 transition-colors mb-1">
            {name}
          </h3>

          <p className="text-gray-400 text-xs mb-2 truncate">
            {subtitle}
          </p>

          {/* Stats */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1 text-green-400">
              <Users size={10} />
              <span>{players}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <Trophy size={10} />
              <span>{prize}</span>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 pointer-events-none" />
      </div>
    </div>
  );
}
