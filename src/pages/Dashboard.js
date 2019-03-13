import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import Organizations from '../components/Organizations'
import Menu from '../components/Menu'
import { logOut } from '../utils/firebase/login'
import { getToken, getUserSettings, saveUserSettings } from '../utils/functions'
import { requestPermission } from '../utils/firebase/messaging'
import {updateDatabaseWithGithubDataByToken, onRepos, onOrgs} from '../utils/firebase/database'

const onLogoutClick = () => {
  logOut()
}

const toggleShowAdmin = (showAdmin, setShowAdmin) => {
  showAdmin ? setShowAdmin(false) : setShowAdmin(true)
}

const Dashboard = () => {
  let settings = getUserSettings()
  const [repos, setRepos] = useState(false)
  const [orgs, setOrgs] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showAdmin, setShowAdmin] = useState(settings.showAdmin)
  const [showOrganisations, setShowOrganisations] = useState(settings.showOrganisations)
  const [orgIdToShow, setOrgIdToShow] = useState(false)
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
    onOrgs((doc) => setOrgs(doc.data()))
  }, [])
  return (
    <div>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu}
        showAdmin={showAdmin} setShowAdmin={() => toggleShowAdmin(showAdmin, setShowAdmin)}
        setShowOrganisations={setShowOrganisations} setOrgIdToShow={setOrgIdToShow} />
      <Navbar onLogoutClick={() => onLogoutClick()} onMenuClick={() => setShowMenu(true)} />
      {showOrganisations ? <Organizations orgs={orgs} showAdmin={showAdmin} setOrgIdToShow={setOrgIdToShow} setShowOrganisations={setShowOrganisations} /> : <Repos repositories={repos} showAdmin={showAdmin} />}
    </div>
  )
}

export default Dashboard
