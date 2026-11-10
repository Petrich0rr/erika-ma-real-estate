import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "@/components/site/TestimonialCard";

const ROTATE_MS = 6000;

const REVIEWS = [
  {
    name: "Calleigh I.",
    role: "Tenant in Toronto",
    avatar:
      "https://base44.app/api/apps/6a79030aec60e25b597174ab/files/mp/public/6a79030aec60e25b597174ab/21c7ba816_calleigh-i.png",
    initials: "CI",
    text: "Erika blew me away with her outstanding service. She took the time to really listen to everything I was looking for in a new rental home and in the end of our work together, she completely delivered it all for me. She was patient, kind, caring, communicative and thoughtful throughout the entire process. I’m extremely grateful for everything she’s done for me and recommend her to anyone who needs help renting or buying in this city!",
  },
  {
    name: "Nham M.",
    role: "Condo Buyer in Toronto",
    avatar:
      "https://base44.app/api/apps/6a79030aec60e25b597174ab/files/mp/public/6a79030aec60e25b597174ab/cfe778f08_nham-m.png",
    initials: "NM",
    text: "Erika was amazing in helping me find my condo!\n\nShe put together a list of options, compared prices, and patiently went through each one with me to find the best fit for my needs and budget. She was thorough, supportive, and always happy to answer my questions. I really appreciated her honest advice and the time she put into helping me throughout the process. You can tell she truly cares about her clients.\n\nHighly recommend Erika to anyone looking for a great realtor!",
  },
  {
    name: "Carol Y.",
    role: "Client in Scarborough",
    avatar: null,
    initials: "CY",
    text: "I felt very comfortable working with Erika and knew I was in good hands. She really made sure I was getting the best deal. I would definitely recommend her.",
  },
];

const BACK_TRANSITION = { type: "spring", stiffness: 150, damping: 20 };

export default function TestimonialDeck() {
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

  const handleDragEnd = (_event, info) => {
    if (info.offset.x < -60 || info.velocity.x < -450) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 450) go(-1);
  };

  return (
    <div
      className="mx-auto w-full max-w-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative grid touch-pan-y">
        {/* Deepest card in the stack */}
        <motion.div
          aria-hidden="true"
          className="[grid-area:1/1] px-2"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.9, rotate: 0 }}
          whileInView={{ opacity: 1, y: -38, x: 18, scale: 0.88, rotate: 3.6 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...BACK_TRANSITION, delay: 0.16 }}
        >
          <TestimonialCard review={REVIEWS[(index + 2) % REVIEWS.length]} />
        </motion.div>

        {/* Middle card in the stack */}
        <motion.div
          aria-hidden="true"
          className="[grid-area:1/1] px-1"
          style={{ zIndex: 20 }}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.9, rotate: 0 }}
          whileInView={{ opacity: 1, y: -19, x: -14, scale: 0.94, rotate: -2.8 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...BACK_TRANSITION, delay: 0.08 }}
        >
          <TestimonialCard review={REVIEWS[(index + 1) % REVIEWS.length]} />
        </motion.div>

        {/* Front card */}
        <AnimatePresence>
          <motion.div
            key={index}
            className="[grid-area:1/1] cursor-grab active:cursor-grabbing"
            style={{ zIndex: 30 }}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 26, scale: 0.93, rotate: -1.5 }
            }
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0.3 } }
                : {
                    opacity: 0,
                    y: -95,
                    scale: 0.96,
                    rotate: -6,
                    transition: { duration: 0.5, ease: [0.45, 0, 0.9, 1] },
                  }
            }
            transition={{ type: "spring", stiffness: 190, damping: 18, mass: 0.9 }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={handleDragEnd}
          >
            <TestimonialCard review={REVIEWS[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 hover:scale-105"
        >
          <ChevronLeft size={19} />
        </button>

        <div className="flex items-center gap-2.5">
          {REVIEWS.map((review, i) => (
            <button
              key={review.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${review.name}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 hover:scale-105"
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  );
}