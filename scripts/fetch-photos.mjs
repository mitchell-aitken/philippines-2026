// One-off: search Wikimedia Commons for each term, save ~800px candidates to images/cand/ and their credits to data/photo-candidates.json.
import { readFile, writeFile, mkdir } from "node:fs/promises";
const cfg = JSON.parse(await readFile("data/photo-search.json", "utf8"));
await mkdir("images/cand", { recursive: true });
const UA = { "User-Agent": "philippines-2026-trip-site/1.0 (github.com/mitchell-aitken/philippines-2026)" };
const strip = s => String(s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const out = {};
for (const [key, term] of cfg.items) {
  const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ action: "query", format: "json", generator: "search",
    gsrsearch: `${term} filetype:bitmap`, gsrnamespace: "6", gsrlimit: String(cfg.perTerm || 4), prop: "imageinfo",
    iiprop: "url|extmetadata|size", iiurlwidth: "800" });
  try {
    const d = await (await fetch(u, { headers: UA })).json();
    const pages = Object.values(d.query?.pages || {}).sort((a, b) => a.index - b.index);
    out[key] = [];
    let n = 0;
    for (const p of pages) {
      const ii = p.imageinfo?.[0]; if (!ii?.thumburl) continue;
      const m = ii.extmetadata || {};
      const file = `images/cand/${key}-${++n}.jpg`;
      const img = await fetch(ii.thumburl, { headers: UA });
      if (!img.ok) continue;
      await writeFile(file, Buffer.from(await img.arrayBuffer()));
      out[key].push({ file, title: p.title, page: ii.descriptionurl, artist: strip(m.Artist?.value), license: strip(m.LicenseShortName?.value),
        desc: strip(m.ImageDescription?.value).slice(0, 200) });
    }
    console.log(key, out[key].length);
  } catch (e) { out[key] = { error: e.message }; console.log(key, "error", e.message); }
}
await writeFile("data/photo-candidates.json", JSON.stringify(out, null, 2) + "\n");
