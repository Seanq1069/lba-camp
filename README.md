# Loudoun Baseball Academy Camp — Website

Marketing + registration site for the LBA camp, presented by Q Athletics.

**Stack:** Next.js (frontend) · Sanity.io (CMS, edit content at `/studio`) · Formspree (registration form) · Vercel (free hosting) · GitHub (code)

The site works out of the box with built-in default content. Sanity and Formspree are added via environment variables — anything you publish in Sanity overrides the defaults.

---

## Setup — step by step

### 1. Push to GitHub
1. Go to github.com → **New repository** → name it `lba-camp` (private is fine) → create it **empty** (no README).
2. On your computer, in this folder:
   ```
   git init
   git add .
   git commit -m "LBA camp site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lba-camp.git
   git push -u origin main
   ```

### 2. Create the Sanity project (free)
1. Log in at **sanity.io/manage** → **Create project** → name it "LBA Camp" → dataset `production` → free plan.
2. Copy the **Project ID** (e.g. `ab12cd34`).
3. In the project's **API → CORS origins**, add:
   - `http://localhost:3000`
   - your Vercel URL once you have it (e.g. `https://lba-camp.vercel.app`) — with **Allow credentials** checked.

### 3. Create the Formspree form (free)
1. Log in at **formspree.io** → **New form** → name it "LBA Camp Registration" → set the email that should receive registrations (e.g. info@qathletics.com).
2. Copy the form ID — the `XXXXXXX` part of `https://formspree.io/f/XXXXXXX`.

### 4. Deploy on Vercel (free)
1. Log in at **vercel.com** → **Add New → Project** → import the `lba-camp` GitHub repo.
2. Framework is auto-detected (Next.js). Before deploying, add **Environment Variables**:
   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | your Sanity project ID |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_FORMSPREE_ID` | your Formspree form ID |
3. Click **Deploy**. Your site will be live at `https://lba-camp.vercel.app` (you can attach a custom domain later in Vercel → Domains).
4. Go back to Sanity (step 2.3) and add the Vercel URL to CORS origins.

### 5. Publish content in the CMS
1. Visit `https://YOUR-SITE.vercel.app/studio` and log in with your Sanity account.
2. Create one **Camp Settings** document — upload the hero photo, LBA logo and Q Athletics logo here; fill in dates, tuition, policies, contact email.
3. Create four **Coaches** documents (Bobby, Bauer, Cole, Connor) — upload headshots, set Display order 1–4.
4. (Optional) Create **Daily Schedule** items to override the built-in schedule.
5. Click **Publish** on each document. The live site refreshes within ~60 seconds.

### 6. Test registration
Submit the form on the live site — the entry should arrive in your Formspree dashboard and inbox. Formspree's free tier allows 50 submissions/month; with a 40-camper cap that fits, but watch the count or upgrade if needed.

---

## Editing content later
- **Text, dates, prices, policies, photos, coaches, schedule** → edit at `/studio`, click Publish. No code needed.
- **Layout/design changes** → edit the code, `git push`, Vercel redeploys automatically.

## Local development (optional)
```
npm install
cp .env.local.example .env.local   # fill in your IDs
npm run dev                         # http://localhost:3000
```

## Registration & payment flow
The form collects parent/camper info via Formspree. Payment is handled offline: you reply to each registration email with payment instructions. When you're ready to take cards online, create a $275 Stripe Payment Link and we can add it to the confirmation screen.
