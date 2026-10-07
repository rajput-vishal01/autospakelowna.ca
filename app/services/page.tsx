import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { ADDONS, COATINGS, CORRECTION, PACKAGES, PHOTO, SPECIALTY, VEHICLE_CLASSES } from "../brand";
import { Effects } from "../effects";
import { HeroImage, InternalNav } from "../site";
import { Button, Eyebrow, Icon, reveal } from "../ui";

export const metadata: Metadata = {
  title: "Detailing, Ceramic Coating and Paint Correction Prices",
  description:
    "Detailing packages from $280, ceramic coatings from $999 with 3 to 10 year written warranties, and paint correction in Kelowna. Fixed quotes after inspection.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <InternalNav />
      <main>
        <PageHero />
        <Detailing />
        <Coating />
        <Correction />
        <AddOns />
        <Specialty />
        <Closing />
      </main>
      <Effects />
    </>
  );
}

function PageHero() {
  return (
    <section className="hero-section">
      <div className="wrap-lg">
        <div className="hero about-hero">
          <div className="hero-media">
            <HeroImage desktop={PHOTO.hypercar} mobile={PHOTO.hypercarMobile} alt="White hypercar photographed at night" />
          </div>
          <div className="wrap">
            <div className="head" {...reveal("slide", 0.4)}>
              <Eyebrow>Services and Pricing</Eyebrow>
              <h1>Every Service, One Fixed Price</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <Check size={18} strokeWidth={1.75} aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Detailing() {
  return (
    <section className="section" id="detailing">
      <div className="wrap">
        <div className="head-row" {...reveal("slide", 0.3)}>
          <div className="head">
            <Eyebrow>Auto Detailing</Eyebrow>
            <h2>Three Packages, Priced by Size</h2>
          </div>
          <p>Each package is priced for an SUV or whiteSedan, a truck, or a 3-row vehicle. Add-ons are listed below.</p>
        </div>
        <div className="models" {...reveal("fade", 0.4)}>
          {PACKAGES.map((p) => (
            <div key={p.name} className="model-item">
              <article className="model-card">
                <Image className="model-img" src={p.image} alt={p.alt} fill sizes="(max-width: 1355px) 100vw, 1315px" />
                <div className="model-info">
                  <div className="brand">
                    <span className="eyebrow">{p.popular ? `${p.kind} · Most Booked` : p.kind}</span>
                  </div>
                  <h3 className="model-name">{p.name}</h3>
                  <dl className="specs">
                    {VEHICLE_CLASSES.map((label, i) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{p.prices[i]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </div>
          ))}
        </div>
        <div className="packages">
          {PACKAGES.map((p, i) => (
            <div key={p.name} className="card package" {...reveal("slide", 0.4 + i * 0.1)}>
              <div className="stack">
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
              </div>
              <div className="stack">
                <span className="eyebrow">Interior</span>
                <Checklist items={p.interior} />
              </div>
              <div className="stack">
                <span className="eyebrow">Exterior</span>
                <Checklist items={p.exterior} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coating() {
  return (
    <section className="section" id="coating">
      <div className="wrap benefits">
        <div className="head benefits-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Ceramic Coating</Eyebrow>
          <h2>9H+ Protection, Warrantied in Writing</h2>
          <p>Sedan and coupe pricing with a 1-step polish included. Larger vehicles are quoted at inspection.</p>
        </div>
        {COATINGS.map((c) => (
          <div key={c.name} className="benefit" {...reveal("grow")}>
            <div className="light" />
            <div className="benefit-body">
              <div className="ring">
                <span>
                  <Icon name="shield" />
                </span>
              </div>
              <div className="stack">
                <span className="eyebrow">{c.popular ? `${c.years} · Most Booked` : c.years}</span>
                <h3>{c.name}</h3>
                <p>{c.note}</p>
                <p className="price">{c.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Correction() {
  return (
    <section className="section" id="correction">
      <div className="wrap steps-grid">
        <div className="head steps-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Paint Correction</Eyebrow>
          <h2>Matched to your paint, never cut past it.</h2>
          <p>Depth readings come first, so every stage stays inside what your clear coat can safely give.</p>
          <Button href="/contact">Book an Inspection</Button>
        </div>
        <div className="steps" {...reveal("fade", 0.4)}>
          <div className="timeline" aria-hidden>
            <span className="timeline-fill" />
            {CORRECTION.map((s) => (
              <span key={s.title} className="dot" />
            ))}
          </div>
          <ol className="step-cards">
            {CORRECTION.map((s) => (
              <li key={s.title} className="card step">
                <Icon name="sparkles" size={40} />
                <div className="stack">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <p className="price">{s.price}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function AddOns() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Add-Ons</Eyebrow>
          <h2>Tailor Any Detail</h2>
        </div>
        <ul className="addons" {...reveal("fade", 0.4)}>
          {ADDONS.map(([name, price]) => (
            <li key={name} className="card addon">
              <span>{name}</span>
              <span className="price">{price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Specialty() {
  return (
    <section className="section" id="specialty">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Specialty</Eyebrow>
          <h2>Trucks, Boats and RVs</h2>
        </div>
        <div className="blog">
          {SPECIALTY.map((s) => (
            <div key={s.title} className="blog-item" {...reveal("slide", 0.4)}>
              <div className="blog-card">
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 600px" />
                <span className="pill">{s.tag}</span>
                <h3 className="blog-title">{s.title}</h3>
              </div>
              <div className="card specialty-points">
                <Checklist items={s.points} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="about-cta" {...reveal("slide", 0.3)}>
          <p>Not sure which service fits? Book an inspection and we will recommend one, with a fixed quote before any work starts.</p>
          <Button href="/contact">Book an Inspection</Button>
        </div>
      </div>
    </section>
  );
}
