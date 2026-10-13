/* DMYK MRT direct-export controller — 2026-10-13.
 * The Illustrator file contains grouped station/title badges, route geometry
 * and six individually grouped legends. No language translation is invented.
 * The source-specific root indices are guarded by data-dmyk-version="261013".
 * Unknown station-to-segment mappings retain line-level safe fallback.
 */
(() => {
  'use strict';
  const NS='http://www.w3.org/2000/svg';
  const FADE=0.10, BG='#310000';
  const TRACK_ROOTS=new Set([3,4,8,9,10,12,13,14,15,19,236,237]);
  const CLASS_LINES={
    'cls-34':'BR','cls-29':'R','cls-28':'G','cls-37':'O',
    'cls-15':'BL','cls-23':'BL','cls-43':'Y',
    'cls-25':'A','cls-31':'other','cls-45':'K',
    'cls-7':'LB','cls-14':'V'
  };
  const ROWS=[
    ['BR',795,814],['R',814,833],['G',833,852],
    ['O',852,871],['BL',871,890],['Y',890,913]
  ];
  const cache=new WeakMap();
  const bounds=el=>{try{
    const b=el.getBBox();
    return b && (b.width||b.height)?b:null;
  }catch(_){return null;}};
  function linesOf(el){
    const lines=new Set();
    if(el.hasAttribute('class'))for(const c of el.classList)if(CLASS_LINES[c])lines.add(CLASS_LINES[c]);
    el.querySelectorAll('[class]').forEach(n=>{
      for(const c of n.classList)if(CLASS_LINES[c])lines.add(CLASS_LINES[c]);
    });
    return [...lines];
  }
  function splitTrackPath(el,rootIndex,line) {
    if(el.localName!=='path')return el;
    const d=el.getAttribute('d')||'';
    if(/[m][0-9.+-]/.test(d))return el;
    const pieces=d.split(/(?=M[+\-.\d])/).filter(Boolean);
    if(pieces.length<2)return el;
    const group=document.createElementNS(NS,'g');
    group.setAttribute('data-dmyk-original-class',el.getAttribute('class')||'');
    group.setAttribute('data-dmyk-segment-count',String(pieces.length));
    for(let i=0;i<pieces.length;i++){
      const p=el.cloneNode(false);
      p.setAttribute('d',pieces[i]);
      p.removeAttribute('id');
      p.setAttribute('id',`dmyk-seg-${line}-${rootIndex}-${String(i).padStart(2,'0')}`);
      p.setAttribute('data-dmyk-segment',`${line}-${rootIndex}-${i}`);
      group.appendChild(p);
    }
    el.replaceWith(group);
    return group;
  }
  function prepare(doc) {
    if(cache.has(doc))return cache.get(doc);
    const svg=doc?.querySelector('svg');
    if(!svg||svg.getAttribute('data-dmyk-version')!=='261013')return null;
    const original=[...svg.children];
    const rows=[];
    // Root drawing order is from THIS direct export. Do not use on other versions.
    for(let i=2;i<=237;i++){
      let el=original[i];
      if(!el)continue;
      if(i===2 || i===234 || i===235)continue; // footer, QR, Dongmen marker remain visible
      const lines=linesOf(el);
      let role='other';
      if(TRACK_ROOTS.has(i)){
        role='track';
        if(el.localName==='path'&&lines.length===1)el=splitTrackPath(el,i,lines[0]);
      }else if(i===194)role='legend';
      else if(i>=195&&i<=233){
        role='legend';
        const b=bounds(el);
        if(b && b.x<410){
          const cy=b.y+b.height/2;
          const l=ROWS.find(([_,lo,hi])=>cy>=lo&&cy<hi);
          if(l)lines.splice(0,lines.length,l[0]);
        }
      }else if(i>=16&&i<=193)role='station';
      const applicable=lines.length?lines:['other'];
      el.setAttribute('data-dmyk-visual-role',role);
      el.setAttribute('data-dmyk-visual-lines',applicable.join(','));
      el.setAttribute('data-dmyk-group','g'+i);
      rows.push({el,role,lines:applicable,index:i});
    }
    const result={svg,rows};
    cache.set(doc,result);
    svg.setAttribute('data-dmyk-controller','grouped-261013');
    return result;
  }
  function stationNearRoute(el,itinerary){
    const b=bounds(el);
    if(!b)return false;
    const sch=window.DMYK_MRT_SCHEMATIC;
    if(!sch?.anchors)return false;
    const sx=595.28/(sch.width||620),sy=936.23/(sch.height||975);
    return itinerary.some(n=>{
      const p=sch.anchors[n.code];
      if(!p)return false;
      const x=p[0]*sx,y=675+p[1]*sy;
      const dx=Math.max(b.x-x,0,x-(b.x+b.width));
      const dy=Math.max(b.y-y,0,y-(b.y+b.height));
      return dx*dx+dy*dy<16; // within four drawing units
    });
  }
  function apply(doc,selectedLines,active,itinerary=[],exact=false) {
    const item=prepare(doc);
    if(!item)return false;
    const selected=new Set(selectedLines||[]);
    const selectedStations=new Set((itinerary||[]).map(n=>n.code));
    // A precise overlay is drawn separately, so suppress unused map primitives.
    for(const {el,role,lines} of item.rows){
      let keep=!active;
      if(active){
        if(role==='station' && exact){
          keep=stationNearRoute(el,itinerary) && (
            lines.some(l=>selected.has(l)) || lines.includes('other')
          );
        }else if(role==='track'){
          keep=!exact && lines.some(l=>selected.has(l));
        }else{
          keep=lines.some(l=>selected.has(l));
        }
      }
      el.style.transition='opacity .22s ease';
      el.style.opacity=keep?'1':String(FADE);
    }
    // Keep the official destination mark and graphic footer legible at any state.
    item.svg.setAttribute('data-dmyk-active-stations',[...selectedStations].join(','));
    item.svg.setAttribute('data-dmyk-theme','maroon-261013');
    item.svg.style.background=BG;
    return true;
  }
  window.DMYK_MRT_VISUAL_261013={prepare,apply,FADE,BG};
})();
