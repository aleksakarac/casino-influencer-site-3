# Leaderboard Redesign Migration Guide: Sanity CMS Integration

## 📋 Table of Contents
1. [Overview](#overview)
2. [Current vs New Design](#current-vs-new-design)
3. [Architecture Understanding](#architecture-understanding)
4. [Data Structure Mapping](#data-structure-mapping)
5. [Step-by-Step Migration](#step-by-step-migration)
6. [Sanity Integration](#sanity-integration)
7. [Prize Cards System](#prize-cards-system)
8. [Bilingual Support](#bilingual-support)
9. [Navigation Integration](#navigation-integration)
10. [Testing Checklist](#testing-checklist)
11. [Troubleshooting](#troubleshooting)

---

## 📖 Overview

This guide will help you migrate the **Leaderboard** component from your current Next.js implementation to the new simplified design in Figma Make, while maintaining full Sanity CMS integration, bilingual support, and all existing functionality.

### Current Implementation
- **Location**: `app/[locale]/leaderboard/page.tsx`
- **Data Source**: Sanity CMS (no Botrix API)
- **Schemas**: `leaderboardEntry`, `tournamentPrize`, `leaderboardSettings`
- **Features**: Top 10 list, 4 prize cards, badges, rank changes, avatars
- **Routing**: Next.js App Router with locale support (`/[locale]/leaderboard`)
- **Translations**: next-intl (EN/SR)

### New Implementation
- **Location**: `/components/pages/Leaderboard.tsx` (Figma Make)
- **Data Source**: Sanity CMS (maintain existing integration)
- **Simplified Display**: Only Place, Viewer Name, Watch Time
- **Navigation**: NavigationProvider (already in your Figma Make prototype)
- **Design**: Matches ContentGrid aesthetic (amber borders, hover effects)

---

## 🎨 Current vs New Design

### What's Being Completely Removed

❌ **Fields Removed from Sanity Schema:**
- `avatarEmoji` - No avatars in new design
- `avatar` (image) - No avatars in new design
- `badge` - No badge labels (Legend, Diamond, Platinum, Gold)
- `daysWatched` - Not displayed in new design
- `avgDaily` - Not displayed in new design
- `change` - No rank change indicators (↑/↓ arrows)
- `watchtime` (old string format) - Replaced by `watchTimeDisplay`

⚠️ **IMPORTANT**: These fields are **completely removed** from the Sanity schema. The new schema only contains essential fields needed for the simplified leaderboard display.

### What Remains

✅ **Core Display Elements:**
- **Place/Rank**: Large numbers with special icons for top 3 (Crown 👑, Medals 🥈🥉)
- **Viewer Name**: Clean, bold text
- **Watch Time**: Prominent hours display (e.g., "1,247h")

✅ **Supporting Elements:**
- Prize cards (4 prizes) above leaderboard
- Section header ("Top Viewers")
- Footer with CTA ("Watch Aca on Kick")
- Loading and error states

### Visual Improvements

1. **Cleaner Layout**: 3-column grid (Rank | Name | Watch Time)
2. **Better Spacing**: More breathing room, modern padding
3. **Consistent Styling**: Matches ContentGrid amber/gold theme
4. **Responsive Design**: 
   - Mobile: Compact with smaller icons/text
   - Desktop: Larger, more prominent elements
5. **Hover Effects**: Scale and glow effects matching ContentGrid

---

## 🏗️ Architecture Understanding

### Your Current Stack

```typescript
// Current Next.js structure
app/
├── [locale]/
│   ├── leaderboard/
│   │   └── page.tsx              // Current leaderboard page
│   └── page.tsx                   // Home page
├── components/
│   ├── LoadingSpinner.tsx
│   └── ... other shared components
└── lib/
    └── sanity.ts                  // Sanity client setup

// Sanity setup
sanity/
├── schemas/
│   ├── leaderboardEntry.ts       // Viewer entries
│   ├── tournamentPrize.ts        // Prize cards
│   ├── leaderboardSettings.ts    // Page settings
│   └── index.ts                  // Schema registry
```

### Figma Make Structure

```typescript
// Figma Make structure (where you'll migrate TO)
/
├── App.tsx                        // Root with NavigationProvider
├── components/
│   ├── NavigationProvider.tsx     // Navigation state management
│   ├── Navbar.tsx
│   ├── MiddleBar.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── Leaderboard.tsx        // NEW redesigned leaderboard
│   └── ui/
│       └── ... shadcn components
└── styles/
    └── globals.css                // Tailwind v4
```

### Data Flow

```
Sanity CMS
    ↓
  (Sanity Client with next-sanity)
    ↓
  GROQ Query (leaderboardQuery, prizesQuery)
    ↓
  Component State (useState)
    ↓
  Render (Loading → Data → Error)
```

---

## 🔄 Data Structure Mapping

### Sanity Schema → Component Interface

#### NEW Simplified Sanity Schema (leaderboardEntry)

```typescript
// New simplified schema - ONLY essential fields
interface LeaderboardEntryData {
  _id: string;
  place: number;              // ✅ Rank/position (1-10)
  viewerName: string;         // ✅ Viewer's display name
  watchTimeDisplay: string;   // ✅ NEW - Formatted display (e.g., "2 Days, 5 Hours, 30 Minutes")
  watchTimeHours: number;     // ✅ Total hours (for sorting/calculations)
  isActive: boolean;          // ✅ Show/hide toggle
}
```

#### Fields REMOVED from Sanity Schema

These fields are **completely removed** from the Sanity schema in the new design:

```typescript
// ❌ REMOVED - Not needed in new design
interface RemovedFields {
  watchtime: string;          // ❌ REMOVED - Replaced by watchTimeDisplay
  avatarEmoji: string;        // ❌ REMOVED - No avatars in new design
  avatar?: string;            // ❌ REMOVED - No avatars in new design
  daysWatched: number;        // ❌ REMOVED - Not displayed
  avgDaily: number;           // ❌ REMOVED - Not displayed
  badge: string;              // ❌ REMOVED - No badges in new design
  change: string;             // ❌ REMOVED - No rank change indicators
}
```

#### New Component Interface

```typescript
// Component display interface
interface LeaderboardViewer {
  rank: number;               // Map from 'place'
  name: string;               // Map from 'viewerName'
  watchTime: string;          // Map from 'watchTimeDisplay'
  watchTimeHours: number;     // Map from 'watchTimeHours' (for sorting)
}
```

#### Prize Schema (No Changes)

```typescript
// From your actual Sanity schema - KEEP AS IS
interface Prize {
  _id: string;
  prizeNumber: number;        // 1-4
  prizeImage: string;         // Sanity CDN URL
  prizeTitle: { en: string; sr: string };
  prizeDescription?: { en: string; sr: string };
  order: number;
  isActive: boolean;
}
```

### Field Mapping Strategy

```typescript
// Transformation function (minimal changes needed)
function transformLeaderboardEntry(sanityEntry: SanityLeaderboardEntry): LeaderboardViewer {
  return {
    rank: sanityEntry.place,
    name: sanityEntry.viewerName,
    watchTime: sanityEntry.watchTimeDisplay,      // Display formatted string
    watchTimeHours: sanityEntry.watchTimeHours    // Keep for sorting
  };
}
```

### Watch Time Format

**Admin Input Format**: `"X Days, Y Hours, Z Minutes"`

Examples:
- `"2 Days, 5 Hours, 30 Minutes"` (52.5 hours total)
- `"0 Days, 23 Hours, 45 Minutes"` (23.75 hours total)
- `"156 Days, 7 Hours, 0 Minutes"` (3751 hours total)

**Why Two Fields?**
1. **watchTimeDisplay** (string): Human-readable format for display in UI
2. **watchTimeHours** (number): Numeric value for sorting and calculations

---

## 🚀 Step-by-Step Migration

### Phase 1: Understand Current Implementation

**Action Items:**

1. **Review Current Page**
   ```bash
   # In your actual project
   open app/[locale]/leaderboard/page.tsx
   ```

2. **Identify Key Parts**
   - Sanity client import
   - GROQ queries (`leaderboardQuery`, `prizesQuery`, `settingsQuery`)
   - Data fetching logic (useEffect)
   - Loading/error states
   - Render logic

3. **Note Current GROQ Queries**
   ```groq
   // OLD query structure (your current implementation)
   *[_type == "leaderboardEntry" && isActive == true] | order(place asc) [0...10] {
     _id,
     place,
     viewerName,
     watchTimeHours,
     avatarEmoji,
     avatar,
     daysWatched,
     avgDaily,
     badge,
     change,
     isActive
   }
   
   // NEW simplified query (for new design)
   *[_type == "leaderboardEntry" && isActive == true] | order(place asc) [0...10] {
     _id,
     place,
     viewerName,
     watchTimeDisplay,
     watchTimeHours,
     isActive
   }
   ```

### Phase 2: Prepare Figma Make Environment

**Action Items:**

1. **Set Up Sanity Client in Figma Make**

   Create `/lib/sanity.ts`:
   ```typescript
   import { createClient } from 'next-sanity';

   export const sanityClient = createClient({
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1s30e0de',
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
     apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
     useCdn: true, // Set to false for fresh data
   });
   ```

2. **Create Environment Variables**

   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=1s30e0de
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Install Dependencies**
   ```bash
   npm install next-sanity @sanity/client @sanity/image-url
   ```

### Phase 3: Create Data Fetching Utilities

**Create `/utils/sanityQueries.ts`:**

```typescript
import { sanityClient } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function getImageUrl(source: any): string {
  if (!source) return '';
  return builder.image(source).width(800).quality(80).url();
}

// GROQ Queries
export const leaderboardQuery = `
  *[_type == "leaderboardEntry" && isActive == true] | order(place asc) [0...10] {
    _id,
    place,
    viewerName,
    watchTimeDisplay,
    watchTimeHours,
    isActive
  }
`;

export const prizesQuery = `
  *[_type == "tournamentPrize" && isActive == true] | order(order asc) [0...4] {
    _id,
    prizeNumber,
    prizeImage,
    prizeTitle,
    prizeDescription,
    order,
    isActive
  }
`;

export const settingsQuery = `
  *[_type == "leaderboardSettings"][0] {
    _id,
    pageTitle,
    pageSubtitle,
    isActive
  }
`;

// Fetch functions
export async function fetchLeaderboardData() {
  try {
    const [entries, prizes, settings] = await Promise.all([
      sanityClient.fetch(leaderboardQuery),
      sanityClient.fetch(prizesQuery),
      sanityClient.fetch(settingsQuery)
    ]);

    return {
      entries: entries || [],
      prizes: prizes || [],
      settings: settings || null
    };
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
}
```

### Phase 4: Create Custom Hook (Optional but Recommended)

**Create `/hooks/useLeaderboard.ts`:**

```typescript
import { useState, useEffect } from 'react';
import { fetchLeaderboardData } from '@/utils/sanityQueries';

interface LeaderboardData {
  entries: any[];
  prizes: any[];
  settings: any;
}

export function useLeaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await fetchLeaderboardData();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load data'));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, loading, error };
}
```

### Phase 5: Update Leaderboard Component

**Update `/components/pages/Leaderboard.tsx`:**

```typescript
import { motion } from 'motion/react';
import { Footer } from '../Footer';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Trophy, Medal, Crown } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { getImageUrl } from '@/utils/sanityQueries';

interface LeaderboardProps {
  locale?: string; // 'en' | 'sr' - for bilingual support
}

export function Leaderboard({ locale = 'en' }: LeaderboardProps) {
  const { data, loading, error } = useLeaderboard();

  // Helper functions (keep from current design)
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={28} className="text-yellow-400 md:hidden" />;
    if (rank === 2) return <Medal size={28} className="text-gray-300 md:hidden" />;
    if (rank === 3) return <Medal size={28} className="text-amber-600 md:hidden" />;
    return null;
  };

  const getRankIconDesktop = (rank: number) => {
    if (rank === 1) return <Crown size={32} className="text-yellow-400 hidden md:block" />;
    if (rank === 2) return <Medal size={32} className="text-gray-300 hidden md:block" />;
    if (rank === 3) return <Medal size={32} className="text-amber-600 hidden md:block" />;
    return null;
  };

  const getRankBgColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500/20 to-amber-600/20 border-yellow-500/40';
    if (rank === 2) return 'from-gray-400/20 to-slate-500/20 border-gray-400/40';
    if (rank === 3) return 'from-amber-600/20 to-orange-700/20 border-amber-600/40';
    return 'from-gray-800/50 to-gray-900/50 border-amber-500/20';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-8 pb-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-[57.6rem] mx-auto px-4 text-center">
          <div className="text-gray-400">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen pt-8 pb-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-[57.6rem] mx-auto px-4 text-center">
          <div className="text-red-400">Failed to load leaderboard. Please try again later.</div>
        </div>
      </div>
    );
  }

  const { entries, prizes, settings } = data;

  // Get localized text
  const getText = (textObj: { en: string; sr: string } | undefined) => {
    if (!textObj) return '';
    return locale === 'sr' ? textObj.sr : textObj.en;
  };

  return (
    <div className="min-h-screen pt-8 pb-12 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-[57.6rem] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={40} className="text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              {settings?.pageTitle?.[locale] || 'Top Viewers'}
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            {settings?.pageSubtitle?.[locale] || 'Most dedicated viewers of Aca Jankovic on Kick • Updated live'}
          </p>
        </motion.div>

        {/* Prize Cards */}
        {prizes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {prizes.map((prize: any, index: number) => {
              const gradient = [
                'from-yellow-500/20 to-amber-600/20',
                'from-gray-400/20 to-slate-500/20',
                'from-amber-600/20 to-orange-700/20',
                'from-green-500/20 to-emerald-600/20'
              ][index];
              
              const border = [
                'border-yellow-500/40',
                'border-gray-400/40',
                'border-amber-600/40',
                'border-green-500/40'
              ][index];

              return (
                <motion.div 
                  key={prize._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`bg-gradient-to-br ${gradient} border ${border} rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20`}
                >
                  {/* Prize Image */}
                  <div className="relative h-32 overflow-hidden">
                    <ImageWithFallback
                      src={getImageUrl(prize.prizeImage)}
                      alt={getText(prize.prizeTitle)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Rank Badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg border border-amber-500/30">
                      <span className="text-xs font-bold text-amber-400">
                        {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Place
                      </span>
                    </div>
                  </div>
                  
                  {/* Prize Label */}
                  <div className="p-3 text-center">
                    <div className="font-bold text-white text-sm">
                      {getText(prize.prizeTitle)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Leaderboard List - NEW SIMPLIFIED DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 md:space-y-3"
        >
          {entries.map((entry: any, index: number) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className={`bg-gradient-to-r ${getRankBgColor(entry.place)} border rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10`}
            >
              <div className="flex items-center justify-between gap-3 md:gap-6 px-4 md:px-8 py-3 md:py-5">
                {/* Rank */}
                <div className="flex items-center justify-center min-w-[60px] md:min-w-[80px]">
                  {entry.place <= 3 ? (
                    <>
                      {getRankIcon(entry.place)}
                      {getRankIconDesktop(entry.place)}
                    </>
                  ) : (
                    <span className="text-2xl md:text-3xl font-black text-gray-400">
                      #{entry.place}
                    </span>
                  )}
                </div>
                
                {/* Viewer Name */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-xl font-bold text-white truncate">
                    {entry.viewerName}
                  </h3>
                </div>

                {/* Watch Time */}
                <div className="text-right min-w-[120px] md:min-w-[180px]">
                  <div className="text-sm md:text-lg font-black text-amber-400">
                    {entry.watchTimeDisplay}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                    watch time
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            {locale === 'sr' ? 'Želite da vidite svoje ime ovde?' : 'Want to see your name here?'}
          </p>
          <a 
            href="https://kick.com/acajankovic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
          >
            {locale === 'sr' ? 'Gledaj Acu na Kick-u' : 'Watch Aca on Kick'}
          </a>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
```

### Phase 6: Update App.tsx Navigation

**No changes needed!** Your existing NavigationProvider and App.tsx already support the leaderboard page:

```typescript
// App.tsx - Already correct!
function AppContent() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'leaderboard':
        return <Leaderboard />; // ✅ Already wired up
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />
      <ImageGallery />
      <MiddleBar />
      {renderPage()}
      <Toaster />
    </div>
  );
}
```

### Phase 7: Add Locale Support (Optional)

If you need bilingual support in Figma Make, update NavigationProvider:

```typescript
// Update NavigationProvider.tsx
interface NavigationContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  locale: string; // Add this
  setLocale: (locale: string) => void; // Add this
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [locale, setLocale] = useState('en'); // Add this

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      setCurrentPage,
      locale, // Add this
      setLocale // Add this
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

// Then use in Leaderboard:
const { locale } = useNavigation();
return <Leaderboard locale={locale} />;
```

---

## 🎨 Sanity Integration

### Sanity Schemas (MAJOR CHANGES REQUIRED!)

⚠️ **IMPORTANT**: The Sanity schema needs to be completely restructured. Remove all unnecessary fields and add the new `watchTimeDisplay` field.

#### leaderboardEntry.ts (NEW SIMPLIFIED SCHEMA)

```typescript
// NEW SCHEMA - Simplified to only essential fields
export default {
  name: 'leaderboardEntry',
  title: 'Leaderboard Entry',
  type: 'document',
  fields: [
    {
      name: 'place',
      title: 'Place/Rank',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(100),
      description: 'Viewer rank position (1-10 for top viewers)'
    },
    {
      name: 'viewerName',
      title: 'Viewer Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50),
      description: 'Display name of the viewer'
    },
    {
      name: 'watchTimeDisplay',
      title: 'Watch Time (Display)',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Formatted watch time display (e.g., "2 Days, 5 Hours, 30 Minutes")',
      placeholder: '2 Days, 5 Hours, 30 Minutes'
    },
    {
      name: 'watchTimeHours',
      title: 'Watch Time (Hours)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
      description: 'Total watch time in hours (for sorting). Calculate: Days*24 + Hours + Minutes/60'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show/hide this entry on the leaderboard'
    }
  ],
  orderings: [
    {
      title: 'Place (Ascending)',
      name: 'placeAsc',
      by: [{ field: 'place', direction: 'asc' }]
    },
    {
      title: 'Watch Time (Descending)',
      name: 'watchTimeDesc',
      by: [{ field: 'watchTimeHours', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      place: 'place',
      title: 'viewerName',
      watchTimeDisplay: 'watchTimeDisplay',
      watchTimeHours: 'watchTimeHours',
      isActive: 'isActive'
    },
    prepare({ place, title, watchTimeDisplay, watchTimeHours, isActive }) {
      return {
        title: `#${place} - ${title}`,
        subtitle: `${watchTimeDisplay} (${watchTimeHours}h total)`,
        media: undefined, // No avatar in new design
        description: isActive ? 'Active' : 'Hidden'
      }
    }
  }
}
```

#### Migration Steps for Existing Data

If you have existing entries in Sanity, you'll need to migrate them:

```typescript
// Migration script (run in Sanity Vision or as a migration)
// This converts old data to new format

// Example: Convert existing entries
const oldEntry = {
  place: 1,
  viewerName: "SrpskiVojnik",
  watchTimeHours: 1247,
  daysWatched: 156,
  avgDaily: 8.0,
  // ... other old fields
};

// Calculate new format
const days = Math.floor(oldEntry.watchTimeHours / 24);
const hours = Math.floor(oldEntry.watchTimeHours % 24);
const minutes = Math.round((oldEntry.watchTimeHours % 1) * 60);

const newEntry = {
  place: oldEntry.place,
  viewerName: oldEntry.viewerName,
  watchTimeDisplay: `${days} Days, ${hours} Hours, ${minutes} Minutes`,
  watchTimeHours: oldEntry.watchTimeHours,
  isActive: true
};

// Delete old fields: avatarEmoji, avatar, daysWatched, avgDaily, badge, change, watchtime
```

#### Helper Function for Admins

Create a custom input component in Sanity Studio to help admins calculate `watchTimeHours`:

```typescript
// sanity/components/WatchTimeInput.tsx
import { StringInput, NumberInput } from '@sanity/ui';
import { useCallback } from 'react';

export function WatchTimeInput(props) {
  const { value, onChange } = props;
  
  const calculateHours = useCallback((displayValue: string) => {
    // Parse "X Days, Y Hours, Z Minutes"
    const match = displayValue.match(/(\d+)\s*Days?,\s*(\d+)\s*Hours?,\s*(\d+)\s*Minutes?/i);
    if (match) {
      const days = parseInt(match[1]) || 0;
      const hours = parseInt(match[2]) || 0;
      const minutes = parseInt(match[3]) || 0;
      return days * 24 + hours + minutes / 60;
    }
    return 0;
  }, []);
  
  return (
    <div>
      <StringInput {...props} />
      <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
        Format: "X Days, Y Hours, Z Minutes"
        {value && ` (${calculateHours(value).toFixed(2)} total hours)`}
      </p>
    </div>
  );
}

// Register in sanity.config.ts
// ...
fields: [
  {
    name: 'watchTimeDisplay',
    type: 'string',
    components: {
      input: WatchTimeInput
    }
  }
]
```

#### tournamentPrize.ts
```typescript
// KEEP AS IS - Already perfect
export default {
  name: 'tournamentPrize',
  title: 'Tournament Prize',
  type: 'document',
  fields: [
    { name: 'prizeNumber', type: 'number', validation: Rule => Rule.required().min(1).max(4) },
    { name: 'prizeImage', type: 'image', validation: Rule => Rule.required() },
    { 
      name: 'prizeTitle', 
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'sr', type: 'string', title: 'Serbian' }
      ]
    },
    { 
      name: 'prizeDescription', 
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'sr', type: 'text', title: 'Serbian' }
      ]
    },
    { name: 'order', type: 'number', initialValue: 1 },
    { name: 'isActive', type: 'boolean', initialValue: true }
  ]
}
```

#### leaderboardSettings.ts
```typescript
// KEEP AS IS - Already perfect
export default {
  name: 'leaderboardSettings',
  title: 'Leaderboard Settings',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', initialValue: 'Top Viewers' },
        { name: 'sr', type: 'string', initialValue: 'Najbolji Gledaoci' }
      ]
    },
    {
      name: 'pageSubtitle',
      type: 'object',
      fields: [
        { name: 'en', type: 'text' },
        { name: 'sr', type: 'text' }
      ]
    },
    { name: 'isActive', type: 'boolean', initialValue: true }
  ]
}
```

### Image Handling with Sanity CDN

```typescript
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '@/lib/sanity';

const builder = imageUrlBuilder(sanityClient);

export function getImageUrl(source: any): string {
  if (!source) return '';
  
  return builder
    .image(source)
    .width(800)         // Optimal for prize cards
    .height(600)        // Maintain aspect ratio
    .quality(80)        // Balance quality/performance
    .auto('format')     // Auto WebP/AVIF
    .fit('crop')        // Crop to fill
    .crop('center')     // Center crop
    .url();
}
```

---

## 🏆 Prize Cards System

### Prize Display Logic

```typescript
// Map prize numbers to visual styling
const getPrizeGradient = (index: number) => {
  const gradients = [
    'from-yellow-500/20 to-amber-600/20',     // 1st - Gold
    'from-gray-400/20 to-slate-500/20',       // 2nd - Silver
    'from-amber-600/20 to-orange-700/20',     // 3rd - Bronze
    'from-green-500/20 to-emerald-600/20'     // 4th - Green
  ];
  return gradients[index] || gradients[3];
};

const getPrizeBorder = (index: number) => {
  const borders = [
    'border-yellow-500/40',    // 1st
    'border-gray-400/40',      // 2nd
    'border-amber-600/40',     // 3rd
    'border-green-500/40'      // 4th
  ];
  return borders[index] || borders[3];
};
```

### Responsive Prize Grid

```typescript
// Prize cards grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  {prizes.map((prize, index) => (
    <PrizeCard 
      key={prize._id}
      prize={prize}
      index={index}
      locale={locale}
    />
  ))}
</div>
```

---

## 🌐 Bilingual Support

### Translation Strategy

Your current implementation uses `next-intl`, but in Figma Make, you'll need a simpler approach:

#### Option 1: Props-based (Recommended for Figma Make)

```typescript
interface LeaderboardProps {
  locale?: 'en' | 'sr';
}

export function Leaderboard({ locale = 'en' }: LeaderboardProps) {
  const getText = (textObj: { en: string; sr: string } | undefined) => {
    if (!textObj) return '';
    return locale === 'sr' ? textObj.sr : textObj.en;
  };

  return (
    <>
      <h1>{getText(settings?.pageTitle)}</h1>
      <p>{getText(settings?.pageSubtitle)}</p>
      <p>{getText(prize.prizeTitle)}</p>
    </>
  );
}
```

#### Option 2: Context-based (If you need app-wide translations)

```typescript
// Create TranslationProvider.tsx
import { createContext, useContext, useState } from 'react';

type Locale = 'en' | 'sr';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'leaderboard.title': 'Top Viewers',
    'leaderboard.watchTime': 'watch time',
    'leaderboard.cta': 'Want to see your name here?',
    'leaderboard.button': 'Watch Aca on Kick',
  },
  sr: {
    'leaderboard.title': 'Najbolji Gledaoci',
    'leaderboard.watchTime': 'vreme gledanja',
    'leaderboard.cta': 'Želite da vidite svoje ime ovde?',
    'leaderboard.button': 'Gledaj Acu na Kick-u',
  }
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string) => {
    return translations[locale][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within TranslationProvider');
  return context;
}
```

### Static Text Translations

```typescript
// For text not from Sanity
const staticTexts = {
  en: {
    watchTime: 'watch time',
    loading: 'Loading leaderboard...',
    error: 'Failed to load leaderboard. Please try again later.',
    cta: 'Want to see your name here?',
    button: 'Watch Aca on Kick',
    place: (n: number) => {
      if (n === 1) return '1st Place';
      if (n === 2) return '2nd Place';
      if (n === 3) return '3rd Place';
      return `${n}th Place`;
    }
  },
  sr: {
    watchTime: 'vreme gledanja',
    loading: 'Učitavanje rang liste...',
    error: 'Greška pri učitavanju. Pokušajte ponovo kasnije.',
    cta: 'Želite da vidite svoje ime ovde?',
    button: 'Gledaj Acu na Kick-u',
    place: (n: number) => `${n}. Mesto`
  }
};
```

---

## 🧭 Navigation Integration

### Current Navigation Setup

Your Figma Make prototype already has perfect navigation:

```typescript
// NavigationProvider.tsx - Already implemented!
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  );
}

// MiddleBar.tsx - Already has leaderboard button!
<button
  onClick={() => handleNavigation('leaderboard')}
  className={/* ... styling ... */}
>
  <Trophy size={24} />
  <span>Rang Lista</span>
</button>
```

### No Changes Needed!

✅ Navigation already works
✅ Leaderboard route already defined in App.tsx
✅ MiddleBar already has Trophy button
✅ Active state tracking already implemented

---

## ✅ Testing Checklist

### Data Fetching

- [ ] Sanity client connects successfully
- [ ] Environment variables loaded correctly
- [ ] Leaderboard entries query returns data
- [ ] Prize cards query returns data
- [ ] Settings query returns data
- [ ] Image URLs generated correctly from Sanity CDN
- [ ] `isActive: true` filter works correctly
- [ ] Data sorted by `place` in ascending order

### Visual Testing

- [ ] **Top 3 Special Icons**: Crown for 1st, Silver medal for 2nd, Bronze medal for 3rd
- [ ] **Regular Ranks**: #4, #5, etc. display correctly
- [ ] **Viewer Names**: Display without truncation (or truncate elegantly)
- [ ] **Watch Time**: Formatted with commas (e.g., "1,247h")
- [ ] **Prize Cards**: Display in 2x2 grid on mobile, 1x4 on desktop
- [ ] **Prize Images**: Load from Sanity CDN
- [ ] **Gradient Backgrounds**: Correct colors for each rank (gold, silver, bronze, regular)
- [ ] **Border Styling**: Matches ContentGrid aesthetic (amber borders)

### Responsive Testing

#### Mobile (375px - 768px)
- [ ] 2 columns for prize cards
- [ ] Compact leaderboard entries (smaller text/icons)
- [ ] Icons: 28px for top 3, text-2xl for numbers
- [ ] Watch time: text-lg
- [ ] Padding: px-4, py-3
- [ ] No horizontal scroll

#### Desktop (1200px+)
- [ ] 4 columns for prize cards
- [ ] Larger leaderboard entries
- [ ] Icons: 32px for top 3, text-3xl for numbers
- [ ] Watch time: text-2xl
- [ ] Padding: px-8, py-5
- [ ] Max-width: 57.6rem (921.6px)

### Functional Testing

- [ ] **Navigation**: Trophy button in MiddleBar navigates to leaderboard
- [ ] **Back Navigation**: Can return to home page
- [ ] **Loading State**: Shows loading message during fetch
- [ ] **Error State**: Shows error message if fetch fails
- [ ] **Empty State**: Handles no data gracefully
- [ ] **External Link**: "Watch Aca on Kick" button opens https://kick.com/acajankovic
- [ ] **Hover Effects**: Cards lift and glow on hover
- [ ] **Animations**: Staggered entry animations work smoothly

### Bilingual Testing (if implemented)

- [ ] Locale switches correctly (EN ↔ SR)
- [ ] Page title translates
- [ ] Page subtitle translates
- [ ] Prize titles translate
- [ ] CTA text translates
- [ ] Button text translates
- [ ] "watch time" label translates
- [ ] Loading/error messages translate

### Data Integrity

- [ ] All 10 entries display (if available)
- [ ] Entries sorted by place (1-10)
- [ ] No duplicate ranks
- [ ] No missing watch times
- [ ] Prize cards match prize numbers (1-4)
- [ ] Inactive entries excluded

### Performance Testing

- [ ] Initial load < 2 seconds
- [ ] Images lazy load properly
- [ ] No layout shift on data load
- [ ] Smooth animations (60fps)
- [ ] No console errors
- [ ] Sanity CDN images load quickly

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS and iOS)
- [ ] Mobile browsers (Chrome, Safari)

### Accessibility

- [ ] Semantic HTML structure
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] Alt text for prize images
- [ ] Sufficient color contrast
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

---

## 🐛 Troubleshooting

### Issue: "Failed to load leaderboard"

**Possible Causes:**
1. Sanity client not configured
2. Environment variables missing
3. GROQ query syntax error
4. Network/CORS issues

**Solutions:**

```typescript
// 1. Verify Sanity client config
console.log('Sanity Config:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
});

// 2. Test connection manually
import { sanityClient } from '@/lib/sanity';

sanityClient.fetch('*[_type == "leaderboardEntry"][0]')
  .then(data => console.log('Test query result:', data))
  .catch(err => console.error('Test query error:', err));

// 3. Check GROQ query in Sanity Studio
// Go to Vision tool: https://your-project.sanity.studio/vision
// Paste your query and test directly

// 4. Enable detailed error logging
try {
  const data = await sanityClient.fetch(leaderboardQuery);
  console.log('Fetched data:', data);
} catch (error) {
  console.error('Fetch error details:', {
    message: error.message,
    stack: error.stack,
    query: leaderboardQuery
  });
}
```

### Issue: Prize images not loading

**Possible Causes:**
1. Image URL builder not configured
2. Sanity CDN CORS issues
3. Invalid image references in Sanity

**Solutions:**

```typescript
// 1. Verify image URL generation
import { getImageUrl } from '@/utils/sanityQueries';

console.log('Generated URL:', getImageUrl(prize.prizeImage));
// Should output: https://cdn.sanity.io/images/1s30e0de/production/...

// 2. Check if image exists in Sanity
const prize = await sanityClient.fetch(`
  *[_type == "tournamentPrize"][0] {
    _id,
    prizeImage {
      asset->{
        _id,
        url
      }
    }
  }
`);
console.log('Prize image data:', prize);

// 3. Use ImageWithFallback component (already provided)
<ImageWithFallback
  src={getImageUrl(prize.prizeImage)}
  alt={getText(prize.prizeTitle)}
  className="w-full h-full object-cover"
/>
```

### Issue: Data not updating

**Possible Causes:**
1. Sanity CDN caching
2. Component not re-fetching
3. `isActive: false` entries
4. Schema migration not complete

**Solutions:**

```typescript
// 1. Disable CDN for development
export const sanityClient = createClient({
  projectId: '1s30e0de',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for development
});

// 2. Force re-fetch on mount
useEffect(() => {
  fetchLeaderboardData().then(setData);
}, []); // Empty deps array ensures single fetch

// 3. Check Sanity Studio
// Verify entries have isActive: true in Sanity Studio

// 4. Verify new schema fields exist
const testEntry = await sanityClient.fetch(`
  *[_type == "leaderboardEntry"][0] {
    _id,
    place,
    viewerName,
    watchTimeDisplay,
    watchTimeHours
  }
`);
console.log('Test entry:', testEntry);
// Should have watchTimeDisplay field, not old fields
```

### Issue: Watch time format incorrect

**Possible Causes:**
1. Admin entered wrong format
2. Old `watchtime` field still being used
3. Missing `watchTimeDisplay` field

**Solutions:**

```typescript
// 1. Validate format in Sanity schema
{
  name: 'watchTimeDisplay',
  type: 'string',
  validation: Rule => Rule.required().regex(
    /^\d+\s*Days?,\s*\d+\s*Hours?,\s*\d+\s*Minutes?$/i,
    'Must be in format: "X Days, Y Hours, Z Minutes"'
  )
}

// 2. Ensure GROQ query uses correct field
export const leaderboardQuery = `
  *[_type == "leaderboardEntry" && isActive == true] | order(place asc) [0...10] {
    _id,
    place,
    viewerName,
    watchTimeDisplay, // ← Must use this, not 'watchtime'
    watchTimeHours,
    isActive
  }
`;

// 3. Check data in component
console.log('Entry data:', entry);
// Should have: { watchTimeDisplay: "2 Days, 5 Hours, 30 Minutes" }
// NOT: { watchtime: "245 hours" }
```

### Issue: Bilingual text not switching

**Possible Causes:**
1. Locale not passed to component
2. `getText()` function not working
3. Missing translations in Sanity

**Solutions:**

```typescript
// 1. Debug locale value
console.log('Current locale:', locale);

// 2. Debug getText function
const getText = (textObj: { en: string; sr: string } | undefined) => {
  console.log('getText input:', textObj, 'locale:', locale);
  if (!textObj) return '';
  return locale === 'sr' ? textObj.sr : textObj.en;
};

// 3. Verify Sanity data structure
const settings = await sanityClient.fetch(`
  *[_type == "leaderboardSettings"][0] {
    pageTitle {
      en,
      sr
    }
  }
`);
console.log('Settings structure:', settings);
```

### Issue: Animations janky/slow

**Possible Causes:**
1. Too many simultaneous animations
2. Large images not optimized
3. Hardware acceleration disabled

**Solutions:**

```typescript
// 1. Reduce animation complexity
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.3, // Faster
    delay: index * 0.03 // Shorter delays
  }}
>

// 2. Optimize images
export function getImageUrl(source: any): string {
  return builder
    .image(source)
    .width(800)       // Smaller size
    .quality(70)      // Lower quality
    .format('webp')   // Modern format
    .url();
}

// 3. Enable will-change for better performance
className="... will-change-transform"
```

### Issue: Navigation not working

**Possible Causes:**
1. NavigationProvider not wrapping App
2. useNavigation hook not available
3. currentPage state not updating

**Solutions:**

```typescript
// 1. Verify App.tsx structure
export default function App() {
  return (
    <NavigationProvider> {/* Must wrap everything */}
      <AppContent />
    </NavigationProvider>
  );
}

// 2. Debug navigation state
const { currentPage, setCurrentPage } = useNavigation();
console.log('Current page:', currentPage);

// 3. Test navigation manually
<button onClick={() => {
  console.log('Navigating to leaderboard...');
  setCurrentPage('leaderboard');
}}>
  Go to Leaderboard
</button>
```

---

## 📚 Additional Resources

### Important Files to Review

**In Your Actual Project:**
1. `app/[locale]/leaderboard/page.tsx` - Current implementation
2. `sanity/schemas/leaderboardEntry.ts` - Entry schema
3. `sanity/schemas/tournamentPrize.ts` - Prize schema
4. `sanity/schemas/leaderboardSettings.ts` - Settings schema
5. `lib/sanity.ts` - Sanity client setup
6. `.env.local` - Environment variables

**In Figma Make Prototype:**
1. `/components/pages/Leaderboard.tsx` - New implementation
2. `/components/NavigationProvider.tsx` - Navigation system
3. `/App.tsx` - Root component
4. `/utils/sanityQueries.ts` - Query utilities (to be created)
5. `/lib/sanity.ts` - Sanity client (to be created)

### Useful Commands

```bash
# Install Sanity packages
npm install next-sanity @sanity/client @sanity/image-url

# Type check
npm run type-check

# Build and test
npm run build
npm run dev

# Sanity Studio commands (in your main project)
cd sanity  # Or wherever your Sanity studio is
npx sanity start  # Start Sanity Studio
npx sanity deploy  # Deploy Sanity Studio
npx sanity graphql deploy  # Deploy GraphQL API (if using)
```

### Migration Timeline

**Estimated Time: 4-6 hours**

- **Phase 1** (Understanding): 30 minutes
- **Phase 2** (Environment setup): 30 minutes  
- **Phase 3** (Data utilities): 1 hour
- **Phase 4** (Custom hook): 30 minutes
- **Phase 5** (Component update): 1.5 hours
- **Phase 6** (Navigation): 15 minutes (already done!)
- **Phase 7** (Bilingual): 30 minutes (optional)
- **Testing**: 1-2 hours
- **Bug fixes**: 30-60 minutes

---

## 🎯 Quick Start Summary

For developers who want to migrate quickly:

### Minimal Steps

1. **Copy Sanity utilities** from your actual project:
   - `lib/sanity.ts` → Figma Make `/lib/sanity.ts`
   - `.env.local` environment variables

2. **Create query utilities**:
   - `/utils/sanityQueries.ts` with GROQ queries and fetch functions

3. **Update Leaderboard component**:
   - Replace hardcoded data with Sanity fetch
   - Keep simplified UI (rank, name, watch time only)
   - Maintain prize cards system

4. **Test thoroughly**:
   - Data fetching works
   - Images load from Sanity CDN
   - Navigation works
   - Bilingual support works (if needed)

5. **Deploy**:
   - Verify environment variables in production
   - Test with real Sanity data
   - Monitor for errors

---

## 📝 Notes for Claude Code

When recreating this in the user's Figma Make environment:

### Critical Requirements

1. **Update Sanity Schema**
   - **CRITICAL**: Remove unnecessary fields from `leaderboardEntry` schema
   - Add new `watchTimeDisplay` field (string format: "X Days, Y Hours, Z Minutes")
   - Keep `watchTimeHours` for sorting/calculations
   - Remove: `avatarEmoji`, `avatar`, `daysWatched`, `avgDaily`, `badge`, `change`, `watchtime`
   - Migrate existing data to new format

2. **Data Fetching Strategy**
   - Use direct `client.fetch()` calls (no React Query/SWR needed)
   - Implement loading and error states
   - Handle empty data gracefully

3. **Display Only Essential Fields**
   - Show: rank, viewer name, watch time (formatted display)
   - Sanity schema only contains essential fields (no hidden/unused fields)
   - Watch time displayed as: "X Days, Y Hours, Z Minutes"

4. **Maintain Existing Features**
   - Prize cards system (4 prizes)
   - Bilingual support (EN/SR)
   - Navigation via NavigationProvider
   - Footer with CTA
   - Loading/error states

5. **Match ContentGrid Aesthetic**
   - Amber/gold gradient borders
   - Hover effects (scale, shadow)
   - Consistent spacing and padding
   - Responsive design (mobile/desktop)

6. **Image Optimization**
   - Use `@sanity/image-url` builder
   - Optimize dimensions (800x600 for prizes)
   - Enable auto-format (WebP/AVIF)
   - Use ImageWithFallback component

7. **Type Safety**
   - Define clear TypeScript interfaces
   - Handle optional fields
   - Type Sanity query responses

8. **Error Handling**
   - Graceful degradation
   - Meaningful error messages
   - Console logging for debugging

9. **Performance**
   - Lazy load images
   - Optimize animations
   - Minimize re-renders

10. **Testing**
    - Verify all data fetching
    - Test responsive design
    - Check bilingual support
    - Validate navigation

### Success Criteria

✅ Leaderboard displays top 10 viewers from Sanity
✅ Only shows place, name, and watch time
✅ Prize cards display correctly with Sanity images
✅ Navigation works from MiddleBar Trophy button
✅ Responsive design matches ContentGrid
✅ Bilingual support works (EN/SR)
✅ Loading and error states handled
✅ No regressions in existing functionality
✅ Matches new simplified design aesthetic

---

## 🚀 Post-Migration Enhancements

After successful migration, consider these improvements:

### Short-term Enhancements

1. **Real-time Updates**
   - Implement polling (refresh every 30 seconds)
   - Add "Updated X minutes ago" timestamp
   - Animate position changes

2. **Enhanced Prize Display**
   - Add prize descriptions on hover
   - Prize value/details modal
   - Countdown to prize distribution

3. **Loading Skeleton**
   - Replace text loading with skeleton cards
   - Smoother perceived performance

4. **Search/Filter**
   - Search by viewer name
   - Filter by rank range
   - Export leaderboard data

### Long-term Enhancements

1. **Botrix API Integration**
   - Fetch live data from https://botrix.live/k/acajankovic/leaderboard
   - Automatic Sanity sync
   - Real-time updates

2. **Historical Data**
   - Track viewer progress over time
   - Monthly leaderboards
   - Achievement badges

3. **User Profiles**
   - Click viewer for detailed stats
   - Viewer achievements and milestones
   - Personal leaderboard history

4. **Analytics**
   - Track most viewed leaderboard entries
   - Prize interest analytics
   - Engagement metrics

5. **Admin Dashboard**
   - Bulk edit entries
   - Preview before publish
   - Analytics overview

---

**Version:** 1.0  
**Last Updated:** January 2025  
**Maintainer:** Aca Jankovic Casino Website Team

**Note:** This guide assumes you're migrating from a fully functional Next.js implementation with Sanity CMS to the Figma Make prototype environment. All Sanity schemas, queries, and data remain unchanged - only the UI component is being redesigned.

