import { ChevronDown, Phone } from "lucide-react";
import { cacheLife } from "next/cache";
import { getImageProps } from "next/image";
import Link from "next/link";
import { CONTACT, HOURS, NAV, SERVICES } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { Button, Flip, reveal } from "./ui";

// Art direction: dedicated mobile crop at <=767px. fetchPriority instead of preload so only one source loads.
export function HeroImage({ desktop, mobile, alt }: { desktop: string; mobile: string; alt: string }) {
  const common = { alt, fill: true, sizes: "(max-width: 1440px) 100vw, 1400px" };
  const { props: { srcSet: mobileSet } } = getImageProps({ ...common, src: mobile });
  const { props } = getImageProps({ ...common, src: desktop });
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSet} sizes={common.sizes} />
      <img {...props} alt={props.alt} className="hero-img" loading="eager" fetchPriority="high" />
    </picture>
  );
}

function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Auto Spa Kelowna home">
      <Flip>
        <span className="wordmark">
          <strong>Auto Spa</strong>
          <span>Kelowna</span>
        </span>
      </Flip>
    </Link>
  );
}

function CallLink({ className }: { className: string }) {
  return (
    <a href={CONTACT.tel} className={className}>
      <Flip>{CONTACT.phone}</Flip>
      <span className="nav-call-tile">
        <Phone size={16} strokeWidth={1.75} aria-hidden />
      </span>
    </a>
  );
}

export function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <Logo />
      <div className="nav-right">
        <div className="nav-pill frost">
          <button className="models-toggle" popoverTarget="services-menu">
            <Flip>Services</Flip>
            <ChevronDown className="dd-arrow" size={16} strokeWidth={1.75} aria-hidden />
          </button>
          <CallLink className="nav-call" />
        </div>
        <ThemeToggle />
        <button className="menu-btn frost" popoverTarget="site-menu" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
      <div id="services-menu" popover="auto" className="pop">
        {SERVICES.map((s) => (
          <Link key={s.name} href={s.href}>
            <Flip>{s.name}</Flip>
          </Link>
        ))}
      </div>
      <div id="site-menu" popover="auto" className="pop menu-panel">
        {NAV.map((p) => (
          <Link key={p.href} href={p.href} className="menu-link">
            <Flip>{p.label}</Flip>
          </Link>
        ))}
        <Button href="/contact" variant="secondary" className="btn-block">
          Book Now
        </Button>
        <CallLink className="nav-call nav-call-mobile" />
      </div>
    </nav>
  );
}

// Internal pages: nav sits above the hero instead of inside it.
export function InternalNav() {
  return (
    <header className="wrap internal-nav">
      <Nav />
    </header>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith("http");
  return (
    <Link href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
      <Flip>{children}</Flip>
    </Link>
  );
}

// Cached so the prerendered shell can show the current year without a dynamic Date read.
async function Year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap" {...reveal("fade", 0.3)}>
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>Ceramic coating, paint correction and detailing studio on Evans Court. Serving the Okanagan since day one.</p>
            <Button href="/contact" variant="secondary">
              Book Now
            </Button>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <span>Pages</span>
              {NAV.map((p) => (
                <FooterLink key={p.href} href={p.href}>
                  {p.label}
                </FooterLink>
              ))}
            </div>
            <div className="footer-col">
              <span>Hours</span>
              {HOURS.map((h) => (
                <p key={h.day} className="footer-hours">
                  {h.day}
                  <small>{h.time}</small>
                </p>
              ))}
            </div>
            <div className="footer-col">
              <span>Visit Us</span>
              <address>{CONTACT.address}</address>
              <FooterLink href={CONTACT.maps}>Get Directions</FooterLink>
            </div>
            <div className="footer-col">
              <span>Contact</span>
              <a href={CONTACT.tel}>
                <Flip>{CONTACT.phone}</Flip>
              </a>
              <a href={`mailto:${CONTACT.email}`}>
                <Flip>Email Us</Flip>
              </a>
              <FooterLink href={CONTACT.instagram}>Instagram</FooterLink>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © <Year /> Auto Spa Kelowna. All rights reserved.
          </p>
          <p>Serving {CONTACT.areas.join(", ")}.</p>
        </div>
      </div>
    </footer>
  );
}
