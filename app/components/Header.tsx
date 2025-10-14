'use client';

import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLogoClick = () => {
    // If on the landing page, scroll to top
    if (pathname === `/${locale}` || pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Otherwise, navigate to landing page
      router.push(`/${locale}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="relative h-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-amber-500/30 backdrop-blur-sm sticky top-0 z-50"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 opacity-20" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo & Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
            <img
              src="/logoaca.png"
              alt="Aca Jankovic Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('span')) {
                  const fallback = document.createElement('span');
                  fallback.className = 'text-xl';
                  fallback.textContent = '🎰';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Aca Jankovic
          </h1>
        </motion.div>

        {/* Language Toggle */}
        <LanguageToggle />
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />
    </motion.nav>
  );
}
