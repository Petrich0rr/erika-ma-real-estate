import { useState } from "react";

const fmt = (v) =>
  v.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

export default function MortgageCalculator() {
  const [price, setPrice] = useState(800000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(5.5);
  const [years, setYears] = useState(25);

  const down = (price * downPct) / 100;
  const principal = Math.max(price - down, 0);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly =
    r > 0 ? (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : principal / n;

  return (
    <div className="space-y-6">
      <Field label="Home price">
        <input type="number" min={0} step={10000} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="ghost-input" />
      </Field>
      <Field label={`Down payment (${downPct}%) — ${fmt(down)}`}>
        <input type="range" min={0} max={50} step={1} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-[#0300A6]" />
      </Field>
      <Field label="Interest rate (%)">
        <input type="number" min={0} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="ghost-input" />
      </Field>
      <Field label="Amortization (years)">
        <input type="number" min={1} max={35} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="ghost-input" />
      </Field>
      <div className="border-t border-primary/25 pt-6">
        <p className="text-sm text-muted-foreground uppercase tracking-[0.18em]">Estimated monthly payment</p>
        <p className="font-heading text-4xl text-primary mt-2">{fmt(monthly)}</p>
        <p className="text-xs text-muted-foreground mt-3">
          Estimate for illustration only. Confirm actual rates and payments with a mortgage professional.
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <span className="ghost-label">{label}</span>
      {children}
    </div>
  );
}