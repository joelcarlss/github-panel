import React from 'react'

import { loginUserToGithub } from '../utils/firebase/login'
import { withStyles } from '@material-ui/core/styles'
// import '../login.css'

import LoginButton from '../components/LoginButton'

// const styles = {
//   button: {
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   wrapper: {
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     height: '100%',
//     marginTop: '20%'
//     // backgroundColor: 'black'
//   }

// }

const LoginPage = (props) => {
  const { classes } = props
  const onLoginClick = () => {
    loginUserToGithub()
  }
  return (
    <LoginButton onClick={() => onLoginClick()} className={classes.button} />
  )
}

export default withStyles()(LoginPage)
