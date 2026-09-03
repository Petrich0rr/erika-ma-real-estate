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
            <p className="text-sm text-muted-foreground">Last updated: September 2026</p>
            <p>Your privacy is important. This website may collect personal information that you voluntarily provide, such as your name, email address, phone number, and message when you submit an inquiry.</p>
            <p>This information may be used to respond to inquiries, provide real estate services or information, and communicate with you about your request.</p>
            <p>This website may also collect basic usage information through cookies or analytics tools to understand website activity and improve the user experience.</p>
            <p>Personal information will not be sold or rented to third parties. Information may be shared with service providers when necessary to operate this website or provide requested services.</p>
            <p>You may contact me to request access to or correction of your personal information, subject to applicable legal and regulatory requirements.</p>
            <p className="text-sm text-muted-foreground pt-4 border-t border-primary/15">
              For questions about your information, contact {siteConfig.email}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}