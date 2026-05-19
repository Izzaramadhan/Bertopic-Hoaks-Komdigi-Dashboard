export default function StatCard({ icon: Icon, label, value, helper, tone = "blue" }) {
  const toneMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    purple: "bg-violet-50 text-violet-700 border-violet-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100"
  };

  const iconTone = toneMap[tone] || toneMap.blue;

  return (
    <div className="flex min-h-36 gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${iconTone}`}>
        <Icon size={23} />
      </div>

      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>

        <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">{helper}</p>
      </div>
    </div>
  );
}