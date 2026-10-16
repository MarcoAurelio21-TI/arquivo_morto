// ============================================================
// ARQUIVO MORTO v8.0 — SERVICE WORKER
// ============================================================

const CACHE_VERSION = '8.0.0';
const CACHE_ESTATICO = 'arquivo-morto-estatico-v8.0';
const CACHE_DINAMICO = 'arquivo-morto-dinamico-v8.0';
const CACHE_FONTES = 'arquivo-morto-fontes-v8.0';

const ARQUIVOS_ESSENCIAIS = [
  './', './index.html', './manifest.json',

  // CSS
  './css/style.css',
  './css/temas.css',
  './css/cinematics.css',
  './css/mapa.css',
  './css/provas.css',
  './css/interrogatorio.css',
  './css/extras.css',
  './css/gerador.css',
  './css/ilustracoes.css',
  './css/dianotte.css',
  './css/cutscenes.css',
  './css/reputacao.css',
  './css/cartas.css',
  './css/julgamento.css',
  './css/npcs.css',
  './css/tutorial.css',
  // ✅ v8.0: novos CSS
  './css/teorias.css',
  './css/gemeos.css',
  './css/faccoes.css',
  './css/motioncomic.css',
  './css/speedrun.css',

  // JS base
  './js/casos.js',
  './js/traducoes.js',
  './js/ilustracoes.js',
  './js/npcs.js',
  './js/capitulos.js',
  './js/mapa.js',
  './js/historicos.js',
  './js/tutorial.js',
  './js/dianotte.js',
  './js/cutscenes.js',
  './js/reputacao.js',
  './js/cartas.js',
  './js/julgamento.js',
  './js/hardcore.js',
  './js/provas.js',
  './js/interrogatorio.js',
  './js/extras.js',
  './js/gerador.js',
  './js/cinematics.js',
  './js/online.js',
  './js/temporadas.js',
  './js/notificacoes.js',
  // ✅ v8.0: novos JS
  './js/teorias.js',
  './js/gemeos.js',
  './js/faccoes.js',
  './js/motioncomic.js',
  './js/speedrun.js',
  // Motor principal (por último)
  './js/script.js'
];

// ============================================================
// INSTALL
// ============================================================
self.addEventListener('install', function(e) {
  console.log('[SW] Instalando v' + CACHE_VERSION);
  e.waitUntil(
    caches.open(CACHE_ESTATICO).then(function(cache) {
      return cache.addAll(ARQUIVOS_ESSENCIAIS).catch(function(err) {
        console.warn('[SW] Alguns arquivos falharam:', err);
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// ============================================================
// ACTIVATE
// ============================================================
self.addEventListener('activate', function(e) {
  console.log('[SW] Ativando v' + CACHE_VERSION);
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) {
          return k.indexOf('arquivo-morto-') === 0 &&
                 k !== CACHE_ESTATICO && k !== CACHE_DINAMICO && k !== CACHE_FONTES;
        }).map(function(k) {
          console.log('[SW] Removendo cache antigo:', k);
          return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

// ============================================================
// FETCH
// ============================================================
self.addEventListener('fetch', function(e) {
  const req = e.request;
  const url = new URL(req.url);

  if (req.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') return;

  // Firebase e APIs externas — network-only
  if (url.hostname.indexOf('firebase') !== -1 ||
      url.hostname.indexOf('googleapis') !== -1 ||
      url.hostname.indexOf('gstatic') !== -1 ||
      url.hostname.indexOf('pollinations') !== -1) {
    e.respondWith(
      fetch(req).catch(function() {
        return new Response(JSON.stringify({ error: 'offline', offline: true }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Fontes — cache-first
  if (url.hostname.indexOf('fonts.g') !== -1 || /\.(woff2?|ttf|otf|eot)$/.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(function(c) {
        if (c) return c;
        return fetch(req).then(function(r) {
          if (r && r.status === 200) {
            const clone = r.clone();
            caches.open(CACHE_FONTES).then(function(cache) { cache.put(req, clone); });
          }
          return r;
        });
      })
    );
    return;
  }

  // HTML — network-first
  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').indexOf('text/html') !== -1 ||
    url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/');

  if (isHTML) {
    e.respondWith(
      fetch(req).then(function(r) {
        if (r && r.status === 200) {
          const clone = r.clone();
          caches.open(CACHE_ESTATICO).then(function(cache) { cache.put(req, clone); });
        }
        return r;
      }).catch(function() {
        return caches.match(req).then(function(c) {
          return c || caches.match('./index.html');
        });
      })
    );
    return;
  }

  // JS e CSS — network-first com fallback para cache
  if (/\.(js|css)$/.test(url.pathname)) {
    e.respondWith(
      fetch(req).then(function(r) {
        if (r && r.status === 200) {
          const clone = r.clone();
          caches.open(CACHE_DINAMICO).then(function(cache) { cache.put(req, clone); });
        }
        return r;
      }).catch(function() {
        return caches.match(req);
      })
    );
    return;
  }

  // Imagens e áudios — cache-first
  if (/\.(png|jpe?g|gif|svg|webp|ico|mp3|wav|ogg)$/i.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(function(c) {
        if (c) return c;
        return fetch(req).then(function(r) {
          if (r && r.status === 200) {
            const clone = r.clone();
            caches.open(CACHE_DINAMICO).then(function(cache) { cache.put(req, clone); });
          }
          return r;
        });
      })
    );
    return;
  }

  // Resto — cache-first com revalidate
  e.respondWith(
    caches.match(req).then(function(cached) {
      const fetchPromise = fetch(req).then(function(r) {
        if (r && r.status === 200 && r.type === 'basic') {
          const clone = r.clone();
          caches.open(CACHE_DINAMICO).then(function(cache) { cache.put(req, clone); });
        }
        return r;
      }).catch(function() { return cached; });
      return cached || fetchPromise;
    })
  );
});

// ============================================================
// PUSH
// ============================================================
self.addEventListener('push', function(e) {
  let data = {};
  try { data = e.data ? e.data.json() : {}; }
  catch(err) { data = { title: 'ARQUIVO MORTO', body: 'Novo caso disponível!' }; }
  e.waitUntil(
    self.registration.showNotification(data.title || 'ARQUIVO MORTO', {
      body: data.body || 'Novo caso disponível!',
      vibrate: [100, 50, 100],
      data: { url: data.url || './' },
      tag: 'arquivo-morto'
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].url.indexOf(self.location.origin) !== -1 && 'focus' in list[i]) {
          return list[i].focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(e.notification.data.url || './');
    })
  );
});

self.addEventListener('message', function(e) {
  if (e.data === 'skipWaiting') self.skipWaiting();
  if (e.data === 'limparCache') {
    caches.keys().then(function(keys) {
      keys.forEach(function(k) { if (k.indexOf('arquivo-morto-') === 0) caches.delete(k); });
    });
  }
});

console.log('[SW] v' + CACHE_VERSION + ' carregado');