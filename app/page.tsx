import Image from "next/image";
import Link from "next/link";
import {
  asset,
  benefits,
  featured,
  type Metric,
  metrics,
  posts,
  slug,
  specLabels,
  steps,
  testimonialColumns,
} from "./content";
import { Effects } from "./effects";
import { HeroImage, Nav } from "./site";
import { Arrows, Button, Eyebrow, Flip, Odometer, reveal } from "./ui";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Featured />
        <Benefits />
        <Testimonials />
        <Steps />
        <Blog />
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
            <HeroImage desktop={asset.heroDesktop} mobile={asset.heroMobile} alt="Matte black sports coupe with neon yellow wheel rims" />
          </div>
          <Nav />
          <div className="hero-texts">
            <div className="hero-top">
              <div className="hero-loc">
                <span>Dubai, UAE</span>
                <span className="hero-divider" />
                <span className="hero-tag">Prime Collection by Rydex!</span>
              </div>
              <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet nunc ut.</p>
            </div>
            <div className="hero-bottom">
              <div className="hero-heading">
                <Eyebrow>Car Rental</Eyebrow>
                <h1>Enjoy Easy Rides, Pick Your Way</h1>
              </div>
              <div className="hero-buttons">
                {[
                  ["Book a Car", "/models"],
                  ["Get in Touch", "/contact"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="hero-btn">
                    <Flip>{label}</Flip>
                    <Arrows src={asset.heroArrow} size={24} />
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

function About() {
  return (
    <section className="section">
      <div className="wrap about">
        <div className="about-side" {...reveal("slide", 0.3)}>
          <Eyebrow>About Us</Eyebrow>
        </div>
        <div className="about-main">
          <h2 {...reveal("slide", 0.4)}>
            Discover the passion and expertise behind Rydex, your premier destination for luxury car rentals and
            unmatched service.
          </h2>
          <div className="metrics">
            {metrics.map((m) => (
              <Counter key={m.label} {...m} />
            ))}
          </div>
          <div className="about-cta" {...reveal("slide", 0.4)}>
            <p>
              Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor
              interdum nulla, ut commodo diam libero vitae erat aenean.
            </p>
            <Button href="/about">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head-row" {...reveal("slide", 0.3)}>
          <div className="head">
            <Eyebrow>Our Models</Eyebrow>
            <h2>Our Featured Models</h2>
          </div>
          <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae.</p>
        </div>
        <div className="models" {...reveal("fade", 0.4)}>
          {featured.map((m) => (
            <div key={m.name} className="model-item">
              <Link href={`/models/${slug(m.name)}`} className="model-card">
                <Image className="model-img" src={m.image} alt={m.name} fill sizes="(max-width: 1355px) 100vw, 1315px" />
                <div className="model-info">
                  <div className="brand">
                    <Image src={m.brandLogo} alt="" width={24} height={24} />
                    {m.brand}
                  </div>
                  <h3 className="model-name">{m.name}</h3>
                  <dl className="specs">
                    {specLabels.map((label, i) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{m.specs[i]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="section-btn right" {...reveal("slide", 0.5)}>
          <Button href="/models">See All Models</Button>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section">
      <div className="wrap benefits">
        <div className="head benefits-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Why Choose Us?</Eyebrow>
          <h2>Exceptional Service in Every Mile, Every Time</h2>
        </div>
        {benefits.map((b) => (
          <div key={b.title} className="benefit" {...reveal("grow")}>
            <div className="light" />
            <div className="benefit-body">
              <div className="ring">
                <span>
                  <Image src={b.icon} alt="" width={28} height={28} />
                </span>
              </div>
              <div className="stack">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  // Repeats exist only to fill the parallax/marquee; screen readers hear each quote once.
  const seen = new Set<string>();
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Testimonials</Eyebrow>
          <h2>Heartfelt Reviews By Rydex Drivers</h2>
        </div>
        <div className="tm" {...reveal("fade", 0.4)}>
          {testimonialColumns.map((column, i) => (
            <div key={i} className="tm-col">
              {column.map((p, j) => {
                const isRepeat = seen.has(p.name);
                seen.add(p.name);
                return (
                <figure key={j} className="card tm-card" aria-hidden={isRepeat}>
                  <Image src={p.avatar} alt="" width={60} height={60} />
                  <blockquote>{p.quote}</blockquote>
                  <hr />
                  <figcaption>
                    <span className="tm-name">{p.name}</span>
                    <span>{p.city}</span>
                  </figcaption>
                </figure>
                );
              })}
            </div>
          ))}
          <div className="tm-fade start" />
          <div className="tm-fade end" />
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="section">
      <div className="wrap steps-grid">
        <div className="head steps-head" {...reveal("slide", 0.3)}>
          <Eyebrow>How It Works</Eyebrow>
          <h2>Follow these simple steps to choose your ideal vehicle and drive away effortlessly.</h2>
          <Button href="/models">Book Now</Button>
        </div>
        <div className="steps" {...reveal("fade", 0.4)}>
          <div className="timeline" aria-hidden>
            <span className="timeline-fill" />
            {steps.map((s) => (
              <span key={s.title} className="dot" />
            ))}
          </div>
          <ol className="step-cards">
            {steps.map((s) => (
              <li key={s.title} className="card step">
                <Image src={s.icon} alt="" width={40} height={40} />
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

function Blog() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Blog Posts</Eyebrow>
          <h2>Engage with Premium Rental Posts</h2>
        </div>
        <div className="blog">
          {posts.map((p) => (
            <div key={p.title} className="blog-item" {...reveal("slide", 0.4)}>
              <Link href={p.href} className="blog-card">
                <Image src={p.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 600px" />
                <span className="pill">{p.category}</span>
                <h3 className="blog-title">{p.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div className="section-btn center" {...reveal("slide", 0.5)}>
          <Button href="/blog">See All Posts</Button>
        </div>
      </div>
    </section>
  );
}
