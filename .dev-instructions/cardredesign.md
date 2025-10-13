# ContentGrid Migration Guide: From Sanity CMS to New Card Design

## 📋 Table of Contents
1. [Overview](#overview)
2. [What's Changed](#whats-changed)
3. [Data Structure Mapping](#data-structure-mapping)
4. [Step-by-Step Migration](#step-by-step-migration)
5. [Sanity Integration](#sanity-integration)
6. [Image Handling](#image-handling)
7. [Functionality Preservation](#functionality-preservation)
8. [Testing Checklist](#testing-checklist)
9. [Troubleshooting](#troubleshooting)

---

## 📖 Overview

This guide will help you migrate from your current **GameCardsGrid** component (integrated with Sanity CMS) to the new **ContentGrid** component design. The new design features a sleek, modern casino aesthetic with three distinct card types and improved mobile responsiveness.

### Current Implementation
- **Location**: `app/components/GameCardsGrid.tsx`
- **Data Source**: Sanity CMS via `gameCardsQuery`
- **Used In**: `app/[locale]/page.tsx` (HomePage)
- **Images**: Sanity Image CDN

### New Implementation
- **Location**: `/components/ContentGrid.tsx` (in Figma Make prototype)
- **Data Source**: Currently hardcoded (needs Sanity integration)
- **Used In**: `/components/pages/HomePage.tsx`
- **Images**: Currently Unsplash (needs Sanity CDN integration)

---

## 🎨 What's Changed

### Visual Design Improvements

#### 1. **Bonus Cards** (Green Border)
**Old Design:**
- Title: Game/Bonus name
- Displayed activation count
- Simple bonus code display

**New Design:**
- **Title**: The actual benefit (e.g., "50 Free Spins")
- **Subtitle**: Activation count (e.g., "20 Activations")
- **Code Box**: Cleaner design with only code text and copy icon
- **Button**: "CLAIM BONUS" with matching height across all cards
- **Dimensions**: Mobile width reduced by 20% for code box, button width reduced by 8%

#### 2. **Play Cards** (Amber Border)
**Old Design:**
- Title button with hover play button overlay
- Background image with title

**New Design:**
- **Full background image** with overlay
- **Controller icon** in top-right corner
- **Play button** centered at bottom
- **Button**: 20% narrower width, matching height with other cards
- Simplified layout with no separate title section

#### 3. **Welcome Cards** (Purple Border)
**Old Design:**
- Background image
- Benefits list
- Bonus code display

**New Design:**
- **No background image** - simplified solid background
- **Benefits list**: Desktop only
- **Code**: "ACA" prominently displayed with Crown icon
- **Button**: "ISKORISTI KOD" with consistent sizing

### Technical Improvements

1. **Responsive Design**
   - Full-width on mobile (no side padding)
   - Code boxes and buttons properly sized for mobile
   - Icon sizes adjusted for mobile (9px) vs desktop (12-16px)

2. **Consistent Button Heights**
   - All card types now have matching button heights
   - Mobile: `py-0.5`, Desktop: `py-2`

3. **Improved Animations**
   - Smoother hover effects
   - Consistent scale and shadow transitions
   - Card-specific accent colors on hover

4. **Better Code Organization**
   - Helper functions for styling
   - Type-safe TypeScript interfaces
   - Reusable utility functions

---

## 🔄 Data Structure Mapping

### Sanity Schema → ContentGrid Interface

```typescript
// YOUR CURRENT SANITY DATA STRUCTURE
interface SanityGameCard {
  _id: string;
  cardType: 'bonus' | 'play' | 'welcome';
  order: number;
  title?: string;
  backgroundImage?: string;  // Sanity image reference
  gameImage?: string;         // Sanity image reference
  activationsCount?: number;
  bonusCode?: string;
  benefits?: string[];
  tag?: {
    name: string;
    color: string;
    textColor: string;
  };
  vavadaLink?: string;        // External URL
}

// NEW CONTENTGRID DATA STRUCTURE
interface GameCard {
  id: number;                 // Map from _id
  type: CardType;             // Map from cardType
  title: string;              // Different meaning per card type!
  subtitle: string;           // Different meaning per card type!
  image: string;              // Map from backgroundImage or gameImage
  icon: any;                  // Icon component (needs mapping)
  badge?: BadgeType;          // Map from tag.name
  bonusCode?: string;         // Direct mapping
  players?: string;           // New field (optional for play cards)
  jackpot?: string;           // New field (optional for play cards)
  externalUrl?: string;       // Map from vavadaLink
  welcomeBonus?: string;      // New field for welcome cards
  benefits?: string[];        // Direct mapping
  activations?: number;       // Map from activationsCount
}
```

### Field Mapping by Card Type

#### Bonus Cards
```typescript
// Sanity → ContentGrid mapping
{
  id: sanityCard._id,
  type: 'bonus',
  title: sanityCard.title,                    // Keep as is
  subtitle: `${sanityCard.activationsCount} Activations`,  // NEW: Format
  image: getImageUrl(sanityCard.backgroundImage),
  icon: Gift,                                 // Default or from mapping
  badge: mapTagToBadge(sanityCard.tag),
  bonusCode: sanityCard.bonusCode,
  activations: sanityCard.activationsCount
}
```

#### Play Cards
```typescript
// Sanity → ContentGrid mapping
{
  id: sanityCard._id,
  type: 'play',
  title: sanityCard.title,                    // Card game name
  subtitle: "Live Casino" or similar,         // NEW: Add subtitle
  image: getImageUrl(sanityCard.gameImage),
  icon: Gamepad2,                             // Default or from mapping
  badge: mapTagToBadge(sanityCard.tag),
  externalUrl: sanityCard.vavadaLink,
  players: "1.2k",                            // NEW: Optional (can be added to Sanity)
  jackpot: "$42k"                             // NEW: Optional (can be added to Sanity)
}
```

#### Welcome Cards
```typescript
// Sanity → ContentGrid mapping
{
  id: sanityCard._id,
  type: 'welcome',
  title: "Welcome Package",                   // Static or from Sanity
  subtitle: "Sign Up with Code ACA",          // Static or from Sanity
  image: "",                                  // NO IMAGE in new design
  icon: Crown,                                // Fixed icon
  badge: mapTagToBadge(sanityCard.tag),
  welcomeBonus: "$500 + 200 Spins",          // NEW: Add to Sanity schema
  benefits: sanityCard.benefits
}
```

---

## 🚀 Step-by-Step Migration

### Phase 1: Prepare Your Environment

1. **Install Required Dependencies** (if not already installed)
   ```bash
   npm install motion lucide-react sonner
   ```

2. **Verify Sanity Client Setup**
   - Ensure you have `@sanity/client` configured
   - Verify your Sanity project ID and dataset
   - Test connection with existing queries

### Phase 2: Update Sanity Schema (Optional but Recommended)

Add new fields to your Sanity schema to support the enhanced design:

```typescript
// sanity/schemas/gameCard.ts
export default {
  name: 'gameCard',
  title: 'Game Card',
  type: 'document',
  fields: [
    // ... existing fields ...
    
    // NEW FIELDS FOR ENHANCED DESIGN
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Secondary text (Play cards)',
    },
    {
      name: 'welcomeBonus',
      title: 'Welcome Bonus Text',
      type: 'string',
      description: 'For welcome cards only (e.g., "$500 + 200 Spins")',
    },
    {
      name: 'players',
      title: 'Active Players',
      type: 'string',
      description: 'For play cards only (e.g., "1.2k")',
    },
    {
      name: 'jackpot',
      title: 'Jackpot Amount',
      type: 'string',
      description: 'For play cards only (e.g., "$42k")',
    },
    {
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Flame', value: 'flame' },
          { title: 'Zap', value: 'zap' },
          { title: 'Trophy', value: 'trophy' },
          { title: 'Crown', value: 'crown' },
          { title: 'Star', value: 'star' },
          { title: 'Gamepad', value: 'gamepad' },
          { title: 'Gift', value: 'gift' },
        ],
      },
    },
  ],
}
```

### Phase 3: Create Data Transformation Utility

Create a new file to transform Sanity data to ContentGrid format:

```typescript
// utils/transformGameCards.ts
import { Flame, Zap, Trophy, Crown, Star, Gamepad2, Gift, Users, Play } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Your Sanity client
import { sanityClient } from '@/lib/sanity';

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function getImageUrl(source: SanityImageSource): string {
  return builder.image(source).width(1080).quality(80).url();
}

// Icon mapping
const iconMap: Record<string, any> = {
  flame: Flame,
  zap: Zap,
  trophy: Trophy,
  crown: Crown,
  star: Star,
  gamepad: Gamepad2,
  gift: Gift,
  users: Users,
  play: Play,
};

// Badge mapping
export function mapTagToBadge(tag?: { name: string; color: string }): 'hot' | 'new' | undefined {
  if (!tag) return undefined;
  
  const tagName = tag.name.toLowerCase();
  if (tagName.includes('hot') || tagName.includes('популаран')) return 'hot';
  if (tagName.includes('new') || tagName.includes('ново')) return 'new';
  
  return undefined;
}

// Default icon based on card type
function getDefaultIcon(cardType: string) {
  switch (cardType) {
    case 'bonus':
      return Gift;
    case 'play':
      return Gamepad2;
    case 'welcome':
      return Crown;
    default:
      return Star;
  }
}

// Main transformation function
export function transformSanityToGameCard(sanityCard: any): GameCard {
  const baseCard = {
    id: sanityCard._id || sanityCard.order,
    type: sanityCard.cardType as CardType,
    icon: sanityCard.iconType ? iconMap[sanityCard.iconType] : getDefaultIcon(sanityCard.cardType),
    badge: mapTagToBadge(sanityCard.tag),
  };

  // Transform based on card type
  switch (sanityCard.cardType) {
    case 'bonus':
      return {
        ...baseCard,
        type: 'bonus',
        // NEW: Benefit becomes title, activations become subtitle
        title: sanityCard.title || "Bonus Offer",
        subtitle: sanityCard.activationsCount 
          ? `${sanityCard.activationsCount} Activations` 
          : "Limited Offer",
        image: sanityCard.backgroundImage 
          ? getImageUrl(sanityCard.backgroundImage) 
          : "",
        bonusCode: sanityCard.bonusCode,
        activations: sanityCard.activationsCount,
      };

    case 'play':
      return {
        ...baseCard,
        type: 'play',
        title: sanityCard.title || "Play Now",
        subtitle: sanityCard.subtitle || "Live Casino",
        image: sanityCard.gameImage 
          ? getImageUrl(sanityCard.gameImage) 
          : (sanityCard.backgroundImage ? getImageUrl(sanityCard.backgroundImage) : ""),
        externalUrl: sanityCard.vavadaLink,
        players: sanityCard.players,
        jackpot: sanityCard.jackpot,
      };

    case 'welcome':
      return {
        ...baseCard,
        type: 'welcome',
        title: sanityCard.title || "Welcome Package",
        subtitle: "Sign Up with Code ACA",
        image: "", // NO IMAGE in new welcome card design
        welcomeBonus: sanityCard.welcomeBonus || "$500 + 200 Spins",
        benefits: sanityCard.benefits || [],
      };

    default:
      return {
        ...baseCard,
        title: sanityCard.title || "Game",
        subtitle: "",
        image: "",
      };
  }
}

// Transform array of Sanity cards
export function transformGameCards(sanityCards: any[]): GameCard[] {
  return sanityCards
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(transformSanityToGameCard);
}
```

### Phase 4: Update ContentGrid Component

Modify `/components/ContentGrid.tsx` to accept data as props:

```typescript
// /components/ContentGrid.tsx

import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Play, Users, Trophy, Zap, Flame, Crown, Gift, Gamepad2, Star, Sparkles, Tag, Copy } from 'lucide-react';
import { toast } from 'sonner';

// ... (keep all existing type definitions and helper functions)

interface ContentGridProps {
  cards?: GameCard[];  // Make it optional with default
}

export function ContentGrid({ cards }: ContentGridProps) {
  
  // Default cards if none provided (for testing)
  const defaultCards: GameCard[] = [
    // ... your existing hardcoded cards ...
  ];

  const casinoGames = cards || defaultCards;

  // ... (keep all existing functions: copyToClipboard, fallbackCopyToClipboard, etc.)

  return (
    <section className="py-6 md:py-8 px-4 md:px-8">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8"
      >
        <h2 className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent mb-1 md:mb-2">
          Casino Hub
        </h2>
        <p className="text-gray-400">Experience premium casino gaming</p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-6 px-0 md:px-4 lg:px-[12.5%]">
        {casinoGames.map((game, index) => (
          // ... (keep all existing card rendering code)
        ))}
      </div>
    </section>
  );
}
```

### Phase 5: Create Sanity Query Hook

Create a custom hook for fetching data:

```typescript
// hooks/useGameCards.ts
import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity';
import { transformGameCards } from '@/utils/transformGameCards';
import type { GameCard } from '@/types/gameCard';

// Sanity GROQ Query
const gameCardsQuery = `
  *[_type == "gameCard"] | order(order asc) {
    _id,
    cardType,
    order,
    title,
    subtitle,
    backgroundImage,
    gameImage,
    activationsCount,
    bonusCode,
    benefits,
    tag {
      name,
      color,
      textColor
    },
    vavadaLink,
    welcomeBonus,
    players,
    jackpot,
    iconType
  }
`;

export function useGameCards() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const sanityCards = await sanityClient.fetch(gameCardsQuery);
        const transformedCards = transformGameCards(sanityCards);
        setCards(transformedCards);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch cards'));
        console.error('Error fetching game cards:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  return { cards, loading, error };
}
```

### Phase 6: Update HomePage Component

Integrate the new ContentGrid with Sanity data:

```typescript
// /components/pages/HomePage.tsx

import { ContentGrid } from '../ContentGrid';
import { TournamentCard } from '../TournamentCard';
import { Footer } from '../Footer';
import { useGameCards } from '@/hooks/useGameCards';

export function HomePage() {
  const { cards, loading, error } = useGameCards();

  if (error) {
    console.error('Error loading game cards:', error);
    // Optionally show error UI
  }

  return (
    <div className="min-h-screen">
      {loading ? (
        // Optional: Add loading skeleton
        <div className="py-6 md:py-8 px-4 md:px-8">
          <div className="text-center text-gray-400">Loading cards...</div>
        </div>
      ) : (
        <ContentGrid cards={cards} />
      )}
      <TournamentCard />
      <Footer />
    </div>
  );
}
```

### Phase 7: Handle External Links (Play Cards)

Update the Play Card click handler to support external URLs:

```typescript
// Inside ContentGrid component, in the Play Card section

{game.type === 'play' ? (
  <>
    {/* ... existing Play Card JSX ... */}
    
    {/* Play Now Button - Updated with onClick */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[65%] md:w-[calc(80%-2rem)]">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (game.externalUrl) {
            window.open(game.externalUrl, '_blank', 'noopener,noreferrer');
          }
        }}
        className="
          w-full
          px-3 py-0.5 md:px-4 md:py-2
          bg-gradient-to-r from-amber-500 to-yellow-600
          hover:from-amber-400 hover:to-yellow-500
          text-black text-[9px] md:text-xs font-bold
          rounded md:rounded-lg
          shadow-md md:shadow-lg shadow-amber-500/30
          hover:shadow-xl hover:shadow-amber-500/40
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
  </>
)}
```

### Phase 8: Handle Bonus Card Click (External Links)

Add click handler for bonus cards to open external URLs:

```typescript
// Inside ContentGrid component, update Claim Bonus button

<button 
  onClick={(e) => {
    e.stopPropagation();
    if (game.externalUrl) {
      window.open(game.externalUrl, '_blank', 'noopener,noreferrer');
    }
  }}
  className="
    w-[72%] md:w-auto
    px-2 py-0.5 md:px-4 md:py-2
    bg-gradient-to-r from-green-500 to-emerald-600
    hover:from-green-400 hover:to-emerald-500
    text-white text-[9px] md:text-xs font-bold
    rounded md:rounded-lg
    shadow-md md:shadow-lg shadow-green-500/30
    hover:shadow-xl hover:shadow-green-500/40
    transition-all duration-300
    transform hover:scale-105
    flex items-center justify-center gap-0.5 md:gap-1.5
    whitespace-nowrap
  "
>
  <Gift size={9} className="md:hidden" />
  <Gift size={12} className="hidden md:block" />
  CLAIM BONUS
</button>
```

---

## 🖼️ Image Handling

### Sanity Image CDN Integration

The new ContentGrid uses `ImageWithFallback` component. Ensure proper integration:

```typescript
// In your transformation utility (transformGameCards.ts)

import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '@/lib/sanity';

const builder = imageUrlBuilder(sanityClient);

export function getImageUrl(source: SanityImageSource): string {
  if (!source) return '';
  
  return builder
    .image(source)
    .width(1080)        // Optimal width for cards
    .quality(80)        // Balance quality/performance
    .auto('format')     // Auto WebP/AVIF when supported
    .fit('crop')        // Crop to fill
    .crop('center')     // Center crop
    .url();
}
```

### Image Optimization Best Practices

1. **For Play Cards**: Use high-quality game screenshots (1920x1080 recommended)
2. **For Bonus Cards**: Use vibrant, eye-catching images
3. **For Welcome Cards**: NO IMAGES in the new design (leave image field empty)

### Fallback Images

The `ImageWithFallback` component automatically handles broken images. You can customize the fallback:

```typescript
// components/figma/ImageWithFallback.tsx already handles this
// No changes needed, but you can customize if desired
```

---

## 🔧 Functionality Preservation

### 1. Copy to Clipboard

✅ **Already Implemented** in new ContentGrid
- Works with both modern Clipboard API and fallback
- Shows toast notification with sonner
- Accessible keyboard support

### 2. External Links (Vavada)

✅ **Need to Add** (see Phase 7 & 8 above)
- Add `externalUrl` prop to cards
- Map from `vavadaLink` in Sanity
- Open in new tab with `noopener,noreferrer`

### 3. Toast Notifications

✅ **Already Implemented**
- Uses `sonner` package (already in your imports)
- Make sure `<Toaster />` is in your App.tsx (already there)

### 4. Responsive Animations

✅ **Already Implemented**
- Motion animations on card mount
- Hover effects with scale and shadow
- Smooth transitions

### 5. Accessibility

✅ **Maintained**
- Semantic HTML
- ARIA labels on copy buttons
- Keyboard navigation support
- Focus states

---

## ✅ Testing Checklist

### Visual Testing

- [ ] All three card types render correctly
- [ ] Borders show correct colors (Green/Amber/Purple)
- [ ] Badges display properly (Hot/New)
- [ ] Icons render at correct sizes (mobile vs desktop)
- [ ] Images load from Sanity CDN
- [ ] Bonus code boxes styled correctly
- [ ] Buttons have consistent heights across all card types
- [ ] Welcome cards show NO background image

### Responsive Testing

- [ ] Mobile (375px): 2 columns, full width, proper button/code box sizing
- [ ] Tablet (768px): 3 columns, proper spacing
- [ ] Desktop (1200px+): 3 columns with side padding (12.5%)
- [ ] Benefits list hidden on mobile (welcome cards only)
- [ ] Icon sizes adjust correctly (9px mobile, 12-16px desktop)

### Functional Testing

- [ ] Copy to clipboard works for bonus codes
- [ ] Toast notifications appear on copy
- [ ] Play Now buttons open external URLs in new tab
- [ ] Claim Bonus buttons open external URLs in new tab
- [ ] Welcome card "ISKORISTI KOD" button works
- [ ] Hover animations smooth and performant
- [ ] Cards load in correct order from Sanity

### Data Integration Testing

- [ ] Sanity query returns all cards
- [ ] Cards sorted by `order` field
- [ ] Data transformation maps all fields correctly
- [ ] Missing/optional fields handled gracefully
- [ ] Image URLs generated correctly from Sanity CDN
- [ ] Badge mapping works (tag → hot/new)
- [ ] Icon mapping works correctly

### Browser Testing

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (iOS and macOS)
- [ ] Mobile browsers (Chrome, Safari)

### Performance Testing

- [ ] Images lazy load properly
- [ ] No layout shift on card mount
- [ ] Smooth animations (60fps)
- [ ] Fast initial load (check Network tab)

---

## 🐛 Troubleshooting

### Issue: Images Not Loading

**Possible Causes:**
1. Sanity image references incorrect
2. Image URL builder not configured
3. CORS issues with Sanity CDN

**Solutions:**
```typescript
// Check Sanity client configuration
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Important for image CDN
});

// Verify image URL generation
console.log(getImageUrl(sanityCard.backgroundImage));
// Should output: https://cdn.sanity.io/images/...
```

### Issue: Cards Not Appearing

**Possible Causes:**
1. Sanity query not returning data
2. Data transformation failing
3. Card type mismatch

**Solutions:**
```typescript
// Add debugging to transformation
export function transformSanityToGameCard(sanityCard: any): GameCard {
  console.log('Transforming card:', sanityCard);
  
  if (!sanityCard.cardType) {
    console.error('Missing cardType for card:', sanityCard._id);
    return null;
  }
  
  // ... rest of transformation
}

// Filter out null cards
export function transformGameCards(sanityCards: any[]): GameCard[] {
  return sanityCards
    .map(transformSanityToGameCard)
    .filter(card => card !== null);
}
```

### Issue: Copy to Clipboard Not Working

**Possible Causes:**
1. Clipboard API not available (older browsers)
2. HTTPS required for Clipboard API
3. Permissions issue

**Solutions:**
```typescript
// The fallback is already implemented in ContentGrid
// Ensure your site is served over HTTPS in production

// Test manually:
copyToClipboard("TEST123");
// Should show toast notification
```

### Issue: External Links Not Opening

**Possible Causes:**
1. `externalUrl` not mapped from Sanity
2. Pop-up blocker
3. Missing `vavadaLink` in Sanity

**Solutions:**
```typescript
// Add debugging
<button 
  onClick={(e) => {
    e.stopPropagation();
    console.log('Opening URL:', game.externalUrl);
    if (game.externalUrl) {
      window.open(game.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('No external URL for card:', game.id);
    }
  }}
>
  PLAY NOW
</button>
```

### Issue: Benefits Not Showing (Welcome Cards)

**Possible Causes:**
1. Benefits array empty in Sanity
2. Desktop-only CSS not working
3. Card type mismatch

**Solutions:**
```typescript
// Ensure benefits exist
{game.type === 'welcome' && game.benefits && game.benefits.length > 0 && (
  <ul className="hidden md:block space-y-1.5 text-gray-300 text-sm">
    {game.benefits.map((benefit, idx) => (
      <li key={idx} className="flex items-start gap-2">
        <span className="text-purple-400 mt-0.5">✓</span>
        <span>{benefit}</span>
      </li>
    ))}
  </ul>
)}
```

### Issue: Button Heights Inconsistent

**Possible Cause:**
Different padding values between card types

**Solution:**
Ensure all buttons use these exact classes:
```typescript
// Mobile: py-0.5
// Desktop: md:py-2

// Verify in DevTools that computed height matches:
// Mobile: should be ~20-24px
// Desktop: should be ~40-44px
```

### Issue: Animations Janky

**Possible Causes:**
1. Too many simultaneous animations
2. Hardware acceleration not enabled
3. Large images not optimized

**Solutions:**
```typescript
// Reduce animation delay for better perceived performance
transition={{ delay: index * 0.05 }} // Changed from 0.1

// Ensure images are optimized
.width(1080)
.quality(80)

// Add will-change for better performance
className="... will-change-transform"
```

---

## 📚 Additional Resources

### Key Files to Review

1. **Current Implementation:**
   - `app/components/GameCardsGrid.tsx` - Your existing component
   - `app/[locale]/page.tsx` - HomePage integration
   - Your Sanity schema files

2. **New Implementation:**
   - `/components/ContentGrid.tsx` - New component (in Figma Make)
   - Helper functions and utilities
   - TypeScript interfaces

3. **Dependencies:**
   - `motion/react` - Animations
   - `lucide-react` - Icons
   - `sonner` - Toast notifications
   - `@sanity/client` - Sanity integration
   - `@sanity/image-url` - Image URL builder

### Useful Commands

```bash
# Install dependencies
npm install motion lucide-react sonner @sanity/client @sanity/image-url

# Type check
npm run type-check

# Build and test
npm run build
npm run dev

# Sanity commands
npx sanity deploy      # Deploy Sanity Studio
npx sanity graphql deploy  # Deploy GraphQL API (if using)
```

### Migration Timeline Estimate

- **Phase 1-2 (Preparation)**: 30 minutes
- **Phase 3-4 (Data transformation)**: 1-2 hours
- **Phase 5-6 (Integration)**: 1 hour
- **Phase 7-8 (External links)**: 30 minutes
- **Testing**: 2-3 hours
- **Bug fixes**: 1-2 hours

**Total Estimated Time: 6-9 hours**

---

## 🎯 Quick Start Summary

For experienced developers who want to migrate quickly:

1. **Copy ContentGrid component** from Figma Make to your project
2. **Create `transformGameCards.ts`** utility with mapping logic
3. **Create `useGameCards.ts`** hook for Sanity data fetching
4. **Update HomePage** to use new ContentGrid with Sanity data
5. **Add external URL handlers** to Play and Bonus card buttons
6. **Test thoroughly** on all devices and browsers
7. **Deploy** and monitor for issues

---

## 📝 Notes for Claude

When recreating this in the user's actual project:

1. **Preserve existing Sanity setup** - Don't modify their working Sanity configuration
2. **Keep existing queries** - Enhance, don't replace their gameCardsQuery
3. **Maintain backward compatibility** - Old data should still work
4. **Test with real data** - Use their existing Sanity cards for testing
5. **Handle missing fields gracefully** - Not all cards may have all new fields
6. **Respect existing styling** - Match their color scheme and branding
7. **Verify all external links work** - Test Vavada links thoroughly
8. **Check mobile experience** - Serbian audience likely uses mobile heavily
9. **Optimize images** - Sanity CDN settings are crucial for performance
10. **Document any schema changes** - User needs to update Sanity Studio

### Critical Success Factors

✅ All three card types render correctly
✅ Sanity data integrates seamlessly  
✅ External links (Vavada) work properly
✅ Copy-to-clipboard functions correctly
✅ Responsive design works on all devices
✅ Images load from Sanity CDN
✅ No regressions in existing functionality
✅ Performance remains optimal

---

## 🚀 Post-Migration Enhancements

After successful migration, consider:

1. **Add card analytics** - Track which cards get most clicks
2. **A/B test card designs** - Test variations with real users
3. **Add card animations** - More sophisticated hover effects
4. **Implement card filtering** - Filter by card type or tags
5. **Add card search** - Search by bonus code or game name
6. **Card loading states** - Skeleton loaders for better UX
7. **Error boundaries** - Graceful error handling
8. **Image preloading** - Faster perceived performance
9. **Dark mode support** - If needed for your design system
10. **Admin preview** - Live preview in Sanity Studio

---

**Last Updated:** January 2025  
**Version:** 1.0  
**Maintainer:** Aca Jankovic Casino Website Team

