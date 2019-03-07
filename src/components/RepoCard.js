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
const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
}

const OnIssuesClick = (repo) => {

}
const OnVisitClick = (repo) => {
  console.log('Click on Visit Github')
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
      <CardActions>
        <Button size='small' color='primary'onClick={() => OnIssuesClick(repo)}>
          Issues
        </Button>
        <Button size='small' color='primary' onClick={() => OnVisitClick(repo)}>
          Visit Github
        </Button>
      </CardActions>
    </Card>
  )
}

RepoCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RepoCard)
