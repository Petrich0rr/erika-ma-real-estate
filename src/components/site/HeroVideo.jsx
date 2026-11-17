const HERO_VIDEO_URL =
  "https://base44.app/api/apps/6a79030aec60e25b597174ab/files/mp/public/6a79030aec60e25b597174ab/2299e6d96_TorontoSkylineHero.mp4";

/**
 * Full-bleed Toronto skyline video behind the hero, with a 35% black scrim so
 * the white hero copy stays readable over the brightest frames.
 *
 * The video is shifted down and zoomed slightly so the CN Tower tip, which
 * sits at the very top of the frame, clears the fixed translucent header
 * instead of hiding behind it. The small gap this leaves at the top sits
 * behind the header, so it never shows.
 */
export default function HeroVideo() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "translateY(88px) scale(1.25)", transformOrigin: "center" }}
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