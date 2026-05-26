# Deploying Laxmi Dairy Farm to Vercel + Neon (free)

This app is a single Next.js 15 codebase with:

- **Frontend** — Next.js 15 (App Router, RSC + client components, PWA)
- **API** — Next.js Route Handlers under `src/app/api/v1/*`
- **DB** — PostgreSQL on Neon (free tier)
- **ORM** — Prisma 6
- **Auth** — Auth.js v5 (NextAuth) Credentials provider with bcrypt + JWT cookie
- **Payments** — Razorpay Standard Checkout (test mode by default; COD always works)
- **Images** — Plain URLs (Unsplash, Google Drive/Photos auto-normalised)
- **Host** — Vercel Hobby tier

Total cost when running on free tiers: ₹0/month.

---

## 1. Create a Neon database (5 min)

1. Go to <https://neon.tech> → sign in with GitHub.
2. **Create project** → name it `laxmi-dairy` → region closest to India (Mumbai is best; default `ap-southeast-1` works fine).
3. From the dashboard copy two connection strings:
   - **Pooled** (used at runtime by serverless functions) — copy as `DATABASE_URL`
   - **Direct** (used by Prisma migrate) — copy as `DIRECT_URL`
4. Both must include `?sslmode=require`.

## 2. Create a Razorpay account (test mode is free)

1. Go to <https://razorpay.com> → sign up.
2. **Dashboard → Settings → API Keys → Generate Test Key**.
3. Note `Key ID` (starts with `rzp_test_…`) and `Key Secret`.
4. (Later, when you go live: switch to live keys — no code changes needed.)

## 3. Generate AUTH_SECRET and admin password hash

In a terminal:

```bash
# Auth.js JWT secret
openssl rand -base64 32

# bcrypt hash of your chosen admin password
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 10))" 'YourStrongPasswordHere'
```

## 4. Local setup (optional, for development)

```bash
cp .env.example .env.local
# edit .env.local — paste DATABASE_URL, DIRECT_URL, AUTH_SECRET, ADMIN_EMAIL,
# ADMIN_PASSWORD_HASH, RAZORPAY_* keys

npm install
npm run db:deploy   # apply prisma/migrations to your Neon DB
npm run db:seed     # populate from src/data/seeds/* (one-time)
npm run dev
```

Open `http://localhost:3000` for the storefront and `http://localhost:3000/admin/login` for the admin.

## 5. Push to GitHub

The code is already in git. From the repo root:

```bash
git add .
git commit -m "feat(backend): full backend with Prisma + Auth.js + Razorpay"
git push
```

## 6. Deploy to Vercel

1. Go to <https://vercel.com/new>.
2. Import the GitHub repo `shubhamdharpurenetlink/DairyFarm`.
3. Framework: **Next.js** (auto-detected). Build command: **`npm run vercel-build`** (already set in `vercel.json`).
4. **Environment Variables** — add all from `.env.example`, replacing placeholders:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | Neon pooled string |
   | `DIRECT_URL` | Neon direct string |
   | `AUTH_SECRET` | `openssl rand -base64 32` output |
   | `AUTH_TRUST_HOST` | `true` |
   | `NEXTAUTH_URL` | will be `https://<project>.vercel.app` after first deploy |
   | `ADMIN_EMAIL` | your owner email |
   | `ADMIN_PASSWORD_HASH` | bcrypt hash from step 3 |
   | `RAZORPAY_KEY_ID` | from Razorpay dashboard |
   | `RAZORPAY_KEY_SECRET` | from Razorpay dashboard |
   | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | same as `RAZORPAY_KEY_ID` (test key is safe to expose) |
   | `NEXT_PUBLIC_APP_URL` | `https://<project>.vercel.app` |

5. Click **Deploy**. The `vercel-build` command runs `prisma generate && prisma migrate deploy && next build` — your DB schema is applied automatically.

## 7. Seed the live database (one-time)

After the first successful deploy:

```bash
# locally, with .env.local pointing at the production Neon DB
DATABASE_URL=$PROD_DATABASE_URL DIRECT_URL=$PROD_DIRECT_URL npm run db:seed
```

This populates products / cows / diseases / trainings / gallery / team / settings from the bundled `src/data/seeds/*` files **and creates the admin user** using `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` from your env.

Alternatively, install the Neon Vercel integration and run the seed once from a serverless function or `vercel exec`.

## 8. Smoke test

- Visit `https://<project>.vercel.app` (mobile + desktop):
  - Home, Products, Cows, Cow Care, Training, Gallery, Contact load with images
  - Add a product to cart → checkout with COD → success page
  - Checkout with UPI/Card → Razorpay test modal opens → use test card `4111 1111 1111 1111` / any CVV / any future expiry → success
- Visit `https://<project>.vercel.app/admin/login` → sign in with `ADMIN_EMAIL` + the plain password you bcrypt-hashed
  - Add/edit a product, paste a Google Drive image URL → it should display on the public site after refresh

## 9. Custom domain (optional)

In the Vercel project → **Settings → Domains → Add `laxmidairy.in`**. Vercel issues a free SSL certificate. Update `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` env vars to the custom domain and redeploy.

---

## Image URLs

Admins can paste any of these formats — the API auto-normalises before saving:

- Direct URL (`https://images.unsplash.com/...`)
- Google Drive share link (`https://drive.google.com/file/d/<ID>/view?...`)
- Google Drive open link (`https://drive.google.com/open?id=<ID>`)

Google Photos web share links (`https://photos.app.goo.gl/<short>`) are **not** auto-resolvable — copy the image's direct URL from the Photos page (right-click → Copy image address) instead.

## Going live with Razorpay

Switch `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `NEXT_PUBLIC_RAZORPAY_KEY_ID` from test keys to live keys in Vercel → Settings → Environment Variables → redeploy. No code changes needed.

## Troubleshooting

- **`P1001` Can't reach database** — verify `DATABASE_URL` has `?sslmode=require` and the IP isn't blocked. Neon's free tier allows all IPs by default.
- **`PrismaClientInitializationError` on Vercel** — make sure `postinstall: prisma generate` ran (it's in `package.json`). The `vercel-build` script also re-generates as a safety.
- **Admin login fails** — `ADMIN_PASSWORD_HASH` env must be a bcrypt hash (starts with `$2`); the plain password is only used during seeding.
- **PWA service worker stale** — the SW is regenerated on every deploy; users get the update on their next visit. To force, bump the manifest `version`.
