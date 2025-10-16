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
      className="relative rounded-xl overflow-hidden aspect-square border hover:scale-105 transition-all duration-300 w-full max-w-[200px] mx-auto group"
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
      <div className="absolute top-2 left-2 z-10 bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 max-[400px]:p-2 rounded-md shadow-lg">
        <Gift size={16} className="text-white max-[400px]:w-[13px] max-[400px]:h-[13px]" />
      </div>

      {/* Tag (Top Right) */}
      {card.tag && (
        <div
          className="absolute top-2 right-2 px-3 py-1 max-[400px]:px-2 max-[400px]:py-0.5 text-[11px] max-[400px]:text-[9px] font-bold uppercase shadow-lg z-10 rounded-full border-2 bg-black/30 backdrop-blur-sm"
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
        {/* Gradient overlay from top to bottom of entire card */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/0 via-purple-900/30 via-purple-900/60 to-purple-900/75 rounded-b-xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/0 via-indigo-950/30 via-indigo-950/60 to-indigo-950/75 rounded-b-xl" />
        </div>

        {/* Bottom Section with Content */}
        <div className="relative p-2 space-y-1.5 flex flex-col items-center rounded-b-xl">

          {/* Title & Activations */}
          <div className="relative w-full text-center mb-1 z-10">
            <h3 className="text-[10px] min-[360px]:text-xs sm:text-base font-extrabold text-white leading-tight px-1">
              {card.title}
            </h3>
            <p className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-bold text-gray-300 mt-0.5">
              {card.activationsCount} Activations
            </p>
          </div>

          {/* Code Box and Button Container */}
          <div className="relative w-full flex flex-col items-center gap-1.5 z-10">
            {/* Code Box */}
            <div className="bg-purple-800/60 rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 flex items-center justify-between w-full max-[360px]:w-[90%] max-[400px]:w-[85%] min-[768px]:w-[90%] border border-purple-500/30 min-h-[24px] min-[360px]:min-h-[26px] sm:min-h-[30px]">
              <span className="text-white font-mono text-[9px] min-[360px]:text-[10px] sm:text-xs font-extrabold tracking-tight">
                {card.bonusCode}
              </span>
              <button
                onClick={copyCode}
                disabled={copying}
                className="text-gray-300 hover:text-green-400 transition-colors ml-1 flex-shrink-0"
                aria-label="Copy code"
              >
                {copying ? <Check size={9} className="min-[360px]:w-[10px] min-[360px]:h-[10px] sm:w-[11px] sm:h-[11px]" /> : <Copy size={9} className="min-[360px]:w-[10px] min-[360px]:h-[10px] sm:w-[11px] sm:h-[11px]" />}
              </button>
            </div>

            {/* Claim Button */}
            <div className="relative w-full max-[360px]:w-[90%] max-[400px]:w-[85%] min-[768px]:w-[90%]">
              {/* Animated border effect */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-lg opacity-75 blur-sm animate-pulse" />

              <a
                href={vavadaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative flex items-center justify-center w-full min-h-[24px] min-[360px]:min-h-[26px] sm:min-h-[30px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-[10px] min-[360px]:text-[11px] sm:text-sm font-extrabold px-1.5 sm:px-3 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 gap-0.5 sm:gap-1"
              >
                <Gift size={10} className="min-[360px]:w-[11px] min-[360px]:h-[11px] sm:w-[13px] sm:h-[13px]" />
                <span className="tracking-tighter min-[360px]:tracking-tight">CLAIM BONUS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
