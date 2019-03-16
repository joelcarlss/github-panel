import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Badge from '@material-ui/core/Badge'

import {useAppState} from '../pages/useAppState'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

function Navbar ({onLogoutClick, classes}) {
  const { setShowMenu, noticeCount } = useAppState()

  const open = () => {
    setShowMenu(true)
    console.log('open')
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton className={classes.menuButton} color='inherit' aria-label='Menu' onClick={open}>
            <Badge color='secondary' badgeContent={noticeCount} className={classes.margin} invisible={(noticeCount < 1)}>
              <MenuIcon />
            </Badge>
          </IconButton>
          <Typography variant='h6' color='inherit' className={classes.grow}>
            GithubDashboard
          </Typography>
          <Button color='inherit' onClick={onLogoutClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)
