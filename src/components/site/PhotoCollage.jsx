import Reveal from "@/components/site/Reveal";

// Polaroid-style collage: each photo pops in one after another as you scroll
// to it (staggered Reveal delays). Photos keep their natural ratio — no
// fixed boxes, so nothing gets squashed.
const PHOTOS = [
  { src: "/about/erika-pink-coat.jpg", alt: "Erika in a pink coat", frame: "-rotate-2" },
  { src: "/about/erika-friends.jpg", alt: "Erika out with friends", frame: "rotate-[1.5deg] translate-y-6" },
  { src: "/about/erika-event.jpg", alt: "Erika at a Homelife event", frame: "rotate-1 -translate-y-2" },
  { src: "/about/erika-nyc.jpg", alt: "Erika in New York", frame: "-rotate-1 translate-y-4" },
];

export default function PhotoCollage() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {PHOTOS.map((photo, i) => (
        <Reveal key={photo.src} delay={i * 0.18} y={40}>
          <div className={`bg-white p-2 pb-3 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] ${photo.frame}`}>
            <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-auto block" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
