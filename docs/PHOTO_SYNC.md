# DMYK Drive Photo Auto-Sync

The Sandbox now supports automatic discovery of merchant photos from the two public Google Drive image roots.

## Runtime flow

1. The browser requests `/api/photo-manifest`.
2. The Vercel serverless endpoint lists the two public Drive image root folders.
3. It discovers merchant folders by `DMYK_[A-J]_NNN_` prefix.
4. It lists image files inside each merchant folder.
5. Images are ordered by the trailing sequence number (`_1`, `_2`, `_3`, ...).
6. The returned manifest updates `drive_photo_ids` in memory.
7. If the endpoint is disabled or fails, the baked `merchant_catalog.js` photo IDs remain as fallback.

## Required Vercel environment variables

- `DMYK_DRIVE_SYNC_ENABLED=true`
- `GOOGLE_DRIVE_API_KEY=<Google Cloud API key with Drive API enabled>`

Set the variables for Preview only while testing. Keep Production disabled until explicitly approved.

## Cost / quota guard

- The endpoint is disabled unless the explicit enable flag is true.
- Responses are CDN cached for 6 hours with a 24-hour stale-while-revalidate fallback.
- The API key is server-side only.
- No image binaries are proxied through the function; the frontend still renders public Drive thumbnails directly.
