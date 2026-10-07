import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { asset, mainPages, modelNames, slug, socials } from "./content";
import { Button, Flip, reveal, SearchForm } from "./ui";

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
    <Link href="/" className="logo" aria-label="Rydex home">
      <Flip>
        <Image src={asset.logo} alt="" width={85} height={24} />
      </Flip>
    </Link>
  );
}

export function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <Logo />
      <div className="nav-right">
        <div className="nav-pill frost">
          <button className="models-toggle" popoverTarget="models-menu">
            <Flip>Models</Flip>
            <Image className="dd-arrow" src={asset.arrowDown} alt="" width={16} height={16} />
          </button>
          <SearchForm className="search" />
        </div>
        <button className="menu-btn frost" popoverTarget="site-menu" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
      <div id="models-menu" popover="auto" className="pop">
        {modelNames.map((name) => (
          <Link key={name} href={`/models/${slug(name)}`}>
            <Flip>{name}</Flip>
          </Link>
        ))}
      </div>
      <div id="site-menu" popover="auto" className="pop menu-panel">
        {mainPages.map((p) => (
          <Link key={p.label} href={p.href} className="menu-link">
            <Flip>{p.label}</Flip>
          </Link>
        ))}
        <Button href="/models" variant="secondary" className="btn-block">
          Book Now
        </Button>
        <SearchForm className="search search-mobile" />
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

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap" {...reveal("fade", 0.3)}>
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim in eros.</p>
            <Button href="/models" variant="secondary">
              Book Now
            </Button>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <span>Main Pages</span>
              {mainPages.map((p) => (
                <FooterLink key={p.label} href={p.href}>
                  {p.label}
                </FooterLink>
              ))}
            </div>
            <div className="footer-col">
              <span>Follow Us</span>
              {socials.map((s) => (
                <FooterLink key={s.label} href={s.href}>
                  {s.label}
                </FooterLink>
              ))}
            </div>
            <div className="footer-col">
              <span>Visit Us</span>
              <address>19 Jumeirah Beach Road, Umm Suqeim, UAE.</address>
            </div>
            <div className="footer-col">
              <span>Contact us</span>
              <a href="tel:+11234567890">
                <Flip>+1 (123) 456-7890</Flip>
              </a>
              <a href="mailto:info@rydex.com">
                <Flip>info@rydex.com</Flip>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Powered by{" "}
            <a href="https://webflow.com" target="_blank" rel="noopener noreferrer">
              Webflow
            </a>{" "}
            Designed by{" "}
            <a href="https://webflow.com/templates/designers/am-templates" target="_blank" rel="noopener noreferrer">
              AM Templates
            </a>
          </p>
          <div className="footer-legal">
            <FooterLink href="/style-guide">Style Guide</FooterLink>
            <FooterLink href="/licenses">Licenses</FooterLink>
            <FooterLink href="/changelog">Changelog</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
