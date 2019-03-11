import React from 'react'
import PropTypes from 'prop-types'
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

const sideList = (classes, showAdmin, setShowAdmin, setShowOrganisations) => (
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
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
              ))}
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
    setShowOrganisations
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
          {sideList(classes, showAdmin, setShowAdmin, setShowOrganisations)}
        </div>
      </SwipeableDrawer>
    </div>
  )
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SwipeableTemporaryDrawer)
