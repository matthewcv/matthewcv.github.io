
import './ce.js'

navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration);
    }, function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
    });
  