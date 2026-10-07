"use client";

import { useEffect } from "react";

type Follower = { x: number; y: number; tx: number; ty: number; apply: (x: number, y: number) => void };

// Webflow IX2 smoothing 85 ≈ 15% lerp per frame.
const EASE = 0.15;

// Imperative DOM work only: the page is server-rendered static markup and never re-renders.
export function Effects() {
  useEffect(() => {
    const controller = new AbortController();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // One rAF loop for all pointer followers; it stops itself once everything settles.
    const followers: Follower[] = [];
    let frame = 0;
    const tick = () => {
      let moving = false;
      for (const f of followers) {
        f.x += (f.tx - f.x) * EASE;
        f.y += (f.ty - f.y) * EASE;
        f.apply(f.x, f.y);
        if (Math.abs(f.tx - f.x) + Math.abs(f.ty - f.y) > 0.1) moving = true;
      }
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const follower = (apply: Follower["apply"]) => {
      const f = { x: 0, y: 0, tx: 0, ty: 0, apply };
      followers.push(f);
      return (tx: number, ty: number) => {
        f.tx = tx;
        f.ty = ty;
        if (!frame) frame = requestAnimationFrame(tick);
      };
    };
    const opts = { signal: controller.signal };

    const cursor = document.querySelector<HTMLElement>(".cursor");
    if (cursor) {
      const moveCursor = follower((x, y) => (cursor.style.transform = `translate(${x}px, ${y}px)`));
      const root = document.documentElement; // clientWidth excludes the scrollbar, matching the fixed wrapper's centre
      window.addEventListener(
        "pointermove",
        (e) => e.pointerType === "mouse" && moveCursor(e.clientX - root.clientWidth / 2, e.clientY - root.clientHeight / 2),
        opts,
      );
    }

    // Benefit rim-light: pointer position maps to -80%..80% translate of the yellow blob.
    document.querySelectorAll<HTMLElement>(".benefit").forEach((card) => {
      const light = card.querySelector<HTMLElement>(".light");
      if (!light) return;
      const moveLight = follower((x, y) => (light.style.transform = `translate(${x}%, ${y}%)`));
      card.addEventListener(
        "pointermove",
        (e) => {
          if (e.pointerType !== "mouse") return;
          const r = card.getBoundingClientRect();
          moveLight(((e.clientX - r.left) / r.width) * 160 - 80, ((e.clientY - r.top) / r.height) * 160 - 80);
        },
        opts,
      );
      card.addEventListener("pointerleave", () => moveLight(0, 0), opts);
    });

    return () => {
      controller.abort();
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
