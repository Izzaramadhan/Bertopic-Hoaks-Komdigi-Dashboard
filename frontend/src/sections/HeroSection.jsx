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
import Background from "../assets/Background.png";

export default function HeroSection({ summary, topTopic }) {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-10"
    >
      <div className="grid gap-6 lg:grid-cols-[1.55fr_0.75fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] p-8 text-white shadow-xl sm:p-10 lg:p-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${Background})`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-blue-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
          <div className="absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

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
              <button
                type="button"
                onClick={() => scrollToSection("overview")}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-slate-900 shadow-lg shadow-slate-950/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl active:scale-95"
              >
                Lihat Ringkasan
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("articles")}
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-slate-950/10 backdrop-blur transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-white/20 hover:shadow-xl active:scale-95"
              >
                Eksplorasi Artikel
                <Database
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
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
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
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

              <div className="rounded-2xl border border-teal-100 bg-teal-50 p-4">
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

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
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