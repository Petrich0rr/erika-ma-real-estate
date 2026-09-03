import { motion, useReducedMotion } from "framer-motion";

const SKYLINE_URL =
  "https://media.base44.com/images/public/6a79030aec60e25b597174ab/e8f9428c4_ChatGPTImageSep3202601_57_51AM.png";

// A small, tasteful set of light points placed over the building band.
// Each twinkle is slow and offset so the effect feels organic, never synced.
const TWINKLES = [
  { left: "8%",  top: "54%", s: 2.5, d: 6.2, dl: 0.3 },
  { left: "14%", top: "46%", s: 2,   d: 7.4, dl: 1.1 },
  { left: "21%", top: "58%", s: 2.5, d: 5.8, dl: 2.0 },
  { left: "27%", top: "40%", s: 2,   d: 8.1, dl: 0.6 },
  { left: "33%", top: "52%", s: 3,   d: 6.6, dl: 1.8 },
  { left: "40%", top: "34%", s: 2,   d: 7.9, dl: 0.9 },
  { left: "44%", top: "47%", s: 2.5, d: 5.5, dl: 2.4 },
  { left: "49%", top: "38%", s: 2,   d: 6.9, dl: 1.3 },
  { left: "55%", top: "55%", s: 2.5, d: 7.2, dl: 0.4 },
  { left: "62%", top: "43%", s: 2,   d: 8.4, dl: 2.1 },
  { left: "68%", top: "57%", s: 3,   d: 6.0, dl: 1.0 },
  { left: "74%", top: "37%", s: 2,   d: 7.6, dl: 0.7 },
  { left: "81%", top: "50%", s: 2.5, d: 6.4, dl: 2.6 },
  { left: "88%", top: "44%", s: 2,   d: 8.0, dl: 1.5 },
];

export default function SkylineHero() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-[34vh] md:h-[44vh] overflow-hidden pointer-events-none z-0"
    >
      <img
        src={SKYLINE_URL}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center bottom",
          mixBlendMode: "screen",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 14%, #000 34%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 14%, #000 34%)",
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
            background: "rgba(196,218,255,0.95)",
            boxShadow: "0 0 6px 2px rgba(150,190,255,0.5)",
          }}
          animate={reduce ? undefined : { opacity: [0.1, 0.95, 0.1] }}
          transition={
            reduce
              ? undefined
              : { duration: t.d, delay: t.dl, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[32%]"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0px, rgba(150,190,255,0.06) 42px, transparent 96px, rgba(150,190,255,0.045) 150px, transparent 210px)",
          mixBlendMode: "screen",
        }}
        animate={reduce ? undefined : { x: ["-13%", "13%", "-13%"] }}
        transition={
          reduce ? undefined : { duration: 17, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}