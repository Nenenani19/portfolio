// Each project drives one full-screen panel in <ProjectShowcase /> and the
// full-screen detail overlay in <ProjectModal />. Add new projects here —
// no JSX needs to be touched.
//
// `preview` selects which generated abstract background the ProjectCard
// renders (see ProjectCard.jsx) since we never use stock/copyrighted images.

const projects = [
  {
    id: "campusconnect",
    number: "01",
    title: "CampusConnect",
    category: "Full-Stack Web Application",
    description:
      "A web-based student platform designed to provide a centralized environment where students can connect, communicate, and access useful student-oriented functionality.",
    technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Flask-SQLAlchemy", "MySQL"],
    features: [
      "User authentication",
      "Student-focused platform",
      "Flask backend",
      "Database integration",
      "API communication",
      "Responsive frontend",
    ],
    preview: "dashboard",
    github: "currently working on it...",
    live: "coming soon..",
  },
  {
    id: "wedonate",
    number: "02",
    title: "WeDonate",
    category: "Web Application",
    description:
      "A donation-focused web application designed to simplify the interaction between people who want to contribute and donation-related initiatives.",
    technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Flask-SQLAlchemy", "MySQL"],
    features: [
      "Flask backend",
      "Database integration",
      "CRUD functionality",
      "User interface",
      "Data management",
    ],
    preview: "donation",
    github: "currently working on it...",
    live: "coming soon...",
  },
  {
    id: "ai-crop-recommendation",
    number: "03",
    title: "AI Crop Recommendation",
    category: "Machine Learning",
    description:
      "An agriculture-focused machine learning project designed to recommend suitable crops based on relevant environmental and agricultural parameters.",
    technologies: ["Python", "Machine Learning"],
    features: ["Machine learning", "Agricultural data", "Prediction", "Real-world problem solving"],
    preview: "ml",
    github: "currently working on it...",
    live: "coming soon..",
  },
  {
    id: "java-dsa-practice",
    number: "04",
    title: "Java DSA Practice",
    category: "Data Structures & Algorithms",
    description:
      "A continuously developing repository containing Java implementations and programming problems covering fundamental and intermediate Data Structures & Algorithms concepts.",
    technologies: ["Java", "Git", "GitHub"],
    features: [
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stack",
      "Queue",
      "Recursion",
      "Trees",
      "BST",
      "Searching",
      "Sorting",
      "Backtracking",
    ],
    preview: "terminal",
    github: "https://nenenani19.github.io/java-dsa-practice/",
    live: "https://nenenani19.github.io/java-dsa-practice/",
  },
    {
    id: "sauryamandalam",
    number: "05",
    title: "Sauryamandalam",
    category: "Interactive 3D / WebGL",
    description:
      "A scroll-driven 3D portfolio experience built as a journey through the solar system — the camera flies from Earth past every planet as you scroll, with real 2K textures, cinematic GSAP-driven camera moves, and a live WebGL star field rendered entirely in the browser.",
    technologies: ["Three.js", "WebGL", "GSAP", "GSAP ScrollTrigger", "JavaScript", "HTML", "CSS"],
    features: [
      "Scroll-driven cinematic camera flight",
      "Real 2K planet textures with graceful fallback",
      "Custom animated cursor",
      "Cinematic loading sequence",
      "Skills and project showcase built into the journey",
      "EmailJS-powered contact form",
    ],
    preview: "orbit",
    github: "https://github.com/Nenenani19/sauryamandalam",
    live: "https://sauryamandalam.netlify.app/",
  },
];

export default projects;
