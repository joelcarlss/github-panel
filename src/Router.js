
import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'

class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={App} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/dashboard' component={Dashboard} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router
