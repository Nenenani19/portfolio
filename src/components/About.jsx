import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import profile from "../config/profile";
import SplitHeading from "./SplitHeading";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: profile.cgpa, label: "Current CGPA" },
  { value: profile.duration, label: "B.Tech" },
  { value: "CSE", label: "Cybersecurity" },
  { value: "Java", label: "DSA Practice" },
];

export default function About() {
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.children, {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      });
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div>
          <p className="eyebrow">About</p>
          <SplitHeading as="h2" className="section-heading about__headline">
            Curious by default.
          </SplitHeading>
        </div>

        <div className="about__text">
          <p>
            I'm currently pursuing a B.Tech in Computer Science &amp; Engineering with a specialization
            in Cybersecurity at {profile.university}. I'm interested in software development,
            cybersecurity, web technologies, and problem solving.
          </p>
          <p>
            I enjoy turning ideas into practical applications and continuously improving my
            programming skills through hands-on projects and Data Structures &amp; Algorithms
            practice. Right now, I'm strengthening my foundations in Java, Python, web development,
            databases, Git/GitHub, and cybersecurity while building real projects and solving
            programming problems along the way.
          </p>
        </div>
      </div>

      <div className="container about__stats" ref={cardsRef}>
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-card__value">{s.value}</span>
            <span className="stat-card__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
