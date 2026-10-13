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
    lede: "Fly out Friday evening. Your 13 days off cover Nov 13, Nov 16–27, Nov 30 and Dec 1.",
    plan: [
      ["19:10", "WestJet WS 127 Calgary → Vancouver (Calgary time), landing 19:55."],
      ["Layover", "4 hrs 10 min in Vancouver, international departures."],
      ["00:05", "Philippine Airlines PR 117 Vancouver → Manila, overnight across the Pacific. You cross the date line and lose a day."],
    ],
    move: "YYC → Vancouver → Manila · 20 hrs 20 min",
    stay: null,
    tip: "Book the round trip as one ticket (WS 127 + PR 117 out, PR 116 + WS 126 home) and the Manila → Panglao flight separately.",
    photos: []  // [label, image search]
  },
  {
    date: 14,
    dow: "Sat",
    region: "In transit",
    pin: null,
    title: "Across the Pacific",
    lede: "PR 117 leaves Vancouver just after midnight and lands in Manila at 05:30 on Sun Nov 15, Manila time.",
    plan: [
      ["00:05", "Philippine Airlines PR 117 leaves Vancouver (Vancouver time)."],
      ["In the air", "About 14.5 hrs over the Pacific. You cross the date line, so most of Saturday disappears."],
    ],
    move: "Over the Pacific → Manila",
    stay: null,
    tip: "Manila NAIA has several terminals. Philippine Airlines arrives at Terminal 1; Cebu Pacific domestic flights leave from Terminal 3, a 20–30 min transfer.",
    photos: []  // [label, image search]
  },
  {
    date: 15,
    dow: "Sun",
    region: "Bohol",
    pin: [9.567, 123.77],
    title: "Arrive in Bohol",
    lede: "Land in Manila at dawn, hop on a short morning flight to Bohol, and be on Panglao by lunch.",
    plan: [
      ["05:30", "Land in Manila (Terminal 1). Get a SIM (Globe or Smart) and pesos, then transfer to Terminal 3."],
      ["09:50", "Cebu Pacific 5J 617 to Bohol-Panglao, landing 11:35."],
      ["Midday", "15 min to the hotel. Lunch, then sleep off the flight."],
      ["Evening", "Sunset on the beach, early night."],
    ],
    move: "Terminal transfer · 1 hr 45 min flight · 15 min taxi",
    stay: "pgl",
    tip: "The Manila → Panglao flight is a separate ticket, so the 4+ hours between flights is your buffer. Don't book anything earlier than about 08:30.",
    photos: [["Panglao", "Panglao Island Bohol beach"], ["Cebu to Bohol ferry", "OceanJet Cebu Tagbilaran ferry"]]  // [label, image search]
  },
  {
    date: 16,
    dow: "Mon",
    region: "Bohol",
    pin: [9.687, 123.95],
    title: "Tarsiers and the Loboc River",
    lede: "An easy first full day, all within 45 minutes of Panglao. Meet the tiny Philippine tarsiers in their forest sanctuary, then paddle the jungle-lined Loboc River.",
    plan: [
      ["Morning", "Philippine Tarsier Sanctuary in Corella, run by the Philippine Tarsier Foundation. A short guided forest walk to spot them."],
      ["Midday", "Kayak or paddleboard the Loboc River."],
      ["Afternoon", "Back to Panglao for sunset on the beach."],
    ],
    move: "Driver or tricycle · under 1 hr each way",
    stay: "pgl",
    tip: "Go to the Corella sanctuary, not roadside 'tarsier parks'. Keep quiet and no flash; they're nocturnal and stress easily.",
    photos: [["Tarsiers", "Philippine tarsier Corella sanctuary"], ["Loboc River", "Loboc River Bohol paddle"]]  // [label, image search]
  },
  {
    date: 17,
    dow: "Tue",
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
    date: 18,
    dow: "Wed",
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
    date: 19,
    dow: "Thu",
    region: "Bohol",
    pin: [9.615, 123.765],
    title: "Napaling sardine run",
    lede: "Snorkel straight off the cliffs at Napaling Reef into a swirling wall of sardines, 15 minutes from Alona Beach. Then cool off in a cave pool.",
    plan: [
      ["Early", "Napaling Reef: steps and a ramp lead down from the cliff into a roped-off area. The sardines gather along the reef wall; float still and they surround you. Allow 2 hrs."],
      ["Afternoon", "Swim in Hinagdanan Cave, a lit limestone cave with a clear pool."],
      ["Sunset", "Dinner on Alona Beach."],
    ],
    move: "Tricycle · about 15 min from Alona Beach",
    stay: "pgl",
    tip: "Entry plus a guide is about ₱300 each and the guide isn't optional. Bring your own snorkel and mask if you can; rentals are hit or miss. Go early, before the tour groups.",
    photos: [["Napaling sardine run", "Napaling Reef sardine run Panglao"], ["Hinagdanan Cave", "Hinagdanan Cave Panglao"]]  // [label, image search]
  },
  {
    date: 20,
    dow: "Fri",
    region: "El Nido",
    pin: [9.567, 123.77],
    title: "Fly Bohol → El Nido",
    lede: "A slow last morning on Panglao, then the direct afternoon flight to El Nido. You land in time for dinner in town.",
    plan: [
      ["Morning", "Last swim on Panglao, check out by noon."],
      ["13:30", "At Bohol-Panglao airport (TAG), 15 min from most Panglao hotels."],
      ["15:50", "Cebgo DG 6888 nonstop to El Nido, landing about 17:35."],
      ["Evening", "Tricycle into town (20 min), dinner, book tours for the next days."],
    ],
    move: "Direct flight TAG → ENI · tricycle to town",
    stay: "eni",
    tip: "This nonstop only runs on some days of the week (Friday is one), so don't move this day without checking. It's a small ATR plane: book early and add checked bags when you buy.",
    photos: [["El Nido", "El Nido Palawan limestone cliffs"], ["Panglao", "Panglao Island Bohol beach"]]  // [label, image search]
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
      ["Sunset", "Las Cabanas Beach."],
    ],
    move: "Walk from town · kayak from the beach",
    stay: "eni",
    tip: "Wear proper shoes and gloves if the guide offers them. The limestone cuts. Book the climb through a licensed guide in town.",
    photos: [["Taraw Cliff", "Taraw Cliff El Nido view"], ["Cadlao Island", "Cadlao Island El Nido kayak"], ["Las Cabanas", "Las Cabanas beach El Nido sunset"]]  // [label, image search]
  },
  {
    date: 23,
    dow: "Mon",
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
    date: 24,
    dow: "Tue",
    region: "El Nido",
    pin: [11.163, 119.385],
    title: "Free day in El Nido",
    lede: "An open day in El Nido, and your buffer if weather cancelled a boat tour earlier in the week.",
    plan: [
      ["Option", "Tour B: walk the Snake Island sandbar and explore Cathedral Cave."],
      ["Option", "Zipline from Las Cabanas out to Depeldet Islet, then a beach afternoon."],
      ["Option", "Rest, a massage, and sunset drinks in town."],
    ],
    move: "Walk, tricycle or boat",
    stay: "eni",
    tip: "If a tour was rained out, swap it in here.",
    photos: [["Las Cabanas zipline", "Las Cabanas zipline El Nido"], ["Cathedral Cave", "Cathedral Cave El Nido"]]  // [label, image search]
  },
  {
    date: 25,
    dow: "Wed",
    region: "Coron",
    pin: [11.985, 120.25],
    title: "Ferry to Coron, Maquinit Hot Springs",
    lede: "Ride the fast ferry north through the island chain to Coron, arriving around lunch. Climb the town's viewpoint for sunset, then soak in Maquinit, one of the few saltwater hot springs in the world.",
    plan: [
      ["07:20", "Check in at El Nido port (1 hr before)."],
      ["08:20", "Phimal fast ferry to Coron, arriving about 12:20. Montenegro also leaves at 12:00, arriving about 16:00."],
      ["Sunset", "Climb the 721 steps up Mt Tapyas (about 30 min)."],
      ["Evening", "Maquinit Hot Springs: stone pools of 40°C saltwater on the edge of the mangroves, 20 min by tricycle. Open until 10 pm, about ₱150 entry."],
    ],
    move: "Fast ferry 3–4 hrs (₱3,175–3,290) · or a 40 min AirSWIFT flight",
    stay: "crn",
    tip: "Book the ferry ahead and bring a printed ticket. If seas are rough the ferry can be cancelled; the free days in Coron absorb a delay.",
    photos: [["Maquinit Hot Springs", "Maquinit Hot Springs Coron"], ["Mt Tapyas", "Mt Tapyas Coron sunset"], ["El Nido to Coron ferry", "El Nido to Coron fast ferry"]]  // [label, image search]
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
    title: "Beach-hopping boat day",
    lede: "A gentler boat day to Coron's white-sand islands, after the big hike.",
    plan: [
      ["Full day", "Malcapuya, Banana and Bulog Dos islands: swim, walk the sandbars, lunch on the beach."],
    ],
    move: "Bangka boat tour · pickup in town",
    stay: "crn",
    tip: "Ask for a private boat if you can split it; you can set your own pace.",
    photos: [["Malcapuya Island", "Malcapuya Island Coron"], ["Bulog Dos", "Bulog Dos Island Coron"]]  // [label, image search]
  },
  {
    date: 29,
    dow: "Sun",
    region: "Coron",
    pin: [12.3, 119.88],
    title: "Calauit Safari, or a slow day",
    lede: "An optional long day trip to Calauit, a wildlife sanctuary on Busuanga's far tip where giraffes and zebras roam with the native Calamian deer. Or keep it easy in town.",
    plan: [
      ["05:00", "Van pickup for Calauit Safari Park, about 2 hrs each way."],
      ["Morning", "Safari ride and feeding the giraffes, plus Calamian deer and Palawan bearded pigs."],
      ["Afternoon", "Beach stop on the way back. Skip it all if you'd rather rest."],
    ],
    move: "Van tour from town · or nothing at all",
    stay: "crn",
    tip: "It's a long day in a van. Only worth it if the animals appeal; otherwise use the day for a second Coron Island boat tour or rest.",
    photos: [["Calauit Safari", "Calauit Safari Park giraffes"], ["Calamian deer", "Calamian deer Calauit"]]  // [label, image search]
  },
  {
    date: 30,
    dow: "Mon",
    region: "Coron",
    pin: [12.008, 120.21],
    title: "Last day in Coron",
    lede: "A slow last day. Catch the view from Mt Tapyas one more time, soak at Maquinit, and pack for an early start.",
    plan: [
      ["Morning", "Sunrise from Mt Tapyas, or sleep in."],
      ["Afternoon", "Kayak or paddleboard around the bay, or souvenir shopping in town."],
      ["Evening", "Last soak at Maquinit Hot Springs, early night."],
    ],
    move: "Tricycle around town",
    stay: "crn",
    tip: "Book the airport van for about 06:15 tomorrow.",
    photos: [["Coron town", "Coron Palawan town view"], ["Maquinit Hot Springs", "Maquinit Hot Springs Coron night"]]  // [label, image search]
  },
  {
    date: 1,
    dow: "Tue",
    region: "In transit",
    pin: [15.186, 120.56],
    title: "Coron → Clark → Manila → home",
    lede: "A long but simple travel day: a short flight to Clark, a bus to Manila airport, and the evening flight home. Thanks to the date line you land in Calgary the same night, and you're back at work Wednesday.",
    mon: "Dec",
    plan: [
      ["06:15", "Van from Coron town to Busuanga airport (40 min)."],
      ["08:00", "Cebgo DG 6042 to Clark, landing 09:25. Later nonstops at 08:30, 08:50, 12:20 and 13:20 still make the flight home."],
      ["Late morning", "Genesis P2P bus from Clark Airport to Manila NAIA, 2–3 hrs (₱450), or a private car."],
      ["21:05", "Philippine Airlines PR 116 Manila → Vancouver, landing 18:00 (Vancouver time)."],
      ["20:30", "After customs and a 2 hr 30 min connection, WestJet WS 126 Vancouver → Calgary, landing 23:00 Calgary time."],
    ],
    move: "Flight 1 hr 25 min · bus 2–3 hrs · long-haul home",
    stay: null,
    tip: "The Clark flight is a separate ticket, so take the morning one; the midday ones are your backup. PR 116 is often 30+ min late, but the Vancouver connection is on the same ticket, so WestJet will rebook you if it's missed.",
    photos: [["Clark airport", "Clark International Airport terminal"]]  // [label, image search]
  },
];

const STAYS = {
  pgl: { name: "", link: "", area: "Panglao Island, Bohol", nights: "Nov 15–19 · 5 nights",
        hint: "Alona Beach is lively and walkable; Dumaluan and Danao beach are quieter. All are 15 min from the airport and Napaling." },
  eni: { name: "", link: "", area: "El Nido town or Corong-Corong", nights: "Nov 20–24 · 5 nights",
        hint: "Town is central for boat tours and the ferry port; Corong-Corong is calmer with better sunsets. Check for twin beds." },
  crn: { name: "", link: "", area: "Coron town", nights: "Nov 25–30 · 6 nights",
        hint: "Stay in town, near the pier. Boat tours and tricycles leave from here; the airport is 40 min away." },
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
    days: "Sun Nov 15 → Fri Nov 20 (fly out 15:50)", bookingQ: "Panglao, Bohol" },
  { key: "eni", place: "El Nido", nights: 5, inDate: "2026-11-20", outDate: "2026-11-25", region: "El Nido",
    days: "Fri Nov 20 evening → Wed Nov 25 (ferry 08:20)", bookingQ: "El Nido, Palawan" },
  { key: "crn", place: "Coron", nights: 6, inDate: "2026-11-25", outDate: "2026-12-01", region: "Coron",
    days: "Wed Nov 25 midday → Tue Dec 1 (flight 08:00)", bookingQ: "Coron, Palawan" },
];

const STAY_PICKS = {
  pgl: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/panglao-island/f/private-rooms/",
    picks: [
      { name: "Red Picnic Hostel", where: "Near Dumaluan Beach", why: "Pool and bar, social without being a party hostel. Private rooms.", url: "https://www.hostelworld.com/hostels/p/314478/red-picnic-hostel/" },
      { name: "Bohol Coco Farm", where: "Inland Panglao, on a 3-hectare farm", why: "Chill, hammocks, organic meals, very well reviewed (9.7). Private rooms.", url: "https://www.hostelworld.com/hostels/p/67761/bohol-coco-farm/" },
      { name: "Mad Monkey Panglao", where: "Danao Beach", why: "Pool, bar and a social crowd. Private rooms with their own bathroom.", url: "https://www.hostelz.com/hostel/486560-Mad-Monkey" },
    ] },
  eni: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/el-nido/f/private-rooms/",
    picks: [
      { name: "SPIN Designer Hostel", where: "El Nido town, a minute from the beach", why: "Clean, well run and central for boat tours. Private rooms.", url: "https://www.hostelworld.com/hostels/p/99361/spin-designer-hostel/" },
      { name: "Outpost Beach Hostel", where: "Corong-Corong, 5 min south of town", why: "On the beach with sunset views, social bar; quiet hours from 11 pm. Private rooms.", url: "https://www.hostelworld.com/hostels/p/272882/outpost-beach-hostel/" },
      { name: "Frendz Hostel El Nido", where: "El Nido town", why: "Lively, rooftop pool, DJs. Standard double private rooms.", url: "https://www.hostelworld.com/hostels/p/293897/frendz-hostel-el-nido/" },
    ] },
  crn: {
    hostelworld: "https://www.hostelworld.com/hostels/asia/philippines/coron/",
    picks: [
      { name: "Hop Hostel", where: "Central Coron town, at the foot of Mt Tapyas", why: "Top rated (9.3), rooftop over Coron Bay, daily activities. Private rooms.", url: "https://www.hostelz.com/hostel/378411-Hop-Hostel" },
      { name: "Outpost Hostel Coron", where: "Waterfront, a few minutes from town", why: "Pool, rooftop and sea-view private rooms. Social.", url: "https://www.hostelworld.com/hostels/p/306653/outpost-hostel-coron/" },
      { name: "Joval Homestay", where: "Quiet spot just outside town", why: "Small, family-run, cheap private rooms; the owner helps book tours.", url: "https://www.hostelz.com/hostel/387461-Joval-Homestay" },
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
