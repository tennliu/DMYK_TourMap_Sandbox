# MRT Route Card / Simple Route iteration — 2026-10-12

Branch: `preview/ai-qa-v1`. The production `main` branch and separate TourGuide/Halloween repos were not edited.

## Design basis
- Original Illustrator artwork `DMYK_多語導覽地圖_路卡_261012_A.ai`.
- White station cards with rounded corners, a colored border and text following the route's line color.
- Vertically connected cards. A transfer uses a two-color circular marker at the transition.
- The original artwork's repeated `O08 Songjiang Nanjing` is placeholder copy, not a fixed route.
- Show origin, interchange point(s) and Dongmen; DO NOT list intermediate stations. Keep the stop-count labels.

## Changes
1. `mrt_simple_route.js`: produces station cards, leg stop counts, two-color transfer connectors and destination star from the exact `segmentsFromPath()` result already calculated by the MRT module. No second shortest-path computation.
2. `mrt_simple_route.css`: component layout and Map View / Simple Route toggle. New component replaces tall original filled cards but preserves route summary in the origin assistant. The existing SVG and line highlighting remain unchanged.
3. `mrt_arrival_v2.js`: mounts the toggle, reuses one route result for both visualizations, refreshes simple cards on locale changes and resets to Map View on reopening.
4. `style.css`, `index.html`, `app.js`: load the new components and bump cache versions.
5. Strings: zh / en / ja / ko; any other interface language uses English for the MRT module. Unknown JA/KO station names continue existing verified-name/English fallback.

## Automated verification
- Syntax checks: new renderer + route module + app script PASS.
- DOM-level mock tests: default Map View, disabled Simple Route before origin, mode switching, route rerendering, locale update, English fallback, reset.
- BL09 Jiangzicui to O06 Dongmen:
  BL09 -> (5 stops) -> BL14 -> (two-color BL/O transfer) -> O07 -> (1 stop) -> O06.
  Only these four station cards, rather than listing all intermediary stops.
- Tested zero-stop transfer at departure (BL14), direct ride (R08), green/orange transfer (G07), and origin already at Dongmen.
- Existing map SVG kept intact.

## Not yet verified
- Protected Vercel deployment browser visual QA, especially narrow phone heights, long multilingual station names, screen-reader pass, and real-device scroll. Do not treat deployment READY as pixel-perfect visual QA.
