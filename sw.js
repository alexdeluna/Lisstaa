// =====================================================
// SERVICE WORKER - LISTA DE COMPRAS V1.1
// =====================================================

const CACHE_NAME = "lista-compras-v1.1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./visual.css",
    "./app.js",
    "./manifest.json"
];


// =====================================================
// INSTALAÇÃO
// =====================================================

self.addEventListener("install", (evento) => {

    evento.waitUntil(

        caches.open(CACHE_NAME)
            .then((cache) => {

                return cache.addAll(ARQUIVOS);

            })

    );

    self.skipWaiting();

});


// =====================================================
// ATIVAÇÃO
// =====================================================

self.addEventListener("activate", (evento) => {

    evento.waitUntil(

        caches.keys()
            .then((nomesCaches) => {

                return Promise.all(

                    nomesCaches
                        .filter((nome) => {
                            return nome !== CACHE_NAME;
                        })
                        .map((nome) => {
                            return caches.delete(nome);
                        })

                );

            })

    );

    self.clients.claim();

});


// =====================================================
// BUSCAR ARQUIVOS
// =====================================================

self.addEventListener("fetch", (evento) => {

    evento.respondWith(

        caches.match(evento.request)
            .then((respostaCache) => {

                if (respostaCache) {

                    return respostaCache;

                }

                return fetch(evento.request)
                    .then((respostaRede) => {

                        return respostaRede;

                    })
                    .catch(() => {

                        return caches.match(
                            "./index.html"
                        );

                    });

            })

    );

});
