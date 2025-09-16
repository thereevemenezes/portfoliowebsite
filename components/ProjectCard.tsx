"use client";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }: { project: { title: string, dates: string, desc: string }, index: number }) {
  return (
    <motion.div
      className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <h3 className="font-semibold">{project.title}</h3>
      <p className="text-sm italic">{project.dates}</p>
      <p>{project.desc}</p>
    </motion.div>
  );
}
