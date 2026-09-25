import { siteConfig } from "../config/siteConfig.js";

// 🔒 شاشة قفل الموقع — تظهر بدل الموقع لما siteLocked = true
// (النصوص بتتعدل من: src/config/siteConfig.js قسم lockScreen)
export default function LockScreen() {
  const lk = siteConfig.lockScreen;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* خلفية تحذيرية */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-amber-950/30 via-gray-950 to-gray-950"></div>
      <div className="fixed inset-0 pointer-events-none opacity-30">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-amber-400/20 rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          ></div>
        ))}
      </div>

      {/* البطاقة */}
      <div className="relative z-10 max-w-md w-full text-center animate-fade-in">
        {/* أيقونة القفل */}
        <div className="mx-auto w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-amber-400">
            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
          </svg>
        </div>

        {/* شارة التحذير */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/40 text-red-400 text-sm font-bold mb-5 tracking-wide">
          ⚠️ {lk.badge}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-50 drop-shadow-sm">{lk.title}</h1>
        <p className="text-gray-300 mb-8 leading-relaxed">{lk.subtitle}</p>

        {/* صندوق الرسالة */}
        <div className="bg-white/5 border border-amber-500/25 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
          <p className="text-amber-300 font-bold text-lg mb-2">🤝 {lk.thanks}</p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-200 leading-relaxed font-medium">{lk.activate}</p>
        </div>

        <p className="mt-8 text-gray-500 text-sm">{lk.footerNote}</p>
      </div>
    </div>
  );
}