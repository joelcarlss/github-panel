import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import Menu from '../components/Menu'
import { logOut } from '../utils/firebase/login'
import { getToken, getUserSettings, saveUserSettings } from '../utils/functions'
import { requestPermission } from '../utils/firebase/messaging'
import {updateDatabaseWithGithubDataByToken, onRepos} from '../utils/firebase/database'

const onLogoutClick = () => {
  logOut()
}

const toggleShowAdmin = (showAdmin, setShowAdmin) => {
  showAdmin ? setShowAdmin(false) : setShowAdmin(true)
}

const Dashboard = () => {
  let settings = getUserSettings()
  const [repos, setRepos] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showAdmin, setShowAdmin] = useState(settings.showAdmin)
  const [showOrganisations, setShowOrganisations] = useState(settings.showOrganisations)
  saveUserSettings({showAdmin, showOrganisations})
  useEffect(() => {
    try {
      let token = getToken() // TODO: Not a local storage variable
      updateDatabaseWithGithubDataByToken(token)
      requestPermission()
    } catch (e) {
      console.log(e) // TODO: Show data from API instead?
    }
    onRepos((doc) => setRepos(doc.data()))
  }, [])

  return (
    <div>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu}
        showAdmin={showAdmin} setShowAdmin={() => toggleShowAdmin(showAdmin, setShowAdmin)}
        setShowOrganisations={setShowOrganisations} />
      <Navbar onLogoutClick={() => onLogoutClick()} onMenuClick={() => setShowMenu(true)} />
      <Repos repositories={repos} showAdmin={showAdmin} showOrganisations={showOrganisations} />
    </div>
  )
}

export default Dashboard
