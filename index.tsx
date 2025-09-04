import React, { useEffect, useMemo, useState } from "react";

// Graduate Student SWE Portfolio - Single Component, TypeScript, Tailwind CSS
// Notes:
// - Interactive sections: About, Skills, Projects, Experience, Publications, Contact
// - Theme toggle with system detection and persistence
// - Project filtering by search, skills, featured toggle, and sorting
// - Contact form with validation and simulated async submission
// - Resume download via Blob (no extra dependencies)
// - Scrollspy navigation and Back-to-Top button

export default function PortfolioPage(): JSX.Element {
  // ----- Static Data -----
  type Project = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    year: number;
    links?: { repo?: string; demo?: string };
    featured?: boolean;
  };

  type Experience = {
    id: number;
    role: string;
    org: string;
    start: string; // e.g., "Aug 2023"
    end: string; // e.g., "Present" or "May 2024"
    description: string[];
    skills: string[];
  };

  type Publication = {
    id: number;
    title: string;
    venue: string;
    year: number;
    authors: string[];
    link?: string;
  };

  const name = "Alex Chen"; // Change to your name
  const headline = "Graduate Student • Software Engineer";
  const email = "alex.chen@university.edu";
  const location = "Seattle, WA";

  const allSkills = [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Django",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "AWS",
    "Docker",
    "CI/CD",
    "TensorFlow",
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Interactive Campus Scheduler",
      description:
        "A full-stack scheduler that helps students build conflict-free course plans with prerequisite validation.",
      tags: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
      year: 2025,
      featured: true,
      links: { repo: "#", demo: "#" },
    },
    {
      id: 2,
      title: "Research Paper Recommender",
      description:
        "Content-based ML recommender that suggests related CS papers using embeddings and cosine similarity.",
      tags: ["Python", "TensorFlow", "Docker"],
      year: 2024,
      links: { repo: "#" },
      featured: true,
    },
    {
      id: 3,
      title: "Portfolio Site",
      description:
        "Accessible, responsive personal site built with Next.js and Tailwind. Features dark mode and a11y-first design.",
      tags: ["Next.js", "React", "Tailwind CSS"],
      year: 2024,
      links: { repo: "#", demo: "#" },
    },
    {
      id: 4,
      title: "Real-time Collaboration Notes",
      description:
        "Multi-user notes app with optimistic updates and granular presence, powered by websockets.",
      tags: ["TypeScript", "React", "Node.js"],
      year: 2023,
      links: { repo: "#" },
    },
    {
      id: 5,
      title: "Course Feedback Dashboard",
      description:
        "Visualization dashboard for teaching feedback with faceted filters and exportable summaries.",
      tags: ["React", "Tailwind CSS"],
      year: 2023,
      links: { demo: "#" },
    },
    {
      id: 6,
      title: "API Gateway Service",
      description:
        "Lightweight gateway providing request shaping, rate limiting, and observability hooks for microservices.",
      tags: ["Node.js", "Docker", "CI/CD", "AWS"],
      year: 2022,
      links: { repo: "#" },
    },
  ];

  const experience: Experience[] = [
    {
      id: 1,
      role: "Software Engineering Intern",
      org: "TechNova",
      start: "May 2024",
      end: "Aug 2024",
      description: [
        "Built a feature-flagged onboarding flow increasing activation by 12%.",
        "Implemented type-safe API layer and reduced runtime errors by 30%.",
        "Added CI checks to improve build time reliability.",
      ],
      skills: ["TypeScript", "React", "CI/CD"],
    },
    {
      id: 2,
      role: "Graduate Teaching Assistant",
      org: "University of Somewhere",
      start: "Aug 2023",
      end: "Dec 2023",
      description: [
        "Led weekly labs on data structures and algorithms for 40+ students.",
        "Created auto-graded assignments and rubrics to streamline feedback.",
      ],
      skills: ["Python", "Algorithms"],
    },
    {
      id: 3,
      role: "Research Assistant",
      org: "CS Lab",
      start: "Jan 2023",
      end: "May 2023",
      description: [
        "Engineered an embedding pipeline for paper similarity search.",
        "Evaluated ranking metrics and improved NDCG by 9%.",
      ],
      skills: ["Python", "TensorFlow"],
    },
  ];

  const publications: Publication[] = [
    {
      id: 1,
      title: "Lightweight Embeddings for Academic Search",
      venue: "Student Research Workshop, ACL",
      year: 2024,
      authors: ["A. Chen", "B. Smith"],
      link: "#",
    },
    {
      id: 2,
      title: "Improving Feature Flag Rollouts",
      venue: "DevOpsConf",
      year: 2023,
      authors: ["A. Chen", "C. Lee"],
    },
  ];

  // ----- UI State -----
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [openToWork, setOpenToWork] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<"new" | "old" | "az">("new");
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});
  const [expandedExp, setExpandedExp] = useState<Record<number, boolean>>({});
  const [showTop, setShowTop] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Contact form
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<boolean | null>(null);

  // ----- Effects -----
  // Mount + Theme preference
  useEffect(() => {
    setMounted(true);
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolved: "light" | "dark" = stored === "light" || stored === "dark" ? (stored as any) : prefersDark ? "dark" : "light";
      setTheme(resolved);
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", resolved === "dark");
      }
    } catch {}
  }, []);

  // Scroll spy + back-to-top
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 200);
      const sections = ["about", "skills", "projects", "experience", "publications", "contact"];
      let current = "about";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Toast auto-hide
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  // ----- Handlers -----
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSearch("");
    setShowFeaturedOnly(false);
    setSortOrder("new");
  };

  const toggleProjectExpand = (id: number) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpExpand = (id: number) => {
    setExpandedExp((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllExp = (expand: boolean) => {
    const next: Record<number, boolean> = {};
    for (const e of experience) next[e.id] = expand;
    setExpandedExp(next);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setToast("Email copied");
    } catch {
      setToast("Copy failed");
    }
  };

  const downloadResume = () => {
    const resumeText = `Name: ${name}\nRole: ${headline}\nLocation: ${location}\nEmail: ${email}\n\nSkills: ${allSkills.join(", ")}\n\nExperience:\n${experience
      .map((e) => `- ${e.role} @ ${e.org} (${e.start} – ${e.end})`)
      .join("\n")}\n\nProjects:\n${projects
      .map((p) => `- ${p.title} (${p.year}) [${p.tags.join(", ")}]`)
      .join("\n")}\n`;
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Alex_Chen_Resume.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !validateEmail(form.email) || form.message.trim().length < 10) {
      setToast("Please complete all fields");
      return;
    }
    setIsSending(true);
    setSendSuccess(null);
    // Simulate async send
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setToast("Message sent");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  // ----- Derived Data -----
  const filteredProjects = useMemo(() => {
    let list = [...projects];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.join(" ").toLowerCase().includes(q)
      );
    }
    if (selectedSkills.length) {
      list = list.filter((p) => selectedSkills.every((s) => p.tags.includes(s)));
    }
    if (showFeaturedOnly) {
      list = list.filter((p) => !!p.featured);
    }
    if (sortOrder === "new") list.sort((a, b) => b.year - a.year);
    if (sortOrder === "old") list.sort((a, b) => a.year - b.year);
    if (sortOrder === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [projects, search, selectedSkills, showFeaturedOnly, sortOrder]);

  const yearsCoding = new Date().getFullYear() - 2019; // adjust your start year
  const messageChars = form.message.length;
  const messageLimit = 500;

  // Helper UI: chip style
  const chipClass = (active: boolean) =>
    `inline-flex items-center rounded-full border px-3 py-1 text-sm mr-2 mb-2 ${
      active
        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
        : "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200"
    }`;

  // Render
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 inset-x-0 mx-auto w-full max-w-sm px-4 z-50">
          <div className="rounded-lg bg-gray-900 text-white dark:bg-gray-800 px-4 py-3 shadow">
            <p className="text-sm">{toast}</p>
          </div>
        </div>
      )}

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="font-semibold text-lg">{name}</h1>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs border ${
                    openToWork
                      ? "border-green-600 text-green-700 bg-green-50 dark:bg-green-900 dark:text-green-100"
                      : "border-gray-400 text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {openToWork ? "Open to work" : "Heads down"}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{headline}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {[
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "experience", label: "Experience" },
              { id: "publications", label: "Publications" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`px-2 py-1 rounded text-sm ${
                  activeSection === link.id
                    ? "text-blue-700 bg-blue-50 dark:bg-blue-900 dark:text-blue-100"
                    : "text-gray-700 hover:text-blue-700 dark:text-gray-200"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mounted && theme === "dark" ? "Light" : "Dark"}
            </button>
            <button
              type="button"
              onClick={downloadResume}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Download Resume
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {/* About */}
        <section id="about" className="py-10">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-2">Hello! I'm {name}.</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I'm a graduate student specializing in modern web development, distributed systems, and applied ML.
                I enjoy building delightful, accessible products and collaborating across research and industry.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => (window.location.href = `mailto:${email}`)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700"
                >
                  Email Me
                </button>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Copy Email
                </button>
                <button
                  type="button"
                  onClick={() => setOpenToWork((v) => !v)}
                  className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {openToWork ? "Set Heads Down" : "Set Open to Work"}
                </button>
              </div>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                  <div className="text-2xl font-semibold">{yearsCoding}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Years coding</div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                  <div className="text-2xl font-semibold">{projects.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Projects</div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                  <div className="text-2xl font-semibold">2</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Publications</div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                  <div className="text-2xl font-semibold">{experience.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Roles</div>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <h3 className="font-semibold mb-3">Education</h3>
                <p className="text-sm">M.S. Computer Science</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">University of Somewhere</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">2023 – 2025</p>
                <div className="mt-3 text-sm">
                  <span className="font-medium">Focus:</span> Systems, HCI, ML
                </div>
                <div className="mt-3 text-sm">
                  <span className="font-medium">Location:</span> {location}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Clear filters
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Toggle a few skills to filter projects across the site. Click tags on project cards to add/remove filters.
          </p>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex flex-wrap">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={chipClass(selectedSkills.includes(skill))}
                >
                  <span>{skill}</span>
                  {selectedSkills.includes(skill) && (
                    <span className="ml-2 text-xs">×</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          {selectedSkills.length > 0 && (
            <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              Active filters: {selectedSkills.join(", ")}
            </div>
          )}
        </section>

        {/* Projects */}
        <section id="projects" className="py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <span>Featured only</span>
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="text-sm rounded-md border border-gray-300 dark:border-gray-700 px-2 py-1 bg-white dark:bg-gray-900"
              >
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
                <option value="az">A–Z</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by title, tag, or description"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900"
              aria-label="Search projects"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredProjects.map((p) => (
              <div key={p.id} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{p.title}</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{p.year}</div>
                      </div>
                      {p.featured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Featured</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{p.description}</p>
                    <div className="mt-3">
                      {p.tags.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleSkill(t)}
                          className={chipClass(selectedSkills.includes(t))}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center space-x-3">
                      {p.links?.repo && (
                        <a
                          className="text-sm text-blue-700 hover:underline"
                          href={p.links.repo}
                          onClick={(e) => e.preventDefault()}
                          title="Repository (placeholder)"
                        >
                          Repo
                        </a>
                      )}
                      {p.links?.demo && (
                        <a
                          className="text-sm text-blue-700 hover:underline"
                          href={p.links.demo}
                          onClick={(e) => e.preventDefault()}
                          title="Demo (placeholder)"
                        >
                          Live Demo
                        </a>
                      )}
                      <button
                        type="button"
                        className="ml-auto text-sm rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => toggleProjectExpand(p.id)}
                        aria-expanded={!!expandedProjects[p.id]}
                        aria-controls={`proj-${p.id}`}
                      >
                        {expandedProjects[p.id] ? "Hide details" : "Show details"}
                      </button>
                    </div>
                    {expandedProjects[p.id] && (
                      <div id={`proj-${p.id}`} className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                          Impact: Reduced workflow time by ~20% and improved reliability through robust testing and type-safety.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
              No projects match your filters.
            </div>
          )}
        </section>

        {/* Experience */}
        <section id="experience" className="py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => expandAllExp(true)}
                className="text-sm rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={() => expandAllExp(false)}
                className="text-sm rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Collapse all
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {experience.map((e) => (
              <div key={e.id} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{e.role}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {e.org} • {e.start} – {e.end}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleExpExpand(e.id)}
                    aria-expanded={!!expandedExp[e.id]}
                    className="text-sm rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {expandedExp[e.id] ? "Hide" : "Details"}
                  </button>
                </div>
                <div className="mt-3">
                  {e.skills.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      className={chipClass(selectedSkills.includes(s))}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {expandedExp[e.id] && (
                  <ul className="mt-3 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    {e.description.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="py-10">
          <h2 className="text-2xl font-semibold mb-4">Publications</h2>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
            {publications.map((p) => (
              <div key={p.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {p.authors.join(", ")} • {p.venue} • {p.year}
                    </div>
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-blue-700 hover:underline"
                    >
                      Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-10">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <form onSubmit={submitForm} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm mb-1">Message</label>
                  <textarea
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900"
                    rows={5}
                    maxLength={messageLimit}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                  />
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                    {messageChars}/{messageLimit}
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-3">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700 disabled:opacity-60"
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                  {sendSuccess && (
                    <span className="text-sm text-green-600 dark:text-green-400">Thanks! I'll get back to you soon.</span>
                  )}
                </div>
              </form>
            </div>
            <div className="md:col-span-1">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <h3 className="font-semibold mb-2">Elsewhere</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-700 hover:underline">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-700 hover:underline">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-700 hover:underline">
                      Google Scholar
                    </a>
                  </li>
                </ul>
                <div className="mt-4 text-sm">
                  <div className="font-medium">Email</div>
                  <button
                    type="button"
                    className="text-blue-700 hover:underline"
                    onClick={copyEmail}
                  >
                    {email}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to top */}
        {showTop && (
          <div className="fixed bottom-6 right-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full bg-blue-600 text-white px-3 py-2 text-sm shadow hover:bg-blue-700"
              aria-label="Back to top"
            >
              Top
            </button>
          </div>
        )}
      </main>

      <footer className="mt-10 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} {name}. Built with React and Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}
