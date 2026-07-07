/*
=========================================
 HabitTracker Service Worker

 Provides:
 - Offline support
 - App caching
 - Faster loading
=========================================
*/


const CACHE_NAME =
    "habittracker-v1";



const FILES_TO_CACHE = [


    "./",

    "./index.html",

    "./styles.css",

    "./script.js",

    "./manifest.json"



];







// INSTALL EVENT

self.addEventListener(
    "install",
    event => {


        event.waitUntil(

            caches.open(
                CACHE_NAME
            )
            .then(
                cache => {


                    return cache.addAll(
                        FILES_TO_CACHE
                    );


                }
            )

        );


    }
);







// ACTIVATE EVENT

self.addEventListener(
    "activate",
    event => {


        event.waitUntil(

            caches.keys()
            .then(
                keys => {


                    return Promise.all(

                        keys.map(
                            key => {


                                if(
                                    key !== CACHE_NAME
                                ){

                                    return caches.delete(
                                        key
                                    );

                                }


                            }
                        )

                    );


                }
            )

        );


    }
);








// FETCH EVENT

self.addEventListener(
    "fetch",
    event => {


        event.respondWith(

            caches.match(
                event.request
            )
            .then(
                response => {


                    return response ||

                    fetch(
                        event.request
                    );


                }
            )

        );


    }
);
