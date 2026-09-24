import { siteConfig } from "../config/siteConfig.js";

// 🔐 شاشة الدخول (تعديل كلمة السر من: src/config/siteConfig.js)
export default function LoginScreen({ password, setPassword, onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans z-20">
      <div className="relative z-10 bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] text-center shadow-2xl max-w-sm w-full mx-4 border border-white/20">
        <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-md">{siteConfig.loginTitle}</h1>

        <div className="flex gap-3 justify-center mb-8" dir="ltr">
          <input
            type="text"
            placeholder={siteConfig.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
            className="w-64 p-4 rounded-2xl border border-white/30 bg-white/20 focus:border-pink-500 focus:bg-white/30 focus:outline-none text-center text-xl text-white shadow-inner transition-all placeholder-white/50"
          />
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-pink-500/30 hover:-translate-y-1 transition-all duration-300"
        >
          {siteConfig.loginButton}
        </button>
      </div>
    </div>
  );
}