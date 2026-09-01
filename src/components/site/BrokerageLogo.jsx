import { siteConfig } from "@/lib/siteConfig";

export default function BrokerageLogo({ className = "" }) {
  if (!siteConfig.brokerageLogo) return null;
  return (
    <img src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/10239124a_HL_Logo_Light.png"

    alt={siteConfig.brokerage}
    className={className} />);


}