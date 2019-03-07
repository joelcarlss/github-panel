import firebase from './config'
import {getUserRepos} from '../github/api'

export const populateDatabaseWithGithubDataByToken = async (token) => {
  let userRepos = await getUserRepos(token)
  let user = await firebase.auth().currentUser
  let obj = {}
  userRepos.forEach(async element => {
    obj[element.id] = element
  })
  await firebase.firestore().collection('repos').doc(user.uid).set({ current: obj })
}

export const putTokenToDatabase = async (token) => {
  let user = await firebase.auth().currentUser
  await firebase.firestore().collection('githubToken').doc(user.uid).set({ token })
}

export const onRepos = (cb) => {
  let user = firebase.auth().currentUser
  firebase.firestore().collection('repos').doc(user.uid)
      .onSnapshot(doc => cb(doc))
}

export const onToken = (cb) => {
  let user = firebase.auth().currentUser
  firebase.firestore().collection('githubToken').doc(user.uid)
        .onSnapshot(doc => cb(doc))
}
