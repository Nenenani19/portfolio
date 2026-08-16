import projects from "../data/projects";
import ProjectCard from "./ProjectCard";
import SplitHeading from "./SplitHeading";
import "./ProjectShowcase.css";

export default function ProjectShowcase({ onOpenProject }) {
  return (
    <section id="work" className="section showcase">
      <div className="container">
        <p className="eyebrow">Work Log // 01–04</p>
        <SplitHeading as="h2" className="section-heading">Selected Work</SplitHeading>
        <p className="section-sub">
          Projects I've built while learning, experimenting, and solving real problems.
        </p>
      </div>

      <div className="container showcase__list">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} onOpen={onOpenProject} />
        ))}
      </div>
    </section>
  );
}
