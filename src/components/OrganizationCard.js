import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ImageAvatar from './ImageAvatar'

// import { createWebhookAndUpdateRepo, deleteWebhookAndUpdateRepo, findCorrectHookIdInRepo } from '../utils/functions'

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
      avatarList.push(<p>+{list.length}</p>)
    }
    return avatarList
  }
}

function OrganizationsCard (props) {
  const { classes, org, onCardClick } = props
  console.log(org)
  return (
    <Card className={classes.card} style={{width: '32%', margin: '0.2%'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title={org.login}
          onClick={onCardClick}
          image={org.avatar_url}
          />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {org.login}
          </Typography>
          <Typography component='p'>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'left'}}>
              {showMembers(org.members)}
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

OrganizationsCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OrganizationsCard)
