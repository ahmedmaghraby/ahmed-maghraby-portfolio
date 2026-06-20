# FEATURES.md — MAGHRABY.OS

Full feature breakdown for the browser-based OS portfolio.

---

## Desktop Environment

- **Window Manager** — open, close, minimize, maximize, and drag windows freely across the desktop
- **Taskbar** — pinned app icons with open/active state indicators; click to open or focus
- **Multi-window** — multiple apps can be open simultaneously, each in its own independent window
- **Resizable windows** — drag window edges/corners to resize
- **Z-index focus** — clicking a window brings it to the front

---

## Animated Background

Canvas 2D animation running continuously behind the desktop.

- **Aquarius constellation** — 14 stars connected by edges, including a branching junction arm; bright stars pulse with a glow halo
- **Aurora blobs** — 4 slow-drifting radial gradients in deep blue/teal tones layered behind everything
- **Star field** — 200 randomly placed background stars with varied opacity and size
- **North Star** — fixed bright star at the top of the canvas, drifts unpredictably via prime-ratio sine waves for a natural float
- **Shooting meteors** — periodic meteors streak across the canvas with a fading trail; randomized angle, speed, and spawn timing
- **Deep navy base** — `#020b18` background, scanline texture overlay for a CRT feel

---

## Built-in Apps

### Browser
- Address bar with URL input and Go button
- Bookmark cards for quick navigation (Old Portfolio, LinkedIn, GitHub, Book Meeting)
- Embed-capable cards open in an internal iframe; external links open in a new tab
- Auto-maximize when opening the embedded portfolio
- 8-second timeout fallback screen when a site blocks iframe embedding
- "Open in new tab" shortcut always visible when a URL is active

### Snake
- Classic Snake gameplay on a canvas grid
- Keyboard controls (arrow keys / WASD)
- Score tracking; submits to the leaderboard on game over

### 2048
- Full 2048 tile-sliding game
- Keyboard and swipe support
- Score tracking; submits to the leaderboard on game over

### Leaderboard
- Live score table for Snake and 2048
- Country flag and username display
- Highlights "your" entry (UUID-based, no login required)
- Filterable by game

---

## Legacy Portfolio (`/legacy`)

- The original portfolio served as a same-domain Next.js route — no iframe cross-origin restrictions
- Includes all original sections: Hero, About, Services, Work, Book Meeting, Tools, Email Scroller, Contact, Footer
- GSAP + ScrollTrigger animations preserved exactly as in the original build
- Accessible directly at `/legacy` or via the Browser app bookmark

---

## 404 Page

- Full MAGHRABY.OS theme — navy background, scanline overlay, monospace font
- Hollow "404" heading with cyan stroke
- Animated terminal boot log — 5 lines appear sequentially (320ms interval)
- Boot sequence ends with `ERR_PATH_NOT_FOUND` in red
- Blinking cursor during sequence; "← Return to Desktop" link appears after completion

---

## Technical

- **Next.js 13 App Router** with `'use client'` directives throughout the OS layer
- **Static export** (`output: "export"`) — fully pre-rendered, no Node.js server required
- **Firebase Hosting** — deployed from the `out/` directory
- **TypeScript** end-to-end
- **Tailwind CSS** for utility styling
- **Framer Motion** for window open/close/minimize animations
- **Canvas 2D API** for the entire animated desktop background (no WebGL dependency)
