'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    // Extract locale from pathname
    const locale = pathname.split('/')[1];
    setCurrentLocale(locale || 'en');
  }, [pathname]);

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'sr' : 'en';

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('casinohub-language', newLocale);
    }

    // Update URL
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const handleLogoClick = () => {
    router.push(`/${currentLocale}`);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 h-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-amber-500/30 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo - Left side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">C</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            CasinoHub
          </h1>
        </motion.div>

        {/* Language Toggle - Top Right */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={toggleLanguage}
          className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/50 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300"
        >
          <motion.span
            key={currentLocale}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-amber-400 font-semibold"
          >
            {t('language')}
          </motion.span>
        </motion.button>
      </div>

      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />
    </motion.header>
  );
}
