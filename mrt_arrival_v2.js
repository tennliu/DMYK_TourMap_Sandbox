(() => {
  const DATA = window.DMYK_MRT_DATA || {};
  const LINES = ['BR','R','G','O','BL','Y'];
  // SVG elements are tagged with stable data-dmyk-line/data-dmyk-network attributes.
  const FADE_OPACITY = 0.10;
  const MRT_LANGUAGES = new Set(['zh','en','ja','ko']);
  const UI_COPY = {
    zh: {origin:'出發站',route:'前往東門',line:'路線',station:'車站',chooseLine:'請先選擇路線',chooseStation:'請選擇車站',gps:'使用 GPS 或選擇路線及車站',ready:'已規劃',stops:n=>n+' 站',transfers:n=>n+' 次轉乘',title:'台北捷運',subtitle:'前往東門',startAria:'選擇捷運路線',stationAria:'選擇捷運車站'},
    en: {origin:'Starting from',route:'Route to DMYK',line:'Line',station:'Station',chooseLine:'Select line first',chooseStation:'Select station',gps:'GPS or select line + station',ready:'Ready',stops:n=>n+(n===1?' stop':' stops'),transfers:n=>n+(n===1?' transfer':' transfers'),title:'Metro Taipei',subtitle:'Route to Dongmen',startAria:'Select MRT line',stationAria:'Select MRT station'},
    ja: {origin:'出発駅',route:'東門へのルート',line:'路線',station:'駅',chooseLine:'路線を選択',chooseStation:'駅を選択',gps:'GPS または路線と駅を選択',ready:'経路を表示',stops:n=>n+' 駅',transfers:n=>n+' 回乗換',title:'台北MRT',subtitle:'東門へのルート',startAria:'MRT路線を選択',stationAria:'MRT駅を選択'},
    ko: {origin:'출발역',route:'동먼 가는 길',line:'노선',station:'역',chooseLine:'노선을 먼저 선택',chooseStation:'역 선택',gps:'GPS 또는 노선과 역을 선택',ready:'경로 준비됨',stops:n=>n+'개 역',transfers:n=>n+'회 환승',title:'타이베이 MRT',subtitle:'동먼 가는 길',startAria:'MRT 노선 선택',stationAria:'MRT 역 선택'}
  };
  // Official-verified labels live separately from routing and graphics.
  const LOCALIZED = window.DMYK_MRT_LOCALE_DATA || {};
  const OFFICIAL_NAMES = LOCALIZED.stations || {};
  const OFFICIAL_LINE_NAMES = LOCALIZED.lines || {};
  function normalizeMrtLanguage(lang) { return MRT_LANGUAGES.has(lang)?lang:'en'; }
  let mrtLanguage=normalizeMrtLanguage(window.DMYK_MRT_LANG || 'en');
  function copy() {return UI_COPY[mrtLanguage]||UI_COPY.en;}
  function nameFor(node) {
    if(!node)return '';
    if(mrtLanguage==='zh')return node.zh;
    if(mrtLanguage==='en')return node.en;
    return OFFICIAL_NAMES[node.code]?.[mrtLanguage] || node.en;
  }
  const GPS_MAX_DISTANCE = 3000;
  const TRANSFER_COST = 3.25; // Equivalent to 3.25 stops: prefer simpler transfers without extreme detours.

  const panel = document.getElementById('mrtPanel');
  const backdrop = document.getElementById('mrtBackdrop');
  const trigger = document.getElementById('mrtBtn');
  const mapObject = document.getElementById('mrtMapObject');
  const mapStage = panel?.querySelector('.mrt-map-stage');
  if (!panel || !backdrop || !trigger || !mapObject || !mapStage || !DATA.lines) return;

  // Keep MRT independent from the scaled 390px map shell.
  document.body.append(backdrop, panel);

  let selectedLine = '';
  let selectedStation = '';
  let lastPosition = null;
  let gpsTried = false;
  let gpsRequestToken = 0;
  let activeLines = [];
  let activeRouteNodes = [];
  let stationEntities = null;
  let boundSvgDocument = null;

  const graph = new Map();
  const nodes = new Map();

  function meta(line) {
    return DATA.meta?.[line] || {zh:line,en:line,color:'#910000'};
  }

  function nodeId(line, code) {
    return line + ':' + code;
  }

  function addNode(line, station) {
    const id = nodeId(line, station.code);
    nodes.set(id, {...station,line,id});
    if (!graph.has(id)) graph.set(id, []);
  }

  function connect(a,b,cost,type) {
    if (!graph.has(a) || !graph.has(b)) return;
    graph.get(a).push({to:b,cost,type});
    graph.get(b).push({to:a,cost,type});
  }

  for (const line of LINES) {
    for (const station of DATA.lines[line] || []) addNode(line, station);
  }

  function connectSequence(line, stations) {
    for (let i=1;i<stations.length;i++) {
      connect(nodeId(line,stations[i-1].code),nodeId(line,stations[i].code),1,'ride');
    }
  }

  for (const line of LINES) {
    const list = DATA.lines[line] || [];
    if (line === 'R') {
      const main = list.filter(s => s.code !== 'R22A');
      connectSequence(line, main);
      connect(nodeId('R','R22'),nodeId('R','R22A'),1,'ride');
    } else if (line === 'G') {
      const main = list.filter(s => s.code !== 'G03A');
      connectSequence(line, main);
      connect(nodeId('G','G03'),nodeId('G','G03A'),1,'ride');
    } else if (line === 'O') {
      const trunkAndXinlu = list.filter(s => {
        const n = Number((s.code.match(/\d+/)||['999'])[0]);
        return n <= 21;
      });
      const luzhou = list.filter(s => Number((s.code.match(/\d+/)||['0'])[0]) >= 50);
      connectSequence(line, trunkAndXinlu);
      const branchStart = DATA.lines.O.find(s => s.code === 'O12');
      if (branchStart && luzhou.length) connectSequence(line,[branchStart,...luzhou]);
    } else {
      connectSequence(line,list);
    }
  }

  const byName = new Map();
  for (const node of nodes.values()) {
    const key = node.zh;
    if (!byName.has(key)) byName.set(key,[]);
    byName.get(key).push(node);
  }
  for (const group of byName.values()) {
    if (group.length < 2) continue;
    for (let i=0;i<group.length;i++) for (let j=i+1;j<group.length;j++) {
      if (group[i].line !== group[j].line) {
        connect(group[i].id,group[j].id,TRANSFER_COST,'transfer');
      }
    }
  }

  const destinationIds = new Set([nodeId('R','R07'),nodeId('O','O06')]);

  function shortestPath(startId) {
    if (!nodes.has(startId)) return null;
    const dist = new Map([[startId,0]]);
    const prev = new Map();
    const queue = [{id:startId,d:0}];
    let target = null;

    while (queue.length) {
      queue.sort((a,b)=>a.d-b.d);
      const current = queue.shift();
      if (current.d !== dist.get(current.id)) continue;
      if (destinationIds.has(current.id)) {
        target = current.id;
        break;
      }
      for (const edge of graph.get(current.id) || []) {
        const nd = current.d + edge.cost;
        if (nd < (dist.get(edge.to) ?? Infinity) - 1e-9) {
          dist.set(edge.to,nd);
          prev.set(edge.to,current.id);
          queue.push({id:edge.to,d:nd});
        }
      }
    }
    if (!target) return null;
    const ids = [];
    let id = target;
    while (id) {
      ids.push(id);
      if (id === startId) break;
      id = prev.get(id);
    }
    ids.reverse();
    return {ids,nodes:ids.map(x=>nodes.get(x)),cost:dist.get(target)};
  }

  function segmentsFromPath(pathNodes) {
    if (!pathNodes?.length) return [];
    const segments = [{line:pathNodes[0].line,start:pathNodes[0],end:pathNodes[0],stops:0}];
    for (let i=1;i<pathNodes.length;i++) {
      const prev = pathNodes[i-1];
      const cur = pathNodes[i];
      if (cur.line === prev.line) {
        const seg = segments[segments.length-1];
        seg.end = cur;
        seg.stops += 1;
      } else {
        segments.push({line:cur.line,start:cur,end:cur,stops:0});
      }
    }
    return segments;
  }

  function distanceMeters(a,b) {
    const rad = v => v*Math.PI/180;
    const R = 6371000;
    const dLat = rad(b.lat-a.lat);
    const dLng = rad(b.lng-a.lng);
    const q = Math.sin(dLat/2)**2 +
      Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;
    return R*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q));
  }

  function nearestNode(position, onlyLine='') {
    let min = Infinity;
    let candidates = [];
    for (const node of nodes.values()) {
      if (onlyLine && node.line !== onlyLine) continue;
      const meters = distanceMeters(position,node);
      if (meters < min - 3) {
        min = meters;
        candidates = [{node,meters}];
      } else if (Math.abs(meters-min) <= 30) {
        candidates.push({node,meters});
      }
    }
    if (!candidates.length) return null;
    candidates.sort((a,b)=>{
      const ra=shortestPath(a.node.id)?.cost ?? Infinity;
      const rb=shortestPath(b.node.id)?.cost ?? Infinity;
      return ra-rb;
    });
    return candidates[0];
  }

  const assistant = document.createElement('section');
  assistant.className = 'mrt-arrival-v2';

  const originTop = document.createElement('div');
  originTop.className = 'mrt-v2-origin-top';
  const originTitle = document.createElement('div');
  originTitle.className = 'mrt-v2-origin-title';
  originTitle.textContent = copy().origin;
  const gpsBtn = document.createElement('button');
  gpsBtn.type = 'button';
  gpsBtn.className = 'mrt-v2-gps-btn';
  gpsBtn.textContent = '◎ GPS';
  originTop.append(originTitle,gpsBtn);

  const selectors = document.createElement('div');
  selectors.className = 'mrt-v2-selectors';
  const lineSelect = document.createElement('select');
  lineSelect.className = 'mrt-v2-line-select';
  lineSelect.setAttribute('aria-label','Select MRT line');
  const stationSelect = document.createElement('select');
  stationSelect.className = 'mrt-v2-station-select';
  stationSelect.setAttribute('aria-label','Select MRT station');
  selectors.append(lineSelect,stationSelect);

  const status = document.createElement('div');
  status.className = 'mrt-v2-status';
  status.textContent = copy().gps;

  const routeWrap = document.createElement('div');
  routeWrap.className = 'mrt-v2-route is-hidden';
  const routeHeading = document.createElement('div');
  routeHeading.className = 'mrt-v2-route-heading';
  routeHeading.textContent = copy().route;
  routeWrap.appendChild(routeHeading);

  assistant.append(originTop,selectors,status,routeWrap);
  panel.insertBefore(assistant,mapStage);
  const simpleRouteView = window.DMYK_MRT_SIMPLE?.mount({
    panel,mapStage,getMeta:meta,getName:nameFor,getLanguage:()=>mrtLanguage,getCopy:copy
  });

  function setLineSelectAppearance() {
    const m = selectedLine ? meta(selectedLine) : null;
    lineSelect.style.background = m ? m.color : '#910000';
    lineSelect.style.color = selectedLine === 'Y' ? '#292414' : '#fff';
  }

  function fillLineSelect() {
    lineSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = copy().line;
    lineSelect.appendChild(placeholder);
    for (const line of LINES) {
      const option = document.createElement('option');
      option.value = line;
      option.textContent = line + ' · ' + (OFFICIAL_LINE_NAMES[line]?.[mrtLanguage] || (mrtLanguage==='zh'?meta(line).zh:meta(line).en));
      lineSelect.appendChild(option);
    }
    lineSelect.value = selectedLine;
    setLineSelectAppearance();
  }

  function fillStationSelect(line,selected='') {
    stationSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = line ? copy().station : copy().chooseLine;
    stationSelect.appendChild(placeholder);
    stationSelect.disabled = !line;
    for (const station of DATA.lines[line] || []) {
      const option = document.createElement('option');
      option.value = station.code;
      option.textContent = station.code + ' · ' + nameFor(station);
      stationSelect.appendChild(option);
    }
    stationSelect.value = selected;
  }

  function stationNode(line,code) {
    return nodes.get(nodeId(line,code)) || null;
  }

  function renderRoute(startNode) {
    const route = shortestPath(startNode.id);
    if(!route) {
      routeWrap.classList.add('is-hidden');
      simpleRouteView?.clear();
      status.textContent='Route unavailable';
      setMapHighlight([]);
      return;
    }
    const segments=segmentsFromPath(route.nodes);
    routeWrap.classList.remove('is-hidden');

    // Shared routing data drives BOTH map highlighting and the simple card view.
    // Keep the SVG laid out while rebuilding its route when Simple Route is open.
    const wasHidden=mapStage.hidden;
    if(wasHidden)mapStage.hidden=false;
    const lines=segments.map(s=>s.line);
    setMapHighlight(lines,route.nodes);
    if(wasHidden)mapStage.hidden=true;
    simpleRouteView?.render(segments);

    const transferCount=Math.max(0,segments.length-1);
    const stopCount=segments.reduce((sum,s)=>sum+s.stops,0);
    routeHeading.textContent=copy().route+' · '+copy().transfers(transferCount)+' · '+copy().stops(stopCount);
    status.textContent=copy().ready+' · '+startNode.code+' '+nameFor(startNode);
  }

  function selectStart(line,code,source='manual') {
    selectedLine = line;
    selectedStation = code;
    fillLineSelect();
    fillStationSelect(line,code);
    const start = stationNode(line,code);
    if (!start) return;
    status.textContent = source === 'gps'
      ? 'GPS · ' + start.code + ' ' + nameFor(start)
      : start.code + ' ' + nameFor(start);
    renderRoute(start);
  }

  async function useGps(force=false) {
    const token = ++gpsRequestToken;
    if (!navigator.geolocation) {
      status.textContent = 'GPS unavailable · select manually';
      return;
    }
    if (gpsTried && !force && !lastPosition) return;
    gpsTried = true;
    gpsBtn.disabled = true;
    gpsBtn.textContent = 'Locating…';
    status.textContent = 'Finding nearest MRT station…';

    try {
      const pos = await new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject,{
          enableHighAccuracy:true,maximumAge:30000,timeout:9000
        });
      });
      if (token !== gpsRequestToken) return;
      lastPosition = {lat:pos.coords.latitude,lng:pos.coords.longitude};
      const nearest = nearestNode(lastPosition);
      if (!nearest || nearest.meters > GPS_MAX_DISTANCE) {
        status.textContent = 'Not near Taipei MRT · select line + station';
        routeWrap.classList.add('is-hidden');
        simpleRouteView?.clear();
        setMapHighlight([]);
        return;
      }
      selectStart(nearest.node.line,nearest.node.code,'gps');
    } catch (_) {
      status.textContent = 'GPS unavailable · select line + station';
    } finally {
      gpsBtn.disabled = false;
      gpsBtn.textContent = '◎ GPS';
    }
  }

  function bboxCenter(el) {
    try {
      const b = el.getBBox();
      if (!b.width && !b.height) return null;
      return {x:b.x+b.width/2,y:b.y+b.height/2};
    } catch (_) {
      return null;
    }
  }

  function directChildOf(root,el) {
    let node = el;
    while (node && node.parentElement && node.parentElement !== root) node=node.parentElement;
    return node?.parentElement === root ? node : el;
  }

  function setupSvgEntities(doc) {
    if(!doc || boundSvgDocument===doc)return;
    boundSvgDocument=doc;
    stationEntities=[];
  }

  function setMapHighlight(lines,routeNodes=[]) {
    activeLines=[...new Set(lines||[])];
    activeRouteNodes=routeNodes||[];
    const doc=mapObject.contentDocument;
    if(!doc)return;
    setupSvgEntities(doc);
    const svg=doc.querySelector('svg');
    if(!svg)return;
    const selected=new Set(activeLines);
    const active=selected.size>0;
    const exact=active && !!window.DMYK_MRT_FOCUS?.paint(
      doc,activeRouteNodes,mrtLanguage,OFFICIAL_NAMES,meta);
    if(!exact){
      svg.querySelector('#dmyk-route-layer')?.replaceChildren();
      const labelLayer=svg.querySelector('#dmyk-label-layer');
      if(labelLayer){labelLayer.replaceChildren();labelLayer.setAttribute('data-language',mrtLanguage);}
    }
    // Control station outline names, badge numbers and legend artwork as
    // complete SVG groups; preserving the map's original graphic alignment.
    if(window.DMYK_MRT_VISUAL){
      window.DMYK_MRT_VISUAL.apply(doc,activeLines,active);
    } else {
      for(const el of svg.querySelectorAll('[data-dmyk-line],[data-dmyk-network]')){
        const line=el.getAttribute('data-dmyk-line');
        el.style.transition='opacity .22s ease';
        el.style.opacity=(active && (!line || !selected.has(line)))?String(FADE_OPACITY):'1';
      }
    }
    svg.setAttribute('data-dmyk-route-focus',exact?'segments':active?'lines':'none');
  }

  function localizeUI() {
    const t=copy();
    originTitle.textContent=t.origin;
    lineSelect.setAttribute('aria-label',t.startAria);
    stationSelect.setAttribute('aria-label',t.stationAria);
    panel.querySelector('.mrt-panel-title').textContent=t.title;
    panel.querySelector('.mrt-panel-subtitle').textContent=t.subtitle;
    fillLineSelect();
    fillStationSelect(selectedLine,selectedStation);
    simpleRouteView?.localize();
    if(selectedLine && selectedStation) {
      const node=stationNode(selectedLine,selectedStation);
      if(node)renderRoute(node);
    } else {
      routeHeading.textContent=t.route;
      status.textContent=selectedLine?t.chooseStation:t.gps;
      simpleRouteView?.clear();
      setMapHighlight([]);
    }
  }

  window.addEventListener('dmyk:languagechange',(event)=>{
    mrtLanguage=normalizeMrtLanguage(event.detail?.language);
    localizeUI();
  });

  function reset() {
    selectedLine='';
    selectedStation='';
    fillLineSelect();
    fillStationSelect('');
    routeWrap.classList.add('is-hidden');
    simpleRouteView?.reset();
    status.textContent=copy().gps;
    setMapHighlight([]);
    if (lastPosition) {
      const nearest=nearestNode(lastPosition);
      if (nearest && nearest.meters<=GPS_MAX_DISTANCE) {
        selectStart(nearest.node.line,nearest.node.code,'gps');
        return;
      }
    }
    useGps(false);
  }

  lineSelect.addEventListener('change',()=>{
    gpsRequestToken += 1;
    selectedLine=lineSelect.value;
    selectedStation='';
    setLineSelectAppearance();
    fillStationSelect(selectedLine);
    routeWrap.classList.add('is-hidden');
    simpleRouteView?.clear();
    setMapHighlight([]);
    status.textContent=selectedLine?copy().chooseStation:copy().gps;
  });

  stationSelect.addEventListener('change',()=>{
    gpsRequestToken += 1;
    selectedStation=stationSelect.value;
    if (selectedLine&&selectedStation) selectStart(selectedLine,selectedStation,'manual');
  });

  gpsBtn.addEventListener('click',()=>useGps(true));
  mapObject.addEventListener('load',()=>setMapHighlight(activeLines,activeRouteNodes));
  trigger.addEventListener('click',reset);

  // Do not let browser-level pinch/pan move the whole DMYK canvas.
  const stopGesture=e=>{
    if (panel.classList.contains('is-visible')) e.preventDefault();
  };
  panel.addEventListener('touchmove',e=>{
    if (e.touches&&e.touches.length>1) e.preventDefault();
  },{passive:false});
  document.addEventListener('gesturestart',stopGesture,{passive:false});
  document.addEventListener('gesturechange',stopGesture,{passive:false});
  document.addEventListener('gestureend',stopGesture,{passive:false});

  localizeUI();
})();
