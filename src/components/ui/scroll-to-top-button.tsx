import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed cursor-pointer bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-bl from-[#BA2685] to-[#54113C] text-white shadow-lg transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      aria-label="Return to top"
    >
      {/* Custom SVG Panah Ke Atas */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}
