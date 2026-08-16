import { Github, ArrowUpRight } from "lucide-react";
import profile from "../config/profile";
import "./GithubCta.css";

export default function GithubCta() {
  return (
    <section className="github-cta">
      <div className="container github-cta__inner">
        <div>
          <p className="eyebrow">More code, less talk.</p>
          <h2 className="github-cta__heading">See the commits, not just the claims.</h2>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary github-cta__btn"
          data-cursor="link"
        >
          <Github size={16} /> View GitHub <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
