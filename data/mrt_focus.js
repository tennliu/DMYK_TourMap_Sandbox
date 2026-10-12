/* Route overlay is opt-in only for fully calibrated adjacent station segments.
 * Unknown schematic edges keep their legacy whole-line emphasis.
 */
window.DMYK_MRT_FOCUS = {
  paint(doc, itinerary, locale, names, lineInfo) {
    const svg=doc?.querySelector('svg');
    const routeLayer=svg?.querySelector('#dmyk-route-layer');
    const labelLayer=svg?.querySelector('#dmyk-label-layer');
    if(!svg || !routeLayer || !labelLayer)return false;
    routeLayer.replaceChildren();labelLayer.replaceChildren();
    labelLayer.setAttribute('data-language',locale);
    const schematic=window.DMYK_MRT_SCHEMATIC || {};
    const positions=schematic.anchors || {};
    const segments=schematic.rideSegments || {};
    if(!Array.isArray(itinerary)||!itinerary.length)return false;
    const rides=[];
    for(let i=1;i<itinerary.length;i++){
      const a=itinerary[i-1],b=itinerary[i];
      if(a.line!==b.line)continue;
      const key=[a.code,b.code].sort().join('|');
      if(!segments[key]||!positions[a.code]||!positions[b.code])return false;
      rides.push({line:a.line,d:segments[key]});
    }
    if(!rides.length)return false;
    const ns='http://www.w3.org/2000/svg';
    const make=tag=>doc.createElementNS(ns,tag);
    const sx=595.28/(schematic.width||620),sy=936.23/(schematic.height||975);
    const abs=p=>({x:p[0]*sx,y:675+p[1]*sy});
    const defs=svg.querySelector('defs')||svg.insertBefore(make('defs'),svg.firstChild);
    let mask=defs.querySelector('#dmyk-route-station-mask');
    if(!mask){mask=make('mask');mask.id='dmyk-route-station-mask';defs.appendChild(mask);}
    Object.entries({maskUnits:'userSpaceOnUse',x:0,y:675,width:595.28,height:936.23}).forEach(([k,v])=>mask.setAttribute(k,String(v)));
    mask.replaceChildren();
    const full=make('rect');
    Object.entries({x:0,y:675,width:595.28,height:936.23,fill:'#fff'}).forEach(([k,v])=>full.setAttribute(k,String(v)));
    mask.appendChild(full);
    for(const n of itinerary) {
      const p=positions[n.code];if(!p)continue;
      const c=abs(p),hole=make('circle');
      Object.entries({cx:c.x,cy:c.y,r:Object.values(window.DMYK_MRT_DATA?.lines||{}).flat().filter(st=>st.zh===n.zh).length>1?13:8.4,fill:'#000'}).forEach(([k,v])=>hole.setAttribute(k,String(v)));
      mask.appendChild(hole);
    }
    const tracks=make('g');
    tracks.setAttribute('transform','matrix('+sx+' 0 0 '+sy+' 0 675)');
    tracks.setAttribute('mask','url(#dmyk-route-station-mask)');
    tracks.setAttribute('aria-hidden','true');
    for(const ride of rides) {
      const path=make('path');
      Object.entries({d:ride.d,fill:'none',stroke:lineInfo(ride.line).color,
        'stroke-width':6.7,'stroke-linecap':'round','stroke-linejoin':'round'}).forEach(([k,v])=>path.setAttribute(k,String(v)));
      tracks.appendChild(path);
    }
    routeLayer.appendChild(tracks);
    // Only selected station names verified in the supplied official PDFs
    // are overlaid; all other Japanese/Korean names remain official English.
    if(locale==='zh'||locale==='ja'||locale==='ko'){
      const relevant=[itinerary[0]];
      for(let i=1;i<itinerary.length;i++)
        if(itinerary[i].line!==itinerary[i-1].line)relevant.push(itinerary[i]);
      relevant.push(itinerary[itinerary.length-1]);
      const used=new Set();
      for(const n of relevant){
        const p=positions[n.code];if(!p||used.has(n.zh))continue;
        used.add(n.zh);
        if((locale==='ja'||locale==='ko')&&!names[n.code]?.[locale])continue;
        const name=locale==='zh'?n.zh:names[n.code]?.[locale];
        if(!name)continue;
        const pt=abs(p);
        const width=Math.max(28,Math.min(125,[...name].reduce((sum,ch)=>sum+(ch.charCodeAt(0)>255?9:5.4),0)+12));
        const centerX=Math.max(width/2+3,Math.min(595.28-width/2-3,pt.x));
        const centerY=Math.max(685,pt.y-18);
        const box=make('g'),rect=make('rect'),text=make('text');
        Object.entries({x:centerX-width/2,y:centerY-11,width,height:15,rx:4,fill:'#fff','fill-opacity':'.96',
          stroke:lineInfo(n.line).color,'stroke-width':'.65'}).forEach(([k,v])=>rect.setAttribute(k,String(v)));
        Object.entries({x:centerX,y:centerY,'text-anchor':'middle',fill:'#252525','font-size':9,
          'font-family':'-apple-system, BlinkMacSystemFont, Noto Sans TC, Noto Sans JP, Noto Sans KR, sans-serif'}).forEach(([k,v])=>text.setAttribute(k,String(v)));
        text.textContent=name;box.append(rect,text);labelLayer.appendChild(box);
      }
    }
    return true;
  }
};
