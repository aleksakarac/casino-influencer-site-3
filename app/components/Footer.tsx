'use client';

import { useTranslations } from 'next-intl';
import { Play, Instagram } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');

  const socialLinks = [
    {
      name: t('kick'),
      icon: <Play className="w-5 h-5" />,
      url: 'https://kick.com/placeholder',
      color: 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600',
    },
    {
      name: t('instagram'),
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://instagram.com/placeholder',
      color: 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600',
    },
    {
      name: t('discord'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      url: 'https://discord.gg/placeholder',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-transparent to-black/40 border-t border-white/10 mt-24 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Join Community Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--primary-orange)] mb-3">
            {t('joinCommunity')}
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            {t('communitySubtitle')}
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 min-w-[180px] justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              {social.icon}
              {social.name}
            </a>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-orange)] to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎰</span>
              </div>
              <span className="font-bold text-[var(--primary-orange)]">Aca Jankovic</span>
              <span className="text-[var(--text-tertiary)] text-sm">{t('copyright')}</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
              <a href="#" className="hover:text-[var(--primary-orange)] transition-colors">
                {t('privacy')}
              </a>
              <span className="text-[var(--text-tertiary)]">|</span>
              <a href="#" className="hover:text-[var(--primary-orange)] transition-colors">
                {t('terms')}
              </a>
              <span className="text-[var(--text-tertiary)]">|</span>
              <a href="#" className="hover:text-[var(--primary-orange)] transition-colors">
                {t('support')}
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center mt-6">
            <p className="text-xs text-[var(--text-tertiary)]">{t('disclaimer')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
