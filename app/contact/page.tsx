import { Camera, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { HoursList, PageHeader } from "../blocks";
import { CONTACT, MAP_EMBED } from "../brand";
import { Effects } from "../effects";
import { Flip, reveal } from "../ui";
import { Booking } from "./booking";

export const metadata: Metadata = {
  title: "Book a Detail",
  description:
    "Book ceramic coating, paint correction, detailing or window tint at Auto Spa Kelowna. Pick a service and time online, or call (236) 660-7227.",
  alternates: { canonical: "/contact" },
};

const METHODS = [
  { label: "Call or text", value: CONTACT.phone, href: CONTACT.tel, Icon: Phone },
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, Icon: Mail },
  { label: "Visit", value: CONTACT.address, href: CONTACT.maps, Icon: MapPin },
  { label: "Instagram", value: "@auto_spa_kelowna", href: CONTACT.instagram, Icon: Camera },
];

export default function ContactPage() {
  return (
    <>
      <main>
        <PageHeader
          eyebrow="Book and Contact"
          title="Book Your Detail"
          intro="Pick a service and a time and we confirm by phone or email within business hours. Prefer to talk? Call us."
        />
        <section className="section">
          <div className="wrap contact-layout">
            <div className="contact-booking" {...reveal("slide", 0.3)}>
              <Booking />
            </div>
            <aside className="contact-aside" {...reveal("slide", 0.4)}>
              <ul className="card contact-list">
                {METHODS.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a href={href} {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
                      <Icon className="line-icon" size={22} strokeWidth={1.5} aria-hidden />
                      <span>
                        <small>{label}</small>
                        <Flip>{value}</Flip>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="card contact-hours">
                <span className="eyebrow">Opening Hours</span>
                <HoursList />
              </div>
              <div className="map-frame contact-map">
                <iframe src={MAP_EMBED} title="Map to Auto Spa Kelowna, 715 Evans Ct" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Effects />
    </>
  );
}
