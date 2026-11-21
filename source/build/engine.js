/* 배포용 저장을 위해, 화면이 바뀌기 전의 원본 문서를 가장 먼저 기억해 둡니다. (이 스크립트가 문서의 마지막 요소) */
const PRISTINE_HTML = document.documentElement.outerHTML;

(function(){
"use strict";
/* 쉬운 이야기(특수교육·느린 학습자용): /easy/ 주소이거나 ?easy 로 열면 쉬운 장들로 바꿔 끼웁니다. */
const EASY_MODE = !!window.EASY_MODE || /[?&]easy\b/.test(location.search);
if(EASY_MODE && EASY.length){ CHAPTERS.length = 0; EASY.forEach(c => CHAPTERS.push(c)); }
if(EASY_MODE) document.documentElement.classList.add("easy");
if(EASY_MODE){ document.title = WORK.easyTitle; const h = document.querySelector(".cover h1"); if(h) h.innerHTML = `${WORK.title} <span style="display:inline-block;font-size:.5em;vertical-align:middle;background:#fde7a8;color:#7a5a1a;border-radius:999px;padding:3px 12px">🌼 쉬운 이야기</span>`; }

/* =========================================================
   0. 공통 데이터
   ========================================================= */
/* 작품 설정을 화면에 반영: 이름표 색, 제목 글자 */
(function applyWork(){
  const css = Object.entries(WORK.tagColors || {}).map(([k, c]) => `.nametag.${k}{background:${c};box-shadow:0 2px 0 rgba(0,0,0,.25)}`).join("");
  if(css){ const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); }
  document.querySelectorAll("[data-w]").forEach(e => { const v = WORK[e.dataset.w]; if(v) e.textContent = v; });
})();
const ITEMS = Object.assign({}, WORK.items || {});
const ALBUMS = {};
const GLOSS = Object.assign({}, WORK.gloss || {});
const HERO = WORK.hero;
const GLOSS_RE = !Object.keys(GLOSS).length ? /(?!)/g : new RegExp(Object.keys(GLOSS).sort((a,b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
const KIND = {act:`🚶 행동하기`, predict:`🔮 예측하기 · 원작의 ${WORK.heroTopic}?`, talk:`💬 말 걸기`, name:`✍️ 이름 짓기`, feel:`💗 마음 읽기`};
const EASY_IC = {canon:`📖`, imag:`✨`, bal:`⚖️`};
const WHO = Object.assign({}, WORK.who || {});
const CHARS = Object.assign({}, WORK.chars || {});
const DEFAULT_NAMES = Object.assign({}, WORK.names || {});
CHAPTERS.forEach(c => { if(c.items) Object.assign(ITEMS, c.items); if(c.album) ALBUMS[c.key] = c.album; });
const BADGE = {
  canon:{e:`📖 원작과 같은 길!`, l:`📖 원작의 길을 걸었습니다`},
  imag:{e:`✨ 상상의 날개를 펼쳤어요!`, l:`✨ 상상의 날개를 펼쳤습니다`},
  bal:{e:`⚖️ 지혜로운 균형을 찾았어요!`, l:`⚖️ 지혜로운 균형을 찾았습니다`}
};
const LABEL = {canon:`원작`, imag:`상상`, bal:`균형`, name:`나만의 이름`, free:`나의 생각`};
if(CHAPTERS[0] && !CHAPTERS[0].bgKeys) CHAPTERS[0].bgKeys = [`ch1`];
let CH, NODES, IDX, CHOICE_IDS, ALBUM;
function setChapter(ci){
  CH = CHAPTERS[Math.max(0, Math.min(CHAPTERS.length - 1, ci || 0))];
  NODES = CH.nodes; IDX = {};
  NODES.forEach((n, i) => { if(n.id) IDX[n.id] = i; });
  CHOICE_IDS = NODES.filter(n => n.t === "choice" || n.t === "name").map(n => n.id);
  ALBUM = ALBUMS[CH.key] || [];
  bookBuiltFor = null;
}
let bookBuiltFor = null;
setChapter(0);
const BG_KEYS = [].concat(...CHAPTERS.map(c => c.bgKeys || []));
const SPRITE_KEYS = (WORK.sprites || []).slice();

/* =========================================================
   1. 상태 & 저장
   ========================================================= */
const SAVE_KEY = EASY_MODE ? WORK.saveKey + "_easy" : WORK.saveKey;
const fresh = () => ({ch:0, pos:0, phase:"cover", started:false, canon:50, imag:50, hearts:Object.fromEntries((WORK.startMet || []).map(k => [k, (CHARS[k] && CHARS[k].start) || 0])), met:Object.fromEntries((WORK.startMet || []).map(k => [k, true])), items:[], flags:{}, names:{},
  picks:[], tally:{canon:0, imag:0, bal:0}, ending:null, order:null, note:null, bg:`ch1`, cam:``, hist:{}, snap:null});
const freshP = () => ({album:{}, endings:{}, reached:{}, snaps:{}});
let S = fresh();
let P = freshP();
let level = "easy", soundOn = true, musicOn = true;
let fxOn = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
function save(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify({S, P, level, soundOn, fxOn, musicOn})); }catch(e){} }
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); if(!d) return;
    if(d.S) S = Object.assign(fresh(), d.S);
    if(d.P) P = Object.assign(freshP(), d.P);
    if(!EASY_MODE && (d.level === "easy" || d.level === "lit")) level = d.level;
    if(typeof d.soundOn === "boolean") soundOn = d.soundOn;
    if(typeof d.musicOn === "boolean") musicOn = d.musicOn;
    if(typeof d.fxOn === "boolean") fxOn = d.fxOn;
    setChapter(S.ch);
    if(!NODES[S.pos]) S.pos = 0;
  }catch(e){}
}

/* =========================================================
   2. 사운드 (Web Audio API)
   ========================================================= */
let actx = null;
function unlockAudio(){
  const AC = window.AudioContext || window.webkitAudioContext;
  if(!AC) return null;
  if(!actx){ try{ actx = new AC(); }catch(e){ return null; } }
  if(actx.state === "suspended") actx.resume().catch(() => {});
  return actx;
}
["pointerdown","touchstart","keydown","click"].forEach(ev => window.addEventListener(ev, unlockAudio, {passive:true, capture:true}));
function tone(f, t, d, v, type){
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = type || "sine"; o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d + 0.02);
}
let lastTick = 0;
function sfx(kind){
  if(!soundOn) return;
  const ctx = unlockAudio(); if(!ctx || ctx.state !== "running") return;
  const t = ctx.currentTime;
  try{
    if(kind === "type"){ if(t - lastTick < 0.05) return; lastTick = t; tone(1100 + Math.random()*500, t, 0.035, 0.035, "square"); tone(220, t, 0.03, 0.03, "triangle"); }
    else if(kind === "select"){ tone(659, t, 0.12, 0.12, "triangle"); tone(988, t + 0.07, 0.18, 0.1, "triangle"); }
    else if(kind === "chime"){ [784, 988, 1175, 1568].forEach((f,i) => tone(f, t + i*0.08, 0.35, 0.07, "sine")); }
    else if(kind === "page"){ tone(523, t, 0.15, 0.06, "sine"); tone(784, t + 0.1, 0.25, 0.06, "sine"); }
    else if(kind === "item"){ tone(1047, t, 0.1, 0.08, "sine"); tone(1319, t + 0.08, 0.1, 0.08, "sine"); tone(1568, t + 0.16, 0.2, 0.08, "sine"); }
    else if(kind === "dream"){ [523, 659, 784, 1047, 784].forEach((f,i) => tone(f, t + i*0.11, 0.5, 0.04, "sine")); }
    else if(kind === "end"){ [392, 523, 659, 784, 1047].forEach((f,i) => tone(f, t + i*0.14, 0.7, 0.07, "triangle")); }
  }catch(e){}
}

/* =========================================================
   3. 이미지 (업로드 > 내장 > 같은 폴더 > SVG)
   ========================================================= */
const EMB = (window.EMBEDDED_IMAGES && typeof window.EMBEDDED_IMAGES === "object") ? window.EMBEDDED_IMAGES : {};
const FILES = (window.IMAGE_FILES && typeof window.IMAGE_FILES === "object") ? window.IMAGE_FILES : {};
const uploaded = {}, folderFound = {};
function imgFor(k){ return uploaded[k] || EMB[k] || FILES[k] || folderFound[k] || null; }
/* 앱(웹) 판: 그림이 별도 파일이라, 장에 들어갈 때 그 장 그림을 미리 불러오고 쉬는 동안 나머지도 받아 둔다(오프라인용) */
const preloaded = {};
function preloadKeys(keys){ keys.forEach(k => { const s = FILES[k]; if(s && !preloaded[s] && !uploaded[k] && !EMB[k]){ preloaded[s] = new Image(); preloaded[s].src = s; } }); }
function preloadChapter(){
  const ks = new Set(CH.bgKeys || []);
  CH.nodes.forEach(n => { if(n.bg) ks.add(n.bg); if(n.f) ks.add(n.f); if(n.o) ks.add(n.o); });
  preloadKeys([...ks]);
}
function warmCache(){
  if(!/^https?:$/.test(location.protocol)) return;
  const urls = Object.values(FILES).concat(CHAPTERS.map(c => c.bgm).filter(Boolean));
  if(!urls.length) return;
  let i = 0;
  const next = () => { if(i >= urls.length) return; const u = urls[i++]; fetch(u).catch(() => {}).finally(() => setTimeout(next, 150)); };
  setTimeout(next, 5000);
}
function probe(key, list){
  if(imgFor(key)) return;
  let i = 0;
  const next = () => { if(i >= list.length) return; const src = list[i++]; const im = new Image();
    im.onload = () => { if(!uploaded[key] && !EMB[key]){ folderFound[key] = src; renderScene(true); } }; im.onerror = next; im.src = src; };
  next();
}
function probeFolder(){
  BG_KEYS.forEach(k => probe(k, [k + ".png", "bg_" + k + ".png", k + ".jpg"]));
  SPRITE_KEYS.forEach(k => probe(k, [k + ".png"]));
}
function normalizeKey(name){
  let n = name.toLowerCase().replace(/\.[a-z0-9]+$/, "").trim().replace(/\s+/g, "_");
  const m = n.match(/^(?:bg_)?ch0?(\d{1,2})(_[a-z]+)?$/);
  if(m) return "ch" + parseInt(m[1], 10) + (m[2] || "");
  return n;
}
const isBgKey = k => /^ch\d+(_[a-z]+)?$/.test(k);
const loadImg = src => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
function removeEdgeWhite(ctx, w, h){
  const id = ctx.getImageData(0, 0, w, h), d = id.data;
  const isBg = p => { const i = p*4; if(d[i+3] < 16) return true; const r = d[i], g = d[i+1], b = d[i+2], mn = Math.min(r,g,b), mx = Math.max(r,g,b); return mn > 226 && mx - mn < 26; };
  const corners = [0, w-1, (h-1)*w, h*w-1];
  if(corners.filter(p => d[p*4+3] > 200 && isBg(p)).length < 3) return;
  const seen = new Uint8Array(w*h), st = [];
  const push = p => { if(!seen[p] && isBg(p)){ seen[p] = 1; st.push(p); } };
  for(let x=0; x<w; x++){ push(x); push((h-1)*w + x); }
  for(let y=0; y<h; y++){ push(y*w); push(y*w + w - 1); }
  let bgR = 0, bgG = 0, bgB = 0, bgN = 0;
  while(st.length){ const p = st.pop(), q = p*4; if(d[q+3] > 200 && bgN < 200000){ bgR += d[q]; bgG += d[q+1]; bgB += d[q+2]; bgN++; } d[q+3] = 0; const x = p % w, y = (p - x) / w;
    if(x>0) push(p-1); if(x<w-1) push(p+1); if(y>0) push(p-w); if(y<h-1) push(p+w); }
  /* 팔과 몸 사이처럼 테두리와 이어지지 않은 '갇힌 배경'도 찾아서 지움.
     배경색과 거의 같은 순백색이고 일정 크기 이상인 덩어리만 지우므로, 눈 흰자처럼 작은 부분은 남음 */
  if(bgN){
    const br = bgR/bgN, bgg = bgG/bgN, bb = bgB/bgN, smallMin = Math.max(40, Math.round(w*h*0.00006));
    const strict = p => { const i = p*4; if(d[i+3] < 16) return false; const r = d[i], g = d[i+1], b = d[i+2];
      return Math.min(r,g,b) > 212 && Math.max(r,g,b) - Math.min(r,g,b) < 20 && Math.abs(r-br) < 16 && Math.abs(g-bgg) < 16 && Math.abs(b-bb) < 16; };
    const lab = new Uint8Array(w*h);
    for(let s0 = 0; s0 < w*h; s0++){
      if(seen[s0] || lab[s0] || !strict(s0)) continue;
      const comp = [s0], stack = [s0]; lab[s0] = 1;
      while(stack.length){ const p = stack.pop(), x = p % w, y = (p - x) / w;
        const nb = [x>0 ? p-1 : -1, x<w-1 ? p+1 : -1, y>0 ? p-w : -1, y<h-1 ? p+w : -1];
        for(const q of nb){ if(q >= 0 && !seen[q] && !lab[q] && strict(q)){ lab[q] = 1; stack.push(q); comp.push(q); } } }
      /* 덩어리의 평균 색이 배경 종이색과 같으면(따뜻한 기가 없으면) 배경 틈으로 보고 지움.
         이(치아)·눈 흰자처럼 살짝 노르스름하거나 회색빛인 부분은 평균 색이 달라서 남음 */
      if(comp.length < smallMin) continue;
      let sr = 0, sg = 0, sb = 0; for(const p of comp){ sr += d[p*4]; sg += d[p*4+1]; sb += d[p*4+2]; }
      const mr = sr/comp.length, mg = sg/comp.length, mb = sb/comp.length;
      const warm = (mr - mb) - (br - bb), dim = Math.min(br, bgg, bb) - Math.min(mr, mg, mb);
      if(warm > 4.6 || dim > 8) continue;
      /* 눈 흰자 보호: 배경 틈은 펜 선(진한 테두리)에 둘러싸여 있고, 눈 흰자는 대부분 피부색에 둘러싸여 있음 */
      const inC = new Set(comp), ringSeen = new Set(); let dark = 0, tot = 0;
      for(const p of comp){ const x = p % w, y = (p - x) / w;
        for(let dy=-3; dy<=3; dy++) for(let dx=-3; dx<=3; dx++){ const xx = x+dx, yy = y+dy; if(xx<0||yy<0||xx>=w||yy>=h) continue;
          const q = yy*w + xx; if(inC.has(q) || ringSeen.has(q)) continue; ringSeen.add(q); tot++;
          if((d[q*4] + d[q*4+1] + d[q*4+2]) / 3 < 90) dark++; } }
      if(tot && dark / tot >= 0.18){ for(const p of comp){ seen[p] = 1; d[p*4+3] = 0; } }
    }
  }
  for(let pass = 0; pass < 2; pass++){
    const edge = [];
    for(let y=1; y<h-1; y++) for(let x=1; x<w-1; x++){ const p = y*w + x; if(seen[p]) continue;
      if(seen[p-1] || seen[p+1] || seen[p-w] || seen[p+w]) edge.push(p); }
    for(const p of edge){ const i = p*4, mn = Math.min(d[i], d[i+1], d[i+2]);
      if(mn > 200){ d[i+3] = Math.round(d[i+3] * Math.max(0.1, (255 - mn) / 55)); if(mn > 238) seen[p] = 1; }
      else if(mn > 170 && pass === 0) d[i+3] = Math.round(d[i+3] * Math.max(0.35, (255 - mn) / 85)); }
  }
  ctx.putImageData(id, 0, 0);
}
async function processImage(src, key){
  const im = await loadImg(src), bg = isBgKey(key);
  const sc = Math.min(1, (bg ? 1600 : 1200) / im.naturalWidth, (bg ? 900 : 1000) / im.naturalHeight);
  const w = Math.max(1, Math.round(im.naturalWidth * sc)), h = Math.max(1, Math.round(im.naturalHeight * sc));
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
  const ctx = cv.getContext("2d", {willReadFrequently: !bg});
  if(bg){ ctx.fillStyle = "#fbf6ec"; ctx.fillRect(0, 0, w, h); }
  ctx.drawImage(im, 0, 0, w, h);
  if(bg) return cv.toDataURL("image/jpeg", 0.86);
  removeEdgeWhite(ctx, w, h);
  return cv.toDataURL("image/png");
}
async function handleFiles(files){
  const list = Array.from(files || []).filter(f => /^image\//.test(f.type) || /\.(png|jpe?g|webp|gif)$/i.test(f.name));
  if(!list.length) return;
  toast("이미지를 정리하는 중이에요… (" + list.length + "개)");
  const ok = [], fail = [];
  for(const f of list){
    const key = normalizeKey(f.name), url = URL.createObjectURL(f);
    try{ uploaded[key] = await processImage(url, key); ok.push(key); }catch(e){ fail.push(f.name); }finally{ URL.revokeObjectURL(url); }
  }
  renderScene(true);
  const known = ok.filter(k => BG_KEYS.includes(k) || SPRITE_KEYS.includes(k)), other = ok.filter(k => !known.includes(k));
  let msg = `<p><b>${ok.length}개</b>의 이미지를 불러와 화면에 바로 반영했어요.</p>`;
  if(known.length) msg += `<div class="img-list">${known.map(k => `<span>${k}</span>`).join("")}</div>`;
  if(other.length) msg += `<p style="margin-top:8px">아래 이미지는 아직 쓰이는 장면이 없지만, 배포용 파일에는 함께 저장돼요. (앞으로 만들 장에서 쓸 수 있어요)</p><div class="img-list">${other.map(k => `<span class="miss">${k}</span>`).join("")}</div>`;
  if(fail.length) msg += `<p style="margin-top:8px;color:#b9473f">읽지 못한 파일: ${esc(fail.join(", "))}</p>`;
  modal("🖼️ 이미지 불러오기 완료", msg, [{label:"확인", cls:"big alt"}]);
}

/* ---------- SVG 수채화 폴백 ---------- */
function mulberry(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const DEFS = id => `<defs>
  <filter id="wc${id}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="${id*7+3}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="1.4"/></filter>
  <filter id="soft${id}"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="paper${id}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.10 0"/></filter></defs>`;
const SVG_OPEN = `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
function blossomCloud(rnd, cx, cy, rx, ry, n, cols){ let s = ""; for(let i=0;i<n;i++){ const a = rnd()*Math.PI*2, r = Math.sqrt(rnd()); s += `<circle cx="${(cx+Math.cos(a)*r*rx).toFixed(0)}" cy="${(cy+Math.sin(a)*r*ry).toFixed(0)}" r="${(18+rnd()*28).toFixed(0)}" fill="${cols[i%cols.length]}" opacity="${(.55+rnd()*.4).toFixed(2)}"/>`; } return s; }
/* 작품 설정(WORK.svgScenes)의 색·요소로 그리는 범용 수채화 장면. 그림 파일이 없을 때만 쓰임 */
function svgScene(key){
  const all = WORK.svgScenes || {};
  const sp = all[key] || all[key.split("_")[0]] || {sky:["#a9cbe0","#d6e6ea","#f2eedc"], far:"#9cbf86", near:"#7aa866"};
  let seed = 7; for(const c of key) seed = (seed * 31 + c.charCodeAt(0)) | 0;
  const rnd = mulberry(seed), id = Math.abs(seed) % 900 + 20, sky = sp.sky || ["#a9cbe0","#d6e6ea","#f2eedc"];
  let g = `<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".55" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk${id})"/>`;
  if(sp.dark || sp.stars){ for(let i=0;i<(sp.stars || 30);i++) g += `<circle cx="${(rnd()*1600).toFixed(0)}" cy="${(rnd()*(sp.dark ? 900 : 380)).toFixed(0)}" r="${(1+rnd()*1.8).toFixed(1)}" fill="#fff" opacity="${(.2+rnd()*.5).toFixed(2)}"/>`; }
  if(sp.sun) g += `<circle cx="${sp.sun[0]}" cy="${sp.sun[1]}" r="70" fill="${sp.sun[2] || "#fff3c4"}" opacity=".85" filter="url(#soft${id})"/>`;
  g += `<g filter="url(#wc${id})">`;
  for(let i=0;i<(sp.clouds || 0);i++) g += blossomCloud(rnd, 150 + rnd()*1300, 90 + rnd()*160, 120, 30, 8, ["#ffffff","#f4f1ea"]);
  if(sp.funnel) g += `<path d="M1060 0 Q1180 0 1260 0 Q1230 220 1190 380 Q1170 520 1150 600 Q1120 610 1110 600 Q1100 470 1080 360 Q1040 200 1060 0Z" fill="#3b3c40" opacity=".78"/>
    <path d="M1080 90 Q1170 110 1240 80 M1095 200 Q1170 220 1220 190 M1110 320 Q1165 335 1200 310 M1120 440 Q1160 450 1180 430" stroke="#5c5d62" stroke-width="10" fill="none" opacity=".7"/>`;
  if(sp.swirl){ for(let i=0;i<7;i++){ const r = 120 + i*90; g += `<path d="M${800-r} 450 A${r} ${r*.55} 0 0 1 ${800+r} 450" stroke="#4a4e63" stroke-width="${14 - i}" fill="none" opacity="${(.5 - i*.05).toFixed(2)}" transform="rotate(${i*23} 800 450)"/>`; }
    g += `<rect x="640" y="330" width="320" height="240" fill="#4b4436"/><rect x="700" y="390" width="70" height="70" fill="#7a6a4a"/><rect x="830" y="400" width="80" height="170" fill="#2d281f"/>`; }
  if(sp.far){ g += sp.flat ? `<rect x="0" y="560" width="1600" height="340" fill="${sp.far}"/>` : `<path d="M0 520 Q300 430 640 500 T1280 470 T1600 500 L1600 900 L0 900Z" fill="${sp.far}"/>`; }
  if(sp.near){ g += sp.flat ? `<rect x="0" y="640" width="1600" height="260" fill="${sp.near}"/>` : `<path d="M0 640 Q520 590 1000 650 T1600 630 L1600 900 L0 900Z" fill="${sp.near}"/>`;
    if(sp.flat) for(let i=0;i<30;i++){ const x = rnd()*1600, y = 660 + rnd()*230; g += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l${(30+rnd()*60).toFixed(0)} ${(rnd()*4-2).toFixed(0)}" stroke="#7c7464" stroke-width="2" opacity=".5"/>`; } }
  if(sp.stream) g += `<path d="M0 720 Q400 680 800 730 T1600 700 L1600 760 Q1200 790 800 770 T0 780Z" fill="#7cc0e0" opacity=".85"/>`;
  if(sp.road){ g += `<path d="M640 900 L760 560 L840 560 L1060 900Z" fill="#e9c04a"/>`;
    for(let i=0;i<14;i++){ const t = i/14, y = 560 + (900-560)*t*t, lx = 760 - 120*t*t, rx = 840 + 220*t*t; g += `<path d="M${lx.toFixed(0)} ${y.toFixed(0)} H${rx.toFixed(0)}" stroke="#b8902a" stroke-width="${(1+3*t).toFixed(1)}" opacity=".7"/>`; } }
  for(let i=0;i<(sp.trees || 0);i++){ const x = (i % 2 ? 1000 + rnd()*560 : 40 + rnd()*560), y = 520 + rnd()*90, r = 50 + rnd()*40;
    g += `<rect x="${(x-6).toFixed(0)}" y="${y.toFixed(0)}" width="12" height="${(r*1.4).toFixed(0)}" fill="#6a5038"/>` + blossomCloud(rnd, x, y - r*.3, r, r*.8, 7, [sp.tree || "#4f8a4a", "#6aa35a", "#3f7440"]); }
  if(sp.house){ const wall = sp.house === "blue" ? "#8fb2e0" : "#b8b2a2", roof = sp.house === "blue" ? "#3f68b0" : "#8d8676", hx = sp.house === "blue" ? 1150 : 900, hy = sp.flat ? 470 : 470;
    g += sp.house === "blue" ? `<rect x="${hx}" y="${hy}" width="170" height="120" fill="${wall}"/><path d="M${hx-20} ${hy+4} Q${hx+85} ${hy-140} ${hx+190} ${hy+4}Z" fill="${roof}"/><rect x="${hx+65}" y="${hy+50}" width="40" height="70" fill="#5a6f98"/>`
                             : `<rect x="${hx}" y="${hy}" width="240" height="140" fill="${wall}"/><path d="M${hx-20} ${hy+4} L${hx+120} ${hy-70} L${hx+260} ${hy+4}Z" fill="${roof}"/><rect x="${hx+40}" y="${hy+40}" width="44" height="44" fill="#8a8272"/><rect x="${hx+140}" y="${hy+50}" width="46" height="90" fill="#6e6658"/>`; }
  if(sp.flowers){ for(let i=0;i<70;i++){ const x = rnd()*1600, y = 680 + rnd()*210; if(sp.road && x > 600 && x < 1100) continue; g += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(4+rnd()*6).toFixed(1)}" fill="${sp.flowers[i % sp.flowers.length]}" opacity=".9"/>`; } }
  g += `</g>`;
  if(sp.dark) g += `<rect width="1600" height="900" fill="#0d0f18" opacity=".25"/>`;
  return SVG_OPEN + DEFS(id) + g + `<rect width="1600" height="900" filter="url(#paper${id})"/></svg>`;
}
const svgCache = {};

/* =========================================================
   4. DOM
   ========================================================= */
const $ = id => document.getElementById(id);
const el = {};
["vn","shk","rig","cue","light","fxc","btnFx","coverHelp","scene","sprL","sprR","viewer","cover","coverSub","coverText","btnStart","btnContinue","chapterCard","ccTitle","ccSub","badge","endcard","endIn","hud",
 "dialog","nameTag","progress","dlgText","note","choices","kind","question","choiceList","nameBox","nameInput","nameOk","barFill","nextHint","miniBook",
 "report","stage","chapterPill","gL","gR","gFillL","gFillR","gauge","popL","popR",
 "btnBook","btnBox","btnLevel","btnSound","btnReset","fileInput","btnExport","btnHelp",
 "book","bookTitle","bookSub","bookBody","bookBanner","bookClose","bookNow","bookSize",
 "modal","mTitle","mBody","mBtns","toast","tip"].forEach(k => el[k] = $(k));

/* =========================================================
   5. 텍스트 도우미
   ========================================================= */
function esc(s){ return String(s).replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m])); }
function T(o){ if(!o) return ""; if(o.b) return o.b; return (level === "lit" ? (o.l || o.e) : (o.e || o.l)) || ""; }
const JOSA = {"이라고":"라고", "아":"야", "은":"는", "이":"가", "을":"를", "으로":"로", "과":"와", "이에요":"예요"};
function josa(word, form){
  const c = String(word || "").trim().slice(-1).charCodeAt(0);
  if(!(c >= 0xAC00 && c <= 0xD7A3)) return JOSA[form] || form;
  const jong = (c - 0xAC00) % 28;
  if(form === "으로" && jong === 8) return "로";
  return jong ? form : (JOSA[form] || form);
}
function fill(t){
  return t.replace(/\{(\w+)\|([^}]+)\}/g, (m, k, f) => josa(S.names[k] || DEFAULT_NAMES[k] || "", f))
          .replace(/\{(\w+)\}/g, (m, k) => S.names[k] || DEFAULT_NAMES[k] || "…");
}
function gloss(html){ return html.replace(GLOSS_RE, m => `<span class="gl" tabindex="0" data-g="${esc(GLOSS[m])}">${m}</span>`); }

/* =========================================================
   6. 진행 엔진
   ========================================================= */
function applyEff(eff){
  if(!eff) return;
  if(eff.flag) S.flags[eff.flag] = true;
  if(eff.met){ S.met[eff.met] = true; if(S.hearts[eff.met] === undefined) S.hearts[eff.met] = CHARS[eff.met] ? CHARS[eff.met].start : 0; setTimeout(() => bumpHud(eff.met), 50); }
  if(eff.name) Object.assign(S.names, eff.name);
  if(eff.heart) for(const k in eff.heart){ const before = S.hearts[k] || 0, d = eff.heart[k]; S.met[k] = true; S.hearts[k] = Math.max(0, Math.min(5, before + d)); setTimeout(() => bumpHud(k), 50);
    if(d && CHARS[k]){ const nm = CHARS[k].full; toast(S.hearts[k] === before ? (d > 0 ? `💗 ${nm}의 마음이 이미 가득해요` : `💔 ${nm}의 마음이 더 내려갈 곳이 없어요`) : d > 0 ? `💗 ${nm}의 마음 +${d}` : `💔 ${nm}의 마음 ${d}`); } }
  if(eff.item && !S.items.includes(eff.item)){ S.items.push(eff.item); const it = ITEMS[eff.item]; setTimeout(() => { sfx("item"); toast(`🎁 추억 상자에 '${it.name}'${josa(it.name, "을")} 넣었어요`); }, 400); }
  if(eff.album && !P.album[eff.album]){ P.album[eff.album] = true; if(!/^e_/.test(eff.album)) setTimeout(() => { sfx("dream"); toast("✨ 숨은 장면을 발견했어요! (" + albumCount() + "/" + ALBUM.length + ")"); }, 300); }
}
function albumCount(){ return ALBUM.filter(a => P.album[a.id]).length; }
function decideEnding(){
  const t = S.tally, arr = ["canon","imag","bal"].sort((a,b) => t[b] - t[a]);
  return t[arr[0]] > t[arr[1]] ? arr[0] : "bal";
}
function enter(i, note){
  S.note = note || null;
  for(let guard = 0; guard < 400; guard++){
    const n = NODES[i];
    if(!n){ S.phase = "report"; break; }
    if(n.t === "goto"){ i = IDX[n.to]; continue; }
    if(n.t === "ending"){ if(!S.ending) S.ending = decideEnding(); i = IDX["E_" + S.ending]; continue; }
    if(!n.t && n.when && !n.when(S)){ i++; continue; }
    S.pos = i;
    if(n.bg && n.bg !== S.bg){ S.bg = n.bg; S.cam = ""; }
    if(n.cam !== undefined){ if(n.cam === "shake") shakeCam(); else S.cam = n.cam; }
    if(n.t === "choice"){ S.phase = "choice"; S.order = null; }
    else if(n.t === "name"){ S.phase = "name"; }
    else if(n.t === "endcard"){ S.phase = "endcard"; P.endings[CH.key + "_" + S.ending] = true; S.hist[CH.key] = {ending:S.ending, tally:Object.assign({}, S.tally)}; }
    else { S.phase = "play"; applyEff(n.eff); if(n.fx === "dream" && !(NODES[i-1] && NODES[i-1].fx === "dream")) sfx("dream"); }
    break;
  }
  save(); render(false);
}
function advance(){
  if(!el.modal.hidden || picking) return;
  if(!el.cover.classList.contains("hide")) return;
  if(el.vn.classList.contains("peek")){ el.vn.classList.remove("peek"); return; }
  if(typing){ finishTyping(); return; }
  if(S.phase === "play") enter(S.pos + 1);
  else if(S.phase === "endcard"){ S.phase = "report"; save(); render(false); }
}

/* =========================================================
   7. 렌더링
   ========================================================= */
let curBg = null;
function curNode(){ return NODES[S.pos] || {}; }
function renderScene(force){
  const n = curNode();
  const bg = S.phase === "cover" ? "ch1" : (S.bg || "ch1");
  if(force || curBg !== bg){
    const first = curBg === null || force;
    curBg = bg;
    const src = imgFor(bg), layer = document.createElement("div");
    layer.className = "layer" + (first ? "" : " enter");
    if(src){ const im = document.createElement("img"); im.src = src; im.alt = ""; layer.appendChild(im); }
    else { if(!svgCache[bg]) svgCache[bg] = svgScene(bg); layer.innerHTML = svgCache[bg]; }
    if(first) el.scene.innerHTML = "";
    el.scene.appendChild(layer);
    if(!first){ requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.remove("enter")));
      const olds = Array.from(el.scene.children).filter(c => c !== layer); setTimeout(() => olds.forEach(o => o.remove()), 1000); }
    setSceneFx(bg);
  }
  el.cue.className = "cue " + (S.phase === "cover" ? "" : (S.cam || ""));
  const showSpr = S.phase !== "cover";
  const face = showSpr ? n.f : null;
  const other = showSpr ? (n.o || null) : null;
  const otherTalk = n.w && n.w !== HERO;
  const fSrc = face ? imgFor(face) : null, oSrc = other ? imgFor(other) : null;
  const wasTalkR = el.sprR.classList.contains("talk"), wasTalkL = el.sprL.classList.contains("talk");
  setSprite(el.sprL, fSrc, otherTalk && !!oSrc);
  setSprite(el.sprR, oSrc, !otherTalk);
  if(S.phase === "play"){ if(oSrc && otherTalk && !wasTalkR) hop(el.sprR); if(fSrc && !otherTalk && !wasTalkL && oSrc) hop(el.sprL); }
  el.scene.querySelectorAll(".svg-figure").forEach(g => g.style.display = (fSrc || oSrc) ? "none" : "");
  el.viewer.classList.toggle("dream", S.phase === "play" && n.fx === "dream");
}
function hop(img){ if(!fxOn) return; img.classList.remove("hop"); void img.offsetWidth; img.classList.add("hop"); }
function shakeCam(){ if(!fxOn) return; el.shk.classList.remove("shake"); void el.shk.offsetWidth; el.shk.classList.add("shake"); }
/* ---------- 장면 효과 (꽃잎·별·물빛) ---------- */
const SCENE_FX = Object.assign({}, WORK.sceneFx || {});
let curFx = null;
function setSceneFx(bg){
  curFx = SCENE_FX[bg] || {};
  el.light.className = "light " + (curFx.light || "") + (curFx.light ? " on" : "");
  buildParticles();
}
const PT = {list:[], w:0, h:0, last:0, raf:0};
function rnd(a, b){ return a + Math.random() * (b - a); }
function buildParticles(){
  resizeFx();
  const L = [], W = PT.w, H = PT.h, c = curFx || {};
  if(c.petals) for(let i=0;i<c.petals.n;i++) L.push(newPetal(c.petals, true));
  if(c.glints) for(let i=0;i<c.glints.n;i++) L.push({k:"glint", x:rnd(0,1), y:rnd(c.glints.band[0], c.glints.band[1]), len:rnd(8,26), ph:rnd(0,6.28), sp:rnd(.6,1.6)});
  if(c.motes) for(let i=0;i<c.motes.n;i++) L.push({k:"mote", x:rnd(0,1), y:rnd(.1,.9), r:rnd(.8,2.2), vx:rnd(-.006,.006), vy:rnd(-.012,-.004), ph:rnd(0,6.28), sp:rnd(.6,1.4)});
  if(c.stars) for(let i=0;i<c.stars.n;i++) L.push({k:"star", x:rnd(0,1), y:rnd(c.stars.band[0], c.stars.band[1]), r:rnd(.6,1.8), ph:rnd(0,6.28), sp:rnd(.5,1.5)});
  PT.list = L;
}
function newPetal(cfg, anywhere){
  return {k:"petal", x:rnd(-.05, 1.1), y:anywhere ? rnd(-.1, 1) : rnd(-.15, -.03), s:rnd(cfg.size[0], cfg.size[1]), vy:rnd(cfg.vy[0], cfg.vy[1]), wind:cfg.wind,
    rot:rnd(0, 6.28), vr:rnd(-1.2, 1.2), sw:rnd(0, 6.28), col:cfg.col[Math.floor(Math.random()*cfg.col.length)], a:rnd(.55, .9)};
}
function resizeFx(){
  const r = el.viewer.getBoundingClientRect(), dpr = Math.min(1.5, window.devicePixelRatio || 1);
  PT.w = Math.max(1, r.width); PT.h = Math.max(1, r.height);
  el.fxc.width = Math.round(PT.w * dpr); el.fxc.height = Math.round(PT.h * dpr);
  el.fxc.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
}
function fxLoop(t){
  PT.raf = requestAnimationFrame(fxLoop);
  const dt = Math.min(.05, (t - (PT.last || t)) / 1000); PT.last = t;
  if(!fxOn || document.hidden || el.stage.hidden) return;
  const ctx = el.fxc.getContext("2d"), W = PT.w, H = PT.h, sc = W / 1000;
  ctx.clearRect(0, 0, W, H);
  const dream = el.viewer.classList.contains("dream");
  for(const p of PT.list){
    if(p.k === "petal"){
      p.sw += dt * 1.3; p.rot += p.vr * dt;
      p.y += (p.vy * dt * sc) / H * 3.2; p.x += ((p.wind + Math.sin(p.sw) * 14) * dt * sc) / W * 3.2;
      if(p.y > 1.05 || p.x < -.1){ Object.assign(p, newPetal((curFx && curFx.petals) || {size:[4,8], vy:[16,30], wind:-10, col:["#fff"]}, false)); }
      ctx.save(); ctx.translate(p.x * W, p.y * H); ctx.rotate(p.rot); ctx.scale(1, .55 + .45 * Math.abs(Math.sin(p.sw)));
      ctx.globalAlpha = p.a; ctx.fillStyle = dream ? "#ffd9ef" : p.col;
      ctx.beginPath(); ctx.ellipse(0, 0, p.s * sc, p.s * .62 * sc, 0, 0, 6.283); ctx.fill(); ctx.restore();
    }else if(p.k === "glint"){
      p.ph += dt * p.sp; const a = Math.max(0, Math.sin(p.ph)) * .55;
      if(a > .02){ ctx.globalAlpha = a; ctx.strokeStyle = "#fffaf0"; ctx.lineWidth = 1.6 * sc;
        ctx.beginPath(); ctx.moveTo(p.x * W - p.len * sc / 2, p.y * H); ctx.lineTo(p.x * W + p.len * sc / 2, p.y * H); ctx.stroke(); }
    }else if(p.k === "mote"){
      p.ph += dt * p.sp; p.x += p.vx * dt + Math.sin(p.ph) * .0004; p.y += p.vy * dt;
      if(p.y < .02){ p.y = .95; p.x = rnd(0, 1); }
      const a = .2 + Math.max(0, Math.sin(p.ph)) * .5;
      ctx.globalAlpha = a; ctx.fillStyle = "#fff1c9"; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * sc * 1.3, 0, 6.283); ctx.fill();
    }else if(p.k === "star"){
      p.ph += dt * p.sp; const a = .25 + Math.max(0, Math.sin(p.ph)) * .6;
      ctx.globalAlpha = a; ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * sc * 1.4, 0, 6.283); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}
if(window.ResizeObserver) new ResizeObserver(() => resizeFx()).observe(el.viewer); else window.addEventListener("resize", resizeFx);
requestAnimationFrame(fxLoop);
function applyFxUI(){ document.body.classList.toggle("nofx", !fxOn); el.btnFx.classList.toggle("off", !fxOn); el.btnFx.title = fxOn ? "꽃잎·카메라 효과 켜짐 (누르면 끄기)" : "꽃잎·카메라 효과 꺼짐 (누르면 켜기)"; if(!fxOn){ const c = el.fxc.getContext("2d"); c.clearRect(0, 0, PT.w, PT.h); } }
el.btnFx.addEventListener("click", e => { e.stopPropagation(); fxOn = !fxOn; applyFxUI(); save(); toast(fxOn ? "✨ 꽃잎·카메라 효과를 켰어요" : "효과를 껐어요 (느린 컴퓨터에서 추천)"); });
function setSprite(img, src, dim){
  if(src){ if(img.getAttribute("src") !== src) img.src = src; img.classList.add("on"); img.classList.toggle("dim", !!dim); img.classList.toggle("talk", !dim); }
  else img.classList.remove("on", "dim", "talk");
}
function heartStr(k){ const h = Math.max(0, Math.min(5, S.hearts[k] || 0)); return "♥".repeat(h) + "♡".repeat(5 - h); }
function metList(){ return Object.keys(CHARS).filter(k => S.met[k]); }
function renderHud(){
  if(S.phase === "cover"){ el.hud.innerHTML = ""; return; }
  el.hud.innerHTML = metList().map(k => `<span id="hud_${k}">${CHARS[k].ic} ${CHARS[k].name} <b class="hearts">${heartStr(k)}</b></span>`).join("");
}
function bumpHud(k){ renderHud(); const s = $("hud_" + k); if(s){ s.classList.remove("bump"); void s.offsetWidth; s.classList.add("bump"); } }
function heartsHtml(){ return metList().map(k => `<p style="margin-top:8px;font-size:.86rem;font-weight:800">${CHARS[k].ic} ${CHARS[k].full}${josa(CHARS[k].full, "과")}의 마음 <span style="color:#d9645c;letter-spacing:1px">${heartStr(k)}</span></p>`).join(""); }
function updateGauge(delta){
  const total = S.canon + S.imag, c = Math.round(S.canon / total * 100), i = 100 - c;
  el.gFillL.style.width = c + "%"; el.gFillR.style.width = i + "%"; el.gL.textContent = c; el.gR.textContent = i;
  if(delta){ el.gauge.classList.remove("flash"); void el.gauge.offsetWidth; el.gauge.classList.add("flash"); showPop(el.popL, delta.canon); showPop(el.popR, delta.imag); }
}
function showPop(node, v){ node.classList.remove("show"); void node.offsetWidth; if(!v) return; node.textContent = "+" + v; node.classList.add("show"); }
function setPill(){
  el.chapterPill.textContent = S.phase === "cover" ? WORK.sub : S.phase === "report" ? CH.num + "장 리포트" : CH.num + "장 · " + CH.title;
}
function progressBar(){
  let maxMain = IDX["E_canon"]; const pct = Math.min(100, Math.round(S.pos / maxMain * 100));
  el.barFill.style.width = (S.phase === "endcard" ? 100 : pct) + "%";
}

/* ---------- 타자기 ---------- */
let typer = null, typing = false, fullText = "", typerDone = null;
function typeText(text, done){
  clearInterval(typer); fullText = text; typing = true; typerDone = done || null;
  el.dlgText.textContent = ""; el.nextHint.classList.remove("on");
  let i = 0; const speed = level === "lit" ? 28 : 38;
  typer = setInterval(() => {
    i++; el.dlgText.textContent = text.slice(0, i);
    if(text.charAt(i-1).trim() && i % 2 === 0) sfx("type");
    if(i >= text.length) finishTyping();
  }, speed);
}
function finishTyping(){
  clearInterval(typer); typer = null; typing = false;
  el.dlgText.innerHTML = gloss(esc(fullText)); el.nextHint.classList.add("on");
  if(typerDone){ const f = typerDone; typerDone = null; f(); }
}
function setTextNow(text, after){ clearInterval(typer); typer = null; typing = false; typerDone = null; fullText = text; el.dlgText.innerHTML = gloss(esc(text)); el.nextHint.classList.add("on"); if(after) after(); }

function showNote(){
  if(!S.note){ el.note.hidden = true; return; }
  el.note.innerHTML = "📖 <b>원작에서는?</b> " + gloss(esc(fill(T(S.note))));
  el.note.hidden = false;
}

function render(instant){
  bgmUpdate();
  updateGauge(); applyLevelUI(); applySoundUI(); setPill(); renderHud();
  el.vn.classList.toggle("choosing", S.phase === "choice" || S.phase === "name");
  document.body.classList.toggle("reporting", S.phase === "report");
  el.vn.classList.toggle("naming", S.phase === "name"); el.vn.classList.remove("peek");
  { const nt = $("nameTarget"), n = curNode(); nt.hidden = S.phase !== "name"; if(S.phase === "name") nt.textContent = "✍️ " + n.label;
    $("btnPeek").hidden = !(S.phase === "choice" || S.phase === "name"); }
  document.body.classList.toggle("covering", false);
  el.endcard.classList.toggle("show", S.phase === "endcard");
  if(S.phase === "report"){ el.stage.hidden = true; el.report.hidden = false; renderReport(); return; }
  el.stage.hidden = false; el.report.hidden = true;
  if(S.phase === "cover"){ renderCover(); return; }
  el.cover.classList.add("hide");
  renderScene(); progressBar(); syncBook();
  if(S.phase === "play") renderPlay(instant);
  else if(S.phase === "choice") renderChoice();
  else if(S.phase === "name") renderName();
  else if(S.phase === "endcard") renderEndcard();
}
function renderPlay(instant){
  const n = curNode();
  el.choices.hidden = true; el.dlgText.hidden = false; el.note.hidden = true;
  const inner = n.w === HERO && n.in;
  el.nameTag.textContent = n.w === HERO ? (inner ? WORK.heroFull + " (속마음)" : WORK.heroFull) : WHO[n.w] || "";
  el.nameTag.className = "nametag " + (inner ? "inner" : (n.w !== HERO ? n.w : ""));
  el.progress.textContent = CH.num + "장 · " + CH.title;
  el.miniBook.hidden = false;
  const text = fill(T(n));
  if(instant) setTextNow(text, showNote); else typeText(text, showNote);
}
function shuffle(n){ const a = Array.from({length:n}, (_,i) => i); for(let i=n-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function renderChoice(){
  const n = curNode();
  if(!Array.isArray(S.order) || S.order.length !== n.opts.length){ S.order = n.kind === "feel" ? n.opts.map((_, i) => i) : shuffle(n.opts.length); save(); }
  clearInterval(typer); typing = false; typerDone = null;
  el.dlgText.hidden = true; el.note.hidden = true; el.choices.hidden = false; el.nameBox.hidden = true; el.choiceList.hidden = false; el.nextHint.classList.remove("on");
  el.nameTag.textContent = "💭 선택의 순간"; el.nameTag.className = "nametag sys";
  el.progress.textContent = CH.num + "장 · " + n.label;
  el.kind.textContent = KIND[n.kind]; el.kind.className = "kind " + n.kind;
  el.question.textContent = T(n.q);
  el.choiceList.innerHTML = ""; el.choiceList.classList.toggle("feelrow", n.kind === "feel");
  S.order.forEach((oi, pos) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "choice"; b.dataset.oi = oi;
    const o = n.opts[oi], ic = o.ic || (EASY_MODE ? EASY_IC[o.type] : "");
    if(n.kind === "feel") b.classList.add("feel");
    b.innerHTML = ic ? `<span class="num ic">${ic}</span><span class="ct"></span>` : `<span class="num">${pos + 1}</span><span class="ct"></span>`;
    b.querySelector(".ct").textContent = T(n.opts[oi]);
    b.addEventListener("click", e => { e.stopPropagation(); pick(oi, b); });
    el.choiceList.appendChild(b);
  });
}
function refreshChoiceTexts(){
  const n = curNode();
  el.question.textContent = T(n.q);
  el.choiceList.querySelectorAll(".choice").forEach(b => b.querySelector(".ct").textContent = T(n.opts[+b.dataset.oi]));
}
let picking = false;
function pick(oi, btn){
  if(picking || S.phase !== "choice") return;
  picking = true; unlockAudio(); sfx("select");
  const n = curNode(), o = n.opts[oi];
  el.choiceList.querySelectorAll(".choice").forEach(b => b.disabled = true);
  btn.classList.add("picked");
  if(o.type === "feel"){
    S.picks = S.picks.filter(p => p.id !== n.id); S.picks.push({id:n.id, type:"feel", oi, ic:o.ic, val:T(o)});
    applyEff(o.eff); showBadge("bal", o.ok ? WORK.feelOk : "💗 그렇게 느낄 수도 있어요");
    setTimeout(() => { picking = false; enter(o.go ? IDX[o.go] : S.pos + 1, n.note); }, 800);
    return;
  }
  const delta = {canon:0, imag:0};
  if(o.type === "canon") delta.canon = 15; else if(o.type === "imag") delta.imag = 15; else { delta.canon = 5; delta.imag = 5; }
  S.canon += delta.canon; S.imag += delta.imag; S.tally[o.type]++;
  S.picks = S.picks.filter(p => p.id !== n.id); S.picks.push({id:n.id, type:o.type, oi});
  applyEff(o.eff);
  updateGauge(delta); showBadge(o.type, T(BADGE[o.type]));
  setTimeout(() => { picking = false; enter(o.go ? IDX[o.go] : S.pos + 1, n.note); }, 700);
}
function renderName(){
  const n = curNode();
  clearInterval(typer); typing = false; typerDone = null;
  el.dlgText.hidden = true; el.note.hidden = true; el.choices.hidden = false; el.choiceList.hidden = true; el.nameBox.hidden = false; el.nextHint.classList.remove("on");
  el.nameTag.textContent = "💭 선택의 순간"; el.nameTag.className = "nametag sys";
  el.progress.textContent = CH.num + "장 · " + n.label;
  el.kind.textContent = KIND.name; el.kind.className = "kind name";
  el.question.textContent = T(n.q);
  el.nameInput.placeholder = n.ph || "";
  el.nameInput.maxLength = n.max || 16;
  el.nameBox.querySelector(".name-help").textContent = (n.max || 16) + "글자까지 쓸 수 있어요. 다 쓰고 Enter를 눌러도 돼요.";
  $("nameOk").textContent = n.free ? "말해 주기" : "이름 짓기";
  el.kind.textContent = n.free ? "💌 마음 전하기" : KIND.name;
  el.nameInput.value = S.names[n.key] || "";
  if(n.pick){
    el.choiceList.hidden = false; el.choiceList.innerHTML = ""; el.choiceList.classList.remove("feelrow");
    n.pick.forEach((p, i) => { const b = document.createElement("button"); b.type = "button"; b.className = "choice pickname";
      b.innerHTML = `<span class="num ic">${["🌸","🌟","🍀","🌈"][i % 4]}</span><span class="ct"></span>`; b.querySelector(".ct").textContent = p;
      b.addEventListener("click", e => { e.stopPropagation(); el.nameInput.value = p; submitName(); }); el.choiceList.appendChild(b); });
    el.nameBox.querySelector(".name-help").textContent = "위에서 고르거나, 직접 써도 돼요.";
    return;
  }
  setTimeout(() => { try{ el.nameInput.focus({preventScroll:true}); }catch(e){} }, 50);
}
function submitName(){
  if(S.phase !== "name" || picking) return;
  const n = curNode();
  let v = el.nameInput.value.replace(/[<>{}`]/g, "").replace(/\s+/g, " ").trim().slice(0, n.max || 16);
  if(!v){ toast(n.free ? "한 글자 이상 써 주세요 💌" : "이름을 한 글자 이상 써 주세요 ✍️"); el.nameInput.focus(); return; }
  if(n.free){
    picking = true; unlockAudio(); sfx("select");
    S.names[n.key] = v; S.picks = S.picks.filter(p => p.id !== n.id); S.picks.push({id:n.id, type:"free", val:v});
    showBadge("bal", "💌 마음이 전해졌어요!"); el.nameInput.blur();
    setTimeout(() => { picking = false; enter(S.pos + 1, n.note); }, 700);
    return;
  }
  picking = true; unlockAudio(); sfx("select");
  const norm = s => s.replace(/[\s'"‘’“”.!]/g, "");
  const match = norm(v) === norm(n.canon);
  S.names[n.key] = v;
  const delta = match ? {canon:15, imag:0} : {canon:0, imag:5};
  S.canon += delta.canon; S.imag += delta.imag;
  S.picks = S.picks.filter(p => p.id !== n.id); S.picks.push({id:n.id, type: match ? "canon" : "name", val:v});
  updateGauge(delta);
  showBadge(match ? "canon" : "name", match ? "📖 원작과 똑같은 이름!" : "✍️ 나만의 이름이 생겼어요!");
  el.nameInput.blur();
  setTimeout(() => { picking = false; enter(S.pos + 1, n.note); }, 700);
}
function showBadge(type, text){
  el.badge.className = "badge " + type; void el.badge.offsetWidth;
  el.badge.textContent = text; el.badge.classList.add("show");
  setTimeout(() => sfx("chime"), 120);
}
function renderEndcard(){
  const E = CH.endings[S.ending], col = {canon:"#c9504a", imag:"#3f78b0", bal:"#5b8a5e"}[S.ending];
  el.endIn.innerHTML = `<small>${CH.num}장 결말</small><h2>🎬 ${esc(E.title)}</h2><span class="lbl" style="background:${col}">${E.label}</span>
    <div class="slots">${["canon","imag","bal"].map(k => `<span class="${P.endings[CH.key + "_" + k] ? "got" : ""}">${P.endings[CH.key + "_" + k] ? CH.endings[k].label : "??? 결말"}</span>`).join("")}</div>`;
  el.choices.hidden = true; el.dlgText.hidden = false; el.note.hidden = true;
  el.nameTag.textContent = "🎬 결말"; el.nameTag.className = "nametag sys";
  el.progress.textContent = CH.num + "장 끝";
  const found = ["canon","imag","bal"].filter(k => P.endings[CH.key + "_" + k]).length;
  setTextNow(level === "lit" ? `${CH.num}장의 결말에 닿았습니다. 지금까지 발견한 결말은 3개 중 ${found}개입니다. 클릭하면 리포트로 넘어갑니다.` : `${CH.num}장 결말을 만났어요! 결말 3개 중 ${found}개를 찾았어요. 클릭하면 리포트를 볼 수 있어요.`);
  sfx("end");
}
function showChapterCard(){
  el.ccTitle.textContent = CH.num + "장 · " + CH.title;
  el.ccSub.textContent = CH.orig + " 「" + CH.origTitle + "」";
  el.chapterCard.classList.add("show"); sfx("page");
  setTimeout(() => el.chapterCard.classList.remove("show"), 1600);
}
function renderCover(){
  setTimeout(bgmUpdate, 0);
  el.cover.classList.remove("hide"); document.body.classList.add("covering"); el.vn.classList.remove("choosing");
  { const bg = (WORK.coverBg || []).map(imgFor).find(Boolean), an = imgFor(WORK.coverSprite), ca = $("coverHero");
    el.cover.classList.toggle("art", !!bg); el.cover.classList.toggle("withhero", !!(bg && an));
    el.cover.style.backgroundImage = bg ? `url("${bg}")` : "";
    if(bg && an){ ca.src = an; ca.hidden = false; } else ca.hidden = true; }
  el.coverSub.textContent = (S.started && S.phase !== "cover") ? `지금 읽는 곳: ${CH.num}장 「${CH.title}」` : `${WORK.sub} · 전 ${CHAPTERS.length}장`;
  el.coverText.textContent = EASY_MODE ? WORK.coverText.easy : WORK.coverText.normal;
  el.btnContinue.hidden = !S.started || S.phase === "cover";
  const chips = $("chapChips");
  const other = EASY_MODE ? (/^https?:$/.test(location.protocol) ? "./" : location.pathname) : (/^https?:$/.test(location.protocol) ? "easy/" : location.pathname + "?easy");
  chips.innerHTML = `<button type="button" class="btn" id="coverChapters">📚 장 골라서 시작하기</button><a class="btn" id="coverSwitch" href="${other}" style="text-decoration:none">${EASY_MODE ? "📖 원래 이야기로 가기" : "🌼 쉬운 이야기로 가기"}</a>`;
  $("coverSwitch").onclick = e => e.stopPropagation();
  $("coverChapters").onclick = e => { e.stopPropagation(); openChapterPicker(); };
  el.btnStart.textContent = el.btnContinue.hidden ? "📖 이야기 시작하기" : "📖 처음부터 시작";
  el.dlgText.hidden = false; el.choices.hidden = true; el.note.hidden = true;
  el.nameTag.textContent = "안내"; el.nameTag.className = "nametag sys";
  el.progress.textContent = CH.num + "장"; el.miniBook.hidden = true;
  el.coverHelp.textContent = ""; el.coverHelp.hidden = true;
  el.nextHint.classList.remove("on"); el.barFill.style.width = "0";
  curBg = null; renderScene(true); setPill();
}

/* ---------- 리포트 ---------- */
function renderReport(){
  const total = S.canon + S.imag, c = Math.round(S.canon / total * 100), i = 100 - c;
  const lit = level === "lit", E = S.ending ? CH.endings[S.ending] : null;
  const emoji = {canon:"📖", imag:"✨", bal:"⚖️"}[S.ending] || "🎬";
  const desc = S.ending && WORK.endingDesc[S.ending] ? (lit ? WORK.endingDesc[S.ending].l : WORK.endingDesc[S.ending].e) : "";
  const snap = S.snap || {}, sh = snap.hearts || {}, sitems = snap.items || [];
  const same = (n, p) => p.type === "canon" || (p.type === "feel" && n.opts[p.oi] && n.opts[p.oi].ok) || (n.t === "name" && !n.free && p.type === "canon");
  const rows = CHOICE_IDS.map(id => {
    const n = NODES[IDX[id]], p = S.picks.find(x => x.id === id); if(!p) return "";
    let mine = "", orig = "";
    if(n.t === "name" && n.free){ mine = `💌 "${esc(p.val)}"`; orig = ""; }
    else if(n.t === "name"){ mine = `✍️ '${esc(p.val)}'`; orig = `'${esc(n.canon)}'`; }
    else if(p.type === "feel"){ const m = n.opts[p.oi], ok = n.opts.find(o => o.ok) || m; mine = `${m.ic} ${esc(T(m))}`; orig = `${ok.ic} ${esc(T(ok))}`; }
    else { const m = n.opts[p.oi], o = n.opts.find(x => x.type === "canon") || m; mine = `${({canon:"📖", imag:"✨", bal:"⚖️"})[p.type] || ""} ${esc(T(m.s || m))}`; orig = esc(T(o.s || o)); }
    const ok = same(n, p);
    return `<div class="crow ${ok ? "same" : ""}"><div class="cl">${esc(n.label)}</div>${n.t === "name" && n.free
      ? `<div class="cm">${mine} <span class="cnote">나만의 생각</span></div>`
      : ok ? `<div class="cm">✅ <b>원작과 같아요</b> · ${mine}</div>`
           : `<div class="cm"><span class="who">나</span>${mine}</div><div class="co"><span class="who">원작</span>📖 ${orig}</div>`}</div>`;
  }).join("");
  const heartGain = Object.keys(CHARS).filter(k => S.met[k] && (S.hearts[k] || 0) !== (sh[k] === undefined ? (CHARS[k].start || 0) : sh[k]))
    .map(k => { const b = sh[k] === undefined ? (CHARS[k].start || 0) : sh[k], d = (S.hearts[k] || 0) - b;
      return `<div class="gain ${d < 0 ? "down" : ""}"><span class="ic">${CHARS[k].ic}</span><b>${CHARS[k].name}</b><span class="hearts">${heartStr(k)}</span><small>${d > 0 ? "+" + d : d}</small></div>`; }).join("");
  const newItems = S.items.filter(k => !sitems.includes(k) && ITEMS[k]).map(k => `<div class="gain"><span class="ic">${ITEMS[k].ic}</span><b>${ITEMS[k].name}</b></div>`).join("");
  const gotAny = heartGain || newItems;
  const items = S.items.map(k => ITEMS[k] ? `<div class="item"><span class="ic">${ITEMS[k].ic}</span><span><b>${ITEMS[k].name}</b><br>${esc(fill(ITEMS[k].desc))}</span></div>` : "").join("") || `<p style="font-size:.85rem;color:#8a7461">아직 모은 물건이 없어요.</p>`;
  const album = ALBUM.map(a => P.album[a.id] ? `<div><span class="ic">${a.ic}</span>${a.name}</div>` : `<div class="lock"><span class="ic">❔</span>???</div>`).join("");
  const endN = ["canon","imag","bal"].filter(k => P.endings[CH.key + "_" + k]).length;
  const ends = ["canon","imag","bal"].map(k => P.endings[CH.key + "_" + k] ? `<div><span class="ic">🎬</span>${CH.endings[k].title}<br><small>${CH.endings[k].label}</small></div>` : `<div class="lock"><span class="ic">❔</span>??? 결말</div>`).join("");
  const nextBtn = CH.finalReport ? `<button type="button" class="big alt" disabled>📕 1부 완결 · 고마워요</button>` : CHAPTERS[S.ch + 1] ? `<button type="button" class="big sky" id="rpNext">➡ ${CH.num + 1}장으로</button>` : `<button type="button" class="big alt" disabled>➡ ${CH.num + 1}장 (준비 중)</button>`;
  el.report.innerHTML = `<div class="rp-wrap">
    <div class="rp-head"><small>CHAPTER ${CH.num} REPORT</small><h2>${CH.num}장 · ${CH.title}</h2>
      <p style="font-size:.82rem;color:#8a7461;margin-top:4px">${CH.orig} 「${CH.origTitle}」</p></div>
    ${E ? `<div class="rp-end ${S.ending}"><div class="rp-end-ic">${emoji}</div><span class="tag ${S.ending}">${E.label}</span>
      <h3>${esc(E.title)}</h3><p>${desc}</p>
      <div class="rp-tally"><span class="t canon">📖 원작 ${S.tally.canon}</span><span class="t imag">✨ 상상 ${S.tally.imag}</span>${S.tally.bal || !EASY_MODE ? `<span class="t bal">⚖️ 균형 ${S.tally.bal}</span>` : ""}</div></div>` : ""}
    ${gotAny ? `<div class="card"><h4>🎁 이번 장에서 얻은 것</h4><div class="gains">${heartGain}${newItems}</div></div>` : ""}
    <div class="card"><h4>🧭 내 선택과 원작</h4><div class="crows">${rows}</div></div>
    <div class="card"><h4>💬 생각 나누기</h4><ol class="talk-q" style="padding-left:20px">${(lit ? CH.talk.l : CH.talk.e).map(q => `<li>${q}</li>`).join("")}</ol></div>
    ${CH.midReport ? (CH.finalReport ? `<div class="mid-banner"><div><b>🏁 1~${CH.num}장 최종 보고서가 열렸어요!</b><br><span>${CH.num}장 동안 함께 걸어온 길을 모두 돌아봐요.</span></div><button type="button" class="big" id="rpMid">🏁 최종 보고서 보기</button></div>` : `<div class="mid-banner"><div><b>📜 1~${CH.num}장 중간 보고서가 열렸어요!</b><br><span>지금까지 걸어온 길, 지어 준 이름, 쌓은 마음을 한눈에 봐요.</span></div><button type="button" class="big" id="rpMid">📜 중간 보고서 보기</button></div>`) : ""}
    <details class="card more"><summary>🎬 결말·숨은 장면·추억 상자 모아 보기 <small>(결말 ${endN}/3 · 숨은 장면 ${albumCount()}/${ALBUM.length})</small></summary>
      <h4 style="margin-top:10px">🎬 결말 모음</h4><div class="album">${ends}</div>
      <h4 style="margin-top:12px">✨ 숨은 장면</h4><div class="album">${album}</div>
      <h4 style="margin-top:12px">🎁 추억 상자 전체</h4><div class="items">${items}</div>
      <h4 style="margin-top:12px">💞 지금까지 쌓은 마음</h4>${heartsHtml()}
      ${S.ch > 0 ? `<p style="font-size:.8rem;color:#8a7461;margin-top:10px">지금까지의 여정 · ${CHAPTERS.slice(0, S.ch + 1).map(c => S.hist[c.key] ? `${c.num}장 ${c.endings[S.hist[c.key].ending].label}` : `${c.num}장 —`).join(" → ")}</p>` : ""}
    </details>
    <div class="rp-sub">
      <button type="button" class="btn" id="rpReplay">🔁 다른 선택으로 다시</button>
      ${EASY_MODE ? "" : `<button type="button" class="btn" id="rpBook">📖 원문 전체 읽기</button>`}
      <button type="button" class="btn" id="rpPrint">🖨️ 인쇄</button>
    </div>
    <div class="rp-btns">${nextBtn}</div></div>`;
  $("rpReplay").onclick = () => replay();
  if($("rpMid")) $("rpMid").onclick = () => renderMidReport();
  if($("rpNext")) $("rpNext").onclick = () => nextChapter();
  if($("rpBook")) $("rpBook").onclick = () => openBook(true);
  $("rpPrint").onclick = () => window.print();
  el.report.scrollTop = 0;
}

/* ---------- 중간 보고서 (1~5장) ---------- */
const NAME_LABELS = (WORK.nameLabels || []).slice();
const READER_TYPE = WORK.readerTypes;
function MID(){ P.mid = P.mid || {}; P.mid[CH.key] = P.mid[CH.key] || {name:"", a:[]}; return P.mid[CH.key]; }
function fallbackCopy(txt, done){ const ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try{ document.execCommand("copy"); done(); }catch(e){ toast("복사하지 못했어요. 길게 눌러 직접 복사해 주세요."); } ta.remove(); }
function renderMidReport(){
  const lit = level === "lit", upto = CHAPTERS.slice(0, S.ch + 1);
  const sum = {canon:0, imag:0, bal:0};
  upto.forEach(c => { const h = S.hist[c.key]; if(h && h.tally) ["canon","imag","bal"].forEach(k => sum[k] += h.tally[k] || 0); });
  const top = ["canon","imag","bal"].reduce((a, b) => sum[b] > sum[a] ? b : a, "canon");
  const tie = ["canon","imag","bal"].filter(k => sum[k] === sum[top]).length > 1;
  const type = READER_TYPE[tie ? "bal" : top];
  const tot = sum.canon + sum.imag + sum.bal || 1;
  const pct = k => Math.round(sum[k] / tot * 100);
  const total = S.canon + S.imag, gc = Math.round(S.canon / total * 100);
  const timeline = upto.map(c => { const h = S.hist[c.key];
    if(!h) return `<div class="tl-row"><div class="tl-ch">${c.num}장</div><div class="tl-body"><b>${c.title}</b><br><small>아직 끝까지 읽지 않았어요</small></div></div>`;
    const E = c.endings[h.ending], t = h.tally || {canon:0, imag:0, bal:0}, n = (t.canon + t.imag + t.bal) || 1;
    return `<div class="tl-row"><div class="tl-ch">${c.num}장</div><div class="tl-body"><b>${c.title}</b> <span class="tag ${h.ending}">${E.label}</span><br>🎬 ${esc(E.title)}
      <div class="tl-bar"><span style="width:${t.canon/n*100}%;background:#d9645c"></span><span style="width:${t.bal/n*100}%;background:#8cb68a"></span><span style="width:${t.imag/n*100}%;background:#6aa5dc"></span></div></div></div>`; }).join("");
  const names = NAME_LABELS.filter(x => x.ch <= CH.num).map(x => { const v = S.names[x.k];
    return `<div class="c">${x.ch}장 · ${x.what}</div><div class="mine">${v ? `'${esc(v)}'` : `<span style="color:#a08770">—</span>`}</div><div class="orig">${x.free ? `<span style="color:#a08770">정답 없음</span>` : `'${x.canon}'`}</div>`; }).join("");
  const endCount = upto.reduce((s, c) => s + ["canon","imag","bal"].filter(k => P.endings[c.key + "_" + k]).length, 0);
  const itemIcons = S.items.map(k => ITEMS[k] ? `<span title="${esc(ITEMS[k].name)}">${ITEMS[k].ic}</span>` : "").join(" ");
  const fin = !!CH.finalReport, RN = fin ? "최종 보고서" : "중간 보고서";
  const RP = (CH.report) || (fin ? WORK.report.final : WORK.report.mid), qs = (lit ? RP.l : RP.e).map(q => q.replace(/\{n\}/g, CH.num));
  el.report.innerHTML = `<div class="rp-wrap mid">
    <div class="rp-head"><small>${fin ? "FINAL READING REPORT" : "MID-TERM READING REPORT"}</small><h2>${fin ? "🏁" : "📜"} ${RN} · 1~${CH.num}장 나의 독서 여정</h2>
      <p style="font-size:.86rem;color:#6e5b4b;margin-top:6px">${RP.sub}</p></div>
    <div class="type-card"><div class="type-emoji">${type.emoji}</div><div style="flex:1">
      <h3>나의 독서 유형: ${type.name}</h3><p>${lit ? type.l : type.e}</p>
      <div class="rp-gauge"><span style="width:${pct("canon")}%;background:linear-gradient(90deg,#c9504a,#ec8d84)"></span><span style="width:${pct("bal")}%;background:linear-gradient(90deg,#9cc49a,#5b8a5e)"></span><span style="width:${pct("imag")}%;background:linear-gradient(90deg,#8cbbe6,#3f78b0)"></span></div>
      <div class="rp-legend"><span style="color:#b9473f">📖 원작 ${sum.canon}번</span><span style="color:#5b8a5e">⚖️ 균형 ${sum.bal}번</span><span style="color:#3d73a8">✨ 상상 ${sum.imag}번</span></div>
      <p style="font-size:.8rem;color:#8a7461;margin-top:6px">게이지 누적: 원작 ${gc}% · 상상 ${100 - gc}%</p>
    </div></div>
    <div class="card"><h4>🗺️ 장별 여정</h4><div class="timeline">${timeline}</div></div>
    <div class="card"><h4>✍️ 내가 지어 준 이름과 생각</h4><div class="cmp"><div class="h">장면</div><div class="h">나의 이름·생각</div><div class="h">원작</div>${names}</div></div>
    <div class="grid2">
      <div class="card"><h4>💞 쌓아 온 마음</h4>${heartsHtml()}</div>
      <div class="card"><h4>🎁 모은 추억 (${S.items.length}개)</h4><p style="font-size:1.5rem;letter-spacing:4px;line-height:1.6">${itemIcons || "—"}</p>
        <h4 style="margin-top:12px">🎬 만난 결말 ${endCount}/${upto.length * 3}</h4><p style="font-size:.84rem;color:#6e5b4b">다른 선택으로 장을 다시 하면 숨은 결말을 더 만날 수 있어요.</p></div>
    </div>
    <div class="card"><h4>📝 돌아보며 쓰기</h4>
      <div class="mid-who">이름: <input id="midName" maxlength="20" placeholder="이름을 써 주세요" value="${esc(MID().name || "")}"><span class="print-name" style="display:none">${esc(MID().name || "")}</span></div>
      ${qs.map((q, i) => `<div class="mid-q"><p><b>${i + 1}.</b> ${q}</p><textarea class="mid-ans" data-i="${i}" rows="3" placeholder="여기에 내 생각을 써 보세요.">${esc(MID().a[i] || "")}</textarea><div class="mid-print" id="midP${i}">${esc(MID().a[i] || "")}</div></div>`).join("")}
      <div class="mid-saved" id="midSaved"></div>
      <p style="font-size:.8rem;color:#8a7461;margin-top:4px">쓴 내용은 이 기기에 저절로 저장돼요. 인쇄하면 쓴 글이 함께 인쇄되고, [📋 내 글 복사]로 선생님께 보낼 수도 있어요.</p></div>
    <div class="rp-btns">
      <button type="button" class="big alt" id="midPrint">🖨️ ${RN} 인쇄</button>
      <button type="button" class="big" id="midCopy">📋 내 글 복사</button>
      <button type="button" class="big sky" id="midBack">⬅ ${CH.num}장 리포트로</button>
      ${fin ? "" : CHAPTERS[S.ch + 1] ? `<button type="button" class="big sky" id="midNext">➡ ${CH.num + 1}장으로</button>` : `<button type="button" class="big alt" disabled>➡ ${CH.num + 1}장 (준비 중)</button>`}
    </div></div>`;
  $("midPrint").onclick = () => window.print();
  let saveT = null;
  const flash = () => { $("midSaved").textContent = "✔ 저장했어요"; clearTimeout(saveT); saveT = setTimeout(() => { const e = $("midSaved"); if(e) e.textContent = ""; }, 1500); };
  el.report.querySelectorAll(".mid-ans").forEach(ta => {
    const fit = () => { ta.style.height = "auto"; ta.style.height = Math.max(96, ta.scrollHeight + 4) + "px"; };
    fit();
    ta.addEventListener("click", e => e.stopPropagation());
    ta.addEventListener("input", () => { const i = +ta.dataset.i; MID().a[i] = ta.value; $("midP" + i).textContent = ta.value; fit(); save(); flash(); });
  });
  $("midName").addEventListener("input", e => { MID().name = e.target.value; el.report.querySelector(".print-name").textContent = e.target.value; save(); flash(); });
  $("midCopy").onclick = () => {
    const m = MID(), txt = `[${WORK.title} · 1~${CH.num}장 ${RN}]\n이름: ${m.name || ""}\n독서 유형: ${type.name}\n\n` + qs.map((q, i) => `${i + 1}. ${q}\n→ ${m.a[i] || "(아직 안 썼어요)"}`).join("\n\n");
    const done = () => toast("📋 내 글을 복사했어요. 카톡이나 메모에 붙여 넣으세요!");
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => fallbackCopy(txt, done)); else fallbackCopy(txt, done);
  };
  $("midBack").onclick = () => renderReport();
  if($("midNext")) $("midNext").onclick = () => nextChapter();
  el.report.scrollTop = 0; sfx("chime");
}

/* =========================================================
   8. 원문 책장 & 낱말 풀이
   ========================================================= */
function buildBook(){
  const B = BOOK[CH.key];
  let num = 0;
  el.bookTitle.textContent = "📖 " + B.orig + " 「" + B.title + "」";
  el.bookSub.textContent = WORK.bookCredit;
  el.bookBody.innerHTML = B.paras.map(([n, t]) => {
      if(n === "h"){ num = 0; return `<h4 style="font-family:sans-serif;font-size:.86rem;color:#8a4a2a;margin:14px 0 8px;padding:6px 10px;background:#f6ead6;border-radius:8px">${t}</h4>`; }
      num++; return `<p class="bp${(B.poems && B.poems.includes(n)) ? " poem" : ""}" data-p="${n}"><i>${num}</i>${gloss(t)}</p>`; }).join("") +
    (B.extra || []).map(([id, label, t]) => `<p class="bp extra" data-p="${id}"><b style="font-family:sans-serif;font-size:.78rem;color:#7a5a8a">${label}</b><br>${gloss(t)}</p>`).join("");
  bookBuiltFor = CH.key;
}
function anchorFor(){
  const n = curNode();
  if(n.bk) return {list:n.bk.map(String), imag:false};
  // 상상 장면 등 원문 표시가 없으면, 뒤에서 가장 가까운 원문 위치를 찾음
  for(let i = S.pos + 1; i < NODES.length; i++){ if(NODES[i].bk && !NODES[i].t){ return {list:[String(NODES[i].bk[0])], imag: n.fx === "dream" || S.phase === "choice" || S.phase === "name"}; } }
  return {list:[], imag:false};
}
function syncBook(scroll){
  if(!el.book.classList.contains("open")) return;
  if(bookBuiltFor !== CH.key) buildBook();
  const a = (S.phase === "cover" || S.phase === "report") ? {list:[], imag:false} : anchorFor();
  el.bookBody.querySelectorAll(".bp").forEach(p => p.classList.toggle("now", a.list.includes(p.dataset.p)));
  el.bookBanner.hidden = !(a.imag && curNode().fx === "dream");
  if(scroll !== false && a.list.length){ const t = el.bookBody.querySelector(`.bp[data-p="${a.list[0]}"]`); if(t) t.scrollIntoView({block:"center", behavior: scroll === "instant" ? "auto" : "smooth"}); }
}
function openBook(top){
  if(bookBuiltFor !== CH.key) buildBook();
  el.book.classList.add("open");
  if(top === true){ el.bookBody.querySelectorAll(".bp").forEach(p => p.classList.remove("now")); el.bookBanner.hidden = true; el.bookBody.scrollTop = 0; }
  else syncBook("instant");
  sfx("page");
}
function closeBook(){ el.book.classList.remove("open"); }

function showTip(target){
  const r = target.getBoundingClientRect();
  el.tip.innerHTML = `<b>${esc(target.textContent)}</b> · ${esc(target.dataset.g)}`;
  el.tip.hidden = false;
  const tw = el.tip.offsetWidth, th = el.tip.offsetHeight;
  let x = Math.min(window.innerWidth - tw - 8, Math.max(8, r.left + r.width/2 - tw/2));
  let y = r.top - th - 8; if(y < 8) y = r.bottom + 8;
  el.tip.style.left = x + "px"; el.tip.style.top = y + "px";
}
function hideTip(){ el.tip.hidden = true; }
document.addEventListener("mouseover", e => { const g = e.target.closest && e.target.closest(".gl"); if(g) showTip(g); });
document.addEventListener("mouseout", e => { const g = e.target.closest && e.target.closest(".gl"); if(g) hideTip(); });
document.addEventListener("click", e => {
  const g = e.target.closest && e.target.closest(".gl");
  if(g){ e.stopPropagation(); showTip(g); clearTimeout(window.__tipT); window.__tipT = setTimeout(hideTip, 3500); }
  else hideTip();
}, true);

/* =========================================================
   9. 툴바
   ========================================================= */
function applyLevelUI(){
  document.body.classList.toggle("lit", level === "lit");
  el.btnLevel.classList.toggle("lit", level === "lit");
  el.btnLevel.innerHTML = level === "lit" ? "📜<span class=\"tx\"> 원작 수준</span>" : "🌱<span class=\"tx\"> 초등 수준</span>";
  el.btnLevel.title = level === "lit" ? "지금: 원작 수준(문학 표현) · 누르면 초등 수준으로" : "지금: 초등 수준(쉬운 말) · 누르면 원작 수준으로";
}
function applySoundUI(){ el.btnSound.textContent = soundOn ? "🔊" : "🔇"; el.btnSound.title = soundOn ? "효과음 켜짐 (누르면 끄기)" : "효과음 꺼짐 (누르면 켜기)"; }
el.btnLevel.addEventListener("click", e => {
  e.stopPropagation();
  level = level === "easy" ? "lit" : "easy"; save(); applyLevelUI();
  if(S.phase === "play") renderPlay(true);
  else if(S.phase === "choice") refreshChoiceTexts();
  else if(S.phase === "name") el.question.textContent = T(curNode().q);
  else if(S.phase === "endcard") renderEndcard();
  else if(S.phase === "report") renderReport();
  else if(S.phase === "cover") renderCover();
  toast(level === "lit" ? "📜 원작 수준(문학 표현)으로 바꿨어요" : "🌱 초등 수준(쉬운 말)으로 바꿨어요");
});
/* ---------- 배경 음악 ---------- */
const BGM = {el:null, gain:null, cur:null, urls:{}, vol:0.32, fading:false};
function bgmWant(){ return (musicOn && S.started && !document.hidden && !document.body.classList.contains("covering") && CH.bgm) ? CH.bgm : null; }
function bgmSetVol(v, sec){
  if(BGM.gain && actx){ const g = BGM.gain.gain, t = actx.currentTime; g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(v, t + sec); }
  else if(BGM.el){ BGM.el.volume = Math.max(0, Math.min(1, v)); }
}
async function bgmSrc(f){
  if(BGM.urls[f]) return BGM.urls[f];
  if(/^https?:$/.test(location.protocol)){
    try{ const r = await fetch(f); if(!r.ok) throw 0; BGM.urls[f] = URL.createObjectURL(await r.blob()); return BGM.urls[f]; }catch(e){ return null; }
  }
  return f;
}
async function bgmUpdate(){
  const want = bgmWant();
  if(want === BGM.cur) return;
  const prev = BGM.el; BGM.cur = want;
  if(prev){ bgmSetVol(0, 0.8); setTimeout(() => { if(BGM.el === prev && BGM.cur !== prev.dataset.f) prev.pause(); }, 850); }
  if(!want) return;
  const src = await bgmSrc(want);
  if(BGM.cur !== want) return;
  if(!src){ BGM.cur = null; return; }
  if(!BGM.el){
    BGM.el = new Audio(); BGM.el.loop = true; BGM.el.preload = "auto";
    const ctx = unlockAudio();
    if(ctx && /^https?:$/.test(location.protocol)){ try{ BGM.gain = ctx.createGain(); BGM.gain.gain.value = 0; ctx.createMediaElementSource(BGM.el).connect(BGM.gain); BGM.gain.connect(ctx.destination); }catch(e){ BGM.gain = null; } }
    BGM.el.addEventListener("timeupdate", () => {
      const a = BGM.el; if(!a.duration || BGM.cur !== a.dataset.f) return;
      if(a.duration - a.currentTime < 2.2 && !BGM.fading){ BGM.fading = true; bgmSetVol(0.02, 2); }
      else if(a.currentTime < 1.5 && BGM.fading){ BGM.fading = false; bgmSetVol(BGM.vol, 2.5); }
    });
  }
  const a = BGM.el;
  if(a.dataset.f !== want){ a.src = src; a.dataset.f = want; BGM.fading = false; }
  if(!BGM.gain) a.volume = 0;
  a.play().then(() => bgmSetVol(BGM.vol, 2)).catch(() => { BGM.cur = null; });
}
document.addEventListener("visibilitychange", bgmUpdate);
window.addEventListener("pointerdown", () => { if(!BGM.cur) bgmUpdate(); }, {passive:true});
function applyMusicUI(){ const b = $("btnMusic"); if(!b) return; b.classList.toggle("off", !musicOn); b.title = musicOn ? "배경 음악 켜짐 (누르면 끄기)" : "배경 음악 꺼짐 (누르면 켜기)"; }
$("btnMusic").addEventListener("click", e => { e.stopPropagation(); musicOn = !musicOn; applyMusicUI(); save(); unlockAudio(); bgmUpdate(); toast(musicOn ? (CH.bgm ? "🎵 배경 음악을 켰어요" : "🎵 배경 음악을 켰어요 (이 장은 아직 음악이 없어요)") : "배경 음악을 껐어요"); });
applyMusicUI();
el.btnSound.addEventListener("click", e => { e.stopPropagation(); soundOn = !soundOn; applySoundUI(); save(); if(soundOn){ unlockAudio(); sfx("select"); } });
el.btnBook.addEventListener("click", e => { e.stopPropagation(); el.book.classList.contains("open") ? closeBook() : openBook(); });
el.miniBook.addEventListener("click", e => { e.stopPropagation(); openBook(); });
el.bookClose.addEventListener("click", closeBook);
el.bookNow.addEventListener("click", () => syncBook());
el.bookSize.addEventListener("click", () => { el.book.classList.toggle("bigtext"); el.bookSize.textContent = el.book.classList.contains("bigtext") ? "가 글자 작게" : "가 글자 크게"; });
$("btnChapters").addEventListener("click", e => { e.stopPropagation(); openChapterPicker(); });
$("btnPeek").addEventListener("click", e => { e.stopPropagation(); el.vn.classList.add("peek"); });
$("peekBack").addEventListener("click", e => { e.stopPropagation(); el.vn.classList.remove("peek"); });
el.btnBox.addEventListener("click", e => {
  e.stopPropagation();
  const items = S.items.length ? S.items.map(k => `<div class="item"><span class="ic">${ITEMS[k].ic}</span><span><b>${ITEMS[k].name}</b><br>${esc(fill(ITEMS[k].desc))}</span></div>`).join("") : "<p>아직 모은 물건이 없어요. 이야기를 진행하면 하나씩 생겨요!</p>";
  modal("🎁 추억 상자", `<div class="items">${items}</div>${heartsHtml()}
    <p style="margin-top:10px;font-size:.84rem;color:#8a7461">✨ 숨은 장면 ${albumCount()}/${ALBUM.length} · 🎬 결말 ${["canon","imag","bal"].filter(k => P.endings[CH.key + "_" + k]).length}/3</p>`, [{label:"닫기", cls:"big alt"}]);
});
el.btnReset.addEventListener("click", e => {
  e.stopPropagation();
  modal("↺ 처음부터 다시 할까요?", "<p>지금까지의 진행과 게이지가 지워지고 1장 처음부터 시작해요.</p><p style='margin-top:6px;font-size:.85rem;color:#8a7461'>[모든 기록 지우기]를 누르면 모은 결말과 숨은 장면까지 지워져요. 여러 학생이 같은 컴퓨터를 쓸 때 사용하세요.</p>", [
    {label:"취소"},
    {label:"🧹 모든 기록 지우기", cls:"btn", fn:() => { P = freshP(); startNew(); }},
    {label:"처음부터 시작", cls:"big", fn:() => startNew()}
  ]);
});
const CARRY = ["canon","imag","hearts","met","items","flags","names","hist"];
function carry(){ const o = {}; CARRY.forEach(k => o[k] = JSON.parse(JSON.stringify(S[k]))); return o; }
function startChapter(ci, snap){
  setChapter(ci); preloadChapter();
  const base = fresh();
  S = Object.assign(base, snap ? JSON.parse(JSON.stringify(snap)) : {});
  S.ch = ci; S.started = true; S.pos = 0; S.phase = "play"; S.bg = (CH.nodes[0] && CH.nodes[0].bg) || CH.key;
  S.snap = carry();
  P.reached[CH.key] = true; P.snaps[CH.key] = S.snap;
  closeBook(); curBg = null; el.cover.classList.add("hide"); document.body.classList.remove("covering"); el.stage.hidden = false; el.report.hidden = true;
  showChapterCard(); enter(0);
}
function startNew(){ startChapter(0, null); }
function jumpChapter(ci){ unlockAudio(); startChapter(ci, ci === 0 ? null : (P.snaps[CHAPTERS[ci].key] || null)); }
function openChapterPicker(){
  const inPlay = S.phase !== "cover";
  const html = `<p style="font-size:.86rem;color:#6e5b4b;line-height:1.6">읽고 싶은 장을 누르면 그 장 처음부터 시작해요. 이 기기에서 전에 읽은 장이면 그때까지 모은 마음·추억·이름이 이어지고, 처음 여는 장이면 기본 상태로 시작해요.${inPlay ? "<br><b>지금 읽던 장면은 이 장의 처음으로 돌아가요.</b>" : ""}</p>
    <div class="chgrid">${CHAPTERS.map((c, i) => { const ends = ["canon","imag","bal"].filter(k => P.endings[c.key + "_" + k]).length;
      return `<button type="button" data-ci="${i}" class="${inPlay && i === S.ch ? "cur" : ""}"><b>${c.num}장 · ${esc(c.title)}</b><small>${esc(c.orig)}${c.finalReport ? " · 최종 보고서" : c.midReport ? " · 중간 보고서" : ""}</small>${ends ? `<span class="st">🎬 결말 ${ends}/3</span>` : P.reached[c.key] ? `<span class="st">✔ 읽은 적 있음</span>` : ""}</button>`; }).join("")}</div>`;
  modal("📚 장 이동", html, [{label:"닫기"}]);
  el.mBody.querySelectorAll(".chgrid button").forEach(b => b.onclick = e => { e.stopPropagation(); closeModal(); jumpChapter(+b.dataset.ci); });
}
function replay(){ startChapter(S.ch, S.snap); }
function nextChapter(){ if(CHAPTERS[S.ch + 1]) startChapter(S.ch + 1, carry()); }

el.fileInput.addEventListener("change", e => { handleFiles(e.target.files); e.target.value = ""; });
el.btnHelp.addEventListener("click", e => {
  e.stopPropagation();
  const has = k => imgFor(k) ? "" : "miss";
  modal("🖼️ 이미지 파일 이름 안내", `<p>이미지 이름만 맞추면 알맞은 장면에 자동으로 들어가요. 없는 장면은 내장 수채화 그림이 대신 나와요.</p>
    <p style="margin-top:8px"><b>배경 (16:9 권장)</b> · 앞에 <code>bg_</code>를 붙여도 돼요 (예: <code>bg_ch2.png</code>)</p>
    <div class="img-list">${BG_KEYS.map(k => `<span class="${has(k)}">${k}</span>`).join("")}</div>
    <p style="margin-top:4px;font-size:.8rem;color:#8a7461;line-height:1.7">${Object.entries(WORK.bgHelp || {}).map(([k, v]) => `${k} = ${esc(v)}`).join(" · ")}</p>
    <p style="margin-top:8px"><b>캐릭터 (투명 PNG 권장 · 흰 배경은 자동으로 지워요)</b></p>
    <div class="img-list">${SPRITE_KEYS.map(k => `<span class="${has(k)}">${k}</span>`).join("")}</div>
    <p style="margin-top:8px;font-size:.82rem;color:#8a7461">초록색 = 지금 적용됨 · 회색 = 아직 없음</p>
    <p style="margin-top:8px">학생에게 나눠 줄 파일에 이미지를 넣으려면 <b>[🖼️ 폴더 이미지 불러오기]</b>로 선택한 뒤 <b>[💾 배포용 단일 HTML 저장]</b>을 누르세요.</p>`, [{label:"닫기", cls:"big alt"}]);
});

/* ---------- 배포용 단일 HTML ---------- */
async function collectImages(){
  const out = Object.assign({}, EMB);
  for(const k of Object.keys(FILES)){ if(uploaded[k] || out[k]) continue;
    try{ const b = await (await fetch(FILES[k])).blob(); out[k] = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(b); }); }catch(e){} }
  for(const k of Object.keys(folderFound)){ if(uploaded[k] || out[k]) continue; try{ out[k] = await processImage(folderFound[k], k); }catch(e){} }
  return Object.assign(out, uploaded);
}
function buildHTML(images, student){
  const doc = new DOMParser().parseFromString(PRISTINE_HTML, "text/html");
  doc.getElementById("embedded-images").textContent = "window.EMBEDDED_IMAGES = " + JSON.stringify(images).replace(/</g, "\\u003c") + "; window.STUDENT_MODE = " + (student ? "true" : "false") + ";";
  return "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
}
el.btnExport.addEventListener("click", async e => {
  e.stopPropagation(); toast("배포용 파일을 준비하는 중이에요…");
  const images = await collectImages(), keys = Object.keys(images);
  const size = keys.reduce((s,k) => s + images[k].length, 0) / 1048576;
  const all = BG_KEYS.concat(SPRITE_KEYS), missed = Object.keys(folderFound).filter(k => !images[k]);
  let body = keys.length ? `<p>아래 <b>${keys.length}개</b> 이미지가 HTML 안에 들어가요. (약 ${size.toFixed(1)}MB)</p>`
    : `<p><b>아직 불러온 이미지가 없어요.</b> 지금 저장하면 내장 수채화 그림만 들어간 파일이 만들어져요.</p>`;
  body += `<div class="img-list">${all.map(k => `<span class="${images[k] ? "" : "miss"}">${k}</span>`).join("")}${keys.filter(k => !all.includes(k)).map(k => `<span>${esc(k)}</span>`).join("")}</div>`;
  if(missed.length) body += `<p style="margin-top:8px;color:#b9473f">같은 폴더에서 자동으로 찾은 ${esc(missed.join(", "))} 이미지는 브라우저 보안 때문에 넣지 못했어요. [🖼️ 폴더 이미지 불러오기]로 직접 선택해 주세요.</p>`;
  body += `<label class="chk"><input type="checkbox" id="chkStudent" checked style="margin-top:4px"><span>학생용으로 저장 (교사 도구 버튼 숨김)<br><span style="font-weight:500;font-size:.8rem;color:#8a7461">학생용 파일에서 교사 도구를 다시 보려면 주소 끝에 #teacher 를 붙여 열면 돼요.</span></span></label>`;
  modal("💾 배포용 단일 HTML 저장", body, [
    {label:"닫기"},
    {label:"📋 코드 복사", cls:"btn", keep:true, fn:() => copyCode(buildHTML(images, $("chkStudent").checked))},
    {label:"📱 앱용 index.html", cls:"btn", keep:true, fn:() => download(buildHTML(images, $("chkStudent").checked), "index.html")},
    {label:"💾 " + WORK.file + " 다운로드", cls:"big", keep:true, fn:() => download(buildHTML(images, $("chkStudent").checked))}
  ]);
});
function download(html, name){
  try{
    const url = URL.createObjectURL(new Blob([html], {type:"text/html;charset=utf-8"}));
    const a = document.createElement("a"); a.href = url; a.download = name || WORK.file;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast("다운로드를 시작했어요! 다운로드 폴더를 확인해 주세요.");
  }catch(err){ toast("이 화면에서는 다운로드가 막혀 있어요. [📋 코드 복사]를 이용해 주세요."); }
}
function copyCode(html){
  const fallback = () => {
    el.mBody.insertAdjacentHTML("beforeend", `<p style="margin-top:10px">아래 칸의 코드를 전체 선택(Ctrl+A)해서 복사한 뒤, 메모장에 붙여 넣고 <code>${WORK.file}</code>로 저장하세요.</p><textarea readonly id="codeBox"></textarea>`);
    const t = $("codeBox"); t.value = html; t.focus(); t.select(); try{ if(document.execCommand("copy")) toast("코드를 복사했어요!"); }catch(e){}
  };
  if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(html).then(() => toast("코드를 복사했어요! 메모장에 붙여 넣고 " + WORK.file + "로 저장하세요."), fallback);
  else fallback();
}

/* ---------- 모달 & 토스트 ---------- */
function modal(title, html, buttons){
  el.mTitle.textContent = title; el.mBody.innerHTML = html; el.mBtns.innerHTML = "";
  (buttons || [{label:"확인"}]).forEach(b => {
    const bt = document.createElement("button"); bt.type = "button"; bt.className = b.cls || "btn"; bt.textContent = b.label;
    bt.addEventListener("click", ev => { ev.stopPropagation(); if(!b.keep) closeModal(); if(b.fn) b.fn(); });
    el.mBtns.appendChild(bt);
  });
  el.modal.hidden = false;
}
function closeModal(){ el.modal.hidden = true; }
el.modal.addEventListener("click", e => { if(e.target === el.modal) closeModal(); });
let toastT = null;
const toastQ = [];
function toast(msg){ toastQ.push(msg); if(toastQ.length === 1) showToast(); }
function showToast(){ const msg = toastQ[0]; if(msg === undefined) return; el.toast.textContent = msg; el.toast.classList.add("show"); clearTimeout(toastT);
  toastT = setTimeout(() => { el.toast.classList.remove("show"); toastQ.shift(); if(toastQ.length) setTimeout(showToast, 250); }, toastQ.length > 1 ? 1500 : 2400); }

/* =========================================================
   10. 입력
   ========================================================= */
el.dialog.addEventListener("click", e => {
  if(e.target.closest("button, input, .choices, .gl")) return;
  unlockAudio(); advance();
});
el.viewer.addEventListener("click", e => { if(e.target.closest(".cover")) return; unlockAudio(); advance(); });
el.nameOk.addEventListener("click", e => { e.stopPropagation(); submitName(); });
el.nameInput.addEventListener("keydown", e => { if(e.key === "Enter" && !e.isComposing){ e.preventDefault(); submitName(); } e.stopPropagation(); });
el.btnStart.addEventListener("click", e => { e.stopPropagation(); unlockAudio(); startNew(); });
el.btnContinue.addEventListener("click", e => { e.stopPropagation(); unlockAudio(); el.cover.classList.add("hide"); curBg = null; render(false); });
document.addEventListener("keydown", e => {
  if(!el.modal.hidden){ if(e.key === "Escape") closeModal(); return; }
  if(e.key === "Escape" && el.book.classList.contains("open")){ closeBook(); return; }
  const tag = e.target && e.target.tagName;
  if(tag === "INPUT" || tag === "TEXTAREA") return;
  if(tag === "BUTTON" && (e.key === "Enter" || e.key === " ")) return;
  if(S.phase === "choice" && /^[1-3]$/.test(e.key) && el.cover.classList.contains("hide")){ const b = el.choiceList.querySelectorAll(".choice")[+e.key - 1]; if(b) b.click(); return; }
  if(e.key === "Enter" || e.key === " " || e.key === "ArrowRight"){
    e.preventDefault();
    if(S.phase === "report") return;
    if(!el.cover.classList.contains("hide")){ S.started && S.phase !== "cover" ? el.btnContinue.click() : startNew(); return; }
    advance();
  }
});

/* =========================================================
   11. 시작
   ========================================================= */
if(window.STUDENT_MODE && location.hash !== "#teacher") document.body.classList.add("student");
window.addEventListener("hashchange", () => document.body.classList.toggle("student", !!window.STUDENT_MODE && location.hash !== "#teacher"));
window.__vn = {state:() => S, node:() => curNode(), persist:() => P, process:(src, key) => processImage(src, key), start:(ci, snap) => startChapter(ci, snap), mid:() => renderMidReport(), bgm:() => ({cur:BGM.cur, paused:BGM.el ? BGM.el.paused : null, t:BGM.el ? BGM.el.currentTime : 0, gain:BGM.gain ? BGM.gain.gain.value : (BGM.el ? BGM.el.volume : null)}), uploaded:() => uploaded, exportHTML:student => collectImages().then(im => buildHTML(im, student))};
/* 홈 화면 앱(웹앱): 인터넷 주소로 열었을 때만 오프라인 기능을 켭니다. 파일로 열면 그냥 지나갑니다. */
if("serviceWorker" in navigator && /^https?:$/.test(location.protocol)){
  const hadCtl = !!navigator.serviceWorker.controller; let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if(hadCtl && !reloaded){ reloaded = true; location.reload(); } });
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js", {updateViaCache:"none"}).then(r => r.update()).catch(() => {}));
}
load(); preloadChapter(); probeFolder(); warmCache(); applyLevelUI(); applySoundUI(); applyFxUI(); applyMusicUI(); updateGauge();
renderCover();
})();
