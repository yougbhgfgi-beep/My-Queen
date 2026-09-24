import { useRef, useState } from "react";

import { siteConfig } from "./config/siteConfig.js";
import useParticleSystem from "./hooks/useParticleSystem.js";
import useParallax from "./hooks/useParallax.js";

import Stars from "./components/Stars.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import LoveMeter from "./components/LoveMeter.jsx";
import Counter from "./components/Counter.jsx";
import Timeline from "./components/Timeline.jsx";
import VideoSection from "./components/VideoSection.jsx";
import Reasons from "./components/Reasons.jsx";
import Footer from "./components/Footer.jsx";
import FinalScene from "./components/FinalScene.jsx";
import { SecretPopup, Lightbox, MessageModal } from "./components/Modals.jsx";
import { MusicNote } from "./components/Icons.jsx";

// 💖 المكوّن الرئيسي — كل التعديلات من: src/config/siteConfig.js
export default function App() {
  useParticleSystem(); // قلب عند الكليك + بريق خلف المؤشر
  useParallax(); // تأثير تحرك الصور مع التمرير

  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [showFinalScene, setShowFinalScene] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const audioRef = useRef(null);

  // 🔐 الدخول
  const handleLogin = () => {
    if (password.trim() === siteConfig.password) {
      setIsLogged(true);
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlaying(true)).catch((e) => console.log("Audio playback failed:", e));
        }
      }
      setTimeout(() => setShowMessage(true), 1200);
    } else {
      alert(siteConfig.wrongPasswordMessage);
    }
  };

  // 🎵 تشغيل/إيقاف الأغنية
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 📼 تناسق الصوت مع الفيديو: لما الفيديو يشتغل الأغنية تقف والعكس
  const handleVideoPlay = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    if (audioRef.current && isLogged) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-gray-100 overflow-x-hidden relative">
      {/* ✨ خلفية النجوم — دايماً ظاهرة */}
      <Stars count={50} />

      {/* 🎵 الأغنية — الملف من: src/config/siteConfig.js */}
      <audio ref={audioRef} loop>
        <source src={siteConfig.media.audio} />
      </audio>

      {/* 🎛️ زر التحكم في الأغنية */}
      <button
        onClick={toggleAudio}
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
        className={`fixed left-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isPlaying ? "bg-pink-500 text-white animate-spin" : "bg-white text-pink-500 hover:bg-gray-100"
        }`}
        aria-label="تشغيل الأغنية"
      >
        <MusicNote />
      </button>

      {!isLogged ? (
        <LoginScreen password={password} setPassword={setPassword} onLogin={handleLogin} />
      ) : (
        <div className="relative z-10">
          <Navbar />

          {/* نوافذ منبثقة */}
          {showSecret && <SecretPopup onClose={() => setShowSecret(false)} />}
          {selectedImage && <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />}
          {showMessage && <MessageModal onClose={() => setShowMessage(false)} />}
          {showFinalScene && <FinalScene onClose={() => setShowFinalScene(false)} />}

          {/* الأقسام */}
          <Hero
            onSurprise={() => {
              setShowSecret(true);
              setTimeout(() => setShowSecret(false), 2000);
            }}
          />
          <LoveMeter />
          <Counter />
          <Timeline onSelectImage={setSelectedImage} />
          <VideoSection onVideoPlay={handleVideoPlay} onVideoEnd={handleVideoEnd} />
          <Reasons />
          <Footer onOpenFinalScene={() => setShowFinalScene(true)} />
        </div>
      )}
    </div>
  );
}