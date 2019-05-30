// if ( 'serviceWorker' in navigator ) {
//     navigator.serviceWorker.register( 'sw.js' )
//         .then( function ( success ) {
//             console.log( 'scope', success.scope );
//             if ( success.installing ) {
//                 let sw = success.installing;
//                 sw.addEventListener( 'statechange', function ( event ) {
//                     if ( event.target.state == 'installed' ) {
//                         let loc = window.location.toString();
//                         let message = {
//                             action: 'cache',
//                             location: loc
//                         }
//                         sw.postMessage( message );
//                     }
//                 } )
//             }
//         } );
//     }
self.addEventListener('install', event => {
    event.waitUntil(
      caches
        .open('mws-restaurant-stage-1-master')
        .then(cache =>
          cache.addAll([
            'http://localhost:${port}/www/data/restaurants.json',
            'css/style.css',
            'img/*.jpg',
            'https://api.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.js'
          ])
        )
    )
  })
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          
          return response
        }
        return fetch(event.request)
      })
    )
  })
// self.addEventListener('fetch',function(event){
//     console.log("fffffetch ")
//       console.log(event.request)
// });