import firebase from './config'
// import {putTokenToDatabase} from './database'
import Firebase from 'firebase'
import {populateDatabaseWithGithubDataByToken} from './database'
import {saveUserToDb, saveGithubToken} from '../functions'
// import { requestPermission } from './messaging'

export function loginUserToGithub () {
  var provider = new Firebase.auth.GithubAuthProvider()
  provider.addScope('repo')
  provider.setCustomParameters({
    'allow_signup': 'false'
  })
  firebase.auth().signInWithPopup(provider).then(function (result) {
    if (result.credential) {
      var token = result.credential.accessToken
      saveGithubToken(token)
      populateDatabaseWithGithubDataByToken(token)
      saveUserToDb()
      // .then(requestPermission())
    }
    // The signed-in user info.
  }).catch((error) => {
    console.log(error)
  })
}

export const logOut = () => {
  firebase.auth().signOut().then(() => {
    console.log('Log out') // TODO: Redirect to /
    // deleteRepos()
  }).catch(error => {
    console.log('Log out Failure! ' + error)
  })
}
export const ref = firebase.database().ref()
