# TournamentCard Redesign Guide

**From Wide Horizontal Layout to Compact Vertical Grid**

Specification guide for updating the TournamentCard component from the old single-card horizontal layout to the new compact 2-column vertical grid design.

---

## Design Overview

### Old Design (Before)
- ❌ Single full-width horizontal card
- ❌ 2-column layout (image left, content right on desktop)
- ❌ Large dimensions and generous spacing
- ❌ Section wrapper inside TournamentCard component
- ❌ Button text: "JOIN TOURNAMENT"

### New Design (After)
- ✅ Compact vertical card (image top, content bottom)
- ✅ 2-column grid on desktop, 1-column on mobile
- ✅ Smaller, more efficient dimensions
- ✅ Section wrapper moved to HomePage component
- ✅ Button text: "JOIN NOW"
- ✅ Cards aligned with ContentGrid width system
- ✅ Multiple tournaments supported in grid

---

## Component Architecture Changes

### 1. TournamentCard Component

**Purpose Change:**
- **OLD**: Self-contained section with header + single card
- **NEW**: Reusable card component without section wrapper

**Structural Change:**
- **OLD**: Returns `<section>` → `<div max-w-5xl>` → `<motion.div>` → `<div grid md:grid-cols-2>`
- **NEW**: Returns `<motion.div>` → `<div flex flex-col h-full>`

**Layout Direction:**
- **OLD**: Horizontal split (image left, content right)
- **NEW**: Vertical stack (image top, content bottom)

### 2. HomePage Component

**New Responsibilities:**
- Add tournament section wrapper
- Create grid container for multiple cards
- Handle section header ("Featured Tournaments")
- Manage multiple tournament data (can map over array)

**Section Placement:**
- Insert between `<ContentGrid />` and `<Footer />`
- Use same width system as ContentGrid (`max-w-7xl`)
- Add section `id="events"` for MiddleBar navigation

---

## Design Specifications

### TournamentCard Component Specifications

#### Root Container
- **Element**: Motion wrapper div
- **Display**: Standard block element
- **Height**: `h-full` (fills grid cell)
- **Flexbox**: `flex flex-col` (vertical stacking)
- **Cursor**: `cursor-pointer`
- **Hover Animation**: Lift up 8px (`y: -8`), scale 1.02

#### Card Container (Inner)
- **Position**: `relative`
- **Background**: Gradient from gray-800/95 to gray-900/95 (top to bottom)
- **Border**: 2px solid amber-500/30, hover: amber-400/60
- **Border Radius**: 1rem (rounded-2xl)
- **Shadow**: xl shadow, hover: 2xl shadow with amber-500/20 glow
- **Overflow**: Hidden
- **Backdrop**: Blur medium
- **Display**: `flex flex-col`

#### Hover Accent Overlay
- **Position**: Absolute, covers entire card
- **Gradient**: Diagonal from amber-500/30 to yellow-500/30
- **Opacity**: 0 default, 20% on hover
- **Transition**: 500ms
- **Pointer Events**: None

#### Image Section
- **Position**: Relative
- **Height**: 
  - Mobile: 12rem (h-48 / 192px)
  - Desktop: 14rem (h-56 / 224px)
- **Overflow**: Hidden
- **Image Properties**:
  - Object fit: cover
  - Hover: Scale 1.10, brightness 1.10
  - Transition: 500ms
- **Dark Overlay**: Gradient from black/90 (bottom) via black/40 to transparent (top)

#### Prize Pool Badge (Top Left)
- **Position**: Absolute, top: 0.75rem, left: 0.75rem
- **Background**: Gradient from amber-500 to yellow-600
- **Text Color**: Black
- **Padding**: 0.625rem (x), 0.375rem (y)
- **Border Radius**: 0.5rem (rounded-lg)
- **Icon**: Trophy, size 14px
- **Text**: Font black, text-xs, tracking-wide
- **Gap**: 0.375rem between icon and text

#### Status Badge (Top Right)
- **Position**: Absolute, top: 0.75rem, right: 0.75rem
- **Background**: Gradient (color depends on status - see Status Colors section)
- **Text Color**: White
- **Padding**: 0.625rem (x), 0.375rem (y)
- **Border**: 1px solid white/20
- **Border Radius**: 0.5rem (rounded-lg)
- **Icon**: Shield, size 14px
- **Text**: Font bold, text-xs
- **Gap**: 0.375rem between icon and text

#### Content Section
- **Padding**: 
  - Mobile: 1rem (p-4)
  - Desktop: 1.25rem (p-5)
- **Display**: `flex flex-col`
- **Flex Grow**: 1 (fills remaining space)

#### Tournament Title
- **Font Size**: 
  - Mobile: text-base (1rem)
  - Desktop: text-lg (1.125rem)
- **Color**: White, hover: amber-400
- **Margin Bottom**: 
  - Mobile: 0.75rem
  - Desktop: 1rem
- **Line Clamp**: 2 lines maximum
- **Transition**: Colors, 300ms

#### Countdown Timer Container
- **Margin Bottom**: 
  - Mobile: 1rem
  - Desktop: 1.25rem
- **Flex Grow**: 1

#### Countdown Timer Header
- **Display**: Flex row
- **Gap**: 0.375rem
- **Margin Bottom**: 0.625rem
- **Icon**: Clock, size 14px, color: amber-400
- **Text**: "Ends in:", text-xs, color: gray-400

#### Countdown Grid
- **Grid**: 4 columns
- **Gap**: 
  - Mobile: 0.375rem
  - Desktop: 0.5rem

#### Countdown Cells
- **Container**:
  - Background: Gradient from gray-700/80 to gray-800/80
  - Border: 1px solid amber-500/20
  - Border Radius: 0.5rem (rounded-lg)
  - Padding: 
    - Mobile: 0.375rem (p-1.5)
    - Desktop: 0.5rem (p-2)
  - Shadow: lg
  - Backdrop: Blur sm
- **Number**:
  - Font Size: 
    - Mobile: text-base (1rem)
    - Desktop: text-lg (1.125rem)
  - Font Weight: Black
  - Color: amber-400
  - Animation: Scale 1.2 → 1, opacity 0.5 → 1 on change
- **Label**:
  - Font Size: 
    - Mobile: 9px
    - Desktop: 10px
  - Color: gray-500
  - Transform: Uppercase
  - Tracking: Wider
  - Margin Top: 0.25rem

#### Countdown Labels Text
- Use abbreviated labels: "Days", "Hrs", "Min", "Sec"

#### Join Button
- **Width**: Full (w-full)
- **Padding**: 
  - X: 1rem (px-4)
  - Y: 0.75rem mobile, 0.875rem desktop (py-3 md:py-3.5)
- **Background**: Gradient from amber-500 to yellow-600
- **Hover Background**: Gradient from amber-400 to yellow-500
- **Text Color**: Black
- **Font Weight**: Black
- **Font Size**: text-sm (0.875rem)
- **Border Radius**: 0.75rem (rounded-xl)
- **Shadow**: lg with amber-500/30, hover: xl with amber-500/50
- **Display**: Flex, center items and justify
- **Gap**: 0.5rem
- **Icon**: Trophy, size 16px
- **Text**: "JOIN NOW"
- **Hover**: Scale 1.05 on button, scale 1.05 on entire card hover
- **Transition**: All, 300ms

### HomePage Tournament Section Specifications

#### Section Container
- **Element**: `<section>` with `id="events"` (for navigation)
- **Padding**: 
  - Y: 1.5rem mobile, 2rem desktop (py-6 md:py-8)
- **Background**: Gradient from black to gray-900 (top to bottom)
- **Scroll Margin Top**: 8rem (for fixed header offset)

#### Width Container
- **Max Width**: 80rem (max-w-7xl / 1280px)
- **Margin**: Auto (centered)
- **Padding**: 
  - X: 1rem mobile, 2rem large screens (px-4 lg:px-8)

#### Section Header
- **Text Alignment**: Center
- **Margin Bottom**: 
  - Mobile: 1.5rem
  - Desktop: 2rem
- **Title**:
  - Font Size: text-3xl (1.875rem)
  - Font Weight: Bold
  - Gradient Text: from amber-400 to yellow-600
  - Margin Bottom: 0.5rem
- **Subtitle**:
  - Text: "Join the ultimate gaming competitions"
  - Color: gray-400

#### Tournament Grid
- **Grid Columns**:
  - Mobile: 1 column (grid-cols-1)
  - Small: 2 columns (sm:grid-cols-2)
  - Large: 2 columns (lg:grid-cols-2)
- **Gap**: 1rem (gap-4)
- **Max Width**: 48rem (max-w-3xl) - centers the 2-card grid
- **Margin**: Auto (centered within max-w-7xl container)

#### Tournament Data Structure
Support multiple tournaments (array mapping):
- Each tournament should have:
  - title (string)
  - image (URL string)
  - prizePool (string, e.g., "$50,000")
  - requiredStatus (string, e.g., "Platinum")
  - externalUrl (optional string)
  - endDate (Date object)

---

## Property Changes Summary

### Dimensions & Spacing

| Property | Old Value | New Value | Notes |
|----------|-----------|-----------|-------|
| **Image Height (Mobile)** | 16rem (h-64 / 256px) | 12rem (h-48 / 192px) | 25% reduction |
| **Image Height (Desktop)** | auto, min 18.75rem (300px) | 14rem (h-56 / 224px) | Fixed height |
| **Content Padding (Mobile)** | 1.5rem (p-6 / 24px) | 1rem (p-4 / 16px) | Tighter spacing |
| **Content Padding (Desktop)** | 2rem (p-8 / 32px) | 1.25rem (p-5 / 20px) | Tighter spacing |
| **Badge Padding X** | 0.75-1rem (responsive) | 0.625rem (px-2.5) | Consistent |
| **Badge Padding Y** | 0.375-0.5rem (responsive) | 0.375rem (py-1.5) | Consistent |
| **Countdown Cell Padding (Mobile)** | 0.625rem (p-2.5) | 0.375rem (p-1.5) | Smaller cells |
| **Countdown Cell Padding (Desktop)** | 0.75rem (p-3) | 0.5rem (p-2) | Smaller cells |
| **Countdown Grid Gap (Mobile)** | 0.5rem (gap-2) | 0.375rem (gap-1.5) | Tighter grid |
| **Countdown Grid Gap (Desktop)** | 0.75rem (gap-3) | 0.5rem (gap-2) | Tighter grid |

### Typography

| Element | Old Size | New Size | Notes |
|---------|----------|----------|-------|
| **Title (Mobile)** | text-xl (1.25rem) | text-base (1rem) | Smaller for compact design |
| **Title (Desktop)** | text-2xl (1.5rem) | text-lg (1.125rem) | Smaller for compact design |
| **Countdown Numbers (Mobile)** | text-xl (1.25rem) | text-base (1rem) | Proportional reduction |
| **Countdown Numbers (Desktop)** | text-2xl (1.5rem) | text-lg (1.125rem) | Proportional reduction |
| **Countdown Labels (Mobile)** | 10px | 9px | Micro text |
| **Countdown Labels (Desktop)** | text-xs (12px) | 10px | Micro text |
| **Button Text** | text-base (1rem) | text-sm (0.875rem) | Smaller button |
| **Section Header** | text-xl or text-2xl | text-3xl (1.875rem) | Match ContentGrid style |

### Icon Sizes

| Icon | Old Size | New Size | Notes |
|------|----------|----------|-------|
| **Badge Icons (Trophy/Shield)** | 16-18px (responsive) | 14px (all screens) | Consistent size |
| **Clock Icon** | 18px | 14px | Smaller |
| **Button Trophy Icon** | 18px | 16px | Proportional to button |

### Text Content

| Element | Old Text | New Text |
|---------|----------|----------|
| **Button** | "JOIN TOURNAMENT" | "JOIN NOW" |
| **Countdown Label** | "Hours" | "Hrs" |
| **Section Title** | "Featured Tournament" (singular) | "Featured Tournaments" (plural) |

### Colors & Gradients

| Element | Color Specification |
|---------|---------------------|
| **Card Background** | Gradient: gray-800/95 → gray-900/95 (top to bottom) |
| **Card Border** | amber-500/30 default, amber-400/60 on hover |
| **Card Shadow** | xl default, 2xl on hover with amber-500/20 glow |
| **Hover Accent** | Diagonal gradient: amber-500/30 → yellow-500/30, opacity 0 → 20% |
| **Image Overlay** | Gradient: black/90 (bottom) → black/40 → transparent (top) |
| **Prize Badge** | Gradient: amber-500 → yellow-600, text: black |
| **Status Badge** | Dynamic gradient based on status (see Status Colors), text: white, border: white/20 |
| **Countdown Cells** | Gradient: gray-700/80 → gray-800/80, border: amber-500/20 |
| **Button** | Gradient: amber-500 → yellow-600, hover: amber-400 → yellow-500, text: black |
| **Section Background** | Gradient: black → gray-900 (top to bottom) |

### Status Badge Colors

Dynamic gradients based on status value:
- **Beginner/Bronze**: orange-600 → amber-700
- **Silver**: gray-400 → gray-500
- **Gold**: yellow-400 → yellow-600
- **Platinum/Diamond**: cyan-400 → blue-500
- **Default/Other**: purple-500 → pink-600

---

## What to Preserve (Don't Change)

### ✅ Keep These Functional Parts Intact

1. **Countdown Logic**
   - `calculateTimeLeft()` function
   - `useEffect` timer interval
   - Time calculation formulas
   - State management for `timeLeft`

2. **Status Badge Color Function**
   - `getStatusBadgeClass()` logic
   - Status string matching (case-insensitive)
   - Gradient color mappings

3. **Button Click Handler**
   - `handleJoinClick()` function
   - External URL opening logic
   - Security attributes (noopener, noreferrer)

4. **Component Interface**
   - `TournamentCardProps` TypeScript interface
   - All prop types and optional properties
   - Default prop values

5. **Animation System**
   - Motion/Framer Motion usage
   - Animation transition patterns
   - Hover state logic

6. **Component Props/Functionality**
   - `title`, `image`, `prizePool`, `requiredStatus`, `externalUrl`, `endDate`
   - All existing functionality should work the same
   - Only visual presentation changes

---

## Layout Structure Diagrams

### Old Layout (Horizontal - Desktop)
```
Full Width Section
┌─────────────────────────────────────────────────────────────┐
│                   Featured Tournament                       │
│                                                             │
│  ┌──────────────┐  ┌──────────────────────────────────┐   │
│  │              │  │  Championship Series 2024        │   │
│  │              │  │                                  │   │
│  │    Image     │  │  Tournament ends in:             │   │
│  │   256-300px  │  │  [00] [00] [00] [00]            │   │
│  │    height    │  │  Days Hrs  Min  Sec             │   │
│  │              │  │                                  │   │
│  │  [$50,000]   │  │  [  JOIN TOURNAMENT BUTTON  ]   │   │
│  │              │  │                                  │   │
│  └──────────────┘  └──────────────────────────────────┘   │
│       50%                      50%                         │
└─────────────────────────────────────────────────────────────┘
```

### New Layout (Vertical - Desktop 2-Column Grid)
```
Full Width Section (max-w-7xl)
┌─────────────────────────────────────────────────────────────┐
│                  Featured Tournaments                       │
│                                                             │
│     ┌──────────────────┐       ┌──────────────────┐       │
│     │ ┌──────────────┐ │       │ ┌──────────────┐ │       │
│     │ │    Image     │ │       │ │    Image     │ │       │
│     │ │   224px      │ │       │ │   224px      │ │       │
│     │ │              │ │       │ │              │ │       │
│     │ │ [$50K] [Plat]│ │       │ │ [$10K] [Gold]│ │       │
│     │ └──────────────┘ │       │ └──────────────┘ │       │
│     │                  │       │                  │       │
│     │ Championship...  │       │ Weekend Showdown │       │
│     │                  │       │                  │       │
│     │ Ends in:         │       │ Ends in:         │       │
│     │ [00][00][00][00] │       │ [00][00][00][00] │       │
│     │                  │       │                  │       │
│     │ [  JOIN NOW  ]   │       │ [  JOIN NOW  ]   │       │
│     └──────────────────┘       └──────────────────┘       │
│            50%                        50%                  │
│     └─────────── max-w-3xl ──────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout (Both Designs Stack)
```
┌──────────────────┐
│ ┌──────────────┐ │
│ │    Image     │ │
│ │   192px      │ │
│ │              │ │
│ │ [$50K] [Plat]│ │
│ └──────────────┘ │
│                  │
│ Championship...  │
│                  │
│ Ends in:         │
│ [00][00][00][00] │
│                  │
│ [  JOIN NOW  ]   │
└──────────────────┘
        ↓
┌──────────────────┐
│ ┌──────────────┐ │
│ │    Image     │ │
│ │   192px      │ │
│ │              │ │
│ │ [$10K] [Gold]│ │
│ └──────────────┘ │
│                  │
│ Weekend Showdown │
│                  │
│ Ends in:         │
│ [00][00][00][00] │
│                  │
│ [  JOIN NOW  ]   │
└──────────────────┘
```

---

## Responsive Breakpoints

### Mobile (< 640px)
- 1 column grid
- Image height: `h-48` (192px)
- Content padding: `p-4`
- Countdown padding: `p-1.5`
- Font sizes: smaller values

### Desktop (≥ 640px)
- 2 columns grid
- Image height: `h-56` (224px)
- Content padding: `p-5`
- Countdown padding: `p-2`
- Font sizes: larger values

### Container Alignment
- Outer container: `max-w-7xl` (matches ContentGrid)
- Inner grid: `max-w-3xl` (centers 2 cards)
- This ensures tournament cards align with game cards above

---

## Testing Checklist

After making changes, verify:

- [ ] Component compiles without errors
- [ ] 2 tournament cards display side-by-side on desktop
- [ ] Cards stack vertically on mobile
- [ ] Countdown timer ticks every second
- [ ] All badges display correctly (Prize Pool, Required Status)
- [ ] Status badge colors match status type
- [ ] "JOIN NOW" button opens external URL
- [ ] Hover animations work (lift, scale, brightness)
- [ ] Cards align with ContentGrid width above
- [ ] Section has correct `id="events"` for MiddleBar navigation
- [ ] Images load properly
- [ ] Title truncates with `line-clamp-2` if too long
- [ ] Responsive design works at all breakpoints

---

## Implementation Notes

### Grid System
- Tournament section must use same width container as ContentGrid (`max-w-7xl`)
- Tournament grid itself should be centered with `max-w-3xl mx-auto`
- This creates alignment: game cards grid width ≈ tournament cards grid width

### Responsive Breakpoints
Use Tailwind's standard breakpoints:
- Base (mobile): < 640px - 1 column
- `sm:` (≥ 640px) - 2 columns
- `lg:` (≥ 1024px) - 2 columns (no change, maintains 2 columns)

### Section ID
The tournament section MUST have `id="events"` for MiddleBar navigation to work correctly.

### Multiple Tournaments
The new design supports showing multiple tournaments (typically 2):
- HomePage should manage tournament data (array)
- Map over tournaments to create multiple TournamentCard instances
- Each card receives individual tournament data as props

### Animation Delays
Consider staggering card animations:
- Card 1: delay 0.2s
- Card 2: delay 0.25s or 0.3s
- Creates smoother entrance effect

### Image Aspect Ratios
Tournament images should ideally be landscape orientation (16:9 or similar) to look good at h-48/h-56 heights.

### Text Truncation
Title should use `line-clamp-2` to prevent overflow with long tournament names while maintaining card height consistency.

---

## Quick Reference Checklist

When implementing this redesign, ensure:

### TournamentCard.tsx Changes
- [ ] Remove `<section>` wrapper from component (returns `<motion.div>` directly)
- [ ] Change layout from horizontal grid to vertical flex column
- [ ] Update image height: h-48 (mobile), h-56 (desktop)
- [ ] Update content padding: p-4 (mobile), p-5 (desktop)
- [ ] Reduce all badge sizes (icons: 14px, padding: px-2.5 py-1.5)
- [ ] Update title font size: text-base (mobile), text-lg (desktop)
- [ ] Add `line-clamp-2` to title
- [ ] Reduce countdown cell sizes and gaps
- [ ] Update countdown numbers: text-base (mobile), text-lg (desktop)
- [ ] Update countdown labels: 9px (mobile), 10px (desktop)
- [ ] Shorten button text to "JOIN NOW"
- [ ] Update button icon size to 16px
- [ ] Add `h-full` and `flex flex-col` to card container
- [ ] Preserve all countdown logic and functions

### HomePage.tsx Changes
- [ ] Import `motion` from 'motion/react'
- [ ] Create tournament data array (2 tournaments)
- [ ] Add `<section id="events">` between ContentGrid and Footer
- [ ] Section has: `py-6 md:py-8 bg-gradient-to-b from-black to-gray-900 scroll-mt-32`
- [ ] Outer container: `max-w-7xl mx-auto px-4 lg:px-8`
- [ ] Section header with motion animation
- [ ] Header title: "Featured Tournaments" (plural), text-3xl, font-bold
- [ ] Header subtitle: "Join the ultimate gaming competitions"
- [ ] Tournament grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-3xl mx-auto`
- [ ] Map tournaments to TournamentCard components

### Visual Verification
- [ ] 2 cards side-by-side on desktop (≥640px)
- [ ] Cards stack vertically on mobile (<640px)
- [ ] Tournament cards align with ContentGrid width
- [ ] All badges display correctly
- [ ] Countdown timer ticks every second
- [ ] Button opens external URL
- [ ] Hover animations work (lift, scale, brightness)
- [ ] Cards have equal heights in grid
- [ ] Images maintain aspect ratio

### Functional Verification
- [ ] Section `id="events"` works with MiddleBar navigation
- [ ] All existing props still work
- [ ] External URL opens in new tab
- [ ] Countdown logic functions correctly
- [ ] Status badge colors match status type
- [ ] Title truncates if too long

---

## Summary

### Core Changes

**Architectural:**
- Component: Remove section wrapper, make reusable card
- HomePage: Add section wrapper, create grid layout
- Support: Multiple tournaments instead of single card

**Visual:**
- Layout: Horizontal split → Vertical stack
- Size: ~30% reduction in all dimensions
- Grid: 2 cards side-by-side on desktop
- Alignment: Match ContentGrid width system

**Spacing Reductions:**
- Image: 256-300px → 192-224px
- Content padding: 24-32px → 16-20px
- Typography: All sizes reduced by ~1 step
- Countdown: Cells and gaps reduced

**Text Changes:**
- Button: "JOIN TOURNAMENT" → "JOIN NOW"
- Section: "Featured Tournament" → "Featured Tournaments"
- Labels: "Hours" → "Hrs"

### Files to Modify
1. **TournamentCard.tsx**: Make compact, remove wrapper
2. **HomePage.tsx**: Add section, create grid

### Design Goals Achieved
✅ Compact cards fit 2 per row  
✅ Aligned with ContentGrid width  
✅ Maintains all functionality  
✅ Responsive mobile/desktop  
✅ Consistent amber/gold theme  
✅ Professional, efficient layout  

---

**Last Updated**: January 2025  
**Version**: 2.0 (Specification-Based Redesign Guide)
