# Dairy Farm Website — Phase 2 Roadmap

This document covers everything that is **intentionally out of scope for Phase 1 (UI only)** and will be added once the UI is approved.

---

## 1. Backend: Supabase (free tier)

**Why Supabase:** Postgres (real SQL, not NoSQL), generous free tier (500 MB DB + 1 GB storage + 50 k monthly active users), built-in Auth, built-in Storage for images/videos, Row Level Security, and a clean JS SDK that drops straight into Next.js.

### Database schema (initial draft)

- `users` — admin users (managed by Supabase Auth)
- `cow_breeds` — slug, name_en, name_hi, category, origin, milk_yield_min, milk_yield_max, fat_percent, description_en, description_hi, characteristics, created_at
- `cow_breed_images` — breed_id, url, alt_en, alt_hi, position
- `diseases` — slug, title_en, title_hi, category, symptoms, causes, prevention, treatment, body_en, body_hi, published, created_at
- `training_programs` — slug, title_en, title_hi, duration_days, price_inr, level, seats_total, syllabus, instructor, schedule, published
- `enrollments` — program_id, full_name, phone, email, age, state, district, education, batch_date, source, message, status, created_at
- `contact_messages` — name, phone, email, subject, message, status (new / read / replied), created_at
- `gallery_items` — type (photo / video), url, thumbnail_url, title_en, title_hi, tags, position
- `facilities` — name_en, name_hi, description_en, description_hi, image_url, position
- `testimonials` — name, role, city, quote_en, quote_hi, photo_url, rating
- `site_settings` — key-value store (farm name, address, phones, social links, hero video URL, etc.) so the admin can change content without redeploys

### Storage buckets

- `cows/` — breed images
- `gallery/` — site gallery photos & videos
- `facilities/` — facility photos
- `testimonials/` — person photos
- `site/` — logo, favicons, hero media

---

## 2. Authentication

- **Supabase Auth** with email + password for admin users (start with one super-admin you seed manually)
- Optionally add **magic link** login later
- Protect `/admin/**` routes with middleware (`middleware.ts`) — check the Supabase session cookie; redirect to `/admin` (login) if absent
- Add a `role` claim (`admin` / `editor`) and gate destructive actions by role

---

## 3. Admin Panel CRUD (wire up the Phase 1 shell)

For each Phase 1 dummy table, swap dummy data for real Supabase queries using **TanStack Query**:

- Cows: list / create / edit / delete + image upload to `cows/` bucket
- Diseases: rich text editor (Tiptap or React Quill) for the body — bilingual fields
- Training Programs: full CRUD + syllabus builder
- Enrollments: read-only list + status update + CSV export
- Contact Messages: read-only list + mark-as-read + reply-via-mailto
- Gallery: drag-and-drop reorder, multi-upload
- Site Settings: simple form bound to the `site_settings` table

---

## 4. Public form submissions

- **Contact form** → POST to a Next.js Route Handler → insert into `contact_messages` → trigger an email notification
- **Enrollment form** → same pattern → insert into `enrollments` → email notification to admin + auto-reply to user

### Email service

- **Resend** (free tier: 3,000 emails/month, 100/day) — clean API, React Email templates
- Templates: contact-received (admin notification), enrollment-confirmation (user), enrollment-notification (admin)

---

## 5. Optional: Payments for Training (later)

- **Razorpay** (best for India, supports UPI, cards, netbanking, wallets)
- Phase 2.5 only — collect payment on enrollment, mark `enrollments.status = paid`, send invoice email
- Webhook handler in a Next.js Route Handler verifies signature and updates DB

---

## 6. Deployment

- **Web app:** Vercel (free Hobby tier — perfect for Next.js, automatic deploys from GitHub, free SSL, global CDN, edge functions)
- **Database + Storage + Auth:** Supabase (free tier)
- **Email:** Resend (free tier)
- **Images/Videos hosting:** Supabase Storage initially; if bandwidth becomes an issue, switch heavy media to **Cloudinary** (free 25 GB bandwidth/month) and keep DB on Supabase

### Domain

- Buy a domain from Namecheap / GoDaddy / Cloudflare (≈ ₹600–₹1,200/yr)
- Point DNS to Vercel
- Free SSL via Vercel automatic

---

## 7. PWA → Play Store (when you want a real Android app)

You **don't need to rebuild as a native app**. Convert the PWA:

1. **PWA Builder** (free, by Microsoft) — paste your live URL, it generates a signed Android APK/AAB using **Trusted Web Activity (TWA)**
2. Pay the **one-time $25** Google Play Developer fee
3. Upload the AAB to Play Console, fill in store listing (icon, screenshots, description), submit for review
4. Play Store users install a "native" app that's actually your PWA in a Chrome shell — full-screen, no browser chrome, installable, push notifications work

iOS App Store is trickier (Apple is stricter about PWAs); revisit only if iOS users specifically demand a store listing — the installable PWA from Safari works for most cases.

---

## 8. Analytics & Monitoring (recommended additions)

- **Vercel Analytics** — free tier, web vitals
- **Plausible** or **Umami** — privacy-friendly analytics (self-host Umami on Vercel for free)
- **Sentry** — error tracking (free tier: 5k errors/month)

---

## 9. SEO additions for Phase 2

- Dynamic `sitemap.xml` and `robots.txt`
- Per-page metadata via Next.js `generateMetadata` (already free with App Router)
- Open Graph images for share previews
- `JSON-LD` structured data: `Organization`, `LocalBusiness`, `Course` (for training programs), `Article` (for cow-care knowledge base)
- Submit sitemap to Google Search Console + Bing Webmaster Tools

---

## 10. Suggested Phase 2 build order

1. Supabase project setup + schema migration (use Supabase CLI + SQL files in `supabase/migrations/`)
2. Auth + protected `/admin` routes
3. `site_settings` table + admin form (so you can change farm name, phone, etc. instantly)
4. Cows + Diseases CRUD (most content-heavy)
5. Public forms (contact, enrollment) + Resend integration
6. Gallery upload + reorder
7. Training Programs CRUD
8. Analytics, sitemap, OG images
9. Razorpay (optional)
10. PWA Builder → Play Store submission

---

## Quick cost summary (Phase 2 launch)

| Item | Cost |
|---|---|
| Vercel Hobby | Free |
| Supabase free tier | Free |
| Resend free tier | Free |
| Domain (annual) | ~₹600–₹1,200 |
| Google Play Developer (one-time) | $25 (~₹2,100) |
| **Total to launch** | **~₹3,000 one-time + domain renewal yearly** |

Everything else scales to paid tiers only when traffic justifies it.
