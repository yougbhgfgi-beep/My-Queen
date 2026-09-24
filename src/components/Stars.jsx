import { useMemo } from "react";

// ✨ خلفية نجوم ثابتة (تظهر في الخلفية طول الوقت)
export default function Stars({ count = 50 }) {
  const stars = useMemo(
    () =>
      [...Array(count)].map(() => ({
        width: Math.random() * 2 + "px",
        height: Math.random() * 2 + "px",
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 5 + 3 + "s",
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            width: s.width,
            height: s.height,
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            animationDuration: s.duration,
          }}
        ></div>
      ))}
    </div>
  );
}