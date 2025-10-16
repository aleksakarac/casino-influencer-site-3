'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { client } from '@/app/lib/sanity';
import { leaderboardQuery } from '@/app/lib/sanity/queries';
import { PrizeCard } from '@/app/components/cards/PrizeCard';
import { LeaderboardEntry } from '@/app/components/LeaderboardEntry';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export const dynamic = 'force-dynamic';

interface Prize {
  _id: string;
  prizeNumber: number;
  prizeImage: string;
  prizeTitle: { en: string; sr: string };
  prizeDescription?: { en: string; sr: string };
  order: number;
}

interface LeaderboardEntryData {
  _id: string;
  viewerName: string;
  points: number | null;
}

interface LeaderboardSettings {
  title: { en: string; sr: string };
  subtitle?: { en: string; sr: string };
  isActive: boolean;
}

interface LeaderboardData {
  prizes: Prize[];
  entries: LeaderboardEntryData[];
  settings: LeaderboardSettings | null;
}

export default function LeaderboardPage() {
  const t = useTranslations('Leaderboard');
  const locale = useLocale() as 'en' | 'sr';
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(leaderboardQuery);
        setData(result);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center glass-elevated p-8 rounded-2xl max-w-md">
          <h1 className="text-3xl font-bold text-red-400 mb-3">{t('error')}</h1>
          <p className="text-slate-300">{t('errorMessage')}</p>
        </div>
      </div>
    );
  }

  const title = data.settings?.title?.[locale] || t('defaultTitle');
  const subtitle = data.settings?.subtitle?.[locale] || t('defaultSubtitle');

  return (
    <div className="pt-8 pb-12">
      <div className="max-w-[57.6rem] mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Trophy size={40} className="text-gold-400 drop-shadow-lg" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text gradient-text-animated">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-slate-400 text-base md:text-lg">{subtitle}</p>
          )}
        </motion.div>

        {/* How to Win Prizes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 glass-elevated border border-gold-500/20 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden"
        >
          {/* Accent glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-purple-500/5" />

          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t('howToWinTitle')}
            </h2>
            <div className="max-w-2xl mx-auto space-y-3 text-gray-300">
              <p className="text-base md:text-lg">
                {t('howToWinText1')} <span className="text-amber-400 font-bold">{t('howToWinText1Bold')}</span> {t('howToWinText1Rest')}{' '}
                <span className="text-green-400 font-bold">{t('howToWinText1Kick')}</span> {t('howToWinText1End')}
              </p>
              <p className="text-base md:text-lg">
                {t('howToWinText2')} <span className="text-amber-400 font-bold">{t('howToWinText2Bold')}</span> {t('howToWinText2Rest')}
              </p>
              <p className="text-sm md:text-base text-gray-400">
                {t('howToWinText3')}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="https://kick.com/acajankovic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
            >
              <Trophy size={20} />
              {t('watchButton')}
            </a>
          </div>
        </motion.div>

        {/* Exclusive Prizes Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-center mb-6"
        >
          <h3 className="text-xl md:text-2xl font-bold gradient-text gradient-text-animated mb-2">
            {t('exclusivePrizesTitle')}
          </h3>
          <p className="text-slate-400 text-sm md:text-base">
            {t('exclusivePrizesSubtitle')}
          </p>
        </motion.div>

        {/* Prize Cards Grid */}
        {data.prizes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {data.prizes.map((prize, index) => (
              <PrizeCard
                key={prize._id}
                prizeNumber={prize.prizeNumber}
                prizeImage={prize.prizeImage}
                prizeTitle={prize.prizeTitle[locale]}
                index={index}
                locale={locale}
              />
            ))}
          </motion.div>
        )}

        {/* Leaderboard Entries */}
        {data.entries.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 md:space-y-3"
          >
            {data.entries.map((entry, index) => (
              <LeaderboardEntry
                key={entry._id}
                rank={index + 1}
                name={entry.viewerName}
                points={entry.points}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 glass-elevated rounded-2xl p-8">
            <p className="text-slate-400 text-lg">{t('noEntries')}</p>
          </div>
        )}

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 glass-elevated rounded-2xl p-8"
        >
          <p className="text-slate-300 mb-4 text-lg">{t('wantToSeeYourName')}</p>
          <div className="relative inline-block">
            {/* Glow Effect */}
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-[2px] bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur-sm"
            />
            <motion.a
              href="https://kick.com/acajankovic"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg"
            >
              <Trophy size={20} />
              {t('watchButton')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
