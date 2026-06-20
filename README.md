# MAGHRABY.OS — Portfolio

A browser-based OS experience built as an interactive portfolio. Instead of a traditional webpage, visitors land inside a simulated desktop environment — complete with a window manager, draggable apps, animated background, and a live legacy portfolio accessible from within.

Live: **[ahmedmagraby-app.web.app](https://ahmedmagraby-app.web.app)**

---

## Features

See [FEATURES.md](FEATURES.md) for the full breakdown.

- Browser-based OS desktop with draggable, resizable, maximizable windows
- Animated canvas background — Aquarius constellation, aurora blobs, North Star, shooting meteors
- Built-in Browser app with bookmark cards and same-domain iframe for the legacy portfolio
- Mini-games: Snake and 2048 with a live leaderboard
- `/legacy` route serving the original portfolio as a full-page experience
- MAGHRABY.OS-themed 404 page with terminal boot sequence
- Static export deployed to Firebase Hosting

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion, Canvas 2D API |
| Deployment | Firebase Hosting (static export) |
| Legacy animations | GSAP + ScrollTrigger |

---

## Getting Started

```bash
git clone https://github.com/ahmedmaghraby/ahmed-maghraby-portfolio.git
cd ahmed-maghraby-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build & Deploy

```bash
# Static export to out/
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

> `output: "export"` in `next.config.js` generates a fully static site — no server-side API routes.

---

## Project Structure

```
app/
├── os/                    # OS desktop environment
│   ├── components/        # Desktop, Taskbar, Window, DesktopBackground
│   ├── apps/              # BrowserApp, SnakeApp, App2048, LeaderboardApp
│   ├── context/           # WindowManagerContext
│   └── lib/               # Leaderboard logic
├── legacy/                # Old portfolio served as a route
├── sections/              # Original portfolio sections (Hero, About, Work…)
├── components/            # Shared UI components
├── not-found.tsx          # 404 terminal boot page
└── page.tsx               # Entry — renders the OS desktop
```

---

## License

MIT — see [LICENSE](LICENSE).

<p align="left">
  <img src="https://komarev.com/ghpvc/?username=ahmed-maghraby-portfolio&label=Profile%20views&color=0e75b6&style=flat" alt="ahmedmaghraby" />
</p>
