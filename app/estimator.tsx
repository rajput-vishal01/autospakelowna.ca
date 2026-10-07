"use client";

import { useState } from "react";
import { COATINGS, PAINT_CONDITION } from "./brand";
import { Button, Eyebrow } from "./ui";

const toNumber = (price: string) => Number(price.replace(/\D/g, ""));
const CAD = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

// Coating estimate from published prices only. Real quote follows inspection.
export function Estimator() {
  const [term, setTerm] = useState(1); // 5-Year Elite, the most booked
  const [condition, setCondition] = useState(0);
  const total = toNumber(COATINGS[term].price) + PAINT_CONDITION[condition].add;

  return (
    <div className="card estimator">
      <div className="estimator-options">
        <fieldset>
          <legend className="eyebrow">1. Protection</legend>
          <div className="choice-grid">
            {COATINGS.map((c, i) => (
              <label key={c.name} className="choice">
                <input type="radio" name="term" checked={term === i} onChange={() => setTerm(i)} />
                <span className="choice-title">{c.years}</span>
                <span className="choice-note">{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="eyebrow">2. Paint condition</legend>
          <div className="choice-grid three">
            {PAINT_CONDITION.map((p, i) => (
              <label key={p.label} className="choice">
                <input type="radio" name="condition" checked={condition === i} onChange={() => setCondition(i)} />
                <span className="choice-title">{p.label}</span>
                <span className="choice-note">{p.add ? `${p.stage}, +$${p.add}` : `${p.stage}, included`}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="estimator-total">
        <Eyebrow>Estimated Investment</Eyebrow>
        <output className="estimator-price" aria-live="polite">
          {CAD.format(total)}
        </output>
        <p>
          {COATINGS[term].years} {COATINGS[term].name} with {PAINT_CONDITION[condition].stage.toLowerCase()}, sedan or coupe.
          Larger vehicles and the final fixed quote come after inspection.
        </p>
        <Button href="/contact" className="btn-block">
          Book an Inspection
        </Button>
      </div>
    </div>
  );
}
