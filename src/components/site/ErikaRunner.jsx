import { useEffect, useRef, useState } from "react";

// Mini Erika vs. Toronto — a Chrome-dino-style runner (Nov 16, 2026).
// Player: Erika's chibi avatar, animated from her 17-frame sprite sheet:
// an 8-frame run cycle (legs move), an eyes-closed jump frame with
// sparkles, a standing-straight idle frame, and the eyes-closed "!!"
// frame for failing (cuter). Fireworks pop up in front of the game-over
// card for a few seconds on a new high score. Background: her
// sky-and-grass scene, scrolling left in a seamless loop
// (/game/bg-sky.jpg), gently scrolling. Obstacles: her Toronto sprite
// sheet (/game/obs-*.png), scaled up ~1.35x. The navy E-flag obstacle
// is NOT used (Erika doesn't like it). Physics: a floatier jump
// (gravity 0.5) and forgiving hitboxes, so every obstacle is physically
// clearable at every speed — verified by simulating the exact jump arc
// against all 26 obstacles. Space / ArrowUp / click / tap to jump.
// High score in localStorage.
const HIGH_KEY = "erika-runner-high";
const GRAVITY = 0.5;
const JUMP_V = -13.5;
const CHAR_X = 72;
const CHAR_H = 108;
const CHAR_W = 78;
const BG_SRC = "/game/bg-sky.jpg";
const BG_W = 2172;
const BG_H = 724;
const GRASS_TOP = 0.867; // grass starts 86.7% down the bg image
const AVATAR_SRC = "/game/mini-erika.png"; // single-frame backup only
const RUN_SRCS = [
  "/game/anim-run-01.png",
  "/game/anim-run-02.png",
  "/game/anim-run-03.png",
  "/game/anim-run-04.png",
  "/game/anim-run-05.png",
  "/game/anim-run-06.png",
  "/game/anim-run-07.png",
  "/game/anim-run-08.png",
];
const JUMP_SRC = "/game/anim-special-03a.png"; // eyes closed, sparkles
const IDLE_SRC = "/game/anim-special-04.png"; // standing straight
const FAIL_SRC = "/game/anim-special-06b.png"; // eyes closed, "!!" — for failing, cuter
const FIREWORKS_SRC = "/game/fireworks.webp"; // new-high-score celebration

// { src, h (game px), aspect (w/h), weight } — tall 2, medium 2, small 3.
const OBSTACLE_DEFS = [
  { src: "/game/obs-cn-tower.png", h: 146, aspect: 86 / 280, weight: 2 },
  { src: "/game/obs-condo.png", h: 146, aspect: 205 / 273, weight: 2 },
  { src: "/game/obs-tower-glass.png", h: 140, aspect: 198 / 257, weight: 2 },
  { src: "/game/obs-house-brick.png", h: 89, aspect: 237 / 238, weight: 2 },
  { src: "/game/obs-house-suburban.png", h: 84, aspect: 304 / 204, weight: 2 },
  { src: "/game/obs-shop-fruit-tea.png", h: 86, aspect: 242 / 234, weight: 2 },
  { src: "/game/obs-gym.png", h: 81, aspect: 232 / 182, weight: 2 },
  { src: "/game/obs-subway.png", h: 84, aspect: 217 / 202, weight: 2 },
  { src: "/game/obs-rogers-centre.png", h: 78, aspect: 254 / 142, weight: 2 },
  { src: "/game/obs-cherry-bench.png", h: 76, aspect: 262 / 221, weight: 2 },
  { src: "/game/obs-lamp.png", h: 76, aspect: 89 / 219, weight: 3 },
  { src: "/game/obs-sign-for-rent-sale.png", h: 76, aspect: 159 / 215, weight: 3 },
  { src: "/game/obs-sign-open-house.png", h: 65, aspect: 155 / 163, weight: 3 },
  { src: "/game/obs-hydrant.png", h: 59, aspect: 100 / 159, weight: 3 },
  { src: "/game/obs-bin-blue.png", h: 59, aspect: 111 / 140, weight: 3 },
  { src: "/game/obs-bin-black.png", h: 59, aspect: 111 / 146, weight: 3 },
  { src: "/game/obs-barrier.png", h: 57, aspect: 148 / 133, weight: 3 },
  { src: "/game/obs-boxes.png", h: 57, aspect: 147 / 136, weight: 3 },
  { src: "/game/obs-drink.png", h: 57, aspect: 98 / 155, weight: 3 },
  { src: "/game/obs-hydrangea.png", h: 54, aspect: 148 / 145, weight: 3 },
  { src: "/game/obs-house-small.png", h: 54, aspect: 163 / 130, weight: 3 },
  { src: "/game/obs-cone.png", h: 51, aspect: 97 / 117, weight: 3 },
  { src: "/game/obs-hedge.png", h: 49, aspect: 142 / 109, weight: 3 },
  { src: "/game/obs-keys.png", h: 49, aspect: 165 / 137, weight: 3 },
  { src: "/game/obs-dumbbell.png", h: 46, aspect: 171 / 115, weight: 3 },
  { src: "/game/obs-heel.png", h: 46, aspect: 152 / 125, weight: 3 },
];

function loadHigh() {
  try {
    return Number(window.localStorage.getItem(HIGH_KEY)) || 0;
  } catch {
    return 0;
  }
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
  ctx.fill();
}

function loadImg(src) {
  const img = new Image();
  img.src = src;
  return img;
}

export default function ErikaRunner() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("ready");
  const [finalScore, setFinalScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [high, setHigh] = useState(loadHigh);
  const fwTimerRef = useRef(null);
  const gRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");

    // Preload the background, the animation frames and every obstacle.
    const bgImg = loadImg(BG_SRC);
    const avatarImg = loadImg(AVATAR_SRC);
    const runImgs = RUN_SRCS.map(loadImg);
    const jumpImg = loadImg(JUMP_SRC);
    const idleImg = loadImg(IDLE_SRC);
    const failImg = loadImg(FAIL_SRC);
    loadImg(FIREWORKS_SRC); // warm the cache so it pops instantly on a new best
    const spriteImgs = new Map();
    for (const def of OBSTACLE_DEFS) {
      spriteImgs.set(def.src, loadImg(def.src));
    }

    const g = {
      phase: "ready",
      y: 0,
      vy: 0,
      speed: 5.2,
      obstacles: [],
      distance: 0,
      score: 0,
      high: loadHigh(),
      run: 0,
      bgX: 0,
      spawnIn: 90,
      w: 0,
      h: 0,
    };
    gRef.current = g;

    // The ground is the top of the grass in the bg image (cover-fit,
    // anchored to the bottom of the canvas).
    const bgGeom = () => {
      const scale = Math.max(g.w / BG_W, g.h / BG_H);
      return { dw: BG_W * scale, dh: BG_H * scale, dy: g.h - BG_H * scale };
    };
    const groundY = () => {
      const { dh, dy } = bgGeom();
      return dy + GRASS_TOP * dh;
    };
    const charTop = () => groundY() - CHAR_H;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = 340; // tall enough that her head stays in frame at jump apex
      g.w = w;
      g.h = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (g.phase === "ready") g.y = charTop();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const start = () => {
      g.phase = "playing";
      g.y = charTop();
      g.vy = 0;
      g.speed = 5.2;
      g.obstacles = [];
      g.distance = 0;
      g.score = 0;
      g.run = 0;
      g.spawnIn = 80;
      setIsNewBest(false);
      setShowFireworks(false);
      if (fwTimerRef.current) window.clearTimeout(fwTimerRef.current);
      setPhase("playing");
    };

    const jump = () => {
      if (g.phase !== "playing") {
        start();
        return;
      }
      if (g.y >= charTop() - 0.5) g.vy = JUMP_V;
    };
    g.jump = jump;
    g.start = start;

    const die = () => {
      g.phase = "over";
      const s = Math.floor(g.score);
      setFinalScore(s);
      const prev = loadHigh();
      const newBest = s > prev && s > 0;
      setIsNewBest(newBest);
      if (newBest) {
        setShowFireworks(true);
        if (fwTimerRef.current) window.clearTimeout(fwTimerRef.current);
        fwTimerRef.current = window.setTimeout(() => setShowFireworks(false), 3500);
        g.high = s;
        try {
          window.localStorage.setItem(HIGH_KEY, String(s));
        } catch {
          /* ignore */
        }
        setHigh(s);
      }
      setPhase("over");
    };

    const pickDef = () => {
      const loaded = OBSTACLE_DEFS.filter((d) => {
        const img = spriteImgs.get(d.src);
        return img && img.complete && img.naturalWidth > 0;
      });
      const pool = loaded.length ? loaded : OBSTACLE_DEFS;
      const total = pool.reduce((sum, d) => sum + d.weight, 0);
      let roll = Math.random() * total;
      for (const d of pool) {
        roll -= d.weight;
        if (roll <= 0) return d;
      }
      return pool[pool.length - 1];
    };

    const spawnObstacle = () => {
      const def = pickDef();
      const w = Math.round(def.h * def.aspect);
      g.obstacles.push({
        def,
        x: g.w + 20,
        y: groundY() - def.h,
        w,
        h: def.h,
      });
    };

    // Fallback character (canvas-drawn, 72px coords) if no image loads.
    const drawErikaFallback = () => {
      const x = 0;
      const y = 0;
      const jumping = g.y < charTop() - 0.5;
      const swing = jumping ? 0 : Math.sin(g.run) * 7;
      ctx.fillStyle = "#1f2a44";
      rr(ctx, x + 10 - (jumping ? 0 : Math.max(0, swing)), y + 48, 6, 16, 3);
      rr(ctx, x + 20 + (jumping ? 0 : Math.max(0, -swing)), y + 48, 6, 16, 3);
      ctx.fillStyle = "#f472b6";
      if (jumping) {
        rr(ctx, x + 2, y + 22, 6, 16, 3);
        rr(ctx, x + 30, y + 22, 6, 16, 3);
      } else {
        rr(ctx, x + 1, y + 26 + swing * 0.4, 6, 15, 3);
        rr(ctx, x + 31, y + 26 - swing * 0.4, 6, 15, 3);
      }
      ctx.fillStyle = "#f472b6";
      rr(ctx, x + 3, y + 22, 32, 30, 10);
      ctx.fillStyle = "#ec5da8";
      ctx.fillRect(x + 3, y + 48, 32, 4);
      ctx.fillStyle = "#f6cfae";
      ctx.beginPath();
      ctx.arc(x + 19, y + 12, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#241a12";
      ctx.beginPath();
      ctx.arc(x + 19, y + 10, 12, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(x + 6, y + 8, 5, 16);
      ctx.fillRect(x + 27, y + 8, 5, 16);
      ctx.beginPath();
      ctx.arc(x + 19, y + 9, 12, Math.PI * 1.05, Math.PI * 1.95);
      ctx.fill();
      ctx.fillStyle = "#241a12";
      ctx.beginPath();
      ctx.arc(x + 15, y + 13, 1.4, 0, Math.PI * 2);
      ctx.arc(x + 23, y + 13, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#241a12";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(x + 19, y + 16, 3.5, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "rgba(244,114,182,0.55)";
      ctx.beginPath();
      ctx.arc(x + 12, y + 17, 2.2, 0, Math.PI * 2);
      ctx.arc(x + 26, y + 17, 2.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const frameImg = () => {
      if (g.phase === "over") return failImg;
      if (g.phase === "ready") return idleImg;
      if (g.y < charTop() - 0.5) return jumpImg;
      return runImgs[Math.floor(g.run / 2) % runImgs.length];
    };

    const drawAvatar = () => {
      let img = frameImg();
      if (!img || !img.complete || img.naturalWidth === 0) img = avatarImg;
      if (!img || !img.complete || img.naturalWidth === 0) {
        ctx.save();
        ctx.translate(CHAR_X, g.y);
        ctx.scale(CHAR_H / 72, CHAR_H / 72);
        drawErikaFallback();
        ctx.restore();
        return;
      }
      const w = CHAR_H * (img.naturalWidth / img.naturalHeight);
      const jumping = g.y < charTop() - 0.5;
      // No vertical bob: the run-cycle frames move her legs, and the bob
      // made the whole sprite tremble. She only tilts while airborne.
      ctx.save();
      ctx.translate(CHAR_X + CHAR_W / 2, g.y + CHAR_H / 2);
      ctx.rotate(jumping ? -0.12 : 0);
      ctx.drawImage(img, -w / 2, -CHAR_H / 2, w, CHAR_H);
      ctx.restore();
    };

    const drawBg = () => {
      if (!bgImg.complete || bgImg.naturalWidth === 0) {
        ctx.fillStyle = "#bcd9ff";
        ctx.fillRect(0, 0, g.w, g.h);
        return;
      }
      const { dw, dh, dy } = bgGeom();
      // The bg tiles seamlessly, so scroll it left forever: two copies,
      // wrapping around, always moving left — never ping-ponging back.
      const off = g.bgX % dw;
      ctx.drawImage(bgImg, -off, dy, dw, dh);
      ctx.drawImage(bgImg, -off + dw, dy, dw, dh);
    };

    const draw = () => {
      drawBg();
      for (const o of g.obstacles) {
        const img = spriteImgs.get(o.def.src);
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, o.x, o.y, o.w, o.h);
        }
      }
      drawAvatar();
      // Score — royal blue with a soft white halo so it reads over sky.
      ctx.save();
      ctx.shadowColor = "rgba(255,255,255,0.9)";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "#0300a6";
      ctx.font = "700 15px 'Open Sans', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`SCORE ${String(Math.floor(g.score)).padStart(4, "0")}`, g.w - 16, 28);
      ctx.fillStyle = "rgba(3,0,166,0.55)";
      ctx.font = "600 13px 'Open Sans', sans-serif";
      ctx.fillText(`BEST ${String(Math.max(g.high, Math.floor(g.score))).padStart(4, "0")}`, g.w - 16, 48);
      ctx.restore();
      ctx.textAlign = "left";
    };

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (g.phase === "playing") {
        g.vy += GRAVITY;
        g.y += g.vy;
        if (g.y >= charTop()) {
          g.y = charTop();
          g.vy = 0;
        }
        g.distance += g.speed;
        g.bgX += g.speed * 0.5;
        g.score = g.distance / 14;
        g.speed = Math.min(11, 5.2 + g.score * 0.004);
        g.run += g.speed * 0.12;
        g.spawnIn -= g.speed;
        if (g.spawnIn <= 0) {
          spawnObstacle();
          g.spawnIn = 380 + Math.random() * 420;
        }
        for (const o of g.obstacles) o.x -= g.speed;
        g.obstacles = g.obstacles.filter((o) => o.x + o.w > -20);
        // Forgiving hitboxes (sim-verified: every obstacle is clearable
        // at every speed): her box is her body's core, each obstacle's
        // box is the middle 70% of its picture, so clipping a roof edge
        // or a chimney doesn't kill her.
        const cx0 = CHAR_X + 16;
        const cx1 = CHAR_X + 62;
        const cy0 = g.y + 6;
        const cy1 = g.y + CHAR_H - 2;
        for (const o of g.obstacles) {
          const ocx0 = o.x + o.w * 0.15;
          const ocx1 = o.x + o.w * 0.85;
          if (cx1 > ocx0 && cx0 < ocx1 && cy1 > o.y + 4 && cy0 < o.y + o.h) {
            die();
            break;
          }
        }
      }
      draw();
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e) => {
      const isJump = e.code === "Space" || e.code === "ArrowUp" || e.key === " " || e.key === "ArrowUp";
      if (!isJump) return;
      const r = canvas.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      e.preventDefault();
      jump();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("keydown", onKey);
      if (fwTimerRef.current) window.clearTimeout(fwTimerRef.current);
    };
  }, []);

  const tap = () => {
    const g = gRef.current;
    if (g && g.jump) g.jump();
  };

  return (
    <div ref={wrapRef} className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-[0_24px_70px_-24px_rgba(3,0,166,0.25)]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Mini Erika runner game. Press space, click or tap to jump over houses and buildings."
        className="block w-full cursor-pointer select-none"
        style={{ touchAction: "manipulation" }}
        onPointerDown={tap}
      />
      {phase === "ready" && (
        <button
          type="button"
          onClick={tap}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/25"
        >
          <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg">
            Press space or tap to run
          </span>
          <span className="text-xs font-medium text-foreground/70">Jump the obstacles to get to her next showing!</span>
        </button>
      )}
      {phase === "over" && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]"
          onPointerDown={tap}
        >
          {isNewBest && showFireworks && (
            <img
              src="/game/fireworks.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 h-full w-full animate-pulse object-contain"
            />
          )}
          <div className="relative rounded-3xl bg-white px-8 py-6 text-center shadow-xl">
            <p className="eyebrow">Game over</p>
            <p className="mt-2 font-heading text-4xl">
              {finalScore} <span className="text-lg text-foreground/60">pts</span>
            </p>
            <p className="mt-1 text-sm text-foreground/70">
              Best: {high} {finalScore >= high && finalScore > 0 ? "— new best!" : ""}
            </p>
            <button type="button" onClick={tap} className="btn-primary mt-5">
              Play again
            </button>
            <p className="mt-3 text-xs text-foreground/50">or press space, or tap anywhere</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between border-t border-primary/10 px-5 py-3 text-xs font-medium text-foreground/60">
        <span>SPACE · CLICK · TAP to jump</span>
        <span>Best: {high}</span>
      </div>
    </div>
  );
}
