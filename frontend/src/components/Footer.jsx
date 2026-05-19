import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-700 text-white">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900">
                Hoax Topic Intelligence
              </h3>
              <p className="text-xs text-slate-500">
                Kominfo/Komdigi Clarification Analytics
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
            Dashboard ini dibuat untuk mendukung analisis tren dan dinamika topik
            artikel klarifikasi hoaks menggunakan BERTopic.
          </p>
        </div>

        <div>
          <h4 className="font-extrabold text-slate-900">Teknologi</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-500">
            <li>BERTopic</li>
            <li>FastAPI</li>
            <li>React</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-slate-900">Navigasi</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-500">
            <li><a href="#overview" className="hover:text-blue-700">Ringkasan</a></li>
            <li><a href="#trends" className="hover:text-blue-700">Tren</a></li>
            <li><a href="#topics" className="hover:text-blue-700">Topik</a></li>
            <li><a href="#articles" className="hover:text-blue-700">Artikel</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-500">
        Proyek UTS Proyek Data Mining • BERTopic • FastAPI • React
      </div>
    </footer>
  );
}