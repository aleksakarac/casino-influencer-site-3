'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { client } from '@/app/lib/sanity';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import BetCard from './BetCard';

interface Bet {
  _id: string;
  useImageMode?: boolean;
  cardImage?: {
    url: string;
  };
  matchTitle?: string;
  betType?: { en: string; sr: string };
  selection?: string;
  matchDateTime?: string;
  isBoostedOdds?: boolean;
  originalOdds?: number;
  odds?: number;
  stake?: number;
  potentialWin?: number;
  status?: 'open' | 'won' | 'lost' | 'cashedOut';
  cashoutAmount?: number;
  betId?: string;
  order: number;
}

export default function BettingSection() {
  console.log('BettingSection component rendering');
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations('Betting');

  useEffect(() => {
    console.log('BettingSection useEffect triggered');
    const fetchBets = async () => {
      try {
        console.log('Starting to fetch bets from Sanity...');
        const fetchedBets = await client.fetch(
          `*[_type == "activeBet" && isActive == true] | order(order asc, matchDateTime desc) {
            _id,
            useImageMode,
            "cardImage": cardImage.asset->{url},
            matchTitle,
            betType,
            selection,
            matchDateTime,
            isBoostedOdds,
            originalOdds,
            odds,
            stake,
            potentialWin,
            status,
            cashoutAmount,
            betId,
            order
          }`
        );
        console.log('Fetched bets:', fetchedBets);
        console.log('Bets count:', fetchedBets?.length);
        console.log('Bets array:', JSON.stringify(fetchedBets, null, 2));
        setBets(fetchedBets || []);
      } catch (error) {
        console.error('Error fetching bets:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        setBets([]);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchBets();

    // Optional: Set up real-time updates
    const subscription = client
      .listen('*[_type == "activeBet"]')
      .subscribe(() => {
        fetchBets();
      });

    return () => subscription.unsubscribe();
  }, []);

  // Don't render if no bets
  console.log('BettingSection render check - loading:', loading, 'bets.length:', bets.length);
  if (!loading && bets.length === 0) {
    console.log('BettingSection returning null - no bets to display');
    return null;
  }

  return (
    <section id="betting" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-gray-900/60 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" strokeWidth={2.5} />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600">
              {t('title')}
            </h2>
          </div>
        </motion.div>

        {/* Bets Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="h-[400px] bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-2 border-gray-700/30 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div
            className={`
              grid gap-4 sm:gap-6 justify-items-center
              ${bets.length === 1
                ? 'grid-cols-1 max-w-md mx-auto'
                : bets.length === 2
                ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }
            `}
          >
            {bets.map((bet, index) => (
              <BetCard
                key={bet._id}
                useImageMode={bet.useImageMode}
                cardImageUrl={bet.cardImage?.url}
                matchTitle={bet.matchTitle}
                betType={bet.betType}
                selection={bet.selection}
                matchDateTime={bet.matchDateTime}
                isBoostedOdds={bet.isBoostedOdds}
                originalOdds={bet.originalOdds}
                odds={bet.odds}
                stake={bet.stake}
                potentialWin={bet.potentialWin}
                status={bet.status}
                cashoutAmount={bet.cashoutAmount}
                betId={bet.betId}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
