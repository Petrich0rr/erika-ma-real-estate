// Compressed locally (Nov 16, 2026): same 1920x1080, 30fps, 15s — 21MB down
// to ~8.2MB with no visible quality loss (CRF 22, audio stripped — the
// video plays muted). Original source (Base44 media):
// https://base44.app/api/apps/6a79030aec60e25b597174ab/files/mp/public/6a79030aec60e25b597174ab/2299e6d96_TorontoSkylineHero.mp4
const HERO_VIDEO_URL = "/hero-skyline.mp4";
const HERO_POSTER_URL = "/hero-poster.jpg";

/**
 * Full-bleed Toronto skyline video behind the hero, with a 35% black scrim so
 * the white hero copy stays readable over the brightest frames.
 */
export default function HeroVideo() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_URL}
        poster={HERO_POSTER_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}