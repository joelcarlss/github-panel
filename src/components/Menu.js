import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import Avatar from '@material-ui/core/Avatar'

import { capitalizeFirstLetter, formatTime } from '../utils/functions'
import { onNotices, deleteUserNotices } from '../utils/firebase/database'
import { ListItemAvatar, Typography } from '@material-ui/core'

const styles = {
  list: {
    width: 320
  },
  fullList: {
    width: 'auto'
  }
}

const SwipeableTemporaryDrawer = (props) => {
  const {
    classes,
    showMenu,
    setShowMenu,
    showAdmin,
    setShowAdmin,
    setShowOrganisations,
    setOrgToShow
  } = props

  const [notices, setNotices] = useState(false)

  useEffect(() => {
    onNotices((doc) => setNotices(doc))
  }, [])

  const onReposClick = () => {
    setShowOrganisations(false)
    setOrgToShow(false)
  }

  const onEventDeleteClick = () => {
    deleteUserNotices()
  }

  const showNotices = (notices) => {
    if (notices) {
      return notices.map((obj, index) => (
        <ListItem button key={index} disabled={(obj.read)}>
          <ListItemAvatar>
            <Avatar alt={obj.sender.login} src={obj.sender.avatar_url} />
          </ListItemAvatar>
          <ListItemText primary={getTitle(obj)} secondary={
            <React.Fragment>
              <Typography component='span' className={classes.inline} color='textPrimary'>
                {obj.repository.full_name}
              </Typography>
              {formatTime(obj.time)}
            </React.Fragment>} />
        </ListItem>
              ))
    }
  }

  const getTitle = (obj) => {
    let title
    let name = capitalizeFirstLetter(obj.sender.login)
    if (obj.issue) {
      let action = obj.action
      let type = obj.type.substring(0, obj.type.length - 1)
      title = `${name} ${action} an ${type}`
    } else if (obj.commits) {
      let type = obj.type
      let amount = obj.commits.length
      let commits = (amount === 1) ? 'commit' : 'commits'
      title = `${name} ${type}ed ${amount} ${commits}`
    } else {
      title = `New ${obj.type} by ${name}`
    }
    return title
  }

  const sideList = () => (
    <div className={classes.list}>
      <div
        tabIndex={0}
        role='button'
        onClick={() => setShowMenu(false)}
        onKeyDown={() => setShowMenu(false)}
          >
        <List>
          <ListItem button key={'Repositories'}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={showAdmin} onChange={setShowAdmin} aria-label='LoginSwitch' />
              }
                label={showAdmin ? 'All Repos' : 'Admin Repos'}
            />
            </FormGroup>
          </ListItem>
        </List>
        <List>
          <ListItem button key={'Repositories'} onClick={() => onReposClick()}>
            <ListItemText primary={'Repositories'} />
          </ListItem>
          <ListItem button key={'Organisations'} onClick={() => setShowOrganisations(true)}>
            <ListItemText primary={'Organisations'} />
          </ListItem>
        </List>
      </div>
      <div
        tabIndex={0}
        role='button'
        onClick={() => setShowMenu(true)}
        onKeyDown={() => setShowMenu(true)}
          >
        <Divider />
        <ListItem >
          <ListItemText primary='Notices' />
          <Fab aria-label='Delete' size='small' onClick={() => onEventDeleteClick()}>
            <DeleteIcon />
          </Fab>
        </ListItem>
        <List>
          {showNotices(notices)}
        </List>
      </div>
    </div>
          )
  return (
    <div>
      <SwipeableDrawer
        open={showMenu || false}
        onClose={() => setShowMenu(false)}
        onOpen={() => setShowMenu(true)}
        >
        {sideList()}
      </SwipeableDrawer>
    </div>
  )
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SwipeableTemporaryDrawer)
