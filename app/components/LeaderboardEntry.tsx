'use client';

import { motion } from 'framer-motion';
import { Medal, Crown } from 'lucide-react';
import { useLocale } from 'next-intl';

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  points: number | null;
  index: number;
}

const getRankBgColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'from-yellow-500/20 to-amber-600/20 border-yellow-500/40';
    case 2:
      return 'from-gray-400/20 to-slate-500/20 border-gray-400/40';
    case 3:
      return 'from-amber-600/20 to-orange-700/20 border-amber-600/40';
    default:
      return 'from-gray-800/50 to-gray-900/50 border-amber-500/20';
  }
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown size={28} className="md:hidden text-yellow-400" />;
    case 2:
      return <Medal size={28} className="md:hidden text-gray-300" />;
    case 3:
      return <Medal size={28} className="md:hidden text-amber-600" />;
    default:
      return null;
  }
};

const getRankIconDesktop = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown size={32} className="hidden md:block text-yellow-400" />;
    case 2:
      return <Medal size={32} className="hidden md:block text-gray-300" />;
    case 3:
      return <Medal size={32} className="hidden md:block text-amber-600" />;
    default:
      return null;
  }
};

export function LeaderboardEntry({
  rank,
  name,
  points,
  index,
}: LeaderboardEntryProps) {
  const locale = useLocale() as 'en' | 'sr';
  const pointsLabel = locale === 'sr' ? 'poeni' : 'points';
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className={`bg-gradient-to-r ${getRankBgColor(rank)} border rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10`}
    >
      <div className="flex items-center justify-between gap-3 md:gap-6 px-4 md:px-8 py-3 md:py-5">
        {/* Rank */}
        <div className="flex items-center justify-center min-w-[60px] md:min-w-[80px]">
          {rank <= 3 ? (
            <>
              {getRankIcon(rank)}
              {getRankIconDesktop(rank)}
            </>
          ) : (
            <span className="text-2xl md:text-3xl font-black text-gray-400">
              #{rank}
            </span>
          )}
        </div>

        {/* Viewer Name */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-xl font-bold text-white truncate">
            {name}
          </h3>
        </div>

        {/* Points */}
        <div className="text-right min-w-[100px] md:min-w-[140px]">
          <div className="text-lg md:text-2xl font-black text-amber-400">
            {(points ?? 0).toLocaleString()}
          </div>
          <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-0.5">
            {pointsLabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
