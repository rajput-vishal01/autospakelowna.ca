# Design Lock — Auto Spa Kelowna

The UI is **locked** to the Rydex template rebuild (commits `c9f3bef`..`90f97d7` on `feat/rydex-site`).
New pages and sections must be composed from the existing components and CSS classes below.
**Only colors may change.** Do not change fonts, type scale, spacing, radii, layout, breakpoints, or motion.

## Locked

- **Font:** Figtree (`next/font/google`), body 300 16px/150%; h1 600, h2/h3 500; display numerals and names 400.
- **Type scale** (`--h1/--h2/--h3/--xxl/--xl/--lg`) and its four breakpoints: ≥992, ≤991, ≤767, ≤479.
- **Spacing and containers:** `.wrap` (max 1355, padding 20/16), `.wrap-lg` (1440), `.section` (100/80 vertical).
- **Radii:** 16 (cards and media), 12 (controls), 8 (button tiles), 100 (pills and bars).
- **Components:** `.eyebrow` (bar + uppercase label); `.btn` primary/secondary with the arrow tile; `Flip` text-roll hover; `Arrows`; frosted popover nav (`Nav`, `InternalNav`); hero card with art-directed image and 48% tint; `Odometer` counters; sticky `.model-card` deck; `.benefit` rim-light cards; `.tm` testimonial parallax/marquee; `.steps` timeline; `.blog` accordion cards; `.about-split` with image reveal; `.marquee` logo strip; `.metric-card`; `.team` grid; `.showroom` card; contact form and `.method` cards; footer.
- **Motion:** reveal presets (slide/fade/grow/image/zoom), hover timings (300ms ease), counters (2s circ), scroll-driven deck/parallax/fill, marquees, custom cursor (desktop and mouse only). Reduced motion is respected.

## Color theme (the only thing that changes)

The brand is red and black on white. Light mode is the default and a dark mode toggle is provided.
All color goes through the semantic tokens in `app/globals.css`. Components never use raw hex values.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--bg` | page background | white | near-black |
| `--surface` | cards, fields | off-white | charcoal |
| `--border` | card borders, hairlines | light grey | dark grey |
| `--text` | body text | dark grey | light grey |
| `--heading` | headings, strong text | black | white |
| `--muted` | secondary meta text | mid grey | mid grey |
| `--accent` | eyebrows, primary buttons, symbols, timeline, pills, cursor | brand red | brand red (lifted) |
| `--on-accent` | text and icons on an accent fill | white | white |
| `--on-image` | text over photos (always over the dark tint) | white | white |

Text over photos stays white in both modes because those surfaces always carry the dark tint overlay.
