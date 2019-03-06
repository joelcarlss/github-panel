import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import firebase from '../utils/firebase/config'
import { logOut } from '../utils/firebase/login'
import {populateDatabaseWithGithubDataByToken} from '../utils/firebase/database'

const onLogoutClick = () => {
  logOut()
}

const onMenuClick = () => {
  console.log('Menu click')
}

const Dashboard = () => {
  const [repos, setRepos] = useState(false)
  useEffect(() => {
    let token = window.localStorage.getItem('token') // TODO: Not a local storage variable
    try {
      populateDatabaseWithGithubDataByToken(token)
    } catch (e) {
      console.log(e) // TODO: Show data from API instead?
    }
    let user = firebase.auth().currentUser
    firebase.firestore().collection('repos').doc(user.uid)
    .onSnapshot(function (doc) {
      console.log(doc.data())
      setRepos(doc.data())
    })
  }, [])

  console.log(repos)

  return (
    <div>
      <Navbar onLogoutClick={() => onLogoutClick()} onMenuClick={() => onMenuClick()} />
      <Repos />
    </div>
  )
}

export default Dashboard
