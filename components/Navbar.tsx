"use client";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800 sticky top-0 z-50">
      <h1 className="font-bold text-lg">Clifford Reeve Menezes</h1>
      <ul className="flex gap-4">
        {["about","skills","projects","experience","education","contact"].map(link => (
          <li key={link}><a href={`#${link}`} className="hover:underline capitalize">{link}</a></li>
        ))}
      </ul>
      <DarkModeToggle />
    </nav>
  );
}
