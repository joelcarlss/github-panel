import React, { Component } from 'react'
// import {Input} from '@material-ui/core'
import Login from '../components/Login'
import { loginUserToGithub } from '../utils/firebase/login'
import { Button } from '@material-ui/core'

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {username: ''}
  }
  onLoginClick () {
    loginUserToGithub()
  }
  render () {
    return (
      <div className='Login' style={{
        position: 'absolute',
        textAlign: 'center',
        margin: 'auto',
        width: '50%',
        height: '50%'}} >
        <Login onLoginClick={() => this.onLoginClick()}
          onUsernameChange={(event) => this.setState({username: event.target.value})} usernameValue={this.state.username}
          onPasswordChange={(event) => this.setState({password: event.target.value})} passwordValue={this.state.password}
        />
        <Button onClick={() => this.onLoginClick()}>hej</Button>
      </div>
    )
  }
}

export default LoginPage
