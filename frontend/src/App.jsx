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
  BarChart3,
  Brain,
  CalendarDays,
  FileText,
  Filter,
  Globe2,
  Layers3,
  Search,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const palette = [
  "#38bdf8",
  "#a78bfa",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#fb7185",
  "#60a5fa",
  "#c084fc",
  "#2dd4bf",
  "#f97316"
];

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Gagal mengambil data: ${path}`);
  }
  return res.json();
}

function formatNumber(value) {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("id-ID").format(value);
}

function StatCard({ icon: Icon, label, value, helper }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="stat-icon">
        <Icon size={22} />
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <h3>{value}</h3>
        <p className="stat-helper">{helper}</p>
      </div>
    </motion.div>
  );
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="section-card">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="tooltip">
      <p className="tooltip-label">{label}</p>
      {payload.map((item, idx) => (
        <p key={idx} style={{ color: item.color }}>
          {item.name}: {formatNumber(item.value)}
        </p>
      ))}
    </div>
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
      .then(([summaryData, yearlyData, monthlyData, topData, topicYearData, topicInfoData, filterData]) => {
        setSummary(summaryData);
        setYearly(yearlyData);
        setMonthly(monthlyData);
        setTopTopics(topData);
        setTopicYearly(topicYearData);
        setTopicInfo(topicInfoData);
        setFilters(filterData);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedYear) params.set("year", selectedYear);
    if (selectedTopic) params.set("topic_name", selectedTopic);
    if (keyword) params.set("q", keyword);
    params.set("limit", "30");

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
      if (!map.has(key)) map.set(key, { year: key });
      map.get(key)[row.topic_name] = row.count;
    });
    return Array.from(map.values()).sort((a, b) => a.year - b.year);
  }, [topicYearly]);

  const topTopicNames = useMemo(() => {
    return Array.from(new Set(topicYearly.map((d) => d.topic_name))).slice(0, 8);
  }, [topicYearly]);

  if (error) {
    return (
      <main className="app-shell">
        <div className="error-box">
          <h1>Backend belum terhubung</h1>
          <p>{error}</p>
          <p>Pastikan FastAPI berjalan di {API_BASE}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-grid">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="eyebrow">
              <Sparkles size={16} />
              BERTopic Intelligence Dashboard
            </div>
            <h1>Analisis Tren & Dinamika Topik Hoaks Kominfo/Komdigi</h1>
            <p>
              Dashboard interaktif berbasis FastAPI + React untuk mengeksplorasi pola publikasi
              klarifikasi hoaks, topik dominan, dan perubahan isu dari tahun ke tahun.
            </p>
            <div className="hero-actions">
              <button onClick={() => setActiveTab("overview")}>Lihat Overview</button>
              <button className="secondary" onClick={() => setActiveTab("articles")}>
                Eksplorasi Artikel
              </button>
            </div>
          </motion.div>

          <motion.div className="hero-panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <Brain size={42} />
            <h3>Topic Modeling Pipeline</h3>
            <p>Notebook → BERTopic → CSV Result → FastAPI → React Dashboard</p>
            <div className="pipeline">
              <span>EDA</span>
              <span>Preprocessing</span>
              <span>BERTopic</span>
              <span>Deployment</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard
          icon={FileText}
          label="Total Artikel"
          value={formatNumber(summary?.total_articles)}
          helper="Jumlah dokumen dalam dataset."
        />
        <StatCard
          icon={Layers3}
          label="Total Topik"
          value={formatNumber(summary?.total_topics)}
          helper="Topik unik hasil pemodelan."
        />
        <StatCard
          icon={CalendarDays}
          label="Rentang Data"
          value={summary?.date_min && summary?.date_max ? `${summary.date_min} – ${summary.date_max}` : "-"}
          helper="Periode publikasi artikel."
        />
        <StatCard
          icon={Activity}
          label="Outlier"
          value={formatNumber(summary?.outliers)}
          helper="Dokumen dengan label topik -1."
        />
      </section>

      <section className="notice">
        Data tahun 2018 dan 2026 perlu dibaca hati-hati karena kemungkinan tidak mencakup satu tahun penuh.
        Analisis bulanan digunakan sebagai pendamping agar interpretasi tren lebih adil.
      </section>

      <nav className="tabs">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
          <BarChart3 size={17} /> Overview
        </button>
        <button className={activeTab === "topics" ? "active" : ""} onClick={() => setActiveTab("topics")}>
          <Layers3 size={17} /> Topik
        </button>
        <button className={activeTab === "articles" ? "active" : ""} onClick={() => setActiveTab("articles")}>
          <Search size={17} /> Artikel
        </button>
        <button className={activeTab === "metadata" ? "active" : ""} onClick={() => setActiveTab("metadata")}>
          <Globe2 size={17} /> Metadata
        </button>
      </nav>

      {activeTab === "overview" && (
        <section className="dashboard-grid">
          <SectionCard title="Tren Tahunan" subtitle="Jumlah artikel klarifikasi hoaks per tahun.">
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={yearly}>
                <defs>
                  <linearGradient id="yearGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.72} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.09)" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" name="Artikel" stroke="#38bdf8" fill="url(#yearGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Topik Dominan" subtitle="Top 10 topik terbesar berdasarkan jumlah artikel.">
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={topTopics.slice(0, 10)} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.09)" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis type="category" dataKey="topic_name" stroke="#94a3b8" width={160} tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Artikel" radius={[0, 10, 10, 0]}>
                  {topTopics.slice(0, 10).map((_, index) => (
                    <Cell key={index} fill={palette[index % palette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Tren Bulanan" subtitle="Dinamika publikasi artikel berdasarkan bulan.">
            <ResponsiveContainer width="100%" height={390}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.09)" />
                <XAxis dataKey="year_month" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" name="Artikel" stroke="#a78bfa" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </SectionCard>
        </section>
      )}

      {activeTab === "topics" && (
        <section className="dashboard-grid">
          <SectionCard title="Distribusi Topik" subtitle="Proporsi artikel pada topik-topik terbesar.">
            <ResponsiveContainer width="100%" height={420}>
              <PieChart>
                <Pie data={topTopics.slice(0, 10)} dataKey="count" nameKey="topic_name" innerRadius={90} outerRadius={145} paddingAngle={4}>
                  {topTopics.slice(0, 10).map((_, index) => (
                    <Cell key={index} fill={palette[index % palette.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Dinamika Topik per Tahun" subtitle="Perubahan volume artikel untuk beberapa topik terbesar.">
            <ResponsiveContainer width="100%" height={420}>
              <LineChart data={topicYearPivot}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.09)" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {topTopicNames.map((name, idx) => (
                  <Line key={name} type="monotone" dataKey={name} stroke={palette[idx % palette.length]} strokeWidth={3} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Informasi Topik BERTopic" subtitle="Ringkasan topik dan kata kunci representatif.">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {Object.keys(topicInfo[0] || { Topic: "Topic", Count: "Count", Name: "Name" }).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topicInfo.slice(0, 40).map((row, idx) => (
                    <tr key={idx}>
                      {Object.keys(topicInfo[0] || {}).map((key) => (
                        <td key={key}>{String(row[key] ?? "")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </section>
      )}

      {activeTab === "articles" && (
        <section>
          <div className="filter-card">
            <div className="filter-title">
              <Filter size={18} /> Filter Artikel
            </div>
            <div className="filters">
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Semua Tahun</option>
                {filters.years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                <option value="">Semua Topik</option>
                {topicNames.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Cari judul/artikel..." />
            </div>
          </div>

          <SectionCard title="Daftar Artikel" subtitle={`${formatNumber(articles.total)} artikel ditemukan berdasarkan filter.`}>
            <div className="article-list">
              {articles.data.map((item, idx) => (
                <article className="article-card" key={idx}>
                  <div>
                    <span>{item.published_at || "-"}</span>
                    <span>{item.topic_name || "Tanpa Topik"}</span>
                  </div>
                  <h3>{item.title || "Tanpa Judul"}</h3>
                  {item.url && <a href={item.url} target="_blank" rel="noreferrer">Buka sumber →</a>}
                </article>
              ))}
            </div>
          </SectionCard>
        </section>
      )}

      {activeTab === "metadata" && (
        <section className="dashboard-grid">
          <SectionCard title="Sumber Data" subtitle="Informasi file dan kolom dari backend.">
            <div className="metadata-box">
              <p><strong>Source:</strong> {summary?.source}</p>
              <p><strong>API:</strong> {API_BASE}</p>
              <p><strong>Kolom tersedia:</strong></p>
              <div className="chips">
                {(summary?.available_columns || []).map((col) => (
                  <span key={col}>{col}</span>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Catatan Deployment" subtitle="Arsitektur sistem yang digunakan.">
            <div className="metadata-box">
              <p>Notebook digunakan untuk training dan analisis BERTopic.</p>
              <p>FastAPI digunakan sebagai backend penyedia data.</p>
              <p>React digunakan sebagai frontend dashboard interaktif dan estetik.</p>
            </div>
          </SectionCard>
        </section>
      )}

      <footer>
        Proyek UTS Proyek Data Mining • FastAPI + React • BERTopic Topic Modeling
      </footer>
    </main>
  );
}

function topicsFromFilters(filters) {
  return (filters.topics || []).map((item) => item.topic_name).filter(Boolean);
}
