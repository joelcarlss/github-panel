import React from 'react'
import {Line} from 'react-chartjs-2'
import {Paper} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    magrin: theme.spacing.unit * 2
  }
})

const getBackgroundColors = (data) => {
  let backgroundColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)'
  ]
  let populatedArray = Array.from(Array(data.length), (_, index) => backgroundColors[index % backgroundColors.length])
  return populatedArray
}

const LineChart = ({classes, data, title}) => {
  let labels = data.map((a, index) => (index - data.length)) // TODO: Write actual week
  let backgroundColor = getBackgroundColors(data)
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Population',
        data,
        backgroundColor
      }
    ]
  }

  const lineComponent = () => {
    return (
      <Line
        data={chartData}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 25
          },
          legend: {
            display: true,
            position: true
          }
        }}
            />
    )
  }

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {lineComponent(chartData)}
      </Paper>
    </div>
  )
}

export default withStyles(styles)(LineChart)
