import { Image } from "@/components/ui/image";

export default function TestimonialCard({ review }) {
  return (
    <div className="flex h-full flex-col rounded-[1.5rem] bg-white p-7 ring-1 ring-black/5 shadow-[0_26px_70px_-24px_rgba(3,0,166,0.35)] md:p-10">
      <span
        aria-hidden="true"
        className="font-heading text-6xl leading-[0.55] text-primary md:text-7xl"
      >
        &ldquo;
      </span>

      <p className="mt-4 whitespace-pre-line font-heading text-[1.02rem] leading-[1.62] text-foreground md:mt-5 md:text-[1.18rem]">
        {review.text}
      </p>

      <div className="mt-auto flex items-center gap-4 pt-8">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt={review.name}
            fittingType="fill"
            className="h-12 w-12 shrink-0 overflow-hidden rounded-full md:h-14 md:w-14"
          />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold tracking-wide text-primary md:h-14 md:w-14">
            {review.initials}
          </span>
        )}
        <div>
          <p className="text-sm font-bold text-foreground md:text-[0.95rem]">{review.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground md:text-[0.8rem]">{review.role}</p>
        </div>
      </div>
    </div>
  );
}