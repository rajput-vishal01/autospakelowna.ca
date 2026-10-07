"use server";

import { BOOKABLE, CONTACT, slotsFor } from "../brand";

export type BookingState = { status: "idle" | "success" | "error" | "unavailable"; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\-.\s\d]{7,20}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 86_400_000;

const read = (form: FormData, name: string) => String(form.get(name) ?? "").trim();

function validate(form: FormData) {
  const booking = {
    service: read(form, "service"),
    date: read(form, "date"),
    time: read(form, "time"),
    firstName: read(form, "firstName"),
    lastName: read(form, "lastName"),
    email: read(form, "email"),
    phone: read(form, "phone"),
    vehicle: read(form, "vehicle"),
  };
  if (!BOOKABLE.includes(booking.service)) return null;
  if (!ISO_DATE.test(booking.date)) return null;

  // Noon UTC keeps the weekday stable across time zones.
  const day = new Date(`${booking.date}T12:00:00Z`);
  if (Number.isNaN(day.getTime()) || day.getTime() < Date.now() - DAY_MS) return null;
  if (!slotsFor(day.getUTCDay()).includes(booking.time)) return null;

  const names = [booking.firstName, booking.lastName];
  if (names.some((n) => n.length === 0 || n.length > 100)) return null;
  if (!EMAIL.test(booking.email) || booking.email.length > 256) return null;
  if (!PHONE.test(booking.phone)) return null;
  if (booking.vehicle.length > 2000) return null;
  return booking;
}

export async function requestBooking(_prev: BookingState, form: FormData): Promise<BookingState> {
  // Honeypot: real people never see this field, so a value means a bot. Pretend success, send nothing.
  if (read(form, "company")) return { status: "success" };

  const booking = validate(form);
  if (!booking) return { status: "error", message: "Please check the highlighted details and try again." };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // ponytail: email delivery is the only backend. Without a key we say so instead of faking a booking.
    return { status: "unavailable", message: `Online booking is not connected yet. Please call ${CONTACT.phone} and we will book you in.` };
  }

  const text = [
    `Service: ${booking.service}`,
    `Requested: ${booking.date} at ${booking.time}`,
    `Name: ${booking.firstName} ${booking.lastName}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    "",
    booking.vehicle || "(no vehicle details given)",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM ?? "Auto Spa Kelowna <onboarding@resend.dev>",
        to: [process.env.BOOKING_TO ?? CONTACT.email],
        reply_to: booking.email,
        subject: `Booking request: ${booking.service}, ${booking.date} ${booking.time}`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return { status: "success" };
  } catch (error) {
    console.error("Booking email failed:", error);
    return { status: "error", message: `We could not send your request. Please call ${CONTACT.phone}.` };
  }
}
