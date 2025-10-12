'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface BonusCardProps {
  card: {
    _id: string;
    title: string;
    backgroundImage: string;
    tag?: {
      name: string;
      color: string;
      textColor: string;
    };
    activationsCount: number;
    bonusCode: string;
  };
  borderColor: string;
  vavadaLink: string;
}

export function BonusCard({ card, borderColor, vavadaLink }: BonusCardProps) {
  const [copying, setCopying] = useState(false);

  const copyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopying(true);

    await navigator.clipboard.writeText(card.bonusCode);
    toast.success('Kod kopiran!', {
      description: `${card.bonusCode} je kopiran u clipboard`,
    });

    setTimeout(() => setCopying(false), 2000);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-square border-4 hover:scale-105 transition-transform duration-200 w-full"
      style={{
        borderColor,
        backgroundImage: `url(${card.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* Tag (Top Right) */}
      {card.tag && (
        <div
          className="absolute top-0 right-0 px-4 py-2 text-sm font-bold uppercase shadow-lg z-10"
          style={{
            backgroundColor: card.tag.color,
            color: card.tag.textColor,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)',
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-3 flex flex-col justify-between">
        {/* Title (Top Left) */}
        <h3 className="text-lg font-bold text-yellow-400 drop-shadow-lg">
          {card.title}
        </h3>

        {/* Bottom Section */}
        <div className="space-y-2">
          {/* Activations Count */}
          <p className="text-white text-xs font-medium">
            {card.activationsCount} Aktivacija
          </p>

          {/* Claim Button */}
          <a
            href={vavadaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-3 rounded-lg text-center transition-colors text-sm"
          >
            Claim Bonus
          </a>

          {/* Code Box */}
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 flex items-center justify-between">
            <span className="text-white font-mono text-xs">
              Kod: <span className="font-bold">{card.bonusCode}</span>
            </span>
            <button
              onClick={copyCode}
              disabled={copying}
              className="text-white hover:text-yellow-400 transition-colors"
              aria-label="Copy code"
            >
              {copying ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
