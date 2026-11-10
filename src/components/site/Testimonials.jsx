import { Image } from "@/components/ui/image";
import TestimonialDeck from "@/components/site/TestimonialDeck";

const LIVING_ROOM =
  "https://media.base44.com/images/public/6a79030aec60e25b597174ab/eaf950263_generated_image.png";

export default function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl leading-[1.06] text-foreground md:text-5xl lg:text-[3.5rem]">
            Real Experiences from My Clients
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-foreground/70 md:text-base">
            What it is actually like working with me in Toronto and the GTA
          </p>
        </header>

        <div className="relative mt-12 overflow-hidden rounded-[2rem] md:mt-16">
          <Image
            src={LIVING_ROOM}
            alt=""
            fittingType="fill"
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/80" />
          <div className="relative px-5 pb-16 pt-20 sm:px-8 md:px-16 md:pb-20 md:pt-24">
            <TestimonialDeck />
          </div>
        </div>
      </div>
    </section>
  );
}