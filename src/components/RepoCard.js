import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { createWebhookAndUpdateRepo, deleteWebhookAndUpdateRepo, findCorrectHookIdInRepo } from '../utils/functions'

const styles = {
  card: {
    maxWidth: 345,
    minWidth: 200
  },
  media: {
    height: 140

  },
  button: {
    color: 'gray'
  }
}

function RepoCard ({ classes, repo, history }) {
  const OnSubscribe = () => {
    createWebhookAndUpdateRepo(repo)
  }
  const OnUnsubscribe = (repo) => {
    deleteWebhookAndUpdateRepo(repo)
  }
  const subscribeButton = () => {
    if (repo.permissions.admin) {
      if (findCorrectHookIdInRepo(repo)) {
        return (
          <Button size='small' variant='contained' color={'default'} onClick={() => OnUnsubscribe(repo)}>
            Unsubscribe
          </Button>
        )
      } else {
        return (
          <Button size='small' variant='contained' color={'primary'} onClick={() => OnSubscribe(repo)}>
          Subscribe
        </Button>
        )
      }
    }
  }
  return (
    <Card className={classes.card} style={{width: '25%', margin: '0.2%'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={repo.owner.avatar_url}
          title={repo.owner.login}
          onClick={() => history.push('/statistics/' + repo.id)}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {repo.name}
          </Typography>
          <Typography component='p'>
            {`${repo.owner.type}: ${repo.owner.login}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{marginBottom: '0'}}>
        {subscribeButton()}
      </CardActions>
    </Card>
  )
}

RepoCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(RepoCard))
