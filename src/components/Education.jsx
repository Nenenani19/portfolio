import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import profile from "../config/profile";
import SplitHeading from "./SplitHeading";
import "./Education.css";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="section education" ref={sectionRef}>
      <div className="container">
        <p className="eyebrow">Education</p>
        <SplitHeading as="h2" className="section-heading">The path so far.</SplitHeading>

        <div className="timeline">
          <div className="timeline__track">
            <div className="timeline__progress" ref={lineRef} />
          </div>

          <div className="timeline__item">
            <span className="timeline__year">2024</span>
            <h3>B.Tech, Computer Science &amp; Engineering — Cybersecurity</h3>
            <p>{profile.university}</p>
            <span className="tag">CGPA {profile.cgpa}</span>
          </div>

          <div className="timeline__item">
            <span className="timeline__year">2028</span>
            <h3>Expected Graduation</h3>
            <p>Continuing to build, practice DSA, and go deeper into cybersecurity.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
