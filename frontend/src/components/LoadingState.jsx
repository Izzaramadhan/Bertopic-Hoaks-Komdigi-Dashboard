export default function LoadingState() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mb-5 h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Memuat dashboard...
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Mengambil data dari FastAPI.
        </p>
      </div>
    </main>
  );
}