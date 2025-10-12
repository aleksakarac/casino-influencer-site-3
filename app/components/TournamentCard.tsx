'use client';

import { Users, DollarSign, Trophy, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCountdown } from '../hooks/useCountdown';

interface TournamentCardProps {
  name: string;
  description: string;
  image: string;
  prizePool: string;
  players: number;
  buyIn: string;
  winnerPrize: string;
  tableType: string;
  endDate: string;
  joinLink: string;
}

export default function TournamentCard({
  name,
  description,
  image,
  prizePool,
  players,
  buyIn,
  winnerPrize,
  tableType,
  endDate,
  joinLink,
}: TournamentCardProps) {
  const t = useTranslations('Tournaments');
  const { days, hours, minutes, seconds, isExpired, isMounted } = useCountdown(endDate);

  const handleJoin = () => {
    window.open(joinLink, '_blank');
  };

  return (
    <div className="group">
      <div className="bg-gradient-to-b from-gray-800/90 to-black/90 border border-amber-500/30 backdrop-blur-sm overflow-hidden relative rounded-xl hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300">
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image section */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

              {/* Prize pool badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold px-3 py-1 shadow-lg rounded">
                  {prizePool}
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="p-0 mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors duration-300">
                    {name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {description}
                  </p>
                </div>

                {/* Tournament stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-amber-400" />
                    <span className="text-sm text-gray-300">{players.toLocaleString()} {t('players')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy size={16} className="text-amber-400" />
                    <span className="text-sm text-gray-300">{t('buyIn')}: {buyIn}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-amber-400" />
                    <span className="text-sm text-gray-300">{t('winner')}: {winnerPrize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-amber-400" />
                    <span className="text-sm text-gray-300">{tableType}</span>
                  </div>
                </div>

                {/* Countdown timer */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock size={16} className="text-amber-400" />
                    <span className="text-sm text-gray-300">{t('endsIn')}:</span>
                  </div>
                  {!isMounted ? (
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="text-center">
                          <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-2 border border-amber-500/20 shadow-lg">
                            <div className="text-lg font-bold text-amber-400">
                              00
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">...</div>
                        </div>
                      ))}
                    </div>
                  ) : isExpired ? (
                    <div className="text-center py-3 bg-black/40 rounded-lg">
                      <span className="text-red-500 font-bold text-sm">{t('ended')}</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: t('days'), value: days },
                        { label: t('hours'), value: hours },
                        { label: t('minutes'), value: minutes },
                        { label: t('seconds'), value: seconds }
                      ].map((time, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-2 border border-amber-500/20 shadow-lg">
                            <div className="text-lg font-bold text-amber-400">
                              {String(time.value).padStart(2, '0')}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{time.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={handleJoin}
                disabled={isExpired}
                className={`w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:shadow-lg hover:shadow-amber-400/25 text-black font-bold py-3 transition-all duration-300 group-hover:scale-105 rounded-lg ${
                  isExpired ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isExpired ? t('ended') : t('joinTournament')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
