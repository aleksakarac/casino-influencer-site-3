'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Sparkles } from 'lucide-react';
import { haptics } from '@/app/utils/haptics';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    haptics.light();
    const newLocale = locale === 'en' ? 'sr' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
      aria-label="Toggle language"
    >
      {/* Outer Glow Ring */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-0 group-hover:opacity-100"
      />

      {/* Button Container */}
      <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-purple-900/60 to-pink-900/60 hover:from-purple-800/70 hover:to-pink-800/70 backdrop-blur-md border border-purple-500/30 transition-all duration-300 overflow-hidden shadow-xl">
        {/* Animated Background Shimmer */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Globe Icon with Rotation */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative z-10"
        >
          <Globe className="w-5 h-5 text-purple-300 drop-shadow-lg" />
        </motion.div>

        {/* Language Text */}
        <span className="relative z-10 text-sm font-black uppercase tracking-wider text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text">
          {locale}
        </span>

        {/* Floating Sparkle */}
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1 right-1 z-10"
        >
          <Sparkles size={10} className="text-yellow-300 fill-yellow-300" />
        </motion.div>

        {/* Inner Border Glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-xl border border-purple-400/50"
        />
      </div>
    </motion.button>
  );
}
