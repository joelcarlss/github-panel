import * as firebase from 'firebase'

// Initialize Firebase

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

export default firebase.initializeApp(config)

firebase.firestore().enablePersistence()
.catch(function (err) {
  if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
  } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
  }
})
