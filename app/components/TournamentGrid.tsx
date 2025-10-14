'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import TournamentCard from './TournamentCard';
import { client, urlFor } from '@/app/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface Tournament {
  _id: string;
  name: { en: string; sr: string };
  description?: { en: string; sr: string } | null;
  image: SanityImageSource;
  prizePool: string;
  players: number;
  buyIn: string;
  winnerPrize: string;
  tableType?: { en: string; sr: string } | null;
  endDate: string;
  joinLink: string;
  isActive: boolean;
}

export default function TournamentGrid() {
  const t = useTranslations('Tournaments');
  const locale = useLocale() as 'en' | 'sr';
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await client.fetch<Tournament[]>(
          `*[_type == "tournament" && isActive == true] | order(endDate asc) {
            _id,
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
            isActive
          }`
        );
        setTournaments(data || []);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return (
      <section id="events" className="py-6 md:py-8 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
              {t('title')}
            </h2>
            <p className="text-gray-400">Join the ultimate gaming competitions</p>
          </motion.div>
          <div className="text-center text-gray-400">Loading tournaments...</div>
        </div>
      </section>
    );
  }

  if (tournaments.length === 0) {
    return null; // Don't show the section if there are no tournaments
  }

  return (
    <section
      id="events"
      className="py-6 md:py-8 scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
            {t('title')}
          </h2>
          <p className="text-gray-400">Join the ultimate gaming competitions</p>
        </motion.div>

        {/* Tournament Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {tournaments.map((tournament, index) => {
            const imageUrl = tournament.image
              ? urlFor(tournament.image).width(800).height(600).url()
              : 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&h=600&fit=crop';

            return (
              <TournamentCard
                key={tournament._id}
                name={tournament.name[locale]}
                description={tournament.description?.[locale] || ''}
                image={imageUrl}
                prizePool={tournament.prizePool}
                players={tournament.players}
                buyIn={tournament.buyIn}
                winnerPrize={tournament.winnerPrize}
                tableType={tournament.tableType?.[locale] || ''}
                endDate={tournament.endDate}
                joinLink={tournament.joinLink}
                tier="Platinum"
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
