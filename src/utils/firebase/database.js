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
