import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import { logOut } from '../utils/firebase/login'
import {populateDatabaseWithGithubDataByToken, onRepos} from '../utils/firebase/database'

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
    onRepos((doc) => setRepos(doc.data()))
  }, [])

  console.log(repos)

  return (
    <div>
      <Navbar onLogoutClick={() => onLogoutClick()} onMenuClick={() => onMenuClick()} />
      <Repos repositories={repos} />
    </div>
  )
}

export default Dashboard
