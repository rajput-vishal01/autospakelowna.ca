// Assets are hotlinked from the Rydex Webflow template CDN; swap for licensed assets before launch.
const SITE = "https://cdn.prod.website-files.com/6856afca69c1086451cbfd3c/";
const CMS = "https://cdn.prod.website-files.com/686b7dabffa8d3d4fbc33439/";

export const asset = {
  logo: SITE + "6863a7d749380244400cadf0_ec84ea29b2cc7723b4b9b2449bd3b59c_logo.svg",
  favicon: SITE + "686a756330bafc8b53c9c568_favicon.svg",
  heroDesktop: SITE + "6867580e8c3ea59bc8be0567_c37a5846c76d515300a0ec5a573c45fd_home-hero-image.webp",
  heroMobile: SITE + "68693eff1f14ac6704da31bf_home-hero-mobile.webp",
  arrowDown: SITE + "68695011fff14c231d733695_18e4deb9ce7150d6021fead5b7f630a7_arrow-bottom-icon.svg",
  arrowRight: SITE + "6864d28d6d224cfc617cfc39_0b76b173af6046e3baff3b231d198b2e_arrow-right-icon.svg",
  heroArrow: SITE + "6867dee03e172481e1f00bf9_arrow-right-icon-2.svg",
  search: SITE + "6863c31c858fd885f509661a_ff0b876f91a11c59842f17cb785c89af_search-icon.svg",
};

export const slug = (name: string) => name.toLowerCase().replaceAll(" ", "-");

export const modelNames = [
  "Rapt Horizon",
  "Velocit Crest",
  "Xplorer Glide",
  "Cest Tunder",
  "Glide Vortex",
  "Sumit Senity",
  "Senity Pulse",
];

export const mainPages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Models", href: "/models" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

type Digits = { dir: "up" | "down"; digits: string };
export type Metric = { value: string; label: string; parts: (Digits | string)[]; symbol: string };

// Odometer columns: "up" rolls 0 -> -90%, "down" rolls -90% -> 0. Sequences are hand-authored in the source.
export const metrics: Metric[] = [
  {
    value: "2.5K+",
    label: "Total Bookings",
    parts: [{ dir: "up", digits: "2345678012" }, ".", { dir: "down", digits: "5678012345" }],
    symbol: "K+",
  },
  {
    value: "300+",
    label: "Models In Stock",
    parts: [
      { dir: "up", digits: "3456780123" },
      { dir: "down", digits: "0123456790" },
      { dir: "up", digits: "0123456790" },
    ],
    symbol: "+",
  },
  {
    value: "99%",
    label: "Happy Clients",
    parts: [
      { dir: "up", digits: "9023456789" },
      { dir: "down", digits: "9023456789" },
    ],
    symbol: "%",
  },
  {
    value: "50+",
    label: "Daily Bookings",
    parts: [
      { dir: "up", digits: "5432101235" },
      { dir: "down", digits: "0123456790" },
    ],
    symbol: "+",
  },
];

const brands = {
  Velox: CMS + "688743ce33633af956b114dd_velox.svg",
  Aurion: CMS + "688743d9b6babee061ccd02f_aurion.svg",
};

export const featured = [
  { name: "Rapt Horizon", brand: "Velox", image: CMS + "686f7eca3b34d2e8df938a4b_raptor-horizon.webp", specs: ["$130", "2,100 KM", "990 HP", "6.5 L"] },
  { name: "Velocit Crest", brand: "Aurion", image: CMS + "686f7df608019c9b041ab7db_velocity-crest.webp", specs: ["$110", "1,800 KM", "860 HP", "5.0 L"] },
  { name: "Xplorer Glide", brand: "Velox", image: CMS + "686f7c9896946e6903f1ce81_xplorer-glide.webp", specs: ["$120", "3,400 KM", "670 HP", "6.0 L"] },
  { name: "Glide Vortex", brand: "Aurion", image: CMS + "686f7a28adef37939d8c0ebc_glide-vortex.webp", specs: ["$100", "4,300 KM", "490 HP", "5.0 L"] },
].map((m) => ({ ...m, brandLogo: brands[m.brand as keyof typeof brands] }));

export const specLabels = ["Daily Rental", "Mileage", "Horsepower", "Engine"];

const benefitBody = "Duis cursus, mi quis viverra ornare, eros dolor inter nulla, ut commodo diam libero vitae erat.";
export const benefits = [
  { title: "Luxurious Car Rentals", icon: SITE + "68737ff565d4ed3a72b4625f_car-icon.svg" },
  { title: "Easy Booking Process", icon: SITE + "68726379e2e877525736aaf7_61057b4aa37b9c6e8b2141654222eea1_calendar-icon.svg" },
  { title: "Flexible Pricing Plans", icon: SITE + "68737ff248edde385bfcbb17_dollar-sign-icon.svg" },
  { title: "Well-Maintained Fleet", icon: SITE + "68737ff9825fc4da4ba560f0_wrench-icon.svg" },
].map((b) => ({ ...b, body: benefitBody }));

const people = {
  daniel: { name: "Daniel Harper", city: "Dubai", avatar: SITE + "6877841d5571d30752f74441_daniel-harper.webp", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique." },
  james: { name: "James Carter", city: "Abu Dhabi", avatar: SITE + "6877841d6776098fc68a9be8_james-carter.webp", quote: "Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat." },
  emily: { name: "Emily Sanders", city: "Ajman", avatar: SITE + "6877841d342c1be1a06717d1_emily-sanders.webp", quote: "Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere." },
  thomas: { name: "Thomas Reid", city: "Fujairah", avatar: SITE + "6877841c106d359778209e34_thomas-reid.webp", quote: "Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum." },
  micheal: { name: "Micheal Brooks", city: "Sharjah", avatar: SITE + "6877841c9a6a6148ea0a7fc1_michael-brooks.webp", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis." },
  laura: { name: "Laura Bennett", city: "Abu Dhabi", avatar: SITE + "6877841d106d359778209e56_laura-bennett.webp", quote: "Nunc ut sem vitae risus tristique posuere. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet." },
};

// Duplicates are intentional: they keep the parallax/marquee gap-free.
export const testimonialColumns = [
  [people.daniel, people.james, people.emily, people.thomas],
  [people.micheal, people.thomas, people.laura, people.daniel],
  [people.james, people.emily, people.micheal, people.thomas],
];

const stepBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.";
export const steps = [
  { title: "Browse Our Elite Fleet", icon: SITE + "6878012c165fbb2fa619cb69_cf22eead6b6e805aaf939c451a13e5a5_search-icon-2.svg" },
  { title: "Pick Your Ideal Vehicle", icon: SITE + "68780433062702462d7f9e91_car-icon-2.svg" },
  { title: "Submit Your Enquiry", icon: SITE + "687802cb9e4dec5a31dc29e2_5bddcb5577bd6b27ee12d8ea2d5d1c15_mail-icon.svg" },
  { title: "Collect and Drive Away", icon: SITE + "687802bc131b4ab98f75125e_5c2ac720544a962571a8a5f657a2a4cf_key-icon.svg" },
].map((s) => ({ ...s, body: stepBody }));

export const posts = [
  { title: "Guide To Choose The Right Car In A Showroom", category: "Guides", image: CMS + "68761dfb6d400a6cc38ce421_blog-post-5.webp" },
  { title: "Rydex Hosts Annual Auto Racing Grand Event", category: "Events", image: CMS + "68761ef1d4364172cee2ec96_blog-post-2.webp" },
  { title: "Guides For Maintaining Your Rental Car Perfectly", category: "Guides", image: CMS + "68761ea1da6c070f5de9f9b1_blog-post-3.webp" },
].map((p) => ({ ...p, href: `/blog/${slug(p.title)}` }));

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Twitter (X)", href: "https://x.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];
