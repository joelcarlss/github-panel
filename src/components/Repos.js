import React from 'react'
import {Paper} from '@material-ui/core'

const Repos = (props) => {
  console.log('console.l  ' + props.repositories)
  return (
    <Paper>
      <p>Repos</p>
    </Paper>
  )
}

export default Repos
