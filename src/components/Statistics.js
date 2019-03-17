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

const contributionData = (contributors) => {
  if (!contributors) {
    return { authors: 0, commits: 0 }
  }
  let authors = contributors.map(({author}) => (author))
  let commits = contributors.map(({total}) => (total))
  return {
    authors,
    commits
  }
}

const Statistics = (props) => {
  const { repos } = useAppState()
  if (!repos) {
    return null
  }
  let repo = repos[props.match.params.id]
  if (!repo) {
    return null
  }
  let { authors, commits } = contributionData(repo.contributors)
  return (
    <div style={{width: '100%', textAlign: 'center'}}>
      <div style={{width: '70%', margin: 'auto'}}>
        <Typography variant='h5' component='h3'>{repo.name}</Typography>
        <LineChart data={repo.weeklyCommits} title={'Weekly Commits'} />
        <PieChart data={commits} labels={authors} title={'Contributors'} />
      </div>
    </div>
  )
}

export default Statistics
