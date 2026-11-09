import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const ROTATE_MS = 6000;

const REVIEWS = [
  {
    name: "Calleigh I.",
    text: "Erika blew me away with her outstanding service. She took the time to really listen to everything I was looking for in a new rental home and in the end of our work together, she completely delivered it all for me. She was patient, kind, caring, communicative and thoughtful throughout the entire process. I’m extremely grateful for everything she’s done for me and recommend her to anyone who needs help renting or buying in this city!",
  },
  {
    name: "Nham M.",
    text: "Erika was amazing in helping me find my condo!\n\nShe put together a list of options, compared prices, and patiently went through each one with me to find the best fit for my needs and budget. She was thorough, supportive, and always happy to answer my questions. I really appreciated her honest advice and the time she put into helping me throughout the process. You can tell she truly cares about her clients.\n\nHighly recommend Erika to anyone looking for a great realtor!",
  },
  {
    name: "Carol Y.",
    text: "I felt very comfortable working with Erika and knew I was in good hands. She really made sure I was getting the best deal. I would definitely recommend her.",
  },
];

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48" width="13" height="13" aria-hidden="true" className="shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function GoogleReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((step) => {
    setIndex((i) => (i + step + REVIEWS.length) % REVIEWS.length);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(() => go(1), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [index, paused, reduce, go]);

  const review = REVIEWS[index];

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mb-8 flex justify-center gap-1.5" aria-label="Rated 5 out of 5 stars">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} size={17} strokeWidth={0} className="fill-[#FBC02D] text-[#FBC02D]" />
        ))}
      </div>

      <div className="flex min-h-[25rem] items-start justify-center sm:min-h-[22rem] md:min-h-[19rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={index}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="whitespace-pre-line font-heading text-xl leading-[1.6] text-foreground/90 md:text-2xl lg:text-[1.7rem]">
              &ldquo;{review.text}&rdquo;
            </p>
            <footer className="mt-10 flex flex-col items-center gap-3">
              <cite className="text-sm font-semibold uppercase not-italic tracking-[0.2em] text-foreground/75">
                {review.name}
              </cite>
              <span className="inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
                <GoogleGlyph />
                Google Review
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="hidden h-10 w-10 items-center justify-center border border-primary/25 text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          {REVIEWS.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show review from ${r.name}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-primary" : "w-1.5 bg-primary/30 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next review"
          className="hidden h-10 w-10 items-center justify-center border border-primary/25 text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}