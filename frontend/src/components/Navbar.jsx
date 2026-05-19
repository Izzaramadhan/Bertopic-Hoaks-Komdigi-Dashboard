import { useEffect, useState } from "react";
import { ShieldCheck, Menu, X } from "lucide-react";

const navItems = [
  { id: "home", label: "Beranda" },
  { id: "overview", label: "Ringkasan" },
  { id: "trends", label: "Tren" },
  { id: "topics", label: "Topik" },
  { id: "articles", label: "Artikel" },
  { id: "metadata", label: "Metadata" }
];

export default function Navbar({ source }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (const item of navItems) {
        const section = document.getElementById(item.id);

        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <button
          onClick={() => handleClick("home")}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-700 text-white shadow-lg shadow-blue-900/20">
            <ShieldCheck size={22} />
          </div>

          <div className="text-left">
            <h1 className="text-base font-extrabold tracking-tight text-slate-900">
              Hoax Topic Intelligence
            </h1>
            <p className="text-xs font-medium text-slate-500">
              BERTopic • FastAPI • React
            </p>
          </div>
        </button>

        <nav className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-1 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                    : "text-slate-600 hover:bg-white hover:text-blue-700"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 xl:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
          API Connected
          {source && (
            <span className="hidden max-w-[220px] truncate text-emerald-900 2xl:inline">
              • {source}
            </span>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            API Connected
          </div>
        </div>
      )}
    </header>
  );
}