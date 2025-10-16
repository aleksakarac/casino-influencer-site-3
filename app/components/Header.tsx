'use client';

import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Crown } from 'lucide-react';
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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-20"
    >
      {/* Glass Background */}
      <div className="absolute inset-0 glass">
        {/* Gradient Border Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          onClick={handleLogoClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo Container */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

            {/* Logo */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-gold-500 via-gold-400 to-purple-500 flex items-center justify-center shadow-lg">
              <img
                src="/logoaca.png"
                alt="Aca Jankovic"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.fallback-icon')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-icon';
                    fallback.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>';
                    parent.appendChild(fallback);
                  }
                }}
              />

              {/* Crown Icon Accent */}
              <motion.div
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-1 -right-1 bg-gold-400 rounded-full p-1 shadow-lg"
              >
                <Crown className="w-3 h-3 text-slate-900" fill="currentColor" />
              </motion.div>
            </div>
          </div>

          {/* Brand Text */}
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold gradient-text gradient-text-animated tracking-tight">
              Aca Jankovic
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wider hidden sm:block">
              PREMIUM CASINO
            </p>
          </div>
        </motion.div>

        {/* Language Toggle */}
        <LanguageToggle />
      </div>
    </motion.header>
  );
}
