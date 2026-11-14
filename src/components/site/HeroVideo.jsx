const HERO_VIDEO_URL =
  "https://base44.app/api/apps/6a79030aec60e25b597174ab/files/mp/public/6a79030aec60e25b597174ab/2299e6d96_TorontoSkylineHero.mp4";

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