import { siteConfig } from "@/lib/siteConfig";

export default function BrokerageLogo({ className = "" }) {
  if (!siteConfig.brokerageLogo) return null;
  return (
    <img src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/15082097c_5.jpg"

    alt={siteConfig.brokerage}
    className={className} />);


}