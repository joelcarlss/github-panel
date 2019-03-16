import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import Organizations from '../components/Organizations'
import Menu from '../components/Menu'
import { logOut } from '../utils/firebase/login'
import { getToken } from '../utils/functions'
import { requestPermission } from '../utils/firebase/messaging'
import {updateDatabaseWithGithubDataByToken, setNoticesToRead, onRepos, onOrgs} from '../utils/firebase/database'
import { BrowserRouter, Route } from 'react-router-dom'
import { Chip } from '@material-ui/core'
import PopUpMessage from '../components/PopUpMessage'
import Statistics from '../components/Statistics'

function useLocalstorage (key, initialValue) {
  const [value, _setValue] = useState(window.localStorage.getItem(key) || initialValue)
  const setValue = _value => {
    window.localStorage.setItem(key, _value)
    _setValue(_value)
  }
  return [value, setValue]
}

const onLogoutClick = () => {
  logOut()
}

const Dashboard = () => {
  const [showOnlyAdmin, setShowOnlyAdmin] = useLocalstorage('showOnlyAdmin', false)
  const [showOrganisations, setShowOrganisations] = useLocalstorage('showOrganisations', false)
  const toggleShowAdmin = () => setShowOnlyAdmin(state => !state)
  const [repos, setRepos] = useState(false)
  const [orgs, setOrgs] = useState(false)
  const [showMenu, setShowMenu] = useState(null)
  const [orgToShow, setOrgToShow] = useState(false)

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

  const renderDashboard = () => {
    return (

        showOrganisations
      ? <Organizations orgs={orgs} showAdmin={showOnlyAdmin} setOrgToShow={setOrgToShow} setShowOrganisations={setShowOrganisations} />
      : <Repos repositories={repos} showAdmin={showOnlyAdmin} orgToShow={orgToShow} />

    )
  }

  return (
    <div>
      <BrowserRouter>
        <div>
          <PopUpMessage />
          <Menu showMenu={showMenu} setShowMenu={setShowMenu}
            showAdmin={showOnlyAdmin} setShowAdmin={() => toggleShowAdmin(showOnlyAdmin, setShowOnlyAdmin)}
            setShowOrganisations={setShowOrganisations} setOrgToShow={setOrgToShow} />

          <Navbar onLogoutClick={() => onLogoutClick()} onMenuClick={() => setShowMenu(true)} />

          {orgToShow ? <Chip label={orgToShow} onDelete={() => setOrgToShow(false)} /> : null}

          <Route exact path='/' component={renderDashboard} />
          <Route exact path='/statistics/:id' component={Statistics} />
        </div>
      </BrowserRouter>

      {/* {renderDashboard()} */}
    </div>
  )
}

export default Dashboard
