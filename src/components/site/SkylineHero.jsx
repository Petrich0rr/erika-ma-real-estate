import { motion, useReducedMotion } from "framer-motion";

const SKYLINE_URL =
  "https://media.base44.com/images/public/6a79030aec60e25b597174ab/e8f9428c4_ChatGPTImageSep3202601_57_51AM.png";

// The source art is 2172×724 (3:1) — Toronto's skyline glowing against a black
// sky. Placed on a white hero, blend modes make it disappear, so instead the
// art is used as a *luminance mask* over the brand royal blue: the black sky
// drops out (low luminance → transparent) and the lit buildings fill with blue,
// giving a soft silhouette.
//
// The wrapper is slightly shorter than the image (3.41:1 vs 3:1) so the bottom
// 12% water band is cropped and the building line sits flush with the hero's
// bottom edge.
const SKYLINE_ASPECT = 3.41; // 3 / 0.88 — full width, bottom 12% water cropped
const SKYLINE_IMAGE_ASPECT = "2172 / 724";

// Light points placed over the building band. Each twinkle is slow and offset
// so the effect feels organic, never synced. Tops are tuned to the building
// band of the visible skyline (≈62–81% of the box).
const TWINKLES = [
  { left: "8%",  top: "77.9%", s: 2.5, d: 6.2, dl: 0.3 },
  { left: "14%", top: "72.4%", s: 2,   d: 7.4, dl: 1.1 },
  { left: "21%", top: "80.7%", s: 2.5, d: 5.8, dl: 2.0 },
  { left: "27%", top: "68.4%", s: 2,   d: 8.1, dl: 0.6 },
  { left: "33%", top: "76.6%", s: 3,   d: 6.6, dl: 1.8 },
  { left: "40%", top: "64.2%", s: 2,   d: 7.9, dl: 0.9 },
  { left: "44%", top: "73.2%", s: 2.5, d: 5.5, dl: 2.4 },
  { left: "49%", top: "67.0%", s: 2,   d: 6.9, dl: 1.3 },
  { left: "55%", top: "78.7%", s: 2.5, d: 7.2, dl: 0.4 },
  { left: "62%", top: "70.4%", s: 2,   d: 8.4, dl: 2.1 },
  { left: "68%", top: "80.0%", s: 3,   d: 6.0, dl: 1.0 },
  { left: "74%", top: "66.3%", s: 2,   d: 7.6, dl: 0.7 },
  { left: "81%", top: "75.2%", s: 2.5, d: 6.4, dl: 2.6 },
  { left: "88%", top: "71.1%", s: 2,   d: 8.0, dl: 1.5 },
];

export default function SkylineHero() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none z-0"
      style={{ aspectRatio: `${SKYLINE_ASPECT} / 1`, opacity: 0.3 }}
    >
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          aspectRatio: SKYLINE_IMAGE_ASPECT,
          background: "hsl(var(--primary))",
          maskImage: `url(${SKYLINE_URL})`,
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
          maskPosition: "top left",
          maskMode: "luminance",
          WebkitMaskImage: `url(${SKYLINE_URL})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          WebkitMaskPosition: "top left",
        }}
      />

      {TWINKLES.map((t, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: t.left,
            top: t.top,
            width: t.s,
            height: t.s,
            opacity: reduce ? 0.5 : 1,
            background: "hsl(var(--primary))",
            boxShadow: "0 0 6px 2px hsl(var(--primary) / 0.35)",
          }}
          animate={reduce ? undefined : { opacity: [0.1, 0.95, 0.1] }}
          transition={
            reduce
              ? undefined
              : { duration: t.d, delay: t.dl, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}