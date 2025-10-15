'use client';

import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Sparkles, Zap } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLogoClick = () => {
    if (pathname === `/${locale}` || pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(`/${locale}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative h-20 sticky top-0 z-50"
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 backdrop-blur-xl border-b border-white/10">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-pink-600/20 animate-pulse" />

        {/* Floating Particles */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-4 left-1/4 w-2 h-2 bg-purple-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-6 right-1/3 w-3 h-3 bg-pink-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-2 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-sm"
        />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo & Brand */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={handleLogoClick}
        >
          {/* Fancy Logo Container with 3D effect */}
          <motion.div
            animate={{
              rotateY: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-300" />

              {/* Logo Image */}
              <img
                src="/logoaca.png"
                alt="Aca Jankovic Logo"
                className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('span')) {
                    const fallback = document.createElement('span');
                    fallback.className = 'text-3xl relative z-10';
                    fallback.textContent = '🎰';
                    parent.appendChild(fallback);
                  }
                }}
              />

              {/* Sparkle Icon Overlay */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1 right-1 z-20"
              >
                <Sparkles size={12} className="text-yellow-300 drop-shadow-lg" />
              </motion.div>
            </div>

            {/* Floating Ring */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-2xl border-2 border-purple-400/50 -z-10"
            />
          </motion.div>

          {/* Brand Text with Gradient */}
          <div className="flex flex-col">
            <motion.h1
              className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent relative"
              style={{
                backgroundSize: '200% auto',
              }}
              animate={{
                backgroundPosition: ['0% center', '200% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Aca Jankovic

              {/* Lightning Bolt Accent */}
              <motion.span
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="inline-block ml-1"
              >
                <Zap size={16} className="text-yellow-400 inline" />
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-purple-300 font-semibold tracking-wider"
            >
              PREMIUM EXPERIENCE
            </motion.p>
          </div>
        </motion.div>

        {/* Language Toggle with Fancy Wrapper */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="relative"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-1 border border-white/10 shadow-2xl">
            <LanguageToggle />
          </div>

          {/* Glow Ring */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 blur-lg -z-10"
          />
        </motion.div>
      </div>

      {/* Bottom Animated Border */}
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />

      {/* Static Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
    </motion.nav>
  );
}
