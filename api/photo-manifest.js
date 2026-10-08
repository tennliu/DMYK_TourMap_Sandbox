const ROOT_FOLDER_IDS = [
  '1KFRGt7YF_T6Bol9RSWKLyiEFPvrSt18O',
  '1qqP3eKWL4jkM-cWzJAJasemX8y-21YmF'
];

const DRIVE_API = 'https://www.googleapis.com/drive/v3/files';
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const CACHE_SECONDS = 21600; // 6 hours

function driveQuery(params, apiKey) {
  const url = new URL(DRIVE_API);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  url.searchParams.set('key', apiKey);
  return url;
}

async function listFolder(folderId, apiKey) {
  const files = [];
  let pageToken = '';
  do {
    const url = driveQuery({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken,files(id,name,mimeType)',
      pageSize: '1000',
      orderBy: 'name_natural'
    }, apiKey);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const response = await fetch(url.toString(), {
      headers: {'Accept':'application/json'},
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error(`Drive API ${response.status}`);
    const data = await response.json();
    files.push(...(Array.isArray(data.files) ? data.files : []));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return files;
}

function merchantIdFromFolder(name) {
  const match = String(name || '').match(/^(DMYK_[A-J]_\d{3})_/);
  return match ? match[1] : '';
}

function photoOrder(name) {
  const match = String(name || '').match(/_(\d+)\.[^.]+$/);
  return match ? Number(match[1]) : 999;
}

async function buildManifest(apiKey) {
  const merchantFolders = [];
  for (const rootId of ROOT_FOLDER_IDS) {
    const items = await listFolder(rootId, apiKey);
    for (const item of items) {
      if (item.mimeType !== FOLDER_MIME) continue;
      const merchantId = merchantIdFromFolder(item.name);
      if (merchantId) merchantFolders.push({merchantId, folderId:item.id});
    }
  }

  const manifest = {};
  const concurrency = 12;
  for (let i = 0; i < merchantFolders.length; i += concurrency) {
    const chunk = merchantFolders.slice(i, i + concurrency);
    const childLists = await Promise.all(chunk.map(item => listFolder(item.folderId, apiKey)));
    childLists.forEach((children, index) => {
      const merchantId = chunk[index].merchantId;
      const prefix = merchantId + '_';
      manifest[merchantId] = children
        .filter(file => /^image\//.test(file.mimeType || '') && String(file.name || '').startsWith(prefix))
        .sort((a,b) => photoOrder(a.name) - photoOrder(b.name) || a.name.localeCompare(b.name))
        .map(file => file.id);
    });
  }
  return manifest;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400`);

  if (req.method !== 'GET') {
    res.setHeader('Allow','GET');
    return res.status(405).json({error:'Method not allowed'});
  }

  const enabled = process.env.DMYK_DRIVE_SYNC_ENABLED === 'true';
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY || '';

  if (!enabled || apiKey.length < 20) {
    return res.status(503).json({
      enabled:false,
      error:'Drive image sync is not configured'
    });
  }

  try {
    const manifest = await buildManifest(apiKey);
    return res.status(200).json({
      enabled:true,
      generated_at:new Date().toISOString(),
      source:'google-drive',
      merchant_count:Object.keys(manifest).length,
      manifest
    });
  } catch (error) {
    console.error('DMYK Drive image sync failed:', error && error.message ? error.message : error);
    return res.status(502).json({
      enabled:true,
      error:'Drive image sync failed'
    });
  }
};
