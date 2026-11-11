import * as THREE from 'three';

const inventory = {
  helmet: {
    title: 'HELMETS', sub: 'SELECT A HELMET', items: [
      {id:'sa25',name:'SA-25 STEEL TROOPER',type:'STANDARD ISSUE',desc:'Standard issue helmet with reinforced faceplate and sealed life-support system.',tag:'MEDIUM ARMOR',rating:'150',passive:'REINFORCED',style:0},
      {id:'dp40',name:'DP-40 HERO OF THE FEDERATION',type:'VETERAN HELMET',desc:'A battle-hardened profile with a broad face shield and twin comms modules.',tag:'MEDIUM ARMOR',rating:'150',passive:'REINFORCED',style:1},
      {id:'sc37',name:'SC-37 LEGIONNAIRE',type:'EXPEDITIONARY',desc:'Streamlined reconnaissance shell, built for long-range operations in hostile territory.',tag:'LIGHT ARMOR',rating:'100',passive:'SCOUT',style:2},
      {id:'b24',name:'B-24 ENFORCER',type:'BREACHER HELMET',desc:'Heavy brow plating and high-impact cheek guards for getting up close.',tag:'HEAVY ARMOR',rating:'200',passive:'FORTIFIED',style:3},
      {id:'fs38',name:'FS-38 ERADICATOR',type:'COMBAT HELMET',desc:'Aggressive angular shell with a reinforced central crest and sealed optics.',tag:'MEDIUM ARMOR',rating:'150',passive:'FORTIFIED',style:4},
      {id:'tw12',name:'TW-12 BUTCHER',type:'FIELD MODIFIED',desc:'A rugged field modification with a wide, protective visor and toughened shell.',tag:'HEAVY ARMOR',rating:'200',passive:'DEMO EXPERT',style:5}
    ]
  },
  armor: {
    title:'BODY ARMOR', sub:'SELECT YOUR ARMOR', items:[
      {id:'sa25',name:'SA-25 STEEL TROOPER',type:'MEDIUM / STANDARD ISSUE',desc:'A balanced all-purpose kit for Helldivers who keep the front line moving.',tag:'MEDIUM ARMOR',rating:'150',passive:'REINFORCED'},
      {id:'b24',name:'B-24 ENFORCER',type:'HEAVY / FORTIFIED',desc:'Reinforced plating and a fortified stance. Take the hit, keep advancing.',tag:'HEAVY ARMOR',rating:'200',passive:'FORTIFIED'},
      {id:'sc37',name:'SC-37 LEGIONNAIRE',type:'LIGHT / EXPEDITIONARY',desc:'Lightweight articulated plating maximizes mobility and tactical awareness.',tag:'LIGHT ARMOR',rating:'100',passive:'SCOUT'},
      {id:'fs38',name:'FS-38 ERADICATOR',type:'MEDIUM / COMBAT',desc:'A heavy-duty chest rig with reinforced joints and extra ammunition webbing.',tag:'MEDIUM ARMOR',rating:'150',passive:'FORTIFIED'},
      {id:'dp40',name:'DP-40 HERO OF THE FEDERATION',type:'MEDIUM / VETERAN',desc:'Ceremonial touches meet field-ready protection. A symbol of liberty.',tag:'MEDIUM ARMOR',rating:'150',passive:'DEMO EXPERT'},
      {id:'tw12',name:'TW-12 BUTCHER',type:'HEAVY / FIELD MODIFIED',desc:'Overbuilt plate carrier and heavy shoulder guards for the toughest deployments.',tag:'HEAVY ARMOR',rating:'200',passive:'REINFORCED'}
    ]
  },
  cape: {
    title:'CAPE',sub:'SELECT YOUR CAPE',items:[
      {id:'cape1',name:'CAPE OF THE FREE',type:'STANDARD ISSUE',desc:'A proud, clean drape in the colors of Super Earth. Let freedom billow.',tag:'STANDARD ISSUE',rating:'150',passive:'LIBERTY'},
      {id:'cape2',name:'EAGLE’S FURY',type:'VETERAN CAPE',desc:'A weathered cape, marked by the dust of a hundred victorious drops.',tag:'VETERAN ISSUE',rating:'150',passive:'VALOR'},
      {id:'cape3',name:'TRUTH ENFORCER',type:'SPECIAL ISSUE',desc:'Dark field cloth with a bright insignia. The truth is an unstoppable force.',tag:'SPECIAL ISSUE',rating:'150',passive:'JUSTICE'},
      {id:'cape4',name:'FREEDOM’S TIDINGS',type:'CEREMONIAL',desc:'A gold-stitched standard for those who carry democracy to the stars.',tag:'CEREMONIAL',rating:'150',passive:'PATRIOT'},
      {id:'cape5',name:'THE FALLEN HERO',type:'MEMORIAL',desc:'A somber, battle-scarred tribute to those who gave everything for liberty.',tag:'MEMORIAL',rating:'150',passive:'SACRIFICE'},
      {id:'cape6',name:'REINFORCEMENT',type:'FIELD ISSUE',desc:'A rugged, reinforced cloak fit for another drop into the fray.',tag:'FIELD ISSUE',rating:'150',passive:'RESILIENCE'}
    ]
  },
  palette: {
    title:'COLORWAYS',sub:'SELECT A COLORWAY',items:[
      {id:'olive',name:'STANDARD ISSUE',type:'OLIVE / BLACK',desc:'The classic Super Earth palette: field olive, black composite and warm steel.',tag:'FIELD STANDARD',rating:'150',passive:'OLIVE DRAB'},
      {id:'arctic',name:'ARCTIC PATRIOT',type:'FROST / GRAPHITE',desc:'Pale winter finish with crisp dark accents. Ready for cold-weather operations.',tag:'WINTER CAMO',rating:'150',passive:'ARCTIC WHITE'},
      {id:'desert',name:'DUST DEVIL',type:'SAND / UMBER',desc:'Muted desert tan with dark earth accents for arid-world deployments.',tag:'DESERT CAMO',rating:'150',passive:'SANDSTONE'},
      {id:'navy',name:'DEEP SPACE',type:'NAVY / GOLD',desc:'Midnight blue armor trimmed in brass. A distinguished orbital finish.',tag:'FLEET ISSUE',rating:'150',passive:'MIDNIGHT'},
      {id:'crimson',name:'HELLFIRE',type:'CRIMSON / IRON',desc:'A bold crimson finish that makes every drop unmistakable.',tag:'ASSAULT FINISH',rating:'150',passive:'CRIMSON'},
      {id:'steel',name:'URBAN GHOST',type:'STEEL / CHARCOAL',desc:'A low-profile monochrome finish for the urban combat specialist.',tag:'URBAN CAMO',rating:'150',passive:'GUNMETAL'}
    ]
  }
};
const palettes={olive:{main:'#66745c',light:'#94a17f',dark:'#29332e',accent:'#c9b553',cloth:'#323b33'},arctic:{main:'#b4b8aa',light:'#e0dfd1',dark:'#343b3c',accent:'#d0b852',cloth:'#454b4d'},desert:{main:'#a38f68',light:'#c3ae80',dark:'#484239',accent:'#d6ba62',cloth:'#554c3d'},navy:{main:'#3d5360',light:'#718794',dark:'#202a32',accent:'#c8ae59',cloth:'#26343a'},crimson:{main:'#864d45',light:'#b77462',dark:'#332c2b',accent:'#d2b752',cloth:'#423331'},steel:{main:'#777f7c',light:'#aeb5ad',dark:'#303638',accent:'#c6b65f',cloth:'#383e40'}};
const equipped={helmet:'sa25',armor:'sa25',cape:'cape1',palette:'olive'};
const preview={...equipped};
let activeTab='helmet', selectedId='sa25', toastTimer;
const sceneEl=document.querySelector('#scene');
const scene=new THREE.Scene();scene.background=new THREE.Color('#17201f');scene.fog=new THREE.Fog('#17201f',10,24);
const camera=new THREE.PerspectiveCamera(33,1,.1,60);camera.position.set(0,2.4,8.9);camera.lookAt(0,2.05,0);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;sceneEl.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xc6d3c4,0x151b1c,2.0));
const key=new THREE.DirectionalLight(0xffedc9,3.3);key.position.set(-4,7,5);scene.add(key);
const rim=new THREE.DirectionalLight(0x9ab3ad,2.4);rim.position.set(4,4,-4);scene.add(rim);
const fill=new THREE.PointLight(0xe4c56f,38,12);fill.position.set(-2,3,4);scene.add(fill);
const floor=new THREE.Mesh(new THREE.CircleGeometry(5,64),new THREE.MeshBasicMaterial({color:0x27302c,transparent:true,opacity:.38}));floor.rotation.x=-Math.PI/2;floor.position.y=-.03;scene.add(floor);
const ring=new THREE.Mesh(new THREE.RingGeometry(1.16,1.175,96),new THREE.MeshBasicMaterial({color:0x9c9b69,transparent:true,opacity:.35,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.006;scene.add(ring);
const grid=new THREE.GridHelper(12,24,0x66715c,0x38423e);grid.position.y=-.015;grid.material.transparent=true;grid.material.opacity=.16;scene.add(grid);
const figure=new THREE.Group();scene.add(figure);
let dragging=false,lastX=0,baseRotation=.16,autoRotate=false,zoom=8.9;
const material=(color,rough=.58,metal=.26)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
function mesh(parent,geo,mat,pos,scale,rot){const m=new THREE.Mesh(geo,mat);if(pos)m.position.set(...pos);if(scale)m.scale.set(...scale);if(rot)m.rotation.set(...rot);parent.add(m);return m;}
function box(parent,mat,pos,size,rot=[0,0,0]){return mesh(parent,new THREE.BoxGeometry(...size),mat,pos,[1,1,1],rot)}
function sphere(parent,mat,pos,scale,seg=24){return mesh(parent,new THREE.SphereGeometry(1,seg,16),mat,pos,scale)}
function cylinder(parent,mat,pos,rt,rb,h,rad=12,rot=[0,0,0]){return mesh(parent,new THREE.CylinderGeometry(rt,rb,h,rad),mat,pos,[1,1,1],rot)}
function createCape(mat,accent,id){const g=new THREE.Group();const verts=[],uv=[],idx=[],rows=12,cols=10;for(let r=0;r<=rows;r++){let t=r/rows;for(let c=0;c<=cols;c++){let u=c/cols;let w=(.4+Math.sin(t*Math.PI)*.21)*(u-.5);let y=3.12-t*2.35;let z=-.21-t*.2+Math.sin(t*5+u*3)*.035+Math.abs(u-.5)*.11;verts.push(w*2.4,y,z);uv.push(u,t)}}for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){let a=r*(cols+1)+c,b=a+cols+1;idx.push(a,b,a+1,b,b+1,a+1)}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();let clothmat=new THREE.MeshStandardMaterial({color:mat,roughness:.92,side:THREE.DoubleSide});const cloak=new THREE.Mesh(geo,clothmat);g.add(cloak);const emblem=mesh(g,new THREE.CircleGeometry(.17,5),material(accent,.55,.3),[0,2.63,-.185],[1,1,1],[0,0,Math.PI]);if(id==='cape2'||id==='cape5'){const sc=cloak.material.color;sc.multiplyScalar(.72)}return g;}
function buildModel(){while(figure.children.length)figure.remove(figure.children[0]);const colors=palettes[preview.palette];const main=material(colors.main),light=material(colors.light,.5,.38),dark=material(colors.dark,.48,.42),gold=material(colors.accent,.38,.65),visor=new THREE.MeshStandardMaterial({color:0x11191b,metalness:.78,roughness:.17}),rubber=material('#1a2020',.91,.05),cloth=material(colors.cloth,.96,.04);const armor=inventory.armor.items.find(x=>x.id===preview.armor);const heavy=armor?.rating==='200',lightArmor=armor?.rating==='100';
 const body=new THREE.Group();figure.add(body);
 // boots and armored greaves
 for(const s of [-1,1]){const x=s*.34;const boot=sphere(body,rubber,[x,.17,.08],[.23,.18,.37]);boot.rotation.x=.1; cylinder(body,main,[x,.47,0],.17,.23,.49,10,[0,0,s*.035]);sphere(body,light,[x,.67,.015],[.22,.27,.25]);box(body,dark,[x,.48,.19],[.24,.12,.08],[0,0,s*.04]);box(body,gold,[x,.38,.19],[.08,.035,.025]);cylinder(body,rubber,[x,.91,0],.15,.18,.16,10,[0,0,s*.03]);
   // thighs
   sphere(body,main,[x,1.19,0],[.25,.36,.25]);sphere(body,light,[x,1.22,.205],[.20,.27,.08]);box(body,dark,[x,1.03,.22],[.17,.07,.07]);
   // shoulder and upper/lower arms
   sphere(body,main,[s*.68,2.88,0],[heavy?.34:.29,.29,.31]);sphere(body,light,[s*.68,2.9,.18],[heavy?.3:.25,.21,.17]);sphere(body,dark,[s*.69,2.57,.01],[.19,.25,.19]);cylinder(body,main,[s*.72,2.23,.01],.16,.19,.48,10,[0,0,s*.11]);sphere(body,light,[s*.72,2.23,.16],[.14,.2,.08]);sphere(body,dark,[s*.74,1.91,.04],[.15,.18,.15]);cylinder(body,main,[s*.75,1.61,.01],.12,.15,.4,10,[0,0,s*.06]);sphere(body,rubber,[s*.75,1.35,.04],[.13,.14,.12]);
 }
 // pelvis and torso
 cylinder(body,dark,[0,1.65,0],.31,.37,.31,8);box(body,main,[0,1.72,.17],[.53,.2,.3]);
 cylinder(body,main,[0,2.3,0],.54,.34,1.05,8);sphere(body,dark,[0,2.87,0],[.28,.22,.27]);
 // chest plate + chest accents
 sphere(body,light,[0,2.48,.29],[.46,.42,.18]);box(body,dark,[0,2.56,.425],[.21,.25,.08]);box(body,gold,[0,2.72,.467],[.16,.045,.02]);
 for(let s of [-1,1]){const p=s*.26;box(body,dark,[p,2.39,.42],[.12,.22,.07],[0,0,-s*.2]);box(body,light,[p,2.17,.34],[.17,.12,.11],[0,0,-s*.1]);cylinder(body,dark,[p,2.12,.4],.045,.045,.045,10,[Math.PI/2,0,0]);}
 // collar, harness and back pack
 cylinder(body,dark,[0,2.95,0],.25,.28,.2,12);box(body,dark,[0,2.5,-.31],[.46,.63,.24]);box(body,light,[0,2.52,-.45],[.33,.4,.07]);for(let s of [-1,1]){box(body,gold,[s*.15,2.7,.32],[.04,.34,.035],[0,0,-s*.3]);box(body,dark,[s*.36,2.35,.04],[.18,.25,.18]);box(body,light,[s*.36,2.36,.15],[.12,.08,.04]);}
 // Utility belt, pouches, thigh side kits
 box(body,dark,[0,1.91,.04],[.65,.16,.4]);for(let s of [-1,1]){box(body,light,[s*.2,1.91,.25],[.13,.17,.1]);box(body,gold,[s*.2,1.92,.31],[.045,.1,.02]);box(body,dark,[s*.48,1.53,.04],[.13,.29,.2]);box(body,light,[s*.48,1.56,.15],[.12,.12,.06]);}
 if(heavy){for(let s of [-1,1]){sphere(body,light,[s*.68,2.92,.18],[.34,.3,.2]);sphere(body,dark,[s*.36,1.18,.08],[.29,.34,.27]);}}
 if(lightArmor){for(let s of [-1,1]){sphere(body,main,[s*.67,2.88,.03],[.24,.22,.24]);}}
 // helmet styles
 const style=inventory.helmet.items.find(x=>x.id===preview.helmet)?.style??0;const head=new THREE.Group();head.position.set(0,3.28,.01);body.add(head);
 sphere(head,dark,[0,0,0],[.39,.39,.35]);sphere(head,main,[0,.035,.02],[.4,.36,.35]);
 const visorScale=style===2?[.3,.16,.1]:style===3?[.33,.14,.12]:[.34,.19,.1];sphere(head,visor,[0,-.045,.32],visorScale);
 box(head,light,[0,.13,.337],[style===1?.7:.57,.06,.05],[0,0,0]);
 sphere(head,light,[0,.245,.02],[.22,.12,.28]);
 if(style===1||style===4){box(head,gold,[0,.34,.02],[.075,.2,.12]);}
 if(style===2){sphere(head,dark,[0,.34,-.03],[.2,.12,.26]);box(head,light,[0,-.22,.23],[.5,.1,.15]);}
 if(style===3||style===5){sphere(head,light,[0,-.14,.14],[.42,.19,.24]);box(head,dark,[0,-.19,.32],[.28,.04,.04]);}
 for(let s of [-1,1]){sphere(head,dark,[s*.39,-.02,0],[.12,.19,.18]);sphere(head,gold,[s*.46,-.02,.04],[.035,.035,.04]);cylinder(head,light,[s*.35,.05,.05],.07,.08,.12,8,[0,0,Math.PI/2]);}
 // helmet seal at base
 cylinder(head,rubber,[0,-.28,0],.3,.33,.13,12);
 if(preview.cape!=='none'){const capeColors={cape1:colors.cloth,cape2:'#554b3b',cape3:'#292f30',cape4:'#515039',cape5:'#383332',cape6:'#3a413a'};const cg=createCape(capeColors[preview.cape]||colors.cloth,colors.accent,preview.cape);body.add(cg);}
 // subtle worn metallic rivets and chest bolts
 for(let s of [-1,1]){sphere(body,gold,[s*.39,2.56,.36],[.025,.025,.02],10);sphere(body,gold,[s*.28,2.13,.39],[.018,.018,.018],8);}
 figure.rotation.y=baseRotation;figure.scale.setScalar(1);
}
buildModel();
function resize(){const r=sceneEl.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(sceneEl);resize();
function animate(){requestAnimationFrame(animate);if(autoRotate&&!dragging)baseRotation+=.003;figure.rotation.y=baseRotation;renderer.render(scene,camera)}animate();

const $=s=>document.querySelector(s), itemGrid=$('#itemGrid');
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function thumb(kind,id){const c=palettes[preview.palette]||palettes.olive;const main=kind==='palette'?palettes[id].main:c.main;const dark=kind==='palette'?palettes[id].dark:c.dark;const gold=kind==='palette'?palettes[id].accent:c.accent;let drawing='';if(kind==='helmet'){drawing=`<path d="M22 37 Q22 14 40 12 Q61 12 63 36 L58 42 H27Z" fill="${main}" stroke="${gold}" stroke-width="2"/><path d="M28 31 Q42 25 58 31 L57 38 Q42 42 27 38Z" fill="#131a1b" stroke="#9ca497"/><path d="M32 17 Q42 9 53 18" fill="none" stroke="${gold}" stroke-width="2"/><circle cx="25" cy="30" r="4" fill="${dark}"/><circle cx="60" cy="30" r="4" fill="${dark}"/>`;}else if(kind==='armor'){drawing=`<path d="M27 16 L34 11 H50 L58 17 L64 25 L58 31 L56 49 L63 57 L58 61 H26 L20 57 L26 48 L24 31 L17 25 L23 17Z" fill="${main}" stroke="${gold}" stroke-width="1.7"/><path d="M31 19 L40 16 L51 20 L55 34 L40 39 L26 34Z" fill="${dark}" stroke="#8d9985"/><path d="M40 23V32 M35 27H45" stroke="${gold}" stroke-width="2"/><path d="M29 40L28 53 M51 40L52 53" stroke="#acb29e" stroke-width="3"/>`;}else if(kind==='cape'){drawing=`<path d="M30 13 L35 17 H48 L53 13 L56 20 L62 54 Q41 61 20 54 L27 20Z" fill="${id==='cape1'?c.cloth:id==='cape2'?'#665b48':id==='cape3'?'#2a3031':id==='cape4'?'#5c5941':id==='cape5'?'#3c3433':'#41483f'}" stroke="${gold}" stroke-width="1.5"/><path d="M35 17L31 49 M48 17L53 49" stroke="#a9a487" opacity=".55"/><path d="M40 31L43 27L47 31L43 36Z" fill="${gold}"/>`;}else{drawing=`<path d="M24 39 Q24 17 42 14 Q60 17 60 39 L54 45 H30Z" fill="${main}" stroke="${gold}" stroke-width="2"/><path d="M29 34 Q43 29 56 34 L54 40 H30Z" fill="#141a1a"/><path d="M28 48L24 55L30 58L36 51 M55 48L60 55L54 58L49 51" fill="${main}" stroke="${gold}"/>`;}
return `<svg viewBox="0 0 84 68" aria-hidden="true">${drawing}</svg>`}
function renderInventory(){const data=inventory[activeTab];$('#sectionTitle').innerHTML=`${data.title} <span>${String(data.items.length).padStart(2,'0')}</span>`;$('#inventorySub').textContent=data.sub;$('#unlockedCount').textContent=String(data.items.length).padStart(2,'0');itemGrid.innerHTML=data.items.map(it=>`<button class="item-card ${selectedId===it.id?'selected':''}" data-id="${it.id}" aria-label="${escapeHTML(it.name)}"> <span class="item-art">${thumb(activeTab,it.id)}</span><span class="item-name">${escapeHTML(it.name)}</span><span class="item-type">${escapeHTML(it.type)}</span></button>`).join('');itemGrid.querySelectorAll('.item-card').forEach(card=>card.addEventListener('click',()=>selectItem(card.dataset.id)));const selected=data.items.find(x=>x.id===selectedId)||data.items[0];$('#detailName').textContent=selected.name;$('#detailDesc').textContent=selected.desc;$('#detailTag').textContent=selected.tag;$('#armorRating').textContent=selected.rating;$('#armorPassive').textContent=selected.passive;$('#equippedLabel').textContent=inventory.armor.items.find(x=>x.id===equipped.armor)?.name||'SA-25 STEEL TROOPER';const isEquipped=selectedId===equipped[activeTab];$('#equipBtn').innerHTML=isEquipped?'EQUIPPED <span>✓</span>':'EQUIP ITEM <span>＋</span>';$('#equipBtn').classList.toggle('is-equipped',isEquipped);document.querySelectorAll('.category').forEach(b=>b.classList.toggle('active',b.dataset.tab===activeTab));}
function selectItem(id){selectedId=id;preview[activeTab]=id;buildModel();renderInventory();}
document.querySelectorAll('.category').forEach(b=>b.addEventListener('click',()=>{activeTab=b.dataset.tab;selectedId=preview[activeTab];renderInventory()}));
$('#equipBtn').addEventListener('click',()=>{equipped[activeTab]=selectedId;preview[activeTab]=selectedId;renderInventory();showToast(`${inventory[activeTab].items.find(x=>x.id===selectedId)?.name||'COLORWAY'} EQUIPPED`)});
$('#randomBtn').addEventListener('click',()=>{for(const key of Object.keys(inventory)){const list=inventory[key].items;preview[key]=list[Math.floor(Math.random()*list.length)].id;}activeTab=['helmet','armor','cape','palette'][Math.floor(Math.random()*4)];selectedId=preview[activeTab];buildModel();renderInventory();showToast('NEW LOADOUT CONFIGURED')});
function showToast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),1900)}
$('#rotateBtn').addEventListener('click',()=>{autoRotate=!autoRotate;showToast(autoRotate?'AUTO ROTATE ON':'AUTO ROTATE OFF')});$('#zoomBtn').addEventListener('click',()=>{zoom=8.9;camera.position.set(0,2.4,zoom);camera.lookAt(0,2.05,0);baseRotation=.16;showToast('VIEW RESET')});
renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;renderer.domElement.setPointerCapture(e.pointerId)});renderer.domElement.addEventListener('pointermove',e=>{if(dragging){baseRotation+=(e.clientX-lastX)*.009;lastX=e.clientX}});renderer.domElement.addEventListener('pointerup',()=>dragging=false);renderer.domElement.addEventListener('pointercancel',()=>dragging=false);renderer.domElement.addEventListener('wheel',e=>{zoom=THREE.MathUtils.clamp(zoom+e.deltaY*.006,6.8,11);camera.position.z=zoom;camera.lookAt(0,2.05,0)},{passive:true});
$('.back-button').addEventListener('click',()=>showToast('RETURN TO SHIP'));$('.icon-button').addEventListener('click',()=>showToast('ARMORY SETTINGS'));
renderInventory();
