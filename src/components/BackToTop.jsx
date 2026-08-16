import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./BackToTop.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-to-top ${visible ? "back-to-top--visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      data-cursor="link"
    >
      <ArrowUp size={18} />
    </button>
  );
}
