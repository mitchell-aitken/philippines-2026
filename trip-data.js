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
    lede: "Fly out on a Saturday so the travel days land on the weekend. There are no nonstop flights, so expect a connection in Vancouver, Seoul, Taipei or Hong Kong on the way to Cebu.",
    plan: [
      ["Day", "Calgary → first connection."],
      ["Overnight", "The long Pacific leg. You cross the date line and lose a day."],
    ],
    move: "YYC → hub → CEB · roughly 20–26 hrs door to door",
    stay: null,
    tip: "If your ticket connects through Manila, it's only a plane change. Stay airside if you can and check whether you need to switch terminals.",
    photos: []  // [label, image search]
  },
  {
    date: 15,
    dow: "Sun",
    region: "In transit",
    pin: null,
    title: "Across the Pacific",
    lede: "Still travelling. Depending on the connection you land in Cebu late tonight or early tomorrow.",
    plan: [
      ["Day", "Connection at your hub airport."],
      ["Late", "Final short flight into Cebu (CEB)."],
    ],
    move: "Hub → CEB",
    stay: null,
    tip: "If your flight lands on the evening of the 15th, add a night to the Mactan hotel.",
    photos: []  // [label, image search]
  },
  {
    date: 16,
    dow: "Mon",
    region: "Cebu",
    pin: [10.31, 123.98],
    title: "Land in Cebu",
    lede: "Arrive at Mactan-Cebu International. Take an easy first day: sleep, swim, eat, and shake off the jet lag. Grab or a metered taxi gets you to the hotel.",
    plan: [
      ["Arrival", "Get a local SIM (Globe or Smart) at arrivals and some pesos from an ATM."],
      ["Afternoon", "Rest at the hotel. Mactan has beach resorts a short ride from the airport."],
      ["Evening", "Early night."],
    ],
    move: "Airport → hotel · 10–20 min",
    stay: "mct1",
    tip: "Book tomorrow's Coron flight for late morning so a delayed arrival doesn't wreck it.",
    photos: [["Mactan Island", "Mactan Island Cebu beach"]]  // [label, image search]
  },
  {
    date: 17,
    dow: "Tue",
    region: "Coron",
    pin: [12.005, 120.205],
    title: "Fly to Coron",
    lede: "A short flight to Busuanga, the island next to Coron. Settle into Coron town, then climb its viewpoint for sunset and finish in a saltwater hot spring.",
    plan: [
      ["Morning", "Fly Cebu → Busuanga (PAL, Cebgo or Sunlight Air, about 1 hr 40 min). Van to Coron town, about 40 min."],
      ["Sunset", "Climb the 721 steps up Mt Tapyas (about 30 min) for the view over Coron Island."],
      ["Evening", "Soak at Maquinit Hot Springs, one of the few saltwater hot springs in the world (about 40°C)."],
    ],
    move: "Flight + airport van · tricycle around town",
    stay: "crn",
    tip: "Several airlines fly this route, so fares are much lower than to El Nido. Book the airport van with your hotel.",
    photos: [["Coron town", "Coron Palawan town view"], ["Mt Tapyas", "Mt Tapyas Coron sunset"], ["Maquinit Hot Springs", "Maquinit Hot Springs Coron"]]  // [label, image search]
  },
  {
    date: 18,
    dow: "Wed",
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
    date: 19,
    dow: "Thu",
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
    date: 20,
    dow: "Fri",
    region: "El Nido",
    pin: [11.18, 119.39],
    title: "Ferry to El Nido",
    lede: "A morning fast ferry down the chain of islands to El Nido, with limestone cliffs rising straight out of the sea all around. You arrive before lunch.",
    plan: [
      ["6–7 am", "Fast ferry Coron → El Nido, about 3.5–5 hrs depending on the boat."],
      ["Afternoon", "Tricycle to your hotel, book tours for the next days."],
      ["Sunset", "Las Cabanas Beach."],
    ],
    move: "Fast ferry · ₱1,700–3,000 each",
    stay: "eni",
    tip: "Book online a week or two ahead. The crossing can be cancelled in rough weather; if it is, take the next day's boat and drop one El Nido day.",
    photos: [["Coron to El Nido ferry", "Coron to El Nido fast ferry"], ["Las Cabanas", "Las Cabanas beach El Nido sunset"]]  // [label, image search]
  },
  {
    date: 21,
    dow: "Sat",
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
    date: 22,
    dow: "Sun",
    region: "El Nido",
    pin: [11.197, 119.402],
    title: "Taraw Cliff climb",
    lede: "El Nido's big hike is right behind town: a steep, guided scramble up razor-sharp limestone to a summit view over the whole bay.",
    plan: [
      ["Early", "Guided Taraw Cliff climb, about 1 hr up on rock and fixed ropes. Go at 6 am before the heat."],
      ["Afternoon", "Rent a kayak from the beach and paddle out to Cadlao Island."],
      ["Sunset", "Drinks on the beach in town."],
    ],
    move: "Walk from town · kayak from the beach",
    stay: "eni",
    tip: "Wear proper shoes and gloves if the guide offers them. The limestone cuts. Book the climb through a licensed guide in town.",
    photos: [["Taraw Cliff", "Taraw Cliff El Nido view"], ["Cadlao Island", "Cadlao Island El Nido kayak"]]  // [label, image search]
  },
  {
    date: 23,
    dow: "Mon",
    region: "El Nido",
    pin: [11.165, 119.275],
    title: "Tour C: sea cave, shrine and cliffs",
    lede: "A boat day out to the wilder northern islands. Swim through a sea cave to a beach sealed off by cliffs, climb carved steps to a clifftop shrine, and finish at Helicopter Island. It leaves right from town, and it's quieter than Tour A.",
    plan: [
      ["Morning", "Hidden Beach on Matinloc: swim through a short cave passage to a white-sand beach enclosed by limestone."],
      ["Midday", "Matinloc Shrine: 10–15 min climb up steep carved steps to a lookout about 50 m above the sea."],
      ["Afternoon", "Secret Beach, Tapiutan Strait and Helicopter Island, with lunch on a beach on the way."],
      ["Evening", "Last night in Palawan."],
    ],
    move: "Bangka boat from town · about 8 am – 5 pm",
    stay: "eni",
    tip: "Takes basic swimming for the cave; everything else is easy. Wear grippy water shoes for the shrine steps. Shared tours are around ₱1,500–1,800 each, plus ₱300 in fees.",
    photos: [["Hidden Beach", "Hidden Beach El Nido Matinloc"], ["Matinloc Shrine", "Matinloc Shrine viewpoint El Nido"], ["Helicopter Island", "Helicopter Island El Nido"]]  // [label, image search]
  },
  {
    date: 24,
    dow: "Tue",
    region: "Bohol",
    pin: [9.55, 123.77],
    title: "Fly to Cebu, ferry to Bohol",
    lede: "A travel day. Fly back to Cebu, then take the fast ferry across to Bohol and settle in on Panglao Island.",
    plan: [
      ["Morning", "Fly El Nido → Cebu (Cebgo, about 1 hr 50 min). Tricycle to El Nido airport, about 20 min."],
      ["Afternoon", "Taxi to Pier 1, fast ferry to Tagbilaran (about 2 hrs)."],
      ["Evening", "Check in on Panglao, dinner by the beach."],
    ],
    move: "Flight + ferry 2 hrs",
    stay: "pgl",
    tip: "This is the one pricey flight (about US$105–125 one way). Take the morning flight and book OceanJet or SuperCat for mid-afternoon to leave slack.",
    photos: [["Panglao beaches", "Panglao Island Bohol beach"]]  // [label, image search]
  },
  {
    date: 25,
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
    date: 26,
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
    date: 27,
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
    date: 28,
    dow: "Sat",
    region: "Bohol",
    pin: [9.64, 124.03],
    title: "River, tarsiers and caves",
    lede: "An easier day closer to Panglao, and a buffer if weather pushed anything back. Paddle the jungle-lined Loboc River, see the tiny tarsiers, and swim in a cave pool.",
    plan: [
      ["Morning", "Kayak or paddleboard the Loboc River."],
      ["Midday", "Tarsiers at the Corella sanctuary."],
      ["Afternoon", "Swim in Hinagdanan Cave on Panglao, then a last Bohol sunset."],
    ],
    move: "Driver or tricycle · under 1 hr each way",
    stay: "pgl",
    tip: "Go to the Corella tarsier sanctuary run by the Philippine Tarsier Foundation. It is the ethical option; keep quiet and no flash.",
    photos: [["Loboc River", "Loboc River Bohol"], ["Tarsiers", "Philippine tarsier Corella sanctuary"], ["Hinagdanan Cave", "Hinagdanan Cave Panglao"]]  // [label, image search]
  },
  {
    date: 29,
    dow: "Sun",
    region: "Cebu",
    pin: [10.29, 123.9],
    title: "Ferry back to Cebu",
    lede: "A slow morning on the beach, then the ferry back to Cebu and a last night near the airport.",
    plan: [
      ["Morning", "Last swim on Panglao."],
      ["Afternoon", "Fast ferry Tagbilaran → Cebu (about 2 hrs), taxi to Mactan (about 45 min)."],
      ["Evening", "Pack, early night."],
    ],
    move: "Ferry 2 hrs + taxi",
    stay: "mct2",
    tip: "Sleeping near the airport tonight means the ferry can't make you miss your flight home.",
    photos: [["Tagbilaran ferry", "OceanJet Tagbilaran Cebu ferry"]]  // [label, image search]
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
  mct1: { name: "", link: "", area: "Mactan, near Cebu airport", nights: "Nov 16 · 1 night",
        hint: "A beach resort on Mactan makes a good first night. Add Nov 15 if you land that evening." },
  crn: { name: "", link: "", area: "Coron town", nights: "Nov 17–19 · 3 nights",
        hint: "Stay in town, near the pier. Boat tours, tricycles and the ferry to El Nido all leave from here." },
  eni: { name: "", link: "", area: "El Nido town or Corong-Corong", nights: "Nov 20–23 · 4 nights",
        hint: "Town is central for boat tours and the ferry port; Corong-Corong is calmer with better sunsets. Check for twin beds." },
  pgl: { name: "", link: "", area: "Panglao Island, Bohol", nights: "Nov 24–28 · 5 nights",
        hint: "Alona Beach is lively and walkable; Dumaluan and Danao beach are quieter. Many hostels have private twin rooms." },
  mct2: { name: "", link: "", area: "Mactan, near Cebu airport", nights: "Nov 29 · 1 night",
        hint: "Close to the terminal for the flight home." },
};

/* Legs group the days in the list */
const LEGS = [
  { name: "Getting there", sub: "Calgary → Cebu",                       region: "Cebu",    days: [14, 15, 16] },
  { name: "Coron",         sub: "Lakes · Mt Tundalara · hot springs",    region: "Coron",   days: [17, 18, 19] },
  { name: "El Nido",       sub: "Bacuit Bay · Taraw Cliff · sea caves", region: "El Nido", days: [20, 21, 22, 23] },
  { name: "Bohol",         sub: "Chocolate Hills · canyons · waterfalls", region: "Bohol",  days: [24, 25, 26, 27, 28] },
  { name: "Heading home",  sub: "Cebu → Calgary",                        region: "Cebu",    days: [29, 30] }
];

/* Travel lines on the map: [lat, lng] points, mode "fly" (dashed arc) or "ground" (solid) */
const ROUTE = [
  { mode: "fly",    pts: [[10.31, 123.98], [12.12, 120.04]] },                    // Cebu → Busuanga
  { mode: "ground", pts: [[12.12, 120.04], [12.00, 120.205]] },                   // airport → Coron town
  { mode: "ground", pts: [[12.00, 120.205], [11.62, 119.86], [11.18, 119.39]] },  // ferry Coron → El Nido
  { mode: "fly",    pts: [[11.18, 119.39], [10.31, 123.98]] },                    // El Nido → Cebu
  { mode: "ground", pts: [[10.31, 123.98], [10.29, 123.90], [9.645, 123.85], [9.55, 123.77]] } // Cebu ⇄ Bohol ferry
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
