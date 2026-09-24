import { useState } from "react";
import { siteConfig } from "../config/siteConfig.js";

// 📼 قسم الفيديو — الفيديو بيتقرأ من: src/config/siteConfig.js (قسم media)
export default function VideoSection({ onVideoPlay, onVideoEnd }) {
  const { video, videoCaption, videoSectionTitle } = siteConfig.media;
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section id="video" className="py-24 px-4 text-center relative z-10">
      <h2 className="text-4xl font-bold mb-10 text-pink-500">{videoSectionTitle}</h2>
      <div className="max-w-4xl mx-auto bg-black/40 p-4 rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-sm transform hover:scale-[1.01] transition-transform duration-500 relative group">
        {videoFailed ? (
          <div className="w-full aspect-video rounded-xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center gap-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-pink-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 7l-7 5 7 5V7z"></path>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span className="text-lg">ضع الفيديو هنا 🎬</span>
            <span className="text-xs text-gray-500" dir="ltr">{video}</span>
          </div>
        ) : (
          <video
            id="mainVideo"
            className="w-full rounded-xl shadow-lg"
            playsInline
            onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause())}
            onPlay={onVideoPlay}
            onPause={onVideoEnd}
            onEnded={onVideoEnd}
            onError={() => setVideoFailed(true)}
          >
            <source src={video} type="video/mp4" />
            المتصفح الخاص بك لا يدعم الفيديو.
          </video>
        )}

        {/* زر التشغيل الظاهر عند التمرير */}
        {!videoFailed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        <p className="mt-6 text-gray-400 italic">{videoCaption}</p>
      </div>
    </section>
  );
}