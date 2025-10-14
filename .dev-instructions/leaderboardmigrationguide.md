# Complete Leaderboard Implementation Guide

**For Aca Jankovic Sanity CMS Project**

This guide provides comprehensive instructions for Claude (or any developer) to implement the complete Leaderboard page in your actual Sanity CMS-based project, including the new "How to Win Prizes" section and simplified leaderboard design.

---

## Table of Contents

1. [Overview](#overview)
2. [What's New](#whats-new)
3. [Sanity Schema Setup](#sanity-schema-setup)
4. [Component Architecture](#component-architecture)
5. [Implementation Steps](#implementation-steps)
6. [Static vs Dynamic Content](#static-vs-dynamic-content)
7. [Code Examples](#code-examples)
8. [Testing Checklist](#testing-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### Current State (Prototype)
The prototype uses **mock data** with a simplified leaderboard showing:
- Rank (1-10)
- Viewer Name
- Watch Time (formatted display)

It now includes a new **"How to Win Prizes"** section that explains:
- How viewers earn watch time (by watching on Kick)
- That top 10 viewers win prizes based on rank
- Includes a "Watch Aca on Kick" button

### Target State (Production)
Production will use **Sanity CMS** with:
- Simplified `leaderboardEntry` schema (5 essential fields only)
- Live data fetching via GROQ queries
- Real-time leaderboard updates
- Same "How to Win Prizes" section (static content)

---

## What's New

### 1. New "How to Win Prizes" Section

**Location**: Between page header and prize cards

**Features**:
- ✨ Explains how viewers can win prizes
- ✨ Clear instructions: "Watch Aca Jankovic on Kick"
- ✨ States top 10 viewers win based on watch time
- ✨ New "Watch Aca on Kick" button (opens https://kick.com/acajankovic)
- ✨ Amber gradient styling matching site theme

### 2. Simplified Leaderboard Data

**NEW Watch Time Format**: 
- Admin enters: `"2 Days, 5 Hours, 30 Minutes"`
- Displayed exactly as entered (no complex calculations in frontend)

**Removed Fields** (from Sanity schema):
- ❌ `avatarEmoji`
- ❌ `avatar` (image)
- ❌ `daysWatched`
- ❌ `avgDaily`
- ❌ `badge`
- ❌ `change`
- ❌ `watchtime` (old format)

### 3. Improved Visual Hierarchy

**New Section Order**:
1. Page Header (Top Viewers)
2. **NEW**: How to Win Prizes section
3. **NEW**: Prize Cards header ("Exclusive Prizes")
4. Prize Cards (4 cards for top 4 places)
5. Leaderboard List (top 10 viewers)

---

## Sanity Schema Setup

### New Simplified Schema

**File**: `schemas/leaderboardEntry.ts`

```typescript
export default {
  name: 'leaderboardEntry',
  title: 'Leaderboard Entry',
  type: 'document',
  fields: [
    {
      name: 'place',
      title: 'Place/Rank',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(100),
      description: 'Viewer rank position (1-10 for top viewers)',
    },
    {
      name: 'viewerName',
      title: 'Viewer Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
      description: 'Display name of the viewer',
    },
    {
      name: 'watchTimeDisplay',
      title: 'Watch Time Display',
      type: 'string',
      validation: (Rule) => 
        Rule.required().regex(
          /^\d+\s*Days?,\s*\d+\s*Hours?,\s*\d+\s*Minutes?$/i,
          {
            name: 'watchTimeFormat',
            invert: false,
          }
        ).error('Must be in format: "X Days, Y Hours, Z Minutes"'),
      description: 'Formatted watch time for display (e.g., "2 Days, 5 Hours, 30 Minutes")',
      placeholder: '2 Days, 5 Hours, 30 Minutes',
    },
    {
      name: 'watchTimeHours',
      title: 'Watch Time (Total Hours)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Total watch time in hours for sorting. Calculate: (Days × 24) + Hours + (Minutes ÷ 60)',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show/hide this entry on the leaderboard',
    },
  ],
  orderings: [
    {
      title: 'Place (Ascending)',
      name: 'placeAsc',
      by: [{ field: 'place', direction: 'asc' }],
    },
    {
      title: 'Watch Time (Descending)',
      name: 'watchTimeDesc',
      by: [{ field: 'watchTimeHours', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      place: 'place',
      title: 'viewerName',
      watchTimeDisplay: 'watchTimeDisplay',
      watchTimeHours: 'watchTimeHours',
      isActive: 'isActive',
    },
    prepare({ place, title, watchTimeDisplay, watchTimeHours, isActive }) {
      return {
        title: `#${place} - ${title}`,
        subtitle: `${watchTimeDisplay} (${watchTimeHours}h total) - ${isActive ? 'Active' : 'Hidden'}`,
      };
    },
  },
};
```

### Watch Time Calculation Helper

For Sanity Studio, create a custom component to help admins:

**File**: `components/WatchTimeCalculator.tsx`

```typescript
import React, { useState } from 'react';
import { Stack, Text, TextInput, Card } from '@sanity/ui';

export const WatchTimeCalculator = (props) => {
  const { value, onChange } = props;
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const calculateTotal = () => {
    return days * 24 + hours + minutes / 60;
  };

  const updateDisplay = () => {
    const display = `${days} Days, ${hours} Hours, ${minutes} Minutes`;
    onChange(display);
  };

  return (
    <Stack space={3}>
      <TextInput {...props} />
      
      <Card padding={3} tone="primary" radius={2}>
        <Stack space={3}>
          <Text size={1} weight="semibold">Watch Time Calculator</Text>
          
          <Stack space={2}>
            <TextInput
              type="number"
              placeholder="Days"
              value={days}
              onChange={(e) => setDays(parseInt(e.currentTarget.value) || 0)}
            />
            <TextInput
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(parseInt(e.currentTarget.value) || 0)}
            />
            <TextInput
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.currentTarget.value) || 0)}
            />
          </Stack>
          
          <button onClick={updateDisplay}>
            Set: "{days} Days, {hours} Hours, {minutes} Minutes"
          </button>
          
          <Text size={1}>
            Total: {calculateTotal().toFixed(2)} hours
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};
```

---

## Component Architecture

### File Structure

```
components/
├── pages/
│   └── Leaderboard.tsx          # Main leaderboard page component
├── leaderboard/
│   ├── HowToWinSection.tsx      # New: How to Win Prizes section (optional extraction)
│   ├── PrizeCard.tsx            # Prize display cards (top 4)
│   └── LeaderboardEntry.tsx     # Individual viewer entry (optional extraction)
└── ui/                          # ShadCN components (existing)
```

### Component Hierarchy

```
Leaderboard.tsx
├── Page Header (Top Viewers)
├── HowToWinSection (NEW)
│   ├── Title & Description
│   └── "Watch Aca on Kick" Button
├── Prize Cards Section (NEW header)
│   └── 4 × PrizeCard (places 1-4)
└── Leaderboard List
    └── 10 × LeaderboardEntry (places 1-10)
```

---

## Implementation Steps

### Step 1: Update Sanity Schema

1. **Backup existing data**
   ```bash
   # Export current leaderboard entries
   sanity dataset export production backup-leaderboard-$(date +%Y%m%d).tar.gz
   ```

2. **Update schema file**
   - Edit `schemas/leaderboardEntry.ts`
   - Copy new schema from [Sanity Schema Setup](#sanity-schema-setup)
   - Remove all old fields (avatar, badge, etc.)

3. **Deploy schema changes**
   ```bash
   sanity deploy
   ```

4. **Migrate existing data**
   - Run migration script (see below) to convert old format to new
   - Or manually update entries in Sanity Studio

### Step 2: Create Data Migration Script

**File**: `migrations/migrateLeaderboardData.ts`

```typescript
import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function migrateLeaderboardEntries() {
  // Fetch all existing entries
  const entries = await client.fetch(`*[_type == "leaderboardEntry"]`);

  console.log(`Found ${entries.length} entries to migrate`);

  for (const entry of entries) {
    // Calculate new watchTimeDisplay from watchTimeHours
    const totalHours = entry.watchTimeHours || 0;
    const days = Math.floor(totalHours / 24);
    const hours = Math.floor(totalHours % 24);
    const minutes = Math.round((totalHours % 1) * 60);

    const watchTimeDisplay = `${days} Days, ${hours} Hours, ${minutes} Minutes`;

    // Create new document with only essential fields
    const newEntry = {
      _id: entry._id,
      _type: 'leaderboardEntry',
      place: entry.place,
      viewerName: entry.viewerName,
      watchTimeDisplay,
      watchTimeHours: entry.watchTimeHours,
      isActive: entry.isActive ?? true,
    };

    // Update document (this replaces the entire document)
    await client
      .patch(entry._id)
      .set(newEntry)
      .commit();

    console.log(`✓ Migrated: #${entry.place} - ${entry.viewerName}`);
  }

  console.log('Migration complete!');
}

migrateLeaderboardEntries().catch(console.error);
```

Run with:
```bash
sanity exec migrations/migrateLeaderboardData.ts --with-user-token
```

### Step 3: Update GROQ Queries

**File**: `lib/sanity/queries.ts` (or wherever you store queries)

```typescript
// Simple query - fetch only what we need
export const leaderboardQuery = `
  *[_type == "leaderboardEntry" && isActive == true] 
  | order(place asc) [0...10] {
    _id,
    place,
    viewerName,
    watchTimeDisplay,
    watchTimeHours,
    isActive
  }
`;

// Alternative: With fallback for missing data
export const leaderboardQueryWithFallback = `
  *[_type == "leaderboardEntry" && isActive == true] 
  | order(place asc) [0...10] {
    _id,
    place,
    viewerName,
    "watchTimeDisplay": coalesce(watchTimeDisplay, "0 Days, 0 Hours, 0 Minutes"),
    "watchTimeHours": coalesce(watchTimeHours, 0),
    isActive
  }
`;
```

### Step 4: Update Leaderboard Component

Replace the mock data section with Sanity data fetching:

**File**: `components/pages/Leaderboard.tsx`

```typescript
'use client'; // If using Next.js App Router

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { sanityClient } from '@/lib/sanity/client';
import { leaderboardQuery } from '@/lib/sanity/queries';

// TypeScript interfaces
interface SanityLeaderboardEntry {
  _id: string;
  place: number;
  viewerName: string;
  watchTimeDisplay: string;
  watchTimeHours: number;
  isActive: boolean;
}

interface LeaderboardViewer {
  rank: number;
  name: string;
  watchTime: string;
}

export function Leaderboard() {
  const [viewers, setViewers] = useState<LeaderboardViewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Sanity
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        const data: SanityLeaderboardEntry[] = await sanityClient.fetch(leaderboardQuery);
        
        // Transform to component format
        const transformed = data.map((entry) => ({
          rank: entry.place,
          name: entry.viewerName,
          watchTime: entry.watchTimeDisplay,
        }));
        
        setViewers(transformed);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
    
    // Optional: Set up polling for live updates
    const interval = setInterval(fetchLeaderboard, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Rest of component (see full code below)...
}
```

### Step 5: Implement "How to Win Prizes" Section

Add the new section to your Leaderboard component:

```typescript
{/* How to Win Section - NEW */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.05 }}
  className="mb-8 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
>
  <div className="text-center mb-6">
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
      How to Win Prizes
    </h2>
    <div className="max-w-2xl mx-auto space-y-3 text-gray-300">
      <p className="text-base md:text-lg">
        Watch <span className="text-amber-400 font-bold">Aca Jankovic</span> live on{' '}
        <span className="text-green-400 font-bold">Kick</span> to earn watch time
      </p>
      <p className="text-base md:text-lg">
        The <span className="text-amber-400 font-bold">Top 10 viewers</span> with the most watch time will win exclusive prizes based on their rank
      </p>
      <p className="text-sm md:text-base text-gray-400">
        Keep watching to climb the leaderboard and win amazing rewards!
      </p>
    </div>
  </div>
  
  {/* Watch Button */}
  <div className="flex justify-center">
    <a 
      href="https://kick.com/acajankovic" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
    >
      <Trophy size={20} />
      Watch Aca on Kick
    </a>
  </div>
</motion.div>

{/* Prize Cards Header - NEW */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.08 }}
  className="text-center mb-6"
>
  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
    Exclusive Prizes
  </h3>
  <p className="text-gray-400 text-sm md:text-base">
    Top 4 viewers will receive these amazing rewards
  </p>
</motion.div>
```

### Step 6: Update Prize Cards (Optional)

If you want prize data from Sanity instead of hardcoded:

**New Schema**: `schemas/leaderboardPrize.ts`

```typescript
export default {
  name: 'leaderboardPrize',
  title: 'Leaderboard Prize',
  type: 'document',
  fields: [
    {
      name: 'place',
      title: 'Place',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(4),
    },
    {
      name: 'title',
      title: 'Prize Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Prize Value',
      type: 'string',
      description: 'e.g., "$1,000"',
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "Trophy", "Crown")',
      initialValue: 'Trophy',
    },
    {
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Gold', value: 'gold' },
          { title: 'Silver', value: 'silver' },
          { title: 'Bronze', value: 'bronze' },
          { title: 'Blue', value: 'blue' },
        ],
      },
    },
  ],
};
```

---

## Static vs Dynamic Content

### Static Content (Hardcoded in Component)

These elements don't change and should remain hardcoded:

✅ **"How to Win Prizes" Section**
- Title: "How to Win Prizes"
- Instructions text
- "Watch Aca on Kick" button
- Kick URL: `https://kick.com/acajankovic`

✅ **Page Header**
- "Top Viewers" title
- "Most dedicated viewers of Aca Jankovic on Kick • Updated live" subtitle

✅ **Prize Cards Header**
- "Exclusive Prizes" title
- "Top 4 viewers will receive these amazing rewards" subtitle

### Dynamic Content (Fetched from Sanity)

These elements come from Sanity CMS:

🔄 **Leaderboard Entries** (Required)
- `place` → rank
- `viewerName` → name
- `watchTimeDisplay` → watch time

🔄 **Prize Cards** (Optional - can be static or dynamic)
- Currently hardcoded in prototype
- Can be made dynamic with new `leaderboardPrize` schema (see Step 6)

---

## Code Examples

### Complete Leaderboard Component

**File**: `components/pages/Leaderboard.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown, Medal, Award } from 'lucide-react';
import { sanityClient } from '@/lib/sanity/client';
import { leaderboardQuery } from '@/lib/sanity/queries';

// Types
interface SanityLeaderboardEntry {
  _id: string;
  place: number;
  viewerName: string;
  watchTimeDisplay: string;
  watchTimeHours: number;
  isActive: boolean;
}

interface LeaderboardViewer {
  rank: number;
  name: string;
  watchTime: string;
}

interface PrizeData {
  place: number;
  title: string;
  value: string;
  icon: typeof Trophy;
  colorClass: string;
}

// Prize data (static or fetch from Sanity)
const prizes: PrizeData[] = [
  {
    place: 1,
    title: 'Grand Prize',
    value: '$1,000',
    icon: Crown,
    colorClass: 'from-amber-500 to-yellow-600',
  },
  {
    place: 2,
    title: 'Runner Up',
    value: '$500',
    icon: Trophy,
    colorClass: 'from-gray-400 to-gray-500',
  },
  {
    place: 3,
    title: 'Third Place',
    value: '$250',
    icon: Medal,
    colorClass: 'from-orange-600 to-amber-700',
  },
  {
    place: 4,
    title: 'Fourth Place',
    value: '$100',
    icon: Award,
    colorClass: 'from-blue-500 to-cyan-600',
  },
];

export function Leaderboard() {
  const [viewers, setViewers] = useState<LeaderboardViewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leaderboard data
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        const data: SanityLeaderboardEntry[] = await sanityClient.fetch(
          leaderboardQuery,
          {},
          { cache: 'no-store' } // Disable caching for real-time updates
        );

        // Transform data
        const transformed = data.map((entry) => ({
          rank: entry.place,
          name: entry.viewerName,
          watchTime: entry.watchTimeDisplay,
        }));

        setViewers(transformed);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();

    // Optional: Poll for updates every minute
    const interval = setInterval(fetchLeaderboard, 60000);
    return () => clearInterval(interval);
  }, []);

  // Helper functions
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 md:hidden text-yellow-400" />;
      case 2:
        return <Trophy className="w-8 h-8 md:hidden text-gray-400" />;
      case 3:
        return <Medal className="w-8 h-8 md:hidden text-orange-600" />;
      default:
        return null;
    }
  };

  const getRankIconDesktop = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="hidden md:block w-10 h-10 text-yellow-400" />;
      case 2:
        return <Trophy className="hidden md:block w-10 h-10 text-gray-400" />;
      case 3:
        return <Medal className="hidden md:block w-10 h-10 text-orange-600" />;
      default:
        return null;
    }
  };

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/10 to-amber-500/10 border-yellow-500/30';
      case 2:
        return 'from-gray-400/10 to-slate-400/10 border-gray-400/30';
      case 3:
        return 'from-orange-600/10 to-amber-600/10 border-orange-500/30';
      default:
        return 'from-gray-700/30 to-gray-800/30 border-gray-600/30';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-amber-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={40} className="text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              Top Viewers
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Most dedicated viewers of Aca Jankovic on Kick • Updated live
          </p>
        </motion.div>

        {/* How to Win Section - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              How to Win Prizes
            </h2>
            <div className="max-w-2xl mx-auto space-y-3 text-gray-300">
              <p className="text-base md:text-lg">
                Watch <span className="text-amber-400 font-bold">Aca Jankovic</span> live on{' '}
                <span className="text-green-400 font-bold">Kick</span> to earn watch time
              </p>
              <p className="text-base md:text-lg">
                The <span className="text-amber-400 font-bold">Top 10 viewers</span> with the most
                watch time will win exclusive prizes based on their rank
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Keep watching to climb the leaderboard and win amazing rewards!
              </p>
            </div>
          </div>

          {/* Watch Button */}
          <div className="flex justify-center">
            <a
              href="https://kick.com/acajankovic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
            >
              <Trophy size={20} />
              Watch Aca on Kick
            </a>
          </div>
        </motion.div>

        {/* Prize Cards Header - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-center mb-6"
        >
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
            Exclusive Prizes
          </h3>
          <p className="text-gray-400 text-sm md:text-base">
            Top 4 viewers will receive these amazing rewards
          </p>
        </motion.div>

        {/* Prize Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.place}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`bg-gradient-to-br ${prize.colorClass} p-4 md:p-6 rounded-xl border border-white/20 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <prize.icon className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 text-white" />
              <div className="text-xl md:text-3xl font-black text-white mb-1">
                {prize.place}
                {prize.place === 1 ? 'st' : prize.place === 2 ? 'nd' : prize.place === 3 ? 'rd' : 'th'}
              </div>
              <div className="text-xs md:text-sm text-white/90 mb-2">{prize.title}</div>
              <div className="text-lg md:text-2xl font-bold text-white">{prize.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 md:space-y-3"
        >
          {viewers.map((viewer, index) => (
            <motion.div
              key={viewer.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className={`bg-gradient-to-r ${getRankBgColor(
                viewer.rank
              )} border rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10`}
            >
              <div className="flex items-center justify-between gap-3 md:gap-6 px-4 md:px-8 py-3 md:py-5">
                {/* Rank */}
                <div className="flex items-center justify-center min-w-[60px] md:min-w-[80px]">
                  {viewer.rank <= 3 ? (
                    <>
                      {getRankIcon(viewer.rank)}
                      {getRankIconDesktop(viewer.rank)}
                    </>
                  ) : (
                    <span className="text-2xl md:text-3xl font-black text-gray-400">
                      #{viewer.rank}
                    </span>
                  )}
                </div>

                {/* Viewer Name */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-xl font-bold text-white truncate">
                    {viewer.name}
                  </h3>
                </div>

                {/* Watch Time */}
                <div className="text-right min-w-[120px] md:min-w-[180px]">
                  <div className="text-sm md:text-lg font-black text-amber-400">
                    {viewer.watchTime}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                    watch time
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {viewers.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No leaderboard entries yet. Start watching to appear here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Sanity Client Setup

**File**: `lib/sanity/client.ts`

```typescript
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
});

// For real-time updates (optional)
export const sanityClientRealtime = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Disable CDN for real-time
  perspective: 'published',
});
```

### Environment Variables

**File**: `.env.local`

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

---

## Testing Checklist

### Before Going Live

- [ ] **Sanity Schema Updated**
  - [ ] Old fields removed (avatar, badge, etc.)
  - [ ] New `watchTimeDisplay` field added
  - [ ] Validation rules working
  - [ ] Preview in Sanity Studio shows correct data

- [ ] **Data Migration Complete**
  - [ ] All existing entries converted to new format
  - [ ] Watch time format correct: "X Days, Y Hours, Z Minutes"
  - [ ] `watchTimeHours` calculated correctly
  - [ ] No data loss verified

- [ ] **Component Testing**
  - [ ] Leaderboard loads without errors
  - [ ] Data displays correctly (rank, name, watch time)
  - [ ] "How to Win Prizes" section visible
  - [ ] "Watch Aca on Kick" button works (opens correct URL)
  - [ ] Prize cards display correctly
  - [ ] Responsive on mobile and desktop
  - [ ] Loading state shows properly
  - [ ] Error state shows when Sanity is down

- [ ] **Real-time Updates**
  - [ ] Add new entry in Sanity → appears on site
  - [ ] Update existing entry → changes reflect on site
  - [ ] Set `isActive: false` → entry disappears
  - [ ] Polling interval working (if implemented)

- [ ] **Performance**
  - [ ] Page loads in < 2 seconds
  - [ ] No console errors
  - [ ] Images optimized
  - [ ] Animations smooth (60fps)

- [ ] **SEO & Accessibility**
  - [ ] Page title set correctly
  - [ ] Meta description added
  - [ ] Heading hierarchy correct (h1 → h2 → h3)
  - [ ] Links have proper `rel="noopener noreferrer"`
  - [ ] Color contrast meets WCAG standards

---

## Troubleshooting

### Issue: Leaderboard not loading

**Symptoms**: Loading spinner shows forever, or "Failed to load" error

**Possible Causes**:
1. Sanity client not configured
2. Wrong project ID or dataset
3. Network/CORS issues
4. No active entries in Sanity

**Solutions**:

```typescript
// 1. Check environment variables
console.log('Sanity Config:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
});

// 2. Test query in Sanity Vision
*[_type == "leaderboardEntry" && isActive == true] | order(place asc) [0...10]

// 3. Check CORS settings in Sanity
// Go to: https://www.sanity.io/manage
// Project Settings → API → CORS Origins
// Add your domain (e.g., http://localhost:3000)

// 4. Verify data exists
const count = await sanityClient.fetch(`count(*[_type == "leaderboardEntry" && isActive == true])`);
console.log('Active entries:', count);
```

### Issue: Watch time format incorrect

**Symptoms**: Shows "undefined", "NaN", or wrong format

**Possible Causes**:
1. Missing `watchTimeDisplay` field
2. Old data not migrated
3. Admin entered wrong format

**Solutions**:

```typescript
// 1. Check data in Sanity Vision
*[_type == "leaderboardEntry"][0] {
  watchTimeDisplay,
  watchTimeHours,
  _updatedAt
}

// 2. Add fallback in query
"watchTimeDisplay": coalesce(watchTimeDisplay, "0 Days, 0 Hours, 0 Minutes")

// 3. Validate format in component
if (!/^\d+ Days?, \d+ Hours?, \d+ Minutes?$/.test(entry.watchTimeDisplay)) {
  console.warn('Invalid watch time format:', entry.watchTimeDisplay);
}
```

### Issue: "How to Win Prizes" section not showing

**Symptoms**: Section missing or layout broken

**Possible Causes**:
1. Component code not updated
2. Tailwind classes not applied
3. Motion.js animation issues

**Solutions**:

```typescript
// 1. Check component structure
// Ensure <motion.div> for "How to Win" section is present
// Between page header and prize cards

// 2. Verify Tailwind classes
// Run: npm run build
// Check for any Tailwind purge issues

// 3. Test without animations
// Remove motion.div temporarily, use regular div
<div className="mb-8 bg-gradient-to-br from-amber-500/10...">
```

### Issue: Kick button not working

**Symptoms**: Button doesn't open Kick, or opens wrong URL

**Solutions**:

```typescript
// Check link attributes
<a 
  href="https://kick.com/acajankovic"  // ← Verify this URL
  target="_blank"                       // ← Opens in new tab
  rel="noopener noreferrer"             // ← Security
  className="..."
>
  Watch Aca on Kick
</a>

// Test in browser console
window.open('https://kick.com/acajankovic', '_blank');
```

### Issue: Real-time updates not working

**Symptoms**: New entries don't show without refresh

**Solutions**:

```typescript
// 1. Disable CDN for development
useCdn: false

// 2. Implement webhooks (advanced)
// Sanity webhook → API route → revalidate

// 3. Use Sanity Real-time (GROQ Listen)
import { listen } from '@sanity/client';

const subscription = sanityClient
  .listen(leaderboardQuery)
  .subscribe((update) => {
    console.log('Leaderboard updated:', update);
    // Refetch data
  });

// Cleanup
return () => subscription.unsubscribe();
```

### Issue: Migration script fails

**Symptoms**: Error when running migration script

**Solutions**:

```bash
# 1. Check Sanity token permissions
# Token needs "Editor" or "Administrator" role

# 2. Run with verbose logging
sanity exec migrations/migrateLeaderboardData.ts --with-user-token --verbose

# 3. Test on single document first
const testEntry = await client.fetch(`*[_type == "leaderboardEntry"][0]`);
console.log('Test entry:', testEntry);

# 4. Backup before migration
sanity dataset export production backup-$(date +%Y%m%d).tar.gz
```

---

## Summary

### Key Changes in This Implementation

1. ✅ **New "How to Win Prizes" Section**
   - Explains how viewers earn prizes
   - Includes "Watch Aca on Kick" button
   - Static content (no Sanity needed)

2. ✅ **Simplified Sanity Schema**
   - Only 5 fields: `place`, `viewerName`, `watchTimeDisplay`, `watchTimeHours`, `isActive`
   - Removed 7 unused fields: avatar, badge, daysWatched, etc.

3. ✅ **New Watch Time Format**
   - Admin enters: "X Days, Y Hours, Z Minutes"
   - Displayed exactly as entered
   - Numeric `watchTimeHours` for sorting

4. ✅ **Improved Visual Hierarchy**
   - Header → How to Win → Prize Cards → Leaderboard
   - Better spacing and transitions
   - Responsive design (mobile & desktop)

### What Claude/Developer Should Do

1. **Update Sanity schema** (`leaderboardEntry.ts`)
2. **Run data migration** (convert old format to new)
3. **Replace Leaderboard component** (use provided code)
4. **Test thoroughly** (use checklist)
5. **Deploy to production**

### Important Notes

- ⚠️ **Backup data before migration** - Schema changes are destructive
- 💡 **Test in development first** - Use a staging dataset
- 🔄 **Disable CDN during testing** - For real-time updates
- 🎨 **Keep static content static** - Don't put simple text in Sanity
- 📱 **Test on mobile** - Responsive design is critical

---

## Additional Resources

- [Sanity GROQ Query Reference](https://www.sanity.io/docs/groq)
- [Motion/React Documentation](https://motion.dev/docs/react-quick-start)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

**Last Updated**: January 2025  
**Version**: 2.0 (Complete Implementation with "How to Win" section)
