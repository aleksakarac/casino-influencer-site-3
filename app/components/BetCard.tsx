'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';

interface BetCardProps {
  useImageMode?: boolean;
  cardImageUrl?: string;
  matchTitle?: string;
  betType?: { en: string; sr: string };
  selection?: string;
  matchDateTime?: string;
  isBoostedOdds?: boolean;
  originalOdds?: number;
  odds?: number;
  stake?: number;
  potentialWin?: number;
  status?: 'open' | 'won' | 'lost' | 'cashedOut';
  cashoutAmount?: number;
  betId?: string;
  index?: number;
}

export default function BetCard({
  useImageMode = false,
  cardImageUrl,
  matchTitle,
  betType,
  selection,
  matchDateTime,
  isBoostedOdds,
  originalOdds,
  odds,
  stake,
  potentialWin,
  status,
  cashoutAmount,
  betId,
  index = 0,
}: BetCardProps) {
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);

  // If image mode is enabled, render image card
  if (useImageMode && cardImageUrl) {
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
        className="h-full"
      >
        <motion.div
          className="relative flex flex-col h-full rounded-2xl shadow-2xl overflow-hidden group cursor-pointer"
          whileHover={{
            scale: 1.03,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image covering the full card */}
          <div className="relative w-full h-full min-h-[400px] sm:min-h-[450px]">
            <img
              src={cardImageUrl}
              alt="Bet Card"
              className="w-full h-full object-cover"
            />

            {/* Hover overlay effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            />

            {/* Shimmer Effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    );
  }

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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} • ${hours}:${minutes}`;
  };

  // Get status color and label
  const getStatusStyles = () => {
    switch (status) {
      case 'open':
        return {
          bgColor: 'from-gray-800/95 via-gray-800/90 to-gray-900/95',
          borderColor: 'border-yellow-500/40',
          glowColor: 'shadow-yellow-500/20',
          labelBg: 'bg-gradient-to-r from-yellow-500/30 to-amber-500/30',
          labelText: 'text-yellow-300',
          labelBorder: 'border-yellow-400/50',
          accentGlow: 'from-yellow-500/10 via-amber-500/5 to-transparent',
          label: 'OPEN',
        };
      case 'won':
        return {
          bgColor: 'from-green-900/80 via-gray-800/90 to-gray-900/95',
          borderColor: 'border-green-500/50',
          glowColor: 'shadow-green-500/20',
          labelBg: 'bg-gradient-to-r from-green-500/30 to-emerald-500/30',
          labelText: 'text-green-300',
          labelBorder: 'border-green-400/50',
          accentGlow: 'from-green-500/10 via-emerald-500/5 to-transparent',
          label: 'WON',
        };
      case 'lost':
        return {
          bgColor: 'from-red-900/60 via-gray-800/90 to-gray-900/95',
          borderColor: 'border-red-500/40',
          glowColor: 'shadow-red-500/20',
          labelBg: 'bg-gradient-to-r from-red-500/30 to-rose-500/30',
          labelText: 'text-red-300',
          labelBorder: 'border-red-400/50',
          accentGlow: 'from-red-500/10 via-rose-500/5 to-transparent',
          label: 'LOST',
        };
      case 'cashedOut':
        return {
          bgColor: 'from-blue-900/70 via-gray-800/90 to-gray-900/95',
          borderColor: 'border-blue-500/50',
          glowColor: 'shadow-blue-500/20',
          labelBg: 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30',
          labelText: 'text-blue-300',
          labelBorder: 'border-blue-400/50',
          accentGlow: 'from-blue-500/10 via-cyan-500/5 to-transparent',
          label: 'CASHED OUT',
        };
    }
  };

  const statusStyles = getStatusStyles();
  const betTypeText = locale === 'sr' ? betType.sr : betType.en;

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
      className="h-full"
    >
      <motion.div
        className={`relative flex flex-col h-full bg-gradient-to-br ${statusStyles.bgColor} border-2 ${statusStyles.borderColor} rounded-2xl shadow-2xl ${statusStyles.glowColor} transition-all duration-500 backdrop-blur-md overflow-hidden group`}
        whileHover={{
          scale: 1.03,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Animated Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${statusStyles.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
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

        {/* Status Badge with Pulse Animation */}
        <motion.div
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10"
          animate={status === 'open' ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <motion.div
            className={`${statusStyles.labelBg} ${statusStyles.labelText} font-bold px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-[10px] sm:text-xs border-2 ${statusStyles.labelBorder} backdrop-blur-sm shadow-lg flex items-center gap-1`}
            whileHover={{ scale: 1.05 }}
          >
            {status === 'open' && <Sparkles size={10} className="animate-pulse sm:w-3 sm:h-3" />}
            <span className="font-black tracking-wider">{statusStyles.label}</span>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 z-10">
          {/* Match Title with subtle animation */}
          <motion.h3
            className="text-sm sm:text-lg font-black text-white pr-16 sm:pr-24 leading-tight drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {matchTitle}
          </motion.h3>

          {/* Bet Type with Selection */}
          <div className="space-y-2 sm:space-y-2.5">
            {isBoostedOdds && (
              <motion.div
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-400/60 rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm shadow-lg"
                animate={{
                  boxShadow: ['0 0 10px rgba(34, 197, 94, 0.3)', '0 0 20px rgba(34, 197, 94, 0.5)', '0 0 10px rgba(34, 197, 94, 0.3)'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <TrendingUp size={13} className="text-green-300 sm:w-4 sm:h-4" strokeWidth={2.5} />
                <span className="text-[11px] sm:text-xs font-black text-green-300 uppercase tracking-wider">
                  Boosted
                </span>
              </motion.div>
            )}

            <div>
              <div className="text-[11px] sm:text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">{betTypeText}</div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/80 to-black/60 border-2 border-gray-700/50 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 w-fit shadow-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(250, 204, 21, 0.5)' }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm sm:text-base font-black text-white tracking-wide">{selection}</span>
                </motion.div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-gray-500 sm:w-[15px] sm:h-[15px]" />
                  <span className="text-[11px] sm:text-xs text-gray-400 font-medium">{formatDate(matchDateTime)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* VAVADA Logo with Glow */}
          <motion.div
            className="flex justify-center py-2 sm:py-3"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="80" height="20" viewBox="0 0 100 25" fill="none" className="sm:w-[90px] sm:h-[22px] drop-shadow-[0_0_8px_rgba(254,40,74,0.5)]">
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FE284A" fontSize="18" fontWeight="900" fontFamily="Arial, sans-serif">
                VAVADA
              </text>
            </svg>
          </motion.div>

          {/* Odds Section with Enhanced Design */}
          <div className="space-y-2 sm:space-y-2.5">
            {/* Odds Row - Prominent */}
            <motion.div
              className="flex justify-between items-center bg-gradient-to-r from-gray-900/60 to-black/40 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-700/50 shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.02, borderColor: 'rgba(250, 204, 21, 0.4)' }}
            >
              <span className="text-xs sm:text-sm text-gray-300 font-bold uppercase tracking-wide">Odds</span>
              <div className="flex items-center gap-2 sm:gap-2.5">
                {isBoostedOdds && originalOdds && (
                  <span className="text-sm sm:text-base text-gray-500 line-through font-semibold">{originalOdds.toFixed(2)}</span>
                )}
                <motion.span
                  className="text-xl sm:text-2xl font-black text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {odds.toFixed(2)}
                </motion.span>
              </div>
            </motion.div>

            {/* Stake and Win - Enhanced Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <motion.div
                className="flex flex-col justify-center bg-gradient-to-br from-gray-900/50 to-black/30 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-700/40 shadow-md backdrop-blur-sm"
                whileHover={{ scale: 1.03, borderColor: 'rgba(156, 163, 175, 0.5)' }}
              >
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Stake</span>
                <span className="text-sm sm:text-base font-black text-white">€{stake.toFixed(2)}</span>
              </motion.div>

              <motion.div
                className="flex flex-col justify-center bg-gradient-to-br from-gray-900/50 to-black/30 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-700/40 shadow-md backdrop-blur-sm"
                whileHover={{ scale: 1.03, borderColor: 'rgba(34, 197, 94, 0.4)' }}
              >
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Win</span>
                <span className="text-sm sm:text-base font-black text-green-400">€{potentialWin.toFixed(2)}</span>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Action Button/Result */}
          {status === 'open' && cashoutAmount ? (
            <motion.button
              className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-400 hover:via-emerald-400 hover:to-green-500 text-white font-black py-3 sm:py-3.5 rounded-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base border-2 border-green-400/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)' }}
              whileTap={{ scale: 0.98 }}
            >
              <DollarSign size={16} strokeWidth={3} className="sm:w-5 sm:h-5" />
              <span>Cashout €{cashoutAmount.toFixed(2)}</span>
            </motion.button>
          ) : status === 'won' ? (
            <motion.div
              className="w-full bg-gradient-to-r from-green-500/30 to-emerald-600/30 border-2 border-green-400/60 text-green-300 font-black py-3 sm:py-3.5 rounded-xl text-center text-base sm:text-lg shadow-lg backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              + €{potentialWin.toFixed(2)}
            </motion.div>
          ) : status === 'lost' ? (
            <motion.div
              className="w-full bg-gradient-to-r from-red-500/30 to-rose-600/30 border-2 border-red-400/60 text-red-300 font-black py-3 sm:py-3.5 rounded-xl text-center text-base sm:text-lg shadow-lg backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              - €{stake.toFixed(2)}
            </motion.div>
          ) : status === 'cashedOut' && cashoutAmount ? (
            <motion.div
              className="w-full bg-gradient-to-r from-blue-500/30 to-cyan-600/30 border-2 border-blue-400/60 text-blue-300 font-black py-3 sm:py-3.5 rounded-xl text-center text-base sm:text-lg shadow-lg backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              Cashed €{cashoutAmount.toFixed(2)}
            </motion.div>
          ) : null}

          {/* Bet ID */}
          {betId && (
            <motion.div
              className="text-center text-[9px] sm:text-[10px] text-gray-600 pt-1 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
            >
              ID: {betId}
            </motion.div>
          )}
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${statusStyles.accentGlow} opacity-50`}
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
