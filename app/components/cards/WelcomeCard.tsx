'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Gift, Sparkles, Crown, Zap } from 'lucide-react';
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
    setCopying(true);
    haptics.success();

    try {
      await navigator.clipboard.writeText(card.bonusCode);
      toast.success('Kod kopiran!', {
        description: `${card.bonusCode} je kopiran u clipboard`,
      });
    } catch (err) {
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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        z: 50,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full max-w-[200px] mx-auto group perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Card Container */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden border-2 shadow-2xl"
        style={{
          borderColor,
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(168, 85, 247, 0.9) 50%, rgba(192, 132, 252, 0.8) 100%)',
        }}
      >
        {/* Animated Gradient Overlay */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)',
              'linear-gradient(135deg, rgba(236, 72, 153, 0.4) 0%, rgba(250, 204, 21, 0.4) 100%)',
              'linear-gradient(135deg, rgba(250, 204, 21, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)',
              'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />

        {/* Glass morphism layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/60 backdrop-blur-[2px]" />

        {/* Floating Sparkles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute"
                >
                  <Sparkles size={10} className="text-yellow-300 fill-yellow-300" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Animated Border Glow */}
        <motion.div
          animate={isHovered ? {
            opacity: [0.5, 1, 0.5],
          } : { opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: `0 0 30px ${borderColor}, inset 0 0 30px ${borderColor}`,
          }}
        />

        {/* Crown Icon Badge */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-2 left-2 bg-gradient-to-br from-yellow-400 to-amber-600 p-2 rounded-xl shadow-xl backdrop-blur-sm border border-white/20 z-20"
        >
          <Crown size={14} className="text-white" />
        </motion.div>

        {/* Welcome Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 right-2 px-2 py-1 text-[9px] font-black uppercase rounded-full border-2 bg-black/50 backdrop-blur-md shadow-xl z-20"
          style={{
            borderColor: '#fbbf24',
            color: '#fbbf24',
          }}
        >
          VIP
        </motion.div>

        {/* Content Section */}
        <div className="absolute inset-0 flex flex-col justify-start p-3">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center mb-2 mt-8"
          >
            <h3 className="text-sm font-black text-transparent bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text leading-tight drop-shadow-lg">
              Welcome Package
            </h3>
          </motion.div>

          {/* Benefits Section */}
          <div className="hidden min-[370px]:flex min-[370px]:flex-col min-[370px]:items-start min-[370px]:justify-center w-full space-y-1.5 flex-1 relative z-10">
            {card.benefits && card.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white text-left flex items-center text-[11px] min-[460px]:text-xs font-bold drop-shadow-md"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-green-400 mr-2"
                >
                  ✓
                </motion.span>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="w-full flex flex-col items-center gap-1.5 mt-auto pb-1 relative z-10">
            {/* Code Box */}
            <motion.button
              onClick={copyCode}
              disabled={copying}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full max-[400px]:w-[80%] min-[768px]:w-[90%]"
            >
              {/* Animated Border */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(90deg, rgba(168, 85, 247, 0.5), rgba(250, 204, 21, 0.5))',
                    'linear-gradient(90deg, rgba(250, 204, 21, 0.5), rgba(168, 85, 247, 0.5))',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -inset-[1px] rounded-xl blur-sm"
              />

              <div className="relative bg-purple-900/80 hover:bg-purple-800/90 backdrop-blur-md rounded-xl px-2.5 py-1.5 flex items-center justify-between border border-purple-500/30 transition-all duration-200">
                <div className="flex items-center gap-1">
                  <span className="text-purple-200 text-[11px] font-bold max-[400px]:hidden">
                    {locale === 'sr' ? 'Koristi Kod' : 'Use Code'}
                  </span>
                  <span className="text-purple-200 text-[11px] font-bold hidden max-[400px]:inline">
                    {locale === 'sr' ? 'Kod' : 'Code'}
                  </span>
                  <span className="font-extrabold text-white font-mono text-xs tracking-wider">
                    {card.bonusCode}
                  </span>
                </div>
                <motion.div
                  animate={copying ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  className="text-gray-300"
                >
                  {copying ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </motion.div>
              </div>
            </motion.button>

            {/* Claim Button */}
            <motion.div
              className="relative w-full max-[400px]:w-[80%] min-[768px]:w-[90%]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-[2px] bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-xl blur-md"
              />

              <a
                href={vavadaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative flex items-center justify-center w-full min-h-[30px] max-[400px]:min-h-[28px] bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white text-xs font-black rounded-xl transition-all duration-300 shadow-xl gap-1.5"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Zap size={12} className="fill-white" />
                </motion.div>
                CLAIM NOW
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Outer Glow Ring */}
      <motion.div
        animate={isHovered ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        } : { opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-2xl -z-10 blur-xl"
        style={{
          background: `radial-gradient(circle, ${borderColor} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
