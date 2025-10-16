'use client';

import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Copy, Check, Gift, Sparkles } from 'lucide-react';
import { haptics } from '@/app/utils/haptics';

interface BonusCardProps {
  card: {
    _id: string;
    title: string;
    backgroundImage: string;
    tag?: {
      name: string;
      color: string;
      textColor: string;
    };
    activationsCount: number;
    bonusCode: string;
  };
  borderColor: string;
  vavadaLink: string;
}

export const BonusCard = memo(function BonusCard({ card, borderColor, vavadaLink }: BonusCardProps) {
  const [copying, setCopying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyCode = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    haptics.light();
    setCopying(true);

    try {
      await navigator.clipboard.writeText(card.bonusCode);
      toast.success('Kod kopiran!', {
        description: `${card.bonusCode} je kopiran u clipboard`,
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = card.bonusCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Kod kopiran!');
    }

    setTimeout(() => setCopying(false), 2000);
  }, [card.bonusCode]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[200px] mx-auto h-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="relative aspect-square rounded-2xl overflow-hidden glass-elevated shadow-lg transition-all duration-300 hover:shadow-2xl"
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
          style={{ backgroundImage: `url(${card.backgroundImage})` }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-600/20" />

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

        {/* Gift Icon Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute top-3 left-3 z-10 bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg shadow-lg"
        >
          <Gift size={14} className="text-white" />
        </motion.div>

        {/* Tag */}
        {card.tag && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full glass-elevated border-2 shadow-lg"
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

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-3">
          {/* Title & Stats */}
          <div className="relative mb-3 text-center px-1">
            <h3 className="text-white text-sm sm:text-base font-bold mb-1 leading-tight line-clamp-2">
              {card.title}
            </h3>
            <div className="flex items-center justify-center gap-1.5">
              <Sparkles size={10} className="text-green-400" />
              <p className="text-[9px] sm:text-[10px] font-semibold text-green-400">
                {card.activationsCount} Activations
              </p>
            </div>
          </div>

          {/* Code Box */}
          <div className="relative mb-2">
            <div className="glass-elevated rounded-lg px-2.5 py-2 flex items-center justify-between border border-green-500/20">
              <span className="text-white font-mono text-[10px] sm:text-xs font-bold tracking-tight">
                {card.bonusCode}
              </span>
              <motion.button
                onClick={copyCode}
                disabled={copying}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-md glass hover:bg-green-500/20 transition-colors"
                aria-label="Copy code"
              >
                {copying ? (
                  <Check size={10} className="text-green-400" />
                ) : (
                  <Copy size={10} className="text-slate-300" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Claim Button */}
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
              className="absolute -inset-[2px] bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur-sm"
            />

            <motion.a
              href={vavadaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center justify-center w-full min-h-[32px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-[11px] sm:text-sm font-bold rounded-lg transition-all duration-300 shadow-lg gap-1.5"
            >
              <Gift size={12} />
              <span className="tracking-wide">CLAIM BONUS</span>
            </motion.a>
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
      </motion.div>
    </motion.div>
  );
});
