import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * Renders `as` (default h2) and reveals it word-by-word with GSAP as it
 * scrolls into view. Uses the global .line/.word overflow-mask rules in
 * index.css, so lines never clip descenders and it degrades gracefully
 * on any screen size (each word only knows about its own box, so
 * wrapping differently on phones/tablets never breaks the animation).
 */
export default function SplitHeading({
  as: Tag = "h2",
  className = "",
  children,
  immediate = false,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const split = new SplitType(ref.current, { types: "lines, words" });

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(split.words, { autoAlpha: 1, yPercent: 0 });
        return;
      }

      gsap.from(split.words, {
        yPercent: 110,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.035,
        ease: "power3.out",
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: ref.current,
              start: "top 88%",
            },
      });
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [immediate]);

  return (
    <Tag className={className} ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
