# Khan Portfolio - File Structure Documentation

Is project ko section-wise folders me split kar diya gaya hai, taake aapko quickly samajh aaye:
`kahan click karein` aur `kahan change karein`.

## Quick Open Links
- App Start: [main.jsx](./client/src/main.jsx)
- App Root: [App.jsx](./client/src/App.jsx)
- Main Page Container: [Home.jsx](./client/src/pages/Home.jsx)
- Data (all arrays): [portfolioData.js](./client/src/data/portfolioData.js)
- Global Colors / Theme: [index.css](./client/src/index.css)

## Section Component Folders
- Header: [Header.jsx](./client/src/components/header/Header.jsx)
- Hero: [HeroSection.jsx](./client/src/components/hero/HeroSection.jsx)
- About: [AboutSection.jsx](./client/src/components/about/AboutSection.jsx)
- Skills: [SkillsSection.jsx](./client/src/components/skills/SkillsSection.jsx)
- Momentum: [MomentumSection.jsx](./client/src/components/momentum/MomentumSection.jsx)
- Projects: [ProjectsSection.jsx](./client/src/components/projects/ProjectsSection.jsx)
- Experience: [ExperienceSection.jsx](./client/src/components/experience/ExperienceSection.jsx)
- Contact: [ContactSection.jsx](./client/src/components/contact/ContactSection.jsx)
- Hire Me Popup: [HireModal.jsx](./client/src/components/hire/HireModal.jsx)
- Bottom Buttons: [BottomActionBar.jsx](./client/src/components/actions/BottomActionBar.jsx)
- Footer: [Footer.jsx](./client/src/components/footer/Footer.jsx)

---

## 1) App Flow
1. [main.jsx](./client/src/main.jsx) app mount karta hai.
2. [App.jsx](./client/src/App.jsx) `Home` render karta hai.
3. [Home.jsx](./client/src/pages/Home.jsx) section components + states/handlers manage karta hai.
4. UI section files `client/src/components/*` me separated hain.

---

## 2) Kya Kahan Edit Karna Hai

### Header / Navbar edit
- File: [Header.jsx](./client/src/components/header/Header.jsx)
- Menu labels data source: [portfolioData.js](./client/src/data/portfolioData.js) -> `navItems`

### Hero text/image edit
- File: [HeroSection.jsx](./client/src/components/hero/HeroSection.jsx)
- Image path: `/1.jpg`

### About content / stats
- UI File: [AboutSection.jsx](./client/src/components/about/AboutSection.jsx)
- Data source: [portfolioData.js](./client/src/data/portfolioData.js) -> `stats`

### Skills + Services edit
- UI File: [SkillsSection.jsx](./client/src/components/skills/SkillsSection.jsx)
- Data source: [portfolioData.js](./client/src/data/portfolioData.js) -> `services`, `skills`

### Momentum progress edit
- UI File: [MomentumSection.jsx](./client/src/components/momentum/MomentumSection.jsx)
- Data source: [portfolioData.js](./client/src/data/portfolioData.js) -> `momentum`

### Projects add/edit
- UI File: [ProjectsSection.jsx](./client/src/components/projects/ProjectsSection.jsx)
- Data source: [portfolioData.js](./client/src/data/portfolioData.js) -> `projects`

### Experience add/edit
- UI File: [ExperienceSection.jsx](./client/src/components/experience/ExperienceSection.jsx)
- Data source: [portfolioData.js](./client/src/data/portfolioData.js) -> `journey`

### Contact form edit
- UI File: [ContactSection.jsx](./client/src/components/contact/ContactSection.jsx)
- Submit logic: [Home.jsx](./client/src/pages/Home.jsx) -> `onSubmit`

### Hire Me popup edit
- UI File: [HireModal.jsx](./client/src/components/hire/HireModal.jsx)
- Submit logic: [Home.jsx](./client/src/pages/Home.jsx) -> `handleHireSubmit`

### Bottom action buttons edit
- UI File: [BottomActionBar.jsx](./client/src/components/actions/BottomActionBar.jsx)

### Footer social links edit
- UI File: [Footer.jsx](./client/src/components/footer/Footer.jsx)
- Data source: [portfolioData.js](./client/src/data/portfolioData.js) -> `socialLinks`

---

## 3) New Project Add (Exact)
Open [portfolioData.js](./client/src/data/portfolioData.js), `projects` array me new object add karein:

```js
{
  title: "My New Project",
  summary: "Short project description",
  tech: ["React", "Tailwind"],
  github: "https://github.com/your-repo",
  demo: "https://your-live-link.com"
}
```

---

## 4) WhatsApp No Backend Flow
No backend / no API / no database.

Files:
- Number source: [portfolioData.js](./client/src/data/portfolioData.js) -> `whatsappNumber`
- URL builder + handlers: [Home.jsx](./client/src/pages/Home.jsx)

Current behavior:
1. User form fill karta hai.
2. Submit par WhatsApp pre-filled message open hota hai.
3. User WhatsApp app/web me Send press karta hai.

---

## 5) Theme / Light-Dark Colors
- File: [index.css](./client/src/index.css)
- Light vars: `:root`
- Dark vars: `.dark`
- Theme toggle button: [Header.jsx](./client/src/components/header/Header.jsx)
- Theme state logic: [Home.jsx](./client/src/pages/Home.jsx)

---

## 6) Run Project (Auto Refresh)
```bash
npm run dev -- --port 5001
```
Open: `http://localhost:5001`

---

## 7) Important
`Home.tsx` purana/stale tab ho sakta hai.  
Current active page file: [Home.jsx](./client/src/pages/Home.jsx)

---

## 8) AI Chat Production Setup (Hidden Keys + Fallback)
For GitHub + Vercel deployment, keep all secrets in environment variables only.
Never commit real keys in code or `.env.example`.

Set these in Vercel Project Settings -> Environment Variables:

- `OPENROUTER_API_KEY` (primary key)
- `OPENROUTER_API_KEY_FALLBACK` (second key, auto used if first fails)
- `OPENROUTER_MODEL` (example: `openai/gpt-4o-mini`)

Optional:
- `OPENROUTER_API_KEYS` (comma-separated multiple keys)
- `RESEND_API_KEY` (if you want email alerts for each chat)
- `CHAT_ALERT_TO_EMAIL` (owner email to receive chat alerts)
- `CHAT_ALERT_FROM_EMAIL` (sender email, default `onboarding@resend.dev`)

Notes:
- Client-side `VITE_*` keys are public in browser build. Use them only for local fallback/testing.
- Production should rely on server route `/api/chat` so keys stay hidden.
- If users chat on your site, show a short notice that conversations may be logged/contacted for project follow-up.

## 9) Ready-to-Test Chat Email (Local)
Local dev now supports `/api/chat` directly in `npm run dev` (no separate backend command needed).

1. Put these in `.env.local`:
   - `OPENROUTER_API_KEY=...`
   - `OPENROUTER_API_KEY_FALLBACK=...` (optional)
   - `RESEND_API_KEY=...`
   - `CHAT_ALERT_TO_EMAIL=your_email@example.com`
2. Run:
   - `npm run dev`
3. Open site and send chat message.
4. Check:
   - Email inbox/spam for alert
   - Local file log: `logs/chat-conversations.jsonl`
