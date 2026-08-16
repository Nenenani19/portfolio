import { useEffect, useRef, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import gsap from "gsap";
import profile from "../config/profile";
import "./Navbar.css";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ theme, toggleTheme, ready }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ready) return;
    gsap.fromTo(
      navRef.current,
      { y: -60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, [ready]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleLink = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} aria-label="Primary">
        <button className="navbar__brand" onClick={() => handleLink("home")} data-cursor="link">
          {profile.initials}
        </button>

        <ul className="navbar__links">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button onClick={() => handleLink(link.id)} data-cursor="link">
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-cursor="link"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <ul>
          {LINKS.map((link, i) => (
            <li key={link.id} style={{ transitionDelay: `${i * 0.04}s` }}>
              <button onClick={() => handleLink(link.id)}>{link.label}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
