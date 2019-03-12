import React from 'react'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter } from '../utils/functions'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}

const showNotices = (notices) => {
  if (notices) {
    return notices.map((obj, index) => (
      <ListItem button key={index}>
        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
        <ListItemText primary={capitalizeFirstLetter(obj.title)} secondary={obj.repository.full_name} />
      </ListItem>
            ))
  }
}

const sideList = (classes, showAdmin, setShowAdmin, setShowOrganisations, notices) => (
  <div className={classes.list}>
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
      <ListItem button key={'Repositories'} onClick={() => setShowOrganisations(false)}>
        <ListItemText primary={'Repositories'} />
      </ListItem>
      <ListItem button key={'Organisations'} onClick={() => setShowOrganisations(false)}>
        <ListItemText primary={'Organisations'} />
      </ListItem>
    </List>
    <Divider />
    <List>
      {showNotices(notices)}
    </List>
  </div>
        )

const SwipeableTemporaryDrawer = (props) => {
  const {
    classes,
    showMenu,
    setShowMenu,
    showAdmin,
    setShowAdmin,
    setShowOrganisations,
    notices
  } = props
  return (
    <div>
      <SwipeableDrawer
        open={showMenu}
        onClose={() => setShowMenu(false)}
        onOpen={() => setShowMenu(true)}
        >
        <div
          tabIndex={0}
          role='button'
          onClick={() => setShowMenu(false)}
          onKeyDown={() => setShowMenu(false)}
          >
          {sideList(classes, showAdmin, setShowAdmin, setShowOrganisations, notices)}
        </div>
      </SwipeableDrawer>
    </div>
  )
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SwipeableTemporaryDrawer)
