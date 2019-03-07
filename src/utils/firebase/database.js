import firebase from './config'
import {getUserRepos, getWebhooks} from '../github/api'

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

const getGithubWebhooks = async (repo, token) => {
  let array = []
  if (repo.permissions.admin) {
    let owner = repo.owner.login
    let repoName = repo.name
    array = await getWebhooks(token, owner, repoName)
  }
  return array
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

const getUserReposAndWebhooksAsObject = async (token) => {
  let userRepos = await getUserRepos(token)
  let obj = {}
  let webhooks = await Promise.all(userRepos.map(element => getGithubWebhooks(element, token)))

  userRepos.map((element, i) => {
    element.webhooks = webhooks[i]
    console.log(element.webhooks)
    obj[element.id] = element
    return true
  })
  return obj
}
