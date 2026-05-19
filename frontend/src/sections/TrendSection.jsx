import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  LineChart as LineChartIcon,
  TrendingUp
} from "lucide-react";
import Panel from "../components/Panel";
import CustomTooltip from "../components/CustomTooltip";
import EmptyState from "../components/EmptyState";
import { formatNumber } from "../utils/format";

export default function TrendSection({ yearly, monthly }) {
  const yearlyData = yearly || [];
  const monthlyData = monthly || [];

  const peakYear = yearlyData.length
    ? [...yearlyData].sort((a, b) => b.count - a.count)[0]
    : null;

  const peakMonth = monthlyData.length
    ? [...monthlyData].sort((a, b) => b.count - a.count)[0]
    : null;

  const latestMonth = monthlyData.length
    ? monthlyData[monthlyData.length - 1]
    : null;

  const totalArticles = yearlyData.reduce((total, item) => {
    return total + Number(item.count || 0);
  }, 0);

  return (
    <section
      id="trends"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-8"
    >
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Tren Publikasi
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Perubahan Jumlah Artikel dari Waktu ke Waktu
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            Visualisasi tren digunakan untuk melihat bagaimana intensitas
            publikasi artikel klarifikasi hoaks berubah berdasarkan tahun dan
            bulan.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-3xl border border-blue-200 bg-blue-50 px-5 py-4 text-blue-900">
          <TrendingUp size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
              Total Artikel
            </p>
            <p className="text-2xl font-black tracking-tight">
              {formatNumber(totalArticles)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
              <CalendarDays size={21} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
                Puncak Tahunan
              </p>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                {peakYear?.year || "-"}
              </h3>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {peakYear
              ? `${formatNumber(peakYear.count)} artikel dipublikasikan pada tahun tersebut.`
              : "Data puncak tahunan belum tersedia."}
          </p>
        </div>

        <div className="rounded-[2rem] border border-teal-100 bg-teal-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
              <LineChartIcon size={21} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-teal-700">
                Puncak Bulanan
              </p>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                {peakMonth?.year_month || "-"}
              </h3>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {peakMonth
              ? `${formatNumber(peakMonth.count)} artikel muncul pada bulan tersebut.`
              : "Data puncak bulanan belum tersedia."}
          </p>
        </div>

        <div className="rounded-[2rem] border border-orange-100 bg-orange-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-orange-700 shadow-sm">
              <AlertTriangle size={21} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-orange-700">
                Catatan Data
              </p>
              <h3 className="mt-1 text-base font-black leading-6 text-slate-900">
                2018 dan 2026 Parsial
              </h3>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Tahun awal dan akhir perlu dibaca hati-hati karena tidak mencakup
            periode satu tahun penuh.
          </p>
        </div>
      </div>

      <div className="mb-5 flex items-start gap-3 rounded-3xl border border-blue-200 bg-blue-50 px-5 py-4 text-blue-900">
        <TrendingUp size={21} className="mt-0.5 shrink-0" />

        <p className="text-sm leading-6">
          <strong>Catatan analisis:</strong> tren tahunan memberikan gambaran
          besar perubahan publikasi, sedangkan tren bulanan membantu membaca
          dinamika yang lebih detail dan mengurangi bias pada tahun parsial.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel
          title="Tren Artikel per Tahun"
          subtitle="Jumlah artikel klarifikasi hoaks berdasarkan tahun publikasi."
        >
          {yearlyData.length ? (
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={yearlyData}>
                <defs>
                  <linearGradient id="yearArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.34} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />

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
          ) : (
            <EmptyState
              title="Tren tahunan belum tersedia"
              description="Pastikan endpoint tren tahunan sudah mengembalikan data."
            />
          )}
        </Panel>

        <Panel
          title="Distribusi Artikel Tahunan"
          subtitle="Perbandingan jumlah artikel antar tahun dalam bentuk diagram batang."
        >
          {yearlyData.length ? (
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="count"
                  name="Artikel"
                  fill="#0f766e"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              title="Distribusi tahunan belum tersedia"
              description="Data tahunan belum dapat divisualisasikan."
            />
          )}
        </Panel>

        <Panel
          title="Tren Artikel per Bulan"
          subtitle="Dinamika publikasi artikel berdasarkan bulan."
          className="xl:col-span-2"
        >
          {monthlyData.length ? (
            <ResponsiveContainer width="100%" height={390}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  dataKey="year_month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Line
                  type="monotone"
                  dataKey="count"
                  name="Artikel"
                  stroke="#0f766e"
                  strokeWidth={2.8}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              title="Tren bulanan belum tersedia"
              description="Pastikan endpoint tren bulanan sudah mengembalikan data."
            />
          )}
        </Panel>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
              <BarChart3 size={23} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Interpretasi Tren
              </p>
              <h3 className="text-lg font-black tracking-tight text-slate-900">
                Ringkasan Pola Publikasi
              </h3>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Tahun Tertinggi
              </p>
              <p className="mt-2 text-xl font-black text-slate-900">
                {peakYear?.year || "-"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Tahun dengan publikasi klarifikasi hoaks paling banyak pada
                dataset.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Bulan Tertinggi
              </p>
              <p className="mt-2 text-xl font-black text-slate-900">
                {peakMonth?.year_month || "-"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Bulan dengan intensitas artikel tertinggi berdasarkan tren
                bulanan.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Data Terakhir
              </p>
              <p className="mt-2 text-xl font-black text-slate-900">
                {latestMonth?.year_month || "-"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Periode terakhir yang tersedia pada dataset hasil pemodelan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}