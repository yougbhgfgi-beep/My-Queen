import { useState, useEffect } from "react";

// ⏳ يحسب المدة المنقضية من تاريخ معين (سنين/شهور/أيام/ساعات/دقائق/ثواني)
export function calculateTimeDiff(startDate) {
  const diff = new Date() - startDate;

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return { years, months, days, hours, minutes, seconds };
}

// ⏳ هوك جاهز: استخدامه يرجّع المدة المحدّثة كل ثانية
export default function useTimeSince(dateString) {
  const [time, setTime] = useState(() => calculateTimeDiff(new Date(dateString)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeDiff(new Date(dateString)));
    }, 1000);
    return () => clearInterval(interval);
  }, [dateString]);

  return time;
}