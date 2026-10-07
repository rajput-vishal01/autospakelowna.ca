"use client";

import { Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";

function applyTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage blocked (private mode): the theme still switches for this visit.
  }
}

// Both icons render on the server; CSS shows the right one from <html data-theme>, so there is no hydration mismatch.
export function ThemeToggle() {
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) return applyTheme();

    // The new theme grows out of the button as a circle (View Transitions API; older browsers switch instantly).
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(applyTheme);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button type="button" className="theme-btn" onClick={toggle} aria-label="Toggle dark mode">
      <Moon className="icon-moon" aria-hidden />
      <Sun className="icon-sun" aria-hidden />
    </button>
  );
}
