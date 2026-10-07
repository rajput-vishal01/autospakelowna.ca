import { ArrowRight, Car, Check, Droplets, Gauge, ReceiptText, Scissors, Search, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Metric } from "./brand";

// Cube-roll hover: label + rotated duplicate, animated in globals.css.
export function Flip({ children }: { children: ReactNode }) {
  return (
    <span className="flip">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

// Arrow slides out right while its twin slides in from the left. Icons take currentColor.
export function Arrows({ size }: { size: number }) {
  return (
    <span className="arrows" aria-hidden>
      <ArrowRight size={size} strokeWidth={1.75} />
      <ArrowRight size={size} strokeWidth={1.75} />
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
        <Arrows size={20} />
      </span>
    </Link>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <span className="eyebrow">{children}</span>;
}

// Once-only scroll-into-view entrance; Effects adds `.in`, CSS does the rest.
// image = curtain slides up + image settles; zoom = image settles only.
export function reveal(kind: "slide" | "fade" | "grow" | "image" | "zoom", delay = 0) {
  return { "data-reveal": kind, style: { "--delay": `${delay}s` } as CSSProperties };
}

// Digit columns roll when the nearest `.metric` ancestor gets `.in` (see globals.css).
export function Odometer({ parts, symbol, value }: Omit<Metric, "label">) {
  return (
    <>
      <div className="num" aria-hidden>
        {parts.map((part, i) =>
          typeof part === "string" ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i} className="win">
              <span className={`col ${part.dir}`}>
                {[...part.digits].map((d, j) => (
                  <span key={j}>{d}</span>
                ))}
              </span>
            </span>
          ),
        )}
        <span className="sym">{symbol}</span>
      </div>
      <span className="sr-only">{value}</span>
    </>
  );
}

const ICONS = {
  shield: ShieldCheck,
  receipt: ReceiptText,
  gauge: Gauge,
  car: Car,
  search: Search,
  droplets: Droplets,
  sparkles: Sparkles,
  scissors: Scissors,
  check: Check,
};

export type IconName = keyof typeof ICONS;

// Line icons in the accent colour (benefit rings, step cards).
export function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  const Glyph = ICONS[name];
  return <Glyph className="line-icon" size={size} strokeWidth={1.5} aria-hidden />;
}
