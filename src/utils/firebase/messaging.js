import firebase from './config'
import {setMessageTokenToUser} from './database'

const messaging = firebase.messaging()

export const requestPermission = () => {
  messaging.requestPermission().then(function () {
    console.log('Notification permission granted.')

    return messaging.getToken()
  })
  .then((token) => {
    setMessageTokenToUser(token)
  })
  .catch(function (err) {
    console.log('Unable to get permission to notify.', err)
  })
}

messaging.onTokenRefresh(() => {
  messaging.getToken()
  .then((refreshedToken) => {
    console.log('Token refreshed.')
    setMessageTokenToUser(refreshedToken)
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err)
  })
})

export const onMessage = (cb) => {
  messaging.onMessage(payload => cb(payload))
}

export default messaging
