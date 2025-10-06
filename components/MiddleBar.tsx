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
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {middleBarLinks.map((link, index) => (
            <motion.a
              key={link.labelKey}
              href={link.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="block p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{link.icon}</div>
                <h3 className="text-xl font-semibold text-amber-400">
                  {t(link.labelKey)}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
