'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={vavadaLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-xl overflow-hidden aspect-square border-4 hover:scale-105 transition-transform duration-200 w-full"
      style={{ borderColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tag */}
      {card.tag && (
        <div
          className="absolute top-2 right-2 z-10 px-3 py-1 text-xs font-bold uppercase shadow-lg rounded-full border-2 bg-black/20 backdrop-blur-sm"
          style={{
            borderColor: card.tag.color,
            color: card.tag.color,
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Image Section (85% height) */}
      <div
        className="relative h-[85%] overflow-hidden transition-all duration-300"
        style={{
          backgroundImage: `url(${card.gameImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isHovered ? 'brightness(0.5)' : 'brightness(1)'
        }}
      >
        {/* Play Button Overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
            <div className="bg-yellow-500 rounded-full p-4 shadow-2xl">
              <Play className="w-8 h-8 text-black fill-black" />
            </div>
          </div>
        )}
      </div>

      {/* Title Section (15% height) */}
      <div className="h-[15%] bg-gray-900 flex items-center justify-center px-2">
        <h3 className="text-white font-bold text-center text-sm truncate">
          {card.title}
        </h3>
      </div>
    </a>
  );
}
