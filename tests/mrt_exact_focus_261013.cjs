/* Node-only MRT route semantic regression (no packages, no map server).
 * Run at repo root: node tests/mrt_exact_focus_261013.cjs
 * Browser SVG pixel QA remains a separate task.
 */
'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const source=name=>fs.readFileSync(path.join(root,name),'utf8');
const window={DMYK_MRT_VISUAL_261013:{apply(){},prepare(){}}};
vm.runInNewContext(source('data/mrt_stations.js'),{window});
vm.runInNewContext(source('data/mrt_exact_261013.js'),{window});
const xref=window.DMYK_MRT_VISUAL_261013.exactBadgeMap;
const lines=window.DMYK_MRT_DATA.lines;
const nodes=new Map(),edges=new Map(),nameGroups=new Map();
const id=(line,code)=>line+':'+code;
const connect=(a,b,cost)=>{
  assert(edges.has(a)&&edges.has(b),'Missing graph endpoint '+a+' '+b);
  edges.get(a).push({id:b,cost});
  edges.get(b).push({id:a,cost});
};
for(const [line,list] of Object.entries(lines))for(const station of list){
  const node={...station,line,id:id(line,station.code)};
  nodes.set(node.id,node);
  edges.set(node.id,[]);
  if(!nameGroups.has(node.zh))nameGroups.set(node.zh,[]);
  nameGroups.get(node.zh).push(node);
}
for(const [line,list] of Object.entries(lines)){
  let trunk=list;
  if(line==='R')trunk=list.filter(n=>n.code!=='R22A');
  if(line==='G')trunk=list.filter(n=>n.code!=='G03A');
  if(line==='O')trunk=list.filter(n=>Number(n.code.slice(1))<=21);
  for(let i=1;i<trunk.length;i++)connect(id(line,trunk[i-1].code),id(line,trunk[i].code),1);
  if(line==='R')connect('R:R22','R:R22A',1);
  if(line==='G')connect('G:G03','G:G03A',1);
  if(line==='O'){
    const tail=['O12',...list.filter(n=>Number(n.code.slice(1))>=50).map(n=>n.code)];
    for(let i=1;i<tail.length;i++)connect(id('O',tail[i-1]),id('O',tail[i]),1);
  }
}
for(const group of nameGroups.values())for(let i=0;i<group.length;i++)
for(let j=i+1;j<group.length;j++)if(group[i].line!==group[j].line)
  connect(group[i].id,group[j].id,3.25);
const destination=new Set(['R:R07','O:O06']);
function route(start){
  const distance=new Map([[start,0]]),parent=new Map(),queue=[[start,0]];
  let end=null;
  while(queue.length){
    queue.sort((a,b)=>a[1]-b[1]);
    const [at,d]=queue.shift();
    if(d!==distance.get(at))continue;
    if(destination.has(at)){end=at;break;}
    for(const next of edges.get(at)||[]){
      const candidate=d+next.cost;
      if(candidate<(distance.get(next.id)??Infinity)-1e-9){
        distance.set(next.id,candidate);
        parent.set(next.id,at);
        queue.push([next.id,candidate]);
      }
    }
  }
  assert(end,'Destination not reachable from '+start);
  const result=[];
  for(let at=end;at;at=parent.get(at)){
    result.unshift(nodes.get(at));
    if(at===start)break;
  }
  return result;
}
assert.equal(nodes.size,135);
assert.equal(Object.keys(xref).length,135);
for(const station of nodes.values())assert(xref[station.code],'Unmapped station '+station.code);
assert.equal(xref.R07.index,235);
assert.equal(xref.O06.index,235);
assert.equal(xref.R06.index,146);
const summary=[];
for(const sourceId of nodes.keys()){
  const journey=route(sourceId);
  for(const stop of journey)assert(xref[stop.code],'Route references unmapped '+stop.code);
  const transfers=journey.reduce((sum,n,i)=>sum+(i&&journey[i-1].line!==n.line?1:0),0);
  const stops=journey.length-1-transfers;
  if(['BL:BL03','BL:BL09','G:G04','BR:BR04'].includes(sourceId))
    summary.push({from:sourceId,transfers,stops});
}
const expected=new Map([['BL:BL03',[1,12]],['BL:BL09',[1,6]],['G:G04',[1,6]],['BR:BR04',[1,7]]]);
for(const {from,transfers,stops} of summary){
  const [t,n]=expected.get(from);
  assert.equal(transfers,t,from+' transfers');
  assert.equal(stops,n,from+' stops');
}
console.log('PASS 135 station codes and all origin-to-Dongmen routes');
for(const x of summary)console.log(x.from+' '+x.transfers+' transfer(s), '+x.stops+' stop(s)');
