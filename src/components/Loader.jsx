import { useEffect, useRef } from "react";
import gsap from "gsap";
import profile from "../config/profile";
import "./Loader.css";

export default function Loader({ onComplete, reducedMotion }) {
  const rootRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(rootRef.current, { autoAlpha: 0 });
        onComplete();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      tl.from(nameRef.current, {
        yPercent: 40,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(nameRef.current, { autoAlpha: 1, duration: 0.4 }, "<")
        .to({}, { duration: 0.4 }) // hold
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power4.inOut",
        });
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="loader" ref={rootRef} role="status" aria-live="polite">
      <div className="loader__inner">
        <span className="loader__name" ref={nameRef}>
          {profile.shortName.toUpperCase()}
        </span>
        <span className="loader__status">
          LOADING<span className="loader__dots" aria-hidden="true">...</span>
        </span>
      </div>
    </div>
  );
}
