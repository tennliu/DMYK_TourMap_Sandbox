# MRT route-focus and language iteration — 2026-10-12 (B)

Scope: `preview/ai-qa-v1` only. Production/main was not changed.

## Changes
- Added `data/mrt_schematic.js`: 35 hand-checked central schematic stop positions with 31 adjacent ride segments. These positions use the new cropped SVG visual coordinates, **not** geographic map coordinates.
- Added `data/mrt_focus.js`: a bounded overlay that redraws only the station-to-station segments of a complete calibrated itinerary. A SVG mask prevents selected route strokes from obscuring station badges, including interchange stations.
- `mrt_arrival_v2.js` passes the complete itinerary to the visual renderer. If any ride edge lacks a curated anchor/path, the map **falls back to original full-line highlighting** rather than displaying a fabricated segment connection.
- Selected key stops receive in-map overlays for verified Chinese, Japanese and Korean names. Other names stay in the original English SVG. The UI already supports zh/en/ja/ko and defaults to English for Thai, Vietnamese and Indonesian.
- Fixed official English spelling of BL09 from `Jianzicui` to `Jiangzicui`.
- Bumped affected script and image URLs to clear older mobile browser caches.

## Automated checks
- All current JavaScript modules parse.
- All 135 stored MRT station nodes route to Dongmen; zero unreachable.
- 37 origin nodes currently have fully calibrated route focus; 98 safely fall back to participating-line highlighting.
- BL09 Jiangzicui -> BL14/O07 Zhongxiao Xinsheng -> O06 Dongmen has **1 transfer and 6 ridden stops**, with calibrated exact-segment focus.
- Routing correctness is separate from map drawing accuracy; user-device screenshot regression and zoom/orientation testing remain required.

## Important remaining work
1. Calibrate geometry for remaining origin itineraries (98/135). Do **not** infer SVG schematic positions from geographic coordinates.
2. Transcribe and cross-check all Japanese/Korean station glyphs from the three user-supplied official PDF maps. The PDFs are outlined vectors, not extractable text. Only verified names are stored; unknown names fall back to English.
3. Validate the visual overlay across phone viewport sizes, station badge alignment, interchanges and all seven DMYK interface languages.
4. This branch is a preview. Vercel deployment readiness does **not** by itself prove protected browser access or functional QA.

## Preservation
- The original `assets/MRT_Map.svg` remains untouched.
- No changes to GitHub production `main`, TourGuide production or Halloween.
