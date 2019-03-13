import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter } from '../utils/functions'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import {onNotices} from '../utils/firebase/database'

const styles = {
  list: {
    width: 250
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
    setOrgIdToShow
  } = props

  const [notices, setNotices] = useState(false)

  useEffect(() => {
    onNotices((doc) => setNotices(doc))
  }, [])

  const showNotices = (notices) => {
    if (notices) {
      return notices.map((obj, index) => (
        <ListItem button key={index}>
          <ListItemText primary={capitalizeFirstLetter(obj.title)} secondary={obj.repository.full_name} />
        </ListItem>
              ))
    }
  }

  const onReposClick = () => {
    setShowOrganisations(false)
    setOrgIdToShow(false)
  }

  const sideList = () => (
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
        <ListItem button key={'Repositories'} onClick={() => onReposClick()}>
          <ListItemText primary={'Repositories'} />
        </ListItem>
        <ListItem button key={'Organisations'} onClick={() => setShowOrganisations(true)}>
          <ListItemText primary={'Organisations'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {showNotices(notices)}
      </List>
    </div>
          )
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
          {sideList()}
        </div>
      </SwipeableDrawer>
    </div>
  )
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SwipeableTemporaryDrawer)
