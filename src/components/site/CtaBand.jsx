import { Link } from "react-router-dom";
import Reveal from "@/components/site/Reveal";

export default function CtaBand({
  title,
  message,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="bg-primary text-primary-foreground px-8 py-16 md:px-16 md:py-20 text-center">
          <h2 className="font-heading text-3xl md:text-5xl leading-tight">{title}</h2>
          {message && <p className="mt-5 text-primary-foreground/85 max-w-xl mx-auto">{message}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to={primaryTo}
              className="inline-flex items-center justify-center bg-background text-primary px-8 py-4 text-sm uppercase tracking-[0.18em] font-semibold hover:-translate-y-px transition-transform"
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && (
              <Link
                to={secondaryTo}
                className="inline-flex items-center justify-center border border-background/60 text-background px-8 py-4 text-sm uppercase tracking-[0.18em] font-semibold hover:bg-background hover:text-primary transition-colors"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}