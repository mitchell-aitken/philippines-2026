// Fetches flight prices from SerpApi's Google Flights API and writes data/flights.json.
//
// Runs daily from .github/workflows/update-flights.yml. Needs the repo secret SERPAPI_KEY
// (free plan: 250 searches/month; keep searches per run × 31 under that).
//
// Local test without the API:  MOCK_DIR=path/to/mocks node scripts/fetch-flights.mjs
//   (reads <MOCK_DIR>/<leg id>.json instead of calling SerpApi)

import { readFile, writeFile } from "node:fs/promises";

const KEY = process.env.SERPAPI_KEY;
const MOCK_DIR = process.env.MOCK_DIR;
const CONFIG = "data/flight-legs.json";
const OUT = "data/flights.json";
const MAX_OPTIONS = 6;
const MAX_HISTORY = 90;

if (!KEY && !MOCK_DIR) {
  console.error("SERPAPI_KEY is not set. Add it under Settings → Secrets and variables → Actions.");
  process.exit(1);
}

const cfg = JSON.parse(await readFile(CONFIG, "utf8"));
let prev = { legs: {} };
try { prev = JSON.parse(await readFile(OUT, "utf8")); } catch { /* first run */ }

const today = new Date().toISOString().slice(0, 10);
const out = { updated: new Date().toISOString(), currency: cfg.currency, source: "Google Flights via SerpApi", legs: {} };

async function search(leg, departureToken) {
  if (MOCK_DIR) return JSON.parse(await readFile(`${MOCK_DIR}/${leg.id}${departureToken ? "-return" : ""}.json`, "utf8"));
  const params = new URLSearchParams({ engine: "google_flights", currency: cfg.currency, hl: "en", gl: "ca", adults: "1", api_key: KEY });
  if (leg.type === "multi") {
    // Multi-city / open-jaw: e.g. YYC→TAG out, USU→YYC home
    params.set("type", "3");
    params.set("multi_city_json", JSON.stringify(leg.segments.map(g => ({ departure_id: g.from, arrival_id: g.to, date: g.date }))));
  } else {
    params.set("type", leg.type === "round" ? "1" : "2");
    params.set("departure_id", leg.from);
    params.set("arrival_id", leg.to);
    params.set("outbound_date", leg.outbound);
    if (leg.type === "round") params.set("return_date", leg.return);
  }
  if (departureToken) params.set("departure_token", departureToken);
  const res = await fetch(`https://serpapi.com/search.json?${params}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

function toOption(f, best) {
  const segs = f.flights || [];
  if (!segs.length || typeof f.price !== "number") return null;
  const first = segs[0], last = segs[segs.length - 1];
  return {
    price: f.price,
    best,
    airlines: [...new Set(segs.map(s => s.airline).filter(Boolean))],
    flights: segs.map(s => s.flight_number).filter(Boolean),
    from: first.departure_airport?.id,
    to: last.arrival_airport?.id,
    depart: first.departure_airport?.time,
    arrive: last.arrival_airport?.time,
    minutes: f.total_duration ?? segs.reduce((n, s) => n + (s.duration || 0), 0),
    stops: segs.length - 1,
    via: (f.layovers || []).map(l => l.id).filter(Boolean),
    overnight: (f.layovers || []).some(l => l.overnight),
    token: f.departure_token || null,
  };
}

const sameFlights = (o, want) => want && want.every(n => o.flights.includes(n));

function pickOptions(data, prefer) {
  const options = [
    ...(data.best_flights || []).map(f => toOption(f, true)),
    ...(data.other_flights || []).map(f => toOption(f, false)),
  ].filter(Boolean);

  const seen = new Set();
  const unique = options
    .sort((a, b) => a.price - b.price || b.best - a.best)
    .filter(o => { const k = `${o.flights.join("+")}|${o.depart}`; if (seen.has(k)) return false; seen.add(k); return true; })
  const top = unique.slice(0, MAX_OPTIONS);
  const pref = prefer && unique.find(o => sameFlights(o, prefer));
  if (pref && !top.includes(pref)) top.push(pref);   // always keep the flight we're tracking
  return top;
}

const strip = list => list.map(({ token, ...o }) => o);

function summarize(leg, data, old) {
  const unique = pickOptions(data, leg.preferFlights);
  const lowest = unique.length ? unique[0].price : null;
  const pi = data.price_insights || {};
  const history = (old?.history || []).filter(h => h.date !== today);
  const prefOpt = leg.preferFlights ? unique.find(o => sameFlights(o, leg.preferFlights)) : null;
  if (lowest !== null) history.push({ date: today, low: lowest, ...(prefOpt ? { pref: prefOpt.price } : {}) });

  return {
    checked: out.updated,
    lowest,
    priceLevel: pi.price_level || null,
    typicalRange: pi.typical_price_range || null,
    googleUrl: data.search_metadata?.google_flights_url || null,
    options: strip(unique),
    history: history.slice(-MAX_HISTORY),
  };
}

let ok = 0, failed = 0;
for (const leg of cfg.legs.filter(l => l.kind === "flight")) {
  const old = prev.legs?.[leg.id];
  const firstDate = leg.outbound || leg.segments?.[0]?.date;
  if (firstDate < today) { if (old) out.legs[leg.id] = old; console.log(`skip ${leg.id}: date has passed`); continue; }
  if (leg.booked || leg.paused) { if (old) out.legs[leg.id] = old; console.log(`skip ${leg.id}: ${leg.booked ? "booked" : "paused"}`); continue; }
  try {
    const data = await search(leg);
    const summary = summarize(leg, data, old);
    if (leg.withReturn) {
      const all = pickOptions(data, leg.preferFlights);
      const pick = all.find(o => o.token && sameFlights(o, leg.preferFlights)) || all.find(o => o.token);
      if (pick) {
        try {
          const ret = await search(leg, pick.token);
          summary.returnFor = { flights: pick.flights, price: pick.price };
          summary.returnOptions = strip(pickOptions(ret, leg.preferReturn));
        } catch (e) {
          console.error(`fail ${leg.id} return: ${e.message}`);
          summary.returnError = e.message;
        }
      }
    }
    out.legs[leg.id] = summary;
    ok++;
    console.log(`ok   ${leg.id}: ${out.legs[leg.id].options.length} options, lowest ${out.legs[leg.id].lowest} ${cfg.currency}`);
  } catch (e) {
    failed++;
    console.error(`fail ${leg.id}: ${e.message}`);
    out.legs[leg.id] = old ? { ...old, error: e.message } : { error: e.message, options: [], history: [] };
  }
}

await writeFile(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${OUT}: ${ok} ok, ${failed} failed`);

/* ---------- hostel prices (Google Hotels via SerpApi), refreshed weekly ---------- */
const HCFG = "data/hostel-search.json", HOUT = "data/hostel-prices.json";
let hcfg = null; try { hcfg = JSON.parse(await readFile(HCFG, "utf8")); } catch { /* no hostels configured */ }
if (hcfg) {
  let hprev = { hostels: {} }; try { hprev = JSON.parse(await readFile(HOUT, "utf8")); } catch {}
  const ageDays = hprev.updated ? (Date.now() - new Date(hprev.updated)) / 864e5 : Infinity;
  if (process.env.FORCE_HOSTELS !== "1" && ageDays < (hcfg.refreshDays || 7)) {
    console.log(`hostels: last checked ${ageDays.toFixed(1)} days ago, skipping`);
  } else {
    const norm = x => String(x || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const hotel = async (h, adults) => {
      if (MOCK_DIR) return JSON.parse(await readFile(`${MOCK_DIR}/hotel-${h.id}-${adults}.json`, "utf8"));
      const params = new URLSearchParams({ engine: "google_hotels", q: h.query, check_in_date: h.checkIn, check_out_date: h.checkOut,
        adults: String(adults), currency: cfg.currency, gl: "ca", hl: "en", api_key: KEY });
      const res = await fetch(`https://serpapi.com/search.json?${params}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
      return data;
    };
    const price = (data, h) => {
      // a direct property page, or a list of properties to match by name
      let p = (data.rate_per_night || data.type === "hotel" || data.type === "vacation rental") && data.name ? data : null;
      if (!p) { const want = norm(h.match || h.name); p = (data.properties || []).find(x => norm(x.name).includes(want) || want.includes(norm(x.name))) || null; }
      if (!p) return { error: "not found on Google Hotels" };
      return { name: p.name, perNight: p.rate_per_night?.extracted_lowest ?? null, total: p.total_rate?.extracted_lowest ?? null,
        rating: p.overall_rating ?? null, link: p.link || null };
    };
    const hout = { updated: new Date().toISOString(), currency: cfg.currency, source: "Google Hotels via SerpApi", hostels: {} };
    for (const h of hcfg.hostels) {
      const r = { ...(hprev.hostels?.[h.id] || {}) };
      for (const [key, adults] of [["one", 1], ["two", 2]]) {
        try { r[key] = price(await hotel(h, adults), h); }
        catch (e) { r[key] = { ...(r[key] || {}), error: e.message }; }
      }
      hout.hostels[h.id] = r;
      console.log(`hostel ${h.id}: 1 guest ${r.one?.perNight ?? r.one?.error}, 2 guests ${r.two?.perNight ?? r.two?.error}`);
    }
    await writeFile(HOUT, JSON.stringify(hout, null, 2) + "\n");
  }
}
if (ok === 0 && failed > 0) process.exit(1);
