import { siteConfig } from "../config/siteConfig.js";

// 🧭 شريط التنقل العلوي
export default function Navbar() {
  const links = [
    { href: "#timeline", label: "ذكرياتنا" },
    { href: "#video", label: "الفيديو" },
    { href: "#reasons", label: "ليه بحبك" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4 flex justify-between items-center gap-3">
      <div className="text-xl sm:text-2xl font-bold font-script text-pink-500 whitespace-nowrap">
        {siteConfig.names.navbarTag}
      </div>
      <div className="flex gap-3 sm:gap-6 text-xs sm:text-base whitespace-nowrap">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-pink-400 transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}