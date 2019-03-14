import firebase from './config'
import {setMessageTokenToUser} from './database'

const messaging = firebase.messaging()

// messaging.usePublicVapidKey('BDIKjviajJRKRdsPMtforEiFQle7GbxZqlSJ8o-HELEI7zEMrJIXZgVE_eEct1g28rQvRP1GfJAIeHovyYAJsNM')

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
    // Send Instance ID token to app server.
    setMessageTokenToUser(refreshedToken)
    // ...
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err)
  })
})

export const onMessage = (cb) => {
  messaging.onMessage(payload => cb(payload))
}

export default messaging
