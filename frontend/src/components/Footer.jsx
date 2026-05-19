import {
  BarChart3,
  Code2,
  Database,
  Layers3,
  Mail,
  Server,
} from "lucide-react";
import Logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md shadow-blue-900/10 ring-1 ring-slate-200">
                <img
                  src={Logo}
                  alt="Hoax Topic Intelligence Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>

              <div>
                <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Hoax Topic Intelligence
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  Kominfo/Komdigi Clarification Analytics
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              Dashboard ini dibuat untuk mendukung analisis tren dan dinamika
              topik artikel klarifikasi hoaks menggunakan metode BERTopic,
              FastAPI, React, dan Tailwind CSS.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700">
                Topic Modeling
              </span>

              <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold text-teal-700">
                Hoax Analytics
              </span>

              <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-extrabold text-violet-700">
                Data Mining
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-slate-900">
              Teknologi
            </h4>

            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <Layers3 size={16} className="text-blue-700" />
                BERTopic
              </li>

              <li className="flex items-center gap-2">
                <Server size={16} className="text-blue-700" />
                FastAPI
              </li>

              <li className="flex items-center gap-2">
                <BarChart3 size={16} className="text-blue-700" />
                React + Recharts
              </li>

              <li className="flex items-center gap-2">
                <Database size={16} className="text-blue-700" />
                CSV Dataset
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-slate-900">
              Navigasi
            </h4>

            <ul className="space-y-3 text-sm font-semibold text-slate-500">
              <li>
                <a href="#overview" className="transition hover:text-blue-700">
                  Ringkasan Dataset
                </a>
              </li>

              <li>
                <a href="#trends" className="transition hover:text-blue-700">
                  Tren Publikasi
                </a>
              </li>

              <li>
                <a href="#topics" className="transition hover:text-blue-700">
                  Analisis Topik
                </a>
              </li>

              <li>
                <a href="#articles" className="transition hover:text-blue-700">
                  Eksplorasi Artikel
                </a>
              </li>

              <li>
                <a href="#metadata" className="transition hover:text-blue-700">
                  Metadata Sistem
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-slate-900">
              Project
            </h4>

            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-start gap-2">
                <Code2 size={16} className="mt-0.5 text-blue-700" />
                <span>BERTopic Hoaks Komdigi Dashboard</span>
              </li>

              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 text-blue-700" />
                <span>Proyek UTS Proyek Data Mining</span>
              </li>
            </ul>

            <div className="mt-5 rounded-3xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
                Status
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                Dashboard aktif dan terhubung dengan FastAPI.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © 2026 Izzuddin Akmal Daffani Ramadhan. All rights reserved.
          </p>

          <p className="font-semibold">
            BERTopic • FastAPI • React • Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}