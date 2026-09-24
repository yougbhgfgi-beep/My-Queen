import { siteConfig } from "../config/siteConfig.js";
import { Heart } from "./Icons.jsx";

// 💘 ليه بحبك؟ — الأسباب بتتعدل من: src/config/siteConfig.js
export default function Reasons() {
  const { title, items } = siteConfig.reasons;

  return (
    <section id="reasons" className="py-24 px-4 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-16 text-pink-500">{title}</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((card, i) => (
          <div
            key={i}
            className="bg-white/5 p-8 rounded-3xl shadow-xl border border-white/5 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-pink-900/50 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors border border-pink-500/30">
              <Heart className="w-6 h-6 text-pink-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-pink-100 mb-3">{card.title}</h3>
            <p className="text-gray-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}