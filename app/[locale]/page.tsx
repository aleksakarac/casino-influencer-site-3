'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { GameCardsGrid } from '@/app/components/GameCardsGrid';
import TournamentGrid from '@/app/components/TournamentGrid';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { client } from '@/app/lib/sanity';
import { gameCardsQuery } from '@/app/lib/sanity/queries';

// BettingSection temporarily disabled during UI redesign
// const BettingSection = dynamic(() => import('@/app/components/BettingSection'), {
//   ssr: false,
//   loading: () => <LoadingSpinner />
// });

export default function HomePage() {
  const searchParams = useSearchParams();
  const [cardsData, setCardsData] = useState<{
    cards: Array<{
      _id: string;
      cardType: 'bonus' | 'play' | 'welcome';
      order: number;
      [key: string]: unknown;
    }>;
    cardConfig: {
      bonusBorder?: string;
      playBorder?: string;
      welcomeBorder?: string;
    };
    vavadaLink: string;
  } | null>(null);

  useEffect(() => {
    // Fetch game cards data
    const fetchCards = async () => {
      try {
        const data = await client.fetch(gameCardsQuery);

        // Merge and sort all cards by order
        const allCards = [
          ...(data.bonusCards || []).map((card: { _id: string; order: number }) => ({ ...card, cardType: 'bonus' as const })),
          ...(data.playCards || []).map((card: { _id: string; order: number }) => ({ ...card, cardType: 'play' as const })),
          ...(data.welcomeCards || []).map((card: { _id: string; order: number }) => ({ ...card, cardType: 'welcome' as const })),
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
    <>
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
        <TournamentGrid />
      </Suspense>

      {/* BettingSection temporarily disabled during UI redesign */}
      {/* <Suspense fallback={<LoadingSpinner />}>
        <BettingSection />
      </Suspense> */}
    </>
  );
}
