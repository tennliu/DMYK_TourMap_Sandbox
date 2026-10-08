(() => {
  const DATA = window.DMYK_MRT_DATA || {};
  const LINE_ORDER = ['BR','R','G','O','BL','Y'];
  const LINE_CLASS = {
    BR:['cls-36'], R:['cls-31'], G:['cls-30'],
    O:['cls-39'], BL:['cls-25','cls-16'], Y:['cls-45']
  };
  const STATION_MARKER_CLASS = {
    BR:'cls-36', R:'cls-31', G:'cls-30',
    O:'cls-39', BL:'cls-16', Y:'cls-45'
  };
  const BACKGROUND_OPACITY = 0.025;
  let stationLabelGroups = null;
  let stationMarkerGroups = null;
  let boundSvgDocument = null;

  const panel = document.getElementById('mrtPanel');
  const trigger = document.getElementById('mrtBtn');
  const closeBtn = document.getElementById('mrtCloseBtn');
  const backdrop = document.getElementById('mrtBackdrop');
  const mapObject = document.getElementById('mrtMapObject');
  const mapStage = panel ? panel.querySelector('.mrt-map-stage') : null;
  if (!panel || !trigger || !mapObject || !mapStage || !DATA.lines) return;

  let selectedLine = null;
  let suggestedStation = null;
  let activeLines = [];
  let gpsRequestToken = 0;

  const assistant = document.createElement('div');
  assistant.className = 'mrt-assistant';

  const question = document.createElement('div');
  question.className = 'mrt-question';
  question.innerHTML = '<strong>你現在在哪條線？</strong><span>Which line are you on?</span>';
  assistant.appendChild(question);

  const lineChoices = document.createElement('div');
  lineChoices.className = 'mrt-line-choices';
  lineChoices.setAttribute('aria-label','選擇目前捷運線');
  assistant.appendChild(lineChoices);

  const status = document.createElement('div');
  status.className = 'mrt-assistant-status';
  status.setAttribute('aria-live','polite');
  status.textContent = '先選擇目前搭乘的捷運線。';
  assistant.appendChild(status);

  const stationConfirm = document.createElement('div');
  stationConfirm.className = 'mrt-station-confirm is-hidden';
  const stationKicker = document.createElement('div');
  stationKicker.className = 'mrt-step-label';
  stationKicker.textContent = 'GPS 推估最近車站';
  const nearestStation = document.createElement('div');
  nearestStation.className = 'mrt-nearest-station';
  const nearestDistance = document.createElement('div');
  nearestDistance.className = 'mrt-nearest-distance';
  const confirmActions = document.createElement('div');
  confirmActions.className = 'mrt-inline-actions';
  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  confirmBtn.className = 'mrt-small-btn primary';
  confirmBtn.textContent = '就是這站';
  const changeBtn = document.createElement('button');
  changeBtn.type = 'button';
  changeBtn.className = 'mrt-small-btn';
  changeBtn.textContent = '換一站';
  confirmActions.append(confirmBtn, changeBtn);
  stationConfirm.append(stationKicker, nearestStation, nearestDistance, confirmActions);
  assistant.appendChild(stationConfirm);

  const stationPicker = document.createElement('div');
  stationPicker.className = 'mrt-station-picker is-hidden';
  const pickerLabel = document.createElement('label');
  pickerLabel.textContent = '目前車站 Current station';
  const pickerRow = document.createElement('div');
  pickerRow.className = 'mrt-station-picker-row';
  const stationSelect = document.createElement('select');
  const useStationBtn = document.createElement('button');
  useStationBtn.type = 'button';
  useStationBtn.className = 'mrt-small-btn primary';
  useStationBtn.textContent = '使用這站';
  pickerRow.append(stationSelect, useStationBtn);
  stationPicker.append(pickerLabel, pickerRow);
  assistant.appendChild(stationPicker);

  const routeSummary = document.createElement('div');
  routeSummary.className = 'mrt-route-summary is-hidden';
  const routeLines = document.createElement('div');
  routeLines.className = 'mrt-route-lines';
  const routeText = document.createElement('div');
  routeText.className = 'mrt-route-text';
  routeSummary.append(routeLines, routeText);
  assistant.appendChild(routeSummary);

  const note = document.createElement('div');
  note.className = 'mrt-helper-note';
  note.textContent = 'GPS 只用來推估同一條線上的最近車站；可手動更改。此為簡化路線導引，不含即時班距或車況。';
  assistant.appendChild(note);

  panel.insertBefore(assistant, mapStage);

  function lineMeta(line) {
    return DATA.meta?.[line] || {zh:line,en:line,color:'#910000'};
  }

  function stationLabel(station) {
    if (!station) return '';
    return `${station.code} ${station.zh} · ${station.en}`;
  }

  function numericPart(code) {
    const match = String(code || '').match(/\d+/);
    return match ? Number(match[0]) : 999;
  }

  function stationIndex(line, code) {
    const list = DATA.lines?.[line] || [];
    return list.findIndex(station => station.code === code);
  }

  function stationByCode(line, code) {
    return (DATA.lines?.[line] || []).find(station => station.code === code) || null;
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

  function formatDistance(meters) {
    if (!Number.isFinite(meters)) return '';
    if (meters < 1000) return `約 ${Math.max(5, Math.round(meters / 5) * 5)} m`;
    return `約 ${(meters / 1000).toFixed(1)} km`;
  }

  function setupMrtSvgLayers(doc) {
    if (!doc) return;
    if (boundSvgDocument === doc && stationLabelGroups && stationMarkerGroups) return;
    boundSvgDocument = doc;
    stationLabelGroups = [];
    stationMarkerGroups = [];

    // The supplied Illustrator SVG outlines station labels into path groups.
    // Identify each label group by its nearby color-coded station marker.
    const svg = doc.querySelector('svg');
    const mainGroup = svg && [...svg.querySelectorAll('g')]
      .find(group => group.children.length > 450);
    if (!mainGroup) return;

    let sheet = doc.getElementById('dmyk-mrt-highlight-style');
    if (!sheet) {
      sheet = doc.createElementNS('http://www.w3.org/2000/svg','style');
      sheet.id = 'dmyk-mrt-highlight-style';
      sheet.textContent = [
        '.dmyk-mrt-dim { opacity:.025!important; }',
        '.dmyk-mrt-label,.dmyk-mrt-marker { transition:opacity .22s ease; }'
      ].join('\n');
      svg.appendChild(sheet);
    }

    const markers = [];
    const labels = [];
    for (const group of mainGroup.children) {
      if (group.tagName.toLowerCase() !== 'g') continue;

      const glyphs = group.querySelectorAll('.cls-32');
      let markerLine = null;
      for (const [line,cls] of Object.entries(STATION_MARKER_CLASS)) {
        if (group.querySelector('.' + cls)) {
          markerLine = line;
          break;
        }
      }

      let bbox;
      try { bbox = group.getBBox(); } catch (_) { continue; }
      if (!bbox.width || !bbox.height) continue;
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;

      if (markerLine && group.querySelector('.cls-9')) {
        group.classList.add('dmyk-mrt-marker');
        markers.push({element:group,line:markerLine,cx,cy});
      }

      if (glyphs.length) {
        group.classList.add('dmyk-mrt-label');
        labels.push({element:group,line:markerLine,cx,cy});
      }
    }

    for (const label of labels) {
      let line = label.line;
      if (!line && markers.length) {
        let best = null;
        for (const marker of markers) {
          const dist = Math.hypot(label.cx - marker.cx, label.cy - marker.cy);
          if (!best || dist < best.dist) best = {line:marker.line,dist};
        }
        // Keep large legends and non-station captions readable.
        if (best && best.dist < 75) line = best.line;
      }
      if (line) stationLabelGroups.push({element:label.element,line});
    }
    stationMarkerGroups = markers.map(({element,line}) => ({element,line}));
  }

  function setMapHighlight(lines) {
    activeLines = Array.from(new Set(lines || []));
    const doc = mapObject.contentDocument;
    if (!doc) return;
    setupMrtSvgLayers(doc);
    const selected = new Set(activeLines);
    const hasSelection = selected.size > 0;

    // Colored route paths: nonselected lines almost disappear.
    Object.entries(LINE_CLASS).forEach(([line,classes]) => {
      for (const cls of classes) {
        doc.querySelectorAll('.' + cls).forEach(el => {
          el.style.transition = 'opacity .22s ease';
          el.style.opacity = hasSelection && !selected.has(line)
            ? String(BACKGROUND_OPACITY) : '1';
        });
      }
    });

    // Dim the corresponding outlined station names AND station-code badges.
    // Retain the names on both active lines when a transfer is needed.
    for (const {element,line} of stationLabelGroups || []) {
      element.classList.toggle('dmyk-mrt-dim',hasSelection && !selected.has(line));
    }
    for (const {element,line} of stationMarkerGroups || []) {
      element.classList.toggle('dmyk-mrt-dim',hasSelection && !selected.has(line));
    }
  }

  function renderLineChoices() {
    lineChoices.innerHTML = '';
    LINE_ORDER.forEach(line => {
      const meta = lineMeta(line);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'mrt-line-choice';
      button.dataset.line = line;
      button.style.setProperty('--line-color', meta.color);
      button.classList.toggle('is-light', line === 'Y');
      button.textContent = `${line} ${meta.zh.replace(/線$/,'')}`;
      button.setAttribute('aria-pressed', selectedLine === line ? 'true' : 'false');
      if (selectedLine === line) button.classList.add('is-selected');
      button.addEventListener('click', () => selectLine(line));
      lineChoices.appendChild(button);
    });
  }

  function populateStationPicker(line, selectedCode = '') {
    stationSelect.innerHTML = '';
    (DATA.lines?.[line] || []).forEach(station => {
      const option = document.createElement('option');
      option.value = station.code;
      option.textContent = stationLabel(station);
      if (station.code === selectedCode) option.selected = true;
      stationSelect.appendChild(option);
    });
  }

  function hideStationUi() {
    stationConfirm.classList.add('is-hidden');
    stationPicker.classList.add('is-hidden');
    routeSummary.classList.add('is-hidden');
  }

  function showPicker(selectedCode = '') {
    if (!selectedLine) return;
    populateStationPicker(selectedLine, selectedCode);
    stationPicker.classList.remove('is-hidden');
    stationConfirm.classList.add('is-hidden');
    routeSummary.classList.add('is-hidden');
    status.textContent = '請選擇你目前所在的車站。';
  }

  function nearestStationOnLine(line, position) {
    let best = null;
    (DATA.lines?.[line] || []).forEach(station => {
      const meters = distanceMeters(position.lat, position.lng, station.lat, station.lng);
      if (!best || meters < best.meters) best = {station, meters};
    });
    return best;
  }

  function requestPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('geolocation-unavailable'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({lat:pos.coords.latitude, lng:pos.coords.longitude, accuracy:pos.coords.accuracy}),
        reject,
        {enableHighAccuracy:true, maximumAge:30000, timeout:9000}
      );
    });
  }

  async function locateOnSelectedLine() {
    const token = ++gpsRequestToken;
    status.textContent = '正在用 GPS 推估這條線上離你最近的車站…';
    stationConfirm.classList.add('is-hidden');
    stationPicker.classList.add('is-hidden');
    routeSummary.classList.add('is-hidden');

    try {
      const position = await requestPosition();
      if (token !== gpsRequestToken || !selectedLine) return;
      const nearest = nearestStationOnLine(selectedLine, position);
      if (!nearest) throw new Error('no-station');
      suggestedStation = nearest.station;
      nearestStation.textContent = stationLabel(nearest.station);
      const accuracy = Number.isFinite(position.accuracy) ? ` · GPS ±${Math.round(position.accuracy)} m` : '';
      nearestDistance.textContent = `${formatDistance(nearest.meters)}${accuracy}`;
      stationConfirm.classList.remove('is-hidden');
      status.textContent = '確認這是不是你目前的車站；不對的話可以手動更換。';
      populateStationPicker(selectedLine, nearest.station.code);
    } catch (_) {
      if (token !== gpsRequestToken) return;
      suggestedStation = null;
      status.textContent = '目前沒有取得定位；請直接選擇你所在的車站。';
      showPicker();
    }
  }

  function routeFor(line, station) {
    if (!line || !station) return null;

    if (line === 'R') {
      return {active:['R'], transfer:null, destination:stationByCode('R','R07')};
    }
    if (line === 'O') {
      return {active:['O'], transfer:null, destination:stationByCode('O','O06')};
    }
    if (line === 'BR') {
      return {
        active:['BR','R'],
        transfer:{name:'大安 Daan', from:'BR09', to:'R05', toLine:'R'},
        destination:stationByCode('R','R07')
      };
    }
    if (line === 'BL') {
      const n = numericPart(station.code);
      if (n <= 12) {
        return {
          active:['BL','R'],
          transfer:{name:'台北車站 Taipei Main Station', from:'BL12', to:'R10', toLine:'R'},
          destination:stationByCode('R','R07')
        };
      }
      return {
        active:['BL','O'],
        transfer:{name:'忠孝新生 Zhongxiao Xinsheng', from:'BL14', to:'O07', toLine:'O'},
        destination:stationByCode('O','O06')
      };
    }
    if (line === 'G') {
      const n = numericPart(station.code);
      if (n <= 9) {
        return {
          active:['G','O'],
          transfer:{name:'古亭 Guting', from:'G09', to:'O05', toLine:'O'},
          destination:stationByCode('O','O06')
        };
      }
      if (n <= 13) {
        return {
          active:['G','R'],
          transfer:{name:'中正紀念堂 C.K.S. Memorial Hall', from:'G10', to:'R08', toLine:'R'},
          destination:stationByCode('R','R07')
        };
      }
      return {
        active:['G','O'],
        transfer:{name:'松江南京 Songjiang Nanjing', from:'G15', to:'O08', toLine:'O'},
        destination:stationByCode('O','O06')
      };
    }
    if (line === 'Y') {
      return {
        active:['Y','O'],
        transfer:{name:'景安 Jingan', from:'Y11', to:'O02', toLine:'O'},
        destination:stationByCode('O','O06')
      };
    }
    return null;
  }

  function makeLineBadge(line) {
    const meta = lineMeta(line);
    const badge = document.createElement('span');
    badge.className = 'mrt-route-badge';
    badge.style.setProperty('--line-color', meta.color);
    badge.classList.toggle('is-light', line === 'Y');
    badge.textContent = `${line} ${meta.zh}`;
    return badge;
  }

  function renderRoute(station) {
    if (!selectedLine || !station) return;
    const route = routeFor(selectedLine, station);
    if (!route) return;

    routeLines.innerHTML = '';
    route.active.forEach((line, index) => {
      if (index) {
        const arrow = document.createElement('span');
        arrow.className = 'mrt-route-arrow';
        arrow.textContent = '→';
        routeLines.appendChild(arrow);
      }
      routeLines.appendChild(makeLineBadge(line));
    });

    if (route.transfer) {
      routeText.textContent = `目前站：${stationLabel(station)}。搭乘 ${selectedLine}，在 ${route.transfer.name} 轉乘 ${route.transfer.toLine}，前往東門 Dongmen。`;
    } else {
      routeText.textContent = `目前站：${stationLabel(station)}。同線前往東門 Dongmen，不需換線。`;
    }

    routeSummary.classList.remove('is-hidden');
    stationPicker.classList.add('is-hidden');
    stationConfirm.classList.add('is-hidden');
    status.textContent = route.transfer
      ? `建議轉乘：${route.transfer.name}`
      : '這條線可直接到東門。';
    setMapHighlight(route.active);
  }

  function selectLine(line) {
    selectedLine = line;
    suggestedStation = null;
    renderLineChoices();
    hideStationUi();
    setMapHighlight([line]);
    populateStationPicker(line);
    locateOnSelectedLine();
  }

  function resetAssistant() {
    gpsRequestToken += 1;
    selectedLine = null;
    suggestedStation = null;
    status.textContent = '先選擇目前搭乘的捷運線。';
    hideStationUi();
    renderLineChoices();
    setMapHighlight([]);
  }

  confirmBtn.addEventListener('click', () => {
    if (suggestedStation) renderRoute(suggestedStation);
  });
  changeBtn.addEventListener('click', () => {
    showPicker(suggestedStation?.code || '');
  });
  useStationBtn.addEventListener('click', () => {
    const station = stationByCode(selectedLine, stationSelect.value);
    if (station) renderRoute(station);
  });

  mapObject.addEventListener('load', () => setMapHighlight(activeLines));
  trigger.addEventListener('click', resetAssistant);
  closeBtn?.addEventListener('click', () => setMapHighlight([]));
  backdrop?.addEventListener('click', () => setMapHighlight([]));

  renderLineChoices();
})();
