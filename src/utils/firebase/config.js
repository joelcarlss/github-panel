import * as firebase from 'firebase'

// Initialize Firebase

var config = {
  apiKey: 'AIzaSyBtaTMfjwwCtyuqvxmbMdEPYQfYKyTbUQc',
  authDomain: 'githubdashboard-1cbfc.firebaseapp.com',
  databaseURL: 'https://githubdashboard-1cbfc.firebaseio.com',
  projectId: 'githubdashboard-1cbfc',
  storageBucket: 'githubdashboard-1cbfc.appspot.com',
  messagingSenderId: '1073613111252'
}



export default firebase.initializeApp(config)

firebase.firestore().enablePersistence()
.catch(function(err) {
  if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
  } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
  }
})
