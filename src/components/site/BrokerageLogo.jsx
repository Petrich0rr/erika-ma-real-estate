import { siteConfig } from "@/lib/siteConfig";

export default function BrokerageLogo({ className = "" }) {
  if (!siteConfig.brokerageLogo) return null;
  return (
    <img
      src={siteConfig.brokerageLogo}
      alt={siteConfig.brokerage}
      className={className}
    />
  );
}