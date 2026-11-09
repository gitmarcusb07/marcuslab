# MarcusLab

Premium interactive portfolio for Marcus Scout at [marcuslab.in](https://marcuslab.in).

Orange / electric-blue / white / red identity on deep navy, a cinematic Three.js hero, a floating character card, real project screenshots, and a fully responsive layout with motion that respects `prefers-reduced-motion`.

## Stack

- Next.js 16.4.5 (App Router, Turbopack), React 19.3.0, TypeScript 5
- Tailwind CSS v4
- Three.js 0.187.0, React Three Fiber 9.8.2, Drei 10.7.9
- GSAP 3.15.1, Framer Motion 14.10.1, Lucide React 0.570.0

## Project structure

```
marcuslab/
├── src/
│   ├── app/                  # Routes, metadata, SEO files
│   │   ├── layout.tsx        # Root layout, fonts, metadata
│   │   ├── page.tsx          # Home page (all sections + JSON-LD)
│   │   ├── not-found.tsx     # Custom 404
│   │   ├── sitemap.ts        # Sitemap generator
│   │   ├── robots.ts         # Robots.txt generator
│   │   ├── manifest.ts       # Web app manifest
│   │   ├── opengraph-image.tsx  # Generated OG image
│   │   └── icon.svg          # Favicon / app icon
│   ├── components/
│   │   ├── hero/             # Three.js hero canvas + orbital scene
│   │   ├── layout/           # Navbar, Footer, PageChrome, LoadingScreen, BackgroundAudio, BackToTop
│   │   ├── sections/         # Hero, About, Projects, Technologies, Exploring, Beyond, Socials, Contact
│   │   └── ui/               # Reveal, Magnetic, TiltCard, SectionHeading, Marquee, OrbitalMark, SocialIcon
│   ├── data/                 # Centralised content
│   │   ├── site-config.ts    # Nav, hero copy, SEO, footer
│   │   ├── profile.ts        # Name, bio, email, facts, portrait
│   │   ├── projects.ts       # Four real projects, filters, counts
│   │   ├── socials.ts        # GitHub, Reddit, X, Discord, Instagram, Spotify, Moctale
│   │   ├── technologies.ts   # 33 verified tools in five categories
│   │   ├── interests.ts      # Beyond Code + Currently Exploring
│   │   └── index.ts          # Data barrel export
│   ├── hooks/                # useMediaQuery, useReducedMotion, useScrollProgress, etc.
│   ├── lib/                  # Utilities (cn, clipboard, WebGL detection, smooth scroll)
│   └── globals.css           # Design tokens, utilities, keyframes
├── public/
│   ├── audio/
│   │   └── background-music.mp3
│   ├── images/
│   │   ├── character/avatar.jpg
│   │   ├── projects/hikmah-noor.png
│   │   ├── projects/marcivo.png
│   │   ├── projects/quran-wall-screen.png
│   │   ├── projects/quran-wall-icon.png
│   │   ├── projects/watch-later-screen.png
│   │   ├── projects/watch-later-icon.png
│   │   └── logo.png
│   └── ...
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Local development

```bash
cd marcuslab
npm install
npm run dev
```

Open <http://localhost:3000>. The 3D hero loads only on desktop-sized viewports with WebGL and is replaced by the illustrated fallback everywhere else.

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Editing content

All site copy lives in `src/data/`. The UI components read from these files, so content changes never require touching layout code.

| File | What it controls |
|------|------------------|
| `src/data/profile.ts` | Name, bio, email, location, facts, portrait |
| `src/data/site-config.ts` | Navigation, hero copy, SEO, footer |
| `src/data/projects.ts` | Project cards, filters, previews, stacks, links |
| `src/data/socials.ts` | Social accounts and destinations |
| `src/data/technologies.ts` | Toolbox categories and tools |
| `src/data/interests.ts` | Beyond Code and Currently Exploring items |

Every project entry, technology and social destination in the current build was verified against the supplied project folders or accounts. Project names, statuses and stacks are not demo content.

### Project previews

- `public/images/projects/hikmah-noor.png` — live-site screenshot.
- `public/images/projects/marcivo.png` — live-site screenshot.
- `public/images/projects/quran-wall-screen.png` and `quran-wall-icon.png` — real app screen and icon.
- `public/images/projects/watch-later-screen.png` and `watch-later-icon.png` — real app screen and icon.

### Quran Wall link

The direct Google Play listing for Quran Wall returned **HTTP 404** when checked. The card therefore links to a Google Play search for “Quran Wall” instead of a dead package URL. Replace the `href` in `src/data/projects.ts` if a working listing URL becomes available.

### Character artwork

`public/images/character/avatar.jpg` is the AI-created One Piece avatar supplied for the site. It appears in the hero and About section. One Piece is a personal fan interest; MarcusLab is not affiliated with the series or its rights holders.

## Background music

The track lives at `public/audio/background-music.mp3` and starts at the **47-second** cue. Browsers block audible autoplay before a visitor interacts with the page, so the player:

1. starts the track muted so it can run immediately;
2. tries to unmute right away;
3. unmutes on the first tap, click or key press anywhere on the page;
4. exposes a visible pause/resume control;
5. seeks back to 47 seconds when the track ends instead of using native `loop`.

The control sits bottom-right on phones and bottom-left from the `sm` breakpoint up, so it never covers the hero avatar.

## Deployment

The production build has been verified locally. Public deployment and DNS are **not configured yet**.

### Vercel

1. Push the repository to GitHub.
2. Import it at <https://vercel.com>.
3. Keep the detected Next.js preset: build `npm run build`, install `npm install`.
4. Deploy.

### Custom domain: marcuslab.in

1. In Vercel, open **Project Settings → Domains**.
2. Add `marcuslab.in` and optionally `www.marcuslab.in`.
3. Create the DNS records Vercel shows at the registrar:
   - **A record** for `marcuslab.in` → Vercel's A record IP.
   - **CNAME** for `www` → `cname.vercel-dns.com`.
4. Wait for propagation; Vercel provisions SSL automatically.

## Accessibility & performance

- Semantic landmarks, skip-friendly anchors, keyboard-accessible nav and mobile menu.
- `prefers-reduced-motion`: loader hidden, 3D canvas disabled, marquee/chip/gradient animations stopped.
- 3D scene is desktop-only, DPR-capped, and pauses when the hero is off-screen or the tab is hidden.
- Project images are lazy-loaded; the first preview is eager.
- Music never blocks the page: the CSS loader is independent of JavaScript and auto-hides.
- Palette contrast checked against the supplied brand colours.

## SEO

- Per-page title, description, Open Graph and Twitter metadata.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`.
- Canonical URL `https://marcuslab.in`.
- JSON-LD `Person` structured data on the home page.
- Generated 1200 × 630 Open Graph image.

## QA

- `npm run build` passes with TypeScript checks.
- Playwright checks cover desktop (1440 × 900), mobile (390 × 844) and reduced-motion contexts.
- Verified: no console errors, no horizontal overflow, working filters, working music pause/resume from the 47-second cue, and the full-height mobile hero.

## Remaining launch tasks

1. Configure the hosting project and point `marcuslab.in` at it.
2. Replace the Quran Wall search link if a working direct Play Store URL becomes available.
3. Commit and push the repository.

---

Built with Next.js · Three.js · TypeScript · Tailwind CSS.
