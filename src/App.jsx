import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import useTheme from "./hooks/useTheme";
import usePrefersReducedMotion from "./hooks/usePrefersReducedMotion";
import profile from "./config/profile";

import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Ticker from "./components/Ticker";
import ProjectShowcase from "./components/ProjectShowcase";
import ProjectModal from "./components/ProjectModal";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import GithubCta from "./components/GithubCta";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  // Loader completion reveals the rest of the page
  const handleLoaderComplete = () => {
    setLoading(false);
    requestAnimationFrame(() => setReady(true));
  };

  useEffect(() => {
    if (reducedMotion) {
      setLoading(false);
      setReady(true);
    }
  }, [reducedMotion]);

  // Recalculate ScrollTrigger positions after layout-affecting transitions
  useEffect(() => {
    const refresh = () => {
      clearTimeout(window.__stRefreshTimeout);
      window.__stRefreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 300);
    };
    window.addEventListener("resize", refresh);
    return () => window.removeEventListener("resize", refresh);
  }, []);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => clearTimeout(t);
    }
  }, [ready]);

  // Smooths out touch/trackpad scrolling and keeps ScrollTrigger's
  // internal scroll position in sync with the browser's — this is what
  // removes the small stutter/jump feeling on phones and tablets.
  useEffect(() => {
    if (!ready || reducedMotion) return;
    const st = ScrollTrigger.normalizeScroll(true);
    return () => st && st.kill && st.kill();
  }, [ready, reducedMotion]);

  // Keyboard easter egg: "G" -> GitHub, "L" -> LinkedIn (ignored while typing or modal open)
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      if (activeProject) return;
      if (e.key.toLowerCase() === "g") window.open(profile.github, "_blank", "noopener");
      if (e.key.toLowerCase() === "l") window.open(profile.linkedin, "_blank", "noopener");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeProject]);

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} reducedMotion={reducedMotion} />}

      <ScrollProgress />
      <CustomCursor reducedMotion={reducedMotion} />
      <Navbar theme={theme} toggleTheme={toggleTheme} ready={ready} />

      <main>
        <Hero ready={ready} reducedMotion={reducedMotion} />
        <About />
        <Ticker />
        <ProjectShowcase onOpenProject={setActiveProject} />
        <Skills />
        <Education />
        <Certifications />
        <GithubCta />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
