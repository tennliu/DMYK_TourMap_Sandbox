# MRT grouped-map iteration — 2026-10-13

Repository: `tennliu/DMYK_TourMap_Sandbox`
Branch: `preview/ai-qa-v1` only. Production `main`, TourGuide and Halloween are untouched.

## Updated source
- User Illustrator direct export: `DMYK_捷運路卡_拆分_261013_A.svg`.
- New isolated asset: `assets/MRT_Map_Segmented_261013.svg`.
- SVG viewport cropped to `0 675 595.28 936.23` to fit the existing map panel.
- Background normalized from the exported `#3b0000` to the agreed `#310000`.
- A route overlay and a localized-label overlay are preserved as distinct layers.
- The previous `MRT_Map_261012.svg` remains in the repo as a rollback source.

## Controller and focus behavior
- New `data/mrt_visual_261013.js` uses the file's *actual* Illustrator group hierarchy, guarded by source version `261013`. It no longer assumes the old 551-object layout.
- On first load, major compound route paths are safely subdivided at absolute move commands; subpath IDs are generated automatically. This is *not* equivalent to having a confirmed station-code mapping for every segment.
- Original station/title group hierarchy is preserved. Route tracks, badge/title groups and line-specific legends follow the selected line.
- Related station groups on **fully calibrated paths** are selected using the existing geometric anchors. Unrelated groups, including Maokong gondola and peripheral labels, are dimmed to 10%.
- For itineraries without full geometric coverage, the map retains the safer line-level focus.
- The destination marker and copyright/footer stay visible. Existing route selection, Map View/Simple Route, GPS and language logic are retained.
- The map's official English vector artwork remains the default; any JP/KR label overlay is limited to previously verified station names.

## Structure and QA
- Direct-export SVG parsed; Illustrator grouping survives direct export.
- Analysis identified 160 candidate grouped station/title elements and 39 legend groups; these are graphic groups, not 160 verified station-code assignments.
- 8 route systems yielded 127 independent geometric **subpath candidates** in the offline analysis; some are non-metro tracks and some consist of geometry pieces rather than exact station intervals.
- The locally subdivided SVG's unselected appearance differs from a cropped, color-normalized original by 0.37% of pixels, with max channel delta 7/255 (antialiasing at vector edges).
- JS source syntax passed; controller mock checks passed: version guard, subpath split, exact station emphasis, unrelated track+legend dimming, fallback line focus, route clearing restoration.
- Vercel READY validates build/deployment, **not iPhone visual/interaction behavior**.

## Still to validate
1. Visual alignment of the 37 previously calibrated origin journeys with the new artwork.
2. Station code mapping and per-stop highlighting beyond the previously calibrated set (98 origin journeys remain on safe line focus).
3. Multi-line transfer badges and Taipei Main Station glyph groupings on iPhone and desktop.
4. Official JA/KR name coverage; do not add conjectural translations.
5. Fine-grained legend classification, including Danhai LRT and airport-specific notes, in the new direct export.

## Suggested mobile regression
- BL09 Jiangzicui → O06 Dongmen (one-transfer exact overlay).
- G07 Gongguan → O06 Dongmen (transfer badge and line colors).
- Reset selection, toggle Map View/Simple Route, switch zh/en/ja/ko.
