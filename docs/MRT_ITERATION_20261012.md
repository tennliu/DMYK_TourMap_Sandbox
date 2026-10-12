# DMYK MRT Sandbox iteration — 2026-10-12

Branch: `preview/ai-qa-v1` (the production `main` branch is unchanged).

## Input references
- User-supplied `DMYK_捷運路卡_261012_A(1).svg`: new MRT artwork, horizontal room reclaimed, Metro Taipei branding moved to footer.
- User-supplied `Routemap-TWEN.pdf`, `Routemap-JP.pdf`, `Routemap-KR.pdf`: official station and line labels.
- User screenshot showing BL09 → G12/G10/R08 → R07 (two transfers), and the irrelevant purple line.

## Implemented
1. New SVG asset `assets/MRT_Map_261012.svg` added without replacing the old map. Crop uses `viewBox="0 675 595.28 936.23"` to remove the SVG's fixed form controls and route-card artwork; the online interface renders those interactively.
2. Non-route schematic lines, including the irrelevant purple network, are marked `data-dmyk-network="other"`. Six served metro lines use `data-dmyk-line="<line>"`. In active-route mode, nonparticipating marked graphics fade to 10% opacity; static labels/branding remain legible.
3. Routing uses a cost of 1 per travelled station and 3.25 per transfer, instead of 0.2 per transfer. The goal is fewer transfers without gross detours. Confirmed BL09 → BL14/O07 → O06/R07 = 1 transfer, 6 travelled stops.
4. Independent `data/mrt_localization.js` is loaded before `app.js`. MRT copy and available official station/line labels switch between Traditional Chinese, English, Japanese, and Korean; other interface languages use the English MRT mode. Unverified translations fall back to English rather than guessing.
5. Dynamic route headings include transfer count and stop count.

## Checks
- JavaScript syntax checks passed for the modified route and app scripts.
- Routing graph checked for all 135 source nodes: zero unreachable.
- Sample paths checked for BL09, BL12, G16, BR14, R05 and Y16.
- Local render inspection checked full schematic and footer after cropping.

## Deliberate limitations / next safe iteration
- SVG route focus currently keeps the **participating lines**, not only the **exact ridden station-to-station segments**. Segment-level masking requires station-coordinate annotations and regression tests.
- The original vector-outline station names in the map are not editable text. The SVG now has a reserved `#dmyk-label-layer` and the localized data dictionary; all-map translated label overlays require complete official station-label transcription and typography/collision QA. Current i18n applies to the HTML controls, journey cards, and already verified names.
- This is a static schematic, not a live Taipei Metro ETA/service status feed.
- Vercel project scope access was denied (403), so deployment readiness/live preview has **not** been independently verified. GitHub commits succeeded.

## QA for manual browser verification
- Verify mobile and desktop map fit and scrolling.
- From BL09 select Jiangzicui; verify 1 transfer, 6 stops via BL14/O07.
- Verify unrelated purple graphic is faded after route selection.
- Change to JA and KO; check route cards and major official labels, with English fallback where unverified.
- Change to TH/VI/ID; MRT UI should be English, while the other DMYK interface content remains in the user's language.
- Verify old full map unaffected in `assets/MRT_Map.svg`.
