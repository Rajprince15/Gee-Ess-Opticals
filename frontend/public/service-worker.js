// Service Worker - PWA Structure (Non-functional)
// This is a placeholder service worker for PWA structure
// Can be activated later by adding caching logic

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  // Claim all clients
  event.waitUntil(self.clients.claim());
});

// Fetch event (currently just passes through)
self.addEventListener('fetch', (event) => {
  // Pass through all requests for now
  // Future: Add caching strategy here
  event.respondWith(fetch(event.request));
});
