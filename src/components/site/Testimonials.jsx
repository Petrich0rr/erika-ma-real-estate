import Reveal from "@/components/site/Reveal";
import GoogleReviewsCarousel from "@/components/site/GoogleReviewsCarousel";

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-sand">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="mb-14 text-center">
          <span className="eyebrow">Client Stories</span>
          <h2 className="mt-4 font-heading text-4xl md:text-5xl">In their words</h2>
        </Reveal>
        <GoogleReviewsCarousel />
      </div>
    </section>
  );
}