import { Instagram } from "lucide-react";
import Reveal from "@/components/site/Reveal";

// Snapshot of @realerikama's latest posts, Nov 16, 2026.
// Static site has no live Instagram connection, so this grid is refreshed
// manually — see instagram-feed-posts.json in ~/workspace/website-fix/.
const POSTS = [
  { img: "/instagram/ig-1.jpg", url: "https://www.instagram.com/p/DfsO08Oj1J8/", label: "Just Leased · 181 Dundas St E", date: "Nov 13, 2026" },
  { img: "/instagram/ig-2.jpg", url: "https://www.instagram.com/p/DflFKdNDsOu/", label: "Client Love · Calleigh", date: "Nov 11, 2026" },
  { img: "/instagram/ig-3.jpg", url: "https://www.instagram.com/p/DfkWJ9VDhD3/", label: "Just Leased · 1635 Military Trail", date: "Nov 10, 2026" },
  { img: "/instagram/ig-4.jpg", url: "https://www.instagram.com/p/DfQbSMHE8qj/", label: "Just Leased · 355 Culford Rd", date: "Nov 2, 2026" },
  { img: "/instagram/ig-5.jpg", url: "https://www.instagram.com/p/DeXkgFfFr43/", label: "For Lease · 15 David Salomon Dr", date: "Oct 11, 2026" },
  { img: "/instagram/ig-6.jpg", url: "https://www.instagram.com/p/DdvBU5Ao0Ml/", label: "Listing Flyer · Toronto", date: "Sep 25, 2026" },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="text-center">
          <span className="eyebrow">Follow along</span>
          <h2 className="font-heading text-3xl md:text-5xl mt-4">On Instagram</h2>
          <p className="mt-4 text-foreground/80 max-w-xl mx-auto leading-relaxed">
            Just leased homes, happy clients, and new listings as they happen.
          </p>
          <a
            href="https://www.instagram.com/realerikama"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost mt-6 inline-flex items-center gap-2"
          >
            <Instagram size={18} /> @realerikama
          </a>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {POSTS.map((post, i) => (
            <Reveal key={post.url} delay={i * 0.05}>
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${post.label} — open on Instagram`}
                className="group relative block aspect-square overflow-hidden bg-sand"
              >
                <img
                  src={post.img}
                  alt={post.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-colors duration-300 flex flex-col items-center justify-center text-center px-4 opacity-0 group-hover:opacity-100">
                  <Instagram size={28} className="text-white" />
                  <span className="mt-3 text-white font-heading text-lg leading-snug">{post.label}</span>
                  <span className="mt-1 text-white/80 text-sm">{post.date}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
