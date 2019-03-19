importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

// Initialize Firebase

var config = {
  messagingSenderId: '1073613111252'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler((payload) => {
  const title = payload.data.title
  const options = {
    body: payload.data.body
  }
  return self.registration.showNotification(title, options)
})
