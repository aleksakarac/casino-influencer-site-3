'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const middleBarLinks = [
  { icon: '🎮', labelKey: 'link1', url: '#' },
  { icon: '🏆', labelKey: 'link2', url: '#' },
  { icon: '🎁', labelKey: 'link3', url: '#' }
];

export default function MiddleBar() {
  const t = useTranslations('middleBar');

  return (
    <section className="py-4 px-4 max-h-[80px] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-center gap-6">
          {middleBarLinks.map((link, index) => (
            <motion.a
              key={link.labelKey}
              href={link.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 w-[230px] h-[50px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-base font-semibold text-amber-400">
                {t(link.labelKey)}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
