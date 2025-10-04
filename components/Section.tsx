"use client";
import { motion } from "framer-motion";

export default function Section({
  id,
  title,
  children,
  className = "",           // ← add this
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;       // ← add this
}) {
  return (
    <motion.section
      id={id}
      className={`max-w-4xl mx-auto py-8 px-6 scroll-mt-24 ${className}`}  // default py-8
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </motion.section>
  );
}
