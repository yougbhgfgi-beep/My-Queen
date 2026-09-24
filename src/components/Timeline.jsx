import { siteConfig } from "../config/siteConfig.js";
import MediaImage from "./MediaImage.jsx";

// 📅 خط الذكريات — الذكريات بتتعدل من: src/config/siteConfig.js
export default function Timeline({ onSelectImage }) {
  const { title, items } = siteConfig.timeline;

  return (
    <section id="timeline" className="py-32 px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center mb-20 text-white drop-shadow-md">{title}</h2>
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-600 to-purple-600 transform -translate-x-1/2 rounded-full"></div>

        {items.map((item, i) => (
          <div key={i} className={`flex items-center justify-between mb-16 w-full ${i % 2 === 0 ? "flex-row-reverse" : ""}`}>
            <div className="w-5/12"></div>

            {/* النقطة في المنتصف */}
            <div className="z-10 bg-gray-900 border-4 border-pink-500 w-8 h-8 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] relative">
              <div className="absolute top-1/2 left-1/2 w-full h-1 bg-pink-500/50 transform -translate-y-1/2 -translate-x-1/2 z-[-1] animate-pulse"></div>
            </div>

            <div className={`w-5/12 ${i % 2 !== 0 ? "text-right" : "text-left"}`}>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/5 hover:bg-white/20 transition-all duration-300 group transform hover:scale-105">
                <div
                  className="relative overflow-hidden rounded-xl mb-4 h-auto min-h-[400px] border border-pink-500/30 cursor-pointer group-hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-shadow duration-300 bg-black/20"
                  onClick={() => onSelectImage(item.image)}
                >
                  <MediaImage
                    src={item.image}
                    alt={item.title}
                    className="parallax-img w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-black/50 p-2 rounded-full border border-white/50 backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-pink-100 group-hover:text-pink-400 transition-colors mb-2">{item.title}</h3>
                {item.date && <p className="text-pink-300 text-sm font-mono mb-3">{item.date}</p>}
                {item.description && <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}