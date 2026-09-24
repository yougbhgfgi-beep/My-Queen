import { useState } from "react";
import { Heart } from "./Icons.jsx";

// 🖼️ صورة ذكية: لو الملف لسه منضافش بيعرض مكان مكتوب فيه "ضع صورتك هنا"
// عشان تعرف إزاي تضيف صورتك، افتح: src/config/siteConfig.js
export default function MediaImage({ src, alt = "", className = "", onClick }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-pink-900/40 to-gray-900 text-pink-300/70 ${className}`}
      >
        <Heart className="w-10 h-10 opacity-50" />
        <span className="text-sm px-4 text-center">ضع صورتك هنا 💕</span>
        <span className="text-xs text-pink-300/40 px-4 text-center break-all" dir="ltr">
          {src}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onClick={onClick}
      onError={() => setFailed(true)}
    />
  );
}