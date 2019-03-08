import firebase from './config'
import {getUserReposAndWebhooksAsObject} from '../functions'

export const populateDatabaseWithGithubDataByToken = async (token) => {
  let user = await firebase.auth().currentUser
  let userRepoData = getUserReposAndWebhooksAsObject(token)
  await firebase.firestore().collection('repos').doc(user.uid).set({ current: userRepoData })
}

export const updateDatabaseWithGithubDataByToken = async (token) => {
  let user = await firebase.auth().currentUser
  let userRepoData = getUserReposAndWebhooksAsObject(token)
  await firebase.firestore().collection('repos').doc(user.uid).update({ current: userRepoData })
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
