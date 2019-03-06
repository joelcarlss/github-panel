import React from 'react'
import Navbar from '../components/Navbar'
import Repos from '../components/Repos'
// import firebase from './utils/firebase/config'

const onLogoutClick = () => {
  console.log('clock')
}
const Dashboard = () => {
  return (
    <div>
      <Navbar onLogoutClick={onLogoutClick()} onMenuClick={onLogoutClick()} />
      <Repos />
    </div>
  )
}

export default Dashboard
