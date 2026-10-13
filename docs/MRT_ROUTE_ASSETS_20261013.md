# DMYK MRT Route Card asset integration — 2026-10-13

Branch: `preview/ai-qa-v1` only. `main`, TourGuide, Halloween and MRT map view assets were not modified.

## User-supplied originals

- `assets/route_cards/Route_Start.svg`
- `assets/route_cards/Route_Passing.svg`
- `assets/route_cards/Route_Transit.svg`
- `assets/route_cards/Route_End.svg`

These originals are retained unmodified for reference. They use outlined SVG lettering, so editable route labels cannot be achieved by changing an SVG `<text>` node in the source assets.

## Implementation

- `mrt_route_artwork.js` reproduces the **exact first two vector paths** (outer frame and white inset) of the Start/Passing/End assets and exact top/bottom halves plus white arrow of Route_Transit.
- Runtime labels use the existing station database: `CODE + localizedName`; no static `O08 Songjiang Nanjing` is retained in the card rendering.
- Station title and SVG frame both derive from the same line's `DATA.meta[line].color`, with **no remapping of yellow/orange text to dark alternative**.
- Start: first station; Passing: each interchange-side station; End: destination. Stop counts remain collapsed; no intermediate stops listed.
- Route_Transit top fill comes from incoming line and bottom fill comes from outgoing line.
- New CSS matches original SVG card proportions including vertical stems and supports long names.
- Existing Map View / Simple Route toggle and zh/en/ja/ko station data with English fallback remain intact.

## QA

- Uploaded SVG path d/transform strings verified equal to all 3 station template geometries.
- JavaScript syntax checks passed.
- DOM-level tests passed for BL09 / BL14 / O07 / O06: roles Start / Passing / Passing / End, matching line/frame/text colors, blue→orange transfer, condensed stops and language changes.
- Independent mobile-width isolated screenshot rendered with Chromium using the same supplied source vectors. Actual Vercel browser and iPhone interaction need human QA.

## Known limitation

Yellow line title uses its *official bright yellow* on white as requested, which may have reduced contrast; any accessibility adjustment should preserve the title/frame color relationship.
