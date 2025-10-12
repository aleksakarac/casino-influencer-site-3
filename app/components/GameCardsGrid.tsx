'use client';

import { motion } from 'framer-motion';
import { BonusCard } from './cards/BonusCard';
import { PlayCard } from './cards/PlayCard';
import { WelcomeCard } from './cards/WelcomeCard';

type Card = {
  _id: string;
  cardType: 'bonus' | 'play' | 'welcome';
  order: number;
  [key: string]: any;
};

type CardConfig = {
  bonusBorder?: string;
  playBorder?: string;
  welcomeBorder?: string;
};

interface GameCardsGridProps {
  cards: Card[];
  cardConfig: CardConfig;
  vavadaLink: string;
}

export function GameCardsGrid({ cards, cardConfig, vavadaLink }: GameCardsGridProps) {
  return (
    <section id="games-section" className="pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
            Featured Games
          </h2>
          <p className="text-gray-400">Experience premium casino gaming</p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-6 px-[12.5%]">
          {cards.map((card) => {
            const borderColor =
              card.cardType === 'bonus'
                ? cardConfig.bonusBorder || '#FFA500'
                : card.cardType === 'play'
                ? cardConfig.playBorder || '#00BCD4'
                : cardConfig.welcomeBorder || '#9C27B0';

            switch (card.cardType) {
              case 'bonus':
                return (
                  <BonusCard
                    key={card._id}
                    card={card}
                    borderColor={borderColor}
                    vavadaLink={vavadaLink || '#'}
                  />
                );
              case 'play':
                return (
                  <PlayCard
                    key={card._id}
                    card={card}
                    borderColor={borderColor}
                    vavadaLink={vavadaLink || '#'}
                  />
                );
              case 'welcome':
                return (
                  <WelcomeCard
                    key={card._id}
                    card={card}
                    borderColor={borderColor}
                    vavadaLink={vavadaLink || '#'}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </section>
  );
}
