/* DMYK 261013 exact journey focus.
 * Each station code maps to one Illustrator station/title group. Track pixels
 * are taken ONLY from the original artwork, exposed through per-line masks.
 * No geographical (lat/lon) coordinates and no guessed track SVG are used.
 */
(() => {
  'use strict';
  const NS='http://www.w3.org/2000/svg';
  const VIS=window.DMYK_MRT_VISUAL_261013;
  if(!VIS)return;
  const DIM=0.06;
  // Illustrator's direct-export top-level child positions, reviewed by route and
  // by the badge's official line colour. Combined transfer badges share indices.
  const CODES={
    BL:[73,161,160,159,158,157,185,175,174,173,162,143,95,163,119,96,97,98,99,102,100,101,83],
    BR:[80,125,124,123,122,121,120,126,145,119,118,117,164,116,115,114,129,128,127,113,112,111,110,83],
    G:[32,167,168,179,166,165,107,106,156,144,109,162,108,150,105,118,103,104,33],
    O:[81,182,169,155,156,146,163,105,152,153,154,88,89,90,171,178,188,172,177,176,87],
    Y:[179,180,183,181,182,184,192,191,193,186,187,188,190,189]
  };
  const ORDER={
    BL:Array.from({length:23},(_,i)=>'BL'+String(i+1).padStart(2,'0')),
    BR:Array.from({length:24},(_,i)=>'BR'+String(i+1).padStart(2,'0')),
    G:['G01','G02','G03','G04','G05','G06','G07','G08','G09','G10','G11','G12','G13','G14','G15','G16','G17','G18','G19'],
    O:Array.from({length:21},(_,i)=>'O'+String(i+1).padStart(2,'0')),
    Y:Array.from({length:14},(_,i)=>'Y'+String(i+7).padStart(2,'0'))
  };
  const ADDITIONAL={
    'G03A':17,'R22A':86,
    'O50':91,'O51':92,'O52':93,'O53':94,'O54':85,
    'R02':75,'R03':148,'R04':147,'R05':145,'R06':146,
    'R07':235,'R08':144,'R09':151,'R10':143,'R11':150,'R12':149,
    'R13':154,'R14':130,'R15':131,'R16':132,'R17':133,'R18':134,
    'R19':135,'R20':136,'R21':138,'R22':139,'R23':140,'R24':142,
    'R25':170,'R26':141,'R27':77,'R28':25
  };
  const MARKER_CLASS={
    BL:['cls-15','cls-23'],BR:['cls-34'],R:['cls-29'],
    G:['cls-28'],O:['cls-37'],Y:['cls-43']
  };
  // Original vector track groups, without station labels or route-card artwork.
  const TRACK={
    BR:[4],R:[10,12,15],G:[236],O:[14,237],BL:[13],Y:[19]
  };
  const fallback={
    G03A:[325,1460],G07:[349,1329],BR03:[482,1419],
    BR15:[389,995],BR20:[530,940],R22A:[207,810],R07:[318,1258]
  };
  const xref={};
  for(const [line,order] of Object.entries(ORDER))
    order.forEach((code,i)=>{xref[code]={line,index:CODES[line][i]};});
  Object.entries(ADDITIONAL).forEach(([code,index])=>{
    xref[code]={line:code.replace(/[0-9].*/,''),index};
  });
  // The LuZhou branch is still orange, but has non-contiguous O station numbers.
  const byRoot=new Map();
  for(const [code,info] of Object.entries(xref)){
    const codes=byRoot.get(info.index)||[];
    codes.push(code);byRoot.set(info.index,codes);
  }
  const states=new WeakMap();
  const box=el=>{try{
    const b=el.getBBox();
    return b && b.width>0 && b.height>0 ? b : null;
  }catch(_){return null;}};
  const position=b=>({x:b.x+b.width/2,y:b.y+b.height/2});
  function codePoint(state,code){
    if(state.points.has(code))return state.points.get(code);
    const info=xref[code];
    if(!info)return null;
    // The prominent Dongmen destination star is not a station-code badge.
    // Red-line R07 and orange-line O06 refer to the same interchange.
    if(code==='O06'){
      const p=codePoint(state,'R07');
      if(p){state.points.set(code,p);return p;}
    }
    const root=state.roots[info.index];
    if(!root)return null;
    const candidates=[];
    for(const cl of MARKER_CLASS[info.line]||[]){
      for(const el of root.querySelectorAll('.'+cl)){
        const b=box(el);
        if(!b || b.width<9 || b.height<9 || b.width>34 || b.height>34)continue;
        const mismatch=Math.abs(b.width-14.57)+Math.abs(b.height-14.57);
        candidates.push({b,mismatch});
      }
    }
    candidates.sort((a,b)=>a.mismatch-b.mismatch);
    const p=candidates.length ? position(candidates[0].b) :
      (fallback[code] ? {x:fallback[code][0],y:fallback[code][1]} : null);
    if(p)state.points.set(code,p);
    return p;
  }
  function stateOf(doc){
    if(states.has(doc))return states.get(doc);
    const prepared=VIS.prepare(doc);
    if(!prepared)return null;
    const roots=[...prepared.svg.children];
    const defs=prepared.svg.querySelector('defs');
    if(!defs)return null;
    const state={doc,svg:prepared.svg,roots,defs,prepared,points:new Map(),focus:null,masks:[]};
    states.set(doc,state);
    for(const code of Object.keys(xref))codePoint(state,code);
    // Interchange/shared stations may be drawn once in the supplied artwork.
    // Use another code at that physical station only as an explicitly verified
    // fallback, never latitude / longitude or arbitrary nearest-neighbour data.
    const shared=[['BL12','R10'],['BL11','G12'],['BL14','O07'],
      ['BL15','BR10'],['BR09','R05'],['BR11','G16'],
      ['G04','Y07'],['G09','O05'],['G10','R08'],
      ['G14','R11'],['G15','O08'],['O11','R13'],
      ['O17','Y18'],['BL07','Y16'],['G07','G08']];
    for(const [a,b] of shared){
      const pa=state.points.get(a),pb=state.points.get(b);
      if(!pa&&pb)state.points.set(a,pb);
      if(!pb&&pa)state.points.set(b,pa);
    }
    // Dedicated source-specific badge-less positions are restricted to four
    // visually reviewed exceptional glyphs; all other errors trigger fallback.
    return state;
  }
  function canFocus(doc,itinerary){
    const s=stateOf(doc);
    if(!s||!Array.isArray(itinerary)||itinerary.length<2)return false;
    if(!itinerary.every(n=>xref[n.code]&&s.points.has(n.code)))return false;
    return itinerary.some((n,i)=>i&&n.line===itinerary[i-1].line);
  }
  function clear(s){
    s.focus?.remove();
    s.focus=null;
    for(const el of s.masks)el.remove();
    s.masks=[];
  }
  function element(tag,attrs,doc){
    const el=doc.createElementNS(NS,tag);
    for(const [k,v] of Object.entries(attrs||{}))el.setAttribute(k,String(v));
    return el;
  }
  function maskFor(s,line,itinerary){
    const pairs=[];
    for(let i=1;i<itinerary.length;i++){
      const a=itinerary[i-1],b=itinerary[i];
      if(a.line!==line||b.line!==line)continue;
      const p=s.points.get(a.code),q=s.points.get(b.code);
      if(p&&q)pairs.push([p,q]);
    }
    if(!pairs.length)return null;
    const doc=s.doc;
    const id='dmyk-exact-'+line.toLowerCase();
    const mask=element('mask',{id,maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',
      x:0,y:675,width:595.28,height:936.23},doc);
    mask.appendChild(element('rect',{x:0,y:675,width:595.28,height:936.23,fill:'#000'},doc));
    for(const [p,q] of pairs){
      // Wide corridor reveals the supplied Illustrator rail polygons at bends;
      // it never draws a substitute map line or invents unrelated SVG pixels.
      const d='M'+p.x.toFixed(2)+' '+p.y.toFixed(2)+' L'+q.x.toFixed(2)+' '+q.y.toFixed(2);
      mask.appendChild(element('path',{d,stroke:'#fff','stroke-width':26,
        'stroke-linecap':'round','stroke-linejoin':'round',fill:'none'},doc));
    }
    s.defs.appendChild(mask);
    s.masks.push(mask);
    return id;
  }
  function paint(s,itinerary){
    clear(s);
    const visible=new Set(itinerary.map(n=>n.code));
    const host=element('g',{'data-dmyk-exact-focus':'261013'},s.doc);
    const selected=new Set(itinerary.map(n=>n.line));
    for(const line of selected){
      const maskId=maskFor(s,line,itinerary);
      if(!maskId)continue;
      for(const idx of TRACK[line]||[]){
        const src=s.roots[idx];
        if(!src)continue;
        const clone=src.cloneNode(true);
        clone.style.opacity='1';
        clone.removeAttribute('data-dmyk-visual-role');
        clone.removeAttribute('data-dmyk-group');
        clone.querySelectorAll('[id],[data-dmyk-visual-role]').forEach(el=>{
          el.removeAttribute('id');el.removeAttribute('data-dmyk-visual-role');
        });
        clone.setAttribute('mask','url(#'+maskId+')');
        clone.setAttribute('aria-hidden','true');
        host.appendChild(clone);
      }
    }
    if(s.roots[16])s.svg.insertBefore(host,s.roots[16]);
    else s.svg.appendChild(host);
    s.focus=host;
    for(const row of s.prepared.rows){
      const {el,role,index}=row;
      if(role==='station'){
        const associated=byRoot.get(index)||[];
        el.style.opacity=associated.some(code=>visible.has(code))?'1':String(DIM);
      }else if(role==='track'||role==='legend'||role==='other'){
        el.style.opacity=String(DIM);
      }
    }
    // Retain the editorial destination star and footer at full opacity.
    s.svg.setAttribute('data-dmyk-exact-stations',Array.from(visible).join(','));
    s.svg.setAttribute('data-dmyk-route-focus','exact-artwork');
  }
  const originalApply=VIS.apply;
  VIS.canFocus=canFocus;
  VIS.apply=function(doc,selectedLines,active,itinerary=[],exact=false){
    originalApply.call(VIS,doc,selectedLines,active,itinerary,false);
    const s=stateOf(doc);
    if(!s)return false;
    if(active&&exact&&canFocus(doc,itinerary)){
      paint(s,itinerary);
      return true;
    }
    clear(s);
    s.svg.removeAttribute('data-dmyk-exact-stations');
    if(active){
      // Safe fallback remains subdued and does not paint an invented segment.
      for(const row of s.prepared.rows)
        if(row.role==='station'||row.role==='legend')
          row.el.style.opacity=row.lines.some(l=>selectedLines.includes(l))?'1':String(DIM);
    }
    return true;
  };
  VIS.exactBadgeMap=xref;
})();
