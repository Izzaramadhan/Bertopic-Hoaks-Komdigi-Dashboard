import {
  ArrowRight,
  BarChart3,
  Brain,
  CalendarDays,
  Database,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { formatNumber } from "../utils/format";

export default function HeroSection({ summary, topTopic }) {
  return (
    <section
      id="home"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-10"
    >
      <div className="grid gap-6 lg:grid-cols-[1.55fr_0.75fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-8 text-white shadow-xl sm:p-10 lg:p-12">
          <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold text-blue-100 backdrop-blur">
                <Brain size={15} />
                BERTopic Topic Modeling
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-extrabold text-emerald-100 backdrop-blur">
                <ShieldCheck size={15} />
                Hoax Clarification Analytics
              </div>
            </div>

            <h2 className="max-w-5xl text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Analisis Tren dan Dinamika Topik Artikel Klarifikasi Hoaks
            </h2>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
              Dashboard interaktif untuk mengeksplorasi tren publikasi,
              distribusi topik, dinamika isu, dan artikel klarifikasi hoaks
              Kominfo/Komdigi tahun 2018–2026 menggunakan metode BERTopic.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#overview"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Lihat Ringkasan
                <ArrowRight size={17} />
              </a>

              <a
                href="#articles"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                Eksplorasi Artikel
                <Database size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <CalendarDays size={21} />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                  Periode Data
                </p>
                <h3 className="mt-1 text-base font-extrabold text-slate-900">
                  {summary?.date_min || "-"} — {summary?.date_max || "-"}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-blue-700">
                  <Database size={17} />
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    Artikel
                  </span>
                </div>

                <p className="text-2xl font-black tracking-tight text-slate-900">
                  {formatNumber(summary?.total_articles)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-teal-700">
                  <Layers3 size={17} />
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    Topik
                  </span>
                </div>

                <p className="text-2xl font-black tracking-tight text-slate-900">
                  {formatNumber(summary?.total_topics)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <BarChart3 size={21} />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                  Topik Dominan
                </p>
                <h3 className="mt-1 text-base font-extrabold leading-6 text-slate-900">
                  {topTopic?.topic_name || "-"}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-500">
              Topik dominan dihitung berdasarkan jumlah artikel terbanyak pada
              hasil pemodelan topik BERTopic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}