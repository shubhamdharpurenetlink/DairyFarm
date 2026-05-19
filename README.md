# Laxmi Dairy Farm — Bilingual PWA

A modern, mobile-first, bilingual (English / Hindi) Progressive Web App for **Laxmi Dairy Farm** — built with Next.js 15, Ant Design v5, SCSS Modules, and Framer Motion.

> **Phase 1** (this branch): UI only with comprehensive dummy data. No backend, no real auth.
> **Phase 2** (next): Supabase backend, real auth, admin CRUD, email notifications. See [`docs/phase-2-roadmap.md`](./docs/phase-2-roadmap.md).

---

## Tech stack

| Layer | Tech |
| --- | --- |
| Framework | **Next.js 15** (App Router, TypeScript, React 18) |
| UI Library | **Ant Design v5** + `@ant-design/nextjs-registry` (SSR) |
| Styling | **SCSS Modules** with a custom design system |
| Animations | **Framer Motion** v11 |
| i18n | **next-intl** v3 (`en` + `hi` with locale-prefixed routes) |
| State | **Zustand** (drawer, PWA prompt, compare list) |
| Forms | **React Hook Form** + **Zod** validation |
| Icons | **lucide-react** + `@ant-design/icons` |
| PWA | **@ducanh2912/next-pwa** (manifest, SW, install prompt) |

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server (http://localhost:3000)
npm run dev

# 3. Production build & start
npm run build
npm run start

# 4. Type-check
npm run type-check
```

PWA features (service worker, install prompt) are **disabled in development** and active in production builds.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout (html/body, fonts, AntdRegistry, theme)
│   ├── manifest.ts                # PWA manifest
│   └── [locale]/
│       ├── layout.tsx             # NextIntlClientProvider
│       ├── (public)/              # Public site (with Header/Footer/BottomNav)
│       │   ├── layout.tsx
│       │   ├── page.tsx           # Home
│       │   ├── about/
│       │   ├── cows/[slug]/
│       │   ├── cow-care/[slug]/
│       │   ├── gallery/
│       │   ├── training/[slug]/
│       │   └── contact/
│       ├── (admin)/               # Admin shell (no public chrome)
│       │   └── admin/
│       │       ├── page.tsx       # Login
│       │       └── dashboard/
│       └── offline/               # PWA offline fallback
├── components/
│   ├── layout/                    # Header, Footer, MobileBottomNav, LanguageToggle
│   ├── shared/                    # SectionHeader, AnimatedSection, StatCounter, PWAInstallPrompt
│   ├── home/                      # Hero, Features, OurStory, BreedsCarousel, ...
│   ├── about/                     # AboutHero, FounderMessage, Timeline, Facilities, Team, Awards
│   ├── cows/                      # CowsListing, BreedCard, CowDetail, CompareModal
│   ├── care/                      # CareListing, DiseaseDetail
│   ├── gallery/                   # GalleryView, Lightbox
│   ├── training/                  # TrainingList, TrainingDetail, EnrollmentForm
│   ├── contact/                   # ContactPage, ContactForm, WhatsAppFAB
│   └── admin/                     # AdminLogin, AdminDashboard (with sidebar + tables)
├── data/                          # Dummy data (cows, diseases, trainings, gallery, team, ...)
├── i18n/
│   ├── routing.ts                 # Locale routing config
│   ├── request.ts                 # Server-side message loader
│   └── messages/{en,hi}.json      # All translatable strings
├── lib/
│   ├── antd-theme.ts              # AntD ConfigProvider tokens
│   └── animations.ts              # Framer Motion variants
├── store/useUIStore.ts            # Zustand store (persisted)
├── styles/
│   ├── _variables.scss            # Design tokens (colors, spacing, radius, shadows)
│   ├── _mixins.scss               # Responsive + typography mixins
│   ├── _animations.scss           # @keyframes
│   └── globals.scss               # Reset + base typography + utilities
└── types/index.ts                 # Shared TypeScript types
```

---

## Design system at a glance

| Token | Value |
| --- | --- |
| Primary green | `#2E7D5B` |
| Primary dark | `#1E5A40` |
| Accent cream | `#F5E6C8` |
| Accent gold | `#C9A56A` |
| Background | `#FAFAF7` |
| Surface | `#FFFFFF` |
| Border radius | `4 / 8 / 12 / 16 / 24` |
| Shadow scale | `xs → xl` (subtle green tint) |
| Headings | Poppins |
| Body | Inter + Hind (Devanagari) |
| Breakpoints | xs `480` · sm `768` · md `1024` · lg `1280` · xl `1440` |

---

## Pages (Phase 1)

1. **Home** — Hero (video bg) → Features (4) → Our Story + stats → Breeds carousel → Knowledge preview → Training preview → Testimonials → Newsletter.
2. **About** — Hero → Founder's message → Timeline (40 years) → Facilities (6) → Team (6) → Awards (4).
3. **Cows** — Filter chips (indigenous / exotic / crossbreed) + grid + compare modal (up to 3).
4. **Cow Detail** — Gallery + stats + tabs (Characteristics, History, Temperament, Suitability).
5. **Cow Care** — Search + category filter + disease cards.
6. **Disease Detail** — Hero image + summary + symptoms / causes / prevention / treatment steps + disclaimer.
7. **Gallery** — Tabs (Photos masonry + Videos grid + 360 tour coming soon) + custom lightbox.
8. **Training** — Stats banner + filter + program cards.
9. **Training Detail** — Two-column with description / syllabus / what's included / instructor + sticky enrollment form (RHF + Zod).
10. **Contact** — 5 info cards + form (RHF + Zod) + OpenStreetMap embed + WhatsApp FAB.
11. **Admin Login** — Bilingual form with "Phase 2" notice.
12. **Admin Dashboard** — AntD Layout with sider menu + stats cards + dummy CRUD tables (Cows, Diseases, Trainings, Enrollments, Messages).
13. **Offline** — PWA fallback page.

---

## i18n (English + Hindi)

- Routes are locale-prefixed: `/` (English default), `/hi/...` (Hindi).
- Locale switcher in the header (`EN / हि`).
- All UI strings live in [`src/i18n/messages/en.json`](src/i18n/messages/en.json) and [`hi.json`](src/i18n/messages/hi.json).
- Data files (cows, diseases, trainings) carry bilingual fields (`{ en, hi }`) so swap-in of real content keeps both languages in sync.

---

## PWA features

- `public/manifest.webmanifest` (generated from `src/app/manifest.ts`).
- Auto-generated service worker via `@ducanh2912/next-pwa` (disabled in dev).
- Pretty install prompt (`PWAInstallPrompt`) appears 6 s after first visit on supported browsers.
- Offline fallback at `/en/offline` (or `/hi/offline`).
- Theme color `#2E7D5B`; safe-area inset support for iOS notch / Android gesture bar.
- Mobile bottom nav (home / cows / training / contact) like a native app.

---

## Replacing dummy data

Most content is in [`src/data/`](src/data/):

- `site.ts` — farm name / tagline / address / phone / email / stats.
- `cows.ts` — all breed details (8 breeds shipped).
- `diseases.ts` — knowledge hub articles (9 shipped).
- `trainings.ts` — programs (6 shipped).
- `facilities.ts`, `testimonials.ts`, `gallery.ts`, `team.ts` (`team`, `timeline`, `awards`).

Replace fields one file at a time. Bilingual fields use the shape `{ en: "...", hi: "..." }`.

Images currently use `https://picsum.photos/...` (random) and `https://i.pravatar.cc/...` (avatars). Replace with real `next/image`-friendly URLs (add domain to `next.config.ts → images.remotePatterns`) or local files in `public/`.

---

## Phase 2 roadmap (planned)

See [`docs/phase-2-roadmap.md`](./docs/phase-2-roadmap.md) for the full plan, but the short version:

1. **Supabase** — DB schema + Auth + Storage buckets for media.
2. **Admin CRUD** — wire up the existing tables to live Supabase queries.
3. **Form submissions** — Save to Supabase, email via **Resend**, optional WhatsApp notification.
4. **Payments** — Razorpay for training enrollment (optional).
5. **Analytics & SEO** — GA4, sitemap, OG images per page.
6. **Mobile app** — Use **PWA Builder** to wrap as Android APK / iOS Capacitor.

---

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build (also generates SW) |
| `npm run start` | Serve production build |
| `npm run lint` | Run Next.js lint |
| `npm run type-check` | TypeScript strict check (no emit) |

---

## License

MIT — for internal use by Laxmi Dairy Farm.
