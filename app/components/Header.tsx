'use client';

import { useTranslations } from 'next-intl';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const t = useTranslations('Header');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label={t('logoAlt')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-orange)] to-yellow-600 rounded-md flex items-center justify-center">
            <span className="text-xl">🎰</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary-orange)] to-yellow-600 bg-clip-text text-transparent">
            Aca Jankovic
          </span>
        </button>

        {/* Language Toggle */}
        <LanguageToggle />
      </div>
    </header>
  );
}
