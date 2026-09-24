import { useEffect, useState } from "react";
import { siteConfig } from "../config/siteConfig.js";
import Stars from "./Stars.jsx";

// 🌃 المشهد الأخير — كل النصوص بتتعدل من: src/config/siteConfig.js (قسم finalScene)
export default function FinalScene({ onClose }) {
  const fc = siteConfig.finalScene;
  const [phase, setPhase] = useState("title"); // title | sequence | finale | thanks
  const [line, setLine] = useState(0); // عدد الأسطر الظاهرة من التسلسل
  const [finaleStep, setFinaleStep] = useState(0); // 1=عنوان | 2=لا نهاية | 3=اقتباس | 4=رسالة

  useEffect(() => {
    const t = [];
    const seq = fc.sequence;

    t.push(setTimeout(() => setPhase("sequence"), 1500));
    seq.forEach((_, i) => t.push(setTimeout(() => setLine(i + 1), 4000 + i * 3000)));

    const seqStart = 4000;
    const seqEnd = seqStart + (seq.length - 1) * 3000 + 3000; // وقت نهاية التسلسل
    t.push(setTimeout(() => setPhase("finale"), seqEnd));
    t.push(setTimeout(() => setFinaleStep(1), seqEnd + 1000));
    t.push(setTimeout(() => setFinaleStep(2), seqEnd + 4000));
    t.push(setTimeout(() => setFinaleStep(3), seqEnd + 7000));
    t.push(setTimeout(() => setFinaleStep(4), seqEnd + 10000));
    t.push(setTimeout(() => setPhase("thanks"), seqEnd + 16000));

    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center text-center p-6 overflow-hidden">
      {/* زر الخروج */}
      <button
        onClick={onClose}
        style={{ top: "max(1.5rem, env(safe-area-inset-top))" }}
        className="fixed right-6 z-[110] bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all group"
        title={fc.closeTitle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* نجوم الخلفية */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Stars count={30} />
      </div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center min-h-[60vh]">
        {/* 🎬 العنوان */}
        {phase === "title" && (
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 animate-slide-up leading-tight">
            {fc.titleLines[0]}
            <br />
            {fc.titleLines[1]}
          </h1>
        )}

        {/* 📜 التسلسل — الأسطر بتظهر واحد ورا التاني */}
        {phase === "sequence" && (
          <div className="mt-12 space-y-8">
            {fc.sequence.slice(0, line).map((text, i) => (
              <p key={i} className="text-2xl text-gray-300 animate-fade-in">
                {text}
              </p>
            ))}
          </div>
        )}

        {/* 🏆 النهاية الكبرى */}
        {phase === "finale" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black animate-fade-in px-4">
            <h1 className="text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 animate-pulse-slow mb-8">
              {fc.finaleTitle}
            </h1>

            {finaleStep >= 2 && (
              <div className="flex items-center gap-4 text-3xl text-gray-400 animate-fade-in font-light tracking-wide">
                <span>{fc.finaleInfinity[0]}</span>
                <span className="text-5xl text-pink-500 animate-spin">{fc.finaleInfinity[1]}</span>
              </div>
            )}

            {finaleStep >= 3 && (
              <p className="mt-12 text-2xl font-script text-white/60 animate-slide-up">{fc.finaleQuote}</p>
            )}

            {finaleStep >= 4 && (
              <p className="mt-8 text-lg md:text-xl text-pink-200 font-light animate-slide-up max-w-2xl leading-relaxed px-4">
                {fc.finaleMessage}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 🙏 الشكر وزر الرجوع */}
      {phase === "thanks" && (
        <div className="fixed bottom-6 right-6 z-[110] animate-fade-in flex flex-col items-end gap-2">
          <p className="text-xs text-gray-500 mb-2 mr-2">{fc.thanksLine}</p>
          <button
            onClick={onClose}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2 group"
          >
            <span>{fc.backButton}</span>
            <span className="group-hover:-translate-x-1 transition-transform">🏠</span>
          </button>
        </div>
      )}
    </div>
  );
}