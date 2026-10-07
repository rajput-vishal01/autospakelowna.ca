import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { asset } from "./content";

// Cube-roll hover: label + rotated duplicate, animated in globals.css.
export function Flip({ children }: { children: ReactNode }) {
  return (
    <span className="flip">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

// Arrow slides out right while its twin slides in from the left.
export function Arrows({ src, size }: { src: string; size: number }) {
  return (
    <span className="arrows" aria-hidden>
      <Image src={src} alt="" width={size} height={size} />
      <Image src={src} alt="" width={size} height={size} />
    </span>
  );
}

interface ButtonProps {
  href: string;
  children: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      <Flip>{children}</Flip>
      <span className="btn-tile">
        <Arrows src={asset.arrowRight} size={20} />
      </span>
    </Link>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <span className="eyebrow">{children}</span>;
}

// Once-only scroll-into-view entrance; Effects adds `.in`, CSS does the rest.
export function reveal(kind: "slide" | "fade" | "grow", delay = 0) {
  return { "data-reveal": kind, style: { "--delay": `${delay}s` } as CSSProperties };
}

export function SearchForm({ className }: { className: string }) {
  return (
    <form action="/search" role="search" className={className}>
      <input type="search" name="query" placeholder="Search…" aria-label="Search" maxLength={256} required />
      <button type="submit" aria-label="Submit search">
        <Image src={asset.search} alt="" width={18} height={18} />
      </button>
    </form>
  );
}
