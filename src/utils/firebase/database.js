import firebase from './config'
import {getUserReposAndWebhooksAsObject} from '../functions'

export const populateDatabaseWithGithubDataByToken = async (token) => {
  let user = await firebase.auth().currentUser
  getUserReposAndWebhooksAsObject(token)
  .then(userRepoData => firebase.firestore().collection('repos').doc(user.uid).set({ current: userRepoData }))
}

export const updateDatabaseWithGithubDataByToken = async (token) => {
  let user = await firebase.auth().currentUser
  getUserReposAndWebhooksAsObject(token)
  .then((repos) => {
    firebase.firestore().collection('repos').doc(user.uid).update({ current: repos })
  })
}

export const putTokenToDatabase = async (token) => {
  let user = await firebase.auth().currentUser
  await firebase.firestore().collection('githubToken').doc(user.uid).set({ token })
}

export const addWebhookToDb = async (hook) => {
  let user = await firebase.auth().currentUser
  return 'I do nothing'
  // await firebase.firestore().collection('repos').doc(user.uid).up
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
