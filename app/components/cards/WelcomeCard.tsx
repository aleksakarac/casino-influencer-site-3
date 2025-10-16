'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Copy, Check, Sparkles, PartyPopper } from 'lucide-react';
import { useLocale } from 'next-intl';
import { haptics } from '@/app/utils/haptics';

interface WelcomeCardProps {
  card: {
    _id: string;
    backgroundImage: string;
    bonusCode: string;
    benefits: string[];
  };
  borderColor: string;
  vavadaLink: string;
}

export function WelcomeCard({ card, borderColor, vavadaLink }: WelcomeCardProps) {
  const [copying, setCopying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const locale = useLocale() as 'en' | 'sr';

  const copyCode = async (e: React.MouseEvent) => {
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
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

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

        {/* Sparkle Icon Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute top-3 left-3 z-10 bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg shadow-lg"
        >
          <PartyPopper size={14} className="text-white" />
        </motion.div>

        {/* Welcome Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full glass-elevated border-2 border-purple-400/50 shadow-lg"
        >
          <span className="text-[9px] font-bold uppercase tracking-wide text-purple-300">
            VIP
          </span>
        </motion.div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col p-3">
          {/* Title */}
          <div className="relative text-center mb-2">
            <h3 className="text-white text-sm sm:text-base font-bold leading-tight gradient-text gradient-text-animated">
              Welcome Package
            </h3>
          </div>

          {/* Benefits - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-1.5 mb-3">
            {card.benefits && card.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-1.5"
              >
                <div className="w-1 h-1 rounded-full bg-purple-400" />
                <span className="text-slate-200 text-[10px] sm:text-[11px] font-semibold">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Code Box */}
          <div className="relative mb-2">
            <div className="glass-elevated rounded-lg px-2 sm:px-2.5 py-2 flex items-center justify-between gap-2 border border-purple-500/20">
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1">
                <span className="text-purple-300 text-[9px] font-semibold flex-shrink-0">
                  {locale === 'sr' ? 'Kod' : 'Code'}:
                </span>
                <span className="text-white font-mono text-[10px] sm:text-xs font-bold tracking-tight truncate">
                  {card.bonusCode}
                </span>
              </div>
              <motion.button
                onClick={copyCode}
                disabled={copying}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-md glass hover:bg-purple-500/20 transition-colors"
                aria-label="Copy code"
              >
                {copying ? (
                  <Check size={10} className="text-purple-400" />
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
              className="absolute -inset-[2px] bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg blur-sm"
            />

            <motion.a
              href={vavadaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center justify-center w-full min-h-[32px] bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white text-[11px] sm:text-sm font-bold rounded-lg transition-all duration-300 shadow-lg gap-1.5"
            >
              <Sparkles size={12} />
              <span className="tracking-wide">CLAIM NOW</span>
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
}
