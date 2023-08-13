// service worker 설치 및 활성화
self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
  });
  
self.addEventListener("activate", function (e) {
console.log("fcm sw activate..");
});

// push 알림 노출
self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
      body: resultData.body,
      icon: './icons/favicon-128.png',
      tag: resultData.tag,
      ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// push 알림 클릭 핸들러
self.addEventListener("notificationclick", function (event) {
console.log("notification click");
const url = "/";
event.notification.close();
event.waitUntil(clients.openWindow(url));
});