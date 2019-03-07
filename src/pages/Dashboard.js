import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import Menu from '../components/Menu'
import { logOut } from '../utils/firebase/login'
import {populateDatabaseWithGithubDataByToken, onRepos} from '../utils/firebase/database'

const onLogoutClick = () => {
  logOut()
}

const Dashboard = () => {
  const [repos, setRepos] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  useEffect(() => {
    try {
      let token = window.localStorage.getItem('token') // TODO: Not a local storage variable
      populateDatabaseWithGithubDataByToken(token)
    } catch (e) {
      console.log(e) // TODO: Show data from API instead?
    }
    onRepos((doc) => setRepos(doc.data()))
  }, [])

  return (
    <div>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
      <Navbar onLogoutClick={() => onLogoutClick()} onMenuClick={() => setShowMenu(true)} />
      <Repos repositories={repos} />
    </div>
  )
}

export default Dashboard
