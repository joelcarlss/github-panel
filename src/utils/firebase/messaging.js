import firebase from './config'

const messaging = firebase.messaging()

messaging.usePublicVapidKey('BDIKjviajJRKRdsPMtforEiFQle7GbxZqlSJ8o-HELEI7zEMrJIXZgVE_eEct1g28rQvRP1GfJAIeHovyYAJsNM')

messaging.requestPermission().then(function () {
  console.log('Notification permission granted.')
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
}).catch(function (err) {
  console.log('Unable to get permission to notify.', err)
})

// messaging.getToken().then(function (currentToken) {
//   if (currentToken) {
//     sendTokenToServer(currentToken)
//     updateUIForPushEnabled(currentToken)
//   } else {
//       // Show permission request.
//     console.log('No Instance ID token available. Request permission to generate one.')
//       // Show permission UI.
//     updateUIForPushPermissionRequired()
//     setTokenSentToServer(false)
//   }
// }).catch(function (err) {
//   console.log('An error occurred while retrieving token. ', err)
//   showToken('Error retrieving Instance ID token. ', err)
//   setTokenSentToServer(false)
// })

export default messaging
