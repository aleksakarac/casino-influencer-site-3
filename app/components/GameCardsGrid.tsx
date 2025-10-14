'use client';

import { motion } from 'framer-motion';
import { BonusCard } from './cards/BonusCard';
import { PlayCard } from './cards/PlayCard';
import { WelcomeCard } from './cards/WelcomeCard';

type Card = {
  _id: string;
  cardType: 'bonus' | 'play' | 'welcome';
  order: number;
  // BonusCard properties
  title?: string;
  backgroundImage?: string;
  activationsCount?: number;
  bonusCode?: string;
  // PlayCard properties
  gameImage?: string;
  // WelcomeCard properties
  benefits?: string[];
  // Common optional properties
  tag?: {
    name: string;
    color: string;
    textColor: string;
  };
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
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* Games Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(150px,200px))] gap-5 px-0 md:px-4 justify-center"
        >
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
                    card={card as { _id: string; title: string; backgroundImage: string; tag?: { name: string; color: string; textColor: string; }; activationsCount: number; bonusCode: string; }}
                    borderColor={borderColor}
                    vavadaLink={vavadaLink || '#'}
                  />
                );
              case 'play':
                return (
                  <PlayCard
                    key={card._id}
                    card={card as { _id: string; title: string; gameImage: string; tag?: { name: string; color: string; textColor: string; }; }}
                    borderColor={borderColor}
                    vavadaLink={vavadaLink || '#'}
                  />
                );
              case 'welcome':
                return (
                  <WelcomeCard
                    key={card._id}
                    card={card as { _id: string; backgroundImage: string; bonusCode: string; benefits: string[]; }}
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
