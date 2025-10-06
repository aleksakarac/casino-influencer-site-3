export interface Tournament {
  _id: string;
  name: {
    en: string;
    sr: string;
  };
  description: {
    en: string;
    sr: string;
  };
  imageUrl: string;
  prizePool: string;
  stats: {
    players: number;
    buyIn: string;
    winnerPrize: string;
    tableType: {
      en: string;
      sr: string;
    };
  };
  endDate: string;
  joinLink: string;
  isActive: boolean;
  displayOrder: number;
}

export interface HeroImage {
  _id: string;
  imageUrl: string;
  altText: {
    en: string;
    sr: string;
  };
  displayOrder: number;
  isActive: boolean;
}

export interface SiteSettings {
  _id: string;
  socialLinks: {
    kick: string;
    instagram: string;
    discord: string;
  };
  seo: {
    title: {
      en: string;
      sr: string;
    };
    description: {
      en: string;
      sr: string;
    };
    ogImageUrl: string;
    faviconUrl: string;
  };
}

export type ThemeType = 'vavada' | 'minimal' | 'gradient' | 'geometric' | 'particles';
