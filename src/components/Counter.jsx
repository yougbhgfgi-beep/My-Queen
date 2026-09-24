import { siteConfig } from "../config/siteConfig.js";
import useTimeSince from "../hooks/useTimeSince.js";
import { Heart } from "./Icons.jsx";

// الوحدات الست للعداد
const UNITS = [
  { key: "years", label: "سنين" },
  { key: "months", label: "شهور" },
  { key: "days", label: "أيام" },
  { key: "hours", label: "ساعات" },
  { key: "minutes", label: "دقائق" },
  { key: "seconds", label: "ثواني" },
];

// 📦 صندوق أنيق لكل وحدة (زجاج + توهج + تدرج لوني)
function TimeBox({ label, value }) {
  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-pink-500/25 rounded-2xl px-3 py-6 text-center shadow-[0_0_30px_rgba(236,72,153,0.12)] hover:border-pink-400/60 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:-translate-y-1 transition-all duration-300">
      {/* توهج علوي ناعم */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-pink-500/25 blur-2xl rounded-full pointer-events-none"></div>

      {/* الرقم */}
      <div
        className="relative text-3xl md:text-4xl font-bold tabular-nums bg-gradient-to-b from-pink-200 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-sm"
        dir="ltr"
      >
        {value ?? 0}
      </div>

      {/* خط فاصل مزخرف */}
      <div className="mt-3 w-10 h-px bg-gradient-to-r from-transparent via-pink-400/70 to-transparent mx-auto"></div>

      {/* الوحدة */}
      <div className="mt-3 text-pink-200/80 text-sm font-medium">{label}</div>
    </div>
  );
}

// 📅 مجموعة العداد الكاملة لكل تاريخ
function DateCounter({ item }) {
  const time = useTimeSince(item.date);

  return (
    <div className="relative">
      {/* القلب الطائر + العنوان */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <Heart className="w-9 h-9 text-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.9)] animate-float" />
        <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-sm">
          {item.label}
        </h3>
      </div>

      {/* شبكة الصناديق */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto relative">
        {UNITS.map((u) => (
          <TimeBox key={u.key} label={u.label} value={time[u.key]} />
        ))}
      </div>
    </div>
  );
}

// ⏳ عدّاد الحب — التاريخ بيتعدل من: src/config/siteConfig.js (قسم dates)
export default function Counter() {
  return (
    <section id="counter" className="py-24 px-4 relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-sm">
        {siteConfig.counter.title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto mb-14"></div>
      <div className="space-y-16">
        {siteConfig.dates.map((d) => (
          <DateCounter key={d.key} item={d} />
        ))}
      </div>
    </section>
  );
}