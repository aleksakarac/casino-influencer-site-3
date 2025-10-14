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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">{t('error')}</h1>
          <p className="text-gray-400">{t('errorMessage')}</p>
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
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={40} className="text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-gray-400 text-lg">{subtitle}</p>
          )}
        </motion.div>

        {/* How to Win Prizes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
        >
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
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
            {t('exclusivePrizesTitle')}
          </h3>
          <p className="text-gray-400 text-sm md:text-base">
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
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">{t('noEntries')}</p>
          </div>
        )}

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">{t('wantToSeeYourName')}</p>
          <a
            href="https://kick.com/acajankovic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
          >
            {t('watchButton')}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
