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
    date: 14,
    dow: "Sat",
    region: "In transit",
    pin: null,
    title: "Leave Calgary",
    lede: "Fly out on a Saturday so the travel days land on the weekend. Most fares connect in Vancouver and Manila, or in Taipei, on the way to Cebu.",
    plan: [
      ["Afternoon", "Calgary → Vancouver (or Seattle) for the long-haul connection."],
      ["Overnight", "The Pacific leg. You cross the date line and lose a day."],
    ],
    move: "YYC → YVR → MNL or TPE → CEB · about 30–32 hrs door to door",
    stay: null,
    tip: "If your ticket connects through Manila, it's a domestic plane change. Leave at least 2.5 hrs there; you clear immigration and may switch terminals.",
    photos: []  // [label, image search]
  },
  {
    date: 15,
    dow: "Sun",
    region: "In transit",
    pin: null,
    title: "Across the Pacific",
    lede: "Still travelling. Most current fares land in Cebu between 10 am and 11:30 am on the 16th.",
    plan: [
      ["Day", "Connection at your hub airport."],
      ["Night", "Overnight flight or layover."],
    ],
    move: "Hub → CEB",
    stay: null,
    tip: "Check the arrival time when you book: landing by about 12:30 pm on the 16th means you can reach Bohol the same day.",
    photos: []  // [label, image search]
  },
  {
    date: 16,
    dow: "Mon",
    region: "Bohol",
    pin: [10.31, 123.98],
    title: "Land in Cebu, ferry to Bohol",
    lede: "Land at Mactan-Cebu mid-morning, head straight to the pier and take the fast ferry across to Bohol. You're on Panglao by late afternoon.",
    plan: [
      ["~10–11 am", "Land at Cebu (CEB). Grab a SIM (Globe or Smart) and pesos at arrivals."],
      ["Midday", "Taxi or Grab to Pier 1, about 45 min."],
      ["13:00 or 14:00", "OceanJet fast ferry to Tagbilaran, about 2 hrs."],
      ["Evening", "20 min drive to Panglao, check in, early night."],
    ],
    move: "Taxi to the pier · fast ferry 2 hrs · taxi to Panglao",
    stay: "pgl",
    tip: "If your flight lands after about 1 pm, sleep near Cebu airport instead and take a morning ferry on the 17th. The Flights page shows which ferry each flight connects to.",
    photos: [["Cebu to Bohol ferry", "OceanJet Cebu Tagbilaran ferry"], ["Panglao", "Panglao Island Bohol beach"]]  // [label, image search]
  },
  {
    date: 17,
    dow: "Tue",
    region: "Bohol",
    pin: [9.687, 123.95],
    title: "Tarsiers and the Loboc River",
    lede: "An easy first full day, all within 45 minutes of Panglao. Meet the tiny Philippine tarsiers in their forest sanctuary, then paddle the jungle-lined Loboc River.",
    plan: [
      ["Morning", "Philippine Tarsier Sanctuary in Corella, run by the Philippine Tarsier Foundation. A short guided forest walk to spot them."],
      ["Midday", "Kayak or paddleboard the Loboc River."],
      ["Afternoon", "Swim in Hinagdanan Cave on Panglao, then sunset on the beach."],
    ],
    move: "Driver or tricycle · under 1 hr each way",
    stay: "pgl",
    tip: "Go to the Corella sanctuary, not roadside 'tarsier parks'. Keep quiet and no flash; they're nocturnal and stress easily.",
    photos: [["Tarsiers", "Philippine tarsier Corella sanctuary"], ["Loboc River", "Loboc River Bohol paddle"], ["Hinagdanan Cave", "Hinagdanan Cave Panglao"]]  // [label, image search]
  },
  {
    date: 18,
    dow: "Wed",
    region: "Bohol",
    pin: [9.83, 124.16],
    title: "The Chocolate Hills",
    lede: "The big one. Over 1,200 grassy limestone mounds that turn brown in the dry season. In November they will still be mostly green.",
    plan: [
      ["Early", "Leave around 6:30 to beat tour buses to the main viewpoint."],
      ["Morning", "ATV ride through the hills at the base."],
      ["Afternoon", "Drive back through the Bilar man-made mahogany forest."],
    ],
    move: "Driver hired for the day · about 1 hr 45 min each way",
    stay: "pgl",
    tip: "Your hotel can book a driver for the day. Split between two, it costs about the same as a tour and you set the schedule.",
    photos: [["Chocolate Hills", "Chocolate Hills Bohol"], ["Chocolate Hills ATV", "Chocolate Hills ATV ride"], ["Bilar forest", "Bilar man-made forest Bohol"]]  // [label, image search]
  },
  {
    date: 19,
    dow: "Thu",
    region: "Bohol",
    pin: [9.96, 124.22],
    title: "Adventure day at Danao",
    lede: "EAT Danao is Bohol's adventure park, built around a deep river gorge. This is your adrenaline day.",
    plan: [
      ["Morning", "The Plunge: a canyon swing over the Wahig River gorge."],
      ["Midday", "Suislide zipline and the sky ride across the canyon."],
      ["Afternoon", "River kayaking or caving in the park."],
    ],
    move: "Driver hired for the day · about 2 hrs each way",
    stay: "pgl",
    tip: "Check which activities are running before you go, and book the Plunge on arrival.",
    photos: [["EAT Danao", "EAT Danao adventure park Bohol"]]  // [label, image search]
  },
  {
    date: 20,
    dow: "Fri",
    region: "Bohol",
    pin: [9.93, 124.48],
    title: "Rice terraces and Can-umantad Falls",
    lede: "Bohol's quieter east side. Walk through the Cadapdapan rice terraces, climb down to Can-umantad Falls, the tallest on the island, and finish on Anda's white-sand beaches.",
    plan: [
      ["Morning", "Walk the Cadapdapan rice terraces."],
      ["Midday", "Steep stone steps down to Can-umantad Falls (15+ min each way), swim in the green pool below."],
      ["Afternoon", "Anda: Cabagnow Cave Pool and Quinale Beach before the drive back."],
    ],
    move: "Driver hired for the day · about 2.5 hrs each way",
    stay: "pgl",
    tip: "It's a long drive, so leave by 7 am.",
    photos: [["Can-umantad Falls", "Can-umantad Falls Bohol"], ["Cadapdapan terraces", "Cadapdapan rice terraces Candijay"], ["Anda beach", "Anda Bohol Quinale beach"]]  // [label, image search]
  },
  {
    date: 21,
    dow: "Sat",
    region: "El Nido",
    pin: [9.567, 123.77],
    title: "Fly Bohol → El Nido",
    lede: "A slow morning on Panglao, then the direct afternoon flight to El Nido. You land in time for dinner in town.",
    plan: [
      ["Morning", "Last swim on Panglao, check out by noon."],
      ["13:30", "At Bohol-Panglao airport (TAG), 15 min from most Panglao hotels."],
      ["15:40", "Cebgo DG 5611 nonstop to El Nido, about 1 hr 50 min."],
      ["Evening", "Tricycle into town (20 min), dinner, book tours for the next days."],
    ],
    move: "Direct flight TAG → ENI · tricycle to town",
    stay: "eni",
    tip: "This nonstop only runs some days (Mon, Tue, Thu and Sat, plus a Sunday flight), so don't move this day without checking. Small ATR plane: book early and add checked bags when you buy.",
    photos: [["El Nido", "El Nido Palawan limestone cliffs"], ["El Nido airport", "Lio airport El Nido"]]  // [label, image search]
  },
  {
    date: 22,
    dow: "Sun",
    region: "El Nido",
    pin: [11.137, 119.318],
    title: "Island hopping: lagoons",
    lede: "The classic boat tour. Kayak into the Big and Small Lagoons, walled in by sheer rock.",
    plan: [
      ["Full day", "Tour A: Big Lagoon, Small Lagoon, Secret Lagoon and Shimizu Island, with lunch on the boat."],
    ],
    move: "Bangka boat · 8 am – 4 pm",
    stay: "eni",
    tip: "A private boat split with others lets you reach the lagoons before the crowds. Bring reef-safe sunscreen.",
    photos: [["Big Lagoon", "El Nido Big Lagoon kayak"], ["Small Lagoon", "El Nido Small Lagoon"]]  // [label, image search]
  },
  {
    date: 23,
    dow: "Mon",
    region: "El Nido",
    pin: [11.197, 119.402],
    title: "Taraw Cliff climb",
    lede: "El Nido's big hike is right behind town: a steep, guided scramble up razor-sharp limestone to a summit view over the whole bay.",
    plan: [
      ["Early", "Guided Taraw Cliff climb, about 1 hr up on rock and fixed ropes. Go at 6 am before the heat."],
      ["Afternoon", "Rent a kayak from the beach and paddle out to Cadlao Island."],
      ["Sunset", "Las Cabanas Beach."],
    ],
    move: "Walk from town · kayak from the beach",
    stay: "eni",
    tip: "Wear proper shoes and gloves if the guide offers them. The limestone cuts. Book the climb through a licensed guide in town.",
    photos: [["Taraw Cliff", "Taraw Cliff El Nido view"], ["Cadlao Island", "Cadlao Island El Nido kayak"], ["Las Cabanas", "Las Cabanas beach El Nido sunset"]]  // [label, image search]
  },
  {
    date: 24,
    dow: "Tue",
    region: "El Nido",
    pin: [11.165, 119.275],
    title: "Tour C: sea cave, shrine and cliffs",
    lede: "A boat day out to the wilder northern islands. Swim through a sea cave to a beach sealed off by cliffs, climb carved steps to a clifftop shrine, and finish at Helicopter Island.",
    plan: [
      ["Morning", "Hidden Beach on Matinloc: swim through a short cave passage to a white-sand beach enclosed by limestone."],
      ["Midday", "Matinloc Shrine: 10–15 min climb up steep carved steps to a lookout about 50 m above the sea."],
      ["Afternoon", "Secret Beach, Tapiutan Strait and Helicopter Island, with lunch on a beach on the way."],
    ],
    move: "Bangka boat from town · about 8 am – 5 pm",
    stay: "eni",
    tip: "Takes basic swimming for the cave; everything else is easy. Wear grippy water shoes for the shrine steps. Shared tours are around ₱1,500–1,800 each, plus ₱300 in fees.",
    photos: [["Hidden Beach", "Hidden Beach El Nido Matinloc"], ["Matinloc Shrine", "Matinloc Shrine viewpoint El Nido"], ["Helicopter Island", "Helicopter Island El Nido"]]  // [label, image search]
  },
  {
    date: 25,
    dow: "Wed",
    region: "Coron",
    pin: [12.005, 120.205],
    title: "Ferry to Coron, sunset on Mt Tapyas",
    lede: "Ride the fast ferry north through the island chain to Coron, arriving around lunch. Climb the town's viewpoint for sunset and finish in a saltwater hot spring.",
    plan: [
      ["07:20", "Check in at El Nido port (1 hr before)."],
      ["08:20", "Phimal fast ferry to Coron, arriving about 12:20. Montenegro also leaves at 12:00, arriving about 16:00."],
      ["Sunset", "Climb the 721 steps up Mt Tapyas (about 30 min)."],
      ["Evening", "Soak at Maquinit Hot Springs (about 40°C saltwater)."],
    ],
    move: "Fast ferry 3–4 hrs (₱3,175–3,290) · or a 40 min AirSWIFT flight",
    stay: "crn",
    tip: "Book the ferry ahead and bring a printed ticket. If seas are rough the ferry can be cancelled; the Saturday free day in Coron absorbs a one-day delay.",
    photos: [["El Nido to Coron ferry", "El Nido to Coron fast ferry"], ["Mt Tapyas", "Mt Tapyas Coron sunset"], ["Maquinit Hot Springs", "Maquinit Hot Springs Coron"]]  // [label, image search]
  },
  {
    date: 26,
    dow: "Thu",
    region: "Coron",
    pin: [11.94, 120.24],
    title: "Coron Island lakes and lagoons",
    lede: "Coron Island is a wall of black limestone with lakes hidden inside it. Climb over the ridge to Kayangan Lake, swim through a gap in the rock at Twin Lagoon, and float in Barracuda Lake.",
    plan: [
      ["Morning", "Kayangan Lake: a steep 10-min climb to the famous viewpoint, then down to the clear lake."],
      ["Midday", "Twin Lagoon: swim or paddle through the gap between the two lagoons."],
      ["Afternoon", "Barracuda Lake, where warm and cool water layer under the surface."],
    ],
    move: "Bangka boat tour · pickup in town",
    stay: "crn",
    tip: "Leave on the earliest boat. Kayangan gets crowded by 10 am.",
    photos: [["Kayangan Lake", "Kayangan Lake Coron viewpoint"], ["Twin Lagoon", "Twin Lagoon Coron"], ["Barracuda Lake", "Barracuda Lake Coron"]]  // [label, image search]
  },
  {
    date: 27,
    dow: "Fri",
    region: "Coron",
    pin: [12.06, 120.15],
    title: "Mt Tundalara hike",
    lede: "The highest peak on Busuanga. A proper half-day hike: about 2 hours up through forest with steep sections and some rock scrambling, then wide views over the whole island group.",
    plan: [
      ["Early", "Tricycle to the trailhead at Mabintangen, start by 6 am."],
      ["Morning", "2 hrs up, 3–5 hrs round trip with a local guide."],
      ["Evening", "Firefly and bioluminescent plankton tour at Kingfisher Park, or a rest."],
    ],
    move: "Tricycle to the trailhead · arrange pickup in advance",
    stay: "crn",
    tip: "Book the guide and the tricycle pickup through your hotel the day before. Bring plenty of water; there's little shade near the top.",
    photos: [["Mt Tundalara", "Mt Tundalara Coron hike"], ["Kingfisher Park", "Kingfisher Park Coron fireflies"]]  // [label, image search]
  },
  {
    date: 28,
    dow: "Sat",
    region: "Coron",
    pin: null,
    title: "Free day in Coron",
    lede: "An open day, and your buffer if weather delayed the ferry. Pick whatever you liked most, or rest before the trip home.",
    plan: [
      ["Option", "Beach-hopping boat tour: Malcapuya, Banana and Bulog Dos islands."],
      ["Option", "Kayak the mangroves and Siete Pecados."],
      ["Option", "Rest, massage, and a long lunch in town."],
    ],
    move: "Local",
    stay: "crn",
    tip: "If the ferry from El Nido slipped a day, this is the day that absorbs it.",
    photos: [["Malcapuya Island", "Malcapuya Island Coron"], ["Siete Pecados", "Siete Pecados Coron"]]  // [label, image search]
  },
  {
    date: 29,
    dow: "Sun",
    region: "Cebu",
    pin: [12.12, 120.04],
    title: "Fly Coron → Cebu",
    lede: "A late morning in Coron, then a short flight back to Cebu and a night next to the airport for tomorrow's long-haul.",
    plan: [
      ["Morning", "Airport van from Coron town to Busuanga airport, about 40 min."],
      ["Midday", "Fly Busuanga (USU) → Cebu, about 1 hr 20 min. Nonstops leave from about 09:35 to 17:05."],
      ["Evening", "Hotel on Mactan, near the terminal."],
    ],
    move: "Airport van · nonstop flight 1 hr 20 min",
    stay: "mct",
    tip: "Pick a midday flight so a delay still gets you to Cebu tonight. The Flights page shows today's options.",
    photos: [["Busuanga airport", "Busuanga airport Coron"], ["Mactan", "Mactan Island Cebu beach"]]  // [label, image search]
  },
  {
    date: 30,
    dow: "Mon",
    region: "In transit",
    pin: null,
    title: "Fly home",
    lede: "Cebu → hub → Calgary. Thanks to the date line you land in Calgary the same calendar day, and you're back at work Tuesday.",
    plan: [
      ["Day", "Long-haul home."],
    ],
    move: "CEB → hub → YYC",
    stay: null,
    tip: "",
    photos: []  // [label, image search]
  },
];

const STAYS = {
  pgl: { name: "", link: "", area: "Panglao Island, Bohol", nights: "Nov 16–20 · 5 nights",
        hint: "Alona Beach is lively and walkable; Dumaluan and Danao beach are quieter. Close to both Tagbilaran port and the airport." },
  eni: { name: "", link: "", area: "El Nido town or Corong-Corong", nights: "Nov 21–24 · 4 nights",
        hint: "Town is central for boat tours and the ferry port; Corong-Corong is calmer with better sunsets. Check for twin beds." },
  crn: { name: "", link: "", area: "Coron town", nights: "Nov 25–28 · 4 nights",
        hint: "Stay in town, near the pier. Boat tours and tricycles leave from here; the airport is 40 min away." },
  mct: { name: "", link: "", area: "Mactan, near Cebu airport", nights: "Nov 29 · 1 night",
        hint: "Close to the terminal for the flight home." },
};

/* Legs group the days in the list */
const LEGS = [
  { name: "Getting there", sub: "Calgary → Cebu",                            region: "In transit", days: [14, 15] },
  { name: "Bohol",         sub: "Tarsiers · Chocolate Hills · canyons · falls", region: "Bohol",   days: [16, 17, 18, 19, 20] },
  { name: "El Nido",       sub: "Bacuit Bay · Taraw Cliff · sea caves",       region: "El Nido",    days: [21, 22, 23, 24] },
  { name: "Coron",         sub: "Hot springs · lakes · Mt Tundalara",         region: "Coron",      days: [25, 26, 27, 28] },
  { name: "Heading home",  sub: "Coron → Cebu → Calgary",                     region: "Cebu",       days: [29, 30] }
];

/* Travel lines on the map: [lat, lng] points, mode "fly" (dashed arc) or "ground" (solid) */
const ROUTE = [
  { mode: "ground", pts: [[10.31, 123.98], [10.29, 123.90], [9.645, 123.85], [9.55, 123.77]] },  // Cebu airport → pier → ferry → Panglao
  { mode: "fly",    pts: [[9.567, 123.77], [11.18, 119.39]] },                                   // Bohol → El Nido
  { mode: "ground", pts: [[11.18, 119.39], [11.62, 119.86], [12.00, 120.205]] },                 // ferry El Nido → Coron
  { mode: "ground", pts: [[12.00, 120.205], [12.12, 120.04]] },                                  // Coron town → Busuanga airport
  { mode: "fly",    pts: [[12.12, 120.04], [10.31, 123.98]] }                                    // Busuanga → Cebu
];

const COLORS = { "Coron": "#0038A8", "El Nido": "#0038A8", "Bohol": "#CE1126", "Cebu": "#0B0B0C", "In transit": "#0B0B0C" };
const MONTH = "Nov";

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
