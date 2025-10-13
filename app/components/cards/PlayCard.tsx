'use client';

import { Gamepad2, Play } from 'lucide-react';

interface PlayCardProps {
  card: {
    _id: string;
    title: string;
    gameImage: string;
    tag?: {
      name: string;
      color: string;
      textColor: string;
    };
  };
  borderColor: string;
  vavadaLink: string;
}

export function PlayCard({ card, borderColor, vavadaLink }: PlayCardProps) {
  return (
    <a
      href={vavadaLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-xl overflow-hidden aspect-square border hover:scale-105 transition-all duration-300 w-full group"
      style={{ borderColor, borderWidth: '1px' }}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${card.gameImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* Controller Icon (Top Right) */}
      <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 bg-gradient-to-br from-amber-500 to-yellow-600 p-1.5 md:p-2 rounded-md md:rounded-lg shadow-lg">
        <Gamepad2 size={9} className="md:hidden text-white" />
        <Gamepad2 size={12} className="hidden md:block text-white" />
      </div>

      {/* Tag (Top Left) */}
      {card.tag && (
        <div
          className="absolute top-2 left-2 md:top-3 md:left-3 z-10 px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-xs font-bold uppercase shadow-lg rounded-full border-2 bg-black/30 backdrop-blur-sm"
          style={{
            borderColor: card.tag.color,
            color: card.tag.color,
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Play Now Button - Bottom Center */}
      <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 z-20 w-[65%] md:w-[80%]">
        <button
          onClick={(e) => {
            e.preventDefault();
            window.open(vavadaLink, '_blank', 'noopener,noreferrer');
          }}
          className="
            w-full
            px-2 py-0.5 md:px-4 md:py-2
            bg-gradient-to-r from-amber-500 to-yellow-600
            hover:from-amber-400 hover:to-yellow-500
            text-black text-[9px] md:text-xs font-bold
            rounded md:rounded-lg
            shadow-md md:shadow-lg hover:shadow-xl
            transition-all duration-300
            transform hover:scale-105
            flex items-center justify-center gap-0.5 md:gap-1.5
          "
        >
          <Play size={9} className="md:hidden" fill="currentColor" />
          <Play size={12} className="hidden md:block" fill="currentColor" />
          PLAY NOW
        </button>
      </div>
    </a>
  );
}
