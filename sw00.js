console.log('Started311', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed1', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated1',self.registration);
});
self.addEventListener('push', function(event) {
console.log('Push message', self);
//self.registration.update();

var title = 'Push message6';
self.registration.update();
event.waitUntil( 		  
	  self.registration.showNotification(title, {
      'body': 'me2',
      'icon': 'images/icon.png'
    
    }));
});
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag', event.notification.tag);
  // Android doesn't close the notification when you click it
  // See http://crbug.com/463146
  event.notification.close();
  var url = 'https://youtu.be/gYMkEMCHtJ4';
  // Check if there's already a tab open with this URL.
  // If yes: focus on the tab.
  // If no: open a tab with the URL.
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      console.log('WindowClients', windowClients);
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('WindowClient', client);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {   
    	  return clients.openWindow(url);
      }
    })
  );
});
