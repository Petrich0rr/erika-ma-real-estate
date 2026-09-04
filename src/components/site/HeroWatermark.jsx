const LOGO_URL =
  "https://media.base44.com/images/public/6a79030aec60e25b597174ab/dcc5b08de_PNG_Icon_Gold.png";

// Gold "EM" monogram watermark. The logo image is gold-on-black; we use it as a
// *luminance mask* over a gold gradient fill so the black background drops out
// (low luminance → transparent) and the gold strokes shape the fill (high
// luminance). The watermark fills its positioned ancestor (which must be
// `relative` + `overflow-hidden`) and the monogram is sized with
// `mask-size: contain` so the full logo is always visible and never cropped.
export default function HeroWatermark({
  opacity = 0.04,
  className = "inset-0 w-full h-full",
  maskPosition = "center",
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none select-none z-0 ${className}`}
      style={{
        background: "linear-gradient(135deg, #E6C65A 0%, #B8860B 55%, #8B6914 100%)",
        maskImage: `url(${LOGO_URL})`,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition,
        maskMode: "luminance",
        WebkitMaskImage: `url(${LOGO_URL})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: maskPosition,
        opacity,
      }}
    />
  );
}