const CACHE_NAME = "lista-compras-v1.1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./visual.css",
    "./app.js",
    "./manifest.json"
];


self.addEventListener("install", (evento) => {

    evento.waitUntil(

        caches.open(CACHE_NAME)
            .then((cache) => {

                return cache.addAll(ARQUIVOS);

            })

    );

    self.skipWaiting();

});


self.addEventListener("activate", (evento) => {

    evento.waitUntil(

        caches.keys()
            .then((chaves) => {

                return Promise.all(

                    chaves
                        .filter(
                            (chave) =>
                                chave !== CACHE_NAME
                        )
                        .map(
                            (chave) =>
                                caches.delete(chave)
                        )

                );

            })

    );

    self.clients.claim();

});


self.addEventListener("fetch", (evento) => {

    evento.respondWith(

        caches.match(evento.request)
            .then((resposta) => {

                if (resposta) {

                    return resposta;

                }

                return fetch(evento.request);

            })

    );

});
