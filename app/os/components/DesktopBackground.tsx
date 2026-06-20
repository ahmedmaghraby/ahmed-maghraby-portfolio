'use client';

import { useEffect, useRef } from 'react';

interface Particle { x: number; y: number; vx: number; vy: number; r: number; baseColor: string; }
interface Ripple   { x: number; y: number; r: number; alpha: number; }
interface Star     { x: number; y: number; r: number; alpha: number; speed: number; phase: number; }
interface Blob     { ox: number; oy: number; cx: number; cy: number; radius: number; color: string; phase: number; speed: number; amp: number; }
interface Meteor   { x: number; y: number; vx: number; vy: number; len: number; alpha: number; life: number; }

const N_PARTS  = 65;
const N_STARS  = 200;
const LINK     = 130;
const REPEL    = 130;
const COLORS   = ['rgba(74,243,255,', 'rgba(245,211,147,', 'rgba(167,139,250,'];
const BLOB_CFG = [
  { ox: 0.12, oy: 0.20, radius: 0.50, color: 'rgba(30,80,180,',   phase: 0,   speed: 0.00055, amp: 0.08 },
  { ox: 0.84, oy: 0.76, radius: 0.42, color: 'rgba(10,50,140,',   phase: 2.1, speed: 0.00040, amp: 0.06 },
  { ox: 0.50, oy: 0.44, radius: 0.38, color: 'rgba(60,120,220,',  phase: 1.2, speed: 0.00070, amp: 0.05 },
  { ox: 0.78, oy: 0.20, radius: 0.28, color: 'rgba(100,160,255,', phase: 3.0, speed: 0.00035, amp: 0.04 },
];

// North Star sits upper-right, clear of most desktop icons
const NS_NX = 0.80;
const NS_NY = 0.14;

// Aquarius — traced from reference image.
// Has a BRANCH at the junction: diagonal top-right → junction → RIGHT ARM (2 stars) + LEFT CHAIN down → water chain
const AQUARIUS: [number, number][] = [
  [0.62, 0.07],  //  0  top bright star
  [0.44, 0.22],  //  1  second diagonal
  [0.35, 0.33],  //  2  JUNCTION — branches right AND continues down-left
  [0.50, 0.40],  //  3  arm star 1 (right branch)
  [0.60, 0.37],  //  4  arm tip — bright (α Aqr)
  [0.28, 0.43],  //  5  left chain below junction (β Aqr)
  [0.23, 0.51],  //  6
  [0.20, 0.56],  //  7  cluster
  [0.25, 0.59],  //  8  cluster
  [0.20, 0.63],  //  9  cluster bottom
  [0.24, 0.68],  // 10  water chain begins
  [0.35, 0.68],  // 11  water going right
  [0.41, 0.64],  // 12  water slight up
  [0.50, 0.69],  // 13  water continues
  [0.61, 0.66],  // 14  water end bright (δ Aqr)
];

const AQUARIUS_EDGES: [number, number][] = [
  [0, 1], [1, 2],             // top diagonal
  [2, 3], [3, 4],             // RIGHT ARM (the branch going right from junction)
  [2, 5], [5, 6], [6, 7],    // left chain down from junction
  [7, 8], [8, 9],             // cluster zigzag
  [9, 10],                    // connect cluster to water chain
  [10, 11], [11, 12], [12, 13], [13, 14], // water chain flowing right
];

function drawAquarius(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const shimmer = 0.78 + 0.22 * Math.sin(t * 0.007);
  const pts     = AQUARIUS.map(([nx, ny]) => [nx * W, ny * H] as [number, number]);

  ctx.save();

  // Constellation lines
  ctx.lineWidth = 1.0;
  for (const [a, b] of AQUARIUS_EDGES) {
    const [x1, y1] = pts[a];
    const [x2, y2] = pts[b];
    ctx.strokeStyle = `rgba(140,200,255,${(0.30 * shimmer).toFixed(3)})`;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Star dots + soft glow
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i];
    const twinkle  = 0.6 + 0.4 * Math.sin(t * 0.014 + i * 1.57);
    // Stars 0, 4, 14 are the brightest in the constellation
    const isBright = i === 0 || i === 4 || i === 14;
    const r        = isBright ? 2.2 : 1.4;

    // Soft glow (tight, not overwhelming)
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.5);
    g.addColorStop(0, `rgba(160,220,255,${(0.35 * twinkle * shimmer).toFixed(3)})`);
    g.addColorStop(1, 'rgba(160,220,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * 3.5, 0, Math.PI * 2); ctx.fill();

    // Core dot
    ctx.fillStyle = `rgba(220,240,255,${(0.85 * twinkle * shimmer).toFixed(3)})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  ctx.restore();
}

function drawNorthStar(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  const pulse    = 0.72 + 0.28 * Math.sin(t * 0.004);
  const RAY      = 90 * pulse;
  const INNER    = 3   * pulse;

  // ── Outer halo ─────────────────────────────────────────────
  const halo = ctx.createRadialGradient(x, y, 0, x, y, 140 * pulse);
  halo.addColorStop(0,   `rgba(200,245,255,${(0.18 * pulse).toFixed(3)})`);
  halo.addColorStop(0.35,`rgba(74,243,255,${(0.07 * pulse).toFixed(3)})`);
  halo.addColorStop(1,   'rgba(74,243,255,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, 140 * pulse, 0, Math.PI * 2);
  ctx.fill();

  // ── 4 long diamond rays ─────────────────────────────────────
  ctx.save();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const ex    = x + Math.cos(angle) * RAY;
    const ey    = y + Math.sin(angle) * RAY;
    const lx    = x + Math.cos(angle + Math.PI / 2) * INNER;
    const ly    = y + Math.sin(angle + Math.PI / 2) * INNER;
    const rx    = x + Math.cos(angle - Math.PI / 2) * INNER;
    const ry    = y + Math.sin(angle - Math.PI / 2) * INNER;

    const grad = ctx.createLinearGradient(x, y, ex, ey);
    grad.addColorStop(0,   `rgba(255,255,255,${(0.85 * pulse).toFixed(3)})`);
    grad.addColorStop(0.4, `rgba(200,245,255,${(0.55 * pulse).toFixed(3)})`);
    grad.addColorStop(1,   'rgba(74,243,255,0)');

    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.quadraticCurveTo(x + Math.cos(angle) * RAY * 0.25, y + Math.sin(angle) * RAY * 0.25, ex, ey);
    ctx.quadraticCurveTo(x + Math.cos(angle) * RAY * 0.25, y + Math.sin(angle) * RAY * 0.25, rx, ry);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // ── 4 short diagonal rays ───────────────────────────────────
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + (i * Math.PI) / 2;
    const len   = RAY * 0.42;
    const grad  = ctx.createLinearGradient(x, y, x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    grad.addColorStop(0,   `rgba(200,245,255,${(0.5 * pulse).toFixed(3)})`);
    grad.addColorStop(1,   'rgba(74,243,255,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }
  ctx.restore();

  // ── Bright centre ───────────────────────────────────────────
  const cg = ctx.createRadialGradient(x, y, 0, x, y, 9 * pulse);
  cg.addColorStop(0,   `rgba(255,255,255,${(0.98 * pulse).toFixed(3)})`);
  cg.addColorStop(0.5, `rgba(210,248,255,${(0.75 * pulse).toFixed(3)})`);
  cg.addColorStop(1,   'rgba(74,243,255,0)');
  ctx.fillStyle = cg;
  ctx.beginPath();
  ctx.arc(x, y, 9 * pulse, 0, Math.PI * 2);
  ctx.fill();
}

export default function DesktopBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mx = -9999, my = -9999, t = 0, animId: number;
    let nextMeteor = 180 + Math.floor(Math.random() * 240); // first meteor delay (frames)
    const particles: Particle[] = [];
    const ripples:   Ripple[]   = [];
    const stars:     Star[]     = [];
    const meteors:   Meteor[]   = [];
    const blobs: Blob[] = BLOB_CFG.map(b => ({ ...b, cx: 0, cy: 0 }));

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      spawnParticles();
      spawnStars();
    };

    const spawnParticles = () => {
      particles.length = 0;
      for (let i = 0; i < N_PARTS; i++) {
        particles.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r:  Math.random() * 1.3 + 0.6,
          baseColor: COLORS[i % COLORS.length],
        });
      }
    };

    const spawnStars = () => {
      stars.length = 0;
      for (let i = 0; i < N_STARS; i++) {
        stars.push({
          x:     Math.random() * canvas.width,
          y:     Math.random() * canvas.height,
          r:     Math.random() * 1.1 + 0.2,
          alpha: Math.random() * 0.45 + 0.08,
          speed: Math.random() * 0.018 + 0.004,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      t++;

      // ── Aurora nebula blobs ─────────────────────────────────
      for (const b of blobs) {
        b.cx = (b.ox + Math.sin(t * b.speed + b.phase) * b.amp) * W;
        b.cy = (b.oy + Math.cos(t * b.speed * 0.65 + b.phase) * b.amp) * H;
        const rad = b.radius * Math.min(W, H);
        const g   = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, rad);
        g.addColorStop(0,   b.color + '0.12)');
        g.addColorStop(0.5, b.color + '0.045)');
        g.addColorStop(1,   b.color + '0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Aquarius constellation (persistent) ────────────────
      drawAquarius(ctx, W, H, t);

      // ── Twinkling starfield ─────────────────────────────────
      for (const s of stars) {
        const a = s.alpha * (0.45 + 0.55 * Math.sin(t * s.speed + s.phase));
        ctx.fillStyle = `rgba(220,235,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── North Star — unpredictable drift (layered prime-ratio waves) ──
      const nsX = W * (NS_NX
        + 0.045 * Math.sin(t * 0.000173 + 1.3)
        + 0.028 * Math.sin(t * 0.000311 + 0.7)
        + 0.018 * Math.cos(t * 0.000719 + 2.1)
      );
      const nsY = H * (NS_NY
        + 0.038 * Math.cos(t * 0.000223 + 0.4)
        + 0.022 * Math.sin(t * 0.000409 + 1.8)
        + 0.013 * Math.cos(t * 0.000613 + 3.2)
      );
      drawNorthStar(ctx, nsX, nsY, t);

      // ── Mouse spotlight ─────────────────────────────────────
      if (mx > -1000) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        g.addColorStop(0,   'rgba(74,243,255,0.08)');
        g.addColorStop(0.4, 'rgba(245,211,147,0.025)');
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Update particles ────────────────────────────────────
      for (const p of particles) {
        if (mx > -1000) {
          const dx = p.x - mx, dy = p.y - my;
          const d  = Math.hypot(dx, dy);
          if (d < REPEL && d > 0) {
            const f = (1 - d / REPEL) * 3.2;
            p.vx += (dx / d) * f * 0.07;
            p.vy += (dy / d) * f * 0.07;
          }
        }
        p.vx *= 0.968; p.vy *= 0.968;
        p.vx = Math.max(-1.6, Math.min(1.6, p.vx));
        p.vy = Math.max(-1.6, Math.min(1.6, p.vy));
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x += W; if (p.x > W) p.x -= W;
        if (p.y < 0) p.y += H; if (p.y > H) p.y -= H;
      }

      // ── Constellation lines ─────────────────────────────────
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(74,243,255,${((1 - d / LINK) * 0.2).toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // ── Particle dots ───────────────────────────────────────
      for (const p of particles) {
        const near  = mx > -1000 && Math.hypot(p.x - mx, p.y - my) < REPEL;
        const alpha = near ? 0.95 : 0.4;
        const rad   = near ? p.r * 1.8 : p.r;
        ctx.fillStyle = p.baseColor + alpha + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, Math.PI * 2); ctx.fill();
        if (near) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 5);
          g.addColorStop(0, p.baseColor + '0.2)');
          g.addColorStop(1, p.baseColor + '0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, rad * 5, 0, Math.PI * 2); ctx.fill();
        }
      }

      // ── Meteors ─────────────────────────────────────────────
      nextMeteor--;
      if (nextMeteor <= 0) {
        // Spawn from top edge or right edge, always moving down-left
        const fromTop  = Math.random() > 0.3;
        const speed    = 9 + Math.random() * 8;
        const angle    = (Math.PI / 4) + (Math.random() * Math.PI / 6); // 45°–75° below horizontal
        meteors.push({
          x:     fromTop ? Math.random() * W : W,
          y:     fromTop ? 0 : Math.random() * H * 0.5,
          vx:    -Math.cos(angle) * speed,
          vy:     Math.sin(angle) * speed,
          len:   80 + Math.random() * 80,
          alpha: 0.75 + Math.random() * 0.2,
          life:  1,
        });
        nextMeteor = 220 + Math.floor(Math.random() * 300);
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x    += m.vx;
        m.y    += m.vy;
        m.life -= 0.014;
        if (m.life <= 0 || m.x < -200 || m.y > H + 100) { meteors.splice(i, 1); continue; }

        const tailX = m.x - m.vx / Math.hypot(m.vx, m.vy) * m.len;
        const tailY = m.y - m.vy / Math.hypot(m.vx, m.vy) * m.len;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0,   `rgba(255,255,255,${(m.alpha * m.life).toFixed(3)})`);
        grad.addColorStop(0.15,`rgba(200,245,255,${(m.alpha * m.life * 0.8).toFixed(3)})`);
        grad.addColorStop(1,   'rgba(74,243,255,0)');

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.8;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Bright head glow
        const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 6);
        hg.addColorStop(0, `rgba(255,255,255,${(m.alpha * m.life).toFixed(3)})`);
        hg.addColorStop(1, 'rgba(74,243,255,0)');
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(m.x, m.y, 6, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      // ── Click ripples ───────────────────────────────────────
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 5; rp.alpha -= 0.016;
        if (rp.alpha <= 0) { ripples.splice(i, 1); continue; }
        ctx.lineWidth   = 1.4;
        ctx.strokeStyle = `rgba(74,243,255,${rp.alpha.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
        if (rp.r > 40) {
          ctx.lineWidth   = 0.8;
          ctx.strokeStyle = `rgba(245,211,147,${(rp.alpha * 0.4).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r - 40, 0, Math.PI * 2); ctx.stroke();
        }
        if (rp.r > 80) {
          ctx.lineWidth   = 0.5;
          ctx.strokeStyle = `rgba(167,139,250,${(rp.alpha * 0.22).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r - 80, 0, Math.PI * 2); ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const onMove  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };
    const onClick = (e: MouseEvent) => { ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.65 }); };

    window.addEventListener('resize',     resize);
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click',      onClick);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click',      onClick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
