import { siteConfig } from "../config/siteConfig.js";
import { Heart } from "./Icons.jsx";

// 🏰 قسم الترحيب (الهيرو)
export default function Hero({ onSurprise }) {
  const { heroEn, heroAr, subtitle } = siteConfig.names;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-200/50 to-transparent -z-10"></div>

      <Heart className="w-20 sm:w-24 h-20 sm:h-24 text-pink-500 mb-6 animate-float" />
      <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 drop-shadow-sm font-script pb-4 px-2 leading-tight">
        {heroEn}
      </h1>
      <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 font-sans">{heroAr}</h2>
      <p className="text-2xl md:text-3xl text-gray-600 mb-10 font-light">{subtitle}</p>

      <button
        onClick={onSurprise}
        className="group relative overflow-hidden bg-white text-pink-600 px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg border border-pink-100"
      >
        <span className="relative z-10 transition-colors group-hover:text-white">
          {siteConfig.buttons.surprise}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
      </button>

      <div className="absolute bottom-10 animate-bounce text-pink-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}