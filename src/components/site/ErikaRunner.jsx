import { useEffect, useRef, useState } from "react";

// Mini Erika vs. Toronto — a Chrome-dino-style runner (Nov 16, 2026).
// Chibi Erika (dark bob, pink coat) jumps houses, condos and hydrants.
// Space / ArrowUp / click / tap to jump. High score in localStorage.
const HIGH_KEY = "erika-runner-high";
const GRAVITY = 0.6;
const JUMP_V = -13;
const CHAR_X = 72;
const CHAR_H = 64;

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

export default function ErikaRunner() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("ready");
  const [finalScore, setFinalScore] = useState(0);
  const [high, setHigh] = useState(loadHigh);
  const gRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");

    const g = {
      phase: "ready",
      y: 0,
      vy: 0,
      speed: 5.2,
      obstacles: [],
      clouds: [],
      distance: 0,
      score: 0,
      run: 0,
      spawnIn: 90,
      w: 0,
      h: 0,
      skylineX: 0,
    };
    gRef.current = g;

    const groundY = () => g.h - 34;
    const charTop = () => groundY() - CHAR_H;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = w < 640 ? 260 : 320;
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

    for (let i = 0; i < 5; i++) {
      g.clouds.push({ x: Math.random() * 1100, y: 22 + Math.random() * 70, s: 0.6 + Math.random() * 0.8 });
    }

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
      if (s > prev) {
        try {
          window.localStorage.setItem(HIGH_KEY, String(s));
        } catch {
          /* ignore */
        }
        setHigh(s);
      }
      setPhase("over");
    };

    const spawnObstacle = () => {
      const roll = Math.random();
      const gy = groundY();
      if (roll < 0.42) {
        const w = 52;
        const h = 54;
        g.obstacles.push({
          kind: "house",
          x: g.w + 20,
          y: gy - h,
          w,
          h,
          color: Math.random() < 0.5 ? "#0300a6" : "#d96a4f",
        });
      } else if (roll < 0.8) {
        const w = 44;
        const h = 92 + Math.random() * 46;
        g.obstacles.push({ kind: "building", x: g.w + 20, y: gy - h, w, h });
      } else {
        const w = 24;
        const h = 32;
        g.obstacles.push({ kind: "hydrant", x: g.w + 20, y: gy - h, w, h });
      }
    };

    const drawCloud = (c) => {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, 34 * c.s, 13 * c.s, 0, 0, Math.PI * 2);
      ctx.ellipse(c.x + 22 * c.s, c.y + 4 * c.s, 24 * c.s, 10 * c.s, 0, 0, Math.PI * 2);
      ctx.ellipse(c.x - 22 * c.s, c.y + 5 * c.s, 20 * c.s, 9 * c.s, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSkyline = () => {
      ctx.fillStyle = "#b9d2f2";
      const step = 190;
      let x = -((g.skylineX % step) + step) % step - 40;
      let i = 0;
      while (x < g.w + 40) {
        const gy = groundY();
        if (i % 3 === 2) {
          // CN Tower
          ctx.fillRect(x + 18, gy - 128, 9, 128);
          ctx.beginPath();
          ctx.ellipse(x + 22, gy - 96, 15, 7, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(x + 21, gy - 150, 2, 24);
        } else {
          const bw = 64 + (i % 2) * 22;
          const bh = 42 + ((i * 37) % 52);
          ctx.fillRect(x, gy - bh, bw, bh);
        }
        x += step;
        i += 1;
      }
    };

    const drawHouse = (o) => {
      ctx.fillStyle = "#f7e3c2";
      ctx.fillRect(o.x, o.y + 20, o.w, o.h - 20);
      ctx.fillStyle = o.color;
      ctx.beginPath();
      ctx.moveTo(o.x - 4, o.y + 22);
      ctx.lineTo(o.x + o.w / 2, o.y);
      ctx.lineTo(o.x + o.w + 4, o.y + 22);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#8a5a2b";
      ctx.fillRect(o.x + o.w / 2 - 6, o.y + o.h - 22, 12, 22);
      ctx.fillStyle = "#bcd8f7";
      ctx.fillRect(o.x + 7, o.y + 28, 11, 11);
      ctx.fillRect(o.x + o.w - 18, o.y + 28, 11, 11);
    };

    const drawBuilding = (o) => {
      ctx.fillStyle = "#9db4dd";
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.fillStyle = "#dbe7fa";
      for (let row = 0; row < Math.floor((o.h - 14) / 20); row++) {
        for (let col = 0; col < 2; col++) {
          ctx.fillRect(o.x + 7 + col * 19, o.y + 10 + row * 20, 10, 12);
        }
      }
      ctx.fillStyle = "#0300a6";
      ctx.fillRect(o.x, o.y, o.w, 4);
    };

    const drawHydrant = (o) => {
      ctx.fillStyle = "#d94f3d";
      rr(ctx, o.x + 4, o.y + 8, 16, o.h - 8, 5);
      ctx.beginPath();
      ctx.arc(o.x + 12, o.y + 8, 8, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = "#b93a2c";
      ctx.fillRect(o.x, o.y + 16, 4, 6);
      ctx.fillRect(o.x + o.w - 4, o.y + 16, 4, 6);
    };

    const drawErika = () => {
      const x = CHAR_X;
      const y = g.y;
      const jumping = g.y < charTop() - 0.5;
      const swing = jumping ? 0 : Math.sin(g.run) * 7;
      // legs
      ctx.fillStyle = "#1f2a44";
      rr(ctx, x + 10 - (jumping ? 0 : Math.max(0, swing)), y + 48, 6, 16, 3);
      rr(ctx, x + 20 + (jumping ? 0 : Math.max(0, -swing)), y + 48, 6, 16, 3);
      // arms (up when jumping)
      ctx.fillStyle = "#f472b6";
      if (jumping) {
        rr(ctx, x + 2, y + 22, 6, 16, 3);
        rr(ctx, x + 30, y + 22, 6, 16, 3);
      } else {
        rr(ctx, x + 1, y + 26 + swing * 0.4, 6, 15, 3);
        rr(ctx, x + 31, y + 26 - swing * 0.4, 6, 15, 3);
      }
      // pink coat
      ctx.fillStyle = "#f472b6";
      rr(ctx, x + 3, y + 22, 32, 30, 10);
      ctx.fillStyle = "#ec5da8";
      ctx.fillRect(x + 3, y + 48, 32, 4);
      // head
      ctx.fillStyle = "#f6cfae";
      ctx.beginPath();
      ctx.arc(x + 19, y + 12, 11, 0, Math.PI * 2);
      ctx.fill();
      // hair: dark bob
      ctx.fillStyle = "#241a12";
      ctx.beginPath();
      ctx.arc(x + 19, y + 10, 12, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(x + 6, y + 8, 5, 16);
      ctx.fillRect(x + 27, y + 8, 5, 16);
      ctx.beginPath();
      ctx.arc(x + 19, y + 9, 12, Math.PI * 1.05, Math.PI * 1.95);
      ctx.fill();
      // face
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

    const draw = () => {
      const sky = ctx.createLinearGradient(0, 0, 0, g.h);
      sky.addColorStop(0, "#cfe4ff");
      sky.addColorStop(1, "#f4f8ff");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, g.w, g.h);
      // sun
      ctx.fillStyle = "rgba(255,233,168,0.85)";
      ctx.beginPath();
      ctx.arc(g.w - 84, 54, 26, 0, Math.PI * 2);
      ctx.fill();
      for (const c of g.clouds) drawCloud(c);
      drawSkyline();
      // ground
      ctx.fillStyle = "#e6eefb";
      ctx.fillRect(0, groundY(), g.w, 34);
      ctx.fillStyle = "#0300a6";
      ctx.fillRect(0, groundY(), g.w, 3);
      for (const o of g.obstacles) {
        if (o.kind === "house") drawHouse(o);
        else if (o.kind === "building") drawBuilding(o);
        else drawHydrant(o);
      }
      drawErika();
      // score
      ctx.fillStyle = "#0300a6";
      ctx.font = "700 15px 'Open Sans', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`SCORE ${String(Math.floor(g.score)).padStart(4, "0")}`, g.w - 16, 28);
      ctx.fillStyle = "rgba(3,0,166,0.55)";
      ctx.font = "600 13px 'Open Sans', sans-serif";
      ctx.fillText(`BEST ${String(Math.max(high, Math.floor(g.score))).padStart(4, "0")}`, g.w - 16, 48);
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
        const cx0 = CHAR_X + 10;
        const cx1 = CHAR_X + 36;
        const cy0 = g.y + 4;
        const cy1 = g.y + CHAR_H;
        for (const o of g.obstacles) {
          if (cx1 > o.x + 5 && cx0 < o.x + o.w - 5 && cy1 > o.y + 4 && cy0 < o.y + o.h) {
            die();
            break;
          }
        }
      }
      g.skylineX -= g.phase === "playing" ? g.speed * 0.25 : 0.4;
      for (const c of g.clouds) {
        c.x -= g.phase === "playing" ? 0.5 : 0.25;
        if (c.x < -90) {
          c.x = g.w + 40;
          c.y = 22 + Math.random() * 70;
        }
      }
      draw();
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e) => {
      if (e.code !== "Space" && e.code !== "ArrowUp") return;
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
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/25 backdrop-blur-[1px]"
        >
          <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg">
            Press space or tap to run
          </span>
          <span className="text-xs font-medium text-foreground/70">Jump the houses and condos — don&apos;t trip!</span>
        </button>
      )}
      {phase === "over" && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
          <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-xl">
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
