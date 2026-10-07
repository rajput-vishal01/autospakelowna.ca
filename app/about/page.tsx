import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about, aboutMetrics, brandLogos, team } from "../content";
import { Effects } from "../effects";
import { HeroImage, InternalNav } from "../site";
import { Button, Eyebrow, Odometer, reveal } from "../ui";

export const metadata: Metadata = { title: "About | Rydex" };

export default function AboutPage() {
  return (
    <>
      <InternalNav />
      <main>
        <Hero />
        <WhoWeAre />
        <Brands />
        <Numbers />
        <Team />
        <Showroom />
      </main>
      <Effects />
    </>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="wrap-lg">
        <div className="hero about-hero">
          <div className="hero-media">
            <HeroImage desktop={about.heroDesktop} mobile={about.heroMobile} alt="Luxury sports car in a dark studio" />
          </div>
          <div className="wrap">
            <div className="head" {...reveal("slide", 0.4)}>
              <Eyebrow>About Us</Eyebrow>
              <h1>Try Rydex Rides, Cruise With Joy</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealImage({ src, delay }: { src: string; delay: number }) {
  return (
    <div className="about-image" {...reveal("image", delay)}>
      <Image src={src} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" />
    </div>
  );
}

function WhoWeAre() {
  return (
    <section className="section">
      <div className="wrap about-split">
        <RevealImage src={about.image} delay={0.3} />
        <div className="about-texts" {...reveal("slide", 0.4)}>
          <div className="head">
            <Eyebrow>Who We Are</Eyebrow>
            <h2>Driven by Passion, built on Precision! Rydex Delivers More Than Cars, We bring Trust.</h2>
          </div>
          <div className="stack">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elem tristique.
              Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>
            <Button href="/contact" className="btn-block">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section aria-label="Partner brands">
      <div className="wrap">
        <div className="marquee" {...reveal("fade", 0.3)}>
          {[false, true].map((isCopy) => (
            <div key={String(isCopy)} className="marquee-row" aria-hidden={isCopy}>
              {brandLogos.map((src) => (
                <Image key={src} src={src} alt="" width={120} height={40} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  // Source layout: a checkerboard of metric cards and empty filler cards (fillers drop below 992px).
  const [first, ...rest] = aboutMetrics;
  const cards = [first, null, null, ...rest];
  return (
    <section className="section">
      <div className="wrap">
        <div className="head numbers-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Our Numbers</Eyebrow>
          <h2>Key Statistics That Define Our Journey</h2>
        </div>
        <div className="about-split">
          <div className="about-metrics">
            {cards.map((m, i) =>
              m ? (
                <div key={m.label} className="card metric-card metric" {...reveal("grow")}>
                  <Odometer parts={m.parts} symbol={m.symbol} value={m.value} />
                  <p className="metric-title">{m.label}</p>
                </div>
              ) : (
                <div key={i} className="card metric-card filler" aria-hidden {...reveal("grow")} />
              ),
            )}
          </div>
          <RevealImage src={about.image2} delay={0.4} />
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Our Team</Eyebrow>
          <h2>Meet Rydex Dedicated Team Members</h2>
        </div>
        <ul className="team">
          {team.map((member, i) => (
            <li key={member.name} className="team-member" {...reveal("slide", 0.4 + i * 0.1)}>
              <Image src={member.photo} alt={member.name} fill sizes="(max-width: 479px) 100vw, (max-width: 991px) 50vw, 330px" />
              <div className="team-info">
                <span className="team-name">{member.name}</span>
                <span>{member.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Showroom() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="showroom">
          <div className="showroom-bg" {...reveal("zoom")}>
            <Image src={about.image2} alt="" fill sizes="(max-width: 1355px) 100vw, 1315px" />
          </div>
          <div className="card showroom-card">
            <div className="head" {...reveal("slide", 0.3)}>
              <Eyebrow>Our Showroom</Eyebrow>
              <h2>Discover Rydex Elite Showroom Site</h2>
            </div>
            <Link
              href="https://maps.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="showroom-link"
              {...reveal("slide", 0.4)}
            >
              <Image src={about.image2} alt="Rydex showroom" fill sizes="(max-width: 767px) 100vw, 480px" />
              <div className="showroom-info">
                <p className="medium">
                  <Image src={about.locationIcon} alt="" width={20} height={22} className="location-icon" />
                  19 Jumeirah Beach Road, Umm Suqeim District, Dubai City, United Arab Emirates.
                </p>
              </div>
            </Link>
            <div {...reveal("slide", 0.5)}>
              <Button href="/contact" className="btn-block">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
