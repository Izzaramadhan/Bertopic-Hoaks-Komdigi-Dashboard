import { AlertCircle } from "lucide-react";
import { API_BASE } from "../services/api";

export default function ErrorState({ error }) {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertCircle size={34} />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Backend belum terhubung
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">{error}</p>

        <code className="mt-5 inline-block rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {API_BASE}
        </code>
      </div>
    </main>
  );
}