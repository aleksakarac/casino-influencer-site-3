'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface WelcomeCardProps {
  card: {
    _id: string;
    backgroundImage: string;
    tag?: {
      name: string;
      color: string;
      textColor: string;
    };
    bonusCode: string;
    benefits: string[];
  };
  borderColor: string;
  vavadaLink: string;
}

export function WelcomeCard({ card, borderColor, vavadaLink }: WelcomeCardProps) {
  const [copying, setCopying] = useState(false);

  const copyCode = async (e: React.MouseEvent) => {
    e.preventDefault();
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
      className="relative rounded-xl overflow-hidden aspect-square border-4 w-full"
      style={{
        borderColor,
        backgroundImage: `url(${card.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

      {/* Tag */}
      {card.tag && (
        <div
          className="absolute top-0 right-0 z-10 px-3 py-1 text-xs font-bold uppercase shadow-lg"
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
      <div className="absolute inset-0 p-3 flex flex-col justify-between items-center text-center">
        {/* Title */}
        <h3 className="text-xl font-bold text-yellow-400 drop-shadow-lg">Bonus</h3>

        {/* Code Box */}
        <div className="w-full bg-black/70 backdrop-blur-sm rounded-lg p-2 border-2 border-yellow-500">
          <div className="flex items-center justify-between">
            <span className="text-white font-mono text-xs">
              Kod: <span className="font-bold text-yellow-400">{card.bonusCode}</span>
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

        {/* Benefits */}
        <div className="w-full space-y-1">
          {card.benefits.map((benefit, index) => (
            <div key={index} className="text-white text-left flex items-start text-xs">
              <span className="text-yellow-400 mr-1">•</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <a
          href={vavadaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Iskoristi Kod
        </a>
      </div>
    </div>
  );
}
