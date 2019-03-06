import firebase from './config'
import Firebase from 'firebase'

export function loginUserToGithub () {
  var provider = new Firebase.auth.GithubAuthProvider()
  provider.addScope('repo')
  provider.setCustomParameters({
    'allow_signup': 'false'
  })
  firebase.auth().signInWithPopup(provider).then(function (result) {
    if (result.credential) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken
      console.log('TOKEN: ' + token)
      window.localStorage.setItem('token', token)
    }
    // The signed-in user info.
  }).catch(function (error) {
    console.log(error)
  })
}

export const logOut = () => {
  firebase.auth().signOut().then(() => {
    console.log('Log out')
  }).catch(error => {
    console.log('Log out Failure! ' + error)
  })
}
export const ref = firebase.database().ref()
