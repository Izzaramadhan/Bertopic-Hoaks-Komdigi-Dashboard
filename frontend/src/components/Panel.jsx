export default function Panel({ title, subtitle, children, className = "" }) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
        )}
      </div>

      {children}
    </section>
  );
}