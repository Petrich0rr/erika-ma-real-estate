import { siteConfig } from "@/lib/siteConfig";

export default function BrokerageLogo({ className = "", variant = "dark" }) {
  const src = variant === "light" ? siteConfig.brokerageLogoLight : siteConfig.brokerageLogo;
  if (!src) return null;
  return (
    <img src={src} alt={siteConfig.brokerage} className={className} />
  );
}