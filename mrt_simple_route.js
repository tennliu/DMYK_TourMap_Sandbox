/* DMYK Simple Route (reference: DMKY route-card Illustrator, 2026-10-12).
 * A display-only view of the existing MRT path. Never re-calculates routing.
 * Intermediate stations are collapsed to stop counts; a transfer retains
 * both line-coded station cards with a two-color circular connection.
 */
(() => {
  'use strict';
  const LABELS = {
    zh:{map:'路網圖',simple:'簡易路線',transfer:'轉乘',destination:'目的地',empty:'請先選擇出發站'},
    en:{map:'Map View',simple:'Simple Route',transfer:'Transfer',destination:'Destination',empty:'Select a starting station'},
    ja:{map:'路線図',simple:'簡易ルート',transfer:'乗換',destination:'目的地',empty:'出発駅を選択してください'},
    ko:{map:'노선도',simple:'간편 경로',transfer:'환승',destination:'목적지',empty:'출발역을 선택하세요'}
  };
  const readableInk = (line, color) => (
    line==='Y' ? '#605000' : line==='O' ? '#975100' : color
  );
  function stepsFromSegments(segments) {
    if(!Array.isArray(segments)||!segments.length)return [];
    const steps=[{kind:'station',node:segments[0].start}];
    for(let i=0;i<segments.length;i++) {
      const seg=segments[i];
      if(seg.stops>0){
        steps.push({kind:'ride',line:seg.line,count:seg.stops});
        steps.push({kind:'station',node:seg.end});
      }
      if(i<segments.length-1){
        const next=segments[i+1];
        steps.push({kind:'transfer',from:seg.line,to:next.line});
        steps.push({kind:'station',node:next.start});
      }
    }
    for(let i=steps.length-1;i>=0;i--){
      if(steps[i].kind==='station') {steps[i].destination=true;break;}
    }
    return steps;
  }
  function mount({panel,mapStage,getMeta,getName,getLanguage,getCopy}) {
    if(!panel||!mapStage)return null;
    const switcher=document.createElement('div');
    switcher.className='mrt-v2-view-switch';
    switcher.setAttribute('role','group');
    const mapBtn=document.createElement('button');
    const simpleBtn=document.createElement('button');
    for(const [button,view] of [[mapBtn,'map'],[simpleBtn,'simple']]){
      button.type='button';
      button.className='mrt-v2-view-btn';
      button.dataset.view=view;
      switcher.appendChild(button);
    }
    const simpleStage=document.createElement('section');
    simpleStage.className='mrt-v2-simple-stage';
    simpleStage.hidden=true;
    simpleStage.setAttribute('role','region');
    const routeList=document.createElement('div');
    routeList.className='mrt-v2-simple-list';
    simpleStage.appendChild(routeList);
    panel.insertBefore(switcher,mapStage);
    panel.insertBefore(simpleStage,mapStage);

    let currentView='map';
    let segments=[];
    let hasRoute=false;
    const locale=()=>LABELS[getLanguage()]||LABELS.en;
    const setColor=(el,line)=>{
      const m=getMeta(line);
      el.style.setProperty('--route-color',m.color);
      el.style.setProperty('--route-ink',readableInk(line,m.color));
    };
    function selectView(requested) {
      currentView=requested==='simple'&&hasRoute?'simple':'map';
      const mapActive=currentView==='map';
      mapStage.hidden=!mapActive;
      simpleStage.hidden=mapActive;
      mapBtn.setAttribute('aria-pressed',String(mapActive));
      simpleBtn.setAttribute('aria-pressed',String(!mapActive));
      simpleBtn.disabled=!hasRoute;
      // Persist map scroll and SVG state when toggling; never reload <object>.
      if(!mapActive)simpleStage.scrollTop=0;
    }
    function stationStep(step) {
      const m=step.node;
      const card=document.createElement('div');
      card.className='mrt-v2-simple-card'+(step.destination?' is-destination':'');
      card.dataset.station=m.code;
      setColor(card,m.line);
      const text=document.createElement('span');
      text.className='mrt-v2-simple-card-title';
      text.textContent=m.code+' '+getName(m);
      card.appendChild(text);
      if(step.destination) {
        const star=document.createElement('span');
        star.className='mrt-v2-simple-destination-star';
        star.textContent='★';
        star.setAttribute('aria-label',locale().destination);
        card.appendChild(star);
      }
      return card;
    }
    function rideStep(step){
      const connector=document.createElement('div');
      connector.className='mrt-v2-simple-connector is-ride';
      setColor(connector,step.line);
      const count=document.createElement('span');
      count.className='mrt-v2-simple-stop-count';
      count.textContent='▼ '+getCopy().stops(step.count)+' ▼';
      connector.appendChild(count);
      return connector;
    }
    function transferStep(step){
      const connector=document.createElement('div');
      connector.className='mrt-v2-simple-connector is-transfer';
      connector.style.setProperty('--from-color',getMeta(step.from).color);
      connector.style.setProperty('--to-color',getMeta(step.to).color);
      const dot=document.createElement('span');
      dot.className='mrt-v2-simple-transfer-dot';
      dot.setAttribute('aria-hidden','true');
      const note=document.createElement('span');
      note.className='mrt-v2-simple-transfer-label';
      note.textContent=locale().transfer;
      connector.append(dot,note);
      connector.setAttribute('aria-label',locale().transfer);
      return connector;
    }
    function draw() {
      routeList.replaceChildren();
      for(const step of stepsFromSegments(segments)){
        routeList.appendChild(step.kind==='station'?stationStep(step):
          step.kind==='ride'?rideStep(step):transferStep(step));
      }
    }
    function localize(){
      const l=locale();
      mapBtn.textContent=l.map;
      simpleBtn.textContent=l.simple;
      mapBtn.setAttribute('aria-label',l.map);
      simpleBtn.setAttribute('aria-label',l.simple);
      simpleStage.setAttribute('aria-label',l.simple);
      if(hasRoute)draw();
      selectView(currentView);
    }
    function render(nextSegments){
      segments=Array.isArray(nextSegments)?nextSegments:[];
      hasRoute=segments.length>0;
      draw();
      // Keep the selected view when origin changes, but only if route exists.
      selectView(currentView);
    }
    function clear(){
      segments=[];
      hasRoute=false;
      routeList.replaceChildren();
      selectView('map');
    }
    mapBtn.addEventListener('click',()=>selectView('map'));
    simpleBtn.addEventListener('click',()=>selectView('simple'));
    localize();
    return {render,clear,localize,reset:clear,getView:()=>currentView};
  }
  window.DMYK_MRT_SIMPLE={mount,stepsFromSegments};
})();
