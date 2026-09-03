import Reveal from "@/components/site/Reveal";
import { siteConfig } from "@/lib/siteConfig";

export default function Privacy() {
  return (
    <section className="pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="mx-auto max-w-[900px] px-5 md:px-10">
        <Reveal><span className="eyebrow">Legal</span></Reveal>
        <Reveal delay={0.05}><h1 className="font-heading text-4xl md:text-6xl mt-5">Privacy Policy</h1></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 space-y-5 text-foreground/80 leading-relaxed">
            <p>Last updated: September 2026
Your privacy is important. This Privacy Policy explains how personal information may be collected, used, and protected when you visit this website or contact me through it.



























            </p>
            

            
            <p className="text-sm text-muted-foreground pt-4 border-t border-primary/15">
              For questions about your information, contact {siteConfig.email}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>);}