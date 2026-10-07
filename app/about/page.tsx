import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, FindUs, PageHeader } from "../blocks";
import { GUARANTEES, METRICS, PHOTO, PRODUCT_BRANDS } from "../brand";
import { Effects } from "../effects";
import { Eyebrow, Odometer, reveal } from "../ui";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "Auto Spa Kelowna is a small detailing and ceramic coating studio on Evans Court. Paint measured before it is polished, fixed quotes, written warranties.",
  alternates: { canonical: "/about" },
};

const MOSAIC = [
  { src: PHOTO.sprayDetail, alt: "Detailer spraying and wiping an orange sports car" },
  { src: PHOTO.microfibre, alt: "Microfibre towel resting on a polished black hood" },
  { src: PHOTO.pressureWash, alt: "Black sports car being pressure washed" },
];

export default function AboutPage() {
  return (
    <>
      <main>
        <PageHeader
          eyebrow="About Us"
          title="A Small Studio With Exacting Standards"
          intro="Everyone in the valley promises a showroom finish. We measure it, quote it, and put the warranty in writing."
        />
        <Mosaic />
        <Story />
        <Values />
        <Numbers />
        <Brands />
        <FindUs eyebrow="Visit Us" title="715 Evans Court, Kelowna" />
        <CtaBand />
      </main>
      <Effects />
    </>
  );
}

function Mosaic() {
  return (
    <section className="section mosaic-section">
      <div className="wrap mosaic">
        {MOSAIC.map((m, i) => (
          <div key={m.src} className="mosaic-item about-image" {...reveal("image", 0.2 + i * 0.1)}>
            <Image src={m.src} alt={m.alt} fill sizes={i === 0 ? "(max-width: 767px) 100vw, 60vw" : "(max-width: 767px) 100vw, 40vw"} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section">
      <div className="wrap story">
        <div className="head" {...reveal("slide", 0.3)}>
          <Eyebrow>Who We Are</Eyebrow>
          <h2>Built on measurement, not marketing.</h2>
        </div>
        <div className="story-text" {...reveal("slide", 0.4)}>
          <p>
            Auto Spa Kelowna is a ceramic coating, paint correction and detailing studio, not a car wash. One vehicle
            sits in the bay at a time, under correction lighting, in a climate-controlled space.
          </p>
          <p>
            Before any polish touches your paint we take depth readings, so we know exactly how much clear coat there is
            to work with. Then we quote a fixed price and register your coating warranty in your name.
          </p>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section band-surface">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>What We Promise</Eyebrow>
          <h2>Four Things You Can Hold Us To</h2>
        </div>
        <ol className="values">
          {GUARANTEES.map((g, i) => (
            <li key={g.title} className="value" {...reveal("slide", 0.3 + i * 0.08)}>
              <span className="value-number">0{i + 1}</span>
              <h3>{g.title}</h3>
              <p>{g.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="numbers-band cta-band" {...reveal("grow")}>
          <div className="head">
            <Eyebrow>Our Numbers</Eyebrow>
            <h2>The Proof Behind the Promise</h2>
          </div>
          <div className="numbers-grid">
            {METRICS.map((m) => (
              <div key={m.label} className="metric" {...reveal("slide", 0.4)}>
                <Odometer parts={m.parts} symbol={m.symbol} value={m.value} />
                <p>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="section">
      <div className="wrap brands-layout">
        <div className="head" {...reveal("slide", 0.3)}>
          <Eyebrow>Products</Eyebrow>
          <h2>What We Use and Sell</h2>
          <p>Professional-grade compounds, coatings and tools. Ask in the shop about maintenance products for your coating.</p>
        </div>
        <ul className="brand-grid" {...reveal("fade", 0.4)}>
          {PRODUCT_BRANDS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
