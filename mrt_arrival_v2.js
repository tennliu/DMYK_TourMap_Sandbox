(() => {
  const DATA = window.DMYK_MRT_DATA || {};
  const LINES = ['BR','R','G','O','BL','Y'];
  const LINE_CLASS = {
    BR:['cls-36'], R:['cls-31'], G:['cls-30'],
    O:['cls-39'], BL:['cls-25','cls-16'], Y:['cls-45']
  };
  const STATION_MARKER_CLASS = {
    BR:'cls-36', R:'cls-31', G:'cls-30',
    O:'cls-39', BL:'cls-16', Y:'cls-45'
  };
  const FADE_OPACITY = 0.05;
  const GPS_MAX_DISTANCE = 3000;
  const TRANSFER_COST = 0.2;

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
  originTitle.textContent = 'Starting from';
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
  status.textContent = 'GPS or select line + station';

  const routeWrap = document.createElement('div');
  routeWrap.className = 'mrt-v2-route is-hidden';
  const routeHeading = document.createElement('div');
  routeHeading.className = 'mrt-v2-route-heading';
  routeHeading.textContent = 'Route to DMYK';
  const routeCards = document.createElement('div');
  routeCards.className = 'mrt-v2-route-cards';
  routeWrap.append(routeHeading,routeCards);

  assistant.append(originTop,selectors,status,routeWrap);
  panel.insertBefore(assistant,mapStage);

  function setLineSelectAppearance() {
    const m = selectedLine ? meta(selectedLine) : null;
    lineSelect.style.background = m ? m.color : '#910000';
    lineSelect.style.color = selectedLine === 'Y' ? '#292414' : '#fff';
  }

  function fillLineSelect() {
    lineSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Line';
    lineSelect.appendChild(placeholder);
    for (const line of LINES) {
      const option = document.createElement('option');
      option.value = line;
      option.textContent = line + ' · ' + meta(line).en;
      lineSelect.appendChild(option);
    }
    lineSelect.value = selectedLine;
    setLineSelectAppearance();
  }

  function fillStationSelect(line,selected='') {
    stationSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = line ? 'Station' : 'Select line first';
    stationSelect.appendChild(placeholder);
    stationSelect.disabled = !line;
    for (const station of DATA.lines[line] || []) {
      const option = document.createElement('option');
      option.value = station.code;
      option.textContent = station.code + ' · ' + station.en;
      stationSelect.appendChild(option);
    }
    stationSelect.value = selected;
  }

  function stationNode(line,code) {
    return nodes.get(nodeId(line,code)) || null;
  }

  function stopsLabel(n) {
    return n === 1 ? '1 stop' : n + ' stops';
  }

  function textColor(line) {
    return line === 'Y' ? '#292414' : '#fff';
  }

  function singleCard(node,isDestination=false) {
    const card = document.createElement('div');
    card.className = 'mrt-v2-card single' + (isDestination ? ' destination' : '');
    card.style.setProperty('--card-color',meta(node.line).color);
    card.style.color = textColor(node.line);
    const text = document.createElement('div');
    text.className = 'mrt-v2-card-main';
    text.textContent = node.code + ' (' + node.en + ')';
    card.appendChild(text);
    if (isDestination) {
      const star = document.createElement('span');
      star.className = 'mrt-v2-destination-star';
      star.textContent = '★';
      card.appendChild(star);
    }
    return card;
  }

  function transferCard(fromNode,toNode) {
    const card = document.createElement('div');
    card.className = 'mrt-v2-card transfer';
    card.style.setProperty('--from-color',meta(fromNode.line).color);
    card.style.setProperty('--to-color',meta(toNode.line).color);

    const left = document.createElement('span');
    left.className = 'mrt-v2-transfer-code left';
    left.style.color = textColor(fromNode.line);
    left.textContent = fromNode.code;

    const right = document.createElement('span');
    right.className = 'mrt-v2-transfer-code right';
    right.style.color = textColor(toNode.line);
    right.textContent = toNode.code;

    const name = document.createElement('span');
    name.className = 'mrt-v2-transfer-name';
    name.textContent = fromNode.en;

    card.append(left,right,name);
    return card;
  }

  function connector(stops) {
    const el = document.createElement('div');
    el.className = 'mrt-v2-connector';
    const up = document.createElement('span');
    up.textContent = '▼';
    const label = document.createElement('span');
    label.textContent = stopsLabel(stops);
    const down = document.createElement('span');
    down.textContent = '▼';
    el.append(up,label,down);
    return el;
  }

  function renderRoute(startNode) {
    const route = shortestPath(startNode.id);
    if (!route) {
      routeWrap.classList.add('is-hidden');
      status.textContent = 'Route unavailable';
      setMapHighlight([]);
      return;
    }
    const segments = segmentsFromPath(route.nodes);
    routeCards.innerHTML = '';
    routeWrap.classList.remove('is-hidden');

    let firstSegment = 0;
    if (segments.length > 1 && segments[0].stops === 0) {
      routeCards.appendChild(transferCard(segments[0].start,segments[1].start));
      firstSegment = 1;
    } else {
      routeCards.appendChild(singleCard(segments[0].start,false));
    }

    for (let i=firstSegment;i<segments.length;i++) {
      const seg = segments[i];
      if (seg.stops > 0) routeCards.appendChild(connector(seg.stops));
      if (i < segments.length-1) {
        routeCards.appendChild(transferCard(seg.end,segments[i+1].start));
      } else {
        if (seg.stops > 0 || routeCards.children.length === 0) {
          routeCards.appendChild(singleCard(seg.end,true));
        } else {
          const last = routeCards.lastElementChild;
          last?.classList.add('destination');
        }
      }
    }

    const lines = segments.map(s=>s.line);
    setMapHighlight(lines);
    status.textContent = 'Ready · ' + startNode.code + ' ' + startNode.en;
  }

  function selectStart(line,code,source='manual') {
    selectedLine = line;
    selectedStation = code;
    fillLineSelect();
    fillStationSelect(line,code);
    const start = stationNode(line,code);
    if (!start) return;
    status.textContent = source === 'gps'
      ? 'GPS · ' + start.code + ' ' + start.en
      : start.code + ' ' + start.en;
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
    if (!doc || boundSvgDocument === doc) return;
    boundSvgDocument = doc;
    stationEntities = [];
    const svg = doc.querySelector('svg');
    if (!svg) return;
    const mainGroup = [...svg.querySelectorAll('g')]
      .find(group => group.children.length > 450);
    if (!mainGroup) return;

    const markers = [];
    for (const group of mainGroup.children) {
      if (group.tagName.toLowerCase() !== 'g') continue;
      let line = '';
      for (const [key,cls] of Object.entries(STATION_MARKER_CLASS)) {
        if (group.querySelector('.'+cls) && group.querySelector('.cls-9')) {
          line = key;
          break;
        }
      }
      if (!line) continue;
      const center = bboxCenter(group);
      if (!center) continue;
      markers.push({element:group,line,...center});
    }

    const entities = new Map();
    function assign(el,maxDistance=76) {
      const container = directChildOf(mainGroup,el);
      if (entities.has(container)) return;
      const center = bboxCenter(container);
      if (!center) return;
      let best=null;
      for (const marker of markers) {
        const d=Math.hypot(center.x-marker.x,center.y-marker.y);
        if (!best || d<best.d) best={line:marker.line,d};
      }
      if (best && best.d<=maxDistance) entities.set(container,best.line);
    }

    for (const el of doc.querySelectorAll('.cls-32')) assign(el,76);
    for (const el of doc.querySelectorAll('.cls-28')) assign(el,48);

    for (const marker of markers) entities.set(marker.element,marker.line);
    stationEntities=[...entities.entries()].map(([element,line])=>({element,line}));
  }

  function setMapHighlight(lines) {
    activeLines=[...new Set(lines||[])];
    const doc=mapObject.contentDocument;
    if (!doc) return;
    setupSvgEntities(doc);
    const selected=new Set(activeLines);
    const active=selected.size>0;

    for (const [line,classes] of Object.entries(LINE_CLASS)) {
      for (const cls of classes) {
        for (const el of doc.querySelectorAll('.'+cls)) {
          el.style.transition='opacity .22s ease';
          el.style.opacity=active&&!selected.has(line)?String(FADE_OPACITY):'1';
        }
      }
    }
    for (const item of stationEntities||[]) {
      item.element.style.transition='opacity .22s ease';
      item.element.style.opacity=active&&!selected.has(item.line)?String(FADE_OPACITY):'1';
    }
  }

  function reset() {
    selectedLine='';
    selectedStation='';
    fillLineSelect();
    fillStationSelect('');
    routeWrap.classList.add('is-hidden');
    status.textContent='GPS or select line + station';
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
    setMapHighlight([]);
    status.textContent=selectedLine?'Select station':'GPS or select line + station';
  });

  stationSelect.addEventListener('change',()=>{
    gpsRequestToken += 1;
    selectedStation=stationSelect.value;
    if (selectedLine&&selectedStation) selectStart(selectedLine,selectedStation,'manual');
  });

  gpsBtn.addEventListener('click',()=>useGps(true));
  mapObject.addEventListener('load',()=>setMapHighlight(activeLines));
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

  fillLineSelect();
  fillStationSelect('');
})();
