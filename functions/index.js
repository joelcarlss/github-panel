// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp()

exports.onWebhook = functions.https.onRequest((req, res) => {
  let hook = JSON.parse(req.body.payload)
  let id = req.query.id
  let type = req.headers['x-github-event']
  let title = `${hook.sender.login} ${hook.action} ${type.substring(0, type.length - 1)}`
  let body = hook.repository.full_name

  hook.title = title
  hook.firebaseId = id
  hook.type = type
  hook.time = new Date()

  admin.firestore().collection('users').where('userId', '==', id)
  .get()
  .then((querySnapshot) => {
    let messageToken
    querySnapshot.forEach((doc) => {
      messageToken = doc.data().messageToken
    })
    admin.firestore().collection('notices').add(hook)
    return messageToken
  })
  .then((messageToken) => {
    var message = {
      data: {
        title,
        body
      },
      token: messageToken
    }

    return admin.messaging().send(message)
  })
  .then((response) => {
    console.log('Notification sent successfully:', response)
    return true
  })
  .catch(() => console.log)
  res.send(200)
})
