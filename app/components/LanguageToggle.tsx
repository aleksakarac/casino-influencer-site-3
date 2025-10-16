'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
      aria-label="Toggle language"
    >
      {/* Glass Container */}
      <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl glass-elevated shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
        {/* Background Shimmer */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear"
          }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />

        {/* Globe Icon */}
        <div className="relative z-10 text-slate-300 group-hover:text-gold-400 transition-colors duration-300">
          <Globe className="w-5 h-5" strokeWidth={2} />
        </div>

        {/* Language Text */}
        <span className="relative z-10 text-sm font-semibold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors duration-300">
          {locale}
        </span>

        {/* Hover Border Glow */}
        <div className="absolute inset-0 rounded-xl border border-gold-500/0 group-hover:border-gold-500/30 transition-all duration-300" />
      </div>
    </motion.button>
  );
}
