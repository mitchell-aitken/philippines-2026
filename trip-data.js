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
    pin: [9.5505, 123.8135],
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
    photos: [["Panglao", "Panglao Island Bohol beach"]]  // [label, image search]
  },
  {
    date: 16,
    dow: "Mon",
    region: "Bohol",
    pin: [9.6872, 123.9505],
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
    pin: [9.9167, 124.1703],
    title: "Chocolate Hills",
    lede: "",
    plan: [
      ["06:30", "Leave early to beat the buses"],
      ["Morning", "Viewpoint and ATV ride"],
      ["Afternoon", "Bilar mahogany forest"],
    ],
    move: "Hired driver · 1 h 45 m each way",
    stay: "pgl",
    tip: "Hotels can book a driver.",
    photos: [["Chocolate Hills", "Chocolate Hills Bohol"], ["Chocolate Hills ATV", "Chocolate Hills ATV ride"], ["Bilar forest", "Bilar man-made forest Bohol"]]  // [label, image search]
  },
  {
    date: 18,
    dow: "Wed",
    region: "Bohol",
    pin: [10.0262, 124.2309],
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
    pin: [9.6125, 123.7645],
    title: "Napaling sardine run",
    lede: "",
    plan: [
      ["Early", "Snorkel the sardines off the cliffs, 2 h"],
      ["Afternoon", "Swim in Hinagdanan Cave"],
    ],
    move: "Tricycle · 15 min",
    stay: "pgl",
    tip: "₱300 entry with guide. Bring a mask.",
    photos: [["Napaling sardine run", "Napaling Reef sardine run Panglao"], ["Hinagdanan Cave", "Hinagdanan Cave Panglao"]]  // [label, image search]
  },
  {
    date: 20,
    dow: "Fri",
    region: "El Nido",
    pin: [11.1449, 119.3835],
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
    pin: [11.1655, 119.3218],
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
    pin: [11.1838, 119.3946],
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
    pin: [11.1495, 119.2635],
    title: "Tour C: caves and shrine",
    lede: "",
    plan: [
      ["Morning", "Hidden Beach cave swim"],
      ["Midday", "Matinloc Shrine lookout"],
      ["Afternoon", "Secret Beach, Helicopter Island"],
      ["18:00", "TAO briefing, office in Corong-Corong"],
    ],
    move: "Boat tour · 8 am – 5 pm",
    stay: "eni",
    tip: "Pack a small bag for TAO; big bags ride in the hold.",
    photos: [["Hidden Beach", "Hidden Beach El Nido Matinloc"], ["Matinloc Shrine", "Matinloc Shrine viewpoint El Nido"], ["Helicopter Island", "Helicopter Island El Nido"]]  // [label, image search]
  },
  {
    date: 24,
    dow: "Tue",
    region: "TAO",
    pin: [11.3345, 119.5451],
    title: "TAO day 1: Beach Farm",
    lede: "",
    plan: [
      ["07:30", "Meet at the TAO office, Corong-Corong"],
      ["Morning", "Van to San Fernando, north El Nido"],
      ["Afternoon", "Daracotan Bay"],
      ["Night", "TAO Beach Farm"],
    ],
    move: "TAO van + boat",
    stay: null,
    tip: "Little power at camp: bring a headlamp.",
    photos: [["TAO expedition", "TAO Philippines expedition boat"], ["TAO Beach Farm", "TAO Beach Farm San Fernando El Nido"]]  // [label, image search]
  },
  {
    date: 25,
    dow: "Wed",
    region: "TAO",
    pin: [11.4265, 119.7420],
    title: "TAO day 2: Linapacan",
    lede: "",
    plan: [
      ["All day", "Boat to the Linapacan islands, snorkel stops"],
      ["Night", "TAO basecamp"],
    ],
    move: "TAO boat",
    stay: null,
    tip: "Clearest water of the trip.",
    photos: [["Linapacan", "Linapacan Palawan islands"], ["TAO basecamp", "TAO Philippines basecamp huts"]]  // [label, image search]
  },
  {
    date: 26,
    dow: "Thu",
    region: "TAO",
    pin: [11.72, 119.97],
    title: "TAO day 3: to Culion",
    lede: "",
    plan: [
      ["Morning", "More of Linapacan"],
      ["Afternoon", "Cross to south Culion"],
      ["Night", "TAO basecamp"],
    ],
    move: "TAO boat",
    stay: null,
    tip: "Camp location is approximate; TAO doesn't publish it.",
    photos: [["Culion", "Culion island Palawan"]]  // [label, image search]
  },
  {
    date: 27,
    dow: "Fri",
    region: "TAO",
    pin: [12.0094, 119.8710],
    title: "TAO day 4: Camp Ngey Ngey",
    lede: "",
    plan: [
      ["All day", "Up the Culion coast to west Busuanga"],
      ["Night", "Camp Ngey Ngey"],
    ],
    move: "TAO boat",
    stay: null,
    tip: "",
    photos: [["Camp Ngey Ngey", "Camp Ngey Ngey TAO Busuanga"]]  // [label, image search]
  },
  {
    date: 28,
    dow: "Sat",
    region: "Coron",
    pin: [11.9708, 120.2482],
    title: "Land in Coron, hot springs",
    lede: "",
    plan: [
      ["~12:00", "TAO lands in Coron town"],
      ["Sunset", "Mt Tapyas, 721 steps"],
      ["Evening", "Maquinit Hot Springs"],
    ],
    move: "TAO boat, then tricycle",
    stay: "crn",
    tip: "",
    photos: [["Maquinit Hot Springs", "Maquinit Hot Springs Coron"], ["Mt Tapyas", "Mt Tapyas Coron sunset"]]  // [label, image search]
  },
  {
    date: 29,
    dow: "Sun",
    region: "Coron",
    pin: [11.9535, 120.2290],
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
    date: 30,
    dow: "Mon",
    region: "Coron",
    pin: [12.0600, 120.1500],
    title: "Mt Tundalara hike",
    lede: "",
    plan: [
      ["06:00", "Guided hike, 3–5 h round trip"],
      ["Evening", "Last soak at Maquinit"],
    ],
    move: "Tricycle to the trailhead",
    stay: "crn",
    tip: "Book the 06:15 airport van.",
    photos: [["Mt Tundalara", "Mt Tundalara Coron hike"], ["Coron town", "Coron Palawan town view"]]  // [label, image search]
  },
  {
    date: 1,
    dow: "Tue",
    region: "In transit",
    pin: [15.1859, 120.5603],
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
        hint: "Quiet side of Panglao, away from Alona." },
  eni: { name: "", link: "", area: "El Nido town or Corong-Corong", nights: "Nov 20–23 · 4 nights",
        hint: "Town (central) or Corong-Corong (sunsets)." },
  crn: { name: "", link: "", area: "Coron town", nights: "Nov 28–30 · 3 nights",
        hint: "Coron town, near the pier." },
};

/* Legs group the days in the list */
const LEGS = [
  { name: "Getting there", sub: "Calgary → Manila → Bohol",             region: "In transit", days: [13, 14] },
  { name: "Bohol",         sub: "Tarsiers · Chocolate Hills · sardine run", region: "Bohol",      days: [15, 16, 17, 18, 19] },
  { name: "El Nido",       sub: "Bacuit Bay · Taraw Cliff · sea caves", region: "El Nido",    days: [20, 21, 22, 23] },
  { name: "TAO expedition", sub: "El Nido → Coron by boat · 4 nights",  region: "TAO",        days: [24, 25, 26, 27] },
  { name: "Coron",         sub: "Hot springs · lakes · Mt Tundalara",   region: "Coron",      days: [28, 29, 30] },
  { name: "Heading home",  sub: "Coron → Clark → Manila → Calgary",     region: "In transit", days: [1] }
];

/* older cached copies of the map page still look for ROUTE; keep it so they don't break */
const ROUTE = [];

/* Airports on the map, with how far they are from where you stay */
const AIRPORTS = {
  MNL: { name: "Manila (NAIA)", at: [14.5086, 121.0194], note: "Land T1, walk/shuttle to T3" },
  TAG: { name: "Bohol-Panglao", at: [9.5664, 123.7745], note: "15–25 min to hostels" },
  ENI: { name: "El Nido (Lio)", at: [11.2025, 119.4164], note: "7 km, 20 min to town" },
  USU: { name: "Busuanga (Coron)", at: [12.1215, 120.1000], note: "23 km, 40 min to Coron town" },
  CRK: { name: "Clark", at: [15.1859, 120.5603], note: "2–3 h bus to Manila airport", hide: true }
};

/* Trip in order. Each step: a day ({day}) or airport ({air}); "by" = how you got there from the step before. */
const FLOW = [
  { air: "MNL" },
  { air: "TAG", by: "fly" }, { day: 15, by: "road" }, { day: 16, by: "road" }, { day: 17, by: "road" }, { day: 18, by: "road" }, { day: 19, by: "road" },
  { air: "TAG", by: "road" },
  { air: "ENI", by: "fly" }, { day: 20, by: "road" }, { day: 21, by: "boat" }, { day: 22, by: "road" }, { day: 23, by: "boat" },
  { day: 24, by: "road", via: [[11.1650, 119.3985]] }, { day: 25, by: "boat" }, { day: 26, by: "boat" }, { day: 27, by: "boat" },
  { day: 28, by: "boat", via: [[11.96, 119.98], [11.97, 120.12], [11.995, 120.205]] }, { day: 29, by: "boat" }, { day: 30, by: "road" },
  { air: "USU", by: "road" },
  { air: "CRK", by: "fly" }, { air: "MNL", by: "road" }
];

const COLORS = { "Coron": "#0038A8", "El Nido": "#0038A8", "TAO": "#0E7C66", "Bohol": "#CE1126", "Cebu": "#0B0B0C", "In transit": "#0B0B0C" };
const MONTH = "Nov";

/* ---------- where to stay: nights per place + hostel picks ----------
   Picks have private rooms (twin/double) for two. Prices are rough
   "from" rates seen in Oct 2026; check before booking. */
const PLACES = [
  { key: "pgl", place: "Bohol", nights: 5, inDate: "2026-11-15", outDate: "2026-11-20", region: "Bohol",
    days: "Sun Nov 15 → Fri Nov 20 (fly out 10:30)", bookingQ: "Panglao, Bohol" },
  { key: "eni", place: "El Nido", nights: 4, inDate: "2026-11-20", outDate: "2026-11-24", region: "El Nido",
    days: "Fri Nov 20 midday → Tue Nov 24 (TAO 07:30)", bookingQ: "El Nido, Palawan" },
  { key: "tao", place: "TAO boat", nights: 4, inDate: "2026-11-24", outDate: "2026-11-28", region: "TAO",
    days: "Tue Nov 24 → Sat Nov 28, lands ~noon", bookingQ: "" },
  { key: "crn", place: "Coron", nights: 3, inDate: "2026-11-28", outDate: "2026-12-01", region: "Coron",
    days: "Sat Nov 28 noon → Tue Dec 1 (flight 08:00)", bookingQ: "Coron, Palawan" },
];

const STAY_PICKS = {
  pgl: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/panglao-island/f/private-rooms/",
    picks: [
      { id: "coco-farm", name: "Bohol Coco Farm", where: "Inland Panglao", why: "Quiet farm stay", url: "https://www.hostelworld.com/hostels/p/67761/bohol-coco-farm/" },
      { id: "nautilus", name: "Nautilus Hostel & Hammocks", where: "Tawala, by Napaling", why: "Chill, hammocks", url: "https://www.hostelworld.com/hostels/p/317359/nautilus-resort-hostel-and-hammocks/" },
      { id: "mayas", name: "Mayas Guesthouse", where: "South Panglao", why: "Garden, AC rooms", url: "https://www.google.com/maps/search/Mayas+Guesthouse+Panglao" },
    ] },
  eni: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/el-nido/f/private-rooms/",
    picks: [
      { id: "spin", name: "SPIN Designer Hostel", where: "El Nido town", why: "Calm, not a party spot", url: "https://www.hostelworld.com/hostels/p/99361/spin-designer-hostel/" },
      { id: "beach-house-eni", name: "The Beach House", where: "El Nido town beach", why: "Says “not a party hostel”", url: "https://www.hostelworld.com/hostels/p/318303/the-beach-house/" },
      { id: "outpost-eni", name: "Outpost Beach Hostel", where: "Corong-Corong", why: "Quieter beach, sunsets", url: "https://www.hostelworld.com/hostels/p/272882/outpost-beach-hostel/" },
    ] },
  crn: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/coron/",
    picks: [
      { id: "hop", name: "Hop Hostel", where: "Coron town", why: "Top rated, rooftop", url: "https://www.hostelz.com/hostel/378411-Hop-Hostel" },
      { id: "michelinn", name: "Michel'inn Coron", where: "Coron town", why: "Quiet, central", url: "https://www.google.com/maps/search/Michel%27inn+Coron" },
      { id: "ecocio", name: "Ecocio Hostel", where: "Jungle garden, 10 min out", why: "Quiet nature stay", url: "https://www.google.com/maps/search/Ecocio+Hostel+Coron" },
    ] },
};
const bookingSearch = p => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(p.bookingQ)}&checkin=${p.inDate}&checkout=${p.outDate}&group_adults=2&no_rooms=1&group_children=0`;

/* ---------- accommodation (Accommodation page) ----------
   Each block = one place for a run of nights (from = check-in, to = check-out).
   Option prices: booked = what you paid · seen = price you saw on Booking.com (incl. taxes) · live = Google Hotels, your dates. */
const bk = (q, a, b) => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(q)}&checkin=${a}&checkout=${b}&group_adults=2&no_rooms=1&group_children=0`;
const bkHotel = (slug, a, b) => `https://www.booking.com/hotel/ph/${slug}.html?checkin=${a}&checkout=${b}&group_adults=2&no_rooms=1&group_children=0`;
const ACCOM = [
  { id: "panglao-1", area: "Panglao", region: "Bohol", from: "2026-11-15", to: "2026-11-17", picks: "pgl",
    note: "Can still change: maybe only the night of Nov 15, and spend 1 extra night inland on Bohol instead.",
    options: [
      { id: "palms-cove", name: "Palms Cove Resort", where: "Danao, 5 min walk to Alona Beach", rating: "8.8 · Booking.com",
        url: bk("Palms Cove Resort Panglao", "2026-11-15", "2026-11-17"), booked: { total: 154.81, nights: 2, cancellable: true, room: "1 × Deluxe Garden or Pool View Room · requested and approved for two twin beds" } }
    ] },
  { id: "loboc", area: "Loboc", region: "Bohol", from: "2026-11-17", to: "2026-11-19",
    note: "Busai booked, free cancellation before Nov 11. Close to the Chocolate Hills and EAT Danao.",
    options: [
      { id: "busai", name: "Busai Dream Falls Resort", where: "By Busai Falls, Loboc / Sevilla", rating: "9.1 · 29 reviews",
        why: "7 rooms, breakfast, walk to the falls", url: bk("Busai Dream Falls Resort", "2026-11-17", "2026-11-19"), live: true, booked: { total: 130.07, nights: 2, cancellable: true, room: "Family Room, 2 Queen Beds", cancelBy: "Nov 11, 2026" } },
      { id: "fox-firefly", name: "Fox & The Firefly Cottages", where: "Loboc River, near the wharf", rating: "4.5 · 624 reviews", why: "Looks the nicest", nightly: "fox-firefly", full: true,
        roomPlan: [["Nov 17", "Superior Double Cottage, garden view", "1 queen bed · 24 m²"], ["Nov 18", "Deluxe Double, rice paddy view (optional)", "1 queen bed · 36 m²"]],
        url: bk("Fox and The Firefly Cottages Loboc", "2026-11-17", "2026-11-19"), live: true },
      { id: "stefanie-grace", name: "Stefanie Grace Inn", where: "Loboc", rating: "4.4 · 398 reviews", why: "Outdoor pool",
        url: bk("Stefanie Grace Inn Loboc Bohol", "2026-11-17", "2026-11-19"), live: true }
    ] },
  { id: "panglao-2", area: "Panglao", region: "Bohol", from: "2026-11-19", to: "2026-11-20", picks: "pgl",
    note: "Back on Panglao for the sardines and the 10:30 flight.",
    options: [
      { id: "palms-cove-19", name: "Palms Cove Resort", where: "Danao, 5 min walk to Alona Beach", rating: "8.8 · Booking.com",
        url: bk("Palms Cove Resort Panglao", "2026-11-19", "2026-11-20"), live: true, booked: { total: 74.73, nights: 1, cancellable: true, room: "1 × Deluxe Garden or Pool View Room · two twin beds" } }
    ] },
  { id: "el-nido", area: "El Nido", region: "El Nido", from: "2026-11-20", to: "2026-11-24", picks: "eni",
    note: "Marianne Suites and Barco both booked with free cancellation. Keep one.",
    options: [
      { id: "marianne", name: "Marianne Suites El Nido", where: "El Nido", rating: "",
        url: bk("Marianne Suites El Nido", "2026-11-20", "2026-11-24"), live: true,
        booked: { total: 303.16, nights: 4, cancellable: true, room: "Twin Room with Private Bathroom · breakfast included" } },
      { id: "barco", name: "Barco El Nido Hotel", where: "El Nido", rating: "",
        url: bk("Barco El Nido Hotel", "2026-11-20", "2026-11-24"), live: true,
        booked: { total: 208.20, nights: 4, cancellable: true, room: "Quadruple Private Room with 2 Double Bunk Beds" } },
      { id: "cuna", name: "Cuna Hotel", where: "El Nido", why: "Pricier option, two single beds",
        url: "https://www.agoda.com/cuna-hotel_2/hotel/palawan-ph.html?checkIn=2026-11-20&los=4&adults=2&rooms=1", linkLabel: "Agoda",
        est: { perNight: 93, src: "Agoda", note: "plus fees" }, live: true },
      { id: "calathea", name: "Calathea Suites", where: "El Nido", rating: "4.5 · Google",
        url: bk("Calathea Suites El Nido", "2026-11-20", "2026-11-24"), live: true }
    ] },
  { id: "tao", area: "TAO expedition", region: "TAO", from: "2026-11-24", to: "2026-11-28", tao: true,
    note: "Huts at TAO basecamps. Not counted in the accommodation total above.",
    options: [
      { id: "tao-trip", name: "TAO Original: El Nido → Coron", where: "Beach Farm · Linapacan · Culion · Camp Ngey Ngey", rating: "",
        url: "https://www.taophilippines.com/experiences/original-el-nido-to-coron", site: "https://www.taophilippines.com/experiences/original-el-nido-to-coron", included: true, usd: 650 }
    ] },
  { id: "coron", area: "Coron", region: "Coron", from: "2026-11-28", to: "2026-12-01", picks: "crn",
    note: "Both booked for Nov 28–Dec 1 with free cancellation. Keep one.",
    options: [
      { id: "fernvale", name: "Fernvale Leisure Club and Resort", where: "Coron", rating: "4.0 · Google",
        url: bkHotel("fernvale-leisure-club-and-resort", "2026-11-28", "2026-12-01"), live: true, booked: { total: 294, nights: 3, cancellable: true, dates: "Nov 28–Dec 1", room: "Premium Room with Pool View · 1 single bed, 1 large double bed" } },
      { id: "la-natura", name: "La Natura Resort", where: "Coron", rating: "4.4 · Google",
        url: bk("La Natura Resort Coron", "2026-11-28", "2026-12-01"), live: true, booked: { total: 393, nights: 3, cancellable: true, dates: "Nov 28–Dec 1", room: "King Room with Garden View" } },
      { id: "kokosnuss", name: "Kokosnuss Garden Resort", where: "1.2 km from centre", rating: "8.0 · 642 reviews",
        url: bk("Kokosnuss Garden Resort Coron", "2026-11-28", "2026-12-01"), seen: { total: 440, nights: 6, dates: "Nov 24–30" }, live: true },
      { id: "lagoon-coron", name: "Lagoon Coron (Mo2)", where: "Coron town", rating: "4.2 · Google",
        url: bk("Mo2 Lagoon Coron", "2026-11-28", "2026-12-01"), live: true }
    ] }
];
const nightsOf = b => Math.round((new Date(b.to) - new Date(b.from)) / 864e5);
const shortDate = iso => new Date(iso + "T12:00").toLocaleDateString("en-CA", { month: "short", day: "numeric" });
const accomRange = b => { const n = nightsOf(b), last = new Date(new Date(b.to + "T12:00") - 864e5).toISOString().slice(0, 10);
  return `${shortDate(b.from)}${n > 1 ? "–" + (last.slice(5, 7) === b.from.slice(5, 7) ? +last.slice(8) : shortDate(last)) : ""} · ${n} night${n > 1 ? "s" : ""}`; };
const accomPick = b => b.options.find(o => o.booked) || b.options.find(o => o.preferred) || null;
const accomFor = d => { if (d.mon && d.mon !== MONTH) return null;
  const iso = `2026-11-${String(d.date).padStart(2, "0")}`; return ACCOM.find(b => b.from <= iso && iso < b.to) || null; };
const accomLabel = b => { if (b.tao) return "TAO boat + basecamps"; const p = accomPick(b);
  const bo = b.options.filter(o => o.booked);
  if (bo.length > 1) return bo.map(o => o.name).join(" or ") + (bo.some(o => o.booked.change) ? " (booked, change dates)" : " (both booked, cancellable)");
  if (p?.booked) return `${p.name} ${p.booked.cancellable ? "(booked, cancellable)" : "✓ booked"}`;
  if (p) return `${p.name} (preferred)`;
  return b.options.map(o => o.name).join(" or ") + (b.maybe ? " (maybe)" : " (not booked)"); };

/* Photos from Wikimedia Commons: [file, caption, credit, source page] per day */
const PICS = {
 "15": [
  [
   "images/days/panglao-1.jpg",
   "Alona Beach, Panglao",
   "Jeroen36 · CC BY 3.0",
   "https://commons.wikimedia.org/wiki/File:Alona_Beach,_Panglao_-_panoramio.jpg"
  ]
 ],
 "16": [
  [
   "images/days/tarsier-2.jpg",
   "Philippine tarsier",
   "Charles J. Sharp · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:Philippine_tarsier_(Carlito_syrichta_fraterculus)_Bohol.jpg"
  ],
  [
   "images/days/loboc-river-1.jpg",
   "Loboc River",
   "Qaalvin · CC BY-SA 3.0",
   "https://commons.wikimedia.org/wiki/File:Loboc_river.png"
  ]
 ],
 "17": [
  [
   "images/days/chocolate-hills-1.jpg",
   "Chocolate Hills",
   "Ramir Borja derivative work: MrPanyGoff · CC BY-SA 3.0",
   "https://commons.wikimedia.org/wiki/File:Chocolate_Hills_-_edit.jpg"
  ],
  [
   "images/days/bilar-forest-3.jpg",
   "Bilar mahogany forest",
   "Lawrence Ruiz · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:Bilar_Man-Made_Forest.jpg"
  ]
 ],
 "19": [
  [
   "images/days/hinagdanan-1.jpg",
   "Hinagdanan Cave",
   "Deepak-nsk · CC0",
   "https://commons.wikimedia.org/wiki/File:Snorkeling_in_Hinagdanan_Cave.jpg"
  ]
 ],
 "20": [
  [
   "images/days/el-nido-3.jpg",
   "Bacuit Bay, El Nido",
   "Vyacheslav Argenberg · CC BY 4.0",
   "https://commons.wikimedia.org/wiki/File:Limestone_island_in_Bacuit_Bay,_El_Nido,_Palawan,_Philippines.jpg"
  ],
  [
   "images/days/las-cabanas-2.jpg",
   "Las Cabanas Beach",
   "Tuderna · CC BY 3.0",
   "https://commons.wikimedia.org/wiki/File:Las_Cabanas_Beach_-_panoramio_(1).jpg"
  ]
 ],
 "21": [
  [
   "images/days/big-lagoon-1.jpg",
   "Big Lagoon",
   "Tuderna · CC BY 3.0",
   "https://commons.wikimedia.org/wiki/File:Big_lagoon_entrance,_Miniloc_island_-_panoramio.jpg"
  ],
  [
   "images/days/el-nido-4.jpg",
   "Lagoon in Bacuit Bay",
   "Vyacheslav Argenberg · CC BY 4.0",
   "https://commons.wikimedia.org/wiki/File:Island_lagoon_in_Bacuit_Bay,_El_Nido,_Palawan,_Philippines.jpg"
  ]
 ],
 "22": [
  [
   "images/days/taraw-1.jpg",
   "Taraw Cliff over El Nido town",
   "David Stanley from Nanaimo, Canada · CC BY 2.0",
   "https://commons.wikimedia.org/wiki/File:Taraw_Cliff,_El_Nido.jpg"
  ],
  [
   "images/days/taraw-3.jpg",
   "El Nido bay from above",
   "Micluna · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:El_Nido_Town_Beach.jpg"
  ]
 ],
 "23": [
  [
   "images/days/helicopter-island-1.jpg",
   "Helicopter Island",
   "Patrickroque01 · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:El_Nido_Helicopter_Island_(El_Nido,_Palawan;_08-05-2023).jpg"
  ]
 ],
 "24": [
  [
   "images/days/daracotan-1.jpg",
   "Hills of San Fernando, north El Nido",
   "Tuderna · CC BY 3.0",
   "https://commons.wikimedia.org/wiki/File:Over_the_Hills_of_San_Fernando,_North-Palawan_-_panoramio.jpg"
  ]
 ],
 "25": [
  [
   "images/days/linapacan-3.jpg",
   "Dicabaito Island, Linapacan",
   "Tuderna · CC BY 3.0",
   "https://commons.wikimedia.org/wiki/File:Dicabaito_Island_Calamian_Group_-_panoramio.jpg"
  ]
 ],
 "26": [
  [
   "images/days/culion-1.jpg",
   "Culion town",
   "Marsmux · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:Municipality_of_Culion_outlook_from_local_hillside.jpg"
  ]
 ],
 "27": [
  [
   "images/days/busuanga-1.jpg",
   "Busuanga coast (Black Island)",
   "pablosievert · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:Black_Island,_Busuanga.jpg"
  ]
 ],
 "28": [
  [
   "images/days/maquinit-2.jpg",
   "Maquinit Hot Springs",
   "Paul Christian B. Yang-ed · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:Maquinit_Hotspring_-_Mainit_na_Bukal_ng_Maquinit_-_Hotspring_in_Coron,_Palawan,_Philippines.jpg"
  ],
  [
   "images/days/tapyas-1.jpg",
   "Coron town from Mt Tapyas",
   "lumoplank · CC0",
   "https://commons.wikimedia.org/wiki/File:Mount_Tapyas_-_Tapyas1700.jpg"
  ]
 ],
 "29": [
  [
   "images/days/kayangan-1.jpg",
   "Kayangan Lake",
   "Myles Kadusale · CC BY 3.0",
   "https://commons.wikimedia.org/wiki/File:Coron_Kayangan_Lake_Entrance_(73005283).jpeg"
  ],
  [
   "images/days/twin-lagoon-1.jpg",
   "Twin Lagoon",
   "Franz C. Trinidad · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:Twin_Lagoon_Coron_Palawan.jpg"
  ],
  [
   "images/days/barracuda-2.jpg",
   "Barracuda Lake",
   "Ronavni · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:Barracuda_Lake_General_View.jpg"
  ]
 ],
 "30": [
  [
   "images/days/coron-town-3.jpg",
   "Coron town and bay",
   "Patrickroque01 · CC BY-SA 4.0",
   "https://commons.wikimedia.org/wiki/File:Coron_town_proper_skyline_sea_view_(Coron,_Palawan;_03-16-2024).jpg"
  ]
 ]
};

/* ---------- shared helpers (no need to edit) ---------- */
const img = q => "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(q);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const dayNum = d => DAYS.indexOf(d) + 1;
const ICON_CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h3l2-2.5h6L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.6"/></svg>';
const ICON_MOVE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const photosHTML = d => d.photos.length
  ? `<div class="photos">${d.photos.map(([label, q]) => `<a href="${img(q)}" target="_blank" rel="noopener">${ICON_CAM}${esc(label)} ↗</a>`).join("")}</div>` : "";
const picsHTML = d => { const P = (d.mon && d.mon !== MONTH) ? null : PICS[String(d.date)];
  return P?.length ? `<div class="pics">${P.map(([f, cap, cr, pg]) => `<figure><a href="${esc(pg)}" target="_blank" rel="noopener"><img src="${esc(f)}" alt="${esc(cap)}" loading="lazy"></a><figcaption>${esc(cap)}<small>${esc(cr)}</small></figcaption></figure>`).join("")}</div>` : ""; };
const stayText = (key, d) => {
  const b = d && accomFor(d);
  if (b) return accomLabel(b) + " · " + b.area;
  if (!key) return "On the plane";
  const s = STAYS[key];
  return s.name ? s.name : `Not booked yet · ${s.area}`;
};
