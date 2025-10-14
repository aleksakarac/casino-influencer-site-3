'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import TournamentCard from './TournamentCard';

// Placeholder tournament data - will be replaced with Sanity CMS
const PLACEHOLDER_TOURNAMENTS = [
  {
    id: '1',
    name: { en: 'Championship Series 2024', sr: 'Šampionat Serija 2024' },
    description: {
      en: 'The ultimate poker tournament with massive prizes and glory',
      sr: 'Vrhunski poker turnir sa ogromnim nagradama i slavom',
    },
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&h=600&fit=crop',
    prizePool: '$50,000',
    players: 1247,
    buyIn: '$100',
    winnerPrize: '$15,000',
    tableType: { en: 'Multi-table', sr: 'Više stolova' },
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    joinLink: 'https://example.com/tournament/1',
    tier: 'Platinum',
    isActive: true,
  },
  {
    id: '2',
    name: { en: 'Weekend Showdown', sr: 'Vikend Obračun' },
    description: {
      en: 'Fast-paced weekend tournament with instant rewards',
      sr: 'Brzi vikend turnir sa trenutnim nagradama',
    },
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&h=600&fit=crop',
    prizePool: '$10,000',
    players: 456,
    buyIn: '$25',
    winnerPrize: '$3,000',
    tableType: { en: 'Single-table', sr: 'Jedan sto' },
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    joinLink: 'https://example.com/tournament/2',
    tier: 'Gold',
    isActive: true,
  },
];

export default function TournamentGrid() {
  const t = useTranslations('Tournaments');
  const locale = useLocale() as 'en' | 'sr';

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
          {PLACEHOLDER_TOURNAMENTS.map((tournament, index) => (
            <TournamentCard
              key={tournament.id}
              name={tournament.name[locale]}
              description={tournament.description[locale]}
              image={tournament.image}
              prizePool={tournament.prizePool}
              players={tournament.players}
              buyIn={tournament.buyIn}
              winnerPrize={tournament.winnerPrize}
              tableType={tournament.tableType[locale]}
              endDate={tournament.endDate}
              joinLink={tournament.joinLink}
              tier={tournament.tier}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
