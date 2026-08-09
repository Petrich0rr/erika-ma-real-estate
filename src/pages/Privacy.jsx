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
            <p>
              [Your privacy policy content will appear here. This placeholder covers how visitor information is collected, used, and protected — including inquiries submitted through this website and marketing attribution data. Replace with your finalized privacy policy and any brokerage-required wording.]
            </p>
            <p>
              [Describe what personal information you collect (e.g. name, email, phone, message), how it is used (e.g. to respond to inquiries and provide real estate services), and how visitors may request access to or deletion of their information.]
            </p>
            <p className="text-sm text-muted-foreground pt-4 border-t border-primary/15">
              For questions about your information, contact {siteConfig.email}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}