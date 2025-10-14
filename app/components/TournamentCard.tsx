'use client';

import { Trophy, Clock, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCountdown } from '../hooks/useCountdown';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '@/app/lib/sanity';

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
  tier?: string;
  index?: number;
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
  index = 0,
}: TournamentCardProps) {
  const t = useTranslations('Tournaments');
  const { days, hours, minutes, seconds, isExpired, isMounted } = useCountdown(endDate);
  const [vavadaLink, setVavadaLink] = useState<string>('#');

  // Fetch Vavada link from Sanity
  useEffect(() => {
    const fetchVavadaLink = async () => {
      try {
        const settings = await client.fetch(
          `*[_type == "siteSettings"][0]{ vavadaRefLink }`
        );
        if (settings?.vavadaRefLink) {
          setVavadaLink(settings.vavadaRefLink);
        }
      } catch (error) {
        console.error('Error fetching Vavada link:', error);
      }
    };

    fetchVavadaLink();
  }, []);

  const handleJoin = () => {
    window.open(vavadaLink, '_blank', 'noopener,noreferrer');
  };

  // Get status badge gradient based on tier
  const getStatusBadgeClass = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes('beginner') || lower.includes('bronze')) {
      return 'from-orange-600 to-amber-700';
    } else if (lower.includes('silver')) {
      return 'from-gray-400 to-gray-500';
    } else if (lower.includes('gold')) {
      return 'from-yellow-400 to-yellow-600';
    } else if (lower.includes('platinum') || lower.includes('diamond')) {
      return 'from-cyan-400 to-blue-500';
    }
    return 'from-purple-500 to-pink-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full flex flex-col cursor-pointer"
    >
      <div className="relative flex flex-col h-full bg-gradient-to-b from-gray-800/95 to-gray-900/95 border-2 border-amber-500/30 hover:border-amber-400/60 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 backdrop-blur-md overflow-hidden">
        {/* Hover Accent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-yellow-500/30 opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

        {/* Image Section */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-500 hover:scale-110 hover:brightness-110"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Prize Pool Badge - Top Left */}
          <div className="absolute top-3 left-3">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-black px-2.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5">
              <Trophy size={14} strokeWidth={3} />
              <span className="text-xs tracking-wide">{prizePool}</span>
            </div>
          </div>

          {/* Status Badge - Top Right */}
          <div className="absolute top-3 right-3">
            <div className={`bg-gradient-to-r ${getStatusBadgeClass(tier)} text-white font-bold px-2.5 py-1.5 rounded-lg shadow-xl border border-white/20 flex items-center gap-1.5`}>
              <Shield size={14} strokeWidth={2.5} />
              <span className="text-xs">{tier}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-4 sm:p-5">
          {/* Tournament Title */}
          <h3 className="text-base sm:text-lg font-bold text-white hover:text-amber-400 transition-colors duration-300 mb-3 sm:mb-4 line-clamp-2">
            {name}
          </h3>

          {/* Countdown Timer */}
          <div className="mb-4 sm:mb-5 flex-grow">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Clock size={14} className="text-amber-400" />
              <span className="text-xs text-gray-400">{t('endsIn')}:</span>
            </div>

            {!isMounted ? (
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="text-center">
                    <div className="bg-gradient-to-b from-gray-700/80 to-gray-800/80 border border-amber-500/20 rounded-lg p-1.5 sm:p-2 shadow-lg backdrop-blur-sm">
                      <div className="text-base sm:text-lg font-black text-amber-400">00</div>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-gray-500 mt-1 uppercase tracking-wider">...</div>
                  </div>
                ))}
              </div>
            ) : isExpired ? (
              <div className="text-center py-3 bg-red-900/30 rounded-lg border border-red-500/30">
                <span className="text-red-400 font-bold text-sm">{t('ended')}</span>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hrs', value: hours },
                  { label: 'Min', value: minutes },
                  { label: 'Sec', value: seconds }
                ].map((time, idx) => (
                  <div key={idx} className="text-center">
                    <div className="bg-gradient-to-b from-gray-700/80 to-gray-800/80 border border-amber-500/20 rounded-lg p-1.5 sm:p-2 shadow-lg backdrop-blur-sm">
                      <motion.div
                        key={time.value}
                        initial={{ scale: 1.2, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-base sm:text-lg font-black text-amber-400"
                      >
                        {String(time.value).padStart(2, '0')}
                      </motion.div>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{time.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Join Button */}
          <button
            onClick={handleJoin}
            disabled={isExpired}
            className={`w-full px-4 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
              isExpired ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Trophy size={16} strokeWidth={3} />
            {isExpired ? t('ended') : 'JOIN NOW'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
