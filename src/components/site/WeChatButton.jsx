import { useEffect, useId, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

// WeChat has no lucide icon; render a compact inline glyph — two overlapping
// chat bubbles with eyes, cut out with a mask so it works on light and dark
// backgrounds alike.
export function WeChatIcon({ size = 20 }) {
  const maskId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        <circle cx="7" cy="8.6" r="1.15" fill="black" />
        <circle cx="12" cy="8.6" r="1.15" fill="black" />
        <circle cx="15.6" cy="14.6" r="0.95" fill="black" />
        <circle cx="19.4" cy="14.6" r="0.95" fill="black" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <ellipse cx="9.5" cy="9.5" rx="7.5" ry="6.5" />
        <path d="M4.5 14.5 L2.5 19 L7 16 Z" />
        <ellipse cx="17" cy="15.5" rx="5.5" ry="4.5" />
        <path d="M21 18.5 L22.5 21.5 L19 20 Z" />
      </g>
    </svg>
  );
}

// WeChat icon button (used in the footer and on the Contact page). Clicking
// it pops up Erika's WeChat QR code with her WeChat ID, tap to copy.
export default function WeChatButton({ className = "", size = 20 }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.social.wechatId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the ID is still visible to copy by hand */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="WeChat — scan QR code"
        className={className}
      >
        <WeChatIcon size={size} />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label="WeChat QR code"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />
          <div className="relative max-h-[90vh] w-full max-w-[340px] overflow-y-auto rounded-3xl bg-white p-6 text-center text-foreground shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-3 text-2xl leading-none text-foreground/50 transition-colors hover:text-foreground"
            >
              ×
            </button>
            <h3 className="font-heading text-2xl">Scan in app</h3>
            <p className="mt-1 text-sm text-muted-foreground">Open WeChat and scan to add me</p>
            <img
              src="/wechat-qr.jpg"
              alt="Erika's WeChat QR code"
              className="mx-auto mt-4 w-full max-w-[260px] rounded-xl"
            />
            <button
              type="button"
              onClick={copyId}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              WeChat ID: {siteConfig.social.wechatId}
              <span className="text-xs opacity-70">{copied ? "Copied!" : "Tap to copy"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
