import { useEffect, useRef } from "react";

// Subtle, ambient falling-skyline animation.
// Building silhouettes (CN Tower, condos, houses, townhouses, skyscrapers)
// drift down slowly, settle at the bottom of the viewport, and gently
// react to the mouse. Rendered on a fixed, pointer-events-none canvas
// behind page content. Brand blue #0300A6 with dimensional opacity.

const BRAND = "#0300A6";
const TYPES = ["cnTower", "condo", "house", "townhouse", "skyscraper", "skyscraper2"];

function drawBuilding(ctx, type, w, h) {
  switch (type) {
    case "cnTower": {
      const cx = w / 2;
      ctx.fillRect(cx - 1, 0, 2, h * 0.42);                       // antenna
      ctx.fillRect(cx - w * 0.24, h * 0.4, w * 0.48, h * 0.1);      // pod
      ctx.fillRect(cx - w * 0.1, h * 0.48, w * 0.2, h * 0.46);      // shaft
      ctx.fillRect(cx - w * 0.28, h * 0.92, w * 0.56, h * 0.08);    // base
      break;
    }
    case "condo": {
      ctx.fillRect(0, h * 0.22, w, h * 0.78);
      ctx.fillRect(-w * 0.06, h * 0.16, w * 1.12, h * 0.07);
      break;
    }
    case "house": {
      ctx.beginPath();
      ctx.moveTo(0, h * 0.38);
      ctx.lineTo(w * 0.5, 0);
      ctx.lineTo(w, h * 0.38);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "townhouse": {
      const u = w / 3;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * u, h * 0.32);
        ctx.lineTo(i * u + u / 2, 0);
        ctx.lineTo(i * u + u, h * 0.32);
        ctx.lineTo(i * u + u, h);
        ctx.lineTo(i * u, h);
        ctx.closePath();
        ctx.fill();
      }
      break;
    }
    case "skyscraper": {
      ctx.fillRect(w * 0.22, 0, w * 0.56, h);
      ctx.fillRect(0, h * 0.62, w, h * 0.38);
      break;
    }
    case "skyscraper2": {
      ctx.fillRect(w * 0.32, 0, w * 0.36, h * 0.5);
      ctx.fillRect(w * 0.16, h * 0.28, w * 0.68, h * 0.72);
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
      break;
    }
    default:
      ctx.fillRect(0, 0, w, h);
  }
}

export default function FallingSkyline() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let buildings = [];
    let mouse = { x: 0.5, tx: 0.5 };
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildings.forEach((b) => {
        b.settleY = H - b.h - b.groundOffset;
        if (b.settled) b.y = b.settleY;
      });
    };

    const makeBuildings = () => {
      const count = isMobile ? 7 : 16;
      const arr = [];
      for (let i = 0; i < count; i++) {
        const type = TYPES[Math.floor(Math.random() * TYPES.length)];
        const h = isMobile ? 40 + Math.random() * 70 : 60 + Math.random() * 130;
        const w = h * (0.5 + Math.random() * 0.7);
        const groundOffset = Math.random() * 30;
        arr.push({
          type,
          w,
          h,
          x: Math.random() * W,
          y: reduce ? H - h - groundOffset : -h - Math.random() * H * 1.4,
          settleY: H - h - groundOffset,
          vy: 16 + Math.random() * 24,
          opacity: 0.05 + Math.random() * 0.12,
          depth: 0.4 + Math.random() * 0.6,
          swayPhase: Math.random() * Math.PI * 2,
          swayAmp: 5 + Math.random() * 9,
          settled: reduce,
          groundOffset,
        });
      }
      return arr;
    };

    const onMove = (e) => {
      mouse.tx = e.clientX / W;
    };
    const onLeave = () => {
      mouse.tx = 0.5;
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BRAND;
      const t = performance.now() / 1000;
      buildings.forEach((b) => {
        const sway = Math.sin(t * 0.4 + b.swayPhase) * (b.settled ? b.swayAmp * 0.3 : b.swayAmp);
        const parallax = b.settled ? (mouse.x - 0.5) * 2 * b.depth * 18 : 0;
        ctx.save();
        ctx.translate(b.x + sway + parallax, b.y);
        ctx.globalAlpha = b.opacity;
        drawBuilding(ctx, b.type, b.w, b.h);
        ctx.restore();
      });
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      if (!reduce) {
        buildings.forEach((b) => {
          if (!b.settled) {
            b.y += b.vy * dt;
            if (b.y >= b.settleY) {
              b.y = b.settleY;
              b.settled = true;
            }
          }
        });
      }
      render();
      raf = requestAnimationFrame(frame);
    };

    resize();
    buildings = makeBuildings();
    window.addEventListener("resize", resize);
    if (!isMobile) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }
    if (reduce) {
      render();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}