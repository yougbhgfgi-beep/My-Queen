import { siteConfig } from "../config/siteConfig.js";
import { Heart } from "./Icons.jsx";
import MediaImage from "./MediaImage.jsx";

// 🎁 نافذة المفاجأة: "بحبك ❤"
export function SecretPopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="bg-white px-16 py-12 rounded-[2rem] text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600 shadow-2xl transform scale-105 transition-transform text-center mx-4">
        {siteConfig.loveMessage.secretWord}
      </div>
    </div>
  );
}

// 🔍 عرض الصورة بالحجم الكامل (Lightbox)
export function Lightbox({ src, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center animate-fade-in p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
        aria-label="إغلاق"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <MediaImage
        src={src}
        alt="Full View"
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border-2 border-white/20"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// 💌 رسالة من القلب (بتظهر أول ما تدخل)
export function MessageModal({ onClose }) {
  const { title, paragraphs, closingEmoji, closeButton } = siteConfig.loveMessage;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 animate-fade-in backdrop-blur-md p-4">
      <div className="bg-white/90 rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col relative border border-pink-200">
        <div className="overflow-y-auto p-8 md:p-12">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-pink-500 mx-auto animate-float mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 font-sans">{title}</h2>
          </div>

          <div
            className="text-lg md:text-xl leading-loose text-gray-700 font-medium space-y-6 text-right"
            style={{ direction: "rtl" }}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="text-center text-4xl mt-8">{closingEmoji}</p>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold"
            >
              {closeButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}