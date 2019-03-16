import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import Organizations from '../components/Organizations'
import Menu from '../components/Menu'
import { logOut } from '../utils/firebase/login'
import { getToken } from '../utils/functions'
import { useLocalStorage } from '../utils/hooks'
import { requestPermission } from '../utils/firebase/messaging'
import {updateDatabaseWithGithubDataByToken, setNoticesToRead, onRepos, onOrgs} from '../utils/firebase/database'
import { BrowserRouter, Route } from 'react-router-dom'
import { Chip } from '@material-ui/core'
import PopUpMessage from '../components/PopUpMessage'
import Statistics from '../components/Statistics'

const onLogoutClick = () => {
  logOut()
}

const Dashboard = () => {
  const [showOnlyAdmin, setShowOnlyAdmin] = useLocalStorage('showOnlyAdmin', false)
  const toggleShowAdmin = () => setShowOnlyAdmin(state => !state)
  const [repos, setRepos] = useState(false)
  const [orgs, setOrgs] = useState(false)
  const [showMenu, setShowMenu] = useState(null)

  useEffect(() => {
    try {
      let token = getToken() // TODO: Not a local storage variable
      updateDatabaseWithGithubDataByToken(token)
      requestPermission()

      onRepos((doc) => setRepos(doc.data()))
      onOrgs((doc) => setOrgs(doc.data()))
    } catch (e) {
      console.log(e) // TODO: Show data from API instead?
    }
  }, [])

  useEffect(() => {
    if (showMenu === false) {
      setNoticesToRead()
    }
  }, [showMenu])

  return (
    <div>
      <BrowserRouter>
        <div>
          <PopUpMessage />
          <Menu showMenu={showMenu} setShowMenu={setShowMenu}
            showAdmin={showOnlyAdmin} setShowAdmin={() => toggleShowAdmin(showOnlyAdmin, setShowOnlyAdmin)} />

          <Navbar onLogoutClick={() => onLogoutClick()} onMenuClick={() => setShowMenu(true)} />

          <Route exact path='/' render={() => <Repos repositories={repos} showAdmin={showOnlyAdmin} />} />
          <Route exact path='/orgs' render={() => <Organizations orgs={orgs} showAdmin={showOnlyAdmin} />} />
          <Route exact path='/orgs/:org' render={({match}) => <Repos repositories={repos} showAdmin={showOnlyAdmin} orgToShow={match.params.org} />} />
          <Route exact path='/statistics/:id' component={Statistics} />
        </div>
      </BrowserRouter>

      {/* {renderDashboard()} */}
    </div>
  )
}

export default Dashboard
