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
            <p>Last updated: September 2026
The information on this website is provided for general informational purposes only and does not constitute legal, financial, tax, or other professional advice.
Real estate information, including property details, pricing, availability, measurements, and market information, may change without notice and should be independently verified.
Visiting this website or submitting an inquiry does not create a client, agency, or representation relationship. Real estate services are subject to applicable agreements, disclosures, and Ontario requirements.
This website may contain links to third-party websites or services. I am not responsible for their content, accuracy, availability, or privacy practices.
Original content and branding on this website may not be reproduced or distributed without permission.</p>
            <p className="hidden">
              [Include any required brokerage identification, licensing, and regulatory disclosures here. Do not publish without your brokerage&rsquo;s approved wording.]
            </p>
            <p className="text-sm text-muted-foreground pt-4 border-t border-primary/15">
              {siteConfig.agentName}, {siteConfig.role}, {siteConfig.brokerage}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>);}