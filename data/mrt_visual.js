/* 2026-10-12 : visual role controller for the supplied 261012 Taipei Metro artwork.
 * Keeps outlined station names, code badges, interchange symbols and line legends
 * in the same focus state. The 551-child Illustrator drawing order is intentionally
 * guarded so future SVG exports cannot silently misclassify artwork.
 */
(() => {
  const BACKGROUND = '#310000';
  const FADE = 0.10;
  const COLOR_CLASS = {
    'cls-35':'BR','cls-30':'R','cls-29':'G','cls-37':'O',
    'cls-15':'BL','cls-43':'Y','cls-26':'other','cls-45':'other'
  };
  const state = new WeakMap();
  const box = el => {try {
    const b=el.getBBox();
    return {x:b.x,y:b.y,w:b.width,h:b.height,cx:b.x+b.width/2,cy:b.y+b.height/2};
  }catch(_){return null;}};
  const colors = el => {
    const set=new Set();
    for(const x of el.querySelectorAll('[class]'))
      for(const cls of (x.getAttribute('class')||'').split(/\s+/))
        if(COLOR_CLASS[cls])set.add(COLOR_CLASS[cls]);
    return [...set];
  };
  const nearDistance=(a,b)=>Math.hypot(
    Math.max(a.x-b.cx,0,b.cx-(a.x+a.w)),
    Math.max(a.y-b.cy,0,b.cy-(a.y+a.h))
  );
  function collect(doc) {
    if(state.has(doc))return state.get(doc);
    const svg=doc.querySelector('svg');
    if(!svg)return null;
    const bg=[...svg.children].find(el=>el.tagName?.toLowerCase()==='rect'&&el.classList?.contains('cls-40'));
    if(bg) bg.style.fill=BACKGROUND;
    svg.style.background=BACKGROUND;
    const entries=[];
    const main=[...svg.querySelectorAll('g')].find(el=>el.children.length===551);
    if(main && svg.getAttribute('data-dmyk-version')==='261012'){
      const children=[...main.children];
      const markers=[];
      for(let i=17;i<=205;i++){
        const el=children[i], b=box(el);
        if(!el||!b||!b.w||!b.h||b.w>90||b.h>46)continue;
        const lines=colors(el);
        if(el.tagName.toLowerCase()==='g' && lines.length && lines.some(x=>x!=='other'))
          markers.push({b,lines});
      }
      // Also include purple/airport/other station markers in the anchor pool,
      // so their names and badges fade together rather than leaving orphan text.
      for(let i=17;i<=205;i++){
        const el=children[i],b=box(el);
        if(!el||!b||b.w>90||b.h>46)continue;
        const lines=colors(el);
        if(el.tagName.toLowerCase()==='g' && lines.includes('other'))
          markers.push({b,lines:['other']});
      }
      const inferred=b=>{
        if(!b || !markers.length)return ['other'];
        const ranked=markers.map(m=>({...m,d:nearDistance(b,m.b)})).sort((a,b)=>a.d-b.d);
        if(ranked[0].d>55)return ['other'];
        return [...new Set(ranked.filter(m=>m.d<=Math.max(10,Math.min(22,ranked[0].d+6)))
          .flatMap(m=>m.lines))];
      };
      const add=(el,role,lines,white=false)=>{
        if(!el)return;
        el.setAttribute('data-dmyk-visual-role',role);
        el.setAttribute('data-dmyk-visual-lines',lines.join(','));
        entries.push({el,lines});
        if(white){
          for(const part of el.querySelectorAll('.cls-31'))
            if(part.tagName.toLowerCase()==='path')part.style.fill='#fff';
        }
      };
      for(let i=17;i<=205;i++){
        const el=children[i],b=box(el);
        if(!b || b.w>105 || b.h>48)continue;
        add(el,'station-badge',colors(el).length?colors(el):inferred(b));
      }
      for(let i=206;i<=387;i++){
        const el=children[i],b=box(el);
        if(!b || b.w===0||b.h===0)continue;
        if(i===236 || i===237)continue; // composite outlined regional artwork
        add(el,'station-label',inferred(b),true);
      }
      for(let i=388;i<=509;i++){
        const el=children[i],b=box(el);
        if(!b || b.w===0||b.h===0)continue;
        add(el,'station-code',inferred(b));
      }
      // The artwork's legend is arranged as BR/R/G/O/BL/Y rows.
      // The transport/airport/purple transfer pictograms on the right
      // are contextual and must not remain bright for unrelated trips.
      const legend=[['BR',802],['R',821],['G',840],['O',860],['BL',879],['Y',898]];
      for(let i=511;i<=549;i++){
        const el=children[i],b=box(el);
        if(!b || !b.w || !b.h)continue;
        const related=b.x<410 ? [legend.reduce((best,r)=>Math.abs(r[1]-b.cy)<Math.abs(best[1]-b.cy)?r:best)[0]] : ['other'];
        add(el,'line-legend',related,true);
      }
      const legendPanel=children[510];
      if(legendPanel?.tagName.toLowerCase()==='rect')legendPanel.style.fill=BACKGROUND;
    }
    const result={svg,entries,hasSemanticGroups:entries.length>0};
    state.set(doc,result);
    return result;
  }
  function apply(doc,selectedLines,active) {
    const cached=collect(doc);if(!cached)return;
    const selected=new Set(selectedLines||[]);
    for(const {el,lines} of cached.entries){
      // Avoid compounding parent and child fade on badges whose colored paths
      // also carry data-dmyk-line metadata.
      for(const child of el.querySelectorAll('[data-dmyk-line],[data-dmyk-network]'))
        child.style.opacity='1';
      const keep=!active || lines.some(x=>selected.has(x));
      el.style.transition='opacity .22s ease';
      el.style.opacity=keep?'1':String(FADE);
    }
    // Only uncovered line artwork is handled in this pass. Station groups
    // are controlled as a unit to keep name + code background together.
    for(const el of cached.svg.querySelectorAll('[data-dmyk-line],[data-dmyk-network]')){
      if(el.closest('[data-dmyk-visual-role]'))continue;
      const line=el.getAttribute('data-dmyk-line');
      const keep=!active || (!!line && selected.has(line));
      el.style.transition='opacity .22s ease';
      el.style.opacity=keep?'1':String(FADE);
    }
    cached.svg.setAttribute('data-dmyk-theme','maroon-261012');
  }
  window.DMYK_MRT_VISUAL = {prepare:collect,apply,BACKGROUND,FADE};
})();
