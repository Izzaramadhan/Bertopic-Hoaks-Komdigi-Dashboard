import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

import HeroSection from "./sections/HeroSection";
import OverviewSection from "./sections/OverviewSection";
import TrendSection from "./sections/TrendSection";
import TopicSection from "./sections/TopicSection";
import ArticleSection from "./sections/ArticleSection";
import MetadataSection from "./sections/MetadataSection";

import { apiGet } from "./services/api";

function topicsFromFilters(filters) {
  return (filters.topics || []).map((item) => item.topic_name).filter(Boolean);
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

  const peakYear = useMemo(() => {
    if (!yearly.length) return null;

    return [...yearly].sort((a, b) => b.count - a.count)[0];
  }, [yearly]);

  const topTopic = topTopics?.[0];

  if (error) return <ErrorState error={error} />;
  if (isLoading) return <LoadingState />;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef3f9_100%)] text-slate-900">
      <Navbar source={summary?.source} />

      <HeroSection summary={summary} topTopic={topTopic} />

      <OverviewSection summary={summary} peakYear={peakYear} />

      <TrendSection yearly={yearly} monthly={monthly} />

      <TopicSection
        topTopics={topTopics}
        topicYearPivot={topicYearPivot}
        topicYearNames={topicYearNames}
        topicInfo={topicInfo}
      />

      <ArticleSection
        filters={filters}
        topicNames={topicNames}
        articles={articles}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        keyword={keyword}
        setKeyword={setKeyword}
      />

      <MetadataSection summary={summary} />

      <Footer />
    </main>
  );
}