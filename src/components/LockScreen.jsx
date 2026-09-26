import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "../config/siteConfig.js";

// 🔒 شاشة قفل الموقع — تظهر بدل الموقع لما siteLocked = true
// ⏳ وفيها عداد تنازلي خطير: لما يخلص => رسالة "تم حذف الموقع"
// (النصوص بتتعدل من: src/config/siteConfig.js قسم lockScreen)

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function LockScreen() {
  const lk = siteConfig.lockScreen;
  const cd = lk.countdown;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!cd.enabled) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [cd.enabled]);

  // ⏳ الموعد النهائي بيتحفظ على الجهاز — مش بيترستع مع الريفريش
  const deadline = useMemo(() => {
    if (!cd.enabled) return 0;
    try {
      const stored = Number(localStorage.getItem(cd.storageKey));
      if (stored && stored > Date.now()) return stored;
      const fresh = Date.now() + cd.hours * 3600 * 1000;
      try {
        localStorage.setItem(cd.storageKey, String(fresh));
      } catch {
        /* ignore */
      }
      return fresh;
    } catch {
      return Date.now() + cd.hours * 3600 * 1000;
    }
  }, [cd.enabled, cd.hours, cd.storageKey]);

  const remaining = Math.max(0, deadline - now);
  const expired = cd.enabled && remaining <= 0;

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  // ##########################################################
  //  😵 مشهد انتهاء العداد — "تم حذف الموقع"
  // ##########################################################
  if (expired) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex items-center justify-center p-6 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-red-950/40 via-gray-950 to-gray-950"></div>

        <div className="relative z-10 max-w-md w-full text-center">
          {/* أيقونة الحذف */}
          <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 border border-red-500/50 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(239,68,68,0.25)] animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-red-400">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9.208a.75.75 0 101.499-.058l-.346-9.208zm5.48.058a.75.75 0 10-1.498-.058l-.347 9.2a.75.75 0 001.5.057l.345-9.2z" clipRule="evenodd" />
            </svg>
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/50 text-red-400 text-sm font-bold mb-5 tracking-wide">
            ❌ الخدمة منتهية
          </span>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-50 drop-shadow-sm">{cd.expired.title}</h1>

          <div className="bg-white/5 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
            <p className="text-gray-200 leading-relaxed">{cd.expired.message}</p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent mx-auto my-4"></div>
            <p className="text-red-300 font-bold leading-relaxed">📞 {cd.expired.support}</p>
          </div>
        </div>
      </div>
    );
  }

  // ##########################################################
  //  🔒 شاشة القفل مع العداد التنازلي الخطير
  // ##########################################################
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
      <div className="relative z-10 max-w-md w-full text-center">
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

        {/* ⏳ صندوق العداد الخطير */}
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-5 backdrop-blur-md shadow-[0_0_45px_rgba(239,68,68,0.18)] animate-pulse mb-6">
          <p className="text-red-300 font-bold text-sm md:text-base leading-relaxed mb-4">{cd.title}</p>

          <div className="flex justify-center gap-2 md:gap-3">
            {[
              { v: pad(days), l: cd.labels.days },
              { v: pad(hours), l: cd.labels.hours },
              { v: pad(minutes), l: cd.labels.minutes },
              { v: pad(seconds), l: cd.labels.seconds },
            ].map((box, i) => (
              <div key={i} className="bg-gray-900/80 border border-red-500/40 rounded-xl w-16 md:w-20 py-3">
                <div dir="ltr" className="text-3xl md:text-4xl font-black text-red-400 tabular-nums">{box.v}</div>
                <div className="text-[11px] md:text-xs text-gray-400 mt-1">{box.l}</div>
              </div>
            ))}
          </div>

          <p className="text-gray-300 text-[13px] md:text-sm mt-4 leading-relaxed">{cd.note}</p>
        </div>

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