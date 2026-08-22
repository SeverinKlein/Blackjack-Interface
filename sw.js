/* Service Worker der Blackjack-Kladde.
   Bei jeder Änderung an index.html die Version hochzählen,
   sonst behalten installierte Geräte die alte Fassung. */
const VERSION = 'kladde-v1';
const DATEIEN = [
  '.', 'index.html', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(DATEIEN)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(k=>Promise.all(k.filter(n=>n!==VERSION).map(n=>caches.delete(n))))
      .then(()=>self.clients.claim())
  );
});

/* Netz zuerst, damit eine neue Fassung sofort ankommt.
   Ohne Verbindung kommt die zuletzt gespeicherte Fassung aus dem Cache. */
self.addEventListener('fetch', e=>{
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r=>{
        const kopie = r.clone();
        caches.open(VERSION).then(c=>c.put(e.request, kopie));
        return r;
      })
      .catch(()=>caches.match(e.request).then(r=>r || caches.match('index.html')))
  );
});
