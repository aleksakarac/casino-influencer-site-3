'use client';

import { motion } from 'framer-motion';

interface PrizeCardProps {
  prizeNumber: number;
  prizeImage: string;
  prizeTitle: string;
  index: number;
}

const getPrizeColors = (prizeNumber: number) => {
  switch (prizeNumber) {
    case 1:
      return {
        gradient: 'from-yellow-500/20 to-amber-600/20',
        border: 'border-yellow-500/40',
      };
    case 2:
      return {
        gradient: 'from-gray-400/20 to-slate-500/20',
        border: 'border-gray-400/40',
      };
    case 3:
      return {
        gradient: 'from-amber-600/20 to-orange-700/20',
        border: 'border-amber-600/40',
      };
    case 4:
      return {
        gradient: 'from-green-500/20 to-emerald-600/20',
        border: 'border-green-500/40',
      };
    default:
      return {
        gradient: 'from-gray-800/50 to-gray-900/50',
        border: 'border-amber-500/20',
      };
  }
};

const getRankLabel = (prizeNumber: number) => {
  // Prize 4 is awarded to places 4-10
  if (prizeNumber === 4) {
    return '4th - 10th Place';
  }

  const suffixes = ['st', 'nd', 'rd', 'th'];
  const suffix = prizeNumber <= 3 ? suffixes[prizeNumber - 1] : suffixes[3];
  return `${prizeNumber}${suffix} Place`;
};

export function PrizeCard({ prizeNumber, prizeImage, prizeTitle, index }: PrizeCardProps) {
  const colors = getPrizeColors(prizeNumber);
  const rankLabel = getRankLabel(prizeNumber);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20`}
    >
      {/* Prize Image Section */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={prizeImage}
          alt={prizeTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Rank Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg border border-amber-500/30">
          <span className="text-xs font-bold text-amber-400">{rankLabel}</span>
        </div>
      </div>

      {/* Prize Label */}
      <div className="p-3 text-center">
        <div className="font-bold text-white text-sm">{prizeTitle}</div>
      </div>
    </motion.div>
  );
}
