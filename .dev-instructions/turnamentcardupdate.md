# TournamentCard Migration Guide

**From Prototype to Production (Sanity CMS Integration)**

This guide provides step-by-step instructions for implementing the simplified TournamentCard component in your Sanity CMS-based Aca Jankovic project.

---

## Table of Contents

1. [Overview](#overview)
2. [Design Changes](#design-changes)
3. [Sanity Schema](#sanity-schema)
4. [Data Structure Mapping](#data-structure-mapping)
5. [Implementation Steps](#implementation-steps)
6. [Code Examples](#code-examples)
7. [Testing Checklist](#testing-checklist)
8. [Troubleshooting](#troubleshooting)

---

## Overview

### Current State (Prototype)

The prototype uses **hardcoded props** with default values:

```typescript
interface TournamentCardProps {
  title?: string;                    // Default: "Championship Series 2024"
  image?: string;                    // Default: Unsplash tournament image
  prizePool?: string;                // Default: "$50,000"
  requiredStatus?: string;           // Default: "Platinum"
  externalUrl?: string;              // Default: undefined
  endDate?: Date;                    // Default: undefined (uses demo timer)
}
```

### Target State (Production)

Production will use **Sanity CMS** with:
- Single `tournament` document (active tournament)
- Real-time countdown timer
- Dynamic content management
- Optional external link for registration

---

## Design Changes

### Simplified Design Philosophy

The TournamentCard was redesigned to match the ContentGrid aesthetic with **essential information only**:

#### ✅ What's Kept

1. **Title** - Tournament name (e.g., "Championship Series 2024")
2. **Prize Pool** - Badge with trophy icon (e.g., "$50,000 PRIZE")
3. **Required Status** - Badge with shield icon (e.g., "Platinum")
4. **Countdown Timer** - Days/Hours/Minutes/Seconds live countdown
5. **Join Button** - Call-to-action with external link
6. **Hero Image** - Background tournament image

#### ❌ What's Removed

- Long descriptions/details
- Participant count
- Registration deadline text
- Multiple CTAs
- Complex tournament brackets
- Rule lists

### Visual Consistency

The TournamentCard matches ContentGrid styling:
- **Borders**: 2px amber borders (`border-2 border-amber-500/30`)
- **Hover Effects**: Lift animation, scale, enhanced shadow
- **Gradients**: Amber/yellow theme throughout
- **Badge Design**: Consistent with ContentGrid card badges
- **Button Height**: Same as ContentGrid buttons (py-3 md:py-3.5)

---

## Sanity Schema

### New Simplified Schema

**File**: `schemas/tournament.ts`

```typescript
export default {
  name: 'tournament',
  title: 'Tournament',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tournament Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
      description: 'Name of the tournament (e.g., "Championship Series 2024")',
    },
    {
      name: 'prizePool',
      title: 'Prize Pool',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Prize amount with currency (e.g., "$50,000" or "€10,000")',
      placeholder: '$50,000',
    },
    {
      name: 'requiredStatus',
      title: 'Required Status',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Bronze', value: 'Bronze' },
          { title: 'Silver', value: 'Silver' },
          { title: 'Gold', value: 'Gold' },
          { title: 'Platinum', value: 'Platinum' },
          { title: 'Diamond', value: 'Diamond' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Minimum rank required to participate',
    },
    {
      name: 'image',
      title: 'Tournament Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip'],
      },
      validation: (Rule) => Rule.required(),
      description: 'Hero image for the tournament (recommended: 1920x1080px)',
    },
    {
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      description: 'When the tournament ends (countdown timer)',
    },
    {
      name: 'externalUrl',
      title: 'Registration URL',
      type: 'url',
      description: 'External link for tournament registration (optional)',
      placeholder: 'https://tournament.example.com/register',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show/hide this tournament on the website',
    },
  ],
  preview: {
    select: {
      title: 'title',
      prizePool: 'prizePool',
      requiredStatus: 'requiredStatus',
      media: 'image',
      endDate: 'endDate',
      isActive: 'isActive',
    },
    prepare({ title, prizePool, requiredStatus, media, endDate, isActive }) {
      const endDateStr = endDate ? new Date(endDate).toLocaleDateString() : 'No end date';
      return {
        title: title,
        subtitle: `${prizePool} • ${requiredStatus} • Ends: ${endDateStr} • ${isActive ? 'Active' : 'Hidden'}`,
        media,
      };
    },
  },
};
```

### Singleton Pattern (Recommended)

Since you typically only have **one active tournament at a time**, use Sanity's singleton pattern:

**File**: `schemas/tournament.ts` (singleton version)

```typescript
export default {
  name: 'tournament',
  title: 'Active Tournament',
  type: 'document',
  // Singleton: Only one document allowed
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ... same fields as above
  ],
};
```

Then in your Sanity desk structure:

**File**: `deskStructure.ts`

```typescript
import { Trophy } from 'lucide-react';

export const deskStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Tournament (Singleton)
      S.listItem()
        .title('Active Tournament')
        .icon(Trophy)
        .child(
          S.document()
            .schemaType('tournament')
            .documentId('tournament-singleton')
        ),
      // ... other items
    ]);
```

---

## Data Structure Mapping

### Sanity Schema → Component Props

```typescript
// Sanity Data Structure
interface SanityTournament {
  _id: string;
  title: string;              // → title prop
  prizePool: string;          // → prizePool prop
  requiredStatus: string;     // → requiredStatus prop
  image: {                    // → Sanity image (needs URL builder)
    asset: {
      _ref: string;
    };
  };
  endDate: string;            // → Convert to Date object for endDate prop
  externalUrl?: string;       // → externalUrl prop
  isActive: boolean;          // → Filter query (don't fetch if false)
}

// Component Props
interface TournamentCardProps {
  title: string;              // Map from: tournament.title
  image: string;              // Map from: urlFor(tournament.image)
  prizePool: string;          // Map from: tournament.prizePool
  requiredStatus: string;     // Map from: tournament.requiredStatus
  externalUrl?: string;       // Map from: tournament.externalUrl
  endDate: Date;              // Map from: new Date(tournament.endDate)
}
```

### Required Status Badge Colors

The component automatically styles badges based on status name:

```typescript
// Built-in color mapping (no Sanity schema needed)
const statusColors = {
  'Beginner/Bronze': 'from-orange-600 to-amber-700',
  'Silver':          'from-gray-400 to-gray-500',
  'Gold':            'from-yellow-400 to-yellow-600',
  'Platinum':        'from-cyan-400 to-blue-500',
  'Diamond':         'from-cyan-400 to-blue-500',
  'Default':         'from-purple-500 to-pink-600',
};
```

**Note**: Status colors are hardcoded in the component. If you want custom colors, you'll need to add a `statusColor` field to the Sanity schema.

---

## Implementation Steps

### Step 1: Create Sanity Schema

1. **Create schema file**
   ```bash
   touch schemas/tournament.ts
   ```

2. **Copy schema code** (from [Sanity Schema](#sanity-schema) section above)

3. **Register schema in index**
   
   **File**: `schemas/index.ts`
   ```typescript
   import tournament from './tournament';
   
   export const schemaTypes = [
     tournament,
     // ... other schemas
   ];
   ```

4. **Deploy schema**
   ```bash
   sanity deploy
   ```

### Step 2: Create Initial Tournament Data

1. **Open Sanity Studio** (http://localhost:3333 or your Studio URL)

2. **Create new Tournament document:**
   - Title: "Championship Series 2024"
   - Prize Pool: "$50,000"
   - Required Status: "Platinum"
   - Image: Upload a tournament/esports image
   - End Date: Set a future date/time
   - External URL: (optional) Registration link
   - Active: ✓ (checked)

3. **Publish the document**

### Step 3: Set Up Image URL Builder

**File**: `lib/sanity/imageUrlBuilder.ts`

```typescript
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper for tournament images (optimized)
export function getTournamentImageUrl(source: any) {
  return builder
    .image(source)
    .width(1920)
    .height(1080)
    .fit('crop')
    .quality(85)
    .format('webp')
    .url();
}
```

### Step 4: Create GROQ Query

**File**: `lib/sanity/queries.ts`

```typescript
// Fetch active tournament
export const tournamentQuery = `
  *[_type == "tournament" && isActive == true][0] {
    _id,
    title,
    prizePool,
    requiredStatus,
    image,
    endDate,
    externalUrl,
    isActive
  }
`;

// Alternative: With fallback values
export const tournamentQueryWithFallback = `
  *[_type == "tournament" && isActive == true][0] {
    _id,
    "title": coalesce(title, "Championship Series 2024"),
    "prizePool": coalesce(prizePool, "$50,000"),
    "requiredStatus": coalesce(requiredStatus, "Platinum"),
    image,
    endDate,
    externalUrl,
    isActive
  }
`;
```

### Step 5: Update Component to Fetch from Sanity

**Option A: Fetch in Parent Component (Recommended)**

**File**: `components/pages/HomePage.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { ContentGrid } from '../ContentGrid';
import { TournamentCard } from '../TournamentCard';
import { Footer } from '../Footer';
import { sanityClient } from '@/lib/sanity/client';
import { tournamentQuery } from '@/lib/sanity/queries';
import { getTournamentImageUrl } from '@/lib/sanity/imageUrlBuilder';

interface SanityTournament {
  _id: string;
  title: string;
  prizePool: string;
  requiredStatus: string;
  image: any;
  endDate: string;
  externalUrl?: string;
  isActive: boolean;
}

export function HomePage() {
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTournament() {
      try {
        const data: SanityTournament = await sanityClient.fetch(tournamentQuery);
        
        if (data) {
          // Transform Sanity data to component props
          setTournament({
            title: data.title,
            image: getTournamentImageUrl(data.image),
            prizePool: data.prizePool,
            requiredStatus: data.requiredStatus,
            externalUrl: data.externalUrl,
            endDate: new Date(data.endDate),
          });
        }
      } catch (error) {
        console.error('Error fetching tournament:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTournament();
  }, []);

  return (
    <>
      <ContentGrid />
      
      {/* Only render if tournament exists */}
      {!loading && tournament && (
        <TournamentCard
          title={tournament.title}
          image={tournament.image}
          prizePool={tournament.prizePool}
          requiredStatus={tournament.requiredStatus}
          externalUrl={tournament.externalUrl}
          endDate={tournament.endDate}
        />
      )}
      
      {/* Show placeholder while loading */}
      {loading && (
        <div className="py-8 text-center">
          <p className="text-gray-400">Loading tournament...</p>
        </div>
      )}
      
      <Footer />
    </>
  );
}
```

**Option B: Fetch Inside TournamentCard**

**File**: `components/TournamentCard.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, Trophy, Shield } from 'lucide-react';
import { sanityClient } from '@/lib/sanity/client';
import { tournamentQuery } from '@/lib/sanity/queries';
import { getTournamentImageUrl } from '@/lib/sanity/imageUrlBuilder';

interface TournamentCardProps {
  title?: string;
  image?: string;
  prizePool?: string;
  requiredStatus?: string;
  externalUrl?: string;
  endDate?: Date;
}

export function TournamentCard(props?: TournamentCardProps) {
  const [tournamentData, setTournamentData] = useState<TournamentCardProps | null>(props || null);
  const [loading, setLoading] = useState(!props);

  useEffect(() => {
    // Only fetch if no props provided
    if (!props) {
      async function fetchTournament() {
        try {
          const data = await sanityClient.fetch(tournamentQuery);
          
          if (data) {
            setTournamentData({
              title: data.title,
              image: getTournamentImageUrl(data.image),
              prizePool: data.prizePool,
              requiredStatus: data.requiredStatus,
              externalUrl: data.externalUrl,
              endDate: new Date(data.endDate),
            });
          }
        } catch (error) {
          console.error('Error fetching tournament:', error);
        } finally {
          setLoading(false);
        }
      }

      fetchTournament();
    }
  }, [props]);

  if (loading) {
    return (
      <section className="py-8 text-center">
        <p className="text-gray-400">Loading tournament...</p>
      </section>
    );
  }

  if (!tournamentData) {
    return null; // Don't render if no data
  }

  const {
    title = "Championship Series 2024",
    image = "https://images.unsplash.com/photo-1758179762049-615d9aac58ea",
    prizePool = "$50,000",
    requiredStatus = "Platinum",
    externalUrl,
    endDate
  } = tournamentData;

  // ... rest of component (countdown logic, render, etc.)
}
```

### Step 6: Test Integration

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Verify tournament displays**
   - Check title, prize pool, status badge
   - Verify image loads correctly
   - Confirm countdown timer works
   - Test "Join Tournament" button

3. **Test Sanity Studio**
   - Edit tournament in Sanity
   - Refresh frontend → changes should appear
   - Toggle `isActive` → tournament should hide/show

---

## Code Examples

### Complete Tournament Component with Sanity

**File**: `components/TournamentCard.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, Trophy, Shield } from 'lucide-react';

interface TournamentCardProps {
  title?: string;
  image?: string;
  prizePool?: string;
  requiredStatus?: string;
  externalUrl?: string;
  endDate?: Date;
}

export function TournamentCard({
  title = "Championship Series 2024",
  image = "https://images.unsplash.com/photo-1758179762049-615d9aac58ea",
  prizePool = "$50,000",
  requiredStatus = "Platinum",
  externalUrl,
  endDate
}: TournamentCardProps = {}) {
  
  // Calculate initial time left
  const calculateTimeLeft = () => {
    if (endDate) {
      const difference = endDate.getTime() - new Date().getTime();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
    }
    // Default demo time if no endDate
    return {
      days: 0,
      hours: 23,
      minutes: 42,
      seconds: 15
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get status badge styling
  const getStatusBadgeClass = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes('beginner') || lower.includes('bronze')) {
      return 'from-orange-600 to-amber-700';
    }
    if (lower.includes('silver')) {
      return 'from-gray-400 to-gray-500';
    }
    if (lower.includes('gold')) {
      return 'from-yellow-400 to-yellow-600';
    }
    if (lower.includes('platinum') || lower.includes('diamond')) {
      return 'from-cyan-400 to-blue-500';
    }
    return 'from-purple-500 to-pink-600';
  };

  const handleJoinClick = () => {
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="events" className="py-6 md:py-8 px-4 md:px-8 scroll-mt-32">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent mb-1 md:mb-2">
            Featured Tournament
          </h2>
          <p className="text-gray-400">Join the ultimate gaming competition</p>
        </motion.div>

        {/* Tournament Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="group cursor-pointer"
        >
          <div className="
            relative 
            bg-gradient-to-b from-gray-800/95 to-gray-900/95
            rounded-2xl 
            overflow-hidden 
            backdrop-blur-md
            transition-all duration-500
            shadow-xl
            group-hover:shadow-2xl
            border-2 border-amber-500/30 hover:border-amber-400/60
            group-hover:shadow-amber-500/20
          ">
            {/* Accent Gradient on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                <ImageWithFallback
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/60 md:to-transparent" />
                
                {/* Prize Pool Badge - Top Left */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-lg">
                    <Trophy size={16} className="md:hidden" />
                    <Trophy size={18} className="hidden md:block" />
                    <span className="text-xs md:text-sm font-black tracking-wide">{prizePool} PRIZE</span>
                  </div>
                </div>

                {/* Required Status Badge - Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`flex items-center gap-1.5 bg-gradient-to-r ${getStatusBadgeClass(requiredStatus)} text-white px-3 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-lg border border-white/20`}>
                    <Shield size={14} className="md:hidden" />
                    <Shield size={16} className="hidden md:block" />
                    <span className="text-xs md:text-sm font-bold">{requiredStatus}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                {/* Tournament Title */}
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {title}
                  </h3>
                </div>

                {/* Countdown Timer */}
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-amber-400" />
                    <span className="text-sm md:text-base text-gray-300">Tournament ends in:</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    {[
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hours', value: timeLeft.hours },
                      { label: 'Min', value: timeLeft.minutes },
                      { label: 'Sec', value: timeLeft.seconds }
                    ].map((time) => (
                      <div key={time.label} className="text-center">
                        <div className="bg-gradient-to-b from-gray-700/80 to-gray-800/80 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-amber-500/20 shadow-lg backdrop-blur-sm">
                          <motion.div 
                            key={time.value}
                            initial={{ scale: 1.2, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-xl md:text-2xl font-black text-amber-400"
                          >
                            {time.value.toString().padStart(2, '0')}
                          </motion.div>
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 mt-1.5 uppercase tracking-wider">
                          {time.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join Tournament Button */}
                <button
                  onClick={handleJoinClick}
                  className="
                    w-full
                    px-6 py-3 md:py-3.5
                    bg-gradient-to-r from-amber-500 to-yellow-600
                    hover:from-amber-400 hover:to-yellow-500
                    text-black
                    font-black
                    rounded-xl
                    shadow-lg shadow-amber-500/30
                    hover:shadow-xl hover:shadow-amber-500/50
                    transition-all duration-300
                    transform group-hover:scale-105
                    flex items-center justify-center gap-2
                  "
                >
                  <Trophy size={18} />
                  JOIN TOURNAMENT
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### HomePage Integration Example

**File**: `components/pages/HomePage.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { ContentGrid } from '../ContentGrid';
import { TournamentCard } from '../TournamentCard';
import { Footer } from '../Footer';
import { sanityClient } from '@/lib/sanity/client';
import { tournamentQuery } from '@/lib/sanity/queries';
import { getTournamentImageUrl } from '@/lib/sanity/imageUrlBuilder';

interface TournamentData {
  title: string;
  image: string;
  prizePool: string;
  requiredStatus: string;
  externalUrl?: string;
  endDate: Date;
}

export function HomePage() {
  const [tournament, setTournament] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTournament() {
      try {
        const data = await sanityClient.fetch(tournamentQuery);
        
        if (data) {
          setTournament({
            title: data.title,
            image: getTournamentImageUrl(data.image),
            prizePool: data.prizePool,
            requiredStatus: data.requiredStatus,
            externalUrl: data.externalUrl,
            endDate: new Date(data.endDate),
          });
        }
      } catch (error) {
        console.error('Error fetching tournament:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTournament();
  }, []);

  return (
    <>
      <ContentGrid />
      
      {!loading && tournament ? (
        <TournamentCard {...tournament} />
      ) : loading ? (
        <div className="py-8 text-center">
          <p className="text-gray-400">Loading tournament...</p>
        </div>
      ) : null}
      
      <Footer />
    </>
  );
}
```

---

## Testing Checklist

### Sanity Studio

- [ ] Schema deployed successfully
- [ ] Can create tournament document
- [ ] All required fields validating correctly
- [ ] Image upload working
- [ ] Date/time picker functional
- [ ] Preview shows correct information
- [ ] `isActive` toggle works

### Frontend Display

- [ ] Tournament title displays correctly
- [ ] Prize pool badge shows with correct amount
- [ ] Required status badge shows with correct status
- [ ] Badge colors match status type (Bronze, Silver, Gold, etc.)
- [ ] Tournament image loads and displays properly
- [ ] Countdown timer shows correct time
- [ ] Countdown updates every second
- [ ] Join button visible and styled correctly

### Functionality

- [ ] Clicking "Join Tournament" button opens external URL (if provided)
- [ ] Button opens in new tab with proper security (`noopener,noreferrer`)
- [ ] If no `externalUrl`, button does nothing (expected behavior)
- [ ] Countdown reaches zero correctly
- [ ] Past tournaments (endDate < now) handle gracefully

### Responsive Design

- [ ] **Mobile** (< 768px):
  - [ ] Single column layout
  - [ ] Image height: 256px (h-64)
  - [ ] Badges readable and properly sized
  - [ ] Countdown timer fits on screen
  - [ ] Button full width and touchable

- [ ] **Desktop** (≥ 768px):
  - [ ] Two column layout (image left, content right)
  - [ ] Image height: auto (min 300px)
  - [ ] Proper spacing and alignment
  - [ ] Hover effects work smoothly

### Animations

- [ ] Section header fades in from top
- [ ] Card fades in from bottom with delay
- [ ] Hover: Card lifts 8px and scales 1.01
- [ ] Hover: Image scales 1.10 and brightens
- [ ] Hover: Title changes to amber color
- [ ] Hover: Button scales 1.05
- [ ] Countdown numbers animate on change

### Data Integration

- [ ] Sanity data fetches without errors
- [ ] Image URL builder generates valid URLs
- [ ] Date string converts to Date object correctly
- [ ] Optional fields (externalUrl) handle missing values
- [ ] `isActive: false` hides tournament
- [ ] Changing data in Sanity reflects on frontend (after refresh)

### Edge Cases

- [ ] No tournament in Sanity → component doesn't render
- [ ] Tournament ended (past date) → shows 00:00:00:00
- [ ] Very long tournament title → truncates properly
- [ ] Missing image → fallback works
- [ ] Very large prize amount → displays correctly

---

## Troubleshooting

### Issue: Tournament not displaying

**Symptoms**: Component doesn't render at all

**Possible Causes**:
1. No tournament document in Sanity
2. Tournament has `isActive: false`
3. Query error
4. Data fetching error

**Solutions**:

```typescript
// 1. Check if tournament exists in Sanity Vision
*[_type == "tournament" && isActive == true]

// 2. Add error handling in component
try {
  const data = await sanityClient.fetch(tournamentQuery);
  console.log('Tournament data:', data);
  if (!data) {
    console.warn('No active tournament found');
  }
} catch (error) {
  console.error('Fetch error:', error);
}

// 3. Verify environment variables
console.log('Sanity Config:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
});
```

### Issue: Image not loading

**Symptoms**: Broken image icon or missing image

**Possible Causes**:
1. Image URL builder not configured
2. Image asset not uploaded to Sanity
3. CORS issues
4. Wrong image reference

**Solutions**:

```typescript
// 1. Check image URL builder
import { urlFor } from '@/lib/sanity/imageUrlBuilder';

const imageUrl = urlFor(data.image).url();
console.log('Image URL:', imageUrl);
// Should output: https://cdn.sanity.io/images/...

// 2. Verify image in Sanity document
console.log('Image asset:', data.image);
// Should have: { asset: { _ref: "image-..." } }

// 3. Use fallback image
const image = data.image ? urlFor(data.image).url() : 'https://images.unsplash.com/...';

// 4. Check CORS in Sanity
// Go to: https://www.sanity.io/manage/project/YOUR_PROJECT_ID/api
// Add your domain to CORS origins
```

### Issue: Countdown timer not working

**Symptoms**: Timer shows 00:00:00:00 or doesn't update

**Possible Causes**:
1. Invalid endDate format
2. Past end date
3. Missing endDate
4. Date conversion error

**Solutions**:

```typescript
// 1. Check endDate value
console.log('End Date from Sanity:', data.endDate);
console.log('Parsed Date:', new Date(data.endDate));
console.log('Is valid:', !isNaN(new Date(data.endDate).getTime()));

// 2. Verify date is in future
const endDate = new Date(data.endDate);
const now = new Date();
const difference = endDate.getTime() - now.getTime();
console.log('Time difference (ms):', difference);
console.log('Is future date:', difference > 0);

// 3. Add validation in component
useEffect(() => {
  if (!endDate || endDate.getTime() < Date.now()) {
    console.warn('Tournament has ended or no end date');
    return;
  }
  // ... countdown logic
}, [endDate]);

// 4. Test with specific date
const testEndDate = new Date('2025-12-31T23:59:59');
console.log('Test countdown:', calculateTimeLeft(testEndDate));
```

### Issue: Join button doesn't work

**Symptoms**: Clicking button does nothing

**Possible Causes**:
1. No externalUrl provided
2. Invalid URL format
3. JavaScript error
4. Button not clickable (z-index issue)

**Solutions**:

```typescript
// 1. Check external URL
console.log('External URL:', data.externalUrl);

// 2. Add click handler logging
const handleJoinClick = () => {
  console.log('Button clicked');
  console.log('External URL:', externalUrl);
  
  if (externalUrl) {
    console.log('Opening:', externalUrl);
    window.open(externalUrl, '_blank', 'noopener,noreferrer');
  } else {
    console.warn('No external URL provided');
  }
};

// 3. Validate URL format
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

if (externalUrl && !isValidUrl(externalUrl)) {
  console.error('Invalid URL format:', externalUrl);
}

// 4. Check z-index and pointer-events
// Ensure button has pointer-events-auto if parent has pointer-events-none
```

### Issue: Status badge wrong color

**Symptoms**: Badge shows wrong color for status type

**Possible Causes**:
1. Status name mismatch (case sensitivity)
2. Typo in status name
3. Custom status not in color mapping

**Solutions**:

```typescript
// 1. Check status value
console.log('Required Status:', requiredStatus);
console.log('Lowercase:', requiredStatus.toLowerCase());

// 2. Debug color mapping function
const getStatusBadgeClass = (status: string) => {
  const lower = status.toLowerCase();
  console.log('Checking status:', lower);
  
  if (lower.includes('beginner') || lower.includes('bronze')) {
    console.log('→ Orange/Amber');
    return 'from-orange-600 to-amber-700';
  }
  // ... rest of conditions
  
  console.log('→ Default purple');
  return 'from-purple-500 to-pink-600';
};

// 3. Add custom status colors in Sanity (optional)
// Add field to schema:
{
  name: 'statusColor',
  type: 'string',
  options: {
    list: [
      { title: 'Bronze', value: 'from-orange-600 to-amber-700' },
      { title: 'Silver', value: 'from-gray-400 to-gray-500' },
      // ...
    ]
  }
}
```

### Issue: Tournament doesn't update after Sanity edit

**Symptoms**: Changes in Sanity don't appear on frontend

**Possible Causes**:
1. CDN caching
2. Component doesn't refetch
3. Browser cache
4. Stale data

**Solutions**:

```typescript
// 1. Disable CDN for development
export const sanityClient = createClient({
  projectId: '...',
  dataset: '...',
  useCdn: false, // ← Set to false
});

// 2. Add manual refetch button
const [refetchKey, setRefetchKey] = useState(0);

useEffect(() => {
  fetchTournament();
}, [refetchKey]);

<button onClick={() => setRefetchKey(prev => prev + 1)}>
  Refresh Tournament
</button>

// 3. Clear browser cache
// Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

// 4. Use Sanity webhooks (advanced)
// Set up webhook in Sanity → trigger revalidation on change
```

---

## Summary

### Key Points

1. ✅ **Simplified Design** - Only essential tournament info displayed
2. ✅ **Singleton Pattern** - One active tournament at a time (recommended)
3. ✅ **Real-time Countdown** - Live JavaScript timer based on endDate
4. ✅ **External Registration** - Optional URL for tournament sign-ups
5. ✅ **Visual Consistency** - Matches ContentGrid amber/gold theme
6. ✅ **Responsive Layout** - Mobile: 1 column, Desktop: 2 columns
7. ✅ **Dynamic Badges** - Auto-colored based on status type

### What Claude/Developer Should Do

1. Create `tournament.ts` schema in Sanity
2. Deploy schema and create first tournament document
3. Set up image URL builder helper
4. Create GROQ query for fetching active tournament
5. Update `TournamentCard` or `HomePage` to fetch from Sanity
6. Test countdown, images, buttons, and data updates
7. Deploy to production

### Migration Checklist

- [ ] Sanity schema created and deployed
- [ ] First tournament document created and published
- [ ] Image URL builder configured
- [ ] GROQ query created
- [ ] Component updated to fetch from Sanity
- [ ] Countdown timer tested with real date
- [ ] External link tested (opens in new tab)
- [ ] Responsive design verified (mobile + desktop)
- [ ] Animations and hover effects working
- [ ] Data updates in Sanity reflect on frontend

---

**Last Updated**: January 2025  
**Version**: 1.0 (Simplified TournamentCard Design)
