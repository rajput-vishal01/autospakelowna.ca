import { Phone } from "lucide-react";
import { cacheLife } from "next/cache";
import { getImageProps } from "next/image";
import Link from "next/link";
import { CONTACT, HOURS, NAV } from "./brand";
import { NavLinks } from "./nav-links";
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

const MENU_ID = "mobile-menu";

// One sticky header for every page: plain visible links, the phone number and a Book button. No hidden menus on desktop.
export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Logo />
        <nav className="header-nav" aria-label="Main">
          <NavLinks className="header-link" />
        </nav>
        <div className="header-actions">
          <a href={CONTACT.tel} className="header-call">
            <Phone size={18} strokeWidth={1.75} aria-hidden />
            <span>{CONTACT.phone}</span>
          </a>
          <ThemeToggle />
          <Link href="/contact" className="header-book">
            Book Now
          </Link>
          <button className="menu-btn" popoverTarget={MENU_ID} aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div id={MENU_ID} popover="auto" className="mobile-menu">
        <nav aria-label="Mobile">
          <NavLinks className="mobile-link" closesMenu={MENU_ID} />
        </nav>
        <div className="mobile-actions">
          <Button href="/contact" className="btn-block">
            Book Now
          </Button>
          <a href={CONTACT.tel} className="btn btn-secondary btn-block">
            <Flip>{`Call ${CONTACT.phone}`}</Flip>
            <span className="btn-tile">
              <Phone size={18} strokeWidth={1.75} aria-hidden />
            </span>
          </a>
        </div>
      </div>
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
