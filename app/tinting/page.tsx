import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, FaqList } from "../blocks";
import { CONTACT, PHOTO, TINT_FAQ, TINT_PROCESS } from "../brand";
import { Effects } from "../effects";
import { Button, Eyebrow, Icon, reveal } from "../ui";

export const metadata: Metadata = {
  title: "Window Tinting Kelowna: Ceramic and Nano Ceramic Tint",
  description:
    "Ceramic and nano ceramic window tint in Kelowna. Up to 99% UV blocked, signal safe, installed in 2 to 4 hours.",
  alternates: { canonical: "/tinting" },
};

const STATS = [
  ["99%", "UV blocked"],
  ["2 to 4 hrs", "Typical install"],
  ["0", "Signal loss"],
];

// true = included, false = not included, string = level.
const COMPARE: [string, string | boolean, string | boolean][] = [
  ["UV protection", "Up to 99%", "Up to 99%"],
  ["Heat rejection", "High", "Maximum"],
  ["Optical clarity", "Crystal clear", "Zero haze"],
  ["Night glare reduction", true, "Enhanced"],
  ["GPS, phone and radio safe", true, true],
  ["Interior fade protection", true, "Superior"],
  ["Built for luxury vehicles", false, true],
];

const SHADES = [
  { vlt: 70, name: "Subtle" },
  { vlt: 50, name: "Light" },
  { vlt: 35, name: "Medium" },
  { vlt: 20, name: "Dark" },
  { vlt: 5, name: "Limo" },
];

export default function TintingPage() {
  return (
    <>
      <main>
        <Hero />
        <Compare />
        <Shades />
        <Install />
        <Faq />
        <CtaBand title="Book your tint and drive cooler this week." />
      </main>
      <Effects />
    </>
  );
}

function Hero() {
  return (
    <section className="split-hero">
      <div className="wrap split-hero-inner">
        <div className="split-hero-text" {...reveal("slide", 0.2)}>
          <div className="head">
            <Eyebrow>Window Tinting</Eyebrow>
            <h1>Cooler Cabin, Clearer View</h1>
          </div>
          <p>
            Two ceramic films, cut to the exact shape of your glass and installed in a dust-controlled bay. Heat and UV
            stop at the window. Your signal and your view do not.
          </p>
          <div className="cta-actions">
            <Button href="/contact">Book Window Tinting</Button>
            <Button href={CONTACT.tel} variant="secondary">
              Ask a Question
            </Button>
          </div>
          <dl className="stat-row">
            {STATS.map(([value, label]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="split-hero-media" {...reveal("zoom")}>
          <Image src={PHOTO.whiteSedan} alt="White BMW sedan on a palm-lined street" fill sizes="(max-width: 991px) 100vw, 50vw" loading="eager" fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="line-icon" size={20} aria-label="Yes" />;
  if (value === false) return <Minus size={20} aria-label="No" />;
  return <>{value}</>;
}

function Compare() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Two Films</Eyebrow>
          <h2>Ceramic or Nano Ceramic?</h2>
          <p>Both are signal safe and block up to 99% of UV. Nano Ceramic goes further on heat and clarity.</p>
        </div>
        <div className="compare-wrap" {...reveal("fade", 0.4)}>
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Ceramic</th>
                <th scope="col" className="is-popular">
                  Nano Ceramic <span className="pill price-badge">Signature</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([feature, ceramic, nano]) => (
                <tr key={feature}>
                  <th scope="row">{feature}</th>
                  <td>
                    <Cell value={ceramic} />
                  </td>
                  <td className="is-popular">
                    <Cell value={nano} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Shades() {
  return (
    <section className="section band-surface">
      <div className="wrap">
        <div className="head-row" {...reveal("slide", 0.3)}>
          <div className="head">
            <Eyebrow>Shade Guide</Eyebrow>
            <h2>How Dark Is Each Shade?</h2>
          </div>
          <p>The percentage is how much light gets through. We help you pick a shade that suits your vehicle and stays road legal.</p>
        </div>
        <ul className="shades">
          {SHADES.map((s, i) => (
            <li key={s.vlt} className="shade" {...reveal("slide", 0.3 + i * 0.08)}>
              <div className="shade-glass">
                <Image src={PHOTO.lakeside} alt="" fill sizes="(max-width: 767px) 50vw, 240px" />
                <span style={{ opacity: (100 - s.vlt) / 100 }} />
              </div>
              <strong>{s.vlt}%</strong>
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Installation</Eyebrow>
          <h2>Four Checks, Zero Bubbles</h2>
        </div>
        <ol className="process-row">
          {TINT_PROCESS.map((s, i) => (
            <li key={s.title} className="process-step" {...reveal("slide", 0.3 + i * 0.1)}>
              <span className="process-dot">
                <Icon name={s.icon} size={24} />
              </span>
              <span className="stage-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section band-surface">
      <div className="wrap faq-split">
        <div className="head faq-split-head" {...reveal("slide", 0.3)}>
          <Eyebrow>Tint FAQ</Eyebrow>
          <h2>Questions, Answered</h2>
          <p>Anything else? Call us on {CONTACT.phone}.</p>
        </div>
        <FaqList items={TINT_FAQ} />
      </div>
    </section>
  );
}
