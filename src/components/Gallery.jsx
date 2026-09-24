import { siteConfig } from "../config/siteConfig.js";
import MediaImage from "./MediaImage.jsx";

// 🖼️ معرض الصور — الصور بتتعدل من: src/config/siteConfig.js (قسم images.gallery)
export default function Gallery({ onSelectImage }) {
  const images = siteConfig.images.gallery;

  return (
    <section id="gallery" className="py-24 px-4 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-16 text-pink-500">{siteConfig.gallery.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((src, i) => (
          <div
            key={i}
            onClick={() => onSelectImage(src)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer bg-black/20 aspect-square hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300"
          >
            <MediaImage
              src={src}
              alt={`صورة ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
}