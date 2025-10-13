'use client';

import { motion } from 'framer-motion';
import { Medal, Crown } from 'lucide-react';

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  watchTime: string;
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

const formatWatchTime = (watchTime: string): string => {
  // Handle format like "3:5:40" or "3 Days, 5 Hours, 40 Minutes"
  if (watchTime.includes('Day') || watchTime.includes('Hour') || watchTime.includes('Min')) {
    // Already in long format, just clean it up
    return watchTime
      .replace(/Minutes?/gi, 'min')
      .replace(/Hours?/gi, 'Hours')
      .replace(/Days?/gi, 'Days')
      .replace(/,/g, '');
  }

  // Format from short "3:5:40" to "3 Days 5 Hours 40min"
  const parts = watchTime.split(':');
  if (parts.length === 3) {
    const days = parseInt(parts[0], 10);
    const hours = parseInt(parts[1], 10);
    const minutes = parseInt(parts[2], 10);

    const result = [];
    if (days > 0) result.push(`${days} Day${days !== 1 ? 's' : ''}`);
    if (hours > 0) result.push(`${hours} Hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) result.push(`${minutes}min`);

    return result.join(' ') || '0min';
  }

  return watchTime;
};

export function LeaderboardEntry({
  rank,
  name,
  watchTime,
  index,
}: LeaderboardEntryProps) {
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

        {/* Watch Time */}
        <div className="text-right min-w-[100px] md:min-w-[150px]">
          <div className="text-sm md:text-lg font-black text-amber-400">
            {formatWatchTime(watchTime)}
          </div>
          <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-0.5">
            WATCH TIME
          </div>
        </div>
      </div>
    </motion.div>
  );
}
