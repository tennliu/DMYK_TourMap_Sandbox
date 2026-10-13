/* DMYK MRT cards — exact outer/inner geometry from supplied
 * Route_Start.svg / Route_Passing.svg / Route_End.svg (2026-10-13).
 * Source SVG label outlines are intentionally omitted: labels are live text.
 * Original, unmodified files remain in assets/route_cards/ for comparison.
 */
(() => {
  'use strict';
  const shapes={
    start:{
      viewBox:'0 0 176.13 53.1',
      outer:'M168.32,43.69h-75.14c-1.57,0-2.83,1.27-2.83,2.83v6.58h-4.56v-6.58c0-1.57-1.27-2.83-2.83-2.83H7.81c-4.31,0-7.81-3.5-7.81-7.81V7.81C0,3.5,3.5,0,7.81,0h160.51c4.31,0,7.81,3.5,7.81,7.81v28.07c0,4.31-3.5,7.81-7.81,7.81Z',
      inner:'M74.03-61.97h28.07c1.96,0,3.56,1.59,3.56,3.56V102.1c0,1.96-1.59,3.56-3.56,3.56h-28.07c-1.96,0-3.56-1.59-3.56-3.56V-58.41c0-1.96,1.59-3.56,3.56-3.56Z',
      transform:'translate(66.22 109.91) rotate(-90)'
    },
    passing:{
      viewBox:'0 0 176.13 62.52',
      outer:'M168.32,9.42h-75.14c-1.57,0-2.83-1.27-2.83-2.83V0h-4.56v6.58c0,1.57-1.27,2.83-2.83,2.83H7.81c-4.31,0-7.81,3.5-7.81,7.81v28.07c0,4.31,3.5,7.81,7.81,7.81h75.14c1.57,0,2.83,1.27,2.83,2.83v6.58h4.56v-6.58c0-1.57,1.27-2.83,2.83-2.83h75.14c4.31,0,7.81-3.5,7.81-7.81v-28.07c0-4.31-3.5-7.81-7.81-7.81Z',
      inner:'M74.03-52.55h28.07c1.96,0,3.56,1.59,3.56,3.56V111.51c0,1.96-1.59,3.56-3.56,3.56h-28.07c-1.96,0-3.56-1.59-3.56-3.56V-49c0-1.96,1.59-3.56,3.56-3.56Z',
      transform:'translate(119.32 -56.81) rotate(90)'
    },
    end:{
      viewBox:'0 0 176.13 53.1',
      outer:'M168.32,9.42h-75.14c-1.57,0-2.83-1.27-2.83-2.83V0h-4.56v6.58c0,1.57-1.27,2.83-2.83,2.83H7.81c-4.31,0-7.81,3.5-7.81,7.81v28.07c0,4.31,3.5,7.81,7.81,7.81h160.51c4.31,0,7.81-3.5,7.81-7.81v-28.07c0-4.31-3.5-7.81-7.81-7.81Z',
      inner:'M74.03-52.55h28.07c1.96,0,3.56,1.59,3.56,3.56V111.51c0,1.96-1.59,3.56-3.56,3.56h-28.07c-1.96,0-3.56-1.59-3.56-3.56V-49c0-1.96,1.59-3.56,3.56-3.56Z',
      transform:'translate(119.32 -56.81) rotate(90)'
    }
  };
  const ns='http://www.w3.org/2000/svg';
  function part(tag,attrs){
    const el=document.createElementNS(ns,tag);
    for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));
    return el;
  }
  function station(kind,code,name,color){
    const shape=shapes[kind]||shapes.passing;
    const box=document.createElement('div');
    box.className='mrt-v2-simple-card';
    box.dataset.shape=kind;
    box.dataset.station=code;
    box.style.setProperty('--route-color',color);
    box.style.setProperty('--route-ink',color);
    const svg=part('svg',{viewBox:shape.viewBox,preserveAspectRatio:'xMidYMid meet',
      'aria-hidden':'true',focusable:'false'});
    svg.classList.add('mrt-v2-art-svg');
    svg.append(
      part('path',{d:shape.outer,fill:color}),
      part('path',{d:shape.inner,transform:shape.transform,fill:'#fff'})
    );
    const title=document.createElement('span');
    title.className='mrt-v2-simple-card-title';
    title.textContent=code+' '+name;
    if([...title.textContent].length>35)box.classList.add('is-long');
    if([...title.textContent].length>49)box.classList.add('is-very-long');
    box.append(svg,title);
    box.setAttribute('aria-label',code+' '+name);
    return box;
  }
  // Original Route_Transit.svg: source line on top, destination line below,
  // with the original white direction arrow preserved.
  function transit(fromColor,toColor){
    const svg=part('svg',{viewBox:'0 0 17.07 17.07',preserveAspectRatio:'xMidYMid meet',
      'aria-hidden':'true',focusable:'false'});
    svg.classList.add('mrt-v2-simple-transfer-art');
    svg.append(
      part('path',{d:'M8.54,17.07c4.71,0,8.54-3.82,8.54-8.54H0c0,4.71,3.82,8.54,8.54,8.54Z',fill:toColor}),
      part('path',{d:'M8.54,0C3.82,0,0,3.82,0,8.54h17.07C17.07,3.82,13.25,0,8.54,0Z',fill:fromColor}),
      part('polygon',{points:'10.89 8.54 10.89 2.92 6.18 2.92 6.18 8.54 3.4 8.54 8.54 13.68 13.67 8.54 10.89 8.54',fill:'#fff'})
    );
    return svg;
  }
  window.DMYK_MRT_ARTWORK={station,transit,shapes};
})();
