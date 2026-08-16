import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Github, ExternalLink } from "lucide-react";
import "./ProjectModal.css";

export default function ProjectModal({ project, onClose, reducedMotion }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([overlayRef.current, panelRef.current], { autoAlpha: 1 });
      } else {
        gsap.set(panelRef.current, { clipPath: "inset(45% 45% 45% 45% round 24px)" });
        gsap
          .timeline()
          .to(overlayRef.current, { autoAlpha: 1, duration: 0.25 })
          .to(panelRef.current, {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            duration: 0.6,
            ease: "power4.out",
          });
      }
    });

    closeRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [project, onClose, reducedMotion]);

  const handleClose = () => {
    if (reducedMotion) {
      onClose();
      return;
    }
    gsap
      .timeline({ onComplete: onClose })
      .to(panelRef.current, {
        clipPath: "inset(45% 45% 45% 45% round 24px)",
        duration: 0.45,
        ease: "power3.inOut",
      })
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.2 }, "-=0.15");
  };

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div className="modal-panel" ref={panelRef}>
        <button
          className="modal-close"
          ref={closeRef}
          onClick={handleClose}
          aria-label="Close project details"
          data-cursor="link"
        >
          <X size={20} />
        </button>

        <div className="modal-panel__content">
          <span className="modal-number">{project.number}</span>
          <p className="eyebrow">{project.category}</p>
          <h2 id="project-modal-title" className="modal-title">
            {project.title}
          </h2>
          <p className="modal-desc">{project.description}</p>

          <div className="modal-section">
            <h3>Technologies</h3>
            <div className="modal-tags">
              {project.technologies.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Key Features</h3>
            <ul className="modal-features">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="modal-actions">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost" data-cursor="link">
                <Github size={16} /> View Source
              </a>
            ) : (
              <span className="btn btn-ghost btn--disabled" title="Repository link not yet published">
                <Github size={16} /> Source coming soon
              </span>
            )}
            {project.live ? (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary" data-cursor="link">
                <ExternalLink size={16} /> Live Demo
              </a>
            ) : (
              <span className="btn btn-primary btn--disabled" title="Live demo not yet published">
                <ExternalLink size={16} /> Demo coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
