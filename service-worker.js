/*
=========================================
 HabitTracker Service Worker

 Handles:
 - Offline support
 - App caching
 - Faster loading
=========================================
*/


const CACHE_NAME =
"HabitTracker-v1";





const FILES_TO_CACHE = [


    "./",

    "./index.html",

    "./styles.css",

    "./script.js",

    "./manifest.json",


    "./js/data.js",

    "./js/storage.js",

    "./js/statistics.js",

    "./js/notifications.js",

    "./js/export.js",

    "./js/import.js",

    "./js/achievements.js",

    "./js/profiles.js",

    "./js/categories.js",

    "./js/theme.js",

    "./js/reminders.js",

    "./js/goals.js",

    "./js/friends.js",

    "./js/streaks.js",

    "./js/search.js",

    "./js/ui.js",

    "./js/security.js"


];









// Install App


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


    self.skipWaiting();


}

);









// Load Files


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









// Update Cache


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


    self.clients.claim();


}

);
