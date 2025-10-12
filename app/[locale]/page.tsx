'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { GameCardsGrid } from '@/app/components/GameCardsGrid';
import TournamentGrid from '@/app/components/TournamentGrid';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { client } from '@/app/lib/sanity';
import { gameCardsQuery } from '@/app/lib/sanity/queries';

export default function HomePage() {
  const searchParams = useSearchParams();
  const [cardsData, setCardsData] = useState<any>(null);

  useEffect(() => {
    // Fetch game cards data
    const fetchCards = async () => {
      try {
        const data = await client.fetch(gameCardsQuery);

        // Merge and sort all cards by order
        const allCards = [
          ...(data.bonusCards || []).map((card: any) => ({ ...card, cardType: 'bonus' })),
          ...(data.playCards || []).map((card: any) => ({ ...card, cardType: 'play' })),
          ...(data.welcomeCards || []).map((card: any) => ({ ...card, cardType: 'welcome' })),
        ].sort((a, b) => a.order - b.order);

        setCardsData({
          cards: allCards,
          cardConfig: data.cardConfig || {},
          vavadaLink: data.vavadaLink || '#',
        });
      } catch (error) {
        console.error('Error fetching cards:', error);
        setCardsData({ cards: [], cardConfig: {}, vavadaLink: '#' });
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    // Handle hash-based scrolling
    const hash = window.location.hash.slice(1);
    if (hash === 'games') {
      setTimeout(() => {
        const element = document.getElementById('games-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (hash === 'tournaments') {
      setTimeout(() => {
        const element = document.getElementById('tournaments-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <div className="max-w-[1400px] mx-auto px-6">
      <Suspense fallback={<LoadingSpinner />}>
        {cardsData ? (
          <GameCardsGrid
            cards={cardsData.cards}
            cardConfig={cardsData.cardConfig}
            vavadaLink={cardsData.vavadaLink}
          />
        ) : (
          <LoadingSpinner />
        )}
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <div id="tournaments-section">
          <TournamentGrid />
        </div>
      </Suspense>
    </div>
  );
}
