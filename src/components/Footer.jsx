import { siteConfig } from "../config/siteConfig.js";

// 🦶 الفوتر
export default function Footer({ onOpenFinalScene }) {
  return (
    <footer className="py-16 text-center bg-white/80 backdrop-blur-md border-t border-pink-100">
      <p className="text-2xl font-script text-gray-600 mb-8">{siteConfig.names.footerQuote}</p>
      <button
        onClick={onOpenFinalScene}
        className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-black transition-colors shadow-lg tracking-widest uppercase font-bold"
      >
        {siteConfig.buttons.finalScene}
      </button>
    </footer>
  );
}