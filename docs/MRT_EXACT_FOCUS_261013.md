# DMYK MRT Exact Route Focus — 2026-10-13

Scope: `tennliu/DMYK_TourMap_Sandbox`, branch `preview/ai-qa-v1`. The production `main`, TourGuide and Halloween projects are unchanged.

## Behavior requested

When a journey is selected, only station badges, names, transfers and metro tracks **actually ridden** remain at full opacity. Every other station and every unridden segment, including the rest of the very same selected line, is reduced to 6% opacity. Destination Dongmen remains prominent. Reset shows the entire original map.

## Implementation

- `data/mrt_exact_261013.js` maps all 136 currently selectable MRT station codes to **top-level Illustrator SVG groups** from the 261013 direct export. Shared interchanges map to the same group.
- The current metro trip algorithm is untouched: the trip station sequence drives both the Simple Route view and the Map View.
- Selected tracks come from *clones of the original Illustrator vector track groups*, never straight-line replacement strokes. User-journey corridor masks reveal only those exact source-vector pixels near adjacent traveled stops. Non-selected source artwork is retained underneath, dimmed.
- Important: **corridor masks are not yet certified station-to-station subpath IDs**. At tight corners they require on-device review for small visible breaks or unintended adjacent pixels. No claim of physical/geographic coordinate validity is made; geometry comes from the supplied SVG.
- The old `mrt_focus.js` review-render geometry is bypassed when this controller has an exact station mapping. That overlay previously obscured some BL segments on the newly exported artwork.
- Includes the now-open R01 Guangci/Fengtian Temple terminal (opened August 30, 2026), linked to R02 Xiangshan. The original terminal glyph and station code are mapped to Illustrator roots 16 and 76, respectively. GPS coordinates and all 136 station choices are integrated.
- Includes R22A/G03A side branches and O50–O54 Luzhou branch. The Dongmen R07/O06 station badges share root 235.
- The two view toggles, GPS, routing costs and localized controls were not changed.
- Cache versions are bumped through the dynamic arrival module and index HTML for mobile reload.

## Automated QA

- JavaScript syntax validation for loaded modules.
- 136/136 selectable station codes have an Illustrator group mapping.
- 136/136 start-station journeys remain reachable and only reference mapped station codes; 134 journeys have at least one traveled edge and the other 2 are already at Dongmen.
- Example routing unchanged: BL03 1 transfer/12 stations; BL09 1 transfer/6 stations; G04 1 transfer/6 stations; BR04 1 transfer/7 stations. New R01 route: direct to Dongmen in 6 stations.
- `node tests/mrt_exact_focus_261013.cjs` provides repeatable static route graph and mapping regression.
- GitHub/Vercel commit status reports success for the preview branch (this confirms publishing/build only).

## Manual device QA — still required

1. R01 廣慈／奉天宮：確認該站可選、站點名稱與終點符號同步亮起、R01→R02 連接線完整，R01 到東門共 6 站、0 轉乘。
2. BL03 土城: confirm continuous blue original artwork through BL14 忠孝新生, orange segment O07→O06; BL15–BL23 must remain dim.
2. G04 大坪林: green G04–G09 + orange O05→O06 only; the rest of G and O remain dim.
3. BR04 萬芳醫院: brown BR04–BR09 + red R05–R07 only; all other brown/red stops dim.
4. R22A 新北投 and G03A 小碧潭 side branches; O54 蘆洲 to 東門.
5. Same-line midsection origin (BL13, G11, O08), interchange symbols, map reset, then Simple Route toggle.
6. Browser scroll/viewport on iOS Safari and Chrome; observe any mask-corridor gaps at sharp bends.

Vercel's deployment API is returning a scope-permission 403 for the Sandbox account, so visual browser confirmation via the deployment tooling was unavailable.
