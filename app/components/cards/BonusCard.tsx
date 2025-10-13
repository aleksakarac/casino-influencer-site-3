'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, Check, Gift } from 'lucide-react';

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
    e.preventDefault();
    setCopying(true);

    try {
      await navigator.clipboard.writeText(card.bonusCode);
      toast.success('Kod kopiran!', {
        description: `${card.bonusCode} je kopiran u clipboard`,
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = card.bonusCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Kod kopiran!');
    }

    setTimeout(() => setCopying(false), 2000);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-square border hover:scale-105 transition-all duration-300 w-full group"
      style={{
        borderColor,
        borderWidth: '1px',
        backgroundImage: `url(${card.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />

      {/* Icon (Top Left) */}
      <div className="absolute top-2 left-2 md:top-2 md:left-2 z-10 bg-gradient-to-br from-green-500 to-emerald-600 p-1.5 md:p-1.5 rounded-md shadow-lg">
        <Gift size={9} className="md:hidden text-white" />
        <Gift size={10} className="hidden md:block text-white" />
      </div>

      {/* Tag (Top Right) */}
      {card.tag && (
        <div
          className="absolute top-2 right-2 md:top-2 md:right-2 px-2 py-0.5 md:px-2.5 md:py-0.5 text-[9px] md:text-[10px] font-bold uppercase shadow-lg z-10 rounded-full border-2 bg-black/30 backdrop-blur-sm"
          style={{
            borderColor: card.tag.color,
            color: card.tag.color,
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end">
        {/* Bottom Section with Solid Background */}
        <div className="bg-gradient-to-br from-purple-900/70 to-indigo-950/70 backdrop-blur-sm p-2 space-y-1.5 flex flex-col items-center rounded-b-xl">
          {/* Title & Activations */}
          <div className="w-full text-center mb-1">
            <h3 className="text-sm md:text-base font-bold text-white leading-tight">
              {card.title}
            </h3>
            <p className="text-[9px] md:text-[10px] text-gray-300 mt-0.5">
              {card.activationsCount} Activations
            </p>
          </div>

          {/* Code Box and Button Container */}
          <div className="w-full flex flex-col md:flex-row items-center gap-1.5">
            {/* Code Box */}
            <div className="bg-purple-800/40 backdrop-blur-sm rounded md:rounded px-2 py-1.5 md:py-1.5 flex items-center justify-between w-[80%] md:w-[48%] border border-purple-500/30 h-[24px] md:h-[30px]">
              <span className="text-white font-mono text-[9px] md:text-[10px] font-bold tracking-wide">
                {card.bonusCode}
              </span>
              <button
                onClick={copyCode}
                disabled={copying}
                className="text-gray-300 hover:text-green-400 transition-colors ml-1 md:ml-1.5 flex-shrink-0"
                aria-label="Copy code"
              >
                {copying ? (
                  <Check size={10} className="md:hidden" />
                ) : (
                  <Copy size={10} className="md:hidden" />
                )}
                {copying ? (
                  <Check size={11} className="hidden md:block" />
                ) : (
                  <Copy size={11} className="hidden md:block" />
                )}
              </button>
            </div>

            {/* Claim Button */}
            <a
              href={vavadaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-[72%] md:w-[48%] h-[24px] md:h-[30px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-[9px] md:text-[10px] font-bold px-2 md:px-3 rounded text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 gap-0.5 md:gap-1"
            >
              <Gift size={10} className="md:hidden" />
              <Gift size={11} className="hidden md:block" />
              CLAIM BONUS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
