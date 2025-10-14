# Leaderboard Points System Implementation Guide

**From Watch Time to Points-Based Ranking**

Comprehensive specification guide for converting the leaderboard from a watch time display system to a points-based ranking system where the streamer calculates and manages viewer points.

---

## Table of Contents

1. [Overview](#overview)
2. [Design Changes](#design-changes)
3. [Data Model Changes](#data-model-changes)
4. [UI Specifications](#ui-specifications)
5. [Sanity CMS Backend Changes](#sanity-cms-backend-changes)
6. [Implementation Steps](#implementation-steps)
7. [Points Calculation Guidelines](#points-calculation-guidelines)
8. [Testing Checklist](#testing-checklist)
9. [Migration from Watch Time](#migration-from-watch-time)

---

## Overview

### Current System (Watch Time)
- ❌ Display shows viewer watch time (e.g., "1,247h" or "2 Days, 5 Hours, 30 Minutes")
- ❌ Watch time calculated automatically from streaming platform
- ❌ Direct correlation between time watched and ranking
- ❌ Limited flexibility in ranking adjustments

### New System (Points)
- ✅ Display shows viewer points (e.g., "12,470 points")
- ✅ Points manually calculated and entered by streamer in Sanity CMS
- ✅ Points based on watch time but allow for bonuses, multipliers, events
- ✅ Streamer has full control over point allocation
- ✅ More engaging and gamified system

### Why Points System?

**Benefits:**
1. **Flexibility**: Streamer can award bonus points for special events, milestones, interactions
2. **Gamification**: Points feel more game-like and engaging than raw hours
3. **Control**: Streamer can adjust rankings without direct watch time data access
4. **Simplicity**: Easier to understand large point values than time formats
5. **Events**: Can run point multiplier events or challenges

---

## Design Changes

### Visual Changes

#### 1. Data Display Format

**OLD - Watch Time Display:**
- Format: Hours with "h" suffix (e.g., "1,247h")
- Alternative: Formatted time string (e.g., "2 Days, 5 Hours, 30 Minutes")
- Label: "watch time" or "WATCH TIME"

**NEW - Points Display:**
- Format: Numeric points with thousand separators (e.g., "12,470")
- No suffix needed (points speak for themselves)
- Label: "points" or "POINTS"

#### 2. Text Content Changes

**Section Subtitle:**
- OLD: "Most dedicated viewers of Aca Jankovic on Kick • Updated live"
- NEW: "Top ranked viewers based on earned points • Updated live"

**How to Win Section:**
- OLD: "Watch Aca Jankovic live on Kick to earn watch time"
- NEW: "Watch Aca Jankovic live on Kick to earn points"

- OLD: "The Top 10 viewers with the most watch time will win..."
- NEW: "The Top 10 viewers with the most points will win..."

**Data Labels:**
- OLD: "watch time" / "WATCH TIME"
- NEW: "points" / "POINTS"

#### 3. Visual Styling (Unchanged)

Keep all visual styling exactly the same:
- ✅ Amber-400 color for numbers
- ✅ Font sizes: text-lg md:text-2xl for numbers
- ✅ Font weight: font-black
- ✅ Label style: text-[10px] md:text-xs, gray-500, uppercase
- ✅ Number formatting with comma separators
- ✅ Right-aligned display
- ✅ Same spacing and layout

---

## Data Model Changes

### Component Interface

**OLD TypeScript Interface:**
```typescript
interface LeaderboardViewer {
  rank: number;
  name: string;
  watchTime: number;        // Hours as number
  // OR
  watchTime: string;        // Formatted string
}
```

**NEW TypeScript Interface:**
```typescript
interface LeaderboardViewer {
  rank: number;
  name: string;
  points: number;           // Points as integer
}
```

### Data Properties

**Points Field:**
- **Type**: Integer/Number
- **Range**: 0 to unlimited (typically 0 - 1,000,000)
- **Format**: Whole numbers only (no decimals)
- **Display**: With thousand separators (e.g., 12,470)
- **Validation**: Must be non-negative integer

---

## UI Specifications

### Points Display Component

#### Container
- **Min Width**: 
  - Mobile: 100px (min-w-[100px])
  - Desktop: 140px (min-w-[140px])
- **Alignment**: Right (text-right)

#### Points Number
- **Font Size**: 
  - Mobile: text-lg (1.125rem)
  - Desktop: text-2xl (1.5rem)
- **Font Weight**: Black (font-black)
- **Color**: amber-400
- **Format**: `points.toLocaleString()` (adds commas)
- **Example**: 12470 → "12,470"

#### Points Label
- **Text**: "points" (lowercase)
- **Font Size**: 
  - Mobile: 10px (text-[10px])
  - Desktop: text-xs (12px)
- **Color**: gray-500
- **Transform**: Uppercase (uppercase)
- **Letter Spacing**: Wider (tracking-wider)
- **Margin Top**: 0.125rem (mt-0.5)

### Leaderboard Entry Example Structure

```
┌────────────────────────────────────────────────────┐
│  [Icon]    Viewer Name              12,470         │
│   #1      SrpskiVojnik              POINTS         │
└────────────────────────────────────────────────────┘
```

### Number Formatting

**JavaScript Implementation:**
- Use `.toLocaleString()` method
- Automatically adds thousand separators based on locale
- Examples:
  - 1247 → "1,247"
  - 12470 → "12,470"
  - 124700 → "124,700"
  - 1247000 → "1,247,000"

---

## Sanity CMS Backend Changes

### Schema Modifications

#### Old Schema (Watch Time Based)

**Fields:**
- `watchTimeDisplay` (string): "X Days, Y Hours, Z Minutes"
- `watchTimeHours` (number): Total hours for sorting
- Problem: Two fields needed, complex format, tied to time

#### New Schema (Points Based)

**Essential Field:**
- `points` (number): Single integer field for points

**Field Specifications:**
```typescript
{
  name: 'points',
  title: 'Viewer Points',
  type: 'number',
  validation: Rule => Rule.required().integer().min(0),
  description: 'Total points earned by the viewer. Points are calculated based on watch time and other activities.'
}
```

**Additional Recommended Fields:**
- `place` (number): Rank position (1-10)
- `viewerName` (string): Display name
- `isActive` (boolean): Show/hide toggle
- `_createdAt` (automatic): Creation timestamp
- `_updatedAt` (automatic): Last update timestamp

### Complete Simplified Schema

```typescript
{
  name: 'leaderboardEntry',
  title: 'Leaderboard Entry',
  type: 'document',
  fields: [
    {
      name: 'place',
      title: 'Rank/Place',
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
      name: 'points',
      title: 'Points',
      type: 'number',
      validation: Rule => Rule.required().integer().min(0),
      description: 'Total points earned (based on watch time and bonuses)'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show/hide this entry on the leaderboard'
    }
  ],
  preview: {
    select: {
      place: 'place',
      name: 'viewerName',
      points: 'points',
      isActive: 'isActive'
    },
    prepare({ place, name, points, isActive }) {
      return {
        title: `#${place} - ${name}`,
        subtitle: `${points.toLocaleString()} points • ${isActive ? 'Active' : 'Hidden'}`
      }
    }
  }
}
```

### Removed Fields

These fields from the old watch time system are **no longer needed**:
- ❌ `watchTimeDisplay` (string)
- ❌ `watchTimeHours` (number)
- ❌ `daysWatched` (number)
- ❌ `avgDaily` (number)

### GROQ Query Changes

**OLD Query (Watch Time):**
```
*[_type == "leaderboardEntry" && isActive == true] 
| order(place asc) [0...10] {
  _id,
  place,
  viewerName,
  watchTimeDisplay,
  watchTimeHours,
  isActive
}
```

**NEW Query (Points):**
```
*[_type == "leaderboardEntry" && isActive == true] 
| order(place asc) [0...10] {
  _id,
  place,
  viewerName,
  points,
  isActive
}
```

**Alternative - Sort by Points:**
```
*[_type == "leaderboardEntry" && isActive == true] 
| order(points desc) [0...10] {
  _id,
  place,
  viewerName,
  points,
  isActive
}
```

### Sanity Studio Enhancements

#### Custom Input Component (Optional)

Create a custom input that shows point calculation helper:

**Features:**
- Shows approximate conversion from hours (e.g., "10 points per hour")
- Calculator for common scenarios
- Visual feedback on point ranges

**Example Display:**
```
Points: [12470]

Quick Calculator:
- 100 hours × 10 pts/hr = 1,000 points
- Bonus multiplier (2x weekend): +1,000 points
- Special event bonus: +500 points
Total: 2,500 points
```

#### Bulk Point Management

Add custom actions in Sanity Studio:
- **Add Bonus Points**: Add X points to selected viewers
- **Multiply Points**: Apply multiplier to all/selected entries
- **Reset Points**: Clear all points (with confirmation)
- **Import from CSV**: Bulk update points from spreadsheet

---

## Implementation Steps

### Step 1: Update Sanity Schema

1. **Backup Current Data**
   - Export all leaderboard entries
   - Save backup with timestamp
   - Keep for rollback if needed

2. **Modify Schema File**
   - Open `schemas/leaderboardEntry.ts` (or similar)
   - Remove `watchTimeDisplay` and `watchTimeHours` fields
   - Add `points` field with validation
   - Update preview function to show points
   - Deploy schema changes

3. **Migration Script** (if needed)
   - Convert existing watch time to points
   - Example: 1 hour = 10 points
   - Run migration on all entries
   - Verify data integrity

### Step 2: Update Component Interface

1. **TypeScript Interface**
   - Change `watchTime` property to `points`
   - Update type from `string | number` to `number`
   - Ensure proper typing throughout component

2. **Mock Data** (for prototype)
   - Update example data to use points
   - Use realistic point values (4-5 digits typical)
   - Maintain same rank order

### Step 3: Update UI Components

#### Leaderboard Page Header

**Subtitle Text:**
- Locate subtitle element
- Change from: "Most dedicated viewers..."
- Change to: "Top ranked viewers based on earned points • Updated live"

#### How to Win Section

**First Paragraph:**
- Change "earn watch time" → "earn points"

**Second Paragraph:**
- Change "most watch time" → "most points"

#### Leaderboard Entries

**Display Label:**
- Find watch time label
- Change from: "watch time" → "points"
- Keep same styling (uppercase, gray-500)

**Display Value:**
- Change property from `watchTime` to `points`
- Keep `.toLocaleString()` formatting
- Remove any time-specific suffixes (h, hours, etc.)

### Step 4: Update Data Fetching

1. **GROQ Query**
   - Update query to fetch `points` instead of watch time fields
   - Maintain same sorting logic (by place or by points desc)

2. **Data Transformation**
   - Map Sanity data to component interface
   - Transform: `sanity.points` → `component.points`
   - No complex formatting needed (just number)

3. **Error Handling**
   - Add validation for points field
   - Handle missing/null points (default to 0)
   - Type checking for number values

### Step 5: Testing

Run through complete testing checklist (see Testing section below)

### Step 6: Deploy

1. Deploy Sanity schema changes
2. Update frontend code
3. Clear CDN cache if applicable
4. Monitor for errors

---

## Points Calculation Guidelines

### Recommended Point Allocation System

#### Base Points (Watch Time)

**Conversion Rate Examples:**
- **10 points per hour**: Good starting point
  - 1 hour = 10 points
  - 10 hours = 100 points
  - 100 hours = 1,000 points
  - 1,000 hours = 10,000 points

- **Alternative: 1 point per minute**
  - 1 hour = 60 points
  - 10 hours = 600 points
  - 100 hours = 6,000 points

#### Bonus Point Categories

**Engagement Bonuses:**
- Chat participation: +5-50 points per stream
- Subscriptions: +500-1,000 points
- Gift subs: +100 points per gift
- Raids joined: +50-200 points
- Tournaments participated: +100-500 points

**Time-Based Bonuses:**
- Weekend streams: 2x multiplier
- Late night streams: 1.5x multiplier
- Marathon streams (4+ hours): +500 bonus
- Anniversary streams: 3x multiplier

**Milestone Bonuses:**
- First 10 viewers: +1,000 points
- Watched 100+ streams: +5,000 points
- 1 year subscriber: +10,000 points

**Event Bonuses:**
- Special tournaments: +1,000 points
- Community challenges: +500-2,000 points
- Seasonal events: 2x multiplier week

### Manual Point Management

**How Streamer Manages Points:**

1. **Track Watch Time**
   - Use Kick analytics
   - Export viewer watch time reports
   - Calculate base points (hours × rate)

2. **Apply Bonuses**
   - Review engagement metrics
   - Add bonus points for special activities
   - Document bonus reasons (optional)

3. **Update Sanity**
   - Log into Sanity Studio
   - Find viewer entry
   - Update points field
   - Publish changes

4. **Regular Updates**
   - Weekly or bi-weekly updates recommended
   - End of month leaderboard resets (optional)
   - Announce point updates to viewers

### Point Ranges Guide

**Typical Point Values:**
- Top 1st place: 10,000 - 50,000 points
- Top 3 (podium): 5,000 - 20,000 points
- Top 10: 2,000 - 10,000 points
- Active viewers: 500 - 5,000 points
- New viewers: 0 - 500 points

**Adjust based on:**
- Streaming frequency (daily vs weekly)
- Community size
- How long leaderboard has been running
- Point inflation over time

---

## Testing Checklist

### UI Display Tests

- [ ] Points display correctly formatted with comma separators
- [ ] Points numbers are amber-400 color
- [ ] "points" label displays in lowercase
- [ ] Label is gray-500 and uppercase styled
- [ ] Font sizes match design (text-lg md:text-2xl for numbers)
- [ ] Font weight is black for numbers
- [ ] Right alignment maintained
- [ ] Mobile and desktop responsive sizing works

### Content Text Tests

- [ ] Page subtitle updated to "Top ranked viewers based on earned points"
- [ ] "How to Win" section mentions "earn points"
- [ ] "How to Win" section mentions "most points"
- [ ] All "watch time" references changed to "points"
- [ ] No time-related text remains (hours, days, etc.)

### Data Integration Tests

- [ ] Sanity schema updated with points field
- [ ] GROQ query fetches points successfully
- [ ] Data transforms correctly from Sanity to component
- [ ] Points sort correctly (highest to lowest)
- [ ] Points display for all 10 leaderboard positions
- [ ] isActive filter works (hides inactive entries)

### Functional Tests

- [ ] Leaderboard loads without errors
- [ ] Points update when changed in Sanity
- [ ] Large point values display correctly (100,000+)
- [ ] Zero points display correctly (0)
- [ ] Missing points default to 0 or show placeholder
- [ ] Decimal points are NOT displayed (integer only)

### Edge Cases

- [ ] Very large numbers: 1,000,000+ points
- [ ] Zero points: 0 points
- [ ] Single digit: 5 points (no comma)
- [ ] Three digits: 999 points (no comma)
- [ ] Four digits: 1,000 points (comma appears)
- [ ] Negative numbers rejected (validation)
- [ ] Decimal numbers converted to integers

### Sanity Studio Tests

- [ ] Can create new leaderboard entry with points
- [ ] Can edit existing entry points
- [ ] Points field validates (integer, non-negative)
- [ ] Preview shows points correctly
- [ ] Can sort entries by points in Studio
- [ ] Can bulk update points (if implemented)

### Responsive Design

- [ ] Mobile (< 768px): Points display fits, readable
- [ ] Tablet (768px - 1024px): Layout maintains integrity
- [ ] Desktop (> 1024px): Full design displays correctly
- [ ] Points don't overflow container
- [ ] Label stays below number

---

## Migration from Watch Time

### Data Conversion Strategy

#### Option 1: Simple Hour-Based Conversion

**Formula:** `points = watchTimeHours × 10`

**Example:**
- 1,247 hours → 12,470 points
- 1,182 hours → 11,820 points
- 1,095 hours → 10,950 points

**Pros:**
- Simple and automatic
- Maintains exact ranking order
- Easy to explain to viewers

**Cons:**
- No flexibility for bonuses
- Purely watch time based

#### Option 2: Tiered Conversion with Bonuses

**Base Formula:** `points = watchTimeHours × 10`
**Plus Bonuses:**
- Top 3 viewers: +2,000 bonus points
- Long-time subscribers: +1,000 bonus points
- Active chat participants: +500 bonus points

**Pros:**
- Rewards multiple factors
- More engaging system
- Recognizes different contributions

**Cons:**
- Requires manual review
- More complex to calculate

#### Option 3: Fresh Start

**Strategy:** Start points at 0 for all viewers

**Implementation:**
- Announce new points system
- Everyone starts from zero
- Build points from launch date forward
- Previous rankings acknowledged but reset

**Pros:**
- Clean slate
- No conversion issues
- Creates excitement for new system

**Cons:**
- Loses historical data
- May upset top viewers
- Requires clear communication

### Migration Script Template

**Purpose:** Convert existing watch time data to points

**Process:**
1. Fetch all active leaderboard entries
2. For each entry:
   - Read `watchTimeHours` value
   - Calculate points: `watchTimeHours × 10`
   - Round to nearest integer
   - Update entry with points value
3. Verify all entries converted
4. Archive old watch time fields
5. Deploy new schema

**Rollback Plan:**
- Keep backup of original data
- Test on staging environment first
- Have rollback script ready
- Monitor for 24-48 hours after migration

---

## Communication to Viewers

### Announcement Template

**Subject:** 🎮 New Leaderboard Points System!

**Message:**
```
Big changes coming to the viewer leaderboard! 🎉

OLD SYSTEM: Rankings based on watch time hours
NEW SYSTEM: Rankings based on POINTS

What does this mean?
✅ Earn points by watching streams
✅ Bonus points for chat activity, subs, and special events
✅ More ways to climb the leaderboard!
✅ Same prizes for Top 10 viewers

How to earn points:
- Watch streams: 10 points per hour
- Chat participation: Bonus points
- Special events: 2x-3x multiplier
- Tournaments: Bonus points

Your current position? We've converted your watch time to points!
- 100 hours = 1,000 points
- Keep watching to earn more!

Questions? Ask in chat! Let's go! 🏆
```

### FAQ for Viewers

**Q: How are points calculated?**
A: Base points are earned by watching streams (approximately 10 points per hour). Bonus points are awarded for engagement, special events, and milestones.

**Q: Did I lose my watch time?**
A: No! Your watch time has been converted to points. Your ranking stays the same.

**Q: Can I see my point history?**
A: Points are updated regularly by the streamer based on streaming platform analytics.

**Q: When do points reset?**
A: [Streamer decision: monthly, seasonally, or never]

**Q: How do I earn more points?**
A: Watch streams regularly, participate in chat, join tournaments, and look out for special point multiplier events!

---

## Best Practices

### For Streamers

1. **Consistency**: Update points regularly (weekly/bi-weekly)
2. **Transparency**: Explain point system clearly to viewers
3. **Documentation**: Keep notes on bonus point allocations
4. **Communication**: Announce point updates in streams
5. **Fairness**: Apply bonus points consistently across viewers
6. **Events**: Run point multiplier events to boost engagement
7. **Milestones**: Celebrate when viewers hit point milestones

### For Developers

1. **Validation**: Always validate points as non-negative integers
2. **Performance**: Index points field in Sanity for fast sorting
3. **Caching**: Consider CDN caching for leaderboard data
4. **Real-time**: If needed, implement webhooks for live updates
5. **Logging**: Log point changes for audit trail
6. **Backup**: Regular backups of leaderboard data
7. **Monitoring**: Alert on unusual point values or changes

### For Designers

1. **Clarity**: Make points prominently visible
2. **Formatting**: Always use thousand separators
3. **Consistency**: Keep same visual style across all point displays
4. **Feedback**: Show point animations when values update (optional)
5. **Context**: Always include "points" label for clarity
6. **Accessibility**: Ensure point values are readable at all sizes

---

## Troubleshooting

### Issue: Points not displaying

**Symptoms:** Leaderboard shows blank/undefined where points should be

**Solutions:**
1. Check Sanity query includes `points` field
2. Verify data transformation maps `points` correctly
3. Ensure default value (0) for missing points
4. Check TypeScript interface has `points: number`
5. Console log fetched data to inspect structure

### Issue: Points showing decimals

**Symptoms:** Points display as "12,470.5"

**Solutions:**
1. Add validation in Sanity schema: `.integer()`
2. Use `Math.floor()` or `Math.round()` in component
3. Update database entries to remove decimals
4. Add formatter: `Math.floor(points).toLocaleString()`

### Issue: Comma separators not working

**Symptoms:** Points show as "12470" instead of "12,470"

**Solutions:**
1. Ensure using `.toLocaleString()` method
2. Check locale settings (may need locale parameter)
3. Alternative: Use Intl.NumberFormat
4. Verify variable is number type, not string

### Issue: Points not sorting correctly

**Symptoms:** Leaderboard order is wrong

**Solutions:**
1. Check GROQ query sort order: `order(points desc)`
2. Verify points field is number type, not string
3. Alternative: Sort in component after fetching
4. Check for null/undefined points (exclude or default to 0)

### Issue: Large numbers overflow

**Symptoms:** Points text breaks layout on very large values

**Solutions:**
1. Test with 7-8 digit numbers (1,000,000+)
2. Adjust container min-width if needed
3. Consider abbreviations for very large numbers (10K, 1M)
4. Set max-width with text truncation
5. Use responsive font sizes

### Issue: Schema migration failed

**Symptoms:** Error updating Sanity schema or data loss

**Solutions:**
1. Restore from backup
2. Check schema validation errors in Sanity CLI
3. Deploy schema before running migration
4. Test migration on single entry first
5. Review Sanity Studio schema inspector

---

## Summary

### Key Changes

**Data Model:**
- watchTime (hours/formatted) → points (integer)
- Simplified from 2 fields to 1 field
- Manual entry by streamer vs automatic calculation

**UI Text:**
- "watch time" → "points"
- "earn watch time" → "earn points"
- "most watch time" → "most points"
- Subtitle updated to mention points

**Display:**
- Remove time suffixes (h, hours)
- Display as integer with commas
- Same styling and positioning

**Backend:**
- Update Sanity schema: add `points` field, remove watch time fields
- Update GROQ queries: fetch `points` instead of watch time
- Points manually managed in Sanity Studio

### Implementation Priority

**Phase 1 - Core Changes:**
1. Update Sanity schema
2. Migrate existing data to points
3. Update GROQ queries
4. Update component interface

**Phase 2 - UI Updates:**
1. Change display labels
2. Update text content
3. Remove time formatting
4. Test number formatting

**Phase 3 - Enhancements:**
1. Add point calculation helpers in Sanity
2. Implement bulk point management
3. Create point history (optional)
4. Add point animations (optional)

### Success Criteria

✅ All "watch time" references changed to "points"  
✅ Points display as integers with comma separators  
✅ Sanity schema updated and deployed  
✅ Data migrated successfully  
✅ GROQ queries fetch points field  
✅ UI displays points correctly on all devices  
✅ Ranking order maintained correctly  
✅ Streamer can update points in Sanity Studio  
✅ No console errors or broken functionality  
✅ Viewers can see and understand new points system  

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**System**: Points-Based Leaderboard Ranking
