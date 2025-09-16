"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true); // start dark by default

  // On mount, check if user has a saved preference
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setDark(stored === "dark");
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // no preference saved, default to dark
      document.documentElement.classList.add("dark");
    }
  }, []);

  // When user toggles, update HTML + save to localStorage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="ml-4 text-xl hover:scale-110 transition-transform"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
