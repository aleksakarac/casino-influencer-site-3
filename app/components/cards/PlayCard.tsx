'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Play, Zap } from 'lucide-react';
import { haptics } from '@/app/utils/haptics';

interface PlayCardProps {
  card: {
    _id: string;
    title: string;
    gameImage: string;
    tag?: {
      name: string;
      color: string;
      textColor: string;
    };
  };
  borderColor: string;
  vavadaLink: string;
}

export function PlayCard({ card, borderColor, vavadaLink }: PlayCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    haptics.medium();
    window.open(vavadaLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[200px] mx-auto h-full"
    >
      <motion.a
        href={vavadaLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="block relative aspect-square rounded-2xl overflow-hidden glass-elevated shadow-lg transition-all duration-300 hover:shadow-2xl"
        style={{
          boxShadow: isHovered
            ? `0 20px 40px -12px ${borderColor}40, 0 0 0 1px ${borderColor}30`
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Background Image */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${card.gameImage})` }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-600/20" />

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

        {/* Gamepad Icon Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute top-3 right-3 z-10 bg-gradient-to-br from-amber-500 to-yellow-600 p-2 rounded-lg shadow-lg"
        >
          <Gamepad2 size={14} className="text-white" />
        </motion.div>

        {/* Tag */}
        {card.tag && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full glass-elevated border-2 shadow-lg"
            style={{
              borderColor: card.tag.color,
              color: card.tag.color,
            }}
          >
            <span className="text-[9px] font-bold uppercase tracking-wide">
              {card.tag.name}
            </span>
          </motion.div>
        )}

        {/* Play Button Overlay - Center on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-60" />

            {/* Button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-amber-300/50">
              <Play size={24} className="text-slate-900 ml-0.5" fill="currentColor" />
            </div>
          </motion.div>
        </motion.div>

        {/* Play Now Button - Bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-20">
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
              className="absolute -inset-[2px] bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg blur-sm"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center justify-center w-full min-h-[32px] bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-900 text-[11px] sm:text-sm font-bold rounded-lg transition-all duration-300 shadow-lg gap-1.5"
            >
              <Zap size={12} fill="currentColor" />
              <span className="tracking-wide">PLAY NOW</span>
            </motion.button>
          </div>
        </div>

        {/* Border Glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `1px solid ${borderColor}40`
          }}
        />
      </motion.a>
    </motion.div>
  );
}
