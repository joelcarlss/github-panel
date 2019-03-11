importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

// Initialize Firebase

var config = {
  apiKey: 'AIzaSyBtaTMfjwwCtyuqvxmbMdEPYQfYKyTbUQc',
  authDomain: 'githubdashboard-1cbfc.firebaseapp.com',
  databaseURL: 'https://githubdashboard-1cbfc.firebaseio.com',
  projectId: 'githubdashboard-1cbfc',
  storageBucket: 'githubdashboard-1cbfc.appspot.com',
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
