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

Online Sandbox note (2026-10-07):
- Iteration has returned to the online Sandbox workflow.
- The assistant entry is now 「問咚咚」 / DongDong.
- Sandbox conversation is client-side Mock mode and makes zero OpenAI API calls.
- The full UX can be exercised online: conversation -> recommendations -> Merchant Card -> Back to suggestions -> View in Map / Navigate / Call.
- api/chat.js remains in the repo for future integration but is not called by the current Sandbox UI.

