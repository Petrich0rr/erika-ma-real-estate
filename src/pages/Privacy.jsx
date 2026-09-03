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
Information Collected
When you voluntarily contact me through this website, you may provide personal information such as your name, email address, phone number, and the contents of your message or inquiry.
This website may also collect limited technical and usage information, such as browser type, device information, pages visited, referral information, and general website activity through cookies, analytics tools, or similar technologies.
How Your Information Is Used
Personal information may be used to:


Respond to your questions or inquiries;


Provide requested real estate information or services;


Communicate with you regarding your request;


Maintain and improve this website and its services; and


Meet applicable legal, regulatory, or record-keeping requirements.


Personal information will not be sold or rented to third parties. Information may be shared with service providers where reasonably necessary to operate this website or provide requested services, subject to applicable privacy requirements.
Your Information
You may contact me to request access to or correction of personal information you have provided. Requests for deletion will be addressed subject to any applicable legal, regulatory, or record-keeping obligations.
Reasonable measures are taken to protect personal information; however, no method of electronic transmission or storage can be guaranteed to be completely secure.
Updates
This Privacy Policy may be updated periodically to reflect changes to this website, services, or applicable requirements. The most recent version will be posted on this page.</p>
            <p>
              [Describe what personal information you collect (e.g. name, email, phone, message), how it is used (e.g. to respond to inquiries and provide real estate services), and how visitors may request access to or deletion of their information.]
            </p>
            <p className="text-sm text-muted-foreground pt-4 border-t border-primary/15">
              For questions about your information, contact {siteConfig.email}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>);}