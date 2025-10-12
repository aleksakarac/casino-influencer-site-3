'use client';

import { useTranslations } from 'next-intl';
import GameCard from './GameCard';

// Placeholder game data - Phase 2 will make this CMS-managed
const PLACEHOLDER_GAMES = [
  {
    id: '1',
    name: { en: 'Ultra Slots', sr: 'Ultra Slots' },
    subtitle: { en: 'Premium Slot Games', sr: 'Premium Slot Igre' },
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&h=500&fit=crop',
    players: '2.4k',
    prize: '$125k',
    isHot: true,
  },
  {
    id: '2',
    name: { en: 'Blackjack Pro', sr: 'Blackjack Pro' },
    subtitle: { en: 'Live Table Games', sr: 'Uživo Stol Igre' },
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop',
    players: '856',
    prize: '$42k',
    isHot: false,
  },
  {
    id: '3',
    name: { en: 'Royal Roulette', sr: 'Kraljevski Rulet' },
    subtitle: { en: 'European Roulette', sr: 'Evropski Rulet' },
    image: 'https://images.unsplash.com/photo-1579547945478-a6681fb3c3c9?w=800&h=500&fit=crop',
    players: '1.2k',
    prize: '$89k',
    isHot: true,
  },
  {
    id: '4',
    name: { en: 'Lightning Dice', sr: 'Munja Kockice' },
    subtitle: { en: 'Live Dice Games', sr: 'Uživo Kockice' },
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=500&fit=crop',
    players: '695',
    prize: '$28k',
    isHot: false,
  },
  {
    id: '5',
    name: { en: 'Baccarat Elite', sr: 'Bakara Elita' },
    subtitle: { en: 'High Stakes Baccarat', sr: 'Visoki Ulozi Bakara' },
    image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=800&h=500&fit=crop',
    players: '423',
    prize: '$156k',
    isHot: true,
  },
  {
    id: '6',
    name: { en: 'Video Poker', sr: 'Video Poker' },
    subtitle: { en: 'Jacks or Better', sr: 'Džek ili Bolje' },
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=500&fit=crop',
    players: '1.8k',
    prize: '$73k',
    isHot: false,
  },
];

export default function GameGrid() {
  const t = useTranslations('FeaturedGames');
  const locale = (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en') as 'en' | 'sr';

  return (
    <section className="pt-8 pb-6 bg-gradient-to-b from-gray-900 to-black max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
          {t('title')}
        </h2>
        <p className="text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mb-10">
        {PLACEHOLDER_GAMES.map((game) => (
          <GameCard
            key={game.id}
            name={game.name[locale]}
            subtitle={game.subtitle[locale]}
            image={game.image}
            players={game.players}
            prize={game.prize}
            isHot={game.isHot}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-semibold rounded-xl hover:shadow-[0_10px_15px_-3px_rgba(251,191,36,0.3)] hover:scale-105 transition-all duration-300">
          {t('viewAll')}
        </button>
      </div>
    </section>
  );
}
