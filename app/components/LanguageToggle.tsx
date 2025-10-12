'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'sr' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-bg-alt)] transition-all duration-300 hover:scale-105"
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-semibold uppercase">{locale}</span>
    </button>
  );
}
