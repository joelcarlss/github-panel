import firebase from './config'

export const getUserId = () => {
  let user = firebase.auth().currentUser || false
  return user.uid
}
