import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import SellerForm from "@/components/site/SellerForm";
import { Image } from "@/components/ui/image";

const PILLARS = [
  { title: "Strategic Pricing", body: "[Positioning your home at the right price to attract serious buyers without leaving money on the table.]" },
  { title: "Professional Photography", body: "[Editorial-quality images that present your home at its absolute best.]" },
  { title: "Professional Video", body: "[Video that gives buyers a true sense of space and flow before they ever tour.]" },
  { title: "Social Media Marketing", body: "[Targeted exposure across the platforms where today's buyers spend their time.]" },
  { title: "Digital Advertising", body: "[Data-driven ad campaigns that put your listing in front of qualified buyers.]" },
  { title: "Property Presentation", body: "[Staging and prep guidance so every detail reads well on camera and in person.]" },
  { title: "Online Exposure", body: "[Maximum visibility across listing platforms and search — not just the MLS.]" },
  { title: "Market Positioning", body: "[A clear story for why your home stands out in its neighbourhood and price band.]" },
  { title: "Negotiation", body: "[Skilled, level-headed negotiation to protect your equity and your timeline.]" },
  { title: "Communication", body: "[You always know what's happening, what's next, and why — start to finish.]" },
];

export default function Sell() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <Reveal><span className="eyebrow">Sell</span></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-heading text-5xl md:text-7xl mt-5 leading-[0.98]">Sell with a marketing edge</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-lg text-foreground/80 max-w-xl leading-relaxed">
                [A short intro to your modern, marketing-driven approach to selling — how you present, promote, and protect your home's value. Replace with your approved copy.]
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a href="#worth" className="btn-primary mt-9">What&rsquo;s My Home Worth?</a>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden bg-sand">
              <Image src={siteConfig.images.neighbourhoods.heritage} alt="Toronto heritage streetscape" fittingType="fill" className="w-full h-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 md:py-32 bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="mb-14">
            <span className="eyebrow">The Approach</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-2xl">Everything that goes into selling your home well</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.03}>
                <div className="border-t border-primary/25 pt-5">
                  <span className="font-heading text-primary text-xl">0{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                  <h3 className="font-heading text-xl mt-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="worth" className="py-20 md:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1000px] px-5 md:px-10">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">What&rsquo;s My Home Worth?</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Request a complimentary evaluation</h2>
            <p className="mt-5 text-foreground/75 max-w-lg mx-auto">
              Share a few details about your property and I&rsquo;ll personally review the information and follow up to arrange a complimentary evaluation. This is not an automated estimate — every request is reviewed by me.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="bg-sand px-6 py-10 md:px-12 md:py-14 border border-primary/15">
            <SellerForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}