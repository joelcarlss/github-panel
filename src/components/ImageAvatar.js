import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const styles = {
  avatar: {
    margin: 0,
    marginLeft: '-10px',
    width: 30,
    height: 30
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
}

function ImageAvatar (props) {
  const { classes, alt, src } = props
  return (
    <Avatar alt={alt} src={src} className={classes.avatar} />
  )
}

ImageAvatar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ImageAvatar)
