
import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'

class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='container' style={{display: 'block', width: '100%', height: '100%'}}>
          <Route exact path='/' component={App} />
          <Route exact path='/dashboard' component={Dashboard} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router
