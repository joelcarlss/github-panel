import React from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import Organizations from '../components/Organizations'
import Menu from '../components/Menu'
import { logOut } from '../utils/firebase/login'
import { BrowserRouter, Route } from 'react-router-dom'
import useAppState from './useAppState'

import PopUpMessage from '../components/PopUpMessage'
import Statistics from '../components/Statistics'

const Dashboard = () => {
  const {
    showMenu,
    setShowMenu,
    showOnlyAdmin,
    setShowOnlyAdmin,
    toggleShowAdmin,
    repos,
    orgs
  } = useAppState()

  return (
    <div>
      <BrowserRouter>
        <div>
          <PopUpMessage />
          <Menu showMenu={showMenu} setShowMenu={setShowMenu}
            showAdmin={showOnlyAdmin} setShowAdmin={() => toggleShowAdmin(showOnlyAdmin, setShowOnlyAdmin)} />

          <Navbar onLogoutClick={() => logOut()} onMenuClick={() => setShowMenu(true)} />

          <Route exact path='/' render={() => <Repos repositories={repos} showAdmin={showOnlyAdmin} />} />
          <Route exact path='/orgs' render={() => <Organizations orgs={orgs} showAdmin={showOnlyAdmin} />} />
          <Route exact path='/orgs/:org' render={({match}) => <Repos repositories={repos} showAdmin={showOnlyAdmin} orgToShow={match.params.org} />} />
          <Route exact path='/statistics/:id' component={Statistics} />
        </div>
      </BrowserRouter>

    </div>
  )
}

export default Dashboard
