"use server";

import { BOOKABLE, CONTACT, slotMinutes, slotsFor } from "../brand";

type Values = Record<string, string>;
export type BookingState = { status: "idle" | "success" | "error" | "unavailable"; message?: string; values?: Values };

const EMAIL = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;
const PHONE = /^[+()\-. \d]{7,20}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const CONTROL = /[\u0000-\u001f\u007f]/g;
const MAX_DAYS_AHEAD = 120;
const DAY_MS = 86_400_000;
const SHOP_ZONE = "America/Vancouver";
const FIELDS = ["service", "date", "time", "firstName", "lastName", "email", "phone", "vehicle"] as const;

// Single-line fields lose control characters so they cannot forge lines in the plain-text email.
const clean = (value: string) => value.replace(CONTROL, " ").trim();

// Date and minutes-since-midnight right now at the shop, independent of server and visitor time zones.
function shopNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SHOP_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function validate(values: Values) {
  if (!BOOKABLE.includes(values.service) || !ISO_DATE.test(values.date)) return false;

  // Noon UTC keeps the weekday stable across time zones.
  const day = new Date(`${values.date}T12:00:00Z`);
  const now = shopNow();
  const daysAhead = (day.getTime() - new Date(`${now.date}T12:00:00Z`).getTime()) / DAY_MS;
  if (Number.isNaN(daysAhead) || daysAhead < 0 || daysAhead > MAX_DAYS_AHEAD) return false;
  if (!slotsFor(day.getUTCDay()).includes(values.time)) return false;
  if (daysAhead === 0 && slotMinutes(values.time) <= now.minutes) return false;

  if ([values.firstName, values.lastName].some((n) => n.length === 0 || n.length > 100)) return false;
  if (!EMAIL.test(values.email) || values.email.length > 256) return false;
  if (!PHONE.test(values.phone) || values.phone.replace(/\D/g, "").length < 7) return false;
  return values.vehicle.length <= 2000;
}

export async function requestBooking(_prev: BookingState, form: FormData): Promise<BookingState> {
  // Honeypot: hidden from people (display: none), so any value means a bot. Accept quietly, send nothing.
  // ponytail: honeypot only; add Turnstile or per-IP rate limiting if spam reaches the inbox.
  if (String(form.get("bk_hp_7f2") ?? "")) return { status: "success" };

  const values = Object.fromEntries(
    FIELDS.map((name) => {
      const raw = String(form.get(name) ?? "");
      return [name, name === "vehicle" ? raw.trim() : clean(raw)];
    }),
  ) as Values;
  // Echo values back so React's post-action form reset does not wipe what the visitor typed.
  if (!validate(values)) return { status: "error", message: "Please check your details and try again.", values };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // ponytail: email is the only delivery path. Without a key we say so instead of faking a booking.
    return { status: "unavailable", message: `Online booking is not connected yet. Please call ${CONTACT.phone} and we will book you in.`, values };
  }

  const text = [
    `Service: ${values.service}`,
    `Requested: ${values.date} at ${values.time}`,
    `Name: ${values.firstName} ${values.lastName}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    "",
    "Vehicle details:",
    values.vehicle || "(none given)",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM || "Auto Spa Kelowna <onboarding@resend.dev>",
        to: [process.env.BOOKING_TO || CONTACT.email],
        reply_to: values.email,
        subject: `Booking request: ${values.service}, ${values.date} ${values.time}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return { status: "success" };
  } catch (error) {
    console.error("Booking email failed:", error);
    return { status: "error", message: `We could not send your request. Please call ${CONTACT.phone}.`, values };
  }
}
