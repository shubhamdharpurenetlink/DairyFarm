# Dairy Farm Website — Detailed Build Prompt (Phase 1: UI Only)

> Copy everything between `# PROMPT START` and `# PROMPT END` below and paste it into your AI coding agent (Cursor, Claude Code, v0, GPT, etc.).

---

# PROMPT START

> **Project:** Build a modern, bilingual (Hindi + English), animated PWA website for a **Dairy Farm Business** called **"[FARM_NAME]"** (placeholder — keep it easy to find/replace).
>
> **Phase 1 scope:** **UI only with dummy data.** Real backend, authentication, and CMS will come in Phase 2 — do NOT build those now, but design the codebase so they slot in cleanly later.

## 1. Tech Stack (strict)

- **Framework:** Next.js 15 (App Router, TypeScript, strict mode on)
- **UI Library:** Ant Design v5 (latest)
- **Styling:** SCSS Modules (`*.module.scss`) — NO Tailwind, NO styled-components, NO CSS-in-JS beyond AntD's own
- **Animations:** Framer Motion (page transitions, scroll reveals, hover effects, micro-interactions)
- **Forms:** React Hook Form + Zod validation, wrapped around Ant Design inputs
- **Icons:** `@ant-design/icons` + `lucide-react`
- **i18n:** `next-intl` with locale toggle (Hindi `hi` / English `en`) — persist choice in localStorage
- **State:** Zustand for UI state (language, theme, drawer toggles, install-prompt dismissal)
- **PWA:** `@ducanh2912/next-pwa` (Next 15 compatible) — manifest, service worker, offline fallback page, installable
- **Fonts:** Google Fonts — `Poppins` (English headings), `Hind` or `Noto Sans Devanagari` (Hindi), `Inter` (body)
- **Image Optimization:** `next/image` everywhere
- **Dummy Data:** Centralized in `src/data/*.ts` files as typed TS objects — easy to replace later with API calls

## 2. Visual Design System

**Theme:** Modern Premium Dairy — clean white base, soft natural greens, warm cream accents. Trust + freshness + heritage.

- **Primary:** `#2E7D5B` (deep dairy green)
- **Primary Light:** `#A8D5BA`
- **Accent:** `#F5E6C8` (warm cream)
- **Accent Gold:** `#C9A56A` (premium touch)
- **Background:** `#FAFAF7` (off-white)
- **Surface:** `#FFFFFF`
- **Text Primary:** `#1A1A1A`
- **Text Secondary:** `#5A5A5A`
- **Border:** `#E8E8E3`
- **Success / Error / Warning:** AntD defaults

**Typography scale:** H1 56px, H2 40px, H3 28px, H4 22px, Body 16px, Caption 14px. Use fluid sizing via `clamp()`.

**Radius:** 12px cards, 8px buttons, 16px hero. **Shadow:** subtle, layered — e.g. `0 4px 24px rgba(46,125,91,0.08)`.

**Configure Ant Design `ConfigProvider`** with these tokens so all AntD components match the theme out of the box.

## 3. Site Structure & Pages

```
/                          → Home
/about                     → About the farm
/cows                      → Cow breeds gallery
/cows/[slug]               → Individual breed detail
/cow-care                  → Diseases & treatments knowledge base
/cow-care/[slug]           → Disease detail page
/gallery                   → Photos + Videos
/training                  → Training programs list
/training/[slug]           → Program detail + enrollment form
/contact                   → Contact form + map + details
/admin                     → Admin login (Phase 2 placeholder)
/admin/dashboard           → Admin dashboard shell (Phase 2)
/offline                   → PWA offline fallback
```

### Page-by-page content requirements

**Home (`/`):**
- Hero: full-viewport video background (dummy: cow grazing loop) + headline + 2 CTAs ("Explore Our Farm" / "Book a Visit") + animated scroll indicator
- "Why Choose Us" — 4 feature cards with icons (Organic Feed, A2 Milk, Ethical Care, Vet on Site) with stagger animation on scroll
- "Our Story" — 2-column section with image + text + stats counter (Years of Heritage, Healthy Cows, Litres/Day, Happy Customers) — counters animate on scroll into view
- "Meet Our Breeds" — horizontal scroll carousel of cow breed cards (link to `/cows`)
- "Knowledge Hub" preview — 3 latest disease/care articles
- "Training Programs" preview — 2 featured cards
- Testimonials carousel — AntD `Carousel` with custom styling
- Newsletter signup strip
- Footer with sitemap, social, contact, language toggle, PWA install button

**About (`/about`):**
- Hero banner with farm tagline
- Founder's message section (photo + quote)
- Timeline of farm journey (Framer Motion scroll-linked)
- Facilities grid (Cowsheds, Milking Parlour, Fodder Farm, Veterinary Unit, Biogas) — each with image + description
- Team section — 4–6 team member cards
- Awards / Certifications strip

**Cows (`/cows`):**
- Filter chips at top: All / Indigenous / Exotic / Crossbreed
- Grid of breed cards (image, name in Hindi + English, origin, milk yield, key trait)
- Sample breeds: **Gir, Sahiwal, Tharparkar, Red Sindhi, Rathi, Holstein Friesian, Jersey, HF Cross**
- Each card clickable → `/cows/[slug]` with: hero image, gallery, characteristics table (AntD `Descriptions`), milk composition, temperament, history, suitability for Indian climate
- "Compare Breeds" button → modal that lets the user pick 2–3 breeds and shows a side-by-side table

**Cow Care (`/cow-care`):**
- Intro section explaining the knowledge base
- Search bar + category filter (Common Diseases, Nutrition, Calving, Hoof Care, Vaccination)
- Article cards grid
- Sample diseases to include: **Mastitis, Foot & Mouth Disease (FMD), Bloat, Milk Fever, Lumpy Skin Disease, Brucellosis, Tick Fever, Pneumonia, Ketosis**
- Each article (`/cow-care/[slug]`): symptoms, causes, prevention, treatment (with disclaimer: "Always consult a registered veterinarian"), related articles
- Use AntD `Collapse` for FAQ at bottom

**Gallery (`/gallery`):**
- Tabs: Photos / Videos / 360° Tour (placeholder)
- Masonry photo grid (use `react-photo-album` or custom CSS grid) with lightbox on click
- Videos in responsive grid with play overlay; embed dummy YouTube URLs
- Lazy load everything

**Training (`/training`):**
- Hero with stats (Students Trained, Programs Offered, Years Experience)
- Program cards — 4–6 programs such as:
  - "Dairy Farming Basics (3 Days)"
  - "Advanced Cattle Management (1 Week)"
  - "AI & Reproductive Health Course"
  - "Cheese & Dairy Product Making"
  - "Organic Fodder Cultivation"
  - "Farm Business & Marketing"
- Each program card: image, title, duration, price, level (Beginner / Intermediate / Advanced), seats left, "Enroll Now" button
- `/training/[slug]`: detailed page with syllabus (AntD `Steps` or `Timeline`), instructor profile, schedule, what's included, enrollment form
- **Enrollment form fields:** Full Name, Phone (with country code), Email, Age, State / District, Educational Background, Preferred Batch Date, How did you hear about us, Message — submit shows an AntD success message (no real backend)

**Contact (`/contact`):**
- Split layout: left = contact info cards (Address, Phone, WhatsApp, Email, Hours), right = contact form
- **Contact form fields:** Name, Phone, Email, Subject (dropdown: General Inquiry / Visit Booking / Product Order / Training / Partnership), Message
- Embedded Google Map (dummy iframe with placeholder coordinates)
- WhatsApp floating action button (bottom-right, animated)
- Social media row

**Admin shell (`/admin`):**
- Simple login form (Phase 2 — currently UI only, no auth logic, just show the form and on submit route to `/admin/dashboard`)
- Sidebar layout with sections: Dashboard, Pages, Cows, Diseases, Gallery, Training Programs, Enrollments, Contact Messages, Settings
- Each section = AntD `Table` with dummy data + "Add New" button (modal placeholder)
- Show a "Phase 2 — Backend integration pending" banner at the top

## 4. Component Architecture

```
src/
├── app/
│   ├── [locale]/                 # bilingual routing
│   │   ├── (public)/
│   │   │   ├── page.tsx          # home
│   │   │   ├── about/page.tsx
│   │   │   ├── cows/...
│   │   │   ├── cow-care/...
│   │   │   ├── gallery/page.tsx
│   │   │   ├── training/...
│   │   │   └── contact/page.tsx
│   │   ├── (admin)/admin/...
│   │   └── layout.tsx
│   ├── offline/page.tsx
│   └── manifest.ts
├── components/
│   ├── layout/                   # Header, Footer, Drawer, LanguageToggle
│   ├── home/                     # Hero, FeatureGrid, StatsCounter, etc.
│   ├── cows/                     # BreedCard, CompareModal
│   ├── care/                     # DiseaseCard, TreatmentSteps
│   ├── training/                 # ProgramCard, EnrollmentForm
│   ├── shared/                   # SectionHeader, AnimatedSection, CTAButton, ImageLightbox
│   └── admin/                    # AdminSidebar, AdminTable
├── data/                         # dummy data (TS files, fully typed)
│   ├── cows.ts
│   ├── diseases.ts
│   ├── trainings.ts
│   ├── facilities.ts
│   ├── testimonials.ts
│   └── gallery.ts
├── styles/
│   ├── globals.scss
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _animations.scss
├── lib/
│   ├── antd-theme.ts             # AntD ConfigProvider tokens
│   └── animations.ts             # reusable Framer Motion variants
├── i18n/
│   ├── messages/
│   │   ├── en.json
│   │   └── hi.json
│   └── config.ts
├── store/
│   └── useUIStore.ts             # zustand
└── types/                        # shared TS types
```

## 5. Animation Requirements (Framer Motion)

- **Page transitions:** fade + subtle slide on route change
- **Scroll reveals:** `whileInView` with `viewport={{ once: true, margin: "-80px" }}` on all sections
- **Stagger children:** feature grids, breed cards, gallery
- **Hero text:** word-by-word reveal on load
- **Stats counter:** number ticks up when in view
- **Hover effects:** cards lift + shadow grows, images zoom inside a fixed container
- **Mobile menu:** slide-in drawer with backdrop fade
- **Image lightbox:** scale + fade
- Define reusable variants in `lib/animations.ts` (e.g. `fadeUp`, `staggerContainer`, `cardHover`)
- **Respect `prefers-reduced-motion`** — degrade gracefully

## 6. PWA Requirements

- `manifest.ts` with `name`, `short_name`, `theme_color: #2E7D5B`, `background_color: #FAFAF7`, `display: standalone`, icons (192, 256, 384, 512, maskable)
- Service worker via `@ducanh2912/next-pwa` with runtime caching: images `CacheFirst`, API `NetworkFirst`, pages `NetworkFirst` with offline fallback
- Custom install prompt component (shows after 30 s or 2 page views), persists dismissal in localStorage
- `/offline` page with a friendly message and retry button

## 7. Responsiveness

- Mobile-first SCSS mixins (`@include mobile`, `@include tablet`, `@include desktop`)
- Breakpoints: 480, 768, 1024, 1440
- Hero must look great on 360 px width phones (farmers' devices)
- Admin panel desktop-first but functional on tablet
- Bottom navigation bar on mobile for the top 4 pages (Home, Cows, Training, Contact)

## 8. Accessibility & Quality

- All images have `alt` text (bilingual)
- Form labels properly associated
- Color contrast WCAG AA
- Keyboard navigable
- Focus rings visible
- Lighthouse target: Performance ≥ 90, Accessibility ≥ 95, PWA ✓

## 9. Dummy Data Contract (so the backend swap is easy later)

Each data file exports typed arrays. Example shape for `cows.ts`:

```ts
export interface CowBreed {
  slug: string;
  nameEn: string;
  nameHi: string;
  category: 'indigenous' | 'exotic' | 'crossbreed';
  origin: string;
  milkYieldLitresPerDay: { min: number; max: number };
  fatPercent: number;
  images: string[];
  description: { en: string; hi: string };
  characteristics: { en: string[]; hi: string[] };
}
```

Use the same pattern for diseases, training programs, gallery items, etc. Use `picsum.photos` or Unsplash farm-related URLs for placeholder images.

## 10. Deliverables for Phase 1

1. Fully working Next.js app, runs with `npm run dev`
2. All pages listed above with dummy data and responsive layouts
3. Working bilingual toggle (Hindi / English) persisting in localStorage
4. PWA installable on mobile (manifest + service worker)
5. All animations smooth on mid-range Android
6. README with setup, scripts, folder explanation, and Phase 2 roadmap (Supabase integration, admin auth, content management, payments for training)
7. `.env.example` with placeholders for Phase 2 (Supabase URL, anon key, etc.)
8. Deployment-ready for **Vercel** (free) — include `vercel.json` if needed

## 11. Out of Scope (Phase 2 — do NOT build now)

- Real authentication
- Database integration
- Payment gateway for training enrollment
- Real CMS — admin only shows a UI shell with dummy tables
- Email sending from the contact form (show a success toast only)
- Real-time chat

---

**Start by scaffolding the project, setting up `ConfigProvider` with the theme tokens, configuring `next-intl`, and building the Home page completely. Then move page by page. Show me previews after each major page.**

# PROMPT END
