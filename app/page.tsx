"use client";
import { resumeData } from "../data/resumeData";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { Github, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-6 pb-4">
        {/* subtle gradient background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(147,51,234,0.12),transparent_40%)]" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {resumeData.name}
          </span>
        </h1>
        <p className="text-base sm:text-lg opacity-90 max-w-2xl mb-6">
          {resumeData.title}
        </p>

        {/* Hero CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            View Projects
          </a>
          <a
            href={resumeData.contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg border border-gray-500/40 hover:border-gray-400/70 transition"
          >
            👀 View Resume
          </a>
          <a
            href={resumeData.contact.resume}
            download="Clifford_Reeve_Menezes_Resume.pdf"
            className="px-5 py-3 rounded-lg border border-gray-500/40 hover:border-gray-400/70 transition"
          >
            📄 Download Resume
          </a>
        </div>
      </section>

      {/* Social links row (between Hero and About) */}
      <div className="flex gap-10 justify-center mt-12 mb-12">
        <a
          href={resumeData.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="GitHub"
        >
          <Github size={32} />
        </a>
        <a
          href={resumeData.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="LinkedIn"
        >
          <Linkedin size={32} />
        </a>
      </div>

      {/* About with reduced top padding */}
      <Section id="about" title="About" className="pt-2">
        <p dangerouslySetInnerHTML={{ __html: resumeData.about }} />
      </Section>

      <Section id="skills" title="Skills">
        {Object.entries(resumeData.skills).map(([cat, items]) => (
          <div key={cat} className="mb-4">
            <h3 className="font-semibold capitalize">{cat}</h3>
            <p>{(items as string[]).join(", ")}</p>
          </div>
        ))}
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid gap-4 sm:grid-cols-2">
          {resumeData.projects.map((p, i) => (
            <ProjectCard key={p.title} project={p as any} index={i} />
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        {resumeData.experience.map((exp) => (
          <div key={exp.role} className="mb-6">
            <h3 className="font-bold">{exp.role}</h3>
            <p className="italic">
              {exp.org} ({exp.dates})
            </p>
            <ul className="list-disc list-inside">
              {exp.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="education" title="Education">
  {resumeData.education.map((edu) => (
    <div key={edu.degree} className="mb-4">
      <h3 className="font-bold">{edu.degree}</h3>
      <p className="italic">
        {edu.school} ({edu.dates})
      </p>
      {edu.gpa && (
        <p className="text-sm opacity-80">GPA: {edu.gpa}</p>
      )}
      {edu.details && <p>{edu.details.join(", ")}</p>}
    </div>
  ))}
</Section>


      <Section id="contact" title="Contact">
        <p>
          Email:{" "}
          <a
            href={`mailto:${resumeData.contact.email}`}
            className="text-blue-500 hover:underline"
          >
            {resumeData.contact.email}
          </a>
        </p>
        <p>Phone: {resumeData.contact.phone}</p>
        <p className="mt-1">
          <a
            href={resumeData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>{" "}
          ·{" "}
          <a
            href={resumeData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
        </p>
        <div className="mt-3 flex gap-3">
          <a
            href={resumeData.contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View Resume
          </a>
          <a
            href={resumeData.contact.resume}
            download="Clifford_Reeve_Menezes_Resume.pdf"
            className="underline"
          >
            Download Resume
          </a>
        </div>
      </Section>

      <footer className="text-center py-6 text-sm opacity-70">
        © 2025 {resumeData.name}
      </footer>
    </main>
  );
}
