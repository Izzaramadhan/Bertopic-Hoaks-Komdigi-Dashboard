import {
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Database,
  FileText,
  Layers3,
  TrendingUp
} from "lucide-react";
import StatCard from "../components/StatCard";
import { formatNumber } from "../utils/format";

export default function OverviewSection({ summary, peakYear }) {
  const dateMin = summary?.date_min || "-";
  const dateMax = summary?.date_max || "-";
  const totalArticles = summary?.total_articles || 0;
  const totalTopics = summary?.total_topics || 0;
  const outliers = summary?.outliers || 0;

  return (
    <section
      id="overview"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-8"
    >
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Ringkasan Dataset
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Gambaran Umum Artikel Klarifikasi Hoaks
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            Bagian ini menampilkan ringkasan utama dataset, jumlah topik hasil
            BERTopic, periode publikasi, serta informasi outlier setelah proses
            reduksi topik.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800">
          <CheckCircle2 size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              Status Data
            </p>
            <p className="text-sm font-black">Siap Dianalisis</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FileText}
          label="Total Artikel"
          value={formatNumber(totalArticles)}
          helper="Artikel hasil preprocessing dan topic modeling."
          tone="blue"
        />

        <StatCard
          icon={Layers3}
          label="Jumlah Topik"
          value={formatNumber(totalTopics)}
          helper="Topik unik hasil pemodelan BERTopic."
          tone="teal"
        />

        <StatCard
          icon={CalendarDays}
          label="Puncak Publikasi"
          value={peakYear ? `${peakYear.year}` : "-"}
          helper={
            peakYear
              ? `${formatNumber(peakYear.count)} artikel pada tahun tersebut.`
              : "Data belum tersedia."
          }
          tone="purple"
        />

        <StatCard
          icon={Activity}
          label="Outlier"
          value={formatNumber(outliers)}
          helper="Dokumen dengan label topik -1 setelah reduksi."
          tone="orange"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Database size={23} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Cakupan Dataset
              </p>
              <h3 className="text-lg font-black tracking-tight text-slate-900">
                Periode dan Volume Data
              </h3>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
                Tanggal Awal
              </p>
              <p className="mt-2 text-lg font-black text-slate-900">
                {dateMin}
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
                Tanggal Akhir
              </p>
              <p className="mt-2 text-lg font-black text-slate-900">
                {dateMax}
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
                Total Dokumen
              </p>
              <p className="mt-2 text-lg font-black text-slate-900">
                {formatNumber(totalArticles)}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-500">
            Dataset yang digunakan berisi artikel klarifikasi hoaks dengan
            rentang waktu dari <strong className="text-slate-900">{dateMin}</strong>{" "}
            sampai <strong className="text-slate-900">{dateMax}</strong>. Data
            ini kemudian diproses menggunakan BERTopic untuk menemukan pola
            topik yang muncul di dalam artikel.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
              <TrendingUp size={23} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Insight Awal
              </p>
              <h3 className="text-lg font-black tracking-tight text-slate-900">
                Kualitas Hasil Modeling
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-3xl border border-teal-100 bg-teal-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-teal-700" size={20} />
                <div>
                  <h4 className="font-black text-slate-900">
                    Topik Berhasil Dibentuk
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Model menghasilkan{" "}
                    <strong className="text-slate-900">
                      {formatNumber(totalTopics)}
                    </strong>{" "}
                    topik unik yang digunakan untuk analisis distribusi dan
                    dinamika topik.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="mt-0.5 shrink-0 text-orange-700"
                  size={20}
                />
                <div>
                  <h4 className="font-black text-slate-900">
                    Catatan Interpretasi
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Data tahun 2018 dan 2026 perlu dibaca hati-hati karena
                    periode data tidak mencakup satu tahun penuh. Oleh karena
                    itu, analisis bulanan tetap digunakan sebagai pendamping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}