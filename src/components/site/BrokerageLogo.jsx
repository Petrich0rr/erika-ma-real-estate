import { siteConfig } from "@/lib/siteConfig";

export default function BrokerageLogo({ className = "", variant = "dark" }) {
  const src =
  variant === "footer" ?
  siteConfig.brokerageLogoFooter :
  siteConfig.brokerageLogo;
  if (!src) return null;
  return (
    <img src="https://media.base44.com/images/public/6a79030aec60e25b597174ab/eed4d503f_HomeLife-Landmark-Office-Logo-Chinese1.png" alt={siteConfig.brokerage} className={className} />);

}