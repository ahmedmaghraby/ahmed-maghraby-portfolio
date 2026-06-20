'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { saveScore } from '../lib/leaderboard';

// ─── Canvas & world constants ─────────────────────────────────────────────────

const W = 640, H = 420;
const HORIZON = Math.round(H * 0.42);   // y where road meets sky
const SEG_LEN = 200;                    // world units per segment
const ROAD_W = 2000;                    // half road width in world units
const CAM_H = 1000;                     // camera height above road
const CAM_D = 0.84;                     // perspective depth factor
const NUM_SEGS = 600;                   // total segments before loop
const DRAW_DIST = 120;                  // segments to draw per frame
const MAX_SPEED = 520;
const ACCEL = 28;
const DECEL = 60;
const OFFROAD_SLOW = 0.97;

// ─── Road generation ──────────────────────────────────────────────────────────

interface Seg {
  curve: number;       // lateral curve strength
  z: number;           // world z of segment start
}

let road: Seg[] | null = null;

function getroad(): Seg[] {
  if (road) return road;
  road = [];
  for (let i = 0; i < NUM_SEGS; i++) {
    const curve =
      Math.sin(i / 38) * 3.5 +
      Math.sin(i / 14 + 1.5) * 1.8 +
      (i > 80  && i < 130 ? 5.5 : 0) +
      (i > 200 && i < 270 ? -6 : 0) +
      (i > 380 && i < 440 ? 4 : 0);
    road.push({ curve, z: i * SEG_LEN });
  }
  return road;
}

// ─── NPC cars ────────────────────────────────────────────────────────────────

interface NPC { segIdx: number; laneX: number; color: string; speed: number }

const NPC_COLORS = ['#4af3ff', '#ff5f57', '#f5d393', '#a78bfa', '#34d399'];

function spawnNPCs(count = 10): NPC[] {
  return Array.from({ length: count }, (_, i) => ({
    segIdx: 20 + i * Math.floor(NUM_SEGS / count),
    laneX: (Math.random() < 0.5 ? -1 : 1) * (0.2 + Math.random() * 0.6),
    color: NPC_COLORS[i % NPC_COLORS.length],
    speed: 60 + Math.random() * 120,
  }));
}

// ─── Projection ───────────────────────────────────────────────────────────────

interface Proj { x: number; y: number; w: number; scale: number }

function project(
  worldX: number,
  worldZ: number,
  camZ: number,
  camX: number,
): Proj {
  const dz = worldZ - camZ;
  if (dz <= 0) return { x: W / 2, y: HORIZON, w: 0, scale: 0 };
  const scale = (CAM_D * CAM_H) / dz;
  const x = W / 2 + scale * (worldX - camX);
  const y = HORIZON + scale * CAM_H;
  const w = scale * ROAD_W;
  return { x, y, w, scale };
}

// ─── Draw helpers ─────────────────────────────────────────────────────────────

function drawTrap(
  ctx: CanvasRenderingContext2D,
  near: Proj, far: Proj,
  nL: number, nR: number, fL: number, fR: number,
  fill: string,
) {
  const x1L = near.x + near.w * nL, x1R = near.x + near.w * nR;
  const x2L = far.x + far.w * fL, x2R = far.x + far.w * fR;
  ctx.beginPath();
  ctx.moveTo(x1L, near.y); ctx.lineTo(x1R, near.y);
  ctx.lineTo(x2R, far.y);  ctx.lineTo(x2L, far.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawSegment(
  ctx: CanvasRenderingContext2D,
  near: Proj, far: Proj,
  alt: boolean, fog: number,
) {
  const ry = Math.min(near.y, H);
  const fy = Math.max(far.y, HORIZON);
  if (ry <= fy) return;

  // grass
  ctx.fillStyle = alt ? '#0c1318' : '#0a1015';
  ctx.fillRect(0, fy, W, ry - fy);

  // road
  drawTrap(ctx, near, far, -1, 1, -1, 1, alt ? '#1c2235' : '#1a1f2e');

  // rumble strips
  const rc = alt ? '#f5d393' : '#06090f';
  drawTrap(ctx, near, far, -1, -0.85, -1, -0.85, rc);
  drawTrap(ctx, near, far,  0.85, 1,  0.85, 1, rc);

  // lane markers (dashed look via alternating alt)
  if (!alt) {
    drawTrap(ctx, near, far, -0.03, 0.03, -0.03, 0.03, 'rgba(255,255,255,0.1)');
    drawTrap(ctx, near, far, -0.68, -0.62, -0.68, -0.62, 'rgba(255,255,255,0.07)');
    drawTrap(ctx, near, far,  0.62,  0.68,  0.62,  0.68, 'rgba(255,255,255,0.07)');
  }

  // fog
  if (fog > 0) {
    ctx.fillStyle = `rgba(6,9,15,${fog.toFixed(2)})`;
    drawTrap(ctx, near, far, -1, 1, -1, 1, `rgba(6,9,15,${fog.toFixed(2)})`);
  }
}

function drawNPCCar(
  ctx: CanvasRenderingContext2D,
  p: Proj,
  color: string,
) {
  if (p.scale <= 0 || p.y < HORIZON || p.y > H + 40) return;
  const cw = p.scale * 900;
  const ch = p.scale * 600;
  const cx = p.x - cw / 2;
  const cy = p.y - ch;

  // body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(cx, cy + ch * 0.25, cw, ch * 0.55, 3);
  ctx.fill();

  // roof
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.roundRect(cx + cw * 0.15, cy, cw * 0.7, ch * 0.35, 3);
  ctx.fill();

  // headlights
  ctx.fillStyle = '#fffbe0';
  ctx.fillRect(cx + cw * 0.05, cy + ch * 0.6, cw * 0.18, ch * 0.12);
  ctx.fillRect(cx + cw * 0.77, cy + ch * 0.6, cw * 0.18, ch * 0.12);
}

function drawPlayerCar(ctx: CanvasRenderingContext2D) {
  const cx = W / 2, cy = H - 50;
  const bw = 90, bh = 40;

  // shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + bh / 2 + 6, bw * 0.55, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // body
  ctx.fillStyle = '#f5d393';
  ctx.beginPath();
  ctx.roundRect(cx - bw / 2, cy - bh / 2, bw, bh, 6);
  ctx.fill();

  // roof
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.roundRect(cx - bw * 0.32, cy - bh / 2 - 18, bw * 0.64, 22, 4);
  ctx.fill();

  // windshield glow
  ctx.fillStyle = 'rgba(74,243,255,0.3)';
  ctx.beginPath();
  ctx.roundRect(cx - bw * 0.28, cy - bh / 2 - 16, bw * 0.56, 18, 3);
  ctx.fill();

  // front grill lights
  ctx.shadowColor = '#4af3ff';
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#4af3ff';
  ctx.fillRect(cx - bw / 2 + 4, cy - 6, 14, 6);
  ctx.fillRect(cx + bw / 2 - 18, cy - 6, 14, 6);
  ctx.shadowBlur = 0;

  // wheels
  const wy = cy + bh / 2 - 2;
  for (const wx of [cx - bw * 0.37, cx + bw * 0.37]) {
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.roundRect(wx - 10, wy, 20, 12, 4);
    ctx.fill();
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RacerApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // All mutable game state lives here — no re-renders during gameplay
  const gs = useRef({
    camZ: 0,          // camera z (distance traveled)
    camX: 0,          // camera x (curves shift it)
    playerX: 0,       // player lane position (-1..1)
    speed: 0,
    score: 0,
    npcs: spawnNPCs(),
    dead: false,
    started: false,
    left: false, right: false, up: false, down: false,
  });

  const rafRef = useRef<number | null>(null);
  const [uiState, setUiState] = useState<'idle' | 'playing' | 'dead'>('idle');
  const [displayScore, setDisplayScore] = useState(0);

  const resetGame = useCallback(() => {
    const g = gs.current;
    g.camZ = 0; g.camX = 0; g.playerX = 0; g.speed = 0; g.score = 0;
    g.dead = false; g.started = true;
    g.npcs = spawnNPCs();
    g.left = false; g.right = false; g.up = false; g.down = false;
    setDisplayScore(0);
    setUiState('playing');
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) { rafRef.current = requestAnimationFrame(loop); return; }

    const g = gs.current;
    const segs = getroad();
    const dt = 1 / 60;

    // ── Update ────────────────────────────────────────────
    if (g.up) g.speed = Math.min(g.speed + ACCEL, MAX_SPEED);
    else if (g.down) g.speed = Math.max(g.speed - DECEL, 0);
    else g.speed = Math.max(g.speed - 18, 0);

    const offroad = Math.abs(g.playerX) > 1;
    if (offroad) g.speed *= OFFROAD_SLOW;

    g.camZ += g.speed * dt;

    const camSegIdx = Math.floor(g.camZ / SEG_LEN) % NUM_SEGS;
    const curSeg = segs[camSegIdx];

    // Steering
    const steerStr = g.speed / MAX_SPEED;
    if (g.left)  g.playerX -= 0.022 * steerStr;
    if (g.right) g.playerX += 0.022 * steerStr;

    // Road curve pulls the camera
    g.camX += curSeg.curve * 0.03 * (g.speed / MAX_SPEED);

    // Score
    g.score = Math.floor(g.camZ / 100);

    // ── NPC movement + collision ──────────────────────────
    for (const npc of g.npcs) {
      npc.segIdx = (npc.segIdx + Math.floor(npc.speed * dt / SEG_LEN * 10)) % NUM_SEGS;

      // Player vs NPC collision check
      const relSeg = ((npc.segIdx - camSegIdx) + NUM_SEGS) % NUM_SEGS;
      if (relSeg < 3 || relSeg > NUM_SEGS - 3) {
        const dx = Math.abs(g.playerX - npc.laneX);
        if (dx < 0.35) {
          g.dead = true;
          g.started = false;
          saveScore('racer', g.score);
          setDisplayScore(g.score);
          setUiState('dead');
        }
      }
    }

    // ── Draw ──────────────────────────────────────────────
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, HORIZON);
    sky.addColorStop(0, '#03050d');
    sky.addColorStop(1, '#0a1530');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, HORIZON);

    // Stars (static, keyed by segment)
    const starSeed = camSegIdx;
    for (let s = 0; s < 40; s++) {
      const sx = ((starSeed * 17 + s * 137) % W);
      const sy = ((starSeed * 31 + s * 97) % HORIZON);
      const sa = 0.3 + ((s * 53) % 10) / 15;
      ctx.fillStyle = `rgba(255,255,255,${sa.toFixed(2)})`;
      ctx.fillRect(sx, sy, 1, 1);
    }

    // Road segments back → front
    let segX = 0; // accumulated lateral offset from curves
    const projCache: Map<number, Proj> = new Map();

    const getProj = (idx: number, xOff: number) => {
      if (projCache.has(idx)) return projCache.get(idx)!;
      const seg = segs[idx % NUM_SEGS];
      const worldZ = g.camZ + (idx - camSegIdx) * SEG_LEN;
      const p = project(xOff, worldZ, g.camZ, g.camX * ROAD_W);
      projCache.set(idx, p);
      return p;
    };

    // First pass: accumulate curve offsets
    const offsets: number[] = new Array(DRAW_DIST + 1).fill(0);
    let xAccum = 0;
    for (let n = 0; n < DRAW_DIST; n++) {
      const si = (camSegIdx + n) % NUM_SEGS;
      xAccum += segs[si].curve * 0.04;
      offsets[n] = xAccum;
    }

    // Second pass: draw far → near (painter's algorithm)
    for (let n = DRAW_DIST - 1; n >= 0; n--) {
      const si = (camSegIdx + n) % NUM_SEGS;
      const si2 = (camSegIdx + n + 1) % NUM_SEGS;
      const worldZ1 = g.camZ + (n + 1) * SEG_LEN;
      const worldZ2 = g.camZ + n * SEG_LEN;
      const xOff1 = offsets[n + 1] ?? offsets[n];
      const xOff2 = offsets[n];
      const far  = project(xOff1 * ROAD_W, worldZ1, g.camZ, g.camX * ROAD_W);
      const near = project(xOff2 * ROAD_W, worldZ2, g.camZ, g.camX * ROAD_W);
      const fog = Math.max(0, Math.min(0.85, n / DRAW_DIST));
      drawSegment(ctx, near, far, Math.floor(si / 3) % 2 === 0, fog);

      // Draw NPCs in this segment
      for (const npc of g.npcs) {
        if (npc.segIdx === si) {
          const np = project(
            xOff2 * ROAD_W + npc.laneX * ROAD_W,
            worldZ2,
            g.camZ,
            g.camX * ROAD_W,
          );
          drawNPCCar(ctx, np, npc.color);
        }
      }
    }

    // Player car
    drawPlayerCar(ctx);

    // HUD
    const spd = Math.round((g.speed / MAX_SPEED) * 240);
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = '#f5d393';
    ctx.fillText(`SPEED  ${spd} km/h`, 14, 22);
    ctx.fillStyle = '#4af3ff';
    ctx.fillText(`DIST   ${g.score} m`, 14, 40);

    // Speed bar
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.roundRect(W - 114, 12, 100, 8, 4);
    ctx.fill();
    ctx.fillStyle = g.speed > MAX_SPEED * 0.8 ? '#f5d393' : '#4af3ff';
    ctx.fillRect(W - 113, 13, (g.speed / MAX_SPEED) * 98, 6);

    // Offroad warning
    if (offroad) {
      ctx.fillStyle = 'rgba(255,95,87,0.75)';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('! OFFROAD !', W / 2 - 42, H - 12);
    }

    if (!g.dead) rafRef.current = requestAnimationFrame(loop);
  }, []);

  // Key bindings
  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      const g = gs.current;
      if (e.key === 'ArrowLeft'  || e.key === 'a') { e.preventDefault(); g.left = true; }
      if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); g.right = true; }
      if (e.key === 'ArrowUp'    || e.key === 'w') { e.preventDefault(); g.up = true; }
      if (e.key === 'ArrowDown'  || e.key === 's') { e.preventDefault(); g.down = true; }
    };
    const up = (e: KeyboardEvent) => {
      const g = gs.current;
      if (e.key === 'ArrowLeft'  || e.key === 'a') g.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') g.right = false;
      if (e.key === 'ArrowUp'    || e.key === 'w') g.up = false;
      if (e.key === 'ArrowDown'  || e.key === 's') g.down = false;
    };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up); };
  }, []);

  // Start / restart loop when playing
  useEffect(() => {
    if (uiState === 'playing') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [uiState, loop]);

  return (
    <div className="h-full flex flex-col items-center justify-center" style={{ background: '#06090f' }}>
      <div className="relative" style={{ width: W, height: H, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(245,211,147,0.15)' }}>
        <canvas ref={canvasRef} width={W} height={H} />

        {/* Idle overlay */}
        {uiState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: 'rgba(6,9,15,0.92)' }}>
            <div className="font-mono font-bold" style={{ fontSize: 28, color: '#f5d393', letterSpacing: '0.2em' }}>ROAD RACER</div>
            <div className="font-mono text-center" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
              ↑ W — Accelerate &nbsp;|&nbsp; ↓ S — Brake<br />
              ← A — Steer Left &nbsp;|&nbsp; → D — Steer Right<br />
              Avoid traffic · Stay on road
            </div>
            <button
              onClick={resetGame}
              className="font-mono px-8 py-2.5 rounded-lg mt-2"
              style={{ fontSize: 14, color: '#06090f', background: '#f5d393', border: 'none' }}
            >
              START ENGINE ▶
            </button>
          </div>
        )}

        {/* Dead overlay */}
        {uiState === 'dead' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: 'rgba(6,9,15,0.9)' }}>
            <div className="font-mono" style={{ fontSize: 12, color: 'rgba(255,95,87,0.9)', letterSpacing: '0.4em' }}>CRASHED</div>
            <div className="font-mono font-bold" style={{ fontSize: 32, color: '#f5d393' }}>{displayScore} m</div>
            <button
              onClick={resetGame}
              className="font-mono px-7 py-2 rounded-lg"
              style={{ fontSize: 13, color: '#f5d393', background: 'rgba(245,211,147,0.1)', border: '1px solid rgba(245,211,147,0.25)' }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="font-mono mt-2" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
        Use keyboard to drive · Score is saved to Leaderboard
      </div>
    </div>
  );
}
