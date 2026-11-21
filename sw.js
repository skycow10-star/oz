/* 오즈의 마법사 오프라인 지원: 인터넷이 되면 항상 최신 판을 먼저 받고, 인터넷이 없으면 저장해 둔 판으로 실행합니다. */
const CACHE = "oz-vn-v12";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: "reload"})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const offline = () => new Response("오프라인 상태예요. 인터넷에 연결한 뒤 다시 열어 주세요.", {status: 503, headers: {"Content-Type": "text/plain; charset=utf-8"}});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const path = new URL(req.url).pathname;
  const isPage = req.mode === "navigate" || /\/(index\.html)?$/.test(path);
  const page = /\/easy(\/|\/index\.html)?$/.test(path) ? "./easy/index.html" : "./index.html";
  e.respondWith(caches.open(CACHE).then(async c => {
    if(isPage){
      try{
        let r = null;
        try{ r = await fetch(new URL(page, self.registration.scope).href, {cache: "no-cache", credentials: "same-origin"}); }catch(e1){ r = await fetch(req); }
        if(r && r.ok){ c.put(page, r.clone()); return r; }
      }catch(err){}
      return (await c.match(page)) || (await c.match(req, {ignoreSearch: true})) || offline();
    }
    const cached = await c.match(req, {ignoreSearch: true});
    const net = fetch(req).then(r => { if(r && r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
    return cached || (await net) || offline();
  }));
});
