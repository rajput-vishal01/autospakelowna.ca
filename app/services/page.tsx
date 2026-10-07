import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHeader } from "../blocks";
import { ADDONS, COATINGS, CORRECTION, SPECIALTY } from "../brand";
import { Effects } from "../effects";
import { Eyebrow, reveal } from "../ui";
import { PackagePricing } from "./package-pricing";

export const metadata: Metadata = {
  title: "Detailing, Ceramic Coating and Paint Correction Prices",
  description:
    "Detailing packages from $280, ceramic coatings from $999 with 3 to 10 year written warranties, and paint correction in Kelowna. Fixed quotes after inspection.",
  alternates: { canonical: "/services" },
};

const SECTIONS = [
  ["Detailing", "#detailing"],
  ["Ceramic Coating", "#coating"],
  ["Paint Correction", "#correction"],
  ["Add-Ons", "#addons"],
  ["Trucks, Boats, RVs", "#specialty"],
];

export default function ServicesPage() {
  return (
    <>
      <main>
        <PageHeader
          eyebrow="Services and Pricing"
          title="Every Service, One Fixed Price"
          intro="Detailing is priced by vehicle size. Coatings and correction are confirmed with a fixed quote after we inspect your paint."
        >
          <nav className="jump-links" aria-label="On this page">
            {SECTIONS.map(([label, href]) => (
              <a key={href} href={href} className="area-pill">
                {label}
              </a>
            ))}
          </nav>
        </PageHeader>
        <Detailing />
        <Coating />
        <Correction />
        <AddOns />
        <Specialty />
        <CtaBand title="Not sure which service fits? We will tell you." />
      </main>
      <Effects />
    </>
  );
}

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <div className="head-row" {...reveal("slide", 0.3)}>
      <div className="head">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      <p>{intro}</p>
    </div>
  );
}

function Detailing() {
  return (
    <section className="section anchor" id="detailing">
      <div className="wrap">
        <SectionHead eyebrow="Auto Detailing" title="Three Packages, Priced by Size" intro="Choose your vehicle size to see the price. Every package covers interior and exterior." />
        <div {...reveal("fade", 0.4)}>
          <PackagePricing />
        </div>
      </div>
    </section>
  );
}

function Coating() {
  return (
    <section className="section anchor band-surface" id="coating">
      <div className="wrap">
        <SectionHead eyebrow="Ceramic Coating" title="9H+ Protection, Warrantied in Writing" intro="Sedan and coupe prices with a 1-step polish included. Larger vehicles are quoted at inspection." />
        <div className="tiers">
          {COATINGS.map((c, i) => {
            const years = Number.parseInt(c.years, 10);
            return (
              <article key={c.name} className={`card tier${c.popular ? " is-popular" : ""}`} {...reveal("slide", 0.3 + i * 0.1)}>
                {c.popular && <span className="pill price-badge">Most Booked</span>}
                <p className="tier-years">
                  {years}
                  <small>years</small>
                </p>
                <div className="tier-bar" aria-hidden>
                  <span style={{ width: `${years * 10}%` }} />
                </div>
                <h3>{c.name}</h3>
                <p>{c.note}</p>
                <p className="price-big">{c.price}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Correction() {
  return (
    <section className="section anchor" id="correction">
      <div className="wrap">
        <SectionHead eyebrow="Paint Correction" title="Matched to Your Paint, Never Cut Past It" intro="Depth readings come first, so every stage stays inside what your clear coat can safely give." />
        <div className="stages">
          {CORRECTION.map((s, i) => (
            <article key={s.title} className="card stage" {...reveal("slide", 0.3 + i * 0.1)}>
              <div className="stage-meter" aria-label={`Defect level ${i + 1} of 3`} role="img">
                {[0, 1, 2].map((bar) => (
                  <span key={bar} className={bar <= i ? "is-on" : undefined} />
                ))}
              </div>
              <span className="stage-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <p className="price">{s.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddOns() {
  return (
    <section className="section anchor band-surface" id="addons">
      <div className="wrap addons-layout">
        <div className="head" {...reveal("slide", 0.3)}>
          <Eyebrow>Add-Ons</Eyebrow>
          <h2>Tailor Any Detail</h2>
          <p>Add any of these to a package. Ranges depend on the vehicle and how much work it needs.</p>
        </div>
        <ul className="price-menu" {...reveal("fade", 0.4)}>
          {ADDONS.map(([name, price]) => (
            <li key={name}>
              <span>{name}</span>
              <span className="price-menu-dots" aria-hidden />
              <strong>{price}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Specialty() {
  return (
    <section className="section anchor" id="specialty">
      <div className="wrap">
        <SectionHead eyebrow="Specialty" title="Trucks, Boats and RVs" intro="The same inspection-first process, scaled up for bigger surfaces and harsher conditions." />
        <div className="rows">
          {SPECIALTY.map((s) => (
            <article key={s.title} className="row">
              <div className="row-image about-image" {...reveal("image", 0.2)}>
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 767px) 100vw, 50vw" />
              </div>
              <div className="row-text" {...reveal("slide", 0.3)}>
                <span className="pill row-pill">{s.tag}</span>
                <h3 className="row-title">{s.title}</h3>
                <ul className="checklist">
                  {s.points.map((point) => (
                    <li key={point}>
                      <Check size={18} strokeWidth={1.75} aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
