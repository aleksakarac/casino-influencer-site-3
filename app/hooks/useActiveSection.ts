'use client';

import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    const gamesEl = document.getElementById('games-section');
    const tournamentsEl = document.getElementById('tournaments-section');
    const socialEl = document.getElementById('links');

    if (gamesEl) observer.observe(gamesEl);
    if (tournamentsEl) observer.observe(tournamentsEl);
    if (socialEl) observer.observe(socialEl);

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
