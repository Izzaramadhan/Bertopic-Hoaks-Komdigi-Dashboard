import {
  CalendarDays,
  ExternalLink,
  FileText,
  Filter,
  RotateCcw,
  Search,
  Tags
} from "lucide-react";
import Panel from "../components/Panel";
import EmptyState from "../components/EmptyState";
import { formatNumber } from "../utils/format";

export default function ArticleSection({
  filters,
  topicNames,
  articles,
  selectedYear,
  setSelectedYear,
  selectedTopic,
  setSelectedTopic,
  keyword,
  setKeyword
}) {
  const years = filters?.years || [];
  const topics = topicNames || [];
  const articleData = articles?.data || [];
  const totalArticles = articles?.total || 0;

  const hasActiveFilter = Boolean(selectedYear || selectedTopic || keyword);

  const resetFilter = () => {
    setSelectedYear("");
    setSelectedTopic("");
    setKeyword("");
  };

  return (
    <section
      id="articles"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-8"
    >
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Eksplorasi Artikel
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Telusuri Artikel Klarifikasi Hoaks
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            Gunakan filter tahun, topik, dan kata kunci untuk menelusuri artikel
            hasil topic modeling BERTopic secara lebih spesifik.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-3xl border border-blue-200 bg-blue-50 px-5 py-4 text-blue-900">
          <FileText size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
              Hasil Ditemukan
            </p>
            <p className="text-2xl font-black tracking-tight">
              {formatNumber(totalArticles)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Filter size={20} />
            </div>

            <div>
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Filter Data
              </h3>
              <p className="text-xs text-slate-500">
                Persempit artikel berdasarkan metadata.
              </p>
            </div>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
              Pencarian Kata Kunci
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari: vaksin, pemilu, whatsapp..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                <CalendarDays size={15} />
                Tahun
              </span>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Semua Tahun</option>

                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                <Tags size={15} />
                Topik
              </span>

              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Semua Topik</option>

                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {hasActiveFilter && (
            <div className="mt-5 rounded-3xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-blue-700">
                Filter Aktif
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedYear && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                    Tahun: {selectedYear}
                  </span>
                )}

                {selectedTopic && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                    Topik dipilih
                  </span>
                )}

                {keyword && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                    Keyword: {keyword}
                  </span>
                )}
              </div>
            </div>
          )}

          <button
            onClick={resetFilter}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <RotateCcw size={17} />
            Reset Filter
          </button>
        </aside>

        <Panel
          title="Daftar Artikel"
          subtitle={`${formatNumber(
            totalArticles
          )} artikel ditemukan berdasarkan filter aktif.`}
        >
          {articleData.length ? (
            <div className="grid gap-4">
              {articleData.map((item, idx) => (
                <article
                  key={`${item.title}-${idx}`}
                  className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
                >
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      <CalendarDays size={13} />
                      {item.published_at || "Tanpa tanggal"}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                      <Tags size={13} />
                      {item.topic_name || "Tanpa topik"}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold leading-7 tracking-tight text-slate-900 transition group-hover:text-blue-700">
                    {item.title || "Tanpa Judul"}
                  </h3>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <p className="text-xs font-semibold text-slate-400">
                      Artikel #{idx + 1}
                    </p>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-blue-700"
                      >
                        Buka sumber
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Tidak ada artikel"
              description="Coba ubah filter tahun, topik, atau kata kunci untuk menampilkan artikel."
            />
          )}
        </Panel>
      </div>
    </section>
  );
}