'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Gift, Sparkles, Star, Zap } from 'lucide-react';
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

export function BonusCard({ card, borderColor, vavadaLink }: BonusCardProps) {
  const [copying, setCopying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
          background: `url(${card.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Animated Gradient Overlay */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
              'linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
              'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)',
              'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />

        {/* Glass morphism layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 backdrop-blur-[2px]" />

        {/* Floating Sparkles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
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
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute"
                >
                  <Sparkles size={12} className="text-yellow-300 fill-yellow-300" />
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

        {/* Top Icons */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-20">
          {/* Gift Icon */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-xl shadow-xl backdrop-blur-sm border border-white/20"
          >
            <Gift size={14} className="text-white" />
          </motion.div>

          {/* Tag */}
          {card.tag && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-2 py-1 text-[10px] font-black uppercase rounded-full border-2 bg-black/50 backdrop-blur-md shadow-xl"
              style={{
                borderColor: card.tag.color,
                color: card.tag.color,
              }}
            >
              {card.tag.name}
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div className="absolute inset-0 flex flex-col justify-end p-3">
          {/* Bottom Gradient */}
          <div className="absolute left-0 right-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-purple-950/80 to-transparent rounded-b-2xl" />

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center mb-2"
          >
            <h3 className="text-sm font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text mb-1 leading-tight">
              {card.title}
            </h3>
            <div className="flex items-center justify-center gap-1">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Star size={10} className="text-yellow-400 fill-yellow-400" />
              </motion.div>
              <p className="text-[10px] font-bold text-gray-300">
                {card.activationsCount} Activations
              </p>
            </div>
          </motion.div>

          {/* Code Box */}
          <motion.button
            onClick={copyCode}
            disabled={copying}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full mb-2 z-10"
          >
            {/* Animated Border */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(90deg, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))',
                  'linear-gradient(90deg, rgba(236, 72, 153, 0.5), rgba(168, 85, 247, 0.5))',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -inset-[1px] rounded-xl blur-sm"
            />

            <div className="relative bg-purple-900/80 hover:bg-purple-800/90 backdrop-blur-md rounded-xl px-2 py-1.5 flex items-center justify-between border border-purple-500/30 transition-all duration-200">
              <span className="text-white font-mono text-[11px] font-extrabold tracking-wider">
                {card.bonusCode}
              </span>
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
            className="relative w-full z-10"
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
              className="absolute -inset-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-xl blur-md"
            />

            <a
              href={vavadaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center w-full py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-[11px] font-black rounded-xl transition-all duration-300 shadow-xl gap-1.5"
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
              CLAIM BONUS
            </a>
          </motion.div>
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
