"use client";
import { resumeData } from "../data/resumeData";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[90vh] text-center">
        <h1 className="text-4xl font-bold mb-4">{resumeData.name}</h1>
        <p className="text-lg mb-6">{resumeData.title}</p>
        <a
          href={resumeData.contact.resume}
          download
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          📄 Download Resume
        </a>
      </section>

      <Section id="about" title="About">
        <p>{resumeData.about}</p>
      </Section>

      <Section id="skills" title="Skills">
        {Object.entries(resumeData.skills).map(([cat, items]) => (
          <div key={cat} className="mb-4">
            <h3 className="font-semibold capitalize">{cat}</h3>
            <p>{items.join(", ")}</p>
          </div>
        ))}
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid gap-4">
          {resumeData.projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        {resumeData.experience.map((exp) => (
          <div key={exp.role} className="mb-6">
            <h3 className="font-bold">{exp.role}</h3>
            <p className="italic">{exp.org} ({exp.dates})</p>
            <ul className="list-disc list-inside">
              {exp.points.map((pt, i) => <li key={i}>{pt}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="education" title="Education">
        {resumeData.education.map((edu) => (
          <div key={edu.degree} className="mb-4">
            <h3 className="font-bold">{edu.degree}</h3>
            <p className="italic">{edu.school} ({edu.dates})</p>
            {edu.details && <p>{edu.details.join(", ")}</p>}
          </div>
        ))}
      </Section>

      <Section id="contact" title="Contact">
        <p>Email: <a href={`mailto:${resumeData.contact.email}`} className="text-blue-400">{resumeData.contact.email}</a></p>
        <p>Phone: {resumeData.contact.phone}</p>
        <p>
          <a href={resumeData.contact.linkedin} target="_blank" className="hover:underline">LinkedIn</a> | 
          <a href={resumeData.contact.github} target="_blank" className="hover:underline"> GitHub</a>
        </p>
      </Section>

      <footer className="text-center py-6 text-sm opacity-70">
        © 2025 {resumeData.name}
      </footer>
    </main>
  );
}
