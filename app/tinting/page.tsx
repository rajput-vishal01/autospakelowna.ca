import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { PHOTO, TINT_FAQ, TINT_FILMS, TINT_PROCESS } from "../brand";
import { Effects } from "../effects";
import { HeroImage, InternalNav } from "../site";
import { Button, Eyebrow, Icon, reveal } from "../ui";

export const metadata: Metadata = {
  title: "Window Tinting Kelowna: Ceramic and Nano Ceramic Tint",
  description:
    "Ceramic and nano ceramic window tint in Kelowna. Up to 99% UV blocked, signal safe, BC compliant, installed in 2 to 4 hours.",
  alternates: { canonical: "/tinting" },
};

export default function TintingPage() {
  return (
    <>
      <InternalNav />
      <main>
        <PageHero />
        <Intro />
        <Films />
        <Install />
        <Faq />
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
            <HeroImage desktop={PHOTO.whiteSedan} mobile={PHOTO.whiteSedanMobile} alt="White BMW sedan on a palm-lined street" />
          </div>
          <div className="wrap">
            <div className="head" {...reveal("slide", 0.4)}>
              <Eyebrow>Window Tinting</Eyebrow>
              <h1>Cooler Cabin, Clearer View</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="section">
      <div className="wrap about-split">
        <div className="about-image" {...reveal("image", 0.3)}>
          <Image src={PHOTO.whiteCoupe} alt="White BMW coupe in a parking lot" fill sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
        <div className="about-texts" {...reveal("slide", 0.4)}>
          <div className="head">
            <Eyebrow>Ceramic Films Only</Eyebrow>
            <h2>Heat and UV stop at the glass. Your signal and your view do not.</h2>
          </div>
          <div className="stack">
            <p>
              We install two ceramic films, cut to the exact shape of your glass and fitted in a dust-controlled bay.
              Every install meets BC law, and we help you pick a shade that does.
            </p>
            <Button href="/contact" className="btn-block">
              Book Window Tinting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Films() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head-row" {...reveal("slide", 0.3)}>
          <div className="head">
            <Eyebrow>Two Films</Eyebrow>
            <h2>Choose Your Tint</h2>
          </div>
          <p>Both block up to 99% of UV and keep GPS and radio clear. Nano Ceramic goes further on heat and clarity.</p>
        </div>
        <div className="models" {...reveal("fade", 0.4)}>
          {TINT_FILMS.map((f) => (
            <div key={f.name} className="model-item">
              <article className="model-card">
                <Image className="model-img" src={f.image} alt={f.alt} fill sizes="(max-width: 1355px) 100vw, 1315px" />
                <div className="model-info">
                  <div className="brand">
                    <span className="eyebrow">{f.tag}</span>
                  </div>
                  <h3 className="model-name">{f.name}</h3>
                  <dl className="specs">
                    {f.specs.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section className="section">
      <div className="wrap steps-grid">
        <div className="head steps-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Installation</Eyebrow>
          <h2>Four checks between bare glass and a clean, bubble-free finish.</h2>
          <Button href="/contact">Book Window Tinting</Button>
        </div>
        <div className="steps" {...reveal("fade", 0.4)}>
          <div className="timeline" aria-hidden>
            <span className="timeline-fill" />
            {TINT_PROCESS.map((s) => (
              <span key={s.title} className="dot" />
            ))}
          </div>
          <ol className="step-cards">
            {TINT_PROCESS.map((s) => (
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

function Faq() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Tint FAQ</Eyebrow>
          <h2>Questions, Answered</h2>
        </div>
        <div className="faq">
          {TINT_FAQ.map((item, i) => (
            <details key={item.q} className="card faq-item" {...reveal("slide", 0.3 + i * 0.05)}>
              <summary>
                <h3>{item.q}</h3>
                <ChevronDown className="faq-icon" size={22} strokeWidth={1.75} aria-hidden />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
