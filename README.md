# Philippines 2026 — trip map

Interactive itinerary for Nov 14–30, 2026: Coron, El Nido and Bohol, flying in and out of Cebu.

- `index.html` is the whole site (Leaflet map + day-by-day itinerary). No build step.
- Edit trip details in the `DAYS` and `STAYS` blocks near the bottom of `index.html`.
  Fill in `name` / `link` in `STAYS` once you've booked a place.

## Publish on GitHub Pages
1. Put `index.html` in the root of a repo (or a `/docs` folder).
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick `main` and `/ (root)` (or `/docs`).
3. The site appears at `https://<username>.github.io/<repo>/` after a minute.
