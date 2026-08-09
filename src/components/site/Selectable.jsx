// Single-select chip group with sharp editorial styling.
export default function Selectable({ options, value, onChange, label }) {
  return (
    <div>
      {label && <span className="ghost-label">{label}</span>}
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          const active = value === val;
          return (
            <button
              type="button"
              key={val}
              onClick={() => onChange(val)}
              className={`px-4 py-2.5 text-sm border transition-all duration-200 ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-primary/25 text-foreground hover:border-primary"
              }`}
            >
              {lbl}
            </button>
          );
        })}
      </div>
    </div>
  );
}