import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, HOURS, METRICS, PHOTO, PRODUCT_BRANDS } from "../brand";
import { Effects } from "../effects";
import { HeroImage, InternalNav } from "../site";
import { Button, Eyebrow, Odometer, reveal } from "../ui";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "Auto Spa Kelowna is a small detailing and ceramic coating studio on Evans Court. Paint measured before it is polished, fixed quotes, written warranties.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <InternalNav />
      <main>
        <PageHero />
        <WhoWeAre />
        <Brands />
        <Numbers />
        <Visit />
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
            <HeroImage desktop={PHOTO.handWash} mobile={PHOTO.handWashMobile} alt="Detailer hand washing a black car covered in foam" />
          </div>
          <div className="wrap">
            <div className="head" {...reveal("slide", 0.4)}>
              <Eyebrow>About Us</Eyebrow>
              <h1>A Small Studio With Exacting Standards</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealImage({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  return (
    <div className="about-image" {...reveal("image", delay)}>
      <Image src={src} alt={alt} fill sizes="(max-width: 767px) 100vw, 50vw" />
    </div>
  );
}

function WhoWeAre() {
  return (
    <section className="section">
      <div className="wrap about-split">
        <RevealImage src={PHOTO.lakeside} alt="Grey luxury sedan parked by a lake" delay={0.3} />
        <div className="about-texts" {...reveal("slide", 0.4)}>
          <div className="head">
            <Eyebrow>Who We Are</Eyebrow>
            <h2>Built on measurement, not marketing.</h2>
          </div>
          <div className="stack">
            <p>
              Everyone in the valley promises a showroom finish. We measure it. Paint depth readings before polishing,
              one vehicle in the bay at a time, and a coating warranty registered in your name.
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
    <section aria-label="Products we use and sell">
      <div className="wrap">
        <div className="marquee" {...reveal("fade", 0.3)}>
          {[false, true].map((isCopy) => (
            <div key={String(isCopy)} className="marquee-row" aria-hidden={isCopy}>
              {PRODUCT_BRANDS.map((name) => (
                <span key={name} className="marquee-item">
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  // Checkerboard of metric cards and empty filler cards (fillers drop below 992px).
  const [first, ...rest] = METRICS;
  const cards = [first, null, null, ...rest];
  return (
    <section className="section">
      <div className="wrap">
        <div className="head numbers-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Our Numbers</Eyebrow>
          <h2>The Proof Behind the Promise</h2>
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
          <RevealImage src={PHOTO.blueMuscle} alt="Blue muscle car parked in the desert" delay={0.4} />
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="showroom">
          <div className="showroom-bg" {...reveal("zoom")}>
            <Image src={PHOTO.blackPorsche} alt="" fill sizes="(max-width: 1355px) 100vw, 1315px" />
          </div>
          <div className="card showroom-card">
            <div className="head" {...reveal("slide", 0.3)}>
              <Eyebrow>Visit the Studio</Eyebrow>
              <h2>715 Evans Court, Kelowna</h2>
            </div>
            <Link href={CONTACT.maps} target="_blank" rel="noopener noreferrer" className="showroom-link" {...reveal("slide", 0.4)}>
              <Image src={PHOTO.handWash} alt="Directions to Auto Spa Kelowna on Google Maps" fill sizes="(max-width: 767px) 100vw, 480px" />
              <div className="showroom-info">
                <p className="medium">
                  <MapPin className="location-icon" size={20} strokeWidth={1.75} aria-hidden />
                  {CONTACT.address}
                </p>
                <p>{HOURS.map((h) => `${h.day}: ${h.time}`).join(" · ")}</p>
              </div>
            </Link>
            <div {...reveal("slide", 0.5)}>
              <Button href="/contact" className="btn-block">
                Book a Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
