import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { CONTACT, HOURS } from "../brand";
import { Effects } from "../effects";
import { InternalNav } from "../site";
import { Eyebrow, reveal } from "../ui";
import { Booking } from "./booking";

export const metadata: Metadata = {
  title: "Book a Detail",
  description:
    "Book ceramic coating, paint correction, detailing or window tint at Auto Spa Kelowna. Pick a service and time online, or call (236) 660-7227.",
  alternates: { canonical: "/contact" },
};

const METHODS = [
  { label: CONTACT.phone, note: "Call or text, Monday to Saturday", href: CONTACT.tel, Icon: Phone },
  { label: "Email Us", note: CONTACT.email, href: `mailto:${CONTACT.email}`, Icon: Mail },
  { label: "Get Directions", note: CONTACT.address, href: CONTACT.maps, Icon: MapPin },
];

export default function ContactPage() {
  return (
    <>
      <InternalNav />
      <main className="section">
        <div className="wrap">
          <div className="head head-center contact-head" {...reveal("slide", 0.4)}>
            <Eyebrow>Book and Contact</Eyebrow>
            <h1>Book Your Detail</h1>
            <p>Pick a service and a time. We confirm by phone or email within business hours, with a fixed quote after inspection.</p>
          </div>
          <div className="contact">
            <div {...reveal("slide", 0.5)}>
              <Booking />
            </div>
            <div className="contact-methods">
              {METHODS.map((m, i) => (
                <a
                  key={m.label}
                  href={m.href}
                  className="card method"
                  {...(m.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  {...reveal("fade", 0.6 + i * 0.1)}
                >
                  <m.Icon className="line-icon" size={28} strokeWidth={1.5} aria-hidden />
                  <span className="method-info">
                    <span className="medium">{m.label}</span>
                    <span className="method-note">{m.note}</span>
                  </span>
                </a>
              ))}
            </div>
            <ul className="card hours" {...reveal("fade", 0.6)}>
              {HOURS.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <span className="price">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Effects />
    </>
  );
}
