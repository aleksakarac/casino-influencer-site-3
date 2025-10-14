'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface WelcomeCardProps {
  card: {
    _id: string;
    backgroundImage: string;
    bonusCode: string;
    benefits: string[];
  };
  borderColor: string;
  vavadaLink: string;
}

export function WelcomeCard({ card, borderColor, vavadaLink }: WelcomeCardProps) {
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
      className="relative rounded-xl overflow-hidden aspect-square border w-full max-w-[200px] mx-auto group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-900 to-indigo-950"
      style={{
        borderColor,
        borderWidth: '1px',
      }}
    >
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/20 via-transparent to-black/40" />

      {/* Content */}
      <div className="absolute inset-0 p-2 flex flex-col items-center text-center">
        {/* Title - At Top */}
        <div className="w-full">
          <h3 className="text-base max-[400px]:text-sm font-bold text-white drop-shadow-lg">
            Welcome Package
          </h3>
        </div>

        {/* Benefits - Shows above 370px, smaller text below 460px */}
        <div className="hidden min-[370px]:flex min-[370px]:flex-col min-[370px]:items-center min-[370px]:justify-center w-full space-y-1.5 flex-1">
          {card.benefits && card.benefits.map((benefit, index) => (
            <div key={index} className="text-gray-200 text-center flex items-center text-[11px] min-[460px]:text-xs font-bold">
              <span className="text-purple-400 mr-2">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Bottom Section - Stacked Vertically */}
        <div className="w-full flex flex-col items-center gap-1.5 mt-auto pb-1">
          {/* Code Display */}
          <div className="flex items-center justify-between bg-purple-800/60 px-2.5 min-h-[30px] max-[400px]:min-h-[28px] rounded-xl border border-purple-500/30 w-full max-[400px]:w-[80%]">
            <div className="flex items-center gap-1">
              <span className="text-purple-200 text-[11px] font-bold max-[400px]:hidden">
                Sign Up with Code
              </span>
              <span className="text-purple-200 text-[11px] font-bold hidden max-[400px]:inline">
                Code
              </span>
              <span className="font-extrabold text-white font-mono text-xs tracking-wider bg-purple-600/40 px-1.5 py-0.5 rounded border border-purple-400/30">
                {card.bonusCode}
              </span>
            </div>
            <button
              onClick={copyCode}
              disabled={copying}
              className="text-gray-300 hover:text-green-400 transition-colors ml-1.5 flex-shrink-0"
              aria-label="Copy code"
            >
              {copying ? <Check size={11} /> : <Copy size={11} />}
            </button>
          </div>

          {/* Claim Button */}
          <div className="relative w-full max-[400px]:w-[80%]">
            {/* Animated border effect */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-xl opacity-75 blur-sm animate-pulse" />

            <a
              href={vavadaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center w-full min-h-[30px] max-[400px]:min-h-[28px] bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white text-xs font-extrabold px-4 rounded-xl text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
            >
              CLAIM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
