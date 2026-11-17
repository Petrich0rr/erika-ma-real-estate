import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, Layers, Play } from "lucide-react";
import Reveal from "@/components/site/Reveal";

// Featured @realerikama posts, Nov 16, 2026 — blog-style cards.
// Static site has no live Instagram connection, so these are refreshed
// manually. The 15 David Salomon reel plays its real video file.
const POSTS = [
  {
    kind: "reel",
    media: "/instagram/blog-reel-funny.jpg",
    url: "https://www.instagram.com/realerikama/reel/DfF7leSoVfw/",
    date: "Oct 29, 2026",
    text: "DM me if you are looking for a place in Toronto. 🤣🏡",
  },
  {
    kind: "carousel",
    media: "/instagram/blog-event.jpg",
    url: "https://www.instagram.com/realerikama/p/DdQFm0FlhoC/",
    date: "Sep 13, 2026",
    text: "Won a chandelier at my first real estate event 😂 Had such a great time at the 10th Golden Autumn Exhibition by 58Home.ca, representing HomeLife Landmark Realty Inc., Brokerage and meeting so many amazing people!",
  },
  {
    kind: "reel",
    media: "/instagram/blog-david-poster.jpg",
    video: "/instagram/blog-david.mp4",
    url: "https://www.instagram.com/realerikama/reel/Ddt0J5YI31T/",
    date: "Sep 25, 2026",
    text: "Exclusive rental opportunity in Toronto 🏙️ For Lease: 15 David Salomon Drive, Unit 1311, North York, ON. $2,850/month · 2 bed · 2 bath · 1 parking · 835 sq ft. Brand-new, never-lived-in, with two private balconies and amazing building amenities.",
    listing: { label: "15 David Salomon Dr · For Lease · $2,850/mo", to: "/listings" },
  },
];

function Media({ post }) {
  const badge =
    post.kind === "reel" ? (
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        <Play size={12} className="fill-white" /> Reel
      </span>
    ) : (
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        <Layers size={12} /> Post
      </span>
    );

  const inner = post.video ? (
    <video
      className="h-full w-full object-cover"
      src={post.video}
      poster={post.media}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  ) : (
    <img
      src={post.media}
      alt={post.text}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      aria-label="Open this post on Instagram"
      className="group relative block aspect-[4/5] overflow-hidden bg-sand"
    >
      {inner}
      {badge}
      <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow">
        <Instagram size={16} />
      </span>
    </a>
  );
}

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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.url} delay={i * 0.08}>
              <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_10px_40px_-18px_rgba(0,0,0,0.35)]">
                <Media post={post} />
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <img
                      src="/instagram/erika-avatar.jpg"
                      alt="Erika Ma"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">Erika Ma</p>
                      <p className="text-xs text-foreground/60">{post.date}</p>
                    </div>
                    <Instagram size={18} className="ml-auto shrink-0 text-primary" />
                  </div>
                  {post.listing && (
                    <Link
                      to={post.listing.to}
                      className="mt-4 inline-block rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-85"
                    >
                      {post.listing.label}
                    </Link>
                  )}
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/85 line-clamp-4">
                    {post.text}
                  </p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    View on Instagram <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
