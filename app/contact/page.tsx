import type { Metadata } from "next";
import Image from "next/image";
import { contactMethods } from "../content";
import { Effects } from "../effects";
import { InternalNav } from "../site";
import { Eyebrow, reveal } from "../ui";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact | Rydex" };

export default function ContactPage() {
  return (
    <>
      <InternalNav />
      <main className="section">
        <div className="wrap">
          <div className="head head-center contact-head" {...reveal("slide", 0.4)}>
            <Eyebrow>Contact Us</Eyebrow>
            <h1>Get In Touch</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique duis cursus
            </p>
          </div>
          <div className="contact">
            <div {...reveal("slide", 0.5)}>
              <ContactForm />
            </div>
            <div className="contact-methods">
              {contactMethods.map((m, i) => (
                <a
                  key={m.label}
                  href={m.href}
                  className="card method"
                  {...(m.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  {...reveal("fade", 0.6 + i * 0.1)}
                >
                  <Image src={m.icon} alt="" width={28} height={28} />
                  <span className="method-info">
                    <span className="medium">{m.label}</span>
                    <span className="method-note">{m.note}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Effects />
    </>
  );
}
