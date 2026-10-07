import { ChevronDown, Clock, MapPin, Phone, ReceiptText, Star } from "lucide-react";
import type { ReactNode } from "react";
import { CONTACT, HOURS, MAP_EMBED } from "./brand";
import { Button, Eyebrow, Flip, reveal } from "./ui";

/* Shared sections. Same visual language as the rest of the site (cards, eyebrows, buttons, tokens). */

// Compact text-first page header for inner pages, so they do not all open with a photo card like Home.
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="page-header">
      <div className="wrap page-header-inner" {...reveal("slide", 0.2)}>
        <div className="head">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
        </div>
        <div className="page-header-side">
          <p>{intro}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  { Icon: Star, title: "5.0 on Google", note: "Rated by Okanagan drivers" },
  { Icon: ReceiptText, title: "Fixed Quotes", note: "The price we quote is the price" },
  { Icon: Clock, title: "Open 6 Days", note: "Mon to Fri 7 to 8, Sat 10 to 4" },
  { Icon: MapPin, title: "Evans Court Studio", note: "Kelowna, BC" },
];

// Quick reassurance row right under the home hero.
export function TrustStrip() {
  return (
    <section className="trust">
      <ul className="wrap trust-list">
        {TRUST.map(({ Icon, title, note }, i) => (
          <li key={title} className="trust-item" {...reveal("fade", 0.2 + i * 0.1)}>
            <Icon className="line-icon" size={24} strokeWidth={1.5} aria-hidden />
            <span>
              <strong>{title}</strong>
              {note}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} className="card faq-item" {...reveal("slide", 0.3 + i * 0.05)}>
          <summary>
            <h3>{item.q}</h3>
            <ChevronDown className="faq-icon" size={22} strokeWidth={1.75} aria-hidden />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function HoursList() {
  return (
    <ul className="hours-list">
      {HOURS.map((h) => (
        <li key={h.day}>
          <span>{h.day}</span>
          <strong>{h.time}</strong>
        </li>
      ))}
    </ul>
  );
}

// Map, hours and service areas in one place.
export function FindUs({ eyebrow = "Find Us", title = "Visit the Studio" }: { eyebrow?: string; title?: string }) {
  return (
    <section className="section">
      <div className="wrap find-us">
        <div className="find-us-info" {...reveal("slide", 0.3)}>
          <div className="head">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{title}</h2>
          </div>
          <a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" className="find-us-address">
            <MapPin className="line-icon" size={22} strokeWidth={1.5} aria-hidden />
            <Flip>{CONTACT.address}</Flip>
          </a>
          <HoursList />
          <div className="area-pills" aria-label="Service areas">
            {CONTACT.areas.map((area) => (
              <span key={area} className="area-pill">
                {area}
              </span>
            ))}
          </div>
        </div>
        <div className="map-frame" {...reveal("fade", 0.4)}>
          <iframe src={MAP_EMBED} title="Map to Auto Spa Kelowna, 715 Evans Ct" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

// Closing call to action: one clear next step, plus the phone for people who would rather talk.
export function CtaBand({ title = "Ready for a finish you can measure?" }: { title?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta-band" {...reveal("grow")}>
          <div className="head">
            <Eyebrow>Book the Bay</Eyebrow>
            <h2>{title}</h2>
          </div>
          <div className="cta-actions">
            <Button href="/contact">Book Online</Button>
            <a href={CONTACT.tel} className="btn btn-secondary">
              <Flip>{`Call ${CONTACT.phone}`}</Flip>
              <span className="btn-tile">
                <Phone size={18} strokeWidth={1.75} aria-hidden />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
