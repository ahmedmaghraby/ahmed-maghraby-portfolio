'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { saveScore } from '../lib/leaderboard';

// ─── Canvas & world constants ─────────────────────────────────────────────────

const W = 640, H = 420;
const HORIZON = Math.round(H * 0.42);
const SEG_LEN = 200;
const ROAD_W = 2000;          // half-width of road in world units
const CAM_H = 1000;
const CAM_D = 0.84;
const NUM_SEGS = 600;
const DRAW_DIST = 120;
const MAX_SPEED = 480;
const ACCEL = 30;
const DECEL = 55;
const FRICTION = 20;
const OFFROAD_SLOW = 0.96;

// ─── Road generation ──────────────────────────────────────────────────────────

interface Seg { curve: number }

let _road: Seg[] | null = null;
function getroad(): Seg[] {
  if (_road) return _road;
  _road = [];
  for (let i = 0; i < NUM_SEGS; i++) {
    const curve =
      Math.sin(i / 38) * 3.8 +
      Math.sin(i / 13 + 1.5) * 1.6 +
      (i > 80  && i < 130 ? 5 : 0) +
      (i > 220 && i < 280 ? -5.5 : 0) +
      (i > 380 && i < 440 ? 4.5 : 0);
    _road.push({ curve });
  }
  return _road;
}

// ─── NPC cars ────────────────────────────────────────────────────────────────

interface NPC {
  z: number;          // world z position (absolute)
  laneX: number;      // -0.7 to 0.7 (road fraction)
  color: string;
  speed: number;
}

const NPC_COLORS = ['#4af3ff', '#ff5f57', '#a78bfa', '#34d399', '#febc2e'];

function spawnNPCs(): NPC[] {
  return Array.from({ length: 12 }, (_, i) => ({
    z: 800 + i * 1200,
    laneX: (i % 2 === 0 ? -1 : 1) * (0.2 + (i % 3) * 0.22),
    color: NPC_COLORS[i % NPC_COLORS.length],
    speed: 80 + (i % 5) * 40,
  }));
}

// ─── Projection ───────────────────────────────────────────────────────────────

interface Proj { x: number; y: number; w: number; scale: number }

/**
 * Project a world point onto the screen.
 * worldX: absolute world X position
 * worldZ: absolute world Z position
 * camZ: camera Z position
 * camX: camera X position (world units) — used to shift road horizontally
 */
function project(worldX: number, worldZ: number, camZ: number, camX: number): Proj {
  const dz = worldZ - camZ;
  if (dz <= 0) return { x: W / 2, y: H + 10, w: 0, scale: 0 };
  const scale = (CAM_D * CAM_H) / dz;
  const x = W / 2 + scale * (worldX - camX);
  const y = HORIZON + scale * CAM_H;
  const w = scale * ROAD_W;
  return { x, y, w, scale };
}

// ─── Draw helpers ─────────────────────────────────────────────────────────────

function fillTrap(
  ctx: CanvasRenderingContext2D,
  near: Proj, far: Proj,
  nL: number, nR: number, fL: number, fR: number,
  fill: string,
) {
  ctx.beginPath();
  ctx.moveTo(near.x + near.w * nL, near.y);
  ctx.lineTo(near.x + near.w * nR, near.y);
  ctx.lineTo(far.x  + far.w  * fR, far.y);
  ctx.lineTo(far.x  + far.w  * fL, far.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawSegment(
  ctx: CanvasRenderingContext2D,
  near: Proj, far: Proj,
  alt: boolean, fog: number,
) {
  if (near.y <= far.y) return;
  const ry = Math.min(near.y, H);
  const fy = Math.max(far.y, HORIZON);
  if (ry <= fy) return;

  // grass
  ctx.fillStyle = alt ? '#0c1318' : '#0a1015';
  ctx.fillRect(0, fy, W, ry - fy);

  // road body
  fillTrap(ctx, near, far, -1, 1, -1, 1, alt ? '#1c2235' : '#1a1f2e');

  // rumble (edge stripes)
  const rumbleCol = alt ? '#f5d393' : '#06090f';
  fillTrap(ctx, near, far, -1, -0.83, -1, -0.83, rumbleCol);
  fillTrap(ctx, near, far,  0.83, 1,  0.83, 1,   rumbleCol);

  // lane dividers (only on every other segment for dashed look)
  if (!alt) {
    fillTrap(ctx, near, far, -0.03, 0.03, -0.03, 0.03, 'rgba(255,255,255,0.1)');
    fillTrap(ctx, near, far, -0.68, -0.63, -0.68, -0.63, 'rgba(255,255,255,0.07)');
    fillTrap(ctx, near, far,  0.63,  0.68,  0.63,  0.68, 'rgba(255,255,255,0.07)');
  }

  // fog
  if (fog > 0.05) {
    fillTrap(ctx, near, far, -1, 1, -1, 1, `rgba(6,9,15,${fog.toFixed(2)})`);
  }
}

function drawNPCCar(ctx: CanvasRenderingContext2D, p: Proj, color: string) {
  if (p.scale <= 0 || p.y <= HORIZON || p.y > H + 60) return;
  const cw = Math.max(2, p.scale * 850);
  const ch = Math.max(1, p.scale * 560);
  const cx = p.x - cw / 2;
  const cy = p.y - ch;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(cx, cy + ch * 0.28, cw, ch * 0.52, 3);
  ctx.fill();

  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath();
  ctx.roundRect(cx + cw * 0.15, cy, cw * 0.7, ch * 0.35, 3);
  ctx.fill();

  // tail lights
  ctx.fillStyle = 'rgba(255,80,80,0.9)';
  ctx.fillRect(cx + cw * 0.04, cy + ch * 0.55, cw * 0.15, ch * 0.1);
  ctx.fillRect(cx + cw * 0.81, cy + ch * 0.55, cw * 0.15, ch * 0.1);
}

function drawPlayerCar(ctx: CanvasRenderingContext2D, screenX: number) {
  const cx = screenX;
  const cy = H - 52;
  const bw = 88, bh = 38;

  // shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + bh / 2 + 8, bw * 0.5, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // body
  ctx.fillStyle = '#f5d393';
  ctx.beginPath();
  ctx.roundRect(cx - bw / 2, cy - bh / 2, bw, bh, 6);
  ctx.fill();

  // roof
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.roundRect(cx - bw * 0.32, cy - bh / 2 - 17, bw * 0.64, 21, 4);
  ctx.fill();

  // windshield
  ctx.fillStyle = 'rgba(74,243,255,0.28)';
  ctx.beginPath();
  ctx.roundRect(cx - bw * 0.27, cy - bh / 2 - 15, bw * 0.54, 17, 3);
  ctx.fill();

  // front headlights
  ctx.shadowColor = '#4af3ff';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#4af3ff';
  ctx.fillRect(cx - bw / 2 + 4, cy - 5, 13, 5);
  ctx.fillRect(cx + bw / 2 - 17, cy - 5, 13, 5);
  ctx.shadowBlur = 0;

  // wheels
  for (const wx of [cx - bw * 0.36, cx + bw * 0.36]) {
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.roundRect(wx - 10, cy + bh / 2 - 3, 20, 11, 4);
    ctx.fill();
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RacerApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gs = useRef({
    camZ: 0,        // camera world Z (advances with speed)
    roadX: 0,       // accumulated curve offset (camera follows road)
    playerX: 0,     // player lateral offset within road (-1=left edge, 0=center, 1=right edge)
    speed: 0,
    score: 0,
    npcs: spawnNPCs(),
    dead: false,
    left: false, right: false, up: false, down: false,
  });

  const rafRef = useRef<number | null>(null);
  const [uiState, setUiState] = useState<'idle' | 'playing' | 'dead'>('idle');
  const [displayScore, setDisplayScore] = useState(0);

  const resetGame = useCallback(() => {
    const g = gs.current;
    g.camZ = 0; g.roadX = 0; g.playerX = 0; g.speed = 0; g.score = 0;
    g.dead = false;
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

    // ── Physics ──────────────────────────────────────────────────────────────
    if (g.up)   g.speed = Math.min(g.speed + ACCEL, MAX_SPEED);
    else if (g.down) g.speed = Math.max(g.speed - DECEL, 0);
    else        g.speed = Math.max(g.speed - FRICTION, 0);

    const onGrass = Math.abs(g.playerX) > 1.05;
    if (onGrass) g.speed *= OFFROAD_SLOW;

    g.camZ += g.speed / 60;

    const camSegIdx = Math.floor(g.camZ / SEG_LEN) % NUM_SEGS;
    const curSeg = segs[camSegIdx];

    // Steering — full sensitivity regardless of speed (feels responsive)
    const steerAmount = 0.025 + 0.02 * (g.speed / MAX_SPEED);
    if (g.left)  g.playerX -= steerAmount;
    if (g.right) g.playerX += steerAmount;

    // Road curve drifts the camera (centrifugal pull)
    const curvePull = curSeg.curve * 0.002 * (g.speed / MAX_SPEED);
    g.roadX += curvePull;
    // Counteract — road curve also slightly pulls the player if not steering
    if (!g.left && !g.right) {
      g.playerX += curvePull * 0.4;
    }

    // Clamp playerX (soft walls — just slow them if very offroad)
    g.playerX = Math.max(-2, Math.min(2, g.playerX));

    // Score = distance
    g.score = Math.floor(g.camZ / 100);

    // ── Camera world X = roadX (curve follow) + playerX (lane position) ───
    // playerX shifts camera so road appears to move left/right around the car
    const camX = (g.roadX + g.playerX * 0.5) * ROAD_W;

    // ── Accumulate curve x-offsets for each visible segment ──────────────────
    const offsets = new Float32Array(DRAW_DIST + 2);
    let xAcc = 0;
    for (let n = 0; n < DRAW_DIST + 1; n++) {
      offsets[n] = xAcc;
      const si = (camSegIdx + n) % NUM_SEGS;
      xAcc += segs[si].curve * 0.035;
    }

    // ── NPC update + collision ────────────────────────────────────────────────
    for (const npc of g.npcs) {
      // Move NPC forward at its own speed
      npc.z += npc.speed / 60;
      // Wrap around the road loop
      const loopLen = NUM_SEGS * SEG_LEN;
      if (npc.z > g.camZ + DRAW_DIST * SEG_LEN) npc.z -= loopLen * 0.5;
      if (npc.z < g.camZ - SEG_LEN * 5)         npc.z += loopLen * 0.3;

      // Collision: NPC within 2 segments and overlapping laterally
      const dist = npc.z - g.camZ;
      if (dist > 0 && dist < SEG_LEN * 2) {
        const dx = Math.abs(g.playerX - npc.laneX);
        if (dx < 0.32) {
          g.dead = true;
          saveScore('racer', g.score);
          setDisplayScore(g.score);
          setUiState('dead');
          return;
        }
      }
    }

    // ── Render ────────────────────────────────────────────────────────────────

    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, HORIZON);
    sky.addColorStop(0, '#030610');
    sky.addColorStop(1, '#091228');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, HORIZON);

    // Stars
    for (let s = 0; s < 35; s++) {
      const sx = (camSegIdx * 7 + s * 139) % W;
      const sy = (camSegIdx * 11 + s * 83) % HORIZON;
      const sa = 0.25 + (s % 8) / 20;
      ctx.fillStyle = `rgba(255,255,255,${sa.toFixed(2)})`;
      ctx.fillRect(sx, sy, 1, 1);
    }

    // Road segments: draw back → front
    for (let n = DRAW_DIST - 1; n >= 0; n--) {
      const si  = (camSegIdx + n)     % NUM_SEGS;
      const si2 = (camSegIdx + n + 1) % NUM_SEGS;
      const worldZ1 = g.camZ + (n + 1) * SEG_LEN;
      const worldZ2 = g.camZ + n       * SEG_LEN;
      const xOff1 = offsets[n + 1] * ROAD_W;
      const xOff2 = offsets[n]     * ROAD_W;

      const far  = project(xOff1, worldZ1, g.camZ, camX);
      const near = project(xOff2, worldZ2, g.camZ, camX);
      const fog  = Math.max(0, Math.min(0.88, n / DRAW_DIST));

      drawSegment(ctx, near, far, Math.floor(si / 3) % 2 === 0, fog);

      // Draw NPCs in this depth band
      for (const npc of g.npcs) {
        const npcZ = npc.z;
        if (npcZ >= worldZ2 && npcZ < worldZ1) {
          const np = project(xOff2 + npc.laneX * ROAD_W, npcZ, g.camZ, camX);
          drawNPCCar(ctx, np, npc.color);
        }
      }
    }

    // Player car — shifts on screen as playerX changes so you see yourself steering
    const carScreenX = W / 2 - g.playerX * 120;
    drawPlayerCar(ctx, carScreenX);

    // HUD
    const kmh = Math.round((g.speed / MAX_SPEED) * 220);
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = '#f5d393';
    ctx.fillText(`SPEED  ${kmh} km/h`, 14, 22);
    ctx.fillStyle = '#4af3ff';
    ctx.fillText(`DIST   ${g.score} m`, 14, 40);

    // Speed bar
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.beginPath();
    ctx.roundRect(W - 114, 12, 100, 8, 4);
    ctx.fill();
    ctx.fillStyle = g.speed > MAX_SPEED * 0.85 ? '#f5d393' : '#4af3ff';
    ctx.fillRect(W - 113, 13, (g.speed / MAX_SPEED) * 98, 6);

    // Offroad warning
    if (onGrass) {
      ctx.fillStyle = 'rgba(255,95,87,0.8)';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('! OFFROAD — SLOWING DOWN !', W / 2 - 88, H - 10);
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // Key bindings — capture on window so keys work even without canvas focus
  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      const g = gs.current;
      if (uiStateRef.current !== 'playing') return;
      if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { e.preventDefault(); g.left  = true; }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { e.preventDefault(); g.right = true; }
      if (e.key === 'ArrowUp'    || e.key === 'w' || e.key === 'W') { e.preventDefault(); g.up    = true; }
      if (e.key === 'ArrowDown'  || e.key === 's' || e.key === 'S') { e.preventDefault(); g.down  = true; }
    };
    const up = (e: KeyboardEvent) => {
      const g = gs.current;
      if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') g.left  = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') g.right = false;
      if (e.key === 'ArrowUp'    || e.key === 'w' || e.key === 'W') g.up    = false;
      if (e.key === 'ArrowDown'  || e.key === 's' || e.key === 'S') g.down  = false;
    };
    window.addEventListener('keydown', dn, { capture: true });
    window.addEventListener('keyup',   up, { capture: true });
    return () => {
      window.removeEventListener('keydown', dn, { capture: true });
      window.removeEventListener('keyup',   up, { capture: true });
    };
  }, []);

  // Track uiState in a ref so key handler can read it without re-registering
  const uiStateRef = useRef(uiState);
  useEffect(() => { uiStateRef.current = uiState; }, [uiState]);

  // RAF control
  useEffect(() => {
    if (uiState === 'playing') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(loop);
    } else {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [uiState, loop]);

  return (
    <div
      className="h-full flex flex-col items-center justify-center"
      style={{ background: '#06090f' }}
      tabIndex={-1}
    >
      <div
        className="relative"
        style={{ width: W, height: H, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(245,211,147,0.15)' }}
      >
        <canvas ref={canvasRef} width={W} height={H} />

        {/* Idle overlay */}
        {uiState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5" style={{ background: 'rgba(6,9,15,0.93)' }}>
            <div className="font-mono font-bold" style={{ fontSize: 28, color: '#f5d393', letterSpacing: '0.2em' }}>ROAD RACER</div>
            <div className="font-mono text-center" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 2 }}>
              <span style={{ color: '#f5d393' }}>↑ W</span> Accelerate &nbsp;·&nbsp; <span style={{ color: '#f5d393' }}>↓ S</span> Brake<br />
              <span style={{ color: '#4af3ff' }}>← A</span> Steer Left &nbsp;·&nbsp; <span style={{ color: '#4af3ff' }}>→ D</span> Steer Right<br />
              Avoid traffic · Stay on road · Go fast
            </div>
            <button
              onClick={resetGame}
              className="font-mono px-10 py-2.5 rounded-lg"
              style={{ fontSize: 14, color: '#06090f', background: '#f5d393' }}
            >
              START ENGINE ▶
            </button>
          </div>
        )}

        {/* Crash overlay */}
        {uiState === 'dead' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: 'rgba(6,9,15,0.91)' }}>
            <div className="font-mono" style={{ fontSize: 11, color: 'rgba(255,95,87,0.9)', letterSpacing: '0.4em' }}>CRASHED</div>
            <div className="font-mono font-bold" style={{ fontSize: 32, color: '#f5d393' }}>{displayScore} m</div>
            <div className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Score saved to Leaderboard</div>
            <button
              onClick={resetGame}
              className="font-mono px-7 py-2 rounded-lg mt-1"
              style={{ fontSize: 13, color: '#f5d393', background: 'rgba(245,211,147,0.1)', border: '1px solid rgba(245,211,147,0.25)' }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="font-mono mt-2" style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>
        Click the game · use keyboard to drive
      </div>
    </div>
  );
}
