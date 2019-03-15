// import './App.css'
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
  return renderPage()
}

export default App
