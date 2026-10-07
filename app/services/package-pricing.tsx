"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { PACKAGES, VEHICLE_CLASSES } from "../brand";
import { Button } from "../ui";

// Detailing packages as pricing cards; one size switch updates all three prices.
export function PackagePricing() {
  const [size, setSize] = useState(0);
  return (
    <div className="pricing">
      <fieldset className="size-switch">
        <legend className="sr-only">Vehicle size</legend>
        {VEHICLE_CLASSES.map((label, i) => (
          <label key={label} className="size-option">
            <input type="radio" name="vehicle-size" checked={size === i} onChange={() => setSize(i)} />
            {label}
          </label>
        ))}
      </fieldset>
      <div className="pricing-grid">
        {PACKAGES.map((p) => (
          <article key={p.name} className={`card price-card${p.popular ? " is-popular" : ""}`}>
            {p.popular && <span className="pill price-badge">Most Booked</span>}
            <div className="stack">
              <span className="eyebrow">{p.kind}</span>
              <h3>{p.name}</h3>
              <p>{p.blurb}</p>
            </div>
            <p className="price-big" aria-live="polite">
              {p.prices[size]}
              <small>{VEHICLE_CLASSES[size]}</small>
            </p>
            <div className="price-lists">
              {[
                { label: "Interior", items: p.interior },
                { label: "Exterior", items: p.exterior },
              ].map(({ label, items }) => (
                <div key={label} className="stack">
                  <span className="price-list-label">{label}</span>
                  <ul className="checklist">
                    {items.map((item) => (
                      <li key={item}>
                        <Check size={18} strokeWidth={1.75} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Button href="/contact" variant={p.popular ? "primary" : "secondary"} className="btn-block">
              Book This Package
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
