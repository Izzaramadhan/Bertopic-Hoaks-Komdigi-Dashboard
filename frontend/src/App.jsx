import React, { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts";
import {
  Activity,
  AlertCircle,
  BarChart3,
  BookOpenText,
  Brain,
  CalendarDays,
  Database,
  FileText,
  Filter,
  Globe2,
  Layers3,
  Search,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import "./styles.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const COLORS = [
  "#2563eb",
  "#0f766e",
  "#7c3aed",
  "#ea580c",
  "#0891b2",
  "#be123c",
  "#4f46e5",
  "#16a34a",
  "#c2410c",
  "#9333ea"
];

async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Gagal mengambil data dari ${path}`);
  }

  return response.json();
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat("id-ID").format(value);
}

function topicsFromFilters(filters) {
  return (filters.topics || []).map((item) => item.topic_name).filter(Boolean);
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <p className="mb-2 text-sm font-bold text-slate-900">{label}</p>

      {payload.map((item, index) => (
        <p key={index} className="text-xs font-semibold" style={{ color: item.color }}>
          {item.name}: {formatNumber(item.value)}
        </p>
      ))}
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mb-3 rounded-2xl bg-slate-100 p-3 text-slate-500">
        <AlertCircle size={28} />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mb-5 h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Memuat dashboard...
        </h1>
        <p className="mt-2 text-sm text-slate-500">Mengambil data dari FastAPI.</p>
      </div>
    </main>
  );
}

function ErrorState({ error }) {
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

function StatCard({ icon: Icon, label, value, helper, tone = "blue" }) {
  const toneMap = {
    blue: {
      icon: "bg-blue-50 text-blue-700",
      border: "border-blue-100"
    },
    teal: {
      icon: "bg-teal-50 text-teal-700",
      border: "border-teal-100"
    },
    purple: {
      icon: "bg-violet-50 text-violet-700",
      border: "border-violet-100"
    },
    orange: {
      icon: "bg-orange-50 text-orange-700",
      border: "border-orange-100"
    }
  };

  const selectedTone = toneMap[tone] || toneMap.blue;

  return (
    <div
      className={`flex min-h-36 gap-4 rounded-3xl border ${selectedTone.border} bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${selectedTone.icon}`}>
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

function Panel({ title, subtitle, children, className = "" }) {
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

function TabButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
        active
          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
          : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
      }`}
    >
      <Icon size={17} />
      {label}
    </button>
  );
}

export default function App() {
  const [summary, setSummary] = useState(null);
  const [yearly, setYearly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [topTopics, setTopTopics] = useState([]);
  const [topicYearly, setTopicYearly] = useState([]);
  const [topicInfo, setTopicInfo] = useState([]);
  const [filters, setFilters] = useState({ years: [], topics: [] });
  const [articles, setArticles] = useState({ total: 0, data: [] });

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiGet("/api/summary"),
      apiGet("/api/trends/yearly"),
      apiGet("/api/trends/monthly"),
      apiGet("/api/topics/top?limit=20"),
      apiGet("/api/topics/yearly?limit=8"),
      apiGet("/api/topic-info"),
      apiGet("/api/filters")
    ])
      .then(
        ([
          summaryData,
          yearlyData,
          monthlyData,
          topData,
          topicYearData,
          topicInfoData,
          filterData
        ]) => {
          setSummary(summaryData);
          setYearly(yearlyData);
          setMonthly(monthlyData);
          setTopTopics(topData);
          setTopicYearly(topicYearData);
          setTopicInfo(topicInfoData);
          setFilters(filterData);
        }
      )
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedYear) params.set("year", selectedYear);
    if (selectedTopic) params.set("topic_name", selectedTopic);
    if (keyword) params.set("q", keyword);

    params.set("limit", "40");

    apiGet(`/api/articles?${params.toString()}`)
      .then(setArticles)
      .catch((err) => setError(err.message));
  }, [selectedYear, selectedTopic, keyword]);

  const topicNames = useMemo(() => {
    return Array.from(new Set(topicsFromFilters(filters))).sort();
  }, [filters]);

  const topicYearPivot = useMemo(() => {
    const map = new Map();

    topicYearly.forEach((row) => {
      const key = row.year;

      if (!map.has(key)) {
        map.set(key, { year: key });
      }

      map.get(key)[row.topic_name] = row.count;
    });

    return Array.from(map.values()).sort((a, b) => a.year - b.year);
  }, [topicYearly]);

  const topicYearNames = useMemo(() => {
    return Array.from(new Set(topicYearly.map((item) => item.topic_name))).slice(0, 8);
  }, [topicYearly]);

  const peakYear = yearly?.length
    ? [...yearly].sort((a, b) => b.count - a.count)[0]
    : null;

  const topTopic = topTopics?.[0];

  if (error) return <ErrorState error={error} />;
  if (isLoading) return <LoadingState />;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef3f9_100%)] px-4 py-6 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <header className="sticky top-4 z-30 mb-5 flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-sm backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-700 text-white shadow-lg shadow-blue-900/20">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                Hoax Topic Intelligence
              </h1>
              <p className="text-xs font-semibold text-slate-500">
                Kominfo/Komdigi Clarification Analytics
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
            <span>API Connected</span>
            <span className="hidden text-slate-900 sm:inline">
              {summary?.source || "dataset"}
            </span>
          </div>
        </header>

        <section className="mb-5 grid gap-5 lg:grid-cols-[1.55fr_0.75fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 text-white shadow-sm">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-2xl" />

            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold text-blue-100">
                <Brain size={15} />
                BERTopic Topic Modeling Dashboard
              </div>

              <h2 className="max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                Analisis Tren dan Dinamika Topik Artikel Klarifikasi Hoaks
              </h2>

              <p className="mt-6 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base">
                Dashboard ini menyajikan ringkasan data, tren publikasi, distribusi
                topik, serta eksplorasi artikel hasil pemodelan topik menggunakan
                BERTopic pada artikel klarifikasi hoaks Kominfo/Komdigi tahun
                2018–2026.
              </p>
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-blue-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Periode Data
              </p>
              <h3 className="mt-2 text-lg font-extrabold leading-7 text-slate-900">
                {summary?.date_min || "-"} — {summary?.date_max || "-"}
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-blue-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Topik Dominan
              </p>
              <h3 className="mt-2 text-base font-extrabold leading-7 text-slate-900">
                {topTopic?.topic_name || "-"}
              </h3>
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FileText}
            label="Total Artikel"
            value={formatNumber(summary?.total_articles)}
            helper="Artikel hasil preprocessing dan topic modeling."
            tone="blue"
          />

          <StatCard
            icon={Layers3}
            label="Jumlah Topik"
            value={formatNumber(summary?.total_topics)}
            helper="Topik unik hasil BERTopic."
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
            value={formatNumber(summary?.outliers)}
            helper="Dokumen dengan label topik -1 setelah reduksi."
            tone="orange"
          />
        </section>

        <section className="mb-5 flex items-start gap-3 rounded-3xl border border-blue-200 bg-blue-50 px-5 py-4 text-blue-900">
          <TrendingUp size={21} className="mt-0.5 shrink-0" />
          <p className="text-sm leading-6">
            <strong>Catatan analisis:</strong> tahun 2018 dan 2026 bersifat
            parsial, sehingga tren bulanan digunakan sebagai pendamping tren tahunan.
          </p>
        </section>

        <nav className="mb-5 flex flex-wrap gap-3">
          <TabButton
            active={activeTab === "overview"}
            icon={BarChart3}
            label="Overview"
            onClick={() => setActiveTab("overview")}
          />

          <TabButton
            active={activeTab === "topics"}
            icon={Layers3}
            label="Topik"
            onClick={() => setActiveTab("topics")}
          />

          <TabButton
            active={activeTab === "articles"}
            icon={Search}
            label="Artikel"
            onClick={() => setActiveTab("articles")}
          />

          <TabButton
            active={activeTab === "metadata"}
            icon={Database}
            label="Metadata"
            onClick={() => setActiveTab("metadata")}
          />
        </nav>

        {activeTab === "overview" && (
          <section className="grid gap-5 xl:grid-cols-2">
            <Panel
              title="Tren Artikel per Tahun"
              subtitle="Jumlah artikel klarifikasi hoaks berdasarkan tahun publikasi."
            >
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart data={yearly}>
                  <defs>
                    <linearGradient id="yearArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.32} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />

                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Artikel"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fill="url(#yearArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>

            <Panel
              title="Topik Dominan"
              subtitle="Sepuluh topik dengan jumlah artikel terbanyak."
            >
              <ResponsiveContainer width="100%" height={340}>
                <BarChart
                  data={topTopics.slice(0, 10)}
                  layout="vertical"
                  margin={{ left: 18, right: 22 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="topic_name"
                    tickLine={false}
                    axisLine={false}
                    width={160}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip content={<CustomTooltip />} />

                  <Bar dataKey="count" name="Artikel" radius={[0, 8, 8, 0]}>
                    {topTopics.slice(0, 10).map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            <Panel
              title="Tren Artikel per Bulan"
              subtitle="Dinamika publikasi artikel berdasarkan bulan untuk membaca perubahan yang lebih detail."
              className="xl:col-span-2"
            >
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year_month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />

                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Artikel"
                    stroke="#0f766e"
                    strokeWidth={2.8}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Panel>
          </section>
        )}

        {activeTab === "topics" && (
          <section className="grid gap-5 xl:grid-cols-2">
            <Panel
              title="Distribusi Proporsi Topik"
              subtitle="Proporsi artikel pada topik-topik terbesar."
            >
              <ResponsiveContainer width="100%" height={360}>
                <PieChart>
                  <Pie
                    data={topTopics.slice(0, 10)}
                    dataKey="count"
                    nameKey="topic_name"
                    innerRadius={72}
                    outerRadius={125}
                    paddingAngle={3}
                  >
                    {topTopics.slice(0, 10).map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Panel>

            <Panel
              title="Dinamika Topik per Tahun"
              subtitle="Perubahan volume artikel pada topik dominan dari tahun ke tahun."
            >
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={topicYearPivot}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />

                  {topicYearNames.map((name, index) => (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2.4}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </Panel>

            <Panel
              title="Informasi Topik BERTopic"
              subtitle="Ringkasan topic ID, jumlah dokumen, kata kunci, dan contoh dokumen representatif."
              className="xl:col-span-2"
            >
              {topicInfo.length ? (
                <div className="max-h-[480px] overflow-auto rounded-3xl border border-slate-200">
                  <table className="min-w-[900px] w-full border-collapse text-left">
                    <thead className="sticky top-0 z-10 bg-slate-50">
                      <tr>
                        {Object.keys(topicInfo[0]).map((key) => (
                          <th
                            key={key}
                            className="border-b border-slate-200 px-4 py-3 text-xs font-extrabold text-slate-900"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {topicInfo.slice(0, 50).map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          {Object.keys(topicInfo[0]).map((key) => (
                            <td
                              key={key}
                              className="border-b border-slate-100 px-4 py-3 align-top text-xs leading-5 text-slate-600"
                            >
                              {String(row[key] ?? "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState
                  title="Informasi topik belum tersedia"
                  description="Pastikan file informasi_topik_bertopic.csv tersedia di backend/data."
                />
              )}
            </Panel>
          </section>
        )}

        {activeTab === "articles" && (
          <section className="grid gap-5 lg:grid-cols-[330px_1fr]">
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <div className="mb-5 flex items-center gap-3 text-slate-900">
                <div className="rounded-2xl bg-blue-50 p-2 text-blue-700">
                  <Filter size={18} />
                </div>
                <h2 className="text-lg font-extrabold tracking-tight">
                  Filter Artikel
                </h2>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    Tahun
                  </span>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Semua Tahun</option>
                    {filters.years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    Topik
                  </span>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Semua Topik</option>
                    {topicNames.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    Kata Kunci
                  </span>
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Contoh: vaksin, pemilu, whatsapp"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <button
                  onClick={() => {
                    setSelectedYear("");
                    setSelectedTopic("");
                    setKeyword("");
                  }}
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Reset Filter
                </button>
              </div>
            </aside>

            <Panel
              title="Eksplorasi Artikel"
              subtitle={`${formatNumber(
                articles.total
              )} artikel ditemukan berdasarkan filter aktif.`}
            >
              <div className="grid gap-3">
                {articles.data.length ? (
                  articles.data.map((item, idx) => (
                    <article
                      key={`${item.title}-${idx}`}
                      className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {item.published_at || "Tanpa tanggal"}
                        </span>
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {item.topic_name || "Tanpa topik"}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold leading-7 tracking-tight text-slate-900">
                        {item.title || "Tanpa Judul"}
                      </h3>

                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-sm font-extrabold text-blue-700 hover:text-blue-900"
                        >
                          Buka sumber artikel →
                        </a>
                      )}
                    </article>
                  ))
                ) : (
                  <EmptyState
                    title="Tidak ada artikel"
                    description="Coba ubah filter tahun, topik, atau kata kunci."
                  />
                )}
              </div>
            </Panel>
          </section>
        )}

        {activeTab === "metadata" && (
          <section className="grid gap-5 xl:grid-cols-2">
            <Panel
              title="Metadata Dataset"
              subtitle="Informasi file dan kolom yang digunakan oleh dashboard."
            >
              <div className="space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  <strong className="text-slate-900">Sumber:</strong>{" "}
                  {summary?.source}
                </p>
                <p>
                  <strong className="text-slate-900">API:</strong> {API_BASE}
                </p>
                <p>
                  <strong className="text-slate-900">Total artikel:</strong>{" "}
                  {formatNumber(summary?.total_articles)}
                </p>
                <p>
                  <strong className="text-slate-900">Total topik:</strong>{" "}
                  {formatNumber(summary?.total_topics)}
                </p>
              </div>
            </Panel>

            <Panel
              title="Arsitektur Sistem"
              subtitle="Alur kerja dari notebook sampai dashboard."
            >
              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-900">
                  <BookOpenText size={18} />
                  Notebook BERTopic
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-900">
                  <Database size={18} />
                  CSV Hasil Modeling
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-900">
                  <Globe2 size={18} />
                  FastAPI Backend
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-900">
                  <BarChart3 size={18} />
                  React Dashboard
                </div>
              </div>
            </Panel>

            <Panel
              title="Kolom Tersedia"
              subtitle="Daftar kolom yang dibaca dari file hasil topic modeling."
              className="xl:col-span-2"
            >
              <div className="flex flex-wrap gap-2">
                {(summary?.available_columns || []).map((col) => (
                  <span
                    key={col}
                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-extrabold text-blue-700"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </Panel>
          </section>
        )}

        <footer className="py-10 text-center text-sm text-slate-500">
          Proyek UTS Proyek Data Mining • BERTopic • FastAPI • React
        </footer>
      </div>
    </main>
  );
}