import React from 'react'
import {Line, Pie} from 'react-chartjs-2'
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

const PieChart = ({classes, data, labels, title}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Population',
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }
    ]
  }
  const pieComponent = () => {
    return (<Pie
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
        {pieComponent()}
      </Paper>
    </div>
  )
}

export default withStyles(styles)(PieChart)
