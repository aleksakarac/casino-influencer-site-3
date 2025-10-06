'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tournament } from '@/types';

interface TournamentCardsProps {
  tournaments: Tournament[];
  locale: string;
}

function TournamentCountdown({ endDate }: { endDate: string }) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const t = useTranslations('tournament');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeRemaining(t('ended'));
        setIsExpired(true);
        setIsUrgent(false);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Check if less than 1 hour (urgent)
      if (distance < 3600000) {
        setIsUrgent(true);
      }

      // Format based on time remaining
      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [endDate, t]);

  return (
    <div className="text-center">
      <p className="text-gray-400 text-sm mb-2">{t('timeRemaining')}</p>
      <div
        className={`text-3xl font-bold ${
          isExpired
            ? 'text-gray-500'
            : isUrgent
            ? 'text-red-500 animate-pulse'
            : 'text-amber-400'
        }`}
      >
        {timeRemaining}
      </div>
    </div>
  );
}

export default function TournamentCards({ tournaments, locale }: TournamentCardsProps) {
  const t = useTranslations('tournament');

  if (!tournaments || tournaments.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🏆</div>
            <p className="text-gray-400 text-xl">{t('noTournaments')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {tournaments.map((tournament, index) => {
          const isExpired = new Date(tournament.endDate).getTime() < new Date().getTime();

          return (
            <motion.div
              key={tournament._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl border border-amber-500/30 p-6 overflow-hidden"
            >
              <div className="flex gap-6">
                {/* Image - 40% width */}
                <div className="relative w-2/5 flex-shrink-0">
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    {tournament.imageUrl ? (
                      <Image
                        src={tournament.imageUrl}
                        alt={tournament.name[locale as 'en' | 'sr']}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                        <span className="text-6xl">🎰</span>
                      </div>
                    )}
                  </div>

                  {/* Prize Pool Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg">
                    <p className="text-white font-bold text-sm">{tournament.prizePool}</p>
                  </div>
                </div>

                {/* Content - 60% width */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Title & Description */}
                  <div>
                    <h2 className="text-3xl font-bold text-amber-400 mb-3">
                      {tournament.name[locale as 'en' | 'sr']}
                    </h2>
                    <p className="text-gray-300 text-base line-clamp-3 mb-6">
                      {tournament.description[locale as 'en' | 'sr']}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👥</span>
                      <div>
                        <p className="text-gray-400 text-xs">{t('players')}</p>
                        <p className="text-white font-semibold">{tournament.stats.players}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <p className="text-gray-400 text-xs">{t('buyIn')}</p>
                        <p className="text-white font-semibold">{tournament.stats.buyIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <p className="text-gray-400 text-xs">{t('winner')}</p>
                        <p className="text-white font-semibold">{tournament.stats.winnerPrize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🃏</span>
                      <div>
                        <p className="text-gray-400 text-xs">{t('tableType')}</p>
                        <p className="text-white font-semibold">
                          {tournament.stats.tableType[locale as 'en' | 'sr']}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  <div className="mb-4">
                    <TournamentCountdown endDate={tournament.endDate} />
                  </div>

                  {/* Join Button */}
                  <motion.a
                    href={tournament.joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: isExpired ? 1 : 1.05 }}
                    whileTap={{ scale: isExpired ? 1 : 0.95 }}
                    className={`block text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isExpired
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500 shadow-lg hover:shadow-amber-500/50'
                    }`}
                    onClick={(e) => {
                      if (isExpired) e.preventDefault();
                    }}
                  >
                    {isExpired ? t('ended') : t('join')}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
