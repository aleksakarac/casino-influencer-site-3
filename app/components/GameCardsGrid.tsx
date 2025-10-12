'use client';

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
    <section id="games-section" className="py-16 px-4">
      <div className="w-full lg:max-w-[60%] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
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
