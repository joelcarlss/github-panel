import React, { Component } from 'react'
import {Input, Paper, Button} from '@material-ui/core'
// import {Provider, Title, useTitle} from 'react-doc-title'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  render () {
    return (
      <div>
        <Paper>
          <Input placeholder={'Username'} onChange={(event) => this.props.onUsernameChange(event)} value={this.props.usernameValue} />
          <Input placeholder={'Password'} onChange={(event) => this.props.onPasswordChange(event)} value={this.state.passwordValue} />
          <Button onClick={(event) => this.props.onLoginClick(event)} >Log In</Button>
        </Paper>
      </div>
    )
  }
}

export default Login
