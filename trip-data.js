/* =====================================================================
   PHILIPPINES 2026 — TRIP DATA
   Shared by index.html (map) and itinerary.html (written plan).

   • Add accommodation: fill in "name" (and optionally "link") in STAYS.
     An empty name shows "Not booked yet".
   • Each day's "pin" is [latitude, longitude]; null = no map pin.
   • photos: [label, image-search text] → shown as photo links.
   ===================================================================== */

const DAYS = [
  {
    date: 13,
    dow: "Fri",
    region: "In transit",
    pin: null,
    title: "Leave Calgary",
    lede: "",
    plan: [
      ["19:10", "WS 127 Calgary → Vancouver"],
      ["00:05", "PR 117 Vancouver → Manila, overnight"],
    ],
    move: "20 h 20 m · 1 stop · booked",
    stay: null,
    tip: "",
    photos: []  // [label, image search]
  },
  {
    date: 14,
    dow: "Sat",
    region: "In transit",
    pin: null,
    title: "In the air",
    lede: "",
    plan: [
      ["All day", "Over the Pacific; the date line eats Saturday"],
    ],
    move: "Lands Manila Sun 05:30",
    stay: null,
    tip: "",
    photos: []  // [label, image search]
  },
  {
    date: 15,
    dow: "Sun",
    region: "Bohol",
    pin: [9.567, 123.77],
    title: "Arrive in Bohol",
    lede: "",
    plan: [
      ["05:30", "Land Manila T1, walk to T3"],
      ["09:50", "5J 617 → Panglao, lands 11:35"],
      ["Afternoon", "Check in, beach"],
    ],
    move: "5J 617 · booked",
    stay: "pgl",
    tip: "Get a SIM (Globe or Smart) at the airport.",
    photos: [["Panglao", "Panglao Island Bohol beach"], ["Cebu to Bohol ferry", "OceanJet Cebu Tagbilaran ferry"]]  // [label, image search]
  },
  {
    date: 16,
    dow: "Mon",
    region: "Bohol",
    pin: [9.687, 123.95],
    title: "Tarsiers & Loboc River",
    lede: "",
    plan: [
      ["Morning", "Tarsier Sanctuary, Corella"],
      ["Midday", "Kayak or SUP the Loboc River"],
      ["Evening", "Sunset on Panglao"],
    ],
    move: "Driver or tricycle · under 1 h",
    stay: "pgl",
    tip: "Use the Corella sanctuary. No flash.",
    photos: [["Tarsiers", "Philippine tarsier Corella sanctuary"], ["Loboc River", "Loboc River Bohol paddle"]]  // [label, image search]
  },
  {
    date: 17,
    dow: "Tue",
    region: "Bohol",
    pin: [9.83, 124.16],
    title: "Chocolate Hills",
    lede: "",
    plan: [
      ["06:30", "Leave early to beat the buses"],
      ["Morning", "Viewpoint and ATV ride"],
      ["Afternoon", "Bilar mahogany forest"],
    ],
    move: "Hired driver · 1 h 45 m each way",
    stay: "pgl",
    tip: "Your hotel can book a driver.",
    photos: [["Chocolate Hills", "Chocolate Hills Bohol"], ["Chocolate Hills ATV", "Chocolate Hills ATV ride"], ["Bilar forest", "Bilar man-made forest Bohol"]]  // [label, image search]
  },
  {
    date: 18,
    dow: "Wed",
    region: "Bohol",
    pin: [9.96, 124.22],
    title: "EAT Danao adventure park",
    lede: "",
    plan: [
      ["Morning", "The Plunge canyon swing"],
      ["Midday", "Zipline and sky ride"],
      ["Afternoon", "River kayak or caving"],
    ],
    move: "Hired driver · 2 h each way",
    stay: "pgl",
    tip: "",
    photos: [["EAT Danao", "EAT Danao adventure park Bohol"]]  // [label, image search]
  },
  {
    date: 19,
    dow: "Thu",
    region: "Bohol",
    pin: [9.615, 123.765],
    title: "Napaling sardine run",
    lede: "",
    plan: [
      ["Early", "Snorkel the sardines off the cliffs, 2 h"],
      ["Afternoon", "Swim in Hinagdanan Cave"],
    ],
    move: "Tricycle · 15 min",
    stay: "pgl",
    tip: "₱300 entry with guide. Bring your own mask.",
    photos: [["Napaling sardine run", "Napaling Reef sardine run Panglao"], ["Hinagdanan Cave", "Hinagdanan Cave Panglao"]]  // [label, image search]
  },
  {
    date: 20,
    dow: "Fri",
    region: "El Nido",
    pin: [9.567, 123.77],
    title: "Fly to El Nido",
    lede: "",
    plan: [
      ["08:30", "Panglao airport (TAG)"],
      ["10:30", "DG 6886 → El Nido, lands 12:15"],
      ["Sunset", "Las Cabanas Beach"],
    ],
    move: "DG 6886 · booked",
    stay: "eni",
    tip: "",
    photos: [["El Nido", "El Nido Palawan limestone cliffs"], ["Panglao", "Panglao Island Bohol beach"]]  // [label, image search]
  },
  {
    date: 21,
    dow: "Sat",
    region: "El Nido",
    pin: [11.137, 119.318],
    title: "Tour A: lagoons",
    lede: "",
    plan: [
      ["8 am – 4 pm", "Big and Small Lagoon, Secret Lagoon, Shimizu"],
    ],
    move: "Boat tour",
    stay: "eni",
    tip: "Go early to beat the crowds.",
    photos: [["Big Lagoon", "El Nido Big Lagoon kayak"], ["Small Lagoon", "El Nido Small Lagoon"]]  // [label, image search]
  },
  {
    date: 22,
    dow: "Sun",
    region: "El Nido",
    pin: [11.197, 119.402],
    title: "Taraw Cliff climb",
    lede: "",
    plan: [
      ["06:00", "Guided climb, about 1 h up"],
      ["Afternoon", "Kayak to Cadlao Island"],
    ],
    move: "Walk from town",
    stay: "eni",
    tip: "Wear proper shoes. The rock is sharp.",
    photos: [["Taraw Cliff", "Taraw Cliff El Nido view"], ["Cadlao Island", "Cadlao Island El Nido kayak"], ["Las Cabanas", "Las Cabanas beach El Nido sunset"]]  // [label, image search]
  },
  {
    date: 23,
    dow: "Mon",
    region: "El Nido",
    pin: [11.165, 119.275],
    title: "Tour C: caves and shrine",
    lede: "",
    plan: [
      ["Morning", "Hidden Beach cave swim"],
      ["Midday", "Matinloc Shrine lookout"],
      ["Afternoon", "Secret Beach, Helicopter Island"],
    ],
    move: "Boat tour · 8 am – 5 pm",
    stay: "eni",
    tip: "Basic swimming needed for the cave.",
    photos: [["Hidden Beach", "Hidden Beach El Nido Matinloc"], ["Matinloc Shrine", "Matinloc Shrine viewpoint El Nido"], ["Helicopter Island", "Helicopter Island El Nido"]]  // [label, image search]
  },
  {
    date: 24,
    dow: "Tue",
    region: "El Nido",
    pin: [11.163, 119.385],
    title: "Free day in El Nido",
    lede: "",
    plan: [
      ["Options", "Tour B caves, Las Cabanas zipline, or rest"],
    ],
    move: "Up to you",
    stay: "eni",
    tip: "Buffer if a tour was rained out.",
    photos: [["Las Cabanas zipline", "Las Cabanas zipline El Nido"], ["Cathedral Cave", "Cathedral Cave El Nido"]]  // [label, image search]
  },
  {
    date: 25,
    dow: "Wed",
    region: "Coron",
    pin: [11.985, 120.25],
    title: "Ferry to Coron, hot springs",
    lede: "",
    plan: [
      ["08:20", "Phimal ferry → Coron, about 12:20"],
      ["Sunset", "Mt Tapyas, 721 steps"],
      ["Evening", "Maquinit Hot Springs"],
    ],
    move: "Fast ferry · ₱3,175",
    stay: "crn",
    tip: "Book ahead and bring a printed ticket.",
    photos: [["Maquinit Hot Springs", "Maquinit Hot Springs Coron"], ["Mt Tapyas", "Mt Tapyas Coron sunset"], ["El Nido to Coron ferry", "El Nido to Coron fast ferry"]]  // [label, image search]
  },
  {
    date: 26,
    dow: "Thu",
    region: "Coron",
    pin: [11.94, 120.24],
    title: "Coron Island lakes",
    lede: "",
    plan: [
      ["Morning", "Kayangan Lake viewpoint"],
      ["Midday", "Twin Lagoon"],
      ["Afternoon", "Barracuda Lake"],
    ],
    move: "Boat tour",
    stay: "crn",
    tip: "Take the earliest boat.",
    photos: [["Kayangan Lake", "Kayangan Lake Coron viewpoint"], ["Twin Lagoon", "Twin Lagoon Coron"], ["Barracuda Lake", "Barracuda Lake Coron"]]  // [label, image search]
  },
  {
    date: 27,
    dow: "Fri",
    region: "Coron",
    pin: [12.06, 120.15],
    title: "Mt Tundalara hike",
    lede: "",
    plan: [
      ["06:00", "Guided hike, 3–5 h round trip"],
      ["Evening", "Firefly tour or rest"],
    ],
    move: "Tricycle to the trailhead",
    stay: "crn",
    tip: "Bring plenty of water.",
    photos: [["Mt Tundalara", "Mt Tundalara Coron hike"], ["Kingfisher Park", "Kingfisher Park Coron fireflies"]]  // [label, image search]
  },
  {
    date: 28,
    dow: "Sat",
    region: "Coron",
    pin: null,
    title: "Beach-hopping",
    lede: "",
    plan: [
      ["Full day", "Malcapuya, Banana and Bulog Dos islands"],
    ],
    move: "Boat tour",
    stay: "crn",
    tip: "",
    photos: [["Malcapuya Island", "Malcapuya Island Coron"], ["Bulog Dos", "Bulog Dos Island Coron"]]  // [label, image search]
  },
  {
    date: 29,
    dow: "Sun",
    region: "Coron",
    pin: [12.3, 119.88],
    title: "Calauit Safari (optional)",
    lede: "",
    plan: [
      ["05:00", "Giraffes and zebras, 2 h drive each way"],
      ["Or", "Rest day in town"],
    ],
    move: "Van tour",
    stay: "crn",
    tip: "",
    photos: [["Calauit Safari", "Calauit Safari Park giraffes"], ["Calamian deer", "Calamian deer Calauit"]]  // [label, image search]
  },
  {
    date: 30,
    dow: "Mon",
    region: "Coron",
    pin: [12.008, 120.21],
    title: "Last day in Coron",
    lede: "",
    plan: [
      ["Morning", "Mt Tapyas sunrise"],
      ["Evening", "Last soak at Maquinit"],
    ],
    move: "Tricycle",
    stay: "crn",
    tip: "Book the 06:15 airport van.",
    photos: [["Coron town", "Coron Palawan town view"], ["Maquinit Hot Springs", "Maquinit Hot Springs Coron night"]]  // [label, image search]
  },
  {
    date: 1,
    dow: "Tue",
    region: "In transit",
    pin: [15.186, 120.56],
    title: "Fly home",
    lede: "",
    mon: "Dec",
    plan: [
      ["06:15", "Van to Busuanga airport"],
      ["08:00", "DG 6042 → Clark, lands 09:25"],
      ["Midday", "P2P bus to Manila airport, 2–3 h"],
      ["21:05", "PR 116 + WS 126, home 23:00 Calgary time"],
    ],
    move: "Flights booked · pay the bus on board",
    stay: null,
    tip: "",
    photos: [["Clark airport", "Clark International Airport terminal"]]  // [label, image search]
  },
];

const STAYS = {
  pgl: { name: "", link: "", area: "Panglao Island, Bohol", nights: "Nov 15–19 · 5 nights",
        hint: "Alona Beach (lively) or Dumaluan / Danao (quiet)." },
  eni: { name: "", link: "", area: "El Nido town or Corong-Corong", nights: "Nov 20–24 · 5 nights",
        hint: "Town (central) or Corong-Corong (sunsets)." },
  crn: { name: "", link: "", area: "Coron town", nights: "Nov 25–30 · 6 nights",
        hint: "Coron town, near the pier." },
};

/* Legs group the days in the list */
const LEGS = [
  { name: "Getting there", sub: "Calgary → Manila → Bohol",             region: "In transit", days: [13, 14] },
  { name: "Bohol",         sub: "Tarsiers · Chocolate Hills · sardine run", region: "Bohol",      days: [15, 16, 17, 18, 19] },
  { name: "El Nido",       sub: "Bacuit Bay · Taraw Cliff · sea caves", region: "El Nido",    days: [20, 21, 22, 23, 24] },
  { name: "Coron",         sub: "Hot springs · lakes · Mt Tundalara",   region: "Coron",      days: [25, 26, 27, 28, 29, 30] },
  { name: "Heading home",  sub: "Coron → Clark → Manila → Calgary",     region: "In transit", days: [1] }
];

/* Travel lines on the map: [lat, lng] points, mode "fly" (dashed arc) or "ground" (solid) */
const ROUTE = [
  { mode: "fly",    pts: [[14.51, 121.02], [9.567, 123.77]] },                                   // Manila → Panglao
  { mode: "fly",    pts: [[9.567, 123.77], [11.18, 119.39]] },                                   // Bohol → El Nido
  { mode: "ground", pts: [[11.18, 119.39], [11.62, 119.86], [12.00, 120.205]] },                 // ferry El Nido → Coron
  { mode: "ground", pts: [[12.00, 120.205], [12.12, 120.04]] },                                  // Coron town → Busuanga airport
  { mode: "fly",    pts: [[12.12, 120.04], [15.186, 120.56]] },                                  // Busuanga → Clark
  { mode: "ground", pts: [[15.186, 120.56], [14.51, 121.02]] }                                   // bus Clark → Manila airport
];

const COLORS = { "Coron": "#0038A8", "El Nido": "#0038A8", "Bohol": "#CE1126", "Cebu": "#0B0B0C", "In transit": "#0B0B0C" };
const MONTH = "Nov";

/* ---------- where to stay: nights per place + hostel picks ----------
   Picks have private rooms (twin/double) for two. Prices are rough
   "from" rates seen in Oct 2026; check before booking. */
const PLACES = [
  { key: "pgl", place: "Bohol (Panglao)", nights: 5, inDate: "2026-11-15", outDate: "2026-11-20", region: "Bohol",
    days: "Sun Nov 15 → Fri Nov 20 (fly out 10:30)", bookingQ: "Panglao, Bohol" },
  { key: "eni", place: "El Nido", nights: 5, inDate: "2026-11-20", outDate: "2026-11-25", region: "El Nido",
    days: "Fri Nov 20 midday → Wed Nov 25 (ferry 08:20)", bookingQ: "El Nido, Palawan" },
  { key: "crn", place: "Coron", nights: 6, inDate: "2026-11-25", outDate: "2026-12-01", region: "Coron",
    days: "Wed Nov 25 midday → Tue Dec 1 (flight 08:00)", bookingQ: "Coron, Palawan" },
];

const STAY_PICKS = {
  pgl: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/panglao-island/f/private-rooms/",
    picks: [
      { id: "red-picnic", name: "Red Picnic Hostel", where: "Dumaluan Beach", why: "Pool, social", url: "https://www.hostelworld.com/hostels/p/314478/red-picnic-hostel/" },
      { id: "coco-farm", name: "Bohol Coco Farm", where: "Inland Panglao", why: "Chill farm stay", url: "https://www.hostelworld.com/hostels/p/67761/bohol-coco-farm/" },
      { id: "mad-monkey-panglao", name: "Mad Monkey Panglao", where: "Danao Beach", why: "Pool, social", url: "https://www.hostelz.com/hostel/486560-Mad-Monkey" },
    ] },
  eni: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/el-nido/f/private-rooms/",
    picks: [
      { id: "spin", name: "SPIN Designer Hostel", where: "El Nido town", why: "Central, clean", url: "https://www.hostelworld.com/hostels/p/99361/spin-designer-hostel/" },
      { id: "outpost-eni", name: "Outpost Beach Hostel", where: "Corong-Corong", why: "Beachfront, sunsets", url: "https://www.hostelworld.com/hostels/p/272882/outpost-beach-hostel/" },
      { id: "frendz", name: "Frendz Hostel El Nido", where: "El Nido town", why: "Lively, rooftop pool", url: "https://www.hostelworld.com/hostels/p/293897/frendz-hostel-el-nido/" },
    ] },
  crn: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/coron/",
    picks: [
      { id: "hop", name: "Hop Hostel", where: "Coron town", why: "Top rated, rooftop", url: "https://www.hostelz.com/hostel/378411-Hop-Hostel" },
      { id: "outpost-crn", name: "Outpost Hostel Coron", where: "Coron waterfront", why: "Waterfront, pool", url: "https://www.hostelworld.com/hostels/p/306653/outpost-hostel-coron/" },
      { id: "joval", name: "Joval Homestay", where: "Edge of Coron town", why: "Quiet, cheapest", url: "https://www.hostelz.com/hostel/387461-Joval-Homestay" },
    ] },
};
const bookingSearch = p => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(p.bookingQ)}&checkin=${p.inDate}&checkout=${p.outDate}&group_adults=2&no_rooms=1&group_children=0`;

/* ---------- shared helpers (no need to edit) ---------- */
const img = q => "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(q);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const dayNum = d => DAYS.indexOf(d) + 1;
const ICON_CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h3l2-2.5h6L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.6"/></svg>';
const ICON_MOVE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const photosHTML = d => d.photos.length
  ? `<div class="photos">${d.photos.map(([label, q]) => `<a href="${img(q)}" target="_blank" rel="noopener">${ICON_CAM}${esc(label)} ↗</a>`).join("")}</div>` : "";
const stayText = key => {
  if (!key) return "On the plane";
  const s = STAYS[key];
  return s.name ? s.name : `Not booked yet · ${s.area}`;
};
