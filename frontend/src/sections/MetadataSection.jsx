import {
  BarChart3,
  BookOpenText,
  CheckCircle2,
  Code2,
  Database,
  FileSpreadsheet,
  Globe2,
  Layers3,
  Server,
  ShieldCheck
} from "lucide-react";
import Panel from "../components/Panel";
import { API_BASE } from "../services/api";
import { formatNumber } from "../utils/format";

export default function MetadataSection({ summary }) {
  const availableColumns = summary?.available_columns || [];

  const architectureItems = [
    {
      icon: BookOpenText,
      title: "Notebook BERTopic",
      description:
        "Digunakan untuk proses data understanding, preprocessing, modelling, evaluasi, dan ekspor hasil."
    },
    {
      icon: FileSpreadsheet,
      title: "CSV Hasil Modelling",
      description:
        "Menyimpan hasil topic modeling, informasi topik, metadata artikel, dan label topik."
    },
    {
      icon: Server,
      title: "FastAPI Backend",
      description:
        "Menyediakan endpoint API untuk summary, tren, topik, metadata, dan daftar artikel."
    },
    {
      icon: BarChart3,
      title: "React Dashboard",
      description:
        "Menampilkan visualisasi tren, distribusi topik, eksplorasi artikel, dan metadata sistem."
    }
  ];

  const techItems = [
    "Python",
    "BERTopic",
    "Pandas",
    "FastAPI",
    "React",
    "Tailwind CSS",
    "Recharts",
    "Vite"
  ];

  return (
    <section
      id="metadata"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-8"
    >
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Metadata Sistem
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Informasi Dataset dan Arsitektur Aplikasi
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            Bagian ini menjelaskan sumber data yang digunakan oleh dashboard,
            struktur sistem, teknologi yang digunakan, dan kolom data yang
            dibaca dari hasil topic modeling.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800">
          <CheckCircle2 size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              Status Sistem
            </p>
            <p className="text-sm font-black">Backend Terhubung</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Database size={23} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Dataset
              </p>
              <h3 className="text-lg font-black tracking-tight text-slate-900">
                Metadata Data
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-6 text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Sumber File
              </p>
              <p className="mt-1 break-all font-bold text-slate-900">
                {summary?.source || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
                  Artikel
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  {formatNumber(summary?.total_articles)}
                </p>
              </div>

              <div className="rounded-2xl border border-teal-100 bg-teal-50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-widest text-teal-700">
                  Topik
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  {formatNumber(summary?.total_topics)}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Periode
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {summary?.date_min || "-"} sampai {summary?.date_max || "-"}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-orange-700">
                Outlier
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {formatNumber(summary?.outliers)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
              <Layers3 size={23} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Arsitektur
              </p>
              <h3 className="text-lg font-black tracking-tight text-slate-900">
                Alur Kerja Sistem
              </h3>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {architectureItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                      <Icon size={20} />
                    </div>

                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h4 className="font-black tracking-tight text-slate-900">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <Panel
          title="Endpoint API"
          subtitle="Alamat backend yang digunakan oleh frontend untuk membaca data."
          className="xl:col-span-3"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-emerald-700">
                <Globe2 size={20} />
                <p className="text-xs font-extrabold uppercase tracking-widest">
                  Base URL
                </p>
              </div>

              <p className="break-all text-sm font-black leading-6 text-slate-900">
                {API_BASE}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "/api/summary",
                "/api/trends/yearly",
                "/api/topics/top",
                "/api/articles"
              ].map((endpoint) => (
                <div
                  key={endpoint}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                    Endpoint
                  </p>
                  <p className="mt-2 break-all text-sm font-black text-slate-900">
                    {endpoint}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          title="Teknologi yang Digunakan"
          subtitle="Daftar teknologi utama yang digunakan pada proses data mining, backend, dan frontend."
          className="xl:col-span-3"
        >
          <div className="flex flex-wrap gap-3">
            {techItems.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold text-blue-700"
              >
                <Code2 size={14} />
                {tech}
              </span>
            ))}
          </div>
        </Panel>

        <Panel
          title="Kolom Tersedia"
          subtitle="Daftar kolom yang dibaca dari file hasil topic modeling."
          className="xl:col-span-3"
        >
          <div className="flex flex-wrap gap-2">
            {availableColumns.length ? (
              availableColumns.map((col) => (
                <span
                  key={col}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-700"
                >
                  {col}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Tidak ada informasi kolom yang tersedia.
              </p>
            )}
          </div>
        </Panel>

        <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 text-blue-900 shadow-sm xl:col-span-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck size={21} />
                <h3 className="font-black tracking-tight">
                  Catatan Implementasi
                </h3>
              </div>

              <p className="max-w-5xl text-sm leading-7">
                BERTopic dijalankan pada notebook untuk proses modelling dan
                evaluasi. Hasil akhir disimpan dalam bentuk CSV, kemudian dibaca
                oleh FastAPI dan divisualisasikan melalui React Dashboard.
                Pendekatan ini membuat deployment lebih ringan karena model
                tidak perlu dilatih ulang saat dashboard dibuka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}