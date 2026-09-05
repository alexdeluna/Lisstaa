const CACHE_NAME = "lista-compras-v1";

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

});


self.addEventListener("activate", (evento) => {

    evento.waitUntil(

        caches.keys().then((nomes) => {

            return Promise.all(

                nomes
                    .filter((nome) => nome !== CACHE_NAME)
                    .map((nome) => caches.delete(nome))

            );

        })

    );

});


self.addEventListener("fetch", (evento) => {

    evento.respondWith(

        caches.match(evento.request)
            .then((resposta) => {

                return resposta ||
                    fetch(evento.request);

            })

    );

});
