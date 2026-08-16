import { Github, Linkedin } from "lucide-react";
import profile from "../config/profile";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__name">{profile.name.toUpperCase()}</p>
          <p className="footer__tagline">Built with curiosity, code &amp; continuous learning.</p>
        </div>

        <div className="footer__links">
          <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="link" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="link" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
      <div className="container">
        <p className="footer__copy">© {year} {profile.name}</p>
      </div>
    </footer>
  );
}
