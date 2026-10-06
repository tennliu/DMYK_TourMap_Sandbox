DMYK TourGuide v18

Run locally from this folder:
  python3 -m http.server 8080

Then open:
  http://localhost:8080

Master layout width: 390px
Language header width at the 390px master: 240px

Data-source note (2026-10-06):
- Current merchant master remains an Excel workbook stored in Google Drive.
- Owner plans to convert it to native Google Sheets.
- Until that conversion, prototype merchant data in api/chat.js is temporary and must not be treated as the canonical source.
- Future Merchant Card / AI data should read from the native Google Sheet single source of truth, with generated runtime data treated as derived output only.

