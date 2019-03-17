import React from 'react'
import PieChart from './PieChart'
import LineChart from './LineChart'
import Typography from '@material-ui/core/Typography'

import {useAppState} from '../pages/useAppState'

const chartData = {
  labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
  data: [
    617594,
    181045,
    153060,
    106519,
    105162,
    95072
  ]
}

const Statistics = (props) => {
  const { repos } = useAppState()
  let repo = repos[props.match.params.id]
  if (!repo) {
    return null
  }
  console.log(repo)
  return (
    <div style={{width: '100%', textAlign: 'center'}}>
      <div style={{width: '70%', margin: 'auto'}}>
        <Typography variant='h5' component='h3'>Statistics</Typography>
        <p>{repo.name}</p>
        <LineChart data={chartData.data} labels={chartData.labels} title={'Weekly Commits'} />
        <PieChart data={chartData.data} labels={chartData.labels} title={'Contributors'} />
      </div>
    </div>
  )
}

export default Statistics
