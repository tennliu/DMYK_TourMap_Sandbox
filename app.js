const MAPS = {
  zh: 'https://www.google.com/maps/d/u/0/embed?mid=1rRdivtSSXdWh8BxGX4fBDGGxGVJreWs&ehbc=2E312F&noprof=1',
  id: 'https://www.google.com/maps/d/u/0/embed?mid=1PCcQ-a0AleJ9cxy1Og8aXP_DmLXo5sQ&ehbc=2E312F&noprof=1',
  vi: 'https://www.google.com/maps/d/u/0/embed?mid=11Q0rpz6nuInAKJnXiam9roXVsQNVetI&ehbc=2E312F&noprof=1',
  th: 'https://www.google.com/maps/d/u/0/embed?mid=1abFeuxyhvUyf83cywdrj2YoBQbhYu7Q&ehbc=2E312F&noprof=1',
  ko: 'https://www.google.com/maps/d/u/0/embed?mid=1BTrcbLT1AmiZiAzNUVTzjBV3vQTcpxU&ehbc=2E312F&noprof=1',
  ja: 'https://www.google.com/maps/d/u/0/embed?mid=1n7nVPeA0pFnO-KfoKk0uI5ZGKMRmyj4&ehbc=2E312F&noprof=1',
  en: 'https://www.google.com/maps/d/u/0/embed?mid=1w4YoXJ04uwHL7ilM4jDfTUZX7v7rLhw&ehbc=2E312F&noprof=1'
};

const COPY = {
  zh: {
    description: '台北最具流量魅力的✨東門永康商圈✨不論你想尋找舌尖上的感動，還是一場午後文藝漫步，這張地圖是你的隨身導遊，為你精選商圈內的優質店家🌟\n\n一鍵查詢🔎 店家地址、電話等關鍵資訊一目了然。隨搜隨導🚀 結合手機定位導航，直接帶路不走冤枉路！現在就放大地圖，開啟屬於你的東門永康探索之旅吧！✨',
    share:'分享', language:'選擇語言', close:'關閉'
  },
  en: {
    description: 'Taipei’s vibrant ✨Dongmen YongKang District✨ is full of discoveries. Whether you’re looking for an unforgettable bite or an artsy afternoon stroll, this map is your pocket guide, featuring selected quality shops throughout the district. 🌟\n\nFind what you need in one tap 🔎—addresses, phone numbers, and other key information at a glance. Search and go 🚀 with mobile location-based navigation to guide you straight there. Zoom in now and begin your own Dongmen YongKang adventure! ✨',
    share:'Share', language:'Choose Language', close:'Close'
  },
  ja: {
    description: '台北屈指の賑わいを誇る✨東門永康エリア✨。心に残るグルメを探すときも、午後の街歩きを楽しみたいときも、このマップがあなたの携帯ガイドとして、エリア内の選りすぐりのお店をご案内します🌟\n\nワンタップ検索🔎で、住所・電話番号などの重要情報をひと目で確認。検索したらそのままナビ🚀。スマートフォンの位置情報とナビゲーションを使って、迷わず目的地へ。さあ地図を拡大して、あなただけの東門永康探索を始めましょう！✨',
    share:'シェア', language:'言語を選択', close:'閉じる'
  },
  ko: {
    description: '타이베이에서 가장 활기찬 곳 중 하나인 ✨동먼융캉 상권✨. 기억에 남는 맛을 찾고 싶을 때도, 여유로운 오후 감성 산책을 즐기고 싶을 때도, 이 지도가 손안의 가이드가 되어 상권의 엄선된 매장을 소개합니다🌟\n\n한 번에 검색🔎 주소, 전화번호 등 핵심 정보를 한눈에 확인하세요. 찾고 바로 길찾기🚀 스마트폰 위치 기반 내비게이션으로 목적지까지 바로 안내합니다. 지금 지도를 확대하고 나만의 동먼융캉 탐험을 시작해 보세요!✨',
    share:'공유', language:'언어 선택', close:'닫기'
  },
  th: {
    description: '✨ย่านตงเหมินหย่งคัง✨ หนึ่งในย่านที่คึกคักและมีเสน่ห์ที่สุดของไทเป ไม่ว่าคุณจะตามหารสชาติที่ประทับใจหรืออยากเดินเล่นชมศิลปะในยามบ่าย แผนที่นี้คือไกด์คู่กายที่คัดสรรร้านคุณภาพในย่านไว้ให้คุณ🌟\n\nค้นหาได้ในคลิกเดียว🔎 ดูที่อยู่ เบอร์โทร และข้อมูลสำคัญได้ทันที ค้นหาแล้วนำทางต่อได้เลย🚀 ด้วยระบบระบุตำแหน่งและนำทางบนมือถือ พาคุณตรงไปถึงจุดหมายโดยไม่หลงทาง! ซูมแผนที่แล้วเริ่มออกสำรวจตงเหมินหย่งคังในแบบของคุณได้เลย!✨',
    share:'แชร์', language:'เลือกภาษา', close:'ปิด'
  },
  vi: {
    description: '✨Đông Môn – Vĩnh Khang✨ là một trong những khu phố sôi động và cuốn hút nhất Đài Bắc. Từ ẩm thực đáng nhớ đến những buổi dạo phố thư thái, bản đồ này giúp bạn nhanh chóng khám phá các cửa hàng nổi bật trong khu vực🌟\n\nTra cứu chỉ với một chạm🔎 Xem địa chỉ, số điện thoại và thông tin cần thiết, rồi dùng định vị trên điện thoại để tiếp tục hành trình🚀. Phóng to bản đồ và bắt đầu khám phá Đông Môn – Vĩnh Khang!✨',
    share:'Chia sẻ', language:'Chọn ngôn ngữ', close:'Đóng'
  },
  id: {
    description: '✨Dongmen YongKang✨ adalah salah satu kawasan paling ramai dan menarik di Taipei. Dari kuliner berkesan hingga jalan santai di sore hari, peta ini membantu Anda menemukan pilihan toko menarik di kawasan ini🌟\n\nCari dengan satu sentuhan🔎 Lihat alamat, nomor telepon, dan informasi penting, lalu lanjutkan perjalanan dengan lokasi ponsel🚀. Perbesar peta dan mulai jelajahi Dongmen YongKang!✨',
    share:'Bagikan', language:'Pilih Bahasa', close:'Tutup'
  }
};


const DEMO_MERCHANTS = [
  {
    id:'DMYK-DEMO-001',
    name_zh:'YABOO Cafe 鴉埠咖啡',
    name_en:'YABOO Cafe',
    address_zh:'台北市大安區永康街41巷26號',
    address_en:'No. 26, Ln. 41, Yongkang St., Da’an Dist., Taipei',
    category:'coffee',
    category_zh:'咖啡・甜點',
    category_en:'Coffee · Dessert',
    description_zh:'永康街巷內的咖啡館。此為 Sandbox 沙盤示範資料，用來測試推薦、店家卡片與行動按鈕。',
    description_en:'A sandbox merchant used to test recommendations, merchant cards and actions.',
    hours_zh:'12:00–22:00（Mock）',
    hours_en:'12:00–22:00 (Mock)',
    phone:'+886223912868',
    phone_display:'02-2391-2868',
    tags:['咖啡','coffee','cafe','安靜','quiet','甜點','dessert'],
    lat:25.030484,lng:121.530546
  },
  {
    id:'DMYK-DEMO-002',
    name_zh:'永康芋頭大王',
    name_en:'Yongkang Taro King',
    address_zh:'台北市大安區永康街15-4號',
    address_en:'No. 15-4, Yongkang St., Da’an Dist., Taipei',
    category:'dessert',
    category_zh:'冰品・甜點',
    category_en:'Ice · Dessert',
    description_zh:'芋頭與冰品類型的 Sandbox 示範店家，用來測試甜點搜尋與店家卡片。',
    description_en:'A mock dessert merchant used for sandbox UX testing.',
    hours_zh:'12:00–23:00（Mock）',
    hours_en:'12:00–23:00 (Mock)',
    phone:'+886223217649',
    phone_display:'02-2321-7649',
    tags:['甜點','dessert','芋頭','taro','冰','ice'],
    lat:25.032458,lng:121.529810
  },
  {
    id:'DMYK-DEMO-003',
    name_zh:'咚咚測試咖啡 B',
    name_en:'DongDong Demo Cafe B',
    address_zh:'東門永康商圈（Mock）',
    address_en:'Dongmen YongKang District (Mock)',
    category:'coffee',
    category_zh:'咖啡・輕食',
    category_en:'Coffee · Light bites',
    description_zh:'第二間咖啡館示範資料，專門用來測試多店推薦與「返回推薦」流程。',
    description_en:'A second mock café used to test multiple recommendations and back navigation.',
    hours_zh:'10:30–19:30（Mock）',
    hours_en:'10:30–19:30 (Mock)',
    phone:'+886200000003',
    phone_display:'02-0000-0003',
    tags:['咖啡','coffee','cafe','輕食'],
    lat:25.033200,lng:121.529200
  },
  {
    id:'DMYK-DEMO-004',
    name_zh:'咚咚測試咖啡 C',
    name_en:'DongDong Demo Cafe C',
    address_zh:'東門永康商圈（Mock）',
    address_en:'Dongmen YongKang District (Mock)',
    category:'coffee',
    category_zh:'咖啡・下午茶',
    category_en:'Coffee · Afternoon tea',
    description_zh:'第三間咖啡館示範資料，用來測試三筆建議、比較與店家卡切換。',
    description_en:'A third mock café used to test three-result recommendations.',
    hours_zh:'11:00–20:00（Mock）',
    hours_en:'11:00–20:00 (Mock)',
    phone:'+886200000004',
    phone_display:'02-0000-0004',
    tags:['咖啡','coffee','cafe','下午茶'],
    lat:25.031900,lng:121.531200
  }
];

const languageScreen = document.getElementById('languageScreen');
const mapScreen = document.getElementById('mapScreen');
const mapFrame = document.getElementById('mapFrame');
const locationPeekLayer = document.getElementById('locationPeekLayer');
const locationPeekFrame = document.getElementById('locationPeekFrame');
const overlay = document.getElementById('overlay');
const overlayDescription = document.getElementById('overlayDescription');
const shareBtn = document.getElementById('shareBtn');
const languageBtn = document.getElementById('languageBtn');
const closeBtn = document.getElementById('closeBtn');
const sideBtn = document.getElementById('sideBtn');
const locateBtn = document.getElementById('locateBtn');
const locateLabel = document.getElementById('locateLabel');
const locationBeacon = document.getElementById('locationBeacon');
const locationStatus = document.getElementById('locationStatus');
const aiBtn = document.getElementById('aiBtn');
const aiBtnLabel = document.getElementById('aiBtnLabel');
const aiBackdrop = document.getElementById('aiBackdrop');
const aiPanel = document.getElementById('aiPanel');
const aiCloseBtn = document.getElementById('aiCloseBtn');
const aiMessages = document.getElementById('aiMessages');
const aiMerchantDetail = document.getElementById('aiMerchantDetail');
const aiQuickPrompts = document.getElementById('aiQuickPrompts');
const aiForm = document.getElementById('aiForm');
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('aiSendBtn');
const aiModeLabel = document.getElementById('aiModeLabel');

let currentLang = 'zh';
let locationStatusTimer = null;
let locationPeekTimer = null;
let locationPeekCleanupTimer = null;
let locationPeekLoadTimer = null;
let locationPeekActive = false;
let locationPeekToken = 0;
let aiHistory = [];
let aiSending = false;
let aiInitialized = false;
let selectedMerchant = null;
let merchantPhotoIndex = 0;

const LOCATION_ZOOM = 18;
const LOCATION_HOLD_MS = 2000;
const LOCATION_RETURN_MS = 720;
const AI_CLIENT_DAILY_LIMIT = 20;

const AI_COPY = {
  zh: {
    button:'問咚咚',
    placeholder:'想找什麼？',
    send:'送出',
    welcome:'嗨，我是咚咚。現在是 Sandbox 沙盤模式，可以直接推演咖啡、甜點推薦與完整店家卡流程。',
    quick:['推薦咖啡','找甜點','你可以做什麼？'],
    map:'在地圖上查看',
    navigate:'導航',
    call:'打電話',
    back:'← 返回推薦',
    hours:'營業時間',
    phone:'電話',
    waiting:'咚咚正在想…',
    error:'目前無法取得回覆，請稍後再試。',
    limit:'今天的測試次數已達上限。',
    showing:'已在地圖上顯示',
    photoPending:'Mock Photo',
    dataNote:'Sandbox Mock：此資料只供介面演練；之後將改由 Google Drive Google Sheet 單一資料源驅動。',
    prototype:'Sandbox Mock · $0 API'
  },
  en: {
    button:'Ask DongDong',
    placeholder:'What are you looking for?',
    send:'Send',
    welcome:'Hi, I’m DongDong. Sandbox mock mode can simulate recommendations and the full merchant-card flow without API calls.',
    quick:['Recommend coffee','Find dessert','What can you do?'],
    map:'View in Map',
    navigate:'Navigate',
    call:'Call',
    back:'← Back to suggestions',
    hours:'Hours',
    phone:'Phone',
    waiting:'DongDong is thinking…',
    error:'Unable to answer right now. Please try again.',
    limit:'Today’s prototype request limit has been reached.',
    showing:'Showing on map',
    photoPending:'Mock Photo',
    dataNote:'Sandbox Mock only. Production data will later come from the Google Drive Google Sheet single source of truth.',
    prototype:'Sandbox Mock · $0 API'
  }
};

function getAiCopy() {
  return AI_COPY[currentLang] || AI_COPY.en;
}

function applyAiCopy() {
  const t = getAiCopy();
  aiBtnLabel.textContent = t.button;
  aiInput.placeholder = t.placeholder;
  aiSendBtn.textContent = t.send;
  aiModeLabel.textContent = t.prototype;
  renderAiQuickPrompts();
  if (selectedMerchant) renderMerchantDetail(selectedMerchant);
}

function applyOverlayCopy(lang) {
  const c = COPY[lang] || COPY.en;
  overlayDescription.textContent = c.description;
  shareBtn.textContent = c.share;
  languageBtn.textContent = c.language;
  closeBtn.textContent = c.close;
}

function openMap(lang) {
  cancelLocationPeek(true);
  currentLang = lang;
  applyOverlayCopy(lang);
  closeAiPanel();
  resetAiConversation();
  applyAiCopy();
  mapFrame.src = MAPS[lang];
  languageScreen.classList.add('is-hidden');
  mapScreen.classList.remove('is-hidden');
  closeOverlay();
  window.scrollTo(0,0);
}

function showLanguagePage() {
  cancelLocationPeek(true);
  closeAiPanel();
  closeOverlay();
  mapFrame.src = '';
  mapScreen.classList.add('is-hidden');
  languageScreen.classList.remove('is-hidden');
  window.scrollTo(0,0);
}

function openOverlay() {
  overlay.classList.add('is-visible');
  overlay.setAttribute('aria-hidden','false');
}
function closeOverlay() {
  overlay.classList.remove('is-visible');
  overlay.setAttribute('aria-hidden','true');
}

function showLocationStatus(message, duration = 2200) {
  clearTimeout(locationStatusTimer);
  locationStatus.textContent = message;
  locationStatus.classList.add('is-visible');
  if (duration > 0) {
    locationStatusTimer = setTimeout(() => {
      locationStatus.classList.remove('is-visible');
    }, duration);
  }
}

function setLocateButton(mode = 'idle') {
  const loading = mode === 'loading';
  const active = mode === 'active';
  const returning = mode === 'returning';

  locateBtn.classList.toggle('is-loading', loading);
  locateBtn.classList.toggle('is-active', active || returning);
  locateBtn.disabled = loading || active || returning;
  locateBtn.setAttribute('aria-pressed', active ? 'true' : 'false');

  locateLabel.textContent = loading
    ? '定位中 / Locating…'
    : active
      ? '我的位置 / You are here'
      : returning
        ? '返回中 / Returning…'
        : '我的位置 / Locate Me';
}

function centeredMapUrl(lat, lng) {
  const url = new URL(MAPS[currentLang]);
  url.searchParams.set('ll', `${lat.toFixed(6)},${lng.toFixed(6)}`);
  url.searchParams.set('z', String(LOCATION_ZOOM));
  return url.toString();
}

function clearLocationPeekTimers() {
  clearTimeout(locationPeekTimer);
  clearTimeout(locationPeekCleanupTimer);
  clearTimeout(locationPeekLoadTimer);
  locationPeekTimer = null;
  locationPeekCleanupTimer = null;
  locationPeekLoadTimer = null;
}

function cancelLocationPeek(clearFrame = false) {
  locationPeekToken += 1;
  locationPeekActive = false;
  clearLocationPeekTimers();

  mapScreen.classList.remove('is-peeking');
  locationPeekLayer.classList.remove('is-visible');
  locationPeekLayer.setAttribute('aria-hidden','true');
  locationBeacon.classList.remove('is-visible');
  setLocateButton('idle');

  if (clearFrame) locationPeekFrame.src = '';
}

function finishLocationPeek(token) {
  if (!locationPeekActive || token !== locationPeekToken) return;

  locationBeacon.classList.remove('is-visible');
  setLocateButton('returning');
  mapScreen.classList.remove('is-peeking');
  locationPeekLayer.classList.remove('is-visible');

  locationPeekCleanupTimer = setTimeout(() => {
    if (token !== locationPeekToken) return;
    locationPeekActive = false;
    locationPeekLayer.setAttribute('aria-hidden','true');
    locationPeekFrame.src = '';
    setLocateButton('idle');
    showLocationStatus('已回到原本瀏覽位置 / Back to previous map view', 1800);
  }, LOCATION_RETURN_MS);
}

function revealLocationPeek(position, token) {
  if (token !== locationPeekToken || !locationPeekActive) return;

  clearTimeout(locationPeekLoadTimer);
  locateBtn.classList.remove('is-loading');
  setLocateButton('active');

  locationPeekLayer.classList.add('is-visible');
  mapScreen.classList.add('is-peeking');

  requestAnimationFrame(() => {
    if (token !== locationPeekToken) return;
    locationBeacon.classList.add('is-visible');
  });

  const accuracy = position.coords.accuracy;
  const accuracyText = Number.isFinite(accuracy) ? ` · ±${Math.round(accuracy)}m` : '';
  showLocationStatus(`我的位置 / You are here${accuracyText}`, 1800);

  locationPeekTimer = setTimeout(() => finishLocationPeek(token), LOCATION_HOLD_MS);
}

function beginLocationPeek(position) {
  const {latitude: lat, longitude: lng} = position.coords;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    setLocateButton('idle');
    showLocationStatus('無法取得位置 / Unable to locate', 3000);
    return;
  }

  clearLocationPeekTimers();
  locationPeekActive = true;
  const token = ++locationPeekToken;
  let revealed = false;

  locationPeekLayer.setAttribute('aria-hidden','false');
  locationPeekFrame.src = centeredMapUrl(lat, lng);

  const revealOnce = () => {
    if (revealed || token !== locationPeekToken) return;
    revealed = true;
    revealLocationPeek(position, token);
  };

  locationPeekFrame.addEventListener('load', revealOnce, {once:true});
  locationPeekLoadTimer = setTimeout(revealOnce, 1600);
}

function handleLocationError(error) {
  locationPeekActive = false;
  setLocateButton('idle');

  if (error && error.code === 1) {
    showLocationStatus('未允許位置權限 / Location permission denied', 3600);
    return;
  }
  if (error && error.code === 2) {
    showLocationStatus('目前無法取得位置 / Location unavailable', 3200);
    return;
  }
  if (error && error.code === 3) {
    showLocationStatus('定位逾時 / Location timed out', 3200);
    return;
  }
  showLocationStatus('無法取得位置 / Unable to locate', 3200);
}

function startLocationPeek() {
  if (locationPeekActive) return;
  if (!navigator.geolocation) {
    showLocationStatus('此瀏覽器不支援定位 / Geolocation unavailable', 3600);
    return;
  }

  // The current base iframe is intentionally left untouched. Its live pan/zoom
  // state is the returning anchor for this location peek.
  setLocateButton('loading');
  showLocationStatus('正在取得位置 / Locating…', 0);

  navigator.geolocation.getCurrentPosition(
    position => beginLocationPeek(position),
    handleLocationError,
    {enableHighAccuracy:true, maximumAge:0, timeout:12000}
  );
}

function openAiPanel() {
  aiPanel.classList.add('is-visible');
  aiBackdrop.classList.add('is-visible');
  aiPanel.setAttribute('aria-hidden','false');
  aiBackdrop.setAttribute('aria-hidden','false');
  if (!aiInitialized) resetAiConversation();

  if (selectedMerchant) {
    renderMerchantDetail(selectedMerchant);
    aiPanel.classList.add('is-merchant-view');
    aiMerchantDetail.classList.remove('is-hidden');
  } else {
    showConversationView();
    setTimeout(() => aiInput.focus(), 360);
  }
}

function closeAiPanel() {
  aiPanel.classList.remove('is-visible');
  aiBackdrop.classList.remove('is-visible');
  aiPanel.setAttribute('aria-hidden','true');
  aiBackdrop.setAttribute('aria-hidden','true');
  aiInput.blur();
}

function resetAiConversation() {
  aiHistory = [];
  aiMessages.innerHTML = '';
  selectedMerchant = null;
  merchantPhotoIndex = 0;
  showConversationView();
  aiInitialized = true;
  const t = getAiCopy();
  addAiMessage('assistant', t.welcome);
  renderAiQuickPrompts();
}

function showConversationView() {
  aiPanel.classList.remove('is-merchant-view');
  aiMerchantDetail.classList.add('is-hidden');
}

function renderAiQuickPrompts() {
  if (!aiQuickPrompts) return;
  const t = getAiCopy();
  aiQuickPrompts.innerHTML = '';
  t.quick.forEach(label => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ai-quick-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => submitAiQuestion(label));
    aiQuickPrompts.appendChild(btn);
  });
}

function makeMerchantPlaceholder(card, index) {
  const title = String(card.name || 'DMYK').replace(/[<>&"]/g,'');
  const label = getAiCopy().photoPending.replace(/[<>&"]/g,'');
  const variants = [
    ['#6f1a21','#c98672'],
    ['#183b45','#8ab8a8'],
    ['#4b315f','#c6a6d8']
  ];
  const pair = variants[index % variants.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${pair[0]}"/><stop offset="1" stop-color="${pair[1]}"/></linearGradient></defs>
    <rect width="960" height="540" fill="url(#g)"/>
    <circle cx="760" cy="105" r="150" fill="rgba(255,255,255,.10)"/>
    <circle cx="145" cy="475" r="230" fill="rgba(255,255,255,.08)"/>
    <text x="54" y="420" font-family="Arial,sans-serif" font-size="44" font-weight="700" fill="white">${title}</text>
    <text x="56" y="468" font-family="Arial,sans-serif" font-size="22" fill="rgba(255,255,255,.86)">${label}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function getMerchantPhotos(card) {
  const supplied = Array.isArray(card.photos) ? card.photos.filter(Boolean) : [];
  if (supplied.length) return supplied;
  return [0,1,2].map(index => makeMerchantPlaceholder(card, index));
}

function updateMerchantHero(card, photos) {
  const image = aiMerchantDetail.querySelector('.ai-merchant-photo');
  const index = aiMerchantDetail.querySelector('.ai-photo-index');
  if (!image || !photos.length) return;
  merchantPhotoIndex = (merchantPhotoIndex + photos.length) % photos.length;
  image.src = photos[merchantPhotoIndex];
  image.alt = `${card.name || ''} ${merchantPhotoIndex + 1}`;
  if (index) index.textContent = `${merchantPhotoIndex + 1} / ${photos.length}`;
}

function openMerchantCard(card) {
  selectedMerchant = card;
  merchantPhotoIndex = 0;
  renderMerchantDetail(card);
  aiPanel.classList.add('is-merchant-view');
  aiMerchantDetail.classList.remove('is-hidden');
  aiMerchantDetail.scrollTop = 0;
}

function backToSuggestions() {
  selectedMerchant = null;
  merchantPhotoIndex = 0;
  showConversationView();
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function navigateToMerchant(card) {
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api','1');

  if (Number.isFinite(card.lat) && Number.isFinite(card.lng)) {
    url.searchParams.set('destination', `${card.lat},${card.lng}`);
  } else if (card.subtitle) {
    url.searchParams.set('destination', card.subtitle);
  } else {
    return;
  }

  if (card.google_place_id) {
    url.searchParams.set('destination_place_id', card.google_place_id);
  }

  window.open(url.toString(), '_blank', 'noopener');
}

function callMerchant(card) {
  if (!card.phone) return;
  window.location.href = `tel:${String(card.phone).replace(/[^+\d]/g,'')}`;
}

function renderMerchantDetail(card) {
  if (!card || !aiMerchantDetail) return;
  const t = getAiCopy();
  const photos = getMerchantPhotos(card);
  aiMerchantDetail.innerHTML = '';

  const shell = document.createElement('article');
  shell.className = 'ai-merchant-card';

  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'ai-merchant-back';
  back.textContent = t.back;
  back.addEventListener('click', backToSuggestions);
  shell.appendChild(back);

  const hero = document.createElement('div');
  hero.className = 'ai-merchant-hero';

  const image = document.createElement('img');
  image.className = 'ai-merchant-photo';
  image.loading = 'eager';
  hero.appendChild(image);

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'ai-photo-arrow prev';
  prev.setAttribute('aria-label','Previous photo');
  prev.textContent = '‹';
  prev.addEventListener('click', () => {
    merchantPhotoIndex -= 1;
    updateMerchantHero(card, photos);
  });
  hero.appendChild(prev);

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'ai-photo-arrow next';
  next.setAttribute('aria-label','Next photo');
  next.textContent = '›';
  next.addEventListener('click', () => {
    merchantPhotoIndex += 1;
    updateMerchantHero(card, photos);
  });
  hero.appendChild(next);

  const counter = document.createElement('div');
  counter.className = 'ai-photo-index';
  hero.appendChild(counter);
  shell.appendChild(hero);

  const body = document.createElement('div');
  body.className = 'ai-merchant-body';

  const title = document.createElement('div');
  title.className = 'ai-merchant-title';
  title.textContent = card.name || '';
  body.appendChild(title);

  if (card.category_label || card.category) {
    const category = document.createElement('div');
    category.className = 'ai-merchant-category';
    category.textContent = card.category_label || card.category;
    body.appendChild(category);
  }

  if (card.description) {
    const description = document.createElement('div');
    description.className = 'ai-merchant-description';
    description.textContent = card.description;
    body.appendChild(description);
  }

  const meta = document.createElement('div');
  meta.className = 'ai-merchant-meta';

  const hoursRow = document.createElement('div');
  hoursRow.className = 'ai-merchant-meta-row';
  hoursRow.innerHTML = `<div class="ai-merchant-meta-label"></div><div class="ai-merchant-meta-value"></div>`;
  hoursRow.children[0].textContent = t.hours;
  hoursRow.children[1].textContent = card.hours || '—';
  meta.appendChild(hoursRow);

  const phoneRow = document.createElement('div');
  phoneRow.className = 'ai-merchant-meta-row';
  phoneRow.innerHTML = `<div class="ai-merchant-meta-label"></div><div class="ai-merchant-meta-value"></div>`;
  phoneRow.children[0].textContent = t.phone;
  phoneRow.children[1].textContent = card.phone_display || card.phone || '—';
  meta.appendChild(phoneRow);

  body.appendChild(meta);

  if (card.subtitle) {
    const address = document.createElement('div');
    address.className = 'ai-merchant-address';
    address.textContent = card.subtitle;
    body.appendChild(address);
  }

  const actions = document.createElement('div');
  actions.className = 'ai-merchant-actions';

  const viewMap = document.createElement('button');
  viewMap.type = 'button';
  viewMap.className = 'ai-merchant-action primary';
  viewMap.textContent = t.map;
  viewMap.disabled = !(Number.isFinite(card.lat) && Number.isFinite(card.lng));
  viewMap.addEventListener('click', () => focusMapFromAI(card.lat, card.lng));
  actions.appendChild(viewMap);

  const navigate = document.createElement('button');
  navigate.type = 'button';
  navigate.className = 'ai-merchant-action';
  navigate.textContent = t.navigate;
  navigate.disabled = !(card.subtitle || (Number.isFinite(card.lat) && Number.isFinite(card.lng)));
  navigate.addEventListener('click', () => navigateToMerchant(card));
  actions.appendChild(navigate);

  const call = document.createElement('button');
  call.type = 'button';
  call.className = 'ai-merchant-action';
  call.textContent = t.call;
  call.disabled = !card.phone;
  call.addEventListener('click', () => callMerchant(card));
  actions.appendChild(call);

  body.appendChild(actions);

  const note = document.createElement('div');
  note.className = 'ai-merchant-source-note';
  note.textContent = t.dataNote;
  body.appendChild(note);

  shell.appendChild(body);
  aiMerchantDetail.appendChild(shell);
  updateMerchantHero(card, photos);
}

function addAiMessage(role, text, cards = []) {
  const row = document.createElement('div');
  row.className = `ai-message ${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'ai-bubble';
  bubble.textContent = text;
  row.appendChild(bubble);

  if (role === 'assistant' && Array.isArray(cards) && cards.length) {
    const list = document.createElement('div');
    list.className = 'ai-card-list';
    cards.forEach(card => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'ai-card';
      item.addEventListener('click', () => openMerchantCard(card));

      const name = document.createElement('div');
      name.className = 'ai-card-name';
      name.textContent = card.name || '';
      item.appendChild(name);

      if (card.subtitle) {
        const subtitle = document.createElement('div');
        subtitle.className = 'ai-card-subtitle';
        subtitle.textContent = card.subtitle;
        item.appendChild(subtitle);
      }

      if (card.category_label || card.category) {
        const category = document.createElement('div');
        category.className = 'ai-card-category';
        category.textContent = card.category_label || card.category;
        item.appendChild(category);
      }

      list.appendChild(item);
    });
    bubble.appendChild(list);
  }

  aiMessages.appendChild(row);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  return row;
}

function addAiLoading() {
  const row = document.createElement('div');
  row.className = 'ai-message assistant is-loading';
  const bubble = document.createElement('div');
  bubble.className = 'ai-bubble';
  bubble.textContent = getAiCopy().waiting;
  row.appendChild(bubble);
  aiMessages.appendChild(row);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  return row;
}

function getAiUsageKey() {
  const date = new Date().toISOString().slice(0,10);
  return `dmyk_ai_v1_${date}`;
}

function canUseAiToday() {
  try {
    return Number(localStorage.getItem(getAiUsageKey()) || '0') < AI_CLIENT_DAILY_LIMIT;
  } catch (_) {
    return true;
  }
}

function incrementAiUsage() {
  try {
    const key = getAiUsageKey();
    localStorage.setItem(key, String(Number(localStorage.getItem(key) || '0') + 1));
  } catch (_) {}
}

function focusMapFromAI(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
  mapFrame.src = centeredMapUrl(lat, lng);
  closeAiPanel();
  showLocationStatus(`${getAiCopy().showing} · 咚咚`, 2200);
}


function merchantToCard(merchant) {
  return {
    merchant_id:merchant.id,
    name:currentLang === 'zh' ? merchant.name_zh : merchant.name_en,
    subtitle:currentLang === 'zh' ? merchant.address_zh : merchant.address_en,
    category:merchant.category,
    category_label:currentLang === 'zh' ? merchant.category_zh : merchant.category_en,
    description:currentLang === 'zh' ? merchant.description_zh : merchant.description_en,
    hours:currentLang === 'zh' ? merchant.hours_zh : merchant.hours_en,
    phone:merchant.phone,
    phone_display:merchant.phone_display,
    photos:[],
    lat:merchant.lat,
    lng:merchant.lng
  };
}

function mockAnswer(question) {
  const q=String(question||'').toLowerCase();
  let matches=[];

  if (/咖啡|coffee|cafe|安靜|quiet|下午茶/.test(q)) {
    matches=DEMO_MERCHANTS.filter(m=>m.category==='coffee').slice(0,3);
  } else if (/甜點|dessert|芋頭|taro|冰|ice/.test(q)) {
    matches=DEMO_MERCHANTS.filter(m=>m.category==='dessert').slice(0,3);
  }

  if (/你可以做什麼|what can you do|可以做什麼/.test(q)) {
    return {
      answer:currentLang==='zh'
        ? '我可以先用沙盤資料模擬店家推薦。你可以點選推薦店家，查看完整店家卡，再測試地圖定位、導航、打電話與返回比較。'
        : 'I can simulate merchant recommendations with sandbox data. Tap a recommendation to test the merchant card, map view, navigation, calling, and returning to compare.',
      cards:[]
    };
  }

  if (!matches.length) {
    return {
      answer:currentLang==='zh'
        ? '目前 Sandbox 先支援咖啡與甜點情境。你可以試著問「推薦咖啡」或「找甜點」。'
        : 'The current sandbox supports coffee and dessert scenarios. Try “Recommend coffee” or “Find dessert”.',
      cards:[]
    };
  }

  return {
    answer:currentLang==='zh'
      ? `我先找到 ${matches.length} 個適合的選擇。點其中一家可以查看完整店家卡。`
      : `I found ${matches.length} suitable options. Tap one to open its full merchant card.`,
    cards:matches.map(merchantToCard)
  };
}

async function submitAiQuestion(rawQuestion) {
  const question = String(rawQuestion || '').trim();
  if (!question || aiSending) return;

  addAiMessage('user', question);
  aiInput.value = '';
  aiSending = true;
  aiInput.disabled = true;
  aiSendBtn.disabled = true;
  const loadingRow = addAiLoading();

  try {
    await new Promise(resolve => setTimeout(resolve, 650));
    const data = mockAnswer(question);
    loadingRow.remove();

    addAiMessage('assistant', data.answer, data.cards || []);
    aiHistory.push({role:'user',content:question},{role:'assistant',content:data.answer});
    aiHistory = aiHistory.slice(-8);
    aiModeLabel.textContent = getAiCopy().prototype;
  } catch (_) {
    if (loadingRow.isConnected) loadingRow.remove();
    addAiMessage('assistant', getAiCopy().error);
  } finally {
    aiSending = false;
    aiInput.disabled = false;
    aiSendBtn.disabled = false;
    aiInput.focus();
  }
}

const MASTER_WIDTH = 390;
const PHONE_BREAKPOINT = 600;
const appStage = document.querySelector('.app-stage');
const phoneShell = document.querySelector('.phone-shell');

function syncAppScale() {
  const viewport = window.visualViewport;
  const vw = viewport ? viewport.width : window.innerWidth;
  const vh = viewport ? viewport.height : window.innerHeight;
  const scale = vw <= PHONE_BREAKPOINT ? vw / MASTER_WIDTH : 1;

  appStage.style.width = `${MASTER_WIDTH * scale}px`;
  appStage.style.height = `${vh}px`;
  phoneShell.style.width = `${MASTER_WIDTH}px`;
  phoneShell.style.height = `${vh / scale}px`;
  phoneShell.style.transform = `scale(${scale})`;
}

syncAppScale();
window.addEventListener('resize', syncAppScale, {passive:true});
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', syncAppScale, {passive:true});
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => openMap(btn.dataset.lang));
});
sideBtn.addEventListener('click', openOverlay);
closeBtn.addEventListener('click', closeOverlay);
languageBtn.addEventListener('click', showLanguagePage);
locateBtn.addEventListener('click', startLocationPeek);
aiBtn.addEventListener('click', openAiPanel);
aiCloseBtn.addEventListener('click', closeAiPanel);
aiBackdrop.addEventListener('click', closeAiPanel);
aiForm.addEventListener('submit', e => {
  e.preventDefault();
  submitAiQuestion(aiInput.value);
});
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });

shareBtn.addEventListener('click', async () => {
  const url = `${location.origin}${location.pathname}`;
  const data = {title:'Dongmen YongKang Guide', text:'Dongmen YongKang District Touring Guide', url};
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      shareBtn.textContent = currentLang === 'zh' ? '連結已複製' : 'Link copied';
      setTimeout(() => applyOverlayCopy(currentLang), 1200);
    }
  } catch (_) {}
});
