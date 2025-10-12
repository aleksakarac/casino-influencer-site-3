'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ExternalLink, Home, Trophy, Calendar, Link2 } from 'lucide-react';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { client } from '@/app/lib/sanity';

export default function MiddleBar() {
  const pathname = usePathname();
  const router = useRouter();
  const activeSection = useActiveSection();
  const [vavadaLink, setVavadaLink] = useState<string>('#');

  // Fetch Vavada link from Sanity
  useEffect(() => {
    const fetchVavadaLink = async () => {
      try {
        const settings = await client.fetch(
          `*[_type == "siteSettings"][0]{ vavadaRefLink }`
        );
        if (settings?.vavadaRefLink) {
          setVavadaLink(settings.vavadaRefLink);
        }
      } catch (error) {
        console.error('Error fetching Vavada link:', error);
      }
    };

    fetchVavadaLink();
  }, []);

  // Determine active button
  const activeButton =
    pathname?.includes('/leaderboard')
      ? 'rang-lista'
      : activeSection === 'games-section'
      ? 'pokupi-bonuse'
      : activeSection === 'tournaments-section'
      ? 'turniri'
      : null;

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Navigation handlers
  const handlePokupiBonuse = () => {
    if (pathname?.includes('/leaderboard')) {
      router.push('/#games');
    } else {
      scrollToSection('games-section');
    }
  };

  const handleTurniri = () => {
    if (pathname?.includes('/leaderboard')) {
      router.push('/#tournaments');
    } else {
      scrollToSection('tournaments-section');
    }
  };

  const handleSocial = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-[#1A1F2E] h-20 flex items-center justify-around px-6 border-b border-white/10">
      {/* Button 1: VAVADA */}
      <a
        href={vavadaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-full text-cyan-400 hover:scale-105 hover:brightness-110 transition-all duration-150"
      >
        <ExternalLink size={20} />
        <span className="font-semibold">VAVADA</span>
      </a>

      {/* Button 2: Pokupi Bonuse */}
      <button
        onClick={handlePokupiBonuse}
        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-150 ${
          activeButton === 'pokupi-bonuse'
            ? 'bg-purple-600 border-b-4 border-purple-400 text-white'
            : 'text-orange-500'
        } hover:scale-105 hover:brightness-110`}
      >
        <Home size={20} />
        <span className="font-semibold">Pokupi bonuse</span>
      </button>

      {/* Button 3: Rang Lista */}
      <button
        onClick={() => router.push('/leaderboard')}
        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-150 ${
          activeButton === 'rang-lista'
            ? 'bg-purple-600 border-b-4 border-purple-400 text-white'
            : 'text-white'
        } hover:scale-105 hover:brightness-110`}
      >
        <Trophy size={20} />
        <span className="font-semibold">Rang lista</span>
      </button>

      {/* Button 4: Turniri */}
      <button
        onClick={handleTurniri}
        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-150 ${
          activeButton === 'turniri'
            ? 'bg-purple-600 border-b-4 border-purple-400 text-white'
            : 'text-orange-500'
        } hover:scale-105 hover:brightness-110`}
      >
        <Calendar size={20} />
        <span className="font-semibold">Turniri</span>
      </button>

      {/* Button 5: Social */}
      <button
        onClick={handleSocial}
        className="flex items-center gap-2 px-6 py-3 rounded-full text-green-400 hover:scale-105 hover:brightness-110 transition-all duration-150"
      >
        <Link2 size={20} />
        <span className="font-semibold">Social</span>
      </button>
    </div>
  );
}
