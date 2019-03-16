import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ImageAvatar from './ImageAvatar'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  button: {
    color: 'gray'
  }
}

const showMembers = (members) => {
  if (members) {
    let list = members.splice(9, members.length) // Write out number of more after pictures
    let avatarList = members.map((item, i) => (
      <ImageAvatar key={i} alt={item.login} src={item.avatar_url} />
    ))
    if (list.length > 0) {
      avatarList.push(<p key={avatarList.length}>+{list.length}</p>)
    }
    return avatarList
  }
}

function OrganizationsCard (props) {
  const { classes, org } = props

  const onCardClick = () => {
    props.history.push('/orgs/' + org.login)
  }

  return (
    <Card className={classes.card} onClick={onCardClick} style={{width: '32%', margin: '0.2%'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title={org.login}
          image={org.avatar_url}
          />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {org.login}
          </Typography>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'left'}}>
            {showMembers(org.members)}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

OrganizationsCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(withRouter(OrganizationsCard))
