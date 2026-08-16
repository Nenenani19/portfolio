import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitHeading from "./SplitHeading";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    title: "Programming",
    items: ["Java", "Python", "C++", "JavaScript"],
  },
  {
    title: "Web",
    items: ["HTML", "CSS", "JavaScript", "Flask", "REST APIs"],
  },
  {
    title: "Databases",
    items: ["MySQL", "MongoDB", "Flask-SQLAlchemy"],
  },
  {
    title: "Cybersecurity",
    items: [
      "Cybersecurity Fundamentals",
      "Network Security Fundamentals",
      "Authentication",
      "Authorization",
      "Cloud Security Fundamentals",
      "Secure Application Development",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "XAMPP", "MySQL Workbench"],
  },
  {
    title: "DSA",
    items: [
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Recursion",
      "Trees",
      "BST",
      "Searching",
      "Sorting",
      "Backtracking",
    ],
  },
];

export default function Skills() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".skill-block").forEach((block) => {
        gsap.from(block.querySelectorAll(".tag"), {
          y: 14,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 88%",
          },
        });
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <p className="eyebrow">Skills</p>
        <SplitHeading as="h2" className="section-heading">What I build with.</SplitHeading>
        <p className="section-sub">
          Levels reflect where I actually am — learning, practicing, or comfortable — not
          invented percentages.
        </p>

        <div className="skills__grid" ref={gridRef}>
          {CATEGORIES.map((cat) => (
            <div className="skill-block" key={cat.title}>
              <h3 className="skill-block__title">{cat.title}</h3>
              <div className="skill-block__tags">
                {cat.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
