
(async()=>{
if(window.top!==window.self){try{window.top.location=window.self.location}catch(_){document.body.textContent=''}return}
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const baht=n=>Number(n).toLocaleString('th-TH');
let D;try{D=await fetch('data.json',{cache:'no-cache'}).then(r=>r.json())}catch(_){document.body.insertAdjacentHTML('afterbegin','<p style="padding:20px">โหลดข้อมูลไม่สำเร็จ ลองรีเฟรช</p>');return}
let EB=null,EDIT=false,resetArm=0,F={b:'',c:'',q:''},cart={},T='p',E=null,dirty=false,delId='';
const tel=()=>'tel:'+String(D.shop.phone).replace(/[^\d+]/g,'');
function bind(){const s=D.shop;
 $$('[data-t]').forEach(e=>e.textContent=s[e.dataset.t]||'');
 $$('[data-tel]').forEach(a=>a.href=tel());
 $$('[data-line]').forEach(a=>a.href='https://line.me/R/ti/p/'+encodeURI(s.line));
 const nt=$('#notice');nt.hidden=!s.notice;nt.style.background={red:'#c62828',green:'#1b8a4b',amber:'#b26a00'}[s.noticeC]||'';if(s.notice&&/^(https?:|tel:)/i.test(s.noticeUrl||''))nt.innerHTML=`<a href="${esc(s.noticeUrl)}" target="_blank" rel="noopener noreferrer" style="color:inherit">${esc(s.notice)}</a>`;$('#hoursBox').hidden=!s.hours;
 $('#map').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('คอนแทคตาพระยา '+s.addr);}
const card=p=>`<article class="pk"><div class="top">${p.img?`<img src="${p.img}" alt="${esc(p.name)}" loading="lazy">`:`<div class="n">${esc(p.tag||p.brand)}</div>`}<span class="br">${esc(p.brand)}</span></div><h3 class="f">${esc(p.name)}</h3><div class="sub">${esc(p.cat)}</div>${p.old?`<div class="old">${baht(p.old)} บาท</div>`:''}<div class="price">${p.price?baht(p.price)+' <small>บาท</small>':'<small>สอบถามราคา</small>'}</div><div class="spec">${(p.specs||'').split(',').filter(x=>x.trim()).map(x=>`<span>${esc(x.trim())}</span>`).join('')}</div><ul>${(p.desc||'').split('\n').filter(x=>x.trim()).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${p.stock?`<button class="btn f" data-add="${esc(p.id)}">${cart[p.id]?'เลือกแล้ว (กดเพื่อเอาออก)':'เพิ่มในใบเสนอราคา'}</button>`:'<button class="btn" disabled>สินค้าหมด</button>'}</article>`;
function svMsg(){const m='สนใจปรึกษาบริการ: '+$('#svSel').value+'\nรายละเอียด/งบประมาณ: '+($('#svTxt').value||'-');$('#svLine').href='https://line.me/R/oaMessage/'+encodeURI(D.shop.line)+'/?'+encodeURIComponent(m);return m}
function svc(){const L=D.services||[],v=$('#svSel').value;$('#svGrid').innerHTML=L.map(s=>`<div><h3 class="f">${esc(s.n)}</h3><p>${esc(s.d)}</p></div>`).join('');$('#svSel').innerHTML=L.map(s=>`<option>${esc(s.n)}</option>`).join('');if(v)$('#svSel').value=v;svMsg()}
const SEC=[['svcs','บริการของร้าน'],['promo','สินค้าและโปรโมชั่น'],['gallery','ผลงานติดตั้ง'],['it','บริการด้านไอที'],['rev','รีวิวลูกค้า'],['faq','คำถามที่พบบ่อย'],['poster','โปสเตอร์'],['blkA','ส่วนเพิ่มเติม (บน)'],['blkB','ส่วนเพิ่มเติม (ล่าง)'],['contact','ติดต่อร้าน']];
const okU=u=>/^(https?:|tel:|mailto:)/i.test(u||'');
function blocks(){['A','B'].forEach(k=>{$('#blk'+k).innerHTML=(D.blocks||[]).filter(b=>(b.a||'A')===k).map(b=>`<div class="wrap">${b.t?`<h2>${esc(b.t)}</h2>`:''}${b.img?`<img src="${b.img}" alt="${esc(b.t)}" style="max-width:100%;border-radius:12px;margin-bottom:12px">`:''}${(b.x||'').split('\n').filter(s=>s.trim()).map(s=>`<p>${esc(s)}</p>`).join('')}${b.bl&&okU(b.bu)?`<a class="btn f" target="_blank" rel="noopener noreferrer" href="${esc(b.bu)}">${esc(b.bl)}</a>`:''}</div>`).join('')})}
function vis(){const H=D.hide||{},B=D.blocks||[],base={gallery:!(D.gallery||[]).length,rev:!(D.reviews||[]).length,faq:!(D.faq||[]).length,blkA:!B.some(b=>(b.a||'A')==='A'),blkB:!B.some(b=>b.a==='B')};SEC.forEach(([k])=>{const e=$('#'+k);if(e)e.hidden=!!(H[k]||base[k])})}
function popup(){const p=D.popup;if(!p||!p.on||!(p.title||p.text||p.img))return;const k='pp'+(p.title||'').length+(p.text||'').length+(p.img||'').length;try{if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,1)}catch(_){}
 $('#pp').innerHTML=`<div class="dh f"><b>${esc(p.title||'ประกาศจากร้าน')}</b><button class="btn ghost" data-pp="1">ปิด</button></div><div class="dbody">${p.img?`<img src="${p.img}" alt="" style="max-width:100%;border-radius:10px;margin-bottom:10px">`:''}${(p.text||'').split('\n').filter(s=>s.trim()).map(s=>`<p>${esc(s)}</p>`).join('')}</div>`;$('#pp').showModal()}
const enc=new TextEncoder(),dec=new TextDecoder(),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const b64=b=>{let s='';const u=new Uint8Array(b);for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(s)};
const ub64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function kdf(pw,salt){const k=await crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:600000,hash:'SHA-256'},k,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
async function seal(pw,txt){const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),k=await kdf(pw,salt);return{s:b64(salt),i:b64(iv),c:b64(await crypto.subtle.encrypt({name:'AES-GCM',iv},k,enc.encode(txt)))}}
async function unseal(pw,v){const k=await kdf(pw,ub64(v.s));return dec.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:ub64(v.i)},k,ub64(v.c)))}
let TOK=null,CFG=null,idle=0,fails=0;const VK='ctp_vault',done={};
const getV=()=>{try{return JSON.parse(localStorage.getItem(VK))}catch(_){return null}};
function touch(){clearTimeout(idle);if(TOK)idle=setTimeout(logout,900000)}
function logout(){TOK=null;clearTimeout(idle);if(EDIT)editMode(false);['#adm','#lg'].forEach(s=>{const d=$(s);if(d&&d.open)d.close()});$('#admBtn').hidden=true}
const gh=(p,o={})=>fetch('https://api.github.com/repos/'+CFG.o+'/'+CFG.r+p,{...o,headers:{Authorization:'Bearer '+TOK,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(o.headers||{})}});
const guess=()=>{const h=location.hostname,p=location.pathname.split('/')[1]||'',g=h.endsWith('.github.io');return{o:g?h.split('.')[0]:'',r:g?(p||h):''}};
function lgUI(msg){const v=getV(),g=guess(),f=(id,l,t,val)=>`<label class="fld">${l}<input id="${id}" type="${t}" value="${esc(val||'')}" autocomplete="off"></label>`;
 $('#lg').innerHTML=`<div class="dh f"><b>เข้าสู่ระบบแอดมิน</b><button class="btn ghost" data-lg="x">ปิด</button></div><div class="dbody">${v?f('lg-p','รหัสผ่านแอดมิน','password')+`<p class="note"><button class="chip" data-lg="reset">ลืมรหัส / ตั้งค่าใหม่</button></p>`:`<p class="note">ตั้งค่าครั้งแรก: ข้อมูลถูกเข้ารหัสและเก็บในเครื่องนี้เท่านั้น ไม่ถูกอัปโหลดขึ้นเว็บ</p>${f('lg-o','ชื่อผู้ใช้ GitHub','text',g.o)}${f('lg-r','ชื่อ repository','text',g.r)}${f('lg-b','branch','text','main')}${f('lg-t','GitHub token (Fine-grained)','password')}${f('lg-p','ตั้งรหัสผ่านแอดมิน (12 ตัวอักษรขึ้นไป)','password')}${f('lg-p2','ยืนยันรหัสผ่าน','password')}`}<p id="lg-m" class="note">${esc(msg||'')}</p></div><div class="df"><span></span><button class="btn f" data-lg="go">${v?'เข้าสู่ระบบ':'ตั้งค่าและเข้าสู่ระบบ'}</button></div>`}
function login(){if(TOK){touch();admUI();$('#adm').showModal();return}lgUI();if(!$('#lg').open)$('#lg').showModal()}
async function lgGo(){const m=s=>{$('#lg-m').textContent=s},v=getV(),btn=$('#lg [data-lg=go]');btn.disabled=true;
 try{if(v){if(fails)await sleep(Math.min(2**fails*500,20000));m('กำลังตรวจสอบ...');
   try{TOK=await unseal($('#lg-p').value,v);CFG={o:v.o,r:v.r,b:v.b};fails=0}catch(_){fails++;TOK=null;return m('รหัสผ่านไม่ถูกต้อง')}}
  else{const o=$('#lg-o').value.trim(),r=$('#lg-r').value.trim(),b=$('#lg-b').value.trim()||'main',t=$('#lg-t').value.trim(),p=$('#lg-p').value,p2=$('#lg-p2').value;
   if(!/^[\w.-]+$/.test(o)||!/^[\w.-]+$/.test(r)||!/^[\w./-]+$/.test(b))return m('ตรวจชื่อผู้ใช้ / repo / branch อีกครั้ง');
   if(!t)return m('ใส่ GitHub token');if(p.length<12)return m('รหัสผ่านต้องยาวอย่างน้อย 12 ตัวอักษร');if(p!==p2)return m('รหัสผ่านไม่ตรงกัน');
   m('กำลังตรวจ token...');TOK=t;CFG={o,r,b};const x=await gh('');if(!x.ok){TOK=null;return m('token ใช้ไม่ได้กับ repo นี้ (ตรวจชื่อ repo และสิทธิ์)')}
   const j=await x.json();if(j.permissions&&!j.permissions.push){TOK=null;return m('token ไม่มีสิทธิ์เขียน (ต้องเลือก Contents: Read and write)')}
   m('กำลังเข้ารหัส...');try{localStorage.setItem(VK,JSON.stringify({o,r,b,...await seal(p,t)}))}catch(_){TOK=null;return m('เบราว์เซอร์ไม่อนุญาตให้เก็บข้อมูล (โหมดส่วนตัว?)')}}
  $('#lg').close();$('#admBtn').hidden=false;touch();admUI();$('#adm').showModal()
 }catch(e){TOK=null;m('เกิดข้อผิดพลาด: '+(e.message||'ลองใหม่'))}finally{btn.disabled=false}}
function lgAct(v){if(v==='x')$('#lg').close();else if(v==='go')lgGo();else if(v==='reset'){if(!resetArm){resetArm=1;$('#lg-m').textContent='กดอีกครั้งเพื่อยืนยัน: จะลบข้อมูลที่เก็บในเครื่องนี้ แล้วต้องใส่ token ใหม่';return}try{localStorage.removeItem(VK)}catch(_){}resetArm=0;lgUI('ลบแล้ว กรอกข้อมูลใหม่ได้เลย')}}
const EDS='[data-k],[data-t]';
function editMode(on){EDIT=on;document.body.classList.toggle('editing',on);$('#edbar').hidden=!on;$$(EDS).forEach(e=>{if(e.closest('[data-dyn],dialog,#notice,#fab,#edbar'))return;if(on)e.setAttribute('contenteditable','true');else e.removeAttribute('contenteditable')})}
function applyStatic(){const T=D.texts||{},I=D.imgs||{};$$('[data-k]').forEach(e=>{if(T[e.dataset.k]!=null)e.textContent=T[e.dataset.k]});$$('img[data-img]').forEach(e=>{if(I[e.dataset.img])e.src=I[e.dataset.img]});
 const S=[...$$('main > section.sec')],o=D.order||[],ord=[...o.map(id=>S.find(e=>e.id===id)).filter(Boolean),...S.filter(e=>!o.includes(e.id))];let ref=$('.hero');ord.forEach(e=>{ref.after(e);ref=e})}
function edAct(a){if(a==='save')save();else if(a==='panel'){admUI();$('#adm').showModal()}else if(a==='cancel'){try{location.reload()}catch(_){editMode(false)}}}
function pickImg(im){const f=document.createElement('input');f.type='file';f.accept='image/*';f.onchange=()=>rs(f.files[0],im.closest('.hero')?1600:900,.8,u=>{im.src=u;(D.imgs=D.imgs||{})[im.dataset.img]=u;dirty=true});f.click()}
function extra(){const G=D.gallery||[],R=D.reviews||[],Q=D.faq||[];
 $('#gallery').hidden=!G.length;$('#gal').innerHTML=G.map((g,i)=>`<button class="gt" data-g="${i}" aria-label="${esc(g.cap||'ดูรูปผลงาน')}"><img src="${g.img}" alt="${esc(g.cap)}" loading="lazy"></button>`).join('');
 $('#rev').hidden=!R.length;$('#revL').innerHTML=R.map(r=>`<div><p style="margin:0">“${esc(r.t)}”</p><small class="note">— ${esc(r.n)}</small></div>`).join('');
 $('#faq').hidden=!Q.length;$('#faqL').innerHTML=Q.map(q=>`<details><summary>${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`).join('');
 const lg=$('#logo');lg.hidden=!D.logo;if(D.logo)lg.src=D.logo;}
function lb(i){const g=D.gallery[i];$('#lb').innerHTML=`<div class="dh f"><b>${esc(g.cap||'ผลงานติดตั้ง')}</b><button class="btn ghost" data-lb="1">ปิด</button></div><div class="dbody" style="text-align:center"><img src="${g.img}" alt="${esc(g.cap)}" style="max-width:100%;max-height:70vh"></div>`;$('#lb').showModal()}
function render(){svc();extra();blocks();
 if(F.b&&!D.brands.includes(F.b))F.b='';
 $('#chips').innerHTML=['',...D.brands].map(b=>{const g=(D.logos||{})[b];return `<button class="chip bt${F.b===b?' on':''}" data-b="${esc(b)}" aria-label="${b?esc(b):'ทั้งหมด'}">${g?`<img src="${g}" alt="${esc(b)}">`:(b?esc(b):'ทั้งหมด')}</button>`}).join('');
 $('#cat').innerHTML='<option value="">ทุกหมวด</option>'+D.cats.map(c=>`<option${F.c===c?' selected':''}>${esc(c)}</option>`).join('');
 const l=D.products.filter(p=>(!F.b||p.brand===F.b)&&(!F.c||p.cat===F.c)&&(!F.q||[p.name,p.brand,p.cat,p.specs].join(' ').toLowerCase().includes(F.q)));
 $('#grid').innerHTML=l.map(card).join('')||`<div style="grid-column:1/-1"><p class="note">${F.b?'ยี่ห้อ '+esc(F.b)+' สอบถามรุ่นและราคาได้ที่ร้านเลย':'ไม่พบสินค้าที่ค้นหา'}</p>${F.b?`<a class="btn line f" target="_blank" rel="noopener noreferrer" href="https://line.me/R/oaMessage/${encodeURI(D.shop.line)}/?${encodeURIComponent('สนใจสินค้ายี่ห้อ '+F.b+' รบกวนแจ้งรุ่นและราคาด้วยครับ/ค่ะ')}">ถามเรื่อง ${esc(F.b)} ทางไลน์</a> <a class="btn ghost f" href="${tel()}">โทรถามร้าน</a>`:''}</div>`;
 const n=Object.values(cart).reduce((a,b)=>a+b,0),cb=$('#cartbar');cb.hidden=!n;cb.textContent='ใบเสนอราคา ('+n+' ชิ้น)';vis()}
const items=()=>Object.keys(cart).map(i=>({p:D.products.find(x=>x.id===i),q:cart[i]})).filter(x=>x.p);
function msg(){let t=0;const L=items().map(({p,q})=>{if(p.price)t+=p.price*q;return `- ${p.name} (${p.brand}) x${q}`+(p.price?` = ${baht(p.price*q)} บาท`:'')});
 return 'สนใจขอใบเสนอราคาจากเว็บไซต์ร้านคอนแทคตาพระยา\n'+L.join('\n')+(t?'\nรวมประมาณ '+baht(t)+' บาท':'')+'\nรบกวนแจ้งรายละเอียดและคิวติดตั้งด้วยครับ/ค่ะ';}
function cartUI(){const it=items(),m=msg(),t=it.reduce((a,{p,q})=>a+(p.price||0)*q,0);
 $('#cartd').innerHTML=`<div class="dh f"><b>ใบเสนอราคา</b><button class="btn ghost" data-c="close">ปิด</button></div><div class="dbody">${it.map(({p,q})=>`<div class="row"><div>${esc(p.name)}<br><small class="note">${p.price?baht(p.price)+' บาท':'สอบถามราคา'}</small></div><div><button class="chip" data-c="-${esc(p.id)}">−</button> ${q} <button class="chip" data-c="+${esc(p.id)}">+</button></div></div>`).join('')}${t?`<p class="f"><b>รวมประมาณ ${baht(t)} บาท</b></p>`:''}<textarea id="msg" rows="6" readonly>${esc(m)}</textarea></div><div class="df"><a class="btn line f" target="_blank" rel="noopener noreferrer" href="https://line.me/R/oaMessage/${encodeURI(D.shop.line)}/?${encodeURIComponent(m)}">ส่งทาง LINE</a><button class="btn ghost f" data-c="copy">คัดลอกข้อความ</button><a class="btn ghost f" href="${tel()}">โทร</a></div>`;}
function cartAct(v){const id=v.slice(1);
 if(v==='close')return $('#cartd').close();
 if(v==='copy'){const a=$('#msg');a.select();try{navigator.clipboard.writeText(a.value)}catch(_){try{document.execCommand('copy')}catch(_){}}return;}
 if(v[0]==='+')cart[id]++;else if(--cart[id]<=0)delete cart[id];
 if(!Object.keys(cart).length)$('#cartd').close();else cartUI();render();}
/* ---- admin ---- */
const fld=(l,k,v,t='text')=>`<label class="fld">${l}<input type="${t}" data-f="${k}" value="${esc(v)}"></label>`;
const opt=(a,v)=>(a.includes(v)||!v?a:[...a,v]).map(x=>`<option${x===v?' selected':''}>${esc(x)}</option>`).join('');
function pTab(){
 if(E)return `<h3 class="f">${E._new?'เพิ่มสินค้า':'แก้ไขสินค้า'}</h3>${fld('ชื่อสินค้า','name',E.name)}<div class="cols"><label class="fld">ยี่ห้อ<select data-f="brand">${opt(D.brands,E.brand)}</select></label><label class="fld">หมวด<select data-f="cat">${opt(D.cats,E.cat)}</select></label></div><div class="cols">${fld('ราคา (บาท)','price',E.price,'number')}${fld('ราคาเดิม (ขีดฆ่า)','old',E.old,'number')}</div>${fld('ป้ายตัวใหญ่แทนรูป (เช่น X4)','tag',E.tag)}${fld('สเปก (คั่นด้วยจุลภาค)','specs',E.specs)}<label class="fld">รายละเอียด (บรรทัดละข้อ)<textarea rows="4" data-f="desc">${esc(E.desc)}</textarea></label><label class="fld">รูปสินค้า<input type="file" accept="image/*" data-img></label>${E.img?`<img src="${E.img}" alt="" style="max-width:140px;border-radius:8px">`:''}<label class="fld"><input type="checkbox" data-f="stock" ${E.stock?'checked':''} style="width:auto"> มีสินค้า</label><div class="cols"><button class="btn f" data-x="ok">เก็บสินค้านี้</button><button class="btn ghost f" data-x="no">ยกเลิก</button></div>`;
 return `<button class="btn f" data-x="new">+ เพิ่มสินค้า</button>`+D.products.map(p=>`<div class="row"><div><b>${esc(p.name)}</b><br><small class="note">${esc(p.brand)} · ${esc(p.cat)} · ${p.price?baht(p.price):'-'} บาท${p.stock?'':' · หมด'}</small></div><div class="acts"><button class="chip" data-x="stk" data-i="${esc(p.id)}">${p.stock?'ตั้งว่าหมด':'มีของ'}</button><button class="chip" data-x="ed" data-i="${esc(p.id)}">แก้ไข</button><button class="chip" data-x="del" data-i="${esc(p.id)}">${delId===p.id?'ยืนยันลบ':'ลบ'}</button></div></div>`).join('');}
function sTab(){const s=D.shop,i=(l,k)=>`<label class="fld">${l}<input data-s="${k}" value="${esc(s[k])}"></label>`;
 return `<label class="fld">โลโก้ร้าน (มุมซ้ายบน)${D.logo?' (มีแล้ว)':''}<input type="file" accept="image/*" data-slogo></label>`+i('เบอร์โทร','phone')+i('LINE ID (เช่น @966lmegh)','line')+i('ที่อยู่','addr')+i('เวลาทำการ (เว้นว่างถ้าไม่แสดง)','hours')+i('ประกาศหัวเว็บ (เว้นว่างถ้าไม่แสดง)','notice')+`<label class="fld">ยี่ห้อที่ขาย (คั่นด้วยจุลภาค)<input data-l="brands" value="${esc(D.brands.join(', '))}"></label><label class="fld">หมวดสินค้า (คั่นด้วยจุลภาค)<input data-l="cats" value="${esc(D.cats.join(', '))}"></label><label class="fld">บริการด้านไอที (บรรทัดละ 1 รายการ รูปแบบ ชื่อ|รายละเอียด)<textarea rows="5" data-sv>${esc((D.services||[]).map(s=>s.n+'|'+s.d).join('\n'))}</textarea></label>${D.brands.map(b=>`<label class="fld">โลโก้ ${esc(b)}${(D.logos||{})[b]?' (มีแล้ว)':''}<input type="file" accept="image/*" data-logo="${esc(b)}"></label>`).join('')}`;}
function gTab(){return `<label class="fld">เพิ่มรูปผลงาน (เลือกได้หลายรูป สูงสุด 40 รูป)<input type="file" accept="image/*" multiple data-gal></label>`+(D.gallery||[]).map((g,i)=>`<div class="gi"><img src="${g.img}" alt=""><input data-gc="${i}" value="${esc(g.cap)}" placeholder="คำบรรยาย (ไม่บังคับ)"><button class="chip" data-x="gdel" data-i="${i}">${delId==='g'+i?'ยืนยันลบ':'ลบ'}</button></div>`).join('')}
function qTab(){const j=(a,x,y)=>(a||[]).map(o=>o[x]+'|'+o[y]).join('\n');return `<label class="fld">คำถามที่พบบ่อย (บรรทัดละ 1 ข้อ: คำถาม|คำตอบ)<textarea rows="8" data-fq>${esc(j(D.faq,'q','a'))}</textarea></label><label class="fld">รีวิวลูกค้า (บรรทัดละ 1 รีวิว: ชื่อลูกค้า|ข้อความ)<textarea rows="6" data-rv>${esc(j(D.reviews,'n','t'))}</textarea></label>`}
const bf=(l,k,v)=>`<label class="fld">${l}<input data-b2="${k}" value="${esc(v)}"></label>`;
function bTab(){if(EB)return `<h3 class="f">${EB._new?'เพิ่มส่วนใหม่':'แก้ไขส่วน'}</h3>${bf('หัวข้อ','t',EB.t)}<label class="fld">ข้อความ (ขึ้นบรรทัดใหม่ = ย่อหน้าใหม่)<textarea rows="5" data-b2="x">${esc(EB.x)}</textarea></label><label class="fld">ตำแหน่ง<select data-b2="a"><option value="A"${EB.a!=='B'?' selected':''}>ด้านบน (ใต้แบนเนอร์)</option><option value="B"${EB.a==='B'?' selected':''}>ด้านล่าง (ก่อนติดต่อร้าน)</option></select></label>${bf('ข้อความบนปุ่ม (ไม่บังคับ)','bl',EB.bl)}${bf('ลิงก์ปุ่ม (https://... หรือ tel:...)','bu',EB.bu)}<label class="fld">รูป<input type="file" accept="image/*" data-bimg></label>${EB.img?`<img src="${EB.img}" alt="" style="max-width:140px;border-radius:8px">`:''}<div class="cols"><button class="btn f" data-x="bok">เก็บส่วนนี้</button><button class="btn ghost f" data-x="bno">ยกเลิก</button></div>`;
 return `<p class="note">เพิ่มหัวข้อ ข้อความ รูป และปุ่ม ได้อิสระ จะแสดงเป็นส่วนใหม่บนหน้าเว็บ</p><button class="btn f" data-x="bnew">+ เพิ่มส่วนใหม่</button>`+(D.blocks||[]).map((b,i)=>`<div class="row"><div><b>${esc(b.t||'(ไม่มีหัวข้อ)')}</b><br><small class="note">${b.a==='B'?'ด้านล่าง':'ด้านบน'}</small></div><div class="acts"><button class="chip" data-x="bed" data-i="${i}">แก้ไข</button><button class="chip" data-x="bdel" data-i="${i}">${delId==='b'+i?'ยืนยันลบ':'ลบ'}</button></div></div>`).join('')}
function nTab(){const s=D.shop,p=D.popup||{},i=(l,k)=>`<label class="fld">${l}<input data-s="${k}" value="${esc(s[k])}"></label>`;
 return `<h3 class="f">แถบประกาศด้านบน</h3>`+i('ข้อความประกาศ (เว้นว่าง = ไม่แสดง)','notice')+i('ลิงก์เมื่อกดประกาศ (ไม่บังคับ)','noticeUrl')+`<label class="fld">สีแถบ<select data-s="noticeC">${[['','น้ำเงิน'],['red','แดง'],['green','เขียว'],['amber','ส้ม']].map(([v,l])=>`<option value="${v}"${(s.noticeC||'')===v?' selected':''}>${l}</option>`).join('')}</select></label><h3 class="f">ป๊อปอัปประกาศ (เด้งตอนลูกค้าเปิดเว็บ)</h3><label class="fld"><input type="checkbox" data-p="on" ${p.on?'checked':''} style="width:auto"> เปิดใช้ป๊อปอัป</label><label class="fld">หัวข้อ<input data-p="title" value="${esc(p.title)}"></label><label class="fld">ข้อความ<textarea rows="4" data-p="text">${esc(p.text)}</textarea></label><label class="fld">รูป (ไม่บังคับ)<input type="file" accept="image/*" data-pimg></label>${p.img?`<img src="${p.img}" alt="" style="max-width:140px;border-radius:8px">`:''}`}
function lTab(){const N=Object.fromEntries(SEC);return '<p class="note">ติ๊กเพื่อแสดง/ซ่อนแต่ละส่วน และกดลูกศรเพื่อเลื่อนลำดับ</p>'+[...$$('main > section.sec')].filter(e=>N[e.id]).map(e=>`<div class="row"><label><input type="checkbox" data-hs="${e.id}" ${(D.hide||{})[e.id]?'':'checked'} style="width:auto"> ${N[e.id]}</label><div class="acts"><button class="chip" data-x="mv" data-i="${e.id}:-1">↑</button><button class="chip" data-x="mv" data-i="${e.id}:1">↓</button></div></div>`).join('')}
function admUI(){$('#adm').innerHTML=`<div class="dh f"><b>จัดการร้าน</b><span><button class="btn f" data-x="edit">แก้ไขหน้าเว็บโดยตรง</button> <button class="btn ghost" data-x="close">ปิด</button> <button class="btn ghost" data-x="logout">ออกจากระบบ</button></span></div><div class="tabs">${[['p','สินค้า'],['g','ผลงาน'],['q','คำถาม/รีวิว'],['b','ส่วนเพิ่มเติม'],['n','ประกาศ'],['l','จัดหน้า'],['s','ตั้งค่าร้าน']].map(([k,l])=>`<button class="chip${T===k?' on':''}" data-x="tab" data-i="${k}">${l}</button>`).join('')}</div><div class="dbody">${({p:pTab,g:gTab,q:qTab,b:bTab,n:nTab,l:lTab,s:sTab})[T]()}</div><div class="df"><span id="st" class="note">${dirty?'มีการแก้ไขที่ยังไม่เผยแพร่':'ข้อมูลเป็นปัจจุบัน'}</span><button class="btn f" data-x="save">บันทึกและเผยแพร่</button></div>`;}
function mark(){dirty=true;$('#st').textContent='มีการแก้ไขที่ยังไม่เผยแพร่';bind();render();}
async function up(o,st){const jobs=[];const walk=x=>{if(x&&typeof x==='object')for(const k in x){const v=x[k];if(typeof v==='string'&&v.startsWith('data:image/jpeg;base64,'))jobs.push([x,k,v]);else walk(v)}};walk(o);let n=0;
 for(const[x,k,v]of jobs){if(!done[v]){const h=[...new Uint8Array(await crypto.subtle.digest('SHA-256',enc.encode(v)))].slice(0,8).map(b=>b.toString(16).padStart(2,'0')).join(''),p='img/'+h+'.jpg';st.textContent='อัปโหลดรูป '+(++n)+'/'+jobs.length+'...';
  const r=await gh('/contents/'+p,{method:'PUT',body:JSON.stringify({message:'เพิ่มรูป',content:v.split(',')[1],branch:CFG.b})});if(!r.ok&&r.status!==422)throw new Error('อัปโหลดรูปไม่สำเร็จ ('+r.status+')');done[v]=p}x[k]=done[v]}}
async function save(){const st={set textContent(v){const a=$('#st'),b=$('#edmsg');if(a)a.textContent=v;if(b)b.textContent=v}};
 if(!TOK){st.textContent='ยังไม่ได้เข้าสู่ระบบ';return}
 touch();st.textContent='กำลังบันทึก...';
 try{const out=JSON.parse(JSON.stringify(D));await up(out,st);
  const put=async()=>{const g=await gh('/contents/data.json?ref='+encodeURIComponent(CFG.b)),sha=g.ok?(await g.json()).sha:undefined;return gh('/contents/data.json',{method:'PUT',body:JSON.stringify({message:'อัปเดตข้อมูลเว็บไซต์',content:b64(enc.encode(JSON.stringify(out,null,1))),branch:CFG.b,sha})})};
  let r=await put();if(r.status===409||r.status===422)r=await put();
  if(!r.ok)throw new Error('GitHub '+r.status+(r.status===401||r.status===403?' (token ไม่มีสิทธิ์หรือหมดอายุ)':''));
  dirty=false;st.textContent='บันทึกแล้ว ✓ รอประมาณ 1 นาทีให้ GitHub Pages อัปเดต'}
 catch(e){st.textContent='บันทึกไม่สำเร็จ: '+(e.message||'ลองใหม่อีกครั้ง')}}
function ax(d){const a=d.x,i=d.i;
 if(a==='logout'){logout();return}
 if(a==='edit'){$('#adm').close();editMode(true);return}
 if(a==='close')return $('#adm').close();
 if(a==='save')return save();
 if(a==='tab'){T=i;E=null;EB=null}
 else if(a==='new')E={id:'p'+Date.now(),name:'',brand:D.brands[0]||'',cat:D.cats[0]||'',price:'',old:'',tag:'',specs:'',desc:'',img:'',stock:true,_new:1};
 else if(a==='ed')E={...D.products.find(p=>p.id===i)};
 else if(a==='no')E=null;
 else if(a==='ok'){if(!E.name.trim()){$('#st').textContent='ใส่ชื่อสินค้าก่อน';return}
  delete E._new;const k=D.products.findIndex(p=>p.id===E.id);k<0?D.products.push(E):D.products[k]=E;E=null;dirty=true;render();}
 else if(a==='stk'){const p=D.products.find(x=>x.id===i);p.stock=!p.stock;dirty=true;render()}
 else if(a==='bnew')EB={t:'',x:'',a:'A',bl:'',bu:'',img:'',_new:1};
 else if(a==='bed')EB={...D.blocks[+i],_i:+i};
 else if(a==='bno')EB=null;
 else if(a==='bok'){const o={...EB},nw=o._new;delete o._new;delete o._i;if(nw)(D.blocks=D.blocks||[]).push(o);else D.blocks[EB._i]=o;EB=null;dirty=true;render()}
 else if(a==='bdel'){if(delId==='b'+i){D.blocks.splice(+i,1);delId='';dirty=true;render()}else delId='b'+i}
 else if(a==='mv'){const[id,dr]=i.split(':'),e=$('#'+id),s=dr<0?e.previousElementSibling:e.nextElementSibling;if(s&&s.matches('section.sec')){dr<0?s.before(e):s.after(e);D.order=[...$$('main > section.sec')].map(x=>x.id);dirty=true}}
 else if(a==='gdel'){if(delId==='g'+i){D.gallery.splice(+i,1);delId='';dirty=true;render()}else delId='g'+i}
 else if(a==='del'){if(delId===i){D.products=D.products.filter(p=>p.id!==i);delId='';dirty=true;render()}else delId=i}
 admUI();}
function img(f){if(!f)return;const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,700/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);E.img=c.toDataURL('image/jpeg',.8);admUI()};i.src=r.result};r.readAsDataURL(f);}
const pl=(v,a,b)=>v.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>{const[p,...r]=x.split('|');return{[a]:p.trim(),[b]:r.join('|').trim()}});
function rs(f,max,q,cb){if(!f)return;const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',q))};i.src=r.result};r.readAsDataURL(f)}
function logo(b,f){if(!f)return;const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,260/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(i,0,0,c.width,c.height);(D.logos=D.logos||{})[b]=c.toDataURL('image/jpeg',.85);dirty=true;render();admUI()};i.src=r.result};r.readAsDataURL(f)}
document.addEventListener('click',e=>{if(EDIT){const im=e.target.closest('.hero img,.poster img');if(im){e.preventDefault();pickImg(im);return}if(e.target.closest('a')&&!e.target.closest('#edbar'))e.preventDefault()}
 const t=e.target.closest('button,a');if(!t)return;const d=t.dataset;
 if(t.id==='login'){e.preventDefault();login()}
 else if('lg' in d)lgAct(d.lg)
 else if('pp' in d)$('#pp').close()
 else if('e' in d)edAct(d.e)
 else if('b' in d){F.b=d.b;render()}
 else if(d.add){cart[d.add]?delete cart[d.add]:cart[d.add]=1;render()}
 else if(t.id==='cartbar'){cartUI();$('#cartd').showModal()}
 else if('g' in d)lb(+d.g)
 else if('lb' in d)$('#lb').close()
 else if(d.c)cartAct(d.c)
 else if(t.id==='admBtn'){admUI();$('#adm').showModal()}
 else if(d.x)ax(d);});
$('#adm').addEventListener('input',e=>{const t=e.target,d=t.dataset;
 if(d.f)E[d.f]=t.type==='checkbox'?t.checked:t.type==='number'?(t.value===''?'':Number(t.value)):t.value;
 else if(d.s){D.shop[d.s]=t.value;mark()}
 else if('sv' in d){D.services=t.value.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>{const[n,...r]=x.split('|');return{n:n.trim(),d:r.join('|').trim()}});mark()}
 else if('fq' in d){D.faq=pl(t.value,'q','a');mark()}
 else if('rv' in d){D.reviews=pl(t.value,'n','t');mark()}
 else if(d.gc!==undefined){D.gallery[+d.gc].cap=t.value;mark()}
 else if(d.b2){EB[d.b2]=t.value}
 else if(d.p){D.popup=D.popup||{};D.popup[d.p]=t.type==='checkbox'?t.checked:t.value;mark()}
 else if(d.hs){D.hide=D.hide||{};D.hide[d.hs]=!t.checked;mark()}
 else if(d.l){D[d.l]=t.value.split(',').map(x=>x.trim()).filter(Boolean);mark()}});
$('#adm').addEventListener('change',e=>{const d=e.target.dataset;if('img' in d)img(e.target.files[0]);else if(d.logo)logo(d.logo,e.target.files[0]);else if('gal' in d)[...e.target.files].forEach(f=>{if((D.gallery=D.gallery||[]).length<40)rs(f,900,.78,u=>{D.gallery.push({img:u,cap:''});dirty=true;render();admUI()})});else if('bimg' in d)rs(e.target.files[0],900,.8,u=>{EB.img=u;admUI()});else if('pimg' in d)rs(e.target.files[0],900,.8,u=>{(D.popup=D.popup||{}).img=u;dirty=true;admUI()});else if('slogo' in d)rs(e.target.files[0],300,.9,u=>{D.logo=u;dirty=true;render();admUI()})});
$('#svSel').onchange=svMsg;$('#svTxt').oninput=svMsg;$('#svCopy').onclick=()=>{const m=svMsg();try{navigator.clipboard.writeText(m)}catch(_){}$('#svCopy').textContent='คัดลอกแล้ว'};
['click','input','keydown'].forEach(v=>$('#adm').addEventListener(v,touch));$('#lg').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT')lgGo()});
$('#q').oninput=e=>{F.q=e.target.value.trim().toLowerCase();render()};
$('#cat').onchange=e=>{F.c=e.target.value;render()};
document.addEventListener('input',e=>{if(!EDIT)return;const x=e.target.closest&&e.target.closest('[data-t],[data-k]');if(x){if(x.dataset.t)D.shop[x.dataset.t]=x.textContent;else(D.texts=D.texts||{})[x.dataset.k]=x.textContent}dirty=true});
applyStatic();bind();render();popup();if(location.hash==='#admin')login();addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
})();
