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

import { createWebHook } from '../utils/github/api'

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

const OnIssuesClick = (repo) => {

}
const OnSubscribe = (repo) => {
//   createWebHook(repo)
}
const subscribeButton = (repo) => {
  let buttonColor = 'primary'
  let subscribeText = 'Subscribe'
  if (repo.permissions.admin) {
    if (repo.webhooks.length > 0) {
      buttonColor = 'default'
      subscribeText = 'Edit subscription'
    }
    return (
      <Button size='small' variant='contained' color={buttonColor} onClick={() => OnSubscribe(repo)}>
        {subscribeText}
      </Button>
    )
  }
}

function RepoCard (props) {
  const { classes, repo } = props
  return (
    <Card className={classes.card} style={{width: '25%', margin: '0.2%'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={repo.owner.avatar_url}
          title={repo.owner.login}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {repo.name}
          </Typography>
          <Typography component='p'>
            Text
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{marginBottom: '0'}}>
        <Button size='small' variant='contained' onClick={() => OnIssuesClick(repo)}>
          Issues
        </Button>
        {subscribeButton(repo)}
      </CardActions>
    </Card>
  )
}

RepoCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RepoCard)
