import './App.css'
import React, { useState } from 'react'
// import {Redirect} from 'react-router-dom'
import firebase from './utils/firebase/config'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

const renderPage = () => {
  const [user, setUser] = useState(false)
  firebase.auth().onAuthStateChanged((userData) => {
    setUser(!!userData)
  })
  // return user ? <Redirect to='/dashboard' /> : <Redirect to='/login' />
  return user ? <Dashboard /> : <LoginPage />
}

function App () { // Remove css
  return (
    <div className='container' style={{display: 'block', width: '100%', height: '100%'}}>
      {renderPage()}
    </div>
  )
}

export default App
