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

function pickOptions(data) {
  const options = [
    ...(data.best_flights || []).map(f => toOption(f, true)),
    ...(data.other_flights || []).map(f => toOption(f, false)),
  ].filter(Boolean);

  const seen = new Set();
  const unique = options
    .sort((a, b) => a.price - b.price || b.best - a.best)
    .filter(o => { const k = `${o.flights.join("+")}|${o.depart}`; if (seen.has(k)) return false; seen.add(k); return true; })
    .slice(0, MAX_OPTIONS);
  return unique;
}

const strip = list => list.map(({ token, ...o }) => o);

function summarize(leg, data, old) {
  const unique = pickOptions(data);
  const lowest = unique.length ? unique[0].price : null;
  const pi = data.price_insights || {};
  const history = (old?.history || []).filter(h => h.date !== today);
  if (lowest !== null) history.push({ date: today, low: lowest });

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
  try {
    const data = await search(leg);
    const summary = summarize(leg, data, old);
    if (leg.withReturn) {
      const pick = pickOptions(data).find(o => o.token);
      if (pick) {
        try {
          const ret = await search(leg, pick.token);
          summary.returnFor = { flights: pick.flights, price: pick.price };
          summary.returnOptions = strip(pickOptions(ret));
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
if (ok === 0 && failed > 0) process.exit(1);
