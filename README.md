# Philippines 2026 — trip map

Interactive trip plan for Nov 14–30, 2026: Coron, El Nido and Bohol, flying in and out of Cebu.

**Live site:** https://mitchell-aitken.github.io/philippines-2026/

| File | What it is |
|---|---|
| `index.html` | Full-screen map. Numbered pins per day; click one for the plan and photo links. |
| `itinerary.html` | The whole trip written out day by day. |
| `flights.html` | Flight options and total transport cost. Live prices once `SERPAPI_KEY` is set. |
| `trip-data.js` | All the trip content, shared by both pages. Edit this to change the plan. |

To add accommodation, fill in `name` (and optionally `link`) in the `STAYS` block of `trip-data.js`.

Basemap: Esri World Light Gray Canvas (no API key), with OpenStreetMap as an automatic fallback.

## Live flight prices
`.github/workflows/update-flights.yml` runs `scripts/fetch-flights.mjs` every morning. It asks Google Flights (through SerpApi) for the legs in `data/flight-legs.json` and commits the results to `data/flights.json`.

1. Get a free API key at https://serpapi.com (250 searches/month; this uses about 120).
2. Repo **Settings → Secrets and variables → Actions → New repository secret**: name `SERPAPI_KEY`.
3. **Actions → Update flight prices → Run workflow** for the first refresh.

Change dates or add routes in `data/flight-legs.json`. Estimates there are used until live prices exist.
