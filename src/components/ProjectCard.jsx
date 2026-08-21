import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import "./ProjectCard.css";

gsap.registerPlugin(ScrollTrigger);

function PreviewArt({ kind }) {
  if (kind === "dashboard") {
    return (
      <div className="art art--dashboard">
        <div className="art__bar" style={{ width: "70%" }} />
        <div className="art__row">
          <div className="art__stat" />
          <div className="art__stat" />
          <div className="art__stat" />
        </div>
        <div className="art__chart">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "donation") {
    return (
      <div className="art art--donation">
        <div className="art__ring" />
        <div className="art__list">
          <div className="art__line" style={{ width: "80%" }} />
          <div className="art__line" style={{ width: "55%" }} />
          <div className="art__line" style={{ width: "65%" }} />
        </div>
      </div>
    );
  }
  if (kind === "ml") {
    return (
      <div className="art art--ml">
        <svg viewBox="0 0 300 180" className="art__scatter">
          <polyline
            points="10,150 60,120 110,130 160,70 210,90 260,30"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {[
            [10, 150],
            [60, 120],
            [110, 130],
            [160, 70],
            [210, 90],
            [260, 30],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="var(--accent-secondary)" />
          ))}
        </svg>
        <div className="art__grid-lines" />
      </div>
    );
  }
    if (kind === "orbit") {
    return (
      <div className="art art--orbit">
        <div className="art__orbit-ring art__orbit-ring--1" />
        <div className="art__orbit-ring art__orbit-ring--2" />
        <div className="art__orbit-ring art__orbit-ring--3" />
        <div className="art__orbit-sun" />
        <div className="art__orbit-planet art__orbit-planet--1" />
        <div className="art__orbit-planet art__orbit-planet--2" />
        <div className="art__orbit-planet art__orbit-planet--3" />
      </div>
    );
  }
  return (
    <div className="art art--terminal">
      <div className="art__terminal-head">
        <span />
        <span />
        <span />
      </div>
      <div className="art__terminal-body">
        <p>$ run BST.insert(42)</p>
        <p>$ Sorting.quicksort(arr)</p>
        <p>$ Backtracking.solve()</p>
        <p className="art__cursor-line">$ █</p>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index, onOpen }) {
  const panelRef = useRef(null);
  const imgRef = useRef(null);
  const align = index % 2 === 0 ? "left" : "right";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <article className={`panel panel--${align}`} ref={panelRef}>
      <span className="panel__number" aria-hidden="true">
        {project.number}
      </span>

      <div
        className="panel__thumb"
        data-cursor="project"
        onClick={() => onOpen(project)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onOpen(project);
        }}
      >
        <p className="panel__thumb-label">{project.category}</p>
        <div className="panel__thumb-inner" ref={imgRef}>
          <PreviewArt kind={project.preview} />
        </div>
      </div>

      <div className="panel__content">
        <h2 className="panel__title">{project.title}</h2>
        <div className="panel__tags">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <p className="panel__desc">{project.description}</p>
        <button className="panel__link" onClick={() => onOpen(project)} data-cursor="link">
          View Project <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
