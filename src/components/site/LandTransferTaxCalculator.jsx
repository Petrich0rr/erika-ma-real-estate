import { useState } from "react";

const fmt = (v) =>
  v.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

function provincialTax(price) {
  if (price <= 55000) return price * 0.005;
  let tax = 55000 * 0.005;
  if (price <= 250000) return tax + (price - 55000) * 0.01;
  tax += (250000 - 55000) * 0.01;
  if (price <= 400000) return tax + (price - 250000) * 0.015;
  tax += (400000 - 250000) * 0.015;
  if (price <= 2000000) return tax + (price - 400000) * 0.02;
  tax += (2000000 - 400000) * 0.02;
  return tax + (price - 2000000) * 0.025;
}

export default function LandTransferTaxCalculator() {
  const [price, setPrice] = useState(800000);
  const [inToronto, setInToronto] = useState(true);
  const [firstTime, setFirstTime] = useState(false);

  const ontario = provincialTax(price);
  const toronto = inToronto ? provincialTax(price) : 0;
  let total = ontario + toronto;

  if (firstTime) {
    const ontarioRebate = Math.min(ontario, 4000);
    const torontoRebate = Math.min(toronto, 4478.5);
    total = Math.max(total - ontarioRebate - torontoRebate, 0);
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="ghost-label">Purchase price</span>
        <input type="number" min={0} step={10000} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="ghost-input" />
      </div>
      <label className="flex items-center gap-3 text-sm cursor-pointer">
        <input type="checkbox" checked={inToronto} onChange={(e) => setInToronto(e.target.checked)} className="w-4 h-4 accent-[#001768]" />
        <span>Property is in the City of Toronto (adds municipal LTT)</span>
      </label>
      <label className="flex items-center gap-3 text-sm cursor-pointer">
        <input type="checkbox" checked={firstTime} onChange={(e) => setFirstTime(e.target.checked)} className="w-4 h-4 accent-[#001768]" />
        <span>I may qualify as a first-time home buyer (apply rebates)</span>
      </label>
      <div className="border-t border-primary/25 pt-6 space-y-2 text-sm">
        <Row label="Provincial (Ontario)" value={fmt(ontario)} />
        {inToronto && <Row label="Municipal (Toronto)" value={fmt(toronto)} />}
        <div className="flex items-baseline justify-between pt-3">
          <span className="text-muted-foreground uppercase tracking-[0.18em] text-xs">Total land transfer tax</span>
          <span className="font-heading text-3xl text-primary">{fmt(total)}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Estimate based on Ontario and City of Toronto land transfer tax schedules. Confirm with your lawyer for your exact transaction.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground/85">{value}</span>
    </div>
  );
}