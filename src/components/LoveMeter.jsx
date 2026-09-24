import { siteConfig } from "../config/siteConfig.js";
import { Heart } from "./Icons.jsx";

// 💗 مقياس الحب — اضغطي على البطاقة تشوفي النتيجة
export default function LoveMeter() {
  const { title, label, value, statusIdle, statusLoading, statusResult } = siteConfig.loveMeter;

  const handleClick = (e) => {
    const el = e.currentTarget;
    if (el.classList.contains("calculating")) return;
    el.classList.add("calculating");

    const progressBar = el.querySelector(".progress-bar");
    const heart = el.querySelector(".meter-heart");
    const text = el.querySelector(".status-text");

    text.innerText = statusLoading;
    progressBar.style.width = "0%";
    progressBar.style.transition = "width 3s ease-in-out";

    requestAnimationFrame(() => {
      progressBar.style.width = "100%";
    });

    heart.style.animationDuration = "0.5s";

    setTimeout(() => {
      text.innerText = statusResult;
      text.classList.add("text-3xl", "font-bold", "text-pink-500");
      heart.style.transform = "scale(1.5)";
      heart.style.animationDuration = "1s";

      // كونفيتي 🎉
      for (let k = 0; k < 20; k++) {
        const p = document.createElement("div");
        p.innerHTML = "🎉";
        p.style.position = "absolute";
        p.style.left = "50%";
        p.style.top = "50%";
        p.style.fontSize = "20px";
        p.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`;
        p.style.transition = "all 1s ease-out";
        p.style.opacity = "1";
        el.appendChild(p);
        setTimeout(() => (p.style.opacity = "0"), 500);
        setTimeout(() => p.remove(), 1000);
      }

      el.classList.remove("calculating");
    }, 3000);
  };

  return (
    <section className="py-20 px-4 text-center relative z-10">
      <h2 className="text-4xl font-bold mb-10 text-pink-500">{title}</h2>
      <div
        onClick={handleClick}
        className="relative max-w-2xl mx-auto bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/10 cursor-pointer group transition-all hover:bg-white/10"
      >
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-200 bg-pink-900/50">
                {label}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-pink-300">{value}</span>
            </div>
          </div>

          <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-gray-700 shadow-inner">
            <div
              style={{ width: "10%" }}
              className="progress-bar shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 animate-pulse-slow transition-all duration-300"
            ></div>
          </div>

          <div className="flex justify-center mt-4">
            <Heart className="meter-heart w-32 h-32 text-pink-600 animate-pulse drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-transform duration-200" />
          </div>

          <p className="status-text mt-4 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
            {statusIdle}
          </p>
        </div>
      </div>
    </section>
  );
}