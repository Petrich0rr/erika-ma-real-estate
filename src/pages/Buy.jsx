import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import BuyerForm from "@/components/site/BuyerForm";
import { Image } from "@/components/ui/image";

const AUDIENCES = [
{
  title: "First-Time Buyers",
  body: "[How you guide first-time buyers through financing, neighbourhoods, and the unknowns — so the biggest purchase of their life feels considered, not overwhelming.]"
},
{
  title: "Experienced Buyers",
  body: "[How you help move-up and repeat buyers navigate timing, competing offers, and strategy to land the right next home.]"
},
{
  title: "Investors",
  body: "[How you support investors with market context, rental considerations, and a clear-eyed view of opportunity across the GTA.]"
}];


const JOURNEY = [
{ step: "01", title: "Consultation", body: "We talk through your goals, timeline, budget, and the neighbourhoods that fit your life." },
{ step: "02", title: "Financing", body: "Connect with a mortgage professional for pre-approval so you know exactly what you can shop for." },
{ step: "03", title: "The Search", body: "I curate listings and off-market opportunities that match your criteria. No noise, just what fits." },
{ step: "04", title: "Viewings", body: "We tour the homes that make sense, with honest perspective on value and potential." },
{ step: "05", title: "Offer & Negotiation", body: "I help you structure a strong, smart offer and negotiate terms in your favour." },
{ step: "06", title: "Closing", body: "From conditions to closing day, I coordinate the details so you arrive at the keys with confidence." }];


export default function Buy() {
  return (
    <>
      <section className="pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <Reveal><span className="eyebrow">Buy</span></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-heading text-5xl md:text-7xl mt-5 leading-[0.98]">Find the home that fits your life</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-lg text-foreground/80 max-w-xl leading-relaxed">
                [A short, warm intro to how you help buyers across Toronto and the GTA — focused on clarity, confidence, and a search that respects their time. Replace with your approved copy.]
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a href="#search" className="btn-primary mt-9">Start Your Home Search</a>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden bg-sand">
              <Image src={siteConfig.images.neighbourhoods.waterfront} alt="Toronto waterfront" fittingType="fill" className="w-full h-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="mb-14">
            <span className="eyebrow">Who I Help</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">A buyer journey built around you</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            {AUDIENCES.map((a, i) =>
            <Reveal key={a.title} delay={i * 0.07}>
                <span className="font-heading text-primary text-3xl">0{i + 1}</span>
                <h3 className="font-heading text-2xl mt-3">{a.title}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">{a.body}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="mb-14">
            <span className="eyebrow">The Process</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4 max-w-xl">How buying works, simply</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {JOURNEY.map((j, i) =>
            <Reveal key={j.step} delay={i * 0.04}>
                <div className="border-t border-primary/25 pt-5">
                  <span className="font-heading text-primary text-xl">{j.step}</span>
                  <h3 className="font-heading text-xl mt-2">{j.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{j.body}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="search" className="py-20 md:py-32 bg-sand scroll-mt-24">
        <div className="mx-auto max-w-[1000px] px-5 md:px-10">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">Start Your Search</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Tell me what you're looking for</h2>
            <p className="mt-5 text-foreground/75 max-w-lg mx-auto">
              Share a few details and I'll personally review your criteria and reach out to start your search. No account needed.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="bg-background px-6 py-10 md:px-12 md:py-14 border border-primary/15">
            <BuyerForm />
          </Reveal>
        </div>
      </section>
    </>);

}