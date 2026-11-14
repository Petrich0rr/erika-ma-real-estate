import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";

// Each card below is written out on its own — with its own photo, headline and
// subtext — so editing one card never changes the other two.
export default function FeaturedListingsPlaceholder() {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      <Reveal>
        <div>
          <div className="relative overflow-hidden aspect-[4/3] bg-sand">
            <Image
              src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/01c0a85cf_generated_51e45374.png"
              alt="Featured listing"
              fittingType="fill"
              className="w-full h-full"
            />
            <span className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em]">EXCLUSIVE LISTING</span>
          </div>
          <div className="pt-5">
            <h3 className="font-heading text-xl">Featured Listing</h3>
            <p className="text-muted-foreground text-sm mt-1">Property details available soon.</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div>
          <div className="relative overflow-hidden aspect-[4/3] bg-sand">
            <Image
              src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/12d4f44fd_generated_4eded120.png"
              alt="Signature listing"
              fittingType="fill"
              className="w-full h-full"
            />
            <span className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em]">SIGNATURE LISTING</span>
          </div>
          <div className="pt-5">
            <h3 className="font-heading text-xl">Signature Listing</h3>
            <p className="text-muted-foreground text-sm mt-1">Private preview available on request.</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div>
          <div className="relative overflow-hidden aspect-[4/3] bg-sand">
            <Image
              src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/6bbcbfa65_generated_c8956fd3.png"
              alt="New to market"
              fittingType="fill"
              className="w-full h-full"
            />
            <span className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em]">NEW TO MARKET</span>
          </div>
          <div className="pt-5">
            <h3 className="font-heading text-xl">New to Market</h3>
            <p className="text-muted-foreground text-sm mt-1">Full listing details coming shortly.</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}