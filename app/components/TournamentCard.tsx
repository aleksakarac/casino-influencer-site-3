'use client';

import { Trophy, Clock, Shield } from 'lucide-react';
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
  tier?: string; // New optional field for badge like "Platinum"
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
  tier = 'Platinum',
}: TournamentCardProps) {
  const t = useTranslations('Tournaments');
  const { days, hours, minutes, seconds, isExpired, isMounted } = useCountdown(endDate);

  const handleJoin = () => {
    window.open(joinLink, '_blank');
  };

  return (
    <div className="group">
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-amber-500/40 backdrop-blur-sm overflow-hidden relative rounded-2xl hover:border-amber-400/70 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300">
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image section */}
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              {/* Prize pool badge - top left */}
              <div className="absolute top-6 left-6">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black px-4 py-2 shadow-xl rounded-lg flex items-center gap-2 text-sm">
                  <Trophy size={18} strokeWidth={3} />
                  {prizePool}
                </div>
              </div>

              {/* Tier badge - top right */}
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold px-4 py-2 shadow-xl rounded-lg flex items-center gap-2 text-sm">
                  <Shield size={18} strokeWidth={2.5} />
                  {tier}
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-gray-800/60 to-gray-900/80">
              <div>
                {/* Title */}
                <div className="mb-8">
                  <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                    {name}
                  </h3>
                </div>

                {/* Countdown timer */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={20} className="text-amber-400" />
                    <span className="text-base text-gray-300 font-medium">{t('endsIn')}:</span>
                  </div>
                  {!isMounted ? (
                    <div className="grid grid-cols-4 gap-3">
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="text-center">
                          <div className="bg-gradient-to-b from-slate-700/80 to-slate-800/80 rounded-xl p-4 border border-slate-600/40 shadow-lg">
                            <div className="text-3xl font-bold text-amber-400">
                              00
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2 uppercase tracking-wide">...</div>
                        </div>
                      ))}
                    </div>
                  ) : isExpired ? (
                    <div className="text-center py-4 bg-black/40 rounded-xl">
                      <span className="text-red-500 font-bold text-base">{t('ended')}</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: t('days'), value: days },
                        { label: t('hours'), value: hours },
                        { label: t('minutes'), value: minutes },
                        { label: t('seconds'), value: seconds }
                      ].map((time, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-gradient-to-b from-slate-700/80 to-slate-800/80 rounded-xl p-4 border border-slate-600/40 shadow-lg">
                            <div className="text-3xl font-bold text-amber-400">
                              {String(time.value).padStart(2, '0')}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-2 uppercase tracking-wide font-medium">{time.label}</div>
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
                className={`w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 hover:shadow-xl hover:shadow-amber-500/40 text-black font-black py-4 text-base transition-all duration-300 group-hover:scale-[1.02] rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide ${
                  isExpired ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Trophy size={20} strokeWidth={3} />
                {isExpired ? t('ended') : t('joinTournament')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
