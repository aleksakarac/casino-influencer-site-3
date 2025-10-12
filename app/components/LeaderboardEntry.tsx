'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  avatarEmoji: string;
  watchTime: number;
  daysWatched: number;
  avgDaily: number;
  badge: string;
  change: string;
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
      return <Crown size={24} className="text-yellow-400" />;
    case 2:
      return <Medal size={24} className="text-gray-300" />;
    case 3:
      return <Medal size={24} className="text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
  }
};

const getChangeColor = (change: string) => {
  if (change.startsWith('+')) return 'text-green-400';
  if (change.startsWith('-')) return 'text-red-400';
  return 'text-gray-500';
};

export function LeaderboardEntry({
  rank,
  name,
  avatarEmoji,
  watchTime,
  daysWatched,
  avgDaily,
  badge,
  change,
  index,
}: LeaderboardEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      whileHover={{ scale: 1.02, x: 8 }}
      className={`bg-gradient-to-r ${getRankBgColor(rank)} border rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Rank & Avatar */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Rank Icon */}
          <div className="flex-shrink-0 w-12 flex items-center justify-center">
            {getRankIcon(rank)}
          </div>

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-2xl flex-shrink-0">
            {avatarEmoji}
          </div>

          {/* Viewer Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-white truncate">{name}</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-yellow-600 text-black">
                {badge}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Trophy size={12} />
                {daysWatched || 0} days
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp size={12} />
                {avgDaily || 0}h avg
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Watch Time & Change */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xl font-bold text-amber-400">
              {(watchTime || 0).toLocaleString()}h
            </div>
            <div className="text-xs text-gray-500">watch time</div>
          </div>

          <div className={`flex items-center gap-1 font-bold ${getChangeColor(change || '0')}`}>
            {change && change !== '0' && (
              <span className="text-lg">
                {change.startsWith('+') ? '↑' : '↓'}
              </span>
            )}
            <span className="hidden md:block">
              {change && change !== '0' ? change.replace(/[+-]/, '') : '—'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
