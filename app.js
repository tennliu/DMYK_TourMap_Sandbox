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


const FALLBACK_MERCHANTS = [
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

const MERCHANT_CATALOG =
  Array.isArray(window.DMYK_MERCHANTS) && window.DMYK_MERCHANTS.length
    ? window.DMYK_MERCHANTS
    : FALLBACK_MERCHANTS;

async function syncMerchantPhotoManifest() {
  try {
    const response = await fetch('/api/photo-manifest', {
      method:'GET',
      headers:{'Accept':'application/json'},
      cache:'default'
    });
    if (!response.ok) return;
    const data = await response.json();
    if (!data || !data.enabled || !data.manifest || typeof data.manifest !== 'object') return;

    for (const merchant of MERCHANT_CATALOG) {
      const ids = data.manifest[merchant.id];
      if (!Array.isArray(ids)) continue;
      merchant.drive_photo_ids = ids.filter(Boolean);
    }
  } catch (_) {
    // Runtime photo sync is optional; baked manifest remains the fallback.
  }
}

syncMerchantPhotoManifest();


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
const aiPanelTitle = document.getElementById('aiPanelTitle');
const merchantFocusLayer = document.getElementById('merchantFocusLayer');
const merchantFocusBeacon = document.getElementById('merchantFocusBeacon');
const merchantFocusName = document.getElementById('merchantFocusName');
const merchantFocusDistance = document.getElementById('merchantFocusDistance');
const merchantNavigateBtn = document.getElementById('merchantNavigateBtn');
const merchantNavigateLabel = document.getElementById('merchantNavigateLabel');
const merchantNavigateDistance = document.getElementById('merchantNavigateDistance');
const merchantReturnBtn = document.getElementById('merchantReturnBtn');

let currentLang = 'zh';
let conversationLang = 'zh';
let locationStatusTimer = null;
let locationPeekTimer = null;
let locationPeekCleanupTimer = null;
let locationPeekLoadTimer = null;
let locationPeekActive = false;
let locationPeekToken = 0;
let aiHistory = [];
let aiSending = false;
let aiTouchSendPending = false;
let aiInitialized = false;
let recommendationSequence = 0;
let selectedMerchant = null;
let merchantPhotoIndex = 0;
let lastUserPosition = null;
let merchantFocusTimer = null;
let merchantFocusLoadTimer = null;
let merchantFocusToken = 0;
let merchantDistanceText = '';
let appScale = 1;
let stableViewportHeight = window.innerHeight;

const LOCATION_ZOOM = 18;
const LOCATION_HOLD_MS = 2550;
const LOCATION_RETURN_MS = 720;
const AI_CLIENT_DAILY_LIMIT = 20;
const MERCHANT_FOCUS_BEACON_MS = 2550;

const AI_COPY = {
  zh: {
    button:'問咚咚', placeholder:'想找什麼？', send:'送出',
    welcome:'嗨，我是咚咚。現在是 Sandbox 沙盤模式，可以直接推演咖啡、甜點推薦與完整店家卡流程。',
    quick:['推薦咖啡','買伴手禮','找眼鏡'],
    map:'在地圖上查看', navigate:'導航', call:'打電話', back:'← 返回推薦',
    hours:'營業時間', phone:'電話', waiting:'咚咚正在想…',
    error:'目前無法取得回覆，請稍後再試。', limit:'今天的測試次數已達上限。',
    showing:'已在地圖上顯示', photoPending:'Mock Photo',
    dataNote:'Sandbox：店家資料由 261007_A 店家表單衍生；正式資料源仍以店家表單／後續 Google Sheet 為準。',
    prototype:'Sandbox Mock · $0 API', navigateShop:'導航至店家', returnDongDong:'回到咚咚'
  },
  en: {
    button:'Ask DongDong', placeholder:'What are you looking for?', send:'Send',
    welcome:'Hi, I’m DongDong. Sandbox mock mode can simulate recommendations and the full merchant-card flow without API calls.',
    quick:['Recommend coffee','Find a gift','Find glasses'],
    map:'View in Map', navigate:'Navigate', call:'Call', back:'← Back to suggestions',
    hours:'Hours', phone:'Phone', waiting:'DongDong is thinking…',
    error:'Unable to answer right now. Please try again.', limit:'Today’s prototype request limit has been reached.',
    showing:'Showing on map', photoPending:'Mock Photo',
    dataNote:'Sandbox merchant data is derived from the 261007_A workbook; the workbook / future Google Sheet remains canonical.',
    prototype:'Sandbox Mock · $0 API', navigateShop:'Navigate to shop', returnDongDong:'Return to Dong-Dong'
  },
  ja: {
    button:'咚咚に聞く', placeholder:'何を探していますか？', send:'送信',
    welcome:'こんにちは、咚咚です。現在はSandboxの模擬モードで、カフェやスイーツのおすすめと店舗カードの流れを試せます。',
    quick:['カフェをおすすめ','お土産を探す','眼鏡を探す'],
    map:'地図で見る', navigate:'ナビ', call:'電話', back:'← おすすめに戻る',
    hours:'営業時間', phone:'電話', waiting:'咚咚が考えています…',
    error:'現在回答を取得できません。後でもう一度お試しください。', limit:'本日のテスト回数の上限に達しました。',
    showing:'地図に表示中', photoPending:'Mock Photo',
    dataNote:'Sandbox Mockのデータです。正式版ではGoogle DriveのGoogle Sheetを単一データソースとして使用します。',
    prototype:'Sandbox Mock · $0 API', navigateShop:'お店までナビ', returnDongDong:'咚咚に戻る'
  },
  ko: {
    button:'咚咚에게 묻기', placeholder:'무엇을 찾고 있나요?', send:'보내기',
    welcome:'안녕하세요, 咚咚입니다. 현재 Sandbox 모의 모드에서 카페·디저트 추천과 매장 카드 흐름을 테스트할 수 있습니다.',
    quick:['카페 추천','선물 찾기','안경 찾기'],
    map:'지도에서 보기', navigate:'길찾기', call:'전화', back:'← 추천으로 돌아가기',
    hours:'영업시간', phone:'전화', waiting:'咚咚이 생각 중…',
    error:'현재 답변을 가져올 수 없습니다. 잠시 후 다시 시도해 주세요.', limit:'오늘의 테스트 횟수 한도에 도달했습니다.',
    showing:'지도에 표시 중', photoPending:'Mock Photo',
    dataNote:'Sandbox Mock 데이터입니다. 정식 버전은 Google Drive의 Google Sheet를 단일 데이터 소스로 사용합니다.',
    prototype:'Sandbox Mock · $0 API', navigateShop:'매장으로 길찾기', returnDongDong:'咚咚으로 돌아가기'
  },
  th: {
    button:'ถาม咚咚', placeholder:'กำลังมองหาอะไร?', send:'ส่ง',
    welcome:'สวัสดี ฉันคือ咚咚 ขณะนี้เป็นโหมดจำลอง Sandbox สำหรับทดลองการแนะนำคาเฟ่ ของหวาน และการ์ดร้านค้า',
    quick:['แนะนำคาเฟ่','หาของฝาก','หาร้านแว่นตา'],
    map:'ดูบนแผนที่', navigate:'นำทาง', call:'โทร', back:'← กลับไปที่คำแนะนำ',
    hours:'เวลาเปิด', phone:'โทรศัพท์', waiting:'咚咚กำลังคิด…',
    error:'ขณะนี้ไม่สามารถรับคำตอบได้ กรุณาลองใหม่ภายหลัง', limit:'ถึงขีดจำกัดการทดสอบของวันนี้แล้ว',
    showing:'แสดงบนแผนที่แล้ว', photoPending:'Mock Photo',
    dataNote:'ข้อมูล Sandbox Mock เท่านั้น เวอร์ชันจริงจะใช้ Google Sheet บน Google Drive เป็นแหล่งข้อมูลหลักเดียว',
    prototype:'Sandbox Mock · $0 API', navigateShop:'นำทางไปร้าน', returnDongDong:'กลับไปหา咚咚'
  },
  vi: {
    button:'Hỏi 咚咚', placeholder:'Bạn đang tìm gì?', send:'Gửi',
    welcome:'Xin chào, tôi là 咚咚. Hiện đây là chế độ mô phỏng Sandbox để thử luồng gợi ý quán cà phê, món ngọt và thẻ cửa hàng.',
    quick:['Gợi ý quán cà phê','Tìm quà lưu niệm','Tìm kính mắt'],
    map:'Xem trên bản đồ', navigate:'Chỉ đường', call:'Gọi', back:'← Quay lại gợi ý',
    hours:'Giờ mở cửa', phone:'Điện thoại', waiting:'咚咚 đang suy nghĩ…',
    error:'Hiện chưa thể lấy câu trả lời. Vui lòng thử lại sau.', limit:'Đã đạt giới hạn thử nghiệm hôm nay.',
    showing:'Đang hiển thị trên bản đồ', photoPending:'Mock Photo',
    dataNote:'Dữ liệu Sandbox Mock. Bản chính thức sẽ dùng Google Sheet trên Google Drive làm nguồn dữ liệu duy nhất.',
    prototype:'Sandbox Mock · $0 API', navigateShop:'Chỉ đường đến cửa hàng', returnDongDong:'Quay lại 咚咚'
  },
  id: {
    button:'Tanya 咚咚', placeholder:'Apa yang Anda cari?', send:'Kirim',
    welcome:'Halo, saya 咚咚. Saat ini mode simulasi Sandbox dapat digunakan untuk mencoba rekomendasi kafe, pencuci mulut, dan alur kartu toko.',
    quick:['Rekomendasikan kafe','Cari oleh-oleh','Cari kacamata'],
    map:'Lihat di peta', navigate:'Navigasi', call:'Telepon', back:'← Kembali ke rekomendasi',
    hours:'Jam buka', phone:'Telepon', waiting:'咚咚 sedang berpikir…',
    error:'Jawaban belum dapat diperoleh. Silakan coba lagi nanti.', limit:'Batas pengujian hari ini telah tercapai.',
    showing:'Ditampilkan di peta', photoPending:'Mock Photo',
    dataNote:'Data Sandbox Mock. Versi produksi akan memakai Google Sheet di Google Drive sebagai satu-satunya sumber data.',
    prototype:'Sandbox Mock · $0 API', navigateShop:'Navigasi ke toko', returnDongDong:'Kembali ke 咚咚'
  }
};

const MOCK_COPY = {
  zh:{
    capability:'我目前可以從東門永康商圈 A–J 全類別店家中，依店名、類別與 ai_tags 模擬推薦，再開啟店家卡、地圖定位、導航與電話。',
    unsupported:'我還無法理解這個需求。可以試著描述想吃的料理、想買的商品或需要的服務，例如「牛肉麵」、「伴手禮」、「剪頭髮」或「眼鏡」。',
    found:count=>`我先找到 ${count} 個適合的選擇。點其中一家可以查看完整店家卡。`,
    exactFound:'找到這家店。', more:'看更多', similar:'看看類似的', similarFound:count=>`再看看 ${count} 個相似選擇。`, officialLinks:'官方連結'
  },
  en:{
    capability:'I can now search all A–J merchant categories in the Dongmen YongKang sandbox using names, categories, and semantic tags, then open merchant cards, map focus, navigation, and calling.',
    unsupported:'I could not match that request yet. Try describing a food, product, or service such as “beef noodles”, “souvenir”, “haircut”, or “glasses”.',
    found:count=>`I found ${count} suitable options. Tap one to open its full merchant card.`,
    exactFound:'I found this place.', more:'See more', similar:'Similar places', similarFound:count=>`Here are ${count} similar options.`, officialLinks:'Official links'
  },
  ja:{
    capability:'Sandboxデータを使って店舗のおすすめを模擬できます。おすすめをタップすると店舗カードを開き、地図表示、ナビ、電話、比較への戻りを試せます。',
    unsupported:'まだこの要望を判断できません。料理、商品、サービスをもう少し具体的に入力してください。',
    found:count=>`${count}件の候補が見つかりました。店舗をタップすると詳しい店舗カードを確認できます。`,
    exactFound:'このお店が見つかりました。', more:'もっと見る', similar:'似たお店', similarFound:count=>`似た候補を${count}件表示します。`, officialLinks:'公式リンク'
  },
  ko:{
    capability:'Sandbox 데이터로 매장 추천을 모의할 수 있습니다. 추천 매장을 누르면 매장 카드, 지도 보기, 길찾기, 전화, 비교 화면 복귀를 테스트할 수 있습니다.',
    unsupported:'아직 이 요청을 정확히 이해하지 못했습니다. 음식, 상품 또는 서비스를 조금 더 구체적으로 입력해 주세요.',
    found:count=>`적합한 선택지 ${count}곳을 찾았습니다. 매장을 누르면 전체 매장 카드를 볼 수 있습니다.`,
    exactFound:'이 매장을 찾았습니다.', more:'더 보기', similar:'비슷한 곳', similarFound:count=>`비슷한 선택지 ${count}곳입니다.`, officialLinks:'공식 링크'
  },
  th:{
    capability:'ฉันสามารถจำลองการแนะนำร้านด้วยข้อมูล Sandbox ได้ แตะร้านที่แนะนำเพื่อทดลองการ์ดร้านค้า การดูแผนที่ การนำทาง การโทร และการกลับมาเปรียบเทียบ',
    unsupported:'ยังจับคู่คำขอนี้ไม่ได้ ลองระบุอาหาร สินค้า หรือบริการที่ต้องการให้ชัดเจนขึ้น',
    found:count=>`พบตัวเลือกที่เหมาะสม ${count} แห่ง แตะร้านเพื่อดูการ์ดร้านค้าแบบเต็ม`,
    exactFound:'พบสถานที่นี้แล้ว', more:'ดูเพิ่มเติม', similar:'สถานที่คล้ายกัน', similarFound:count=>`พบตัวเลือกที่คล้ายกัน ${count} แห่ง`, officialLinks:'ลิงก์ทางการ'
  },
  vi:{
    capability:'Tôi có thể mô phỏng gợi ý cửa hàng bằng dữ liệu Sandbox. Hãy chạm vào một gợi ý để thử thẻ cửa hàng, xem bản đồ, chỉ đường, gọi điện và quay lại so sánh.',
    unsupported:'Tôi chưa thể khớp yêu cầu này. Hãy mô tả cụ thể hơn món ăn, sản phẩm hoặc dịch vụ bạn cần.',
    found:count=>`Tôi tìm thấy ${count} lựa chọn phù hợp. Chạm vào một cửa hàng để xem thẻ đầy đủ.`,
    exactFound:'Tôi đã tìm thấy địa điểm này.', more:'Xem thêm', similar:'Địa điểm tương tự', similarFound:count=>`Có ${count} lựa chọn tương tự.`, officialLinks:'Liên kết chính thức'
  },
  id:{
    capability:'Saya dapat menyimulasikan rekomendasi toko dengan data Sandbox. Ketuk rekomendasi untuk mencoba kartu toko, tampilan peta, navigasi, telepon, dan kembali membandingkan.',
    unsupported:'Saya belum dapat mencocokkan permintaan ini. Coba jelaskan makanan, produk, atau layanan yang Anda cari dengan lebih spesifik.',
    found:count=>`Saya menemukan ${count} pilihan yang sesuai. Ketuk salah satu toko untuk membuka kartu lengkap.`,
    exactFound:'Saya menemukan tempat ini.', more:'Lihat lainnya', similar:'Tempat serupa', similarFound:count=>`Berikut ${count} pilihan serupa.`, officialLinks:'Tautan resmi'
  }
};

function getAiCopy() {
  return AI_COPY[conversationLang] || AI_COPY.en;
}

function applyAiCopy() {
  const t = getAiCopy();
  aiBtnLabel.textContent = t.button;
  aiInput.placeholder = t.placeholder;
  aiSendBtn.textContent = t.send;
  aiModeLabel.textContent = t.prototype;
  merchantNavigateLabel.textContent = t.navigateShop;
  merchantReturnBtn.textContent = t.returnDongDong;
  updateMerchantNavigateAction();
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
  exitMerchantFocus();
  cancelLocationPeek(true);
  currentLang = lang;
  conversationLang = lang;
  applyOverlayCopy(lang);
  closeAiPanel();
  resetAiConversation();
  applyAiCopy();
  mapFrame.src = MAPS[lang];
  languageScreen.classList.add('is-hidden');
  mapScreen.classList.remove('is-hidden');
  document.body.classList.add('map-active');
  stableViewportHeight = window.innerHeight;
  syncAppScale();
  closeOverlay();
  window.scrollTo(0,0);
}

function showLanguagePage() {
  exitMerchantFocus();
  cancelLocationPeek(true);
  closeAiPanel();
  closeOverlay();
  mapFrame.src = '';
  mapScreen.classList.add('is-hidden');
  document.body.classList.remove('map-active');
  phoneShell.style.setProperty('--keyboard-inset','0px');
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
    ? '定位中'
    : active
      ? '我在這裡'
      : returning
        ? '我在這裡'
        : '我在哪';
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
  mapScreen.classList.remove('is-peeking');
  locationPeekLayer.classList.remove('is-visible');

  locationPeekCleanupTimer = setTimeout(() => {
    if (token !== locationPeekToken) return;
    locationPeekActive = false;
    locationPeekLayer.setAttribute('aria-hidden','true');
    locationPeekFrame.src = '';
    setLocateButton('idle');
    showLocationStatus('已定位在你的位置 / You are here', 1600);
  }, 280);
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
    locationBeacon.querySelectorAll('.location-beacon-ring').forEach(ring => {
      ring.style.animation = 'none';
      void ring.offsetWidth;
      ring.style.animation = '';
    });
    locationBeacon.classList.add('is-visible');
  });

  const accuracy = position.coords.accuracy;
  const accuracyText = Number.isFinite(accuracy) ? ` · ±${Math.round(accuracy)}m` : '';
  showLocationStatus(`我的位置 / You are here${accuracyText}`, 1800);

  locationPeekTimer = setTimeout(() => finishLocationPeek(token), LOCATION_HOLD_MS);
}

function beginLocationPeek(position) {
  const {latitude: lat, longitude: lng} = position.coords;
  lastUserPosition = {lat, lng};
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    setLocateButton('idle');
    showLocationStatus('無法取得位置 / Unable to locate', 3000);
    return;
  }

  clearLocationPeekTimers();
  locationPeekActive = true;
  const token = ++locationPeekToken;
  let revealed = false;

  const userMapUrl = centeredMapUrl(lat, lng);
  mapFrame.src = userMapUrl;
  locationPeekLayer.setAttribute('aria-hidden','false');
  locationPeekFrame.src = userMapUrl;

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

  // Recenter the base My Maps iframe on the current GPS fix. The temporary
  // beacon overlay disappears, while the map remains centered on the user.
  setLocateButton('loading');
  showLocationStatus('正在取得位置 / Locating…', 0);

  navigator.geolocation.getCurrentPosition(
    position => beginLocationPeek(position),
    handleLocationError,
    {enableHighAccuracy:true, maximumAge:0, timeout:12000}
  );
}

function refreshAiHeaderTitle() {
  if (!aiPanelTitle) return;
  const emojis = ['✨','🧭','🍜','☕️','🛍️','🎈','🌟'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  aiPanelTitle.textContent = '找地方？問咚咚 ' + emoji;
}

function openAiPanel() {
  refreshAiHeaderTitle();
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
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 720">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${pair[0]}"/><stop offset="1" stop-color="${pair[1]}"/></linearGradient></defs>
    <rect width="960" height="540" fill="url(#g)"/>
    <circle cx="760" cy="105" r="150" fill="rgba(255,255,255,.10)"/>
    <circle cx="145" cy="655" r="230" fill="rgba(255,255,255,.08)"/>
    <text x="54" y="590" font-family="Arial,sans-serif" font-size="44" font-weight="700" fill="white">${title}</text>
    <text x="56" y="638" font-family="Arial,sans-serif" font-size="22" fill="rgba(255,255,255,.86)">${label}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function driveImageUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`;
}

function getMerchantPhotos(card) {
  const supplied = Array.isArray(card.photos) ? card.photos.filter(Boolean) : [];
  if (supplied.length) return supplied;

  const driveIds = Array.isArray(card.drive_photo_ids) ? card.drive_photo_ids.filter(Boolean) : [];
  if (driveIds.length) return driveIds.map(driveImageUrl);

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
  if (!card) return;
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api','1');

  if (card.google_place_id && card.name) {
    url.searchParams.set('destination', card.name);
    url.searchParams.set('destination_place_id', card.google_place_id);
  } else if (card.name && card.subtitle) {
    url.searchParams.set('destination', `${card.name}, ${card.subtitle}`);
  } else if (card.name) {
    url.searchParams.set('destination', card.name);
  } else if (Number.isFinite(card.lat) && Number.isFinite(card.lng)) {
    url.searchParams.set('destination', `${card.lat},${card.lng}`);
  } else {
    return;
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
  image.draggable = false;
  image.referrerPolicy = 'no-referrer';
  image.addEventListener('error', () => {
    const fallback = makeMerchantPlaceholder(card, merchantPhotoIndex);
    if (image.src !== fallback) image.src = fallback;
  });
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

  let photoTouchStartX = null;
  let photoTouchStartY = null;
  hero.addEventListener('touchstart', event => {
    if (!event.touches || event.touches.length !== 1) return;
    photoTouchStartX = event.touches[0].clientX;
    photoTouchStartY = event.touches[0].clientY;
  }, {passive:true});
  hero.addEventListener('touchend', event => {
    if (photoTouchStartX === null || !event.changedTouches || !event.changedTouches.length) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - photoTouchStartX;
    const dy = touch.clientY - photoTouchStartY;
    photoTouchStartX = null;
    photoTouchStartY = null;

    if (Math.abs(dx) < 42 || Math.abs(dx) <= Math.abs(dy) * 1.15) return;
    merchantPhotoIndex += dx < 0 ? 1 : -1;
    updateMerchantHero(card, photos);
  }, {passive:true});

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

  const officialLinkDefs = [
    ['website','Website'],
    ['instagram','Instagram'],
    ['facebook','Facebook'],
    ['line','LINE'],
    ['tiktok','TikTok'],
    ['threads','Threads'],
    ['youtube','YouTube']
  ];
  const officialLinks = officialLinkDefs
    .map(([key,label]) => ({key,label,url:String(card[key] || '').trim()}))
    .filter(item => /^https?:\/\//i.test(item.url));

  if (officialLinks.length) {
    const linksSection = document.createElement('div');
    linksSection.className = 'ai-official-links';

    const linksLabel = document.createElement('div');
    linksLabel.className = 'ai-official-links-label';
    linksLabel.textContent = t.officialLinks || 'Official links';
    linksSection.appendChild(linksLabel);

    const linksGrid = document.createElement('div');
    linksGrid.className = 'ai-official-links-grid';
    officialLinks.forEach(item => {
      const link = document.createElement('a');
      link.className = 'ai-official-link';
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = item.label;
      linksGrid.appendChild(link);
    });
    linksSection.appendChild(linksGrid);
    body.appendChild(linksSection);
  }

  const actions = document.createElement('div');
  actions.className = 'ai-merchant-actions';

  const viewMap = document.createElement('button');
  viewMap.type = 'button';
  viewMap.className = 'ai-merchant-action primary';
  viewMap.textContent = t.map;
  viewMap.disabled = !(Number.isFinite(card.lat) && Number.isFinite(card.lng));
  viewMap.addEventListener('click', () => focusMapFromAI(card));
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

function renderRecommendationCards(bubble, cards) {
  const oldList = bubble.querySelector('.ai-card-list');
  if (oldList) oldList.remove();

  if (!Array.isArray(cards) || !cards.length) return;

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

function nextRecommendationBatch(state) {
  const size = state.batchSize || 3;
  const start = state.cursor || 0;
  const batch = state.pool.slice(start, start + size);
  state.cursor = start + batch.length;
  return batch;
}

function renderRecommendationControls(bubble, state) {
  const oldActions = bubble.querySelector('.ai-result-actions');
  if (oldActions) oldActions.remove();
  if (!state) return;

  const copy = MOCK_COPY[conversationLang] || MOCK_COPY.en;
  const actions = document.createElement('div');
  actions.className = 'ai-result-actions';

  if (state.mode === 'exact' && state.anchorMerchant) {
    const similarPool = rankSimilarMerchants(state.anchorMerchant);
    if (similarPool.length) {
      const similarBtn = document.createElement('button');
      similarBtn.type = 'button';
      similarBtn.className = 'ai-result-action';
      similarBtn.textContent = copy.similar || 'Similar';
      similarBtn.addEventListener('click', () => {
        state.mode = 'similar';
        state.pool = similarPool;
        state.cursor = 0;
        state.anchorMerchant = null;
        const batch = nextRecommendationBatch(state);
        const textNode = bubble.querySelector('.ai-message-text');
        if (textNode) textNode.textContent = copy.similarFound ? copy.similarFound(batch.length) : copy.found(batch.length);
        renderRecommendationCards(bubble, batch.map(merchantToCard));
        renderRecommendationControls(bubble, state);
      });
      actions.appendChild(similarBtn);
    }
  }

  if (state.mode !== 'exact' && state.cursor < state.pool.length) {
    const moreBtn = document.createElement('button');
    moreBtn.type = 'button';
    moreBtn.className = 'ai-result-action';
    moreBtn.textContent = copy.more || 'See more';
    moreBtn.addEventListener('click', () => {
      const batch = nextRecommendationBatch(state);
      const textNode = bubble.querySelector('.ai-message-text');
      if (textNode) textNode.textContent = copy.found(batch.length);
      renderRecommendationCards(bubble, batch.map(merchantToCard));
      renderRecommendationControls(bubble, state);
    });
    actions.appendChild(moreBtn);
  }

  if (actions.childElementCount) bubble.appendChild(actions);
}

function addAiMessage(role, text, cards = [], options = {}) {
  const row = document.createElement('div');
  row.className = `ai-message ${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'ai-bubble';

  const textNode = document.createElement('div');
  textNode.className = 'ai-message-text';
  textNode.textContent = text;
  bubble.appendChild(textNode);
  row.appendChild(bubble);

  if (role === 'assistant' && Array.isArray(cards) && cards.length) {
    renderRecommendationCards(bubble, cards);
    renderRecommendationControls(bubble, options.recommendationState || null);
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

function distanceMeters(lat1, lng1, lat2, lng2) {
  const toRad = value => value * Math.PI / 180;
  const earthRadius = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatMerchantDistance(meters) {
  if (!Number.isFinite(meters)) return '';
  const value = meters < 1000
    ? (meters < 100 ? Math.round(meters / 5) * 5 : Math.round(meters / 10) * 10)
    : (meters / 1000).toFixed(meters < 10000 ? 1 : 0);
  const unit = meters < 1000 ? 'm' : 'km';
  const prefix = {
    zh:'約 ', en:'About ', ja:'約 ', ko:'약 ', th:'ประมาณ ', vi:'Khoảng ', id:'Sekitar '
  }[conversationLang] || 'About ';
  return `${prefix}${value} ${unit}`;
}

function updateMerchantNavigateAction() {
  if (!merchantNavigateLabel || !merchantNavigateDistance) return;
  merchantNavigateLabel.textContent = getAiCopy().navigateShop;
  merchantNavigateDistance.textContent = merchantDistanceText || '';
  merchantNavigateDistance.classList.toggle('is-visible', Boolean(merchantDistanceText));
}

function updateMerchantFocusDistance(card, position) {
  if (!card || !position || !Number.isFinite(card.lat) || !Number.isFinite(card.lng)) return;
  const meters = distanceMeters(position.lat, position.lng, card.lat, card.lng);
  merchantDistanceText = formatMerchantDistance(meters);
  updateMerchantNavigateAction();
}

function requestMerchantFocusGps(card, token) {
  merchantDistanceText = '';
  merchantFocusDistance.textContent = '';
  updateMerchantNavigateAction();

  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    position => {
      const {latitude: lat, longitude: lng} = position.coords;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      lastUserPosition = {lat, lng};
      if (token === merchantFocusToken) updateMerchantFocusDistance(card, lastUserPosition);
    },
    () => {
      if (token === merchantFocusToken) {
        merchantDistanceText = '';
        updateMerchantNavigateAction();
      }
    },
    {enableHighAccuracy:true, maximumAge:30000, timeout:10000}
  );
}

function revealMerchantFocusBeacon(token) {
  if (token !== merchantFocusToken || !selectedMerchant) return;
  clearTimeout(merchantFocusTimer);
  merchantFocusBeacon.classList.remove('is-hidden');
  // Restart the finite pulse animation every time a merchant is focused.
  merchantFocusBeacon.querySelectorAll('.merchant-focus-ring').forEach(ring => {
    ring.style.animation = 'none';
    void ring.offsetWidth;
    ring.style.animation = '';
  });
  merchantFocusTimer = setTimeout(() => {
    if (token !== merchantFocusToken) return;
    merchantFocusBeacon.classList.add('is-hidden');
  }, MERCHANT_FOCUS_BEACON_MS);
}

function enterMerchantFocus(card) {
  clearTimeout(merchantFocusTimer);
  clearTimeout(merchantFocusLoadTimer);
  const token = ++merchantFocusToken;

  mapScreen.classList.add('is-merchant-focus');
  merchantFocusLayer.classList.add('is-active');
  merchantFocusLayer.setAttribute('aria-hidden','false');
  merchantFocusBeacon.classList.add('is-hidden');
  merchantFocusName.textContent = card.name || '';
  merchantFocusDistance.textContent = '';
  merchantDistanceText = '';
  updateMerchantNavigateAction();
  merchantReturnBtn.textContent = getAiCopy().returnDongDong;

  requestMerchantFocusGps(card, token);

  let revealed = false;
  const revealOnce = () => {
    if (revealed || token !== merchantFocusToken) return;
    revealed = true;
    revealMerchantFocusBeacon(token);
  };

  mapFrame.addEventListener('load', revealOnce, {once:true});
  merchantFocusLoadTimer = setTimeout(revealOnce, 1200);
}

function exitMerchantFocus() {
  merchantFocusToken += 1;
  clearTimeout(merchantFocusTimer);
  clearTimeout(merchantFocusLoadTimer);
  merchantFocusTimer = null;
  merchantFocusLoadTimer = null;
  mapScreen.classList.remove('is-merchant-focus');
  merchantFocusLayer.classList.remove('is-active');
  merchantFocusLayer.setAttribute('aria-hidden','true');
  merchantFocusBeacon.classList.add('is-hidden');
}

function focusMapFromAI(card) {
  if (!card || !Number.isFinite(card.lat) || !Number.isFinite(card.lng)) return;
  selectedMerchant = card;
  mapFrame.src = centeredMapUrl(card.lat, card.lng);
  closeAiPanel();
  enterMerchantFocus(card);
}

function returnToDongDong() {
  if (!selectedMerchant) {
    exitMerchantFocus();
    openAiPanel();
    return;
  }
  exitMerchantFocus();
  openAiPanel();
}

function merchantToCard(merchant) {
  const nameZh = merchant.zh || merchant.name_zh || '';
  const nameEn = merchant.en || merchant.name_en || '';
  const address = merchant.address || merchant.address_zh || merchant.address_en || '';
  const category = merchant.cat || merchant.category || '';
  const description = merchant.desc || merchant.description_zh || merchant.description_en || '';
  const hours = merchant.hours || merchant.hours_zh || merchant.hours_en || '';
  const id = merchant.id || merchant.merchant_id || '';
  const categoryCode = merchant.cc || merchant.category_code || '';

  return {
    merchant_id:id,
    name:conversationLang === 'zh' ? nameZh : (nameEn || nameZh),
    name_zh:nameZh,
    name_en:nameEn,
    subtitle:address,
    category:categoryCode || category,
    category_label:category,
    description,
    hours,
    phone:merchant.phone || '',
    phone_display:merchant.phone_display || merchant.phone || '',
    photos:Array.isArray(merchant.photos) ? merchant.photos : [],
    google_place_id:merchant.google_place_id || '',
    lat:merchant.lat,
    lng:merchant.lng,
    photo_folder:merchant.photo_folder || '',
    photo_files:Array.isArray(merchant.photo_files) ? merchant.photo_files : [],
    photo_part:merchant.photo_part || null,
    drive_photo_ids:Array.isArray(merchant.drive_photo_ids) ? merchant.drive_photo_ids : [],
    ai_tags:Array.isArray(merchant.ai_tags) ? merchant.ai_tags : [],
    website:merchant.website || '',
    instagram:merchant.instagram || '',
    facebook:merchant.facebook || '',
    line:merchant.line || '',
    tiktok:merchant.tiktok || '',
    threads:merchant.threads || '',
    youtube:merchant.youtube || ''
  };
}

function merchantSearchText(merchant) {
  return [
    merchant.zh, merchant.name_zh,
    merchant.en, merchant.name_en,
    merchant.cat, merchant.category,
    merchant.desc, merchant.description_zh,
    merchant.address, merchant.address_zh
  ].filter(Boolean).join(' ').toLowerCase();
}

function uniqueMerchants(items) {
  const seen = new Set();
  return items.filter(item => {
    const id = item.id || item.merchant_id;
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}



function merchantSemanticTags(merchant) {
  return (Array.isArray(merchant.ai_tags) ? merchant.ai_tags : [])
    .map(tag => String(tag).trim().toLowerCase())
    .filter(Boolean);
}

const SEMANTIC_INTENTS = [
  {query:/咖啡|coffee|cafe|café|コーヒー|カフェ|카페|커피|กาแฟ|cà phê|kopi/, strong:/^(咖啡|咖啡館|精品咖啡|創意咖啡|自烘咖啡|手沖咖啡|單品咖啡|貓咪咖啡館)$/, related:/咖啡/},
  {query:/茶|tea|お茶|차|ชา|trà|teh/, strong:/(台灣茶|烏龍|紅茶|白茶|普洱|鐵觀音|東方美人|茶葉|茶飲|冷泡茶|冰萃茶|品茶|茶文化|茶具|茗茶)/, related:/茶/},
  {query:/甜點|dessert|芋頭|taro|冰|ice|蛋糕|cake|brownie|鬆餅|waffle|豆花|chocolate|巧克力|スイーツ|디저트|ของหวาน|món ngọt|pencuci mulut/, strong:/(甜點|冰品|剉冰|雪花冰|豆花|巧克力|布朗尼|蛋糕|鬆餅|芋頭|甜湯|糕餅)/, related:/(甜|冰|餅)/},
  {query:/牛肉麵|beef noodles?|noodle|麵|ラーメン|국수|ก๋วยเตี๋ยว|mì|mi/, strong:/(牛肉麵|刀削麵|麵食|麵點|擔擔麵|餡餅|水餃|餃子)/, related:/麵/},
  {query:/火鍋|hot ?pot|shabu|鍋|전골|หม้อไฟ|lẩu/, strong:/(火鍋|涮涮鍋|蒙古火鍋|鍋物)/, related:/鍋/},
  {query:/小吃|snack|street food|鹹酥雞|麵線|甜不辣|wonton|dumpling|餃子/, strong:/(台灣小吃|街頭小吃|鹹酥雞|麵線|甜不辣|扁食|餃子|水餃)/, related:/小吃/},
  {query:/台菜|中式|chinese food|taiwanese food|川菜|sichuan|客家|hakka/, strong:/(台菜|川菜|客家菜|中式料理|台灣料理|四川料理)/, related:/(中式|家常菜)/},
  {query:/泰國|thai|日本料理|japanese|sushi|壽司|德國|german|地中海|mediterranean|牛排|steak|異國/, strong:/(泰國料理|日本料理|壽司|德國料理|地中海料理|牛排|異國料理|西式料理)/, related:/(料理|餐廳)/},
  {query:/辣|spicy|hot and spicy|麻辣|辛い|매운|เผ็ด|cay|pedas/, strong:/(麻辣|川味|四川|可調辣度|打拋豬)/, related:/辣/},
  {query:/伴手禮|送禮|禮物|gift|souvenir|お土産|선물|ของฝาก|quà|oleh-oleh/, strong:/(伴手禮|送禮|禮盒|禮品|紀念禮品)/, related:/(禮|糕餅|點心)/},
  {query:/烘焙|烘培|bakery|bread|麵包|餅|pastry/, strong:/(烘焙|糕餅|麵包|蛋捲|牛軋餅|鳳梨酥|太陽餅|芋頭酥)/, related:/餅/},
  {query:/寵物|pet|dog|cat|毛孩|สัตว์เลี้ยง|thú cưng|hewan peliharaan/, strong:/(寵物用品|犬貓用品|寵物食品|寵物玩具|毛孩)/, related:/寵物/},
  {query:/輪胎|汽車|car|tire|tyre|auto|vehicle/, strong:/(輪胎|汽車保養|汽車維修|引擎電機|鋁圈|汽車服務)/, related:/汽車/},
  {query:/銀行|bank|atm/, strong:/(銀行|金融|提款|ATM)/i, related:/銀行/},
  {query:/房屋|租屋|不動產|real estate|rent|property/, strong:/(不動產|房屋租賃|房屋買賣|房地產|租屋)/, related:/房/},
  {query:/雨傘|傘|umbrella/, strong:/(雨傘|傘|生活用品)/, related:/傘/},
  {query:/台灣設計|文創|設計|taiwan design|design goods|creative|文化|culture|art|藝術/, strong:/(台灣設計|文創|生活設計|台灣風格|藝術展覽|藝文空間|藝術創作|文化體驗|藝術選物)/, related:/(設計|藝術|文創|美學)/},
  {query:/珠寶|jewelry|jewellery|飾品|首飾/, strong:/(珠寶|珠寶訂製|飾品|精品|紀念珠寶)/, related:/珠寶/},
  {query:/陶藝|陶瓷|pottery|ceramic|茶器/, strong:/(陶瓷茶器|陶藝|手作陶器|茶具)/, related:/陶/},
  {query:/音樂|music|樂器|guitar|吉他/, strong:/(音樂|樂器|吉他|音樂空間)/, related:/音樂/},
  {query:/剪頭髮|剪髮|美髮|haircut|hair salon|salon|髮型|미용실|ร้านทำผม|cắt tóc|potong rambut/, strong:/(美髮|剪髮|髮型設計|美髮沙龍|洗髮|染髮|燙髮)/, related:/髮/},
  {query:/保養|護膚|skincare|beauty|香芬|香水|perfume|精油|aroma/, strong:/(保養|臉部保養|天然保養|精油|香水|香芬|青草保養|漢方養生)/, related:/(保養|香)/},
  {query:/按摩|足體|massage|foot massage|spa|นวด|mát xa|pijat/, strong:/(足體|按摩|養生館|SPA)/i, related:/(養生|舒壓)/},
  {query:/診所|醫療|醫生|doctor|clinic|medical|藥局|pharmacy|薬局|병원|คลินิก|phòng khám|apotek/, strong:/(診所|家庭醫學|醫療|藥局|藥師)/, related:/(醫|藥)/},
  {query:/眼鏡|glasses|eyeglasses|optical|optician|驗光|メガネ|안경|แว่น|kính mắt|kacamata/, strong:/(眼鏡|驗光配鏡|鏡片|多焦鏡片|精品眼鏡|客製眼鏡)/, related:/(眼鏡|鏡片)/},
  {query:/鞋|shoes?|footwear|sneaker|涼鞋|靴|신발|รองเท้า|giày|sepatu/, strong:/(健康鞋|舒適鞋|休閒鞋|運動鞋|涼鞋|男鞋|鞋)/, related:/鞋/},
  {query:/衣服|服飾|clothes|clothing|fashion|旗袍|qipao|女裝|ファッション|옷|เสื้อผ้า|quần áo|pakaian/, strong:/(服飾|女裝|旗袍|中國風服飾|棉麻服飾|時尚)/, related:/(服飾|衣)/},
  {query:/皮革|leather|皮件|包包|bag/, strong:/(皮革|皮件|皮鞋|包|手工皮件)/, related:/皮/}
];

function semanticScore(merchant, q) {
  const tags = merchantSemanticTags(merchant);
  const tagText = tags.join(' ');
  const nameZh = String(merchant.zh || merchant.name_zh || '').toLowerCase();
  const nameEn = String(merchant.en || merchant.name_en || '').toLowerCase();
  const category = String(merchant.cat || merchant.category || '').toLowerCase();
  const desc = String(merchant.desc || merchant.description_zh || '').toLowerCase();
  let score = 0;

  if (q && (nameZh.includes(q) || nameEn.includes(q))) score += 100;
  for (const tag of tags) {
    if (tag.length >= 2 && q.includes(tag)) score += 30;
  }

  const directTokens = q.match(/[\p{Script=Han}]{2,}|[a-zà-ỹก-๙가-힣ぁ-んァ-ンー]{3,}/giu) || [];
  for (const token of directTokens) {
    const t = token.toLowerCase();
    if (tags.some(tag => tag === t)) score += 20;
    else if (tags.some(tag => tag.includes(t) || t.includes(tag))) score += 8;
    const latinToken = /^[a-zà-ỹ]+$/i.test(t);
    const nameEnMatch = latinToken
      ? nameEn.split(/[^a-zà-ỹ]+/i).includes(t)
      : nameEn.includes(t);
    if (nameZh.includes(t) || nameEnMatch) score += 14;
    if (category.includes(t)) score += 3;
    if (desc.includes(t)) score += 2;
  }

  for (const intent of SEMANTIC_INTENTS) {
    if (!intent.query.test(q)) continue;
    intent.query.lastIndex = 0;
    let strongHits = 0;
    let relatedHits = 0;
    for (const tag of tags) {
      intent.strong.lastIndex = 0;
      intent.related.lastIndex = 0;
      if (intent.strong.test(tag)) strongHits += 1;
      else if (intent.related.test(tag)) relatedHits += 1;
    }
    score += strongHits * 24 + relatedHits * 6;
  }

  return score;
}

function hasKnownSemanticIntent(q) {
  return SEMANTIC_INTENTS.some(intent => {
    intent.query.lastIndex = 0;
    return intent.query.test(q);
  });
}

function rankMerchantCandidates(catalog, q) {
  const minimumScore = hasKnownSemanticIntent(q) ? 6 : 3;
  return catalog
    .map((merchant, index) => ({merchant, index, score:semanticScore(merchant, q)}))
    .filter(item => item.score >= minimumScore)
    .sort((a,b) => b.score - a.score || a.index - b.index);
}

function fairRandomizeCandidates(items) {
  return items
    .map(item => ({...item, fairScore:item.score + Math.random() * 6}))
    .sort((a,b) => b.fairScore - a.fairScore || b.score - a.score || a.index - b.index)
    .map(item => item.merchant);
}

function normalizeMerchantName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[\s·．・()（）\-_]/g,'');
}

function findSpecificMerchantMatches(catalog, q) {
  const normalizedQ = normalizeMerchantName(q);
  if (!normalizedQ) return [];

  const fullMatches = catalog.filter(merchant => {
    const zh = normalizeMerchantName(merchant.zh || merchant.name_zh);
    const en = normalizeMerchantName(merchant.en || merchant.name_en);
    return (zh.length >= 3 && normalizedQ.includes(zh)) ||
           (en.length >= 3 && normalizedQ.includes(en));
  });
  if (fullMatches.length) return uniqueMerchants(fullMatches);

  if (hasKnownSemanticIntent(q) || normalizedQ.length < 3) return [];

  const partialMatches = catalog.filter(merchant => {
    const zh = normalizeMerchantName(merchant.zh || merchant.name_zh);
    const en = normalizeMerchantName(merchant.en || merchant.name_en);
    return (zh && zh.includes(normalizedQ)) || (en && en.includes(normalizedQ));
  });

  return partialMatches.length && partialMatches.length <= 5
    ? uniqueMerchants(partialMatches)
    : [];
}

function rankSimilarMerchants(anchor) {
  if (!anchor) return [];
  const anchorTags = new Set(merchantSemanticTags(anchor));
  const anchorCategory = String(anchor.cc || anchor.category_code || anchor.cat || anchor.category || '').toLowerCase();
  const anchorId = anchor.id || anchor.merchant_id;

  return MERCHANT_CATALOG
    .filter(merchant => (merchant.id || merchant.merchant_id) !== anchorId)
    .map((merchant, index) => {
      const tags = merchantSemanticTags(merchant);
      let score = 0;
      const category = String(merchant.cc || merchant.category_code || merchant.cat || merchant.category || '').toLowerCase();
      if (anchorCategory && category === anchorCategory) score += 24;
      for (const tag of tags) {
        if (anchorTags.has(tag)) score += 12;
      }
      return {merchant, index, score};
    })
    .filter(item => item.score > 0)
    .map(item => ({...item, fairScore:item.score + Math.random() * 6}))
    .sort((a,b) => b.fairScore - a.fairScore || b.score - a.score || a.index - b.index)
    .map(item => item.merchant);
}

function mockAnswer(question) {
  const q = String(question || '').trim().toLowerCase();
  const copy = MOCK_COPY[conversationLang] || MOCK_COPY.en;
  const catalog = MERCHANT_CATALOG;

  const capabilityPattern = /你可以做什麼|what can you do|可以做什麼|何ができる|무엇을 할 수|ทำอะไรได้บ้าง|bạn làm được gì|apa yang bisa kamu lakukan/;
  if (capabilityPattern.test(q)) {
    return {answer:copy.capability, mode:'none', pool:[]};
  }

  const specific = findSpecificMerchantMatches(catalog, q);
  if (specific.length === 1) {
    return {answer:copy.exactFound || copy.found(1), mode:'exact', pool:specific, anchorMerchant:specific[0]};
  }
  if (specific.length > 1) {
    return {answer:copy.found(specific.length), mode:'ambiguous', pool:specific};
  }

  const ranked = rankMerchantCandidates(catalog, q);
  const pool = uniqueMerchants(fairRandomizeCandidates(ranked));

  if (!pool.length) {
    return {answer:copy.unsupported, mode:'none', pool:[]};
  }

  return {answer:copy.found(Math.min(3,pool.length)), mode:'recommendation', pool};
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

    if (Array.isArray(data.pool) && data.pool.length) {
      const state = {
        id:++recommendationSequence,
        query:question,
        mode:data.mode,
        pool:data.pool,
        cursor:0,
        batchSize:3,
        anchorMerchant:data.anchorMerchant || null
      };
      const batch = data.mode === 'exact'
        ? (state.cursor = 1, state.pool.slice(0,1))
        : nextRecommendationBatch(state);
      addAiMessage('assistant', data.answer, batch.map(merchantToCard), {recommendationState:state});
    } else {
      addAiMessage('assistant', data.answer);
    }

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
  const vw = window.innerWidth;
  const inputFocused = document.activeElement === aiInput;
  if (!inputFocused) stableViewportHeight = window.innerHeight;
  const vh = inputFocused ? stableViewportHeight : window.innerHeight;
  appScale = vw <= PHONE_BREAKPOINT ? vw / MASTER_WIDTH : 1;

  appStage.style.width = `${MASTER_WIDTH * appScale}px`;
  appStage.style.height = `${vh}px`;
  phoneShell.style.width = `${MASTER_WIDTH}px`;
  phoneShell.style.height = `${vh / appScale}px`;
  phoneShell.style.transform = `scale(${appScale})`;
}

function syncKeyboardViewport() {
  const viewport = window.visualViewport;
  const inputFocused = document.activeElement === aiInput;
  if (!viewport || !inputFocused || !document.body.classList.contains('map-active')) {
    phoneShell.style.setProperty('--keyboard-inset','0px');
    return;
  }

  const layoutHeight = stableViewportHeight || window.innerHeight;
  const covered = Math.max(0, layoutHeight - viewport.height - viewport.offsetTop);
  const keyboardInset = covered > 80 ? covered / appScale : 0;
  phoneShell.style.setProperty('--keyboard-inset', `${keyboardInset}px`);
}

syncAppScale();
window.addEventListener('resize', () => {
  syncAppScale();
  syncKeyboardViewport();
}, {passive:true});
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', syncKeyboardViewport, {passive:true});
  window.visualViewport.addEventListener('scroll', syncKeyboardViewport, {passive:true});
}

aiInput.addEventListener('focus', () => {
  stableViewportHeight = Math.max(stableViewportHeight || 0, window.innerHeight);
  requestAnimationFrame(syncKeyboardViewport);
});
aiInput.addEventListener('blur', () => {
  phoneShell.style.setProperty('--keyboard-inset','0px');
  setTimeout(syncAppScale, 80);
});

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
merchantNavigateBtn.addEventListener('click', () => {
  if (selectedMerchant) navigateToMerchant(selectedMerchant);
});
merchantReturnBtn.addEventListener('click', returnToDongDong);
aiSendBtn.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
  e.preventDefault();
  if (aiTouchSendPending || aiSending) return;

  const question = aiInput.value;
  aiTouchSendPending = true;
  submitAiQuestion(question);
  setTimeout(() => { aiTouchSendPending = false; }, 450);
});

aiForm.addEventListener('submit', e => {
  e.preventDefault();
  if (aiTouchSendPending) return;
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
