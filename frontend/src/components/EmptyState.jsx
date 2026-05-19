import { AlertCircle } from "lucide-react";

export default function EmptyState({ title, description }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mb-3 rounded-2xl bg-slate-100 p-3 text-slate-500">
        <AlertCircle size={28} />
      </div>

      <h3 className="text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}