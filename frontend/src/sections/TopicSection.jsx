import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  BarChart3,
  Layers3,
  ListTree,
  Table2,
  Tags,
  TrendingUp
} from "lucide-react";
import Panel from "../components/Panel";
import EmptyState from "../components/EmptyState";
import CustomTooltip from "../components/CustomTooltip";
import { COLORS } from "../utils/chartColors";
import { formatNumber } from "../utils/format";

export default function TopicSection({
  topTopics,
  topicYearPivot,
  topicYearNames,
  topicInfo
}) {
  const topics = topTopics || [];
  const topicInfoData = topicInfo || [];
  const yearlyTopicData = topicYearPivot || [];
  const yearlyTopicNames = topicYearNames || [];

  const topTopic = topics[0];
  const secondTopic = topics[1];
  const thirdTopic = topics[2];

  const totalTopicArticles = topics.reduce((total, topic) => {
    return total + Number(topic.count || 0);
  }, 0);

  return (
    <section
      id="topics"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-8"
    >
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Analisis Topik
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Distribusi dan Dinamika Topik Hoaks
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            Bagian ini menampilkan topik dominan hasil BERTopic, proporsi topik,
            perubahan topik dari tahun ke tahun, serta informasi detail kata
            kunci pada setiap topik.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-3xl border border-violet-200 bg-violet-50 px-5 py-4 text-violet-800">
          <Layers3 size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-violet-700">
              Topik Terbaca
            </p>
            <p className="text-2xl font-black tracking-tight">
              {formatNumber(topicInfoData.length)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
              <Tags size={21} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
                Topik Paling Dominan
              </p>
              <h3 className="mt-1 text-base font-black leading-6 text-slate-900">
                {topTopic?.topic_name || "-"}
              </h3>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {topTopic
              ? `${formatNumber(topTopic.count)} artikel berada pada topik ini.`
              : "Data topik dominan belum tersedia."}
          </p>
        </div>

        <div className="rounded-[2rem] border border-teal-100 bg-teal-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
              <ListTree size={21} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-teal-700">
                Total Artikel Topik
              </p>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                {formatNumber(totalTopicArticles)}
              </h3>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Akumulasi jumlah artikel dari daftar topik terbesar yang ditampilkan
            pada dashboard.
          </p>
        </div>

        <div className="rounded-[2rem] border border-orange-100 bg-orange-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-orange-700 shadow-sm">
              <TrendingUp size={21} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-orange-700">
                Topik Pembanding
              </p>
              <h3 className="mt-1 text-base font-black leading-6 text-slate-900">
                {secondTopic?.topic_name || thirdTopic?.topic_name || "-"}
              </h3>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Topik ini digunakan sebagai pembanding untuk melihat variasi isu
            hoaks selain topik paling dominan.
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel
          title="Topik Dominan"
          subtitle="Sepuluh topik dengan jumlah artikel terbanyak berdasarkan hasil BERTopic."
        >
          {topics.length ? (
            <ResponsiveContainer width="100%" height={380}>
              <BarChart
                data={topics.slice(0, 10)}
                layout="vertical"
                margin={{ left: 18, right: 22 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  type="category"
                  dataKey="topic_name"
                  tickLine={false}
                  axisLine={false}
                  width={170}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="count" name="Artikel" radius={[0, 9, 9, 0]}>
                  {topics.slice(0, 10).map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              title="Topik belum tersedia"
              description="Pastikan endpoint /api/topics/top sudah mengembalikan data topik."
            />
          )}
        </Panel>

        <Panel
          title="Proporsi Topik"
          subtitle="Proporsi artikel pada sepuluh topik terbesar."
        >
          {topics.length ? (
            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie
                  data={topics.slice(0, 10)}
                  dataKey="count"
                  nameKey="topic_name"
                  innerRadius={78}
                  outerRadius={130}
                  paddingAngle={3}
                >
                  {topics.slice(0, 10).map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              title="Proporsi topik belum tersedia"
              description="Data topik belum dapat divisualisasikan."
            />
          )}
        </Panel>

        <Panel
          title="Top 5 Topik Utama"
          subtitle="Ringkasan lima topik terbesar berdasarkan jumlah artikel."
          className="xl:col-span-2"
        >
          {topics.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {topics.slice(0, 5).map((topic, index) => (
                <div
                  key={`${topic.topic_name}-${index}`}
                  className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    >
                      <BarChart3 size={20} />
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700">
                      #{index + 1}
                    </span>
                  </div>

                  <h3 className="line-clamp-3 text-sm font-black leading-6 text-slate-900">
                    {topic.topic_name}
                  </h3>

                  <p className="mt-3 text-2xl font-black tracking-tight text-slate-900">
                    {formatNumber(topic.count)}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    artikel
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Ringkasan topik belum tersedia"
              description="Tidak ada topik yang dapat ditampilkan."
            />
          )}
        </Panel>

        <Panel
          title="Dinamika Topik per Tahun"
          subtitle="Perubahan volume artikel pada topik dominan dari tahun ke tahun."
          className="xl:col-span-2"
        >
          {yearlyTopicData.length && yearlyTopicNames.length ? (
            <ResponsiveContainer width="100%" height={430}>
              <LineChart data={yearlyTopicData}>
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
                <Legend wrapperStyle={{ fontSize: 12 }} />

                {yearlyTopicNames.map((name, index) => (
                  <Line
                    key={name}
                    type="monotone"
                    dataKey={name}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2.6}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              title="Dinamika topik belum tersedia"
              description="Data tren topik per tahun belum dapat ditampilkan."
            />
          )}
        </Panel>

        <Panel
          title="Informasi Topik BERTopic"
          subtitle="Ringkasan topic ID, jumlah dokumen, kata kunci, dan contoh dokumen representatif."
          className="xl:col-span-2"
        >
          {topicInfoData.length ? (
            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Table2 size={19} />
                </div>

                <div>
                  <h3 className="font-black tracking-tight text-slate-900">
                    Tabel Informasi Topik
                  </h3>
                  <p className="text-xs text-slate-500">
                    Menampilkan maksimal 60 baris topik pertama.
                  </p>
                </div>
              </div>

              <div className="max-h-[520px] overflow-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr>
                      {Object.keys(topicInfoData[0]).map((key) => (
                        <th
                          key={key}
                          className="border-b border-slate-200 px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-slate-600"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {topicInfoData.slice(0, 60).map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        {Object.keys(topicInfoData[0]).map((key) => (
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
            </div>
          ) : (
            <EmptyState
              title="Informasi topik belum tersedia"
              description="Pastikan file informasi_topik_bertopic.csv tersedia di backend/data."
            />
          )}
        </Panel>
      </div>
    </section>
  );
}