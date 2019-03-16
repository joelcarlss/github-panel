import React from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
import Organizations from '../components/Organizations'
import Menu from '../components/Menu'
import { logOut } from '../utils/firebase/login'
import { BrowserRouter, Route } from 'react-router-dom'
import {Provider} from './useAppState'

import PopUpMessage from '../components/PopUpMessage'
import Statistics from '../components/Statistics'

const Dashboard = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <PopUpMessage />
          <Menu />

          <Navbar onLogoutClick={() => logOut()} />

          <Route exact path='/' component={Repos} />
          <Route exact path='/orgs' component={Organizations} />
          <Route exact path='/orgs/:org' component={Repos} />
          <Route exact path='/statistics/:id' component={Statistics} />
        </div>
      </BrowserRouter>

    </div>
  )
}

export default () => <Provider><Dashboard /></Provider>
