'use client';

import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const gamesEl = document.getElementById('games-section');
    const tournamentsEl = document.getElementById('tournaments-section');

    if (gamesEl) observer.observe(gamesEl);
    if (tournamentsEl) observer.observe(tournamentsEl);

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
