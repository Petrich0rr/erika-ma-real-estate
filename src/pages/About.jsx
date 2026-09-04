import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import CtaBand from "@/components/site/CtaBand";
import { Image } from "@/components/ui/image";
import HeroWatermark from "@/components/site/HeroWatermark";

const APPROACH = [
"Listening first — understanding your goals, timeline, and what home really means to you.",
"A marketing mindset applied to every transaction, whether you're buying or selling.",
"Clear, honest guidance at every step — no pressure, no jargon.",
"Modern tools and exposure paired with old-fashioned personal service."];


const AREAS = siteConfig.areas;

export default function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24 min-h-[55vh]">
        <HeroWatermark opacity={0.5} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
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
              <Image src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/9218783f3_IMG_3445.jpeg" alt={siteConfig.agentName} fittingType="fill" className="w-full h-full" />
            </div>
          </Reveal>
          <div className="lg:col-span-7 space-y-16">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">A little about me</h2>
              <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">Hi, I’m Erika! I’m a Toronto based real estate professional with a background in marketing. I love meeting new people, getting to know what they’re looking for, and helping make the whole real estate process feel a little less overwhelming.

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
              <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">Before real estate, I built my career in digital marketing. From social media and content to websites and campaigns, I’ve learned how much good presentation and the right strategy matter. Now I get to bring that experience into real estate too.

              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">Why work with me</h2>
              <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">I want you to feel comfortable asking questions, sharing what you really want, and taking your time with big decisions. I’ll be there to guide you, keep you in the loop, and make the process as smooth as I can.

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
        message="Whether you’re ready now or just exploring, I’m always happy to chat."
        primaryLabel="Get in Touch"
        primaryTo="/contact"
        secondaryLabel="View Properties"
        secondaryTo="/" />
      
    </>);

}