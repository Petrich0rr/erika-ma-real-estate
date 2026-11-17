import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import PhotoCollage from "@/components/site/PhotoCollage";
import CtaBand from "@/components/site/CtaBand";
import HeroWatermark from "@/components/site/HeroWatermark";

const AREAS = siteConfig.areas;

export default function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24 min-h-[340px] md:min-h-[640px]">
        <HeroWatermark
          opacity={0.3}
          maskPosition="center"
          className="w-[clamp(480px,85vw,1100px)] h-[clamp(480px,85vw,1100px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
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
            <div className="lg:sticky lg:top-32">
              <PhotoCollage />
            </div>
          </Reveal>
          <div className="lg:col-span-7 space-y-16">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">A little about me</h2>
              <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">Nice to meet you, I’m Erika!</p>
              <p className="mt-4 text-foreground/80 leading-relaxed max-w-xl">I’m a licensed real estate salesperson, and I’ve called quite a few places home… from Scarborough to Downtown Toronto to Yonge &amp; Finch. And honestly? I love them all for different reasons!</p>
              <p className="mt-4 text-foreground/80 leading-relaxed max-w-xl">I graduated from the University of Toronto.</p>
              <p className="mt-4 text-foreground/80 leading-relaxed max-w-xl">I’m Canadian, but my roots are in Shanghai, China. 🇨🇦🇨🇳</p>
              <p className="mt-4 text-foreground/80 leading-relaxed max-w-xl">Outside of real estate, you’ll probably find me at the gym, grabbing a fruit tea, or exploring somewhere new. I love meeting new people and making wonderful friends along the way.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl">Why work with me</h2>
              <p className="mt-6 text-foreground/80 leading-relaxed max-w-xl">I put my clients first. My goal is to make sure you find exactly what you had in mind, or even better!</p>
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

      {/* INTRO VIDEO */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 text-center">
          <Reveal><span className="eyebrow">Watch</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl md:text-4xl mt-4">A quick hello from me</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <video
              className="mx-auto mt-10 w-full max-w-[400px] rounded-lg shadow-xl block"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/about/erika-intro-poster.jpg"
            >
              <source src="/about/erika-intro.mp4" type="video/mp4" />
            </video>
          </Reveal>
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
