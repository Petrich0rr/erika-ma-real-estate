import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, FileText, Calculator, Receipt, TrendingUp, BookOpen, MapPin, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/site/Reveal";
import MortgageCalculator from "@/components/site/MortgageCalculator";
import LandTransferTaxCalculator from "@/components/site/LandTransferTaxCalculator";
import GuideRequestForm from "@/components/site/GuideRequestForm";

const CATEGORIES = [
{ icon: Home, label: "First-Time Home Buyer Guide", desc: "Everything you need to approach your first purchase with confidence.", to: "/contact" },
{ icon: FileText, label: "Seller Guide", desc: "A modern roadmap for preparing, pricing, and marketing your home.", to: "/contact" },
{ icon: Receipt, label: "Closing Costs", desc: "Understand the costs beyond the purchase price before closing day.", to: "/contact" },
{ icon: TrendingUp, label: "Toronto & GTA Market Updates", desc: "Current context on local market conditions, added regularly.", to: "/contact" },
{ icon: BookOpen, label: "Real Estate Articles", desc: "Practical, jargon-free reads on buying and selling.", to: "/contact" },
{ icon: MapPin, label: "Neighbourhood Guides", desc: "Lifestyle, highlights, and property types across the GTA.", to: "/neighbourhoods" }];


export default function Resources() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    base44.entities.Resource.list("-created_date", 6).
    then(setArticles).
    catch(() => setArticles([]));
  }, []);

  return (
    <>
      <section className="pt-36 md:pt-44 pb-12">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal><span className="eyebrow">Resources</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-heading text-5xl md:text-7xl mt-5 max-w-3xl leading-[0.98]">Tools &amp; guides for your move</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg text-foreground/80 max-w-xl leading-relaxed">Helpful tools, guides, and tips to make your next move a little easier.

            </p>
          </Reveal>
        </div>
      </section>

      {/* CALCULATORS */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="mb-12">
            <span className="eyebrow">Calculators</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Run the numbers</h2>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            <Reveal className="bg-sand p-7 md:p-10 border border-primary/15">
              <div className="flex items-center gap-3 mb-6">
                <Calculator size={20} className="text-primary" />
                <h3 className="font-heading text-2xl">Mortgage Calculator</h3>
              </div>
              <MortgageCalculator />
            </Reveal>
            <Reveal delay={0.08} className="bg-sand p-7 md:p-10 border border-primary/15">
              <div className="flex items-center gap-3 mb-6">
                <Receipt size={20} className="text-primary" />
                <h3 className="font-heading text-2xl">Land Transfer Tax</h3>
              </div>
              <LandTransferTaxCalculator />
            </Reveal>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section className="py-16 md:py-24 bg-sand">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="mb-12">
            <span className="eyebrow">Guides</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Start with a guide</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.label} delay={i * 0.04}>
                  <div className="border-t border-primary/25 pt-5">
                    <Icon size={22} className="text-primary" />
                    <h3 className="font-heading text-xl mt-3">{c.label}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{c.desc}</p>
                    <Link to={c.to} className="btn-ghost mt-4">Learn more</Link>
                  </div>
                </Reveal>);

            })}
          </div>
        </div>
      </section>

      {/* DOWNLOADABLE GUIDES (gated) */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="mb-12">
            <span className="eyebrow">Free Downloads</span>
            <h2 className="font-heading text-4xl md:text-5xl mt-4">Guides to Get You Started</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-10">
            <Reveal className="bg-sand p-7 md:p-10 border border-primary/15">
              <h3 className="font-heading text-2xl">First-Time Home Buyer Guide</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">Buying your first home? Get the key steps, tips and things to know before you start your search.

              </p>
              <div className="mt-6">
                <GuideRequestForm guideName="First-Time Home Buyer Guide" />
              </div>
            </Reveal>
            <Reveal delay={0.08} className="bg-sand p-7 md:p-10 border border-primary/15">
              <h3 className="font-heading text-2xl">Seller Guide</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">Thinking of selling? Get the key steps, tips and things to know before putting your home on the market.

              </p>
              <div className="mt-6">
                <GuideRequestForm guideName="Seller Guide" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      {articles.length > 0 &&
      <section className="py-16 md:py-24 bg-sand">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <Reveal className="mb-12">
              <span className="eyebrow">Articles</span>
              <h2 className="font-heading text-4xl md:text-5xl mt-4">Latest reads</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
              {articles.map((a) =>
            <Reveal key={a.id}>
                  <Link to="/contact" className="group block py-6 border-b border-primary/15">
                    <span className="text-xs uppercase tracking-[0.18em] text-primary">{a.category}</span>
                    <h3 className="font-heading text-xl mt-2 group-hover:text-primary transition-colors">{a.title}</h3>
                    {a.summary && <p className="text-muted-foreground text-sm mt-2">{a.summary}</p>}
                    <span className="inline-flex items-center gap-1.5 text-primary text-sm mt-3">Read <ArrowUpRight size={14} /></span>
                  </Link>
                </Reveal>
            )}
            </div>
          </div>
        </section>
      }
    </>);

}