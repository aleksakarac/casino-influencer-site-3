Please send this response to Claude Code:

Response to Claude Code: Complete Navigation Bar & Page Structure Requirements
Current State Analysis
You're correct - the site currently has:

Header (logo + language toggle)
MiddleBar component (but it needs complete refactoring)
Hero carousel, GameGrid, TournamentGrid
Footer with social links

What's Changing: The MiddleBar Component Needs Complete Rebuild
The existing MiddleBar is NOT what we need. We're replacing it with a NEW navigation system.

1. PERSISTENT LAYOUT STRUCTURE
Layout Architecture
Create a layout where these 3 sections never unmount when navigating between pages:
// app/layout.tsx structure
<html>
  <body>
    {/* PERSISTENT - Always visible on all pages */}
    <HeroCarousel /> 
    
    {/* PERSISTENT - Always visible on all pages */}
    <MiddleBar /> {/* ← This is the NEW component we're building */}
    
    {/* DYNAMIC - Changes based on route */}
    {children} {/* This renders either landing page OR leaderboard page */}
    
    {/* PERSISTENT - Always visible on all pages */}
    <Footer /> {/* Social links section */}
  </body>
</html>

Key Point: When user navigates from / to /leaderboard, the carousel, middle bar, and footer stay mounted in the DOM. Only the {children} area changes.

2. NEW NAVIGATION ARCHITECTURE (MiddleBar Component)
Replace Current MiddleBar With This New Design
The new MiddleBar has 5 navigation buttons (not the current Games/Tournaments/Rewards sections):
┌──────────────────────────────────────────────────────────────────────┐
│  [↗ VAVADA]  [🏠 Pokupi bonuse]  [🏆 Rang lista]  [📅 Turniri]  [🔗 Social] │
└──────────────────────────────────────────────────────────────────────┘

Button 1: VAVADA

Icon: External link icon (↗)
Color: Cyan (#00BCD4)
Action: Open external link in new tab
Link Source: Fetch from Sanity CMS field vavadaRefLink
Code:

<a 
  href={vavadaRefLink} 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-cyan-400"
>
  ↗ VAVADA
</a>

Button 2: Pokupi Bonuse (Claim Bonuses)

Icon: Home icon
Color: Orange (#FFA500)
Action:

If on / (landing page): Scroll to game cards section
If on /leaderboard: Navigate to / THEN scroll to game cards


Active State: Highlighted when user is viewing game cards section on landing page
Implementation Pattern:

const handleClick = () => {
  if (pathname === '/leaderboard') {
    router.push('/#games')
  } else {
    scrollToSection('games')
  }
}

Button 3: Rang Lista (Leaderboard)

Icon: Trophy icon
Color: White/Purple
Action: Navigate to /leaderboard
Active State: Purple background + underline when pathname === '/leaderboard'
Code:

<button 
  onClick={() => router.push('/leaderboard')}
  className={pathname === '/leaderboard' ? 'bg-purple-600 border-b-4' : ''}
>
  🏆 Rang lista
</button>

Button 4: Turniri (Tournaments)

Icon: Calendar icon
Color: Orange (#FFA500)
Action:

If on / (landing page): Scroll to tournaments section
If on /leaderboard: Navigate to / THEN scroll to tournaments


Active State: Highlighted when user is viewing tournaments section on landing page

Button 5: Social

Icon: Link icon
Color: Green (#00FF88)
Action: Scroll to footer (social links) on current page

Does NOT change routes
Works on both landing and leaderboard pages


Never shows active state


3. ACTIVE STATE DETECTION
How to Determine Which Button is Active

// Pseudo-logic for active button
if (pathname === '/leaderboard') {
  activeButton = 'rang-lista'
} else if (pathname === '/' && gamesSection.isVisible) {
  activeButton = 'pokupi-bonuse'
} else if (pathname === '/' && tournamentsSection.isVisible) {
  activeButton = 'turniri'
} else {
  activeButton = null
}

Implement with Intersection Observer
Use Intersection Observer API to detect which section is in viewport:

// hooks/useActiveSection.ts
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id) // 'games' or 'tournaments'
          }
        })
      },
      { threshold: 0.5 }
    )
    
    const gamesEl = document.getElementById('games-section')
    const tournamentsEl = document.getElementById('tournaments-section')
    
    if (gamesEl) observer.observe(gamesEl)
    if (tournamentsEl) observer.observe(tournamentsEl)
    
    return () => observer.disconnect()
  }, [])
  
  return activeSection
}

Then in MiddleBar:

const pathname = usePathname()
const activeSection = useActiveSection()

const activeButton = 
  pathname === '/leaderboard' ? 'rang-lista' :
  activeSection === 'games' ? 'pokupi-bonuse' :
  activeSection === 'tournaments' ? 'turniri' : null

  4. LEADERBOARD PAGE REQUIREMENTS
Create New Route: /leaderboard
File: app/leaderboard/page.tsx
Content:

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">
          🏆 Top Viewers
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Most dedicated viewers of Aca Jankovic on Kick • Updated live
        </p>
        <div className="text-4xl font-semibold text-gray-300">
          Coming Soon
        </div>
      </div>
    </div>
  )
}

Key Points:

Same background styling as landing page
Centered "Coming Soon" text
Eventually will be replaced with real leaderboard data
Uses the same persistent layout (carousel, middle bar, footer remain visible)


5. ROUTING & NAVIGATION BEHAVIOR
URL Structure

Landing Page: /
Leaderboard: /leaderboard

Browser History

Back/forward buttons should work normally
Each route change adds to history stack
No SPA hash-only navigation

Cross-Page Scroll Navigation
When user clicks "Pokupi Bonuse" or "Turniri" from /leaderboard:
Approach 1: URL Hash

// In button click handler
router.push('/#games') // or '/#tournaments'

// In landing page component
useEffect(() => {
  const hash = window.location.hash.slice(1)
  if (hash === 'games') {
    setTimeout(() => scrollToSection('games'), 100)
  } else if (hash === 'tournaments') {
    setTimeout(() => scrollToSection('tournaments'), 100)
  }
}, [])


Approach 2: Router Events

// Use router.events or useEffect with pathname dependency
useEffect(() => {
  const scrollTarget = sessionStorage.getItem('scrollTarget')
  if (scrollTarget) {
    setTimeout(() => scrollToSection(scrollTarget), 100)
    sessionStorage.removeItem('scrollTarget')
  }
}, [pathname])

// In button handler
const handleClick = () => {
  sessionStorage.setItem('scrollTarget', 'games')
  router.push('/')
}

Choose whichever approach you prefer - both work.

6. SANITY CMS INTEGRATION
Add New Field to Site Settings
File: sanity/schemas/siteSettings.ts (or wherever your settings schema is)

{
  name: 'siteSettings',
  type: 'document',
  fields: [
    // ... existing fields (logo, social links, etc.)
    {
      name: 'vavadaRefLink',
      title: 'Vavada Referral Link',
      type: 'url',
      description: 'Your Vavada casino referral link (will open in new tab)',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      })
    }
  ]
}


Fetch in MiddleBar Component

// In MiddleBar.tsx
const { data: settings } = useLiveQuery({
  query: `*[_type == "siteSettings"][0]{ vavadaRefLink }`,
})

const vavadaLink = settings?.vavadaRefLink || '#'

7. VISUAL STYLING REQUIREMENTS
Active Button Style

className={`
  px-6 py-3 rounded-full
  transition-all duration-150
  ${isActive ? 'bg-purple-600 border-b-4 border-purple-400' : ''}
  hover:scale-105 hover:brightness-110
`}

Button Colors

Vavada: text-cyan-400
Pokupi Bonuse: text-orange-500
Rang Lista: text-white (purple when active)
Turniri: text-orange-500
Social: text-green-400

Background

Dark navy container: bg-[#1A1F2E]
Height: h-20
Flexbox: flex items-center justify-around


8. IMPLEMENTATION STEPS
Step 1: Update Layout

// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <HeroCarousel />
        <MiddleBar /> {/* NEW COMPONENT */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

Step 2: Create New MiddleBar

Delete old MiddleBar content
Create 5 new buttons as specified above
Implement active state logic
Add Sanity integration for Vavada link

Step 3: Create Leaderboard Page

Create app/leaderboard/page.tsx
Add "Coming Soon" content
Test navigation from landing page

Step 4: Add Scroll Logic

Implement Intersection Observer hook
Add scroll navigation functions
Test cross-page navigation + scroll

Step 5: Test Everything

Test all 5 buttons on both pages
Verify active states
Test browser back/forward
Ensure carousel/bar/footer never remount


SUMMARY: What You Need to Do

Refactor MiddleBar component - Replace current content with 5 new navigation buttons
Update app/layout.tsx - Ensure carousel, MiddleBar, and Footer are persistent
Create /leaderboard page - Simple "Coming Soon" page
Implement active state detection - Use Intersection Observer for section visibility
Add Sanity field - vavadaRefLink in site settings
Implement scroll navigation - Handle cross-page navigation with scrolling

The key difference from what exists: The MiddleBar is now a navigation component, not a section showcase. It controls routing and scrolling behavior across the entire site.
Does this clarify everything? Ready to implement?