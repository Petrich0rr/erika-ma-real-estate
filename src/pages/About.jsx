import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import CtaBand from "@/components/site/CtaBand";
import { Image } from "@/components/ui/image";

const APPROACH = [
"Listening first — understanding your goals, timeline, and what home really means to you.",
"A marketing mindset applied to every transaction, whether you're buying or selling.",
"Clear, honest guidance at every step — no pressure, no jargon.",
"Modern tools and exposure paired with old-fashioned personal service."];


const AREAS = siteConfig.areas;

export default function About() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal><span className="eyebrow">About</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-heading text-5xl md:text-7xl mt-5 max-w-3xl leading-[0.98]">
              {siteConfig.agentName}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {siteConfig.role} <span className="mx-2.5 text-primary">·</span> {siteConfig.brokerage}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[3/4] overflow-hidden bg-sand lg:sticky lg:top-32">
              <Image src={siteConfig.images.about} alt={siteConfig.agentName} fittingType="fill" className="w-full h-full" />
            </div>
          </Reveal>
          <div className="lg:col-span-7 space-y-16">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">A little about me</h2>
              <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">I’m Erika, a Toronto based real estate professional with a background in digital marketing. I bring a modern, personal approach to real estate, helping clients feel informed and confident throughout the process.

              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">My approach to real estate</h2>
              <ul className="mt-6 space-y-4 max-w-xl">
                {APPROACH.map((a) =>
                <li key={a} className="flex items-start gap-3">
                    <Check size={18} className="text-primary mt-1 shrink-0" />
                    <span className="text-foreground/80">{a}</span>
                  </li>
                )}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">My marketing background</h2>
              <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">
                [Describe your marketing background and how it shapes the way you present and promote properties. Replace with your approved copy.]
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">Why work with me</h2>
              <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">
                [A concise, genuine case for why clients should choose you — focused on the experience and outcomes you deliver, not unsupported superlatives. Replace with your approved copy.]
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">Areas I serve</h2>
              <div className="mt-6 flex flex-wrap gap-2.5 max-w-xl">
                {AREAS.map((a) =>
                <span key={a} className="px-4 py-2 border border-primary/25 text-sm text-foreground/80">{a}</span>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's work together"
        message="[A short, warm closing line inviting visitors to reach out. Replace with your own wording.]"
        primaryLabel="Get in Touch"
        primaryTo="/contact"
        secondaryLabel="View Properties"
        secondaryTo="/" />
      
    </>);

}