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
