import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ArrowDown, Download } from "lucide-react";
import profile from "../config/profile";
import "./Hero.css";

const ROTATING_WORDS = ["SOFTWARE", "CYBERSECURITY", "FULL-STACK", "JAVA", "PYTHON", "DSA"];

export default function Hero({ ready, reducedMotion }) {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const rotatorRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!ready) return;

    const split = new SplitType(titleRef.current, { types: "lines, words" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (reducedMotion) {
        tl.set([split.words, subRef.current, ctaRef.current], { autoAlpha: 1 });
      } else {
        tl.from(split.words, {
          yPercent: 120,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.08,
        })
          .from(subRef.current, { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.5")
          .from(ctaRef.current.children, { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, "-=0.4");
      }
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [ready, reducedMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!rotatorRef.current) return;
    gsap.fromTo(
      rotatorRef.current,
      { yPercent: reducedMotion ? 0 : 100, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: reducedMotion ? 0.2 : 0.5, ease: "power3.out" }
    );
  }, [wordIndex, reducedMotion]);

  return (
    <section id="home" className="hero">
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <p className="eyebrow">Software Developer / Cybersecurity</p>

        <h1 className="hero__title" ref={titleRef}>
          {profile.name.toUpperCase()}
        </h1>

        <div className="hero__role">
          <span>{profile.role}</span>
          <span className="hero__rotator-wrap">
            <span className="hero__rotator" ref={rotatorRef}>
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </div>

        <p className="hero__sub" ref={subRef}>
          {profile.tagline}
        </p>

        <div className="hero__cta" ref={ctaRef}>
          <button
            className="btn btn-primary"
            data-cursor="link"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects
          </button>
          <button
            className="btn btn-ghost"
            data-cursor="link"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </button>
          <a
            className="hero__resume"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
          >
            <Download size={14} /> Download Resume
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll to explore</span>
        <ArrowDown size={16} className="hero__scroll-icon" />
      </div>
    </section>
  );
}
