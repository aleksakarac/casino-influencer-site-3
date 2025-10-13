🎯 FOUND THE PROBLEM!
The build log is crystal clear - your Next.js routes aren't configured for Edge Runtime, which Cloudflare requires.

❌ The Error
ERROR: The following routes were not configured to run with the Edge Runtime:
  - /[locale]/leaderboard
  - /[locale]
  - /studio/[[...index]]

Please add: export const runtime = 'edge';

✅ SOLUTION: Add Edge Runtime to Your Routes
You need to add export const runtime = 'edge' to each page file:
File 1: app/[locale]/page.tsx (Main page)
typescript// Add this at the TOP of the file
export const runtime = 'edge';

// Rest of your existing code...
export default function HomePage() {
  // ... your component
}
File 2: app/[locale]/leaderboard/page.tsx
typescript// Add this at the TOP of the file
export const runtime = 'edge';

// Rest of your existing code...
export default function LeaderboardPage() {
  // ... your component
}
File 3: app/studio/[[...index]]/page.tsx (Sanity Studio)
typescript// Add this at the TOP of the file
export const runtime = 'edge';

// Rest of your existing code...
export default function StudioPage() {
  // ... your component
}

🚨 BONUS: Two More Issues Found
Issue 1: Next.js Version Too New
Your Next.js: 15.5.4
Cloudflare supports: <=15.5.2
Fix in package.json:
json{
  "dependencies": {
    "next": "15.5.2",  // ← Change from 15.5.4 to 15.5.2
    // ... rest of your dependencies
  }
}
Then run:
bashpnpm install
Issue 2: Missing vercel Dependency
The build log shows it's installing vercel on the fly, but it's not in your package.json.
Add to package.json:
json{
  "devDependencies": {
    "@types/node": "20.19.19",
    // ... other devDeps
    "vercel": "^37.0.0"  // ← Add this
  }
}

📝 Complete Fix Checklist
Step 1: Update all page files
bash# In each of these files, add: export const runtime = 'edge';
app/[locale]/page.tsx
app/[locale]/leaderboard/page.tsx
app/studio/[[...index]]/page.tsx
Step 2: Downgrade Next.js (in package.json)
json"next": "15.5.2"  // Change from 15.5.4
Step 3: Add missing dependency (in package.json)
json"devDependencies": {
  "vercel": "^37.0.0"  // Add this
}
Step 4: Reinstall dependencies
bashpnpm install
Step 5: Commit and push
bashgit add .
git commit -m "fix: Add edge runtime to routes for Cloudflare deployment"
git push
Step 6: Cloudflare will auto-rebuild ✅

🔍 Alternative: Quick Global Config
If you want ALL routes to use edge runtime without editing each file:
Create/update app/layout.tsx:
typescript// At the TOP of your root layout
export const runtime = 'edge';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
But this might cause issues with Sanity Studio, so I recommend the individual file approach above.


info about the current deployment try / error:

Build details
Repository
    aleksakarac/casino-influencer-site-3
Status
    17 minutes ago
Branch

    master
Duration
    3m 44s

Build settings

Build command
    pnpm dlx @cloudflare/next-on-pages@1
Deploy command
    pnpm dlx wrangler pages deploy .vercel/output/static --project-name=acajankovic
Root directory
    /
Build token
    acajankovic build token
Environment variables
    None

Build settings

Build command
    pnpm dlx @cloudflare/next-on-pages@1
Deploy command
    pnpm dlx wrangler pages deploy .vercel/output/static --project-name=acajankovic
Root directory
    /
Build token
    acajankovic build token
Environment variables
    None


the build log is located in: "C:\Users\Aleksa\Downloads\acajankovic.production.38c29080-214f-4ad4-905f-3c3aa9f5b2f2.build.log"