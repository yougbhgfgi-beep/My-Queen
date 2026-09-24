import { siteConfig } from "../config/siteConfig.js";
import MediaImage from "./MediaImage.jsx";

// 📅 خط الذكريات — الذكريات بتتعدل من: src/config/siteConfig.js
// التصميم: كارت واحد متمركز في النص — الصورة كاملة وواضحة
export default function Timeline({ onSelectImage }) {
  const { title, items } = siteConfig.timeline;

  return (
    <section id="timeline" className="py-24 px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center mb-16 text-white drop-shadow-md">{title}</h2>

      <div className="max-w-2xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/10 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* الصورة */}
            <div
              className="relative overflow-hidden rounded-2xl mb-5 border border-pink-500/30 cursor-pointer group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-shadow duration-300 bg-black/20"
              onClick={() => onSelectImage(item.image)}
            >
              <MediaImage
                src={item.image}
                alt={item.title}
                className="parallax-img w-full object-contain transition-transform duration-500 group-hover:scale-105 will-change-transform"
              />

              {/* أيقونة التكبير عند التمرير */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/50 p-2 rounded-full border border-white/50 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* العنوان */}
            <h3 className="text-2xl md:text-3xl font-bold text-pink-100 group-hover:text-pink-400 transition-colors text-center">
              {item.title}
            </h3>
            {item.date && <p className="text-pink-300 text-sm font-mono text-center mt-2">{item.date}</p>}
            {item.description && (
              <p className="text-gray-300 text-sm leading-relaxed text-center mt-3">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}