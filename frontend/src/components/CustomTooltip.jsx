import { formatNumber } from "../utils/format";

export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <p className="mb-2 text-sm font-bold text-slate-900">{label}</p>

      {payload.map((item, index) => (
        <p key={index} className="text-xs font-semibold" style={{ color: item.color }}>
          {item.name}: {formatNumber(item.value)}
        </p>
      ))}
    </div>
  );
}