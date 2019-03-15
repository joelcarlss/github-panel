// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp()

exports.onWebhook = functions.https.onRequest((req, res) => {
  let hook = JSON.parse(req.body.payload)
  let id = req.query.id
  let type = req.headers['x-github-event']
  let body = hook.repository.full_name

  hook.firebaseId = id
  hook.type = type
  hook.time = new Date()
  hook.title = getTitle(hook)

  const {title} = hook

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

const getTitle = (obj) => {
  let title
  let name = capitalizeFirstLetter(obj.sender.login)
  if (obj.issue) {
    let action = obj.action
    let type = obj.type.substring(0, obj.type.length - 1)
    title = `${name} ${action} an ${type}`
  } else if (obj.commits) {
    let type = obj.type
    let amount = obj.commits.length
    let commits = (amount === 1) ? 'commit' : 'commits'
    title = `${name} ${type}ed ${amount} ${commits}`
  } else {
    title = `New ${obj.type} by ${name}`
  }
  return title
}

const capitalizeFirstLetter = (string) => {
  if (typeof string === 'string') {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
