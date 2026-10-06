const DEMO_MERCHANTS = [
  {
    id: 'DMYK-DEMO-001',
    name_zh: 'YABOO Cafe 鴉埠咖啡',
    name_en: 'YABOO Cafe',
    address_zh: '台北市大安區永康街41巷26號',
    address_en: 'No. 26, Ln. 41, Yongkang St., Da’an Dist., Taipei',
    category: 'coffee',
    category_zh: '咖啡・甜點',
    category_en: 'Coffee · Dessert',
    description_zh: '永康街巷內的咖啡館，適合在街區散步途中停留喝咖啡、吃甜點。',
    description_en: 'A café tucked into a Yongkang Street lane, suited for a coffee or dessert break while exploring the district.',
    hours_zh: '週一–五 12:00–00:00 · 週六–日 11:00–00:00',
    hours_en: 'Mon–Fri 12:00–00:00 · Sat–Sun 11:00–00:00',
    phone: '+886223912868',
    phone_display: '02-2391-2868',
    tags: ['coffee','cafe','quiet','dessert'],
    photos: [],
    lat: 25.030484,
    lng: 121.530546
  },
  {
    id: 'DMYK-DEMO-002',
    name_zh: '永康芋頭大王',
    name_en: 'Yongkang Taro King',
    address_zh: '台北市大安區永康街15-4號',
    address_en: 'No. 15-4, Yongkang St., Da’an Dist., Taipei',
    category: 'dessert',
    category_zh: '冰品・甜點',
    category_en: 'Ice · Dessert',
    description_zh: '永康街的老字號甜品店，以芋頭與冰品為主要特色。',
    description_en: 'A long-running Yongkang Street dessert shop known for taro-based sweets and shaved-ice desserts.',
    hours_zh: '12:00–23:00（Prototype，待主資料表確認）',
    hours_en: '12:00–23:00 (prototype; pending master-data verification)',
    phone: '+886223217649',
    phone_display: '02-2321-7649',
    tags: ['dessert','taro','ice'],
    photos: [],
    lat: 25.032458,
    lng: 121.529810
  }
];

const windowMs = 15 * 60 * 1000;
const maxPerWindow = Number(process.env.DMYK_AI_MAX_REQUESTS_PER_WINDOW || 12);
globalThis.__dmykAiBuckets ||= new Map();

function getIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
}

function rateLimited(req) {
  const now = Date.now();
  const ip = getIp(req);
  const bucket = globalThis.__dmykAiBuckets.get(ip) || [];
  const recent = bucket.filter(ts => now - ts < windowMs);
  if (recent.length >= maxPerWindow) {
    globalThis.__dmykAiBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  globalThis.__dmykAiBuckets.set(ip, recent);
  return false;
}

function langText(lang, zh, en) {
  return lang === 'zh' ? zh : en;
}

function cardFor(merchant, lang) {
  return {
    merchant_id: merchant.id,
    name: lang === 'zh' ? merchant.name_zh : merchant.name_en,
    subtitle: lang === 'zh' ? merchant.address_zh : merchant.address_en,
    category: merchant.category,
    category_label: lang === 'zh' ? merchant.category_zh : merchant.category_en,
    description: lang === 'zh' ? merchant.description_zh : merchant.description_en,
    hours: lang === 'zh' ? merchant.hours_zh : merchant.hours_en,
    phone: merchant.phone,
    phone_display: merchant.phone_display,
    photos: Array.isArray(merchant.photos) ? merchant.photos : [],
    lat: merchant.lat,
    lng: merchant.lng
  };
}

function demoAnswer(question, lang) {
  const q = String(question || '').toLowerCase();
  let ids = [];

  if (/咖啡|coffee|cafe|安靜|quiet/.test(q)) ids = ['DMYK-DEMO-001'];
  else if (/甜點|dessert|芋頭|taro|冰/.test(q)) ids = ['DMYK-DEMO-002'];

  if (ids.length) {
    const cards = ids.map(id => DEMO_MERCHANTS.find(m => m.id === id)).filter(Boolean).map(m => cardFor(m, lang));
    return {
      mode: 'demo',
      answer: langText(
        lang,
        'AI 1.0 目前使用測試資料。點選推薦店家即可開啟 Merchant Card，測試照片切換、地圖定位、導航與電話操作。',
        'AI 1.0 is currently using prototype data. Tap a recommendation to test the Merchant Card, photo controls, map view, navigation, and calling.'
      ),
      cards
    };
  }

  return {
    mode: 'demo',
    answer: langText(
      lang,
      '目前是 AI 問答 1.0 的介面測試版。店家總資料尚未接入；現階段可測試咖啡、甜點與完整 Merchant Card 流程。',
      'This is the AI Q&A 1.0 interface prototype. The full merchant dataset is not connected yet; for now you can test coffee, dessert, and the complete Merchant Card flow.'
    ),
    cards: []
  };
}

function extractOutputText(data) {
  if (typeof data.output_text === 'string') return data.output_text;
  const texts = [];
  for (const item of Array.isArray(data.output) ? data.output : []) {
    for (const part of Array.isArray(item.content) ? item.content : []) {
      if (part && part.type === 'output_text' && typeof part.text === 'string') texts.push(part.text);
    }
  }
  return texts.join('');
}

async function askOpenAI(question, lang, history) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  const languageName = {
    zh: 'Traditional Chinese',
    en: 'English',
    ja: 'Japanese',
    ko: 'Korean',
    th: 'Thai',
    vi: 'Vietnamese',
    id: 'Indonesian'
  }[lang] || 'English';

  const catalog = DEMO_MERCHANTS.map(m => ({
    id:m.id,
    name_zh:m.name_zh,
    name_en:m.name_en,
    address_zh:m.address_zh,
    address_en:m.address_en,
    category:m.category,
    category_zh:m.category_zh,
    category_en:m.category_en,
    description_zh:m.description_zh,
    description_en:m.description_en,
    hours_zh:m.hours_zh,
    hours_en:m.hours_en,
    tags:m.tags
  }));

  const safeHistory = Array.isArray(history)
    ? history.slice(-6).map(item => ({
        role:item && item.role === 'assistant' ? 'assistant' : 'user',
        content:String(item && item.content || '').slice(0,800)
      }))
    : [];

  const body = {
    model: process.env.OPENAI_MODEL || 'gpt-6-luna',
    store: false,
    reasoning: { effort: 'none' },
    max_output_tokens: 220,
    instructions:
      'You are DMYK AI, a concise tourism concierge for Dongmen YongKang District in Taipei. ' +
      'Reply in ' + languageName + '. Use ONLY the supplied merchant catalog. ' +
      'Never invent merchants, opening hours, prices, addresses, or live status. ' +
      'If the catalog does not support the request, clearly say the data is not available yet. ' +
      'Return merchant_ids only when they directly match the user request.',
    input: [
      ...safeHistory,
      {
        role:'user',
        content:
          'Merchant catalog (prototype): ' + JSON.stringify(catalog) +
          '\n\nUser question: ' + question
      }
    ],
    text: {
      format: {
        type:'json_schema',
        name:'dmyk_ai_v1',
        strict:true,
        schema:{
          type:'object',
          additionalProperties:false,
          properties:{
            answer:{type:'string'},
            merchant_ids:{
              type:'array',
              maxItems:3,
              items:{type:'string',enum:DEMO_MERCHANTS.map(m => m.id)}
            }
          },
          required:['answer','merchant_ids']
        }
      }
    }
  };

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + process.env.OPENAI_API_KEY
      },
      body:JSON.stringify(body),
      signal:controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error('OpenAI ' + response.status + ': ' + errorText.slice(0,300));
    }

    const data = await response.json();
    const text = extractOutputText(data);
    const parsed = JSON.parse(text);
    const ids = Array.isArray(parsed.merchant_ids) ? parsed.merchant_ids : [];
    const cards = ids
      .map(id => DEMO_MERCHANTS.find(m => m.id === id))
      .filter(Boolean)
      .map(m => cardFor(m, lang));

    return {
      mode:'ai',
      answer:String(parsed.answer || '').slice(0,1400),
      cards
    };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control','no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow','POST');
    return res.status(405).json({error:'Method not allowed'});
  }

  if (rateLimited(req)) {
    return res.status(429).json({error:'Prototype rate limit reached'});
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const question = String(body.question || '').trim().slice(0,1200);
  const lang = ['zh','en','ja','ko','th','vi','id'].includes(body.lang) ? body.lang : 'en';

  if (!question) return res.status(400).json({error:'Question is required'});

  // Cost gate: paid AI calls are OFF unless BOTH the key and explicit enable flag exist.
  // Keep DMYK_AI_PAID_ENABLED=false until project-level billing/rate limits are configured.
  const paidEnabled =
    process.env.DMYK_AI_PAID_ENABLED === 'true' &&
    typeof process.env.OPENAI_API_KEY === 'string' &&
    process.env.OPENAI_API_KEY.length > 20;

  if (!paidEnabled) {
    return res.status(200).json(demoAnswer(question, lang));
  }

  try {
    const result = await askOpenAI(question, lang, body.history);
    return res.status(200).json(result);
  } catch (error) {
    console.error('DMYK AI request failed:', error && error.message ? error.message : error);
    // AI must never break the map experience.
    return res.status(200).json(demoAnswer(question, lang));
  }
};
