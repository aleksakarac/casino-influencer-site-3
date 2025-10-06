'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroGallery from '@/components/HeroGallery';
import MiddleBar from '@/components/MiddleBar';
import GameCards from '@/components/GameCards';
import TournamentCards from '@/components/TournamentCards';
import Footer from '@/components/Footer';
import ThemeSelector from '@/components/ThemeSelector';
import { client } from '@/lib/sanity';
import { Tournament, HeroImage, SiteSettings, ThemeType } from '@/types';

export default function HomePage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const [locale, setLocale] = useState<string>('en');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [theme, setTheme] = useState<ThemeType>('vavada');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await Promise.resolve(params);
      setLocale(resolvedParams.locale);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('casinohub-theme') as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Fetch data from Sanity
    const fetchData = async () => {
      try {
        // Fetch tournaments
        const tournamentsData = await client.fetch<Tournament[]>(
          `*[_type == "tournament" && isActive == true] | order(displayOrder asc) {
            _id,
            name,
            description,
            "imageUrl": image.asset->url,
            prizePool,
            stats,
            endDate,
            joinLink,
            isActive,
            displayOrder
          }`
        );

        // Fetch hero gallery images
        const heroData = await client.fetch<HeroImage[]>(
          `*[_type == "heroGallery" && isActive == true] | order(displayOrder asc) {
            _id,
            "imageUrl": image.asset->url,
            altText,
            displayOrder,
            isActive
          }`
        );

        // Fetch site settings
        const settingsData = await client.fetch<SiteSettings>(
          `*[_type == "siteSettings"][0] {
            _id,
            socialLinks,
            seo
          }`
        );

        setTournaments(tournamentsData || []);
        setHeroImages(heroData || []);
        setSiteSettings(settingsData || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Revalidate every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getThemeBackground = (themeId: ThemeType) => {
    const themes = {
      vavada: 'linear-gradient(135deg, #0F1729 0%, #1A1F2E 100%)',
      minimal: '#0A0A0A',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      geometric: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      particles: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)'
    };
    return themes[themeId] || themes.vavada;
  };

  return (
    <div
      className="min-h-screen theme-transition"
      style={{ background: getThemeBackground(theme) }}
    >
      <Header />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <HeroGallery images={heroImages} locale={locale} />
          <MiddleBar />
          <GameCards />
          <TournamentCards tournaments={tournaments} locale={locale} />
          <Footer socialLinks={siteSettings?.socialLinks} />
        </>
      )}

      <ThemeSelector onThemeChange={setTheme} />
    </div>
  );
}
