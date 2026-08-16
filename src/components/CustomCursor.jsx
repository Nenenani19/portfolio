import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./CustomCursor.css";

export default function CustomCursor({ reducedMotion }) {
  const dotRef = useRef(null);
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState("default"); // default | project | link
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || reducedMotion) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { ...pos };
    const xSet = gsap.quickSetter(dotRef.current, "x", "px");
    const ySet = gsap.quickSetter(dotRef.current, "y", "px");

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    gsap.ticker.add(tick);
    function tick() {
      pos.x += (mouse.x - pos.x) * 0.35;
      pos.y += (mouse.y - pos.y) * 0.35;
      xSet(pos.x);
      ySet(pos.y);
    }

    const handleOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) {
        setVariant("default");
        setLabel("");
        return;
      }
      const kind = target.getAttribute("data-cursor");
      setVariant(kind);
      setLabel(
        kind === "project" ? "VIEW" : kind === "explore" ? "EXPLORE" : kind === "link" ? "OPEN" : ""
      );
    };
    const handleOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest?.("[data-cursor]")) {
        setVariant("default");
        setLabel("");
      }
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      gsap.ticker.remove(tick);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className={`cursor cursor--${variant}`}
      aria-hidden="true"
    >
      <span className="cursor__label">{label}</span>
    </div>
  );
}
