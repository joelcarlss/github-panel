import firebase from './config'
import {getUserReposAndWebhooksAsObject, getUserOrganisationsAsObject} from '../functions'

export const populateDatabaseWithGithubDataByToken = async (token) => {
  let user = await firebase.auth().currentUser
  getUserReposAndWebhooksAsObject(token)
  .then(repos => firebase.firestore().collection('repos').doc(user.uid).set(repos))
  getUserOrganisationsAsObject(token)
  .then(orgs => firebase.firestore().collection('organizations').doc(user.uid).set(orgs))
}

export const updateDatabaseWithGithubDataByToken = async (token) => {
  let user = await firebase.auth().currentUser
  getUserReposAndWebhooksAsObject(token)
  .then((repos) => firebase.firestore().collection('repos').doc(user.uid).update(repos))
  getUserOrganisationsAsObject(token)
  .then(orgs => firebase.firestore().collection('organizations').doc(user.uid).update(orgs))
}

export const putTokenToDatabase = async (token) => {
  let user = await firebase.auth().currentUser
  await firebase.firestore().collection('githubToken').doc(user.uid).set({ token })
}

export const updateRepoToDatabase = async (repo) => {
  let user = await firebase.auth().currentUser
  await firebase.firestore().collection('repos').doc(user.uid).update({[repo.id]: repo})
}

export const setUserToDb = async (githubUserId, githubUserName) => {
  let user = await firebase.auth().currentUser
  return firebase.firestore().collection('users').doc(user.uid).set(
    {
      userId: user.uid,
      githubUserId,
      githubUserName
    },
    {
      merge: true
    }
   )
  .then(() => console.log)
}

export const onRepos = (cb) => {
  let user = firebase.auth().currentUser
  firebase.firestore().collection('repos').doc(user.uid)
      .onSnapshot(doc => cb(doc))
}

export const onOrgs = (cb) => {
  let user = firebase.auth().currentUser
  firebase.firestore().collection('organizations').doc(user.uid)
      .onSnapshot(doc => cb(doc))
}

export const onToken = (cb) => {
  let user = firebase.auth().currentUser
  firebase.firestore().collection('githubToken').doc(user.uid)
        .onSnapshot(doc => cb(doc))
}

export const onNotices = (cb) => {
  let user = firebase.auth().currentUser
  firebase.firestore().collection('notices').where('firebaseId', '==', user.uid).limit(7)
  .onSnapshot(data => {
    let arr = []
    data.forEach(element => {
      arr.push(element.data())
    })
    cb(arr)
  })
}

export const setMessageTokenToUser = async (messageToken) => {
  let user = await firebase.auth().currentUser
  firebase.firestore().collection('users').doc(user.uid).set({messageToken}, {merge: true})
  .then(() => console.log)
}

export const getUserData = () => {
  let user = firebase.auth().currentUser
  return firebase.firestore().collection('users').where('userId', '==', user.uid)
  .get()
  .then((doc) => {
    let user = []
    doc.forEach(element => {
      user = element.data()
    })
    return user
  })
}

export const deleteUserNotices = () => {
  let user = firebase.auth().currentUser
  let dbData = firebase.firestore().collection('notices').where('firebaseId', '==', user.uid)
  dbData.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.ref.delete()
    })
  }

  )
}
