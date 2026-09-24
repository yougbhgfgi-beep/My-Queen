import { useEffect } from "react";

// 🖼️ تأثير البارالاكس للصور: الصورة تتحرك بنعومة مع التمرير
export default function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const images = document.querySelectorAll(".parallax-img");
      images.forEach((img) => {
        const speed = 0.5;
        const rect = img.parentElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          const offset = (window.innerHeight - rect.top) * speed * 0.1;
          img.style.transform = `translateY(${offset - 30}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}