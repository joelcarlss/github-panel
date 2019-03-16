import firebase from './config'
import {getUserReposAndWebhooksAsObject, getUserOrganisationsAsObject} from '../functions'

const db = firebase.firestore()

export const populateDatabaseWithGithubDataByToken = async (token) => {
  let user = await firebase.auth().currentUser
  getUserReposAndWebhooksAsObject(token)
  .then(repos => db.collection('repos').doc(user.uid).set(repos))
  getUserOrganisationsAsObject(token)
  .then(orgs => db.collection('organizations').doc(user.uid).set(orgs))
}

export const updateDatabaseWithGithubDataByToken = async (token) => {
  let user = await firebase.auth().currentUser
  getUserReposAndWebhooksAsObject(token)
  .then((repos) => db.collection('repos').doc(user.uid).update(repos))
  getUserOrganisationsAsObject(token)
  .then(orgs => db.collection('organizations').doc(user.uid).update(orgs))
}

export const putTokenToDatabase = async (token) => {
  let user = await firebase.auth().currentUser
  await db.collection('githubToken').doc(user.uid).set({ token })
}

export const updateRepoToDatabase = async (repo) => {
  let user = await firebase.auth().currentUser
  await db.collection('repos').doc(user.uid).update({[repo.id]: repo})
}

export const setUserToDb = async (githubUserId, githubUserName) => {
  let user = await firebase.auth().currentUser
  return db.collection('users').doc(user.uid).set(
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
  db.collection('repos').doc(user.uid)
      .onSnapshot(doc => cb(doc))
}

export const onOrgs = (cb) => {
  let user = firebase.auth().currentUser
  db.collection('organizations').doc(user.uid)
      .onSnapshot(doc => cb(doc))
}

export const onToken = (cb) => {
  let user = firebase.auth().currentUser
  db.collection('githubToken').doc(user.uid)
        .onSnapshot(doc => cb(doc))
}

export const onNotices = (cb) => {
  let user = firebase.auth().currentUser
  db.collection('notices').where('firebaseId', '==', user.uid).limit(7).orderBy('time', 'desc')
  .onSnapshot(data => {
    let arr = []
    data.forEach(element => {
      arr.push(element.data())
    })
    cb(arr)
  })
}

export const onNoticeCount = (cb) => {
  let user = firebase.auth().currentUser
  db.collection('notices').where('firebaseId', '==', user.uid)
  .onSnapshot(data => {
    let number = 0
    data.forEach(element => {
      if (!element.data().read) {
        number++
      }
    })
    cb(number)
  })
}

export const setNoticesToRead = (cb) => {
  let user = firebase.auth().currentUser
  let batch = db.batch()
  db.collection('notices').where('firebaseId', '==', user.uid)
  .get()
  .then(data => {
    data.forEach(element => {
      // element.ref.update({read: true}) // BATCH
      batch.update(element.ref, {read: true})
    })
    batch.commit()
  })
}

export const setMessageTokenToUser = async (messageToken) => {
  let user = await firebase.auth().currentUser
  db.collection('users').doc(user.uid).set({messageToken}, {merge: true})
  .then(() => console.log)
}

export const getUserData = () => {
  let user = firebase.auth().currentUser
  return db.collection('users').where('userId', '==', user.uid)
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
  let batch = db.batch()
  let dbData = db.collection('notices').where('firebaseId', '==', user.uid)
  dbData.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      batch.delete(doc.ref)
    })
    batch.commit()
  }

  )
}
