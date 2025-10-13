'use client';

import { Crown } from 'lucide-react';

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
  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-square border w-full group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-900 to-indigo-950"
      style={{
        borderColor,
        borderWidth: '1px',
      }}
    >
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/20 via-transparent to-black/40" />

      {/* Star Icon (Top Right) */}
      <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 bg-gradient-to-br from-purple-500 to-pink-600 p-1.5 md:p-2 rounded-md md:rounded-lg shadow-lg">
        <Crown size={9} className="md:hidden text-white" />
        <Crown size={12} className="hidden md:block text-white" />
      </div>

      {/* Tag (Top Left) - NEW badge */}
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

      {/* Content */}
      <div className="absolute inset-0 p-2 md:p-3 flex flex-col justify-between items-center text-center">
        {/* Title & Subtitle */}
        <div className="mt-8 md:mt-10 w-full">
          <h3 className="text-sm md:text-lg font-bold text-white drop-shadow-lg mb-0.5 md:mb-1">
            Welcome Package
          </h3>
          <p className="text-[9px] md:text-xs text-purple-200">
            Sign Up with Code {card.bonusCode}
          </p>
        </div>

        {/* Benefits - Desktop Only */}
        <div className="hidden md:block w-full space-y-1.5">
          {card.benefits && card.benefits.map((benefit, index) => (
            <div key={index} className="text-gray-200 text-left flex items-start text-xs">
              <span className="text-purple-400 mr-2 mt-0.5">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="w-full space-y-1.5 md:space-y-2 flex flex-col items-center">
          {/* Code Display with Crown Icon */}
          <div className="flex items-center gap-1 md:gap-2 text-purple-200">
            <span className="text-[9px] md:text-sm">Code:</span>
            <div className="flex items-center gap-1 md:gap-1.5 bg-purple-800/40 px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg border border-purple-500/30">
              <Crown size={9} className="md:hidden text-yellow-400" />
              <Crown size={12} className="hidden md:block text-yellow-400" />
              <span className="font-bold text-white font-mono text-[9px] md:text-sm tracking-wider">
                {card.bonusCode}
              </span>
            </div>
          </div>

          {/* Claim Button */}
          <a
            href={vavadaLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block w-[72%] md:w-[80%] bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white text-[9px] md:text-xs font-bold py-0.5 md:py-2 px-2 md:px-4 rounded md:rounded-lg text-center transition-all duration-300 shadow-md md:shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            CLAIM
          </a>
        </div>
      </div>
    </div>
  );
}
