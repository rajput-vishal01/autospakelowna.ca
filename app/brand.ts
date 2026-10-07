/* Auto Spa Kelowna business facts and copy. Facts follow D:\syncai\autospa-2\doc\brand.md;
   copy is rewritten for this site (measured tone, Canadian spelling, no emoji, no em-dashes). */

export const SITE = "https://autospakelowna.ca";

export const CONTACT = {
  phone: "(236) 660-7227",
  tel: "tel:+12366607227",
  email: "autospakelowna@gmail.com",
  address: "715 Evans Ct, Kelowna, BC V1X 6G4",
  maps: "https://maps.app.goo.gl/qfECSqDgwQ8Q48AL8",
  instagram: "https://www.instagram.com/auto_spa_kelowna/",
  areas: ["Kelowna", "West Kelowna", "Lake Country", "Peachland", "Vernon"],
};

export const HOURS = [
  { day: "Monday to Friday", time: "7am to 8pm" },
  { day: "Saturday", time: "10am to 4pm" },
  { day: "Sunday", time: "Closed" },
];

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Window Tinting", href: "/tinting" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ---------- Photos (Unsplash placeholders until the shop supplies its own) ---------- */
const unsplash = (id: string, w = 1600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=80`;

export const PHOTO = {
  // Dark garage shot: white hero text needs a dark photo behind it.
  heroDesktop: unsplash("1626621394541-b9a48e35a95d", 2000),
  heroMobile: unsplash("1626621394541-b9a48e35a95d", 800, 1400),
  pressureWash: unsplash("1520340356584-f9917d1eea6f"),
  silhouette: unsplash("1645400379459-f6fd3d963fd4"),
  microfibre: unsplash("1761934657948-708146148588"),
  sprayDetail: unsplash("1652987086612-d948b775d358"),
  handWash: unsplash("1607860108855-64acf2078ed9"),
  handWashMobile: unsplash("1607860108855-64acf2078ed9", 800, 1400),
  blueMuscle: unsplash("1552519507-da3b142c6e3d"),
  blackPorsche: unsplash("1503376780353-7e6692767b70"),
  whiteSedan: unsplash("1555215695-3004980ad54e"),
  whiteSedanMobile: unsplash("1555215695-3004980ad54e", 800, 1400),
  greyCoupe: unsplash("1580273916550-e323be2ae537"),
  hypercar: unsplash("1544636331-e26879cd4d9b"),
  hypercarMobile: unsplash("1544636331-e26879cd4d9b", 800, 1400),
  lakeside: unsplash("1601362840469-51e4d8d58785"),
  whiteCoupe: unsplash("1605515298946-d062f2e9da53"),
  truck: unsplash("1601252300554-4ad551483bd2", 1200),
  boat: unsplash("1738551402486-7fc7d688b9d2", 1200),
  rv: unsplash("1513311068348-19c8fbdc0bb6", 1200),
};

/* ---------- Proof ---------- */
type Digits = { dir: "up" | "down"; digits: string };
export type Metric = { value: string; label: string; parts: (Digits | string)[]; symbol: string };

// Odometer columns: "up" ends on its last digit, "down" ends on its first.
export const METRICS: Metric[] = [
  {
    value: "500+",
    label: "Vehicles Protected",
    parts: [
      { dir: "up", digits: "6789012345" },
      { dir: "down", digits: "0987654321" },
      { dir: "up", digits: "1234567890" },
    ],
    symbol: "+",
  },
  {
    value: "5.0",
    label: "Google Rating",
    parts: [{ dir: "up", digits: "7890123455" }, ".", { dir: "down", digits: "0123456789" }],
    symbol: "★",
  },
  { value: "9H+", label: "Ceramic Hardness", parts: [{ dir: "up", digits: "0123456789" }], symbol: "H+" },
  {
    value: "10yr",
    label: "Warranty, In Writing",
    parts: [
      { dir: "up", digits: "2345678901" },
      { dir: "down", digits: "0864297531" },
    ],
    symbol: "yr",
  },
];

export const GUARANTEES = [
  { title: "Warranty in Writing", body: "Every coating is registered with a 3 to 10 year written warranty. Not a handshake.", icon: "shield" },
  { title: "The Quote Is the Price", body: "We inspect first, then quote a fixed number. No surprise lines at pickup.", icon: "receipt" },
  { title: "Measured Before Polished", body: "Paint depth readings come before any correction, so we never cut past what the clear coat can give.", icon: "gauge" },
  { title: "One Car in the Bay", body: "Insured, Kelowna owned, and your vehicle stays in our climate-controlled shop the whole time.", icon: "car" },
] as const;

export const PROCESS = [
  { title: "Inspect", body: "Correction lighting and paint depth readings map every swirl, scratch and thin spot before we touch it.", icon: "search" },
  { title: "Decontaminate", body: "Foam wash, iron remover and clay bar strip what a normal wash leaves bonded to the paint.", icon: "droplets" },
  { title: "Correct", body: "Machine polishing matched to your paint: one, two or three stages depending on the defects.", icon: "sparkles" },
  { title: "Coat", body: "9H+ nano ceramic applied in a climate-controlled bay, cured, inspected and warrantied.", icon: "shield" },
] as const;

/* ---------- Services ---------- */
export const SERVICES = [
  {
    name: "Ceramic Coating",
    href: "/services#coating",
    tag: "Protection",
    image: PHOTO.silhouette,
    alt: "Glossy sports car silhouette in a dark studio",
    specs: [
      ["Starting at", "$999"],
      ["Warranty", "3 to 10 yr"],
      ["Hardness", "9H+"],
      ["Polish", "1-Step incl."],
    ],
  },
  {
    name: "Paint Correction",
    href: "/services#correction",
    tag: "Restoration",
    image: PHOTO.microfibre,
    alt: "Microfibre towel resting on a polished black hood",
    specs: [
      ["Starting at", "$499"],
      ["Stages", "1 to 3"],
      ["Removes", "Swirls, scratches"],
      ["Measured", "Depth readings"],
    ],
  },
  {
    name: "Auto Detailing",
    href: "/services#detailing",
    tag: "Interior + Exterior",
    image: PHOTO.sprayDetail,
    alt: "Detailer spraying and wiping an orange sports car",
    specs: [
      ["Starting at", "$280"],
      ["Packages", "3"],
      ["Vehicle sizes", "Sedan to 3-row"],
      ["Includes", "Inside and out"],
    ],
  },
  {
    name: "Window Tinting",
    href: "/tinting",
    tag: "Heat + UV",
    image: PHOTO.whiteSedan,
    alt: "White BMW sedan on a palm-lined street",
    specs: [
      ["Films", "Ceramic, Nano"],
      ["UV blocked", "Up to 99%"],
      ["Install", "2 to 4 hrs"],
      ["Signal", "GPS safe"],
    ],
  },
];

export const VEHICLE_CLASSES = ["SUV / Sedan", "Truck", "3-Row / Larger"];

export const PACKAGES = [
  {
    name: "Express Refresh",
    kind: "Maintenance detail",
    prices: ["$280", "$320", "$340"],
    blurb: "Routine upkeep that keeps a good car feeling new.",
    image: PHOTO.whiteCoupe,
    alt: "White BMW coupe in a parking lot",
    interior: ["Full vacuum: floors, seats, trunk", "All surfaces wiped down", "Interior glass", "Door jambs and floor mats", "Light stain removal", "UV protectant on plastics"],
    exterior: ["Hand wash", "Rims, tires and tire shine", "Exterior glass", "Spray wax protection"],
  },
  {
    name: "Premium Revival",
    kind: "Deep restoration clean",
    popular: true,
    prices: ["$350", "$380", "$400"],
    blurb: "Our most booked detail. Restores, not just refreshes.",
    image: PHOTO.lakeside,
    alt: "Grey luxury sedan parked by a lake",
    interior: ["Everything in Express Refresh", "Carpet and seat shampoo", "Steam clean and pet hair removal", "Leather clean and condition", "Vents, cracks and odour treatment"],
    exterior: ["Everything in Express Refresh", "Iron remover and clay bar", "Engine bay wipe down", "Trim restoration", "Premium sealant"],
  },
  {
    name: "Ultimate Showroom",
    kind: "Complete restoration",
    prices: ["$399", "$420", "$450"],
    blurb: "Machine polish included. The finish you bought the car for.",
    image: PHOTO.hypercar,
    alt: "White hypercar photographed at night",
    interior: ["Everything in Premium Revival", "Full interior restoration", "Steam sanitising", "Headliner spot clean", "Premium leather treatment"],
    exterior: ["Everything in Premium Revival", "Full machine polish", "Swirl and scratch reduction", "Premium paint sealant", "Ceramic spray protection"],
  },
];

export const COATINGS = [
  { years: "3-Year", name: "Essential", price: "$999", note: "A robust 9H layer with strong water beading. The smart first coating." },
  { years: "5-Year", name: "Elite", price: "$1,199", note: "Thicker build, deeper gloss, better chemical resistance. Our most booked.", popular: true },
  { years: "7-Year", name: "Pro Shield", price: "$1,399", note: "A sacrificial layer built for years of Okanagan sun and road salt." },
  { years: "10-Year", name: "Ultimate Guard", price: "$1,599", note: "Lifetime-grade protection that keeps the clear coat perfected." },
];

export const CORRECTION = [
  { title: "1-Step Polish", price: "Included with coatings, $499 alone", body: "A single machine polish for light swirls and wash marks. Ideal for newer or well kept paint." },
  { title: "2-Step Correction", price: "+$250 on a coating", body: "Compound, then refine. Takes out deeper scratches and oxidation for a near-perfect finish." },
  { title: "3-Step Correction", price: "+$500 on a coating", body: "Heavy cut, level, then jewel. A true mirror on paint that has seen hard years." },
];

export const ADDONS = [
  ["Pet hair removal", "$25 to $75+"],
  ["Excess dirt", "$25 to $75+"],
  ["Salt removal", "$50+"],
  ["Seat extraction", "$40+ per seat"],
  ["Headlight restoration", "$60 per pair"],
  ["Engine bay detail", "$50 to $100"],
  ["Ozone odour treatment", "$75"],
  ["Sap and tar removal", "$25 to $75"],
  ["Scratch polish", "$75+ per panel"],
  ["Leather coating", "$100"],
  ["Fabric protection", "$75"],
];

export const SPECIALTY = [
  { title: "Truck and Off-Road", tag: "Heavy Duty", image: PHOTO.truck, alt: "Black pickup truck on a coastal road", points: ["Heavy decontamination", "9H+ ceramic on panels and bed", "Wheel arches and undercarriage", "Interior deep clean"] },
  { title: "Marine and Boats", tag: "Lake Ready", image: PHOTO.boat, alt: "Boat crossing a wide lake with hills behind", points: ["Gel-coat compounding", "Marine-grade ceramic UV barrier", "Hull oxidation removal", "Cabin deep clean"] },
  { title: "RV and Trailer", tag: "Road Trip", image: PHOTO.rv, alt: "Motorhome parked under a starry sky", points: ["Fibreglass oxidation correction", "Full-length ceramic seal", "Roof and awning treatment", "Fabric guard inside"] },
];

export const TINT_FILMS = [
  {
    name: "Ceramic Tint",
    tag: "Performance",
    image: PHOTO.whiteSedan,
    alt: "White BMW sedan on a palm-lined street",
    body: "Everyday protection with a clean, factory look.",
    specs: [
      ["UV blocked", "Up to 99%"],
      ["Heat rejection", "High"],
      ["Clarity", "Crystal clear"],
      ["Signal", "GPS and radio safe"],
    ],
  },
  {
    name: "Nano Ceramic Tint",
    tag: "Signature",
    image: PHOTO.hypercar,
    alt: "White hypercar photographed at night",
    body: "Maximum heat rejection with zero haze. Our pick for luxury vehicles.",
    specs: [
      ["UV blocked", "Up to 99%"],
      ["Heat rejection", "Maximum"],
      ["Clarity", "Zero haze"],
      ["Glare", "Reduced at night"],
    ],
  },
];

export const TINT_PROCESS = [
  { title: "Glass Inspection", body: "Every window is checked for chips, scratches and old film before anything is cut.", icon: "search" },
  { title: "Precision Cut", body: "Film is cut to the exact shape of your glass for edge-to-edge coverage.", icon: "scissors" },
  { title: "Clean Application", body: "Installed in a dust-controlled bay. No bubbles, no trapped debris.", icon: "droplets" },
  { title: "Final Inspection", body: "Every panel is checked under shop lighting before the keys go back to you.", icon: "check" },
] as const;

export const TINT_FAQ = [
  { q: "Is window tint legal in BC?", a: "Yes, within the Motor Vehicle Act. Front side windows must let through at least 35% of light. We keep every install compliant and help you choose a shade that is." },
  { q: "How long does it take?", a: "Most vehicles take 2 to 4 hours. Larger vehicles or full wraps of glass can take a little longer, and we give you an exact time when you book." },
  { q: "When can I roll my windows down?", a: "Wait 3 to 4 days while the adhesive cures. A slight haze in that window is normal and clears on its own." },
  { q: "Will tint affect my phone or GPS?", a: "No. Both films are ceramic, not metallic, so GPS, cellular and radio signals pass straight through." },
  { q: "Ceramic or Nano Ceramic?", a: "Both block up to 99% of UV. Nano Ceramic rejects more heat and has near-zero distortion, so it is our recommendation for luxury vehicles and long summer drives." },
];

export const PRODUCT_BRANDS = ["Rupes BigFoot", "System X Ceramic", "Sonax Profiline", "P&S", "3D Car Care", "3M", "Tornador", "GYEON Quartz", "CarPro", "Car Candy", "Crystal Brite", "Starke Yacht"];

export const BOOKABLE = [
  "Express Refresh",
  "Premium Revival",
  "Ultimate Showroom",
  "Ceramic Coating",
  "Paint Correction",
  "Window Tinting",
  "Truck and Off-Road",
  "Marine and Boats",
  "RV and Trailer",
  "Not sure, recommend for me",
];

/* Booking slots follow the opening hours. Shared by the calendar and the server so both agree. */
const WEEKDAY_SLOTS = ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM"];
const SATURDAY_SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM"];

// weekday: 0 = Sunday ... 6 = Saturday
export function slotsFor(weekday: number): string[] {
  if (weekday === 0) return [];
  return weekday === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS;
}

// "2:30 PM" -> 870 minutes after midnight.
export function slotMinutes(slot: string): number {
  const [, h, m, period] = slot.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/) ?? [];
  return ((Number(h) % 12) + (period === "PM" ? 12 : 0)) * 60 + Number(m);
}

// Keyless Google Maps embed of the shop address.
export const MAP_EMBED = "https://www.google.com/maps?q=715+Evans+Ct,+Kelowna,+BC+V1X+6G4&output=embed";

export const HOME_FAQ = [
  { q: "How long does a ceramic coating take?", a: "One to three days, depending on how much correction the paint needs. We book the car in for the full window so the coating cures properly instead of being rushed." },
  { q: "Do I need an inspection before I get a price?", a: "For coatings and correction, yes. We look at the paint under correction lighting, take depth readings, then give you a fixed quote. Detailing packages are priced up front by vehicle size." },
  { q: "Is a coated car maintenance-free?", a: "No coating is maintenance-free, but it is maintenance-easy. Dirt and water release faster, washes take less effort, and the gloss lasts for the life of the warranty." },
  { q: "Do you offer mobile detailing?", a: "Maintenance washes and interiors can be done on site in Kelowna and West Kelowna. Coatings and correction stay in the shop, where lighting and temperature are controlled." },
  { q: "Which areas do you serve?", a: "Kelowna, West Kelowna, Lake Country, Peachland and Vernon. Most clients drop their vehicle at our Evans Court studio." },
];

/* Estimator uses only published prices: coating tier (1-step polish included) + correction add-on. */
export const PAINT_CONDITION = [
  { label: "Light swirls", stage: "1-Step polish", add: 0 },
  { label: "Deeper scratches", stage: "2-Step correction", add: 250 },
  { label: "Heavy defects", stage: "3-Step correction", add: 500 },
];
