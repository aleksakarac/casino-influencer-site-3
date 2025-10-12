'use client';

import { useTranslations, useLocale } from 'next-intl';
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
    prizePool: '$50,000 Prize Pool',
    players: 1247,
    buyIn: '$100',
    winnerPrize: '$15,000',
    tableType: { en: 'Multi-table', sr: 'Više stolova' },
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    joinLink: 'https://example.com/tournament/1',
    isActive: true,
  },
];

export default function TournamentGrid() {
  const t = useTranslations('Tournaments');
  const locale = useLocale() as 'en' | 'sr';

  return (
    <section id="tournaments-section" className="pt-6 pb-12 max-w-4xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
          {t('title')}
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">{t('subtitle')}</p>
      </div>

      {/* Tournament Cards */}
      <div className="space-y-6">
        {PLACEHOLDER_TOURNAMENTS.map((tournament) => (
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
          />
        ))}
      </div>
    </section>
  );
}
