import './App.css'
import React, { useState } from 'react'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import firebase from './utils/firebase/config'

const renderPage = () => {
  const [user, setUser] = useState(false)
  firebase.auth().onAuthStateChanged((userData) => {
    setUser(!!userData)
  })
  return user ? <Dashboard /> : <LoginPage />
}

function App () {
  return (
    <div className='container' style={{display: 'block', width: '100%', height: '100%'}}>
      {renderPage()}
    </div>
  )
}

export default App
