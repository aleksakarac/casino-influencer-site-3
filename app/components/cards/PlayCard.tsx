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
      className="block relative rounded-xl overflow-hidden aspect-square border hover:scale-105 transition-all duration-300 w-full max-w-[200px] mx-auto group"
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
      <div className="absolute top-2 right-2 z-10 bg-gradient-to-br from-amber-500 to-yellow-600 p-2.5 max-[400px]:p-2 rounded-md shadow-lg">
        <Gamepad2 size={16} className="text-white max-[400px]:w-[13px] max-[400px]:h-[13px]" />
      </div>

      {/* Tag (Top Left) */}
      {card.tag && (
        <div
          className="absolute top-2 left-2 z-10 px-3 py-1 max-[400px]:px-2 max-[400px]:py-0.5 text-[11px] max-[400px]:text-[9px] font-bold uppercase shadow-lg rounded-full border-2 bg-black/30 backdrop-blur-sm"
          style={{
            borderColor: card.tag.color,
            color: card.tag.color,
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Play Now Button - Bottom Center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[75%]">
        <div className="relative">
          {/* Animated border effect */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-xl opacity-75 blur-sm animate-pulse" />

          <button
            onClick={(e) => {
              e.preventDefault();
              window.open(vavadaLink, '_blank', 'noopener,noreferrer');
            }}
            className="
              relative
              w-full
              min-h-[30px]
              px-3
              bg-gradient-to-r from-amber-500 to-yellow-600
              hover:from-amber-400 hover:to-yellow-500
              text-black text-[10px] font-bold
              rounded-xl
              shadow-md hover:shadow-lg
              transition-all duration-300
              transform hover:scale-105
              flex items-center justify-center gap-1
            "
          >
            <Play size={10} fill="currentColor" />
            PLAY NOW
          </button>
        </div>
      </div>
    </a>
  );
}
