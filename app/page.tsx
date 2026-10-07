import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, FaqList, FindUs, TrustStrip } from "./blocks";
import { GUARANTEES, HOME_FAQ, type Metric, METRICS, PHOTO, PROCESS, SERVICES, SPECIALTY } from "./brand";
import { Effects } from "./effects";
import { Estimator } from "./estimator";
import { ReviewsSection } from "./reviews-section";
import { HeroImage } from "./site";
import { Arrows, Button, Eyebrow, Flip, Icon, Odometer, reveal } from "./ui";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <TrustStrip />
        <Studio />
        <Services />
        <EstimateSection />
        <Guarantees />
        <ReviewsSection />
        <Process />
        <Specialty />
        <Faq />
        <FindUs />
        <CtaBand />
      </main>
      <Effects />
    </>
  );
}

function Hero() {
  return (
    <header className="hero-section">
      <div className="wrap-lg">
        <div className="hero">
          <div className="hero-media">
            <HeroImage desktop={PHOTO.heroDesktop} mobile={PHOTO.heroMobile} alt="Black car with headlights on in a dark garage" />
          </div>
          <div className="hero-texts">
            <div className="hero-top">
              <div className="hero-loc">
                <span>Kelowna, BC</span>
                <span className="hero-divider" />
                <span className="hero-tag">Detailing and Ceramic Studio</span>
              </div>
              <p>Inspected under correction lighting, quoted at a fixed price, protected in writing.</p>
            </div>
            <div className="hero-bottom">
              <div className="hero-heading">
                <Eyebrow>Kelowna Studio</Eyebrow>
                <h1>Showroom Finish, Measured and Protected</h1>
              </div>
              <div className="hero-buttons">
                {[
                  ["Book a Detail", "/contact"],
                  ["View Services", "/services"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="hero-btn">
                    <Flip>{label}</Flip>
                    <Arrows size={24} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Counter({ value, label, parts, symbol }: Metric) {
  return (
    <div className="metric" {...reveal("slide", 0.4)}>
      <Odometer parts={parts} symbol={symbol} value={value} />
      <p className="medium">{label}</p>
    </div>
  );
}

function Studio() {
  return (
    <section className="section">
      <div className="wrap about">
        <div className="about-side" {...reveal("slide", 0.3)}>
          <Eyebrow>The Studio</Eyebrow>
        </div>
        <div className="about-main">
          <h2 {...reveal("slide", 0.4)}>
            A detailing studio, not a car wash. We measure your paint, correct what is there, and protect it with a
            warranty you can hold.
          </h2>
          <div className="metrics">
            {METRICS.map((m) => (
              <Counter key={m.label} {...m} />
            ))}
          </div>
          <div className="about-cta" {...reveal("slide", 0.4)}>
            <p>
              Every vehicle starts with an inspection under correction lighting and paint depth readings, before a
              single pad touches the clear coat.
            </p>
            <Button href="/about">About the Studio</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head-row" {...reveal("slide", 0.3)}>
          <div className="head">
            <Eyebrow>Our Services</Eyebrow>
            <h2>What We Do Best</h2>
          </div>
          <p>Four services, each confirmed with a fixed quote after inspection. Prices start at the numbers below.</p>
        </div>
        <div className="models" {...reveal("fade", 0.4)}>
          {SERVICES.map((s) => (
            <div key={s.name} className="model-item">
              <Link href={s.href} className="model-card">
                <Image className="model-img" src={s.image} alt={s.alt} fill sizes="(max-width: 1355px) 100vw, 1315px" />
                <div className="model-info">
                  <div className="brand">
                    <span className="eyebrow">{s.tag}</span>
                  </div>
                  <h3 className="model-name">{s.name}</h3>
                  <dl className="specs">
                    {s.specs.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="section-btn right" {...reveal("slide", 0.5)}>
          <Button href="/services">See Full Pricing</Button>
        </div>
      </div>
    </section>
  );
}

function Guarantees() {
  return (
    <section className="section">
      <div className="wrap benefits">
        <div className="head benefits-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Why Auto Spa</Eyebrow>
          <h2>Fewer Promises, More Proof</h2>
        </div>
        {GUARANTEES.map((g) => (
          <div key={g.title} className="benefit" {...reveal("grow")}>
            <div className="light" />
            <div className="benefit-body">
              <div className="ring">
                <span>
                  <Icon name={g.icon} />
                </span>
              </div>
              <div className="stack">
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section">
      <div className="wrap steps-grid">
        <div className="head steps-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Our Process</Eyebrow>
          <h2>Four stages between your car and a flawless finish.</h2>
          <Button href="/contact">Book an Inspection</Button>
        </div>
        <div className="steps" {...reveal("fade", 0.4)}>
          <div className="timeline" aria-hidden>
            <span className="timeline-fill" />
            {PROCESS.map((s) => (
              <span key={s.title} className="dot" />
            ))}
          </div>
          <ol className="step-cards">
            {PROCESS.map((s) => (
              <li key={s.title} className="card step">
                <Icon name={s.icon} size={40} />
                <div className="stack">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Specialty() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Beyond the Car</Eyebrow>
          <h2>Trucks, Boats and RVs Too</h2>
        </div>
        <div className="blog">
          {SPECIALTY.map((s) => (
            <div key={s.title} className="blog-item" {...reveal("slide", 0.4)}>
              <Link href="/services#specialty" className="blog-card">
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 600px" />
                <span className="pill">{s.tag}</span>
                <h3 className="blog-title">{s.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div className="section-btn center" {...reveal("slide", 0.5)}>
          <Button href="/services#specialty">See Specialty Services</Button>
        </div>
      </div>
    </section>
  );
}

function EstimateSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head-row" {...reveal("slide", 0.3)}>
          <div className="head">
            <Eyebrow>Coating Estimator</Eyebrow>
            <h2>Price Your Protection</h2>
          </div>
          <p>Pick a coating term and how your paint looks today. The number uses our published prices.</p>
        </div>
        <div {...reveal("fade", 0.4)}>
          <Estimator />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Good to Know</Eyebrow>
          <h2>Common Questions</h2>
        </div>
        <FaqList items={HOME_FAQ} />
      </div>
    </section>
  );
}
