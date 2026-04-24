# Green &mdash; The Fabrizio Method

An interactive home-growing guide for Virginia adults 21+. Strains, indoor / outdoor / hydro, pest ID, and the harvest-and-cure workflow that separates good flower from great.

Live site: **`https://tamryn72.github.io/Green/`** (enable in Settings &rarr; Pages &rarr; this branch, root).

## What's in here

| File | Purpose |
|---|---|
| `index.html` | The site &mdash; one page, nine sections, plus quizzes and a journal |
| `styles.css` | Earthy palette, Playfair Display + Inter, mobile-first |
| `script.js` | Age gate, nav, strain filter, trichome slider, grow-stage timeline, harvest checklist |
| `quizzes.js` | Data-driven engine powering six quizzes |
| `journal.js` | Grow journal backed by the browser's `localStorage` |
| `images/` | Drop image files here &mdash; see `images/README.md` for filenames |
| `SPECS.md` | Original blueprint: content, visual brief, UX notes |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Features

- Six interactive quizzes &mdash; strain picker, grow method, bug ID, harvest readiness, deficiency vs. disease, pH drift
- Grow journal with per-entry plant, stage, notes; export to JSON
- Clickable grow-stage timeline (germination &rarr; flowering)
- Trichome maturity slider with harvest guidance
- Filterable strain cards (Indica / Sativa / Hybrid / Auto)
- Persistent harvest checklist
- 21+ age gate
- No server, no tracking, no build step

## Running locally

Any static file server works:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Contributing images

Drop files into `images/` using the filenames listed in `images/README.md`. Missing files are hidden automatically &mdash; no broken-image icons.

## Disclaimer

Informational only. Not medical advice. Cannabis cultivation laws vary by jurisdiction and change over time &mdash; verify current rules with the [Virginia Cannabis Control Authority](https://cca.virginia.gov/resources/homecultivation) before cultivating. You are responsible for your own compliance.

## License

MIT &mdash; see `LICENSE`.

Text and images contributed by Fabrizio remain his; attribution appreciated.
