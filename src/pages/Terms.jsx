import Reveal from "@/components/site/Reveal";
import { siteConfig } from "@/lib/siteConfig";

export default function Terms() {
  return (
    <section className="pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="mx-auto max-w-[900px] px-5 md:px-10">
        <Reveal><span className="eyebrow">Legal</span></Reveal>
        <Reveal delay={0.05}><h1 className="font-heading text-4xl md:text-6xl mt-5">Terms &amp; Website Notices</h1></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 space-y-5 text-foreground/80 leading-relaxed">
            <p>
              [Your terms of use and website notices will appear here. This placeholder covers the terms governing use of this website, disclaimers regarding property information, and any real estate regulatory or brokerage disclosures required in your jurisdiction. Replace with your finalized terms and required notices.]
            </p>
            <p>
              [Include any required brokerage identification, licensing, and regulatory disclosures here. Do not publish without your brokerage&rsquo;s approved wording.]
            </p>
            <p className="text-sm text-muted-foreground pt-4 border-t border-primary/15">
              {siteConfig.agentName}, {siteConfig.role}, {siteConfig.brokerage}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}