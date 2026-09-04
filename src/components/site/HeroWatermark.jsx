const LOGO_URL =
  "https://media.base44.com/images/public/6a79030aec60e25b597174ab/dcc5b08de_PNG_Icon_Gold.png";

// Oversized, low-opacity "EM" monogram watermark for the hero.
// The logo image is gold-on-black. Screen/lighten blends drop the black but
// also make light gold invisible on the light beige hero, so instead we use
// the logo as a *luminance mask* over a gold gradient fill: the black
// background becomes transparent (low luminance) and the gold strokes shape
// the fill (high luminance). Clipped to the hero via overflow-hidden.
export default function HeroWatermark() {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none z-0 w-[92vw] h-[92vw] md:w-[60vw] md:h-[60vw] max-w-[1400px] max-h-[1400px] -top-[8%] -left-[12%] md:-top-[14%] md:-left-[10%]"
      style={{
        background: "linear-gradient(135deg, #E6C65A 0%, #B8860B 55%, #8B6914 100%)",
        maskImage: `url(${LOGO_URL})`,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center",
        maskMode: "luminance",
        WebkitMaskImage: `url(${LOGO_URL})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center",
        opacity: 0.04,
      }}
    />
  );
}