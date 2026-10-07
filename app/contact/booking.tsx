"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useActionState, useState, useSyncExternalStore } from "react";
import { BOOKABLE, slotsFor } from "../brand";
import { type BookingState, requestBooking } from "./actions";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric" });
const LONG_DATE = new Intl.DateTimeFormat("en-CA", { weekday: "long", month: "long", day: "numeric" });

const pad = (n: number) => String(n).padStart(2, "0");
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// "Today" only exists in the browser; the server renders a placeholder, so no hydration mismatch.
const noSubscribe = () => () => {};
const useToday = () =>
  useSyncExternalStore(
    noSubscribe,
    () => isoDate(new Date()),
    () => null,
  );

const initial: BookingState = { status: "idle" };

export function Booking() {
  const today = useToday();
  const [state, action, isPending] = useActionState(requestBooking, initial);
  const [step, setStep] = useState<"schedule" | "details">("schedule");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [monthOffset, setMonthOffset] = useState(0);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <div>
          <Check className="line-icon" size={40} aria-hidden />
          Request sent. We will confirm {service} on {LONG_DATE.format(fromIso(date))} at {time} by phone or email.
        </div>
      </div>
    );
  }

  if (!today) return <div className="card booking booking-loading">Loading calendar…</div>;

  const start = fromIso(today);
  const view = new Date(start.getFullYear(), start.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array<null>(view.getDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];
  const slots = date ? slotsFor(fromIso(date).getDay()) : [];

  return (
    <form action={action} className="card booking">
      <p className="booking-steps">
        <span aria-current={step === "schedule" ? "step" : undefined}>1. Pick a time</span>
        <span aria-current={step === "details" ? "step" : undefined}>2. Your details</span>
      </p>

      <input type="hidden" name="service" value={service} />
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="time" value={time} />
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden />

      {step === "schedule" ? (
        <>
          <select className="field" value={service} onChange={(e) => setService(e.target.value)} aria-label="Service" required>
            <option value="">Select a service…</option>
            {BOOKABLE.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <div className="booking-grid">
            <div className="cal">
              <div className="cal-head">
                <button type="button" className="cal-nav" onClick={() => setMonthOffset((m) => m - 1)} disabled={monthOffset === 0} aria-label="Previous month">
                  <ChevronLeft size={18} aria-hidden />
                </button>
                <span>{MONTH.format(view)}</span>
                <button type="button" className="cal-nav" onClick={() => setMonthOffset((m) => m + 1)} disabled={monthOffset >= 3} aria-label="Next month">
                  <ChevronRight size={18} aria-hidden />
                </button>
              </div>
              <div className="cal-grid">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="cal-weekday" aria-hidden>
                    {w}
                  </span>
                ))}
                {cells.map((d, i) => {
                  if (!d) return <span key={`blank-${i}`} />;
                  const iso = isoDate(d);
                  const isClosed = iso < today || slotsFor(d.getDay()).length === 0;
                  return (
                    <button
                      key={iso}
                      type="button"
                      className="cal-day"
                      disabled={isClosed}
                      aria-pressed={iso === date}
                      aria-label={LONG_DATE.format(d)}
                      onClick={() => {
                        setDate(iso);
                        setTime("");
                      }}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="slots">
              <span className="eyebrow">{date ? LONG_DATE.format(fromIso(date)) : "Choose a date"}</span>
              <div className="slot-list">
                {slots.map((s) => (
                  <button key={s} type="button" className="slot" aria-pressed={s === time} onClick={() => setTime(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button type="button" className="form-button" disabled={!service || !date || !time} onClick={() => setStep("details")}>
            Continue
          </button>
        </>
      ) : (
        <>
          <p className="booking-summary">
            {service} · {LONG_DATE.format(fromIso(date))} at {time}
          </p>
          <div className="contact-fields">
            <input className="field" name="firstName" placeholder="First Name" aria-label="First name" autoComplete="given-name" required maxLength={100} />
            <input className="field" name="lastName" placeholder="Last Name" aria-label="Last name" autoComplete="family-name" required maxLength={100} />
            <input className="field" name="email" type="email" placeholder="Email Address" aria-label="Email address" autoComplete="email" required maxLength={256} />
            <input className="field" name="phone" type="tel" placeholder="Phone Number" aria-label="Phone number" autoComplete="tel" required maxLength={20} />
            <textarea className="field" name="vehicle" placeholder="Year, make, model and anything we should know" aria-label="Vehicle details" maxLength={2000} />
          </div>
          <div className="booking-actions">
            <button type="button" className="form-button ghost" onClick={() => setStep("schedule")}>
              Back
            </button>
            <button type="submit" className="form-button" disabled={isPending}>
              {isPending ? "Sending…" : "Request Booking"}
            </button>
          </div>
        </>
      )}

      {(state.status === "error" || state.status === "unavailable") && (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
