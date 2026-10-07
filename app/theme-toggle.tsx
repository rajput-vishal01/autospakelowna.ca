"use client";

import { Moon, Sun } from "lucide-react";

// Both icons render on the server; CSS shows the right one from <html data-theme>, so there is no hydration mismatch.
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked (private mode): the theme still switches for this visit.
    }
  };
  return (
    <button type="button" className="theme-btn frost" onClick={toggle} aria-label="Toggle dark mode">
      <Moon className="icon-moon" aria-hidden />
      <Sun className="icon-sun" aria-hidden />
    </button>
  );
}
