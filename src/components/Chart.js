import React from 'react'
import {Doughnut, Bar, Line, Pie} from 'react-chartjs-2'

const getChartData = () => {
  // Ajax calls here
  const obj = {
    chartData: {
      labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
      datasets: [
        {
          label: 'Population',
          data: [
            617594,
            181045,
            153060,
            106519,
            105162,
            95072
          ],
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
  }
  return obj
}

const Chart = (props) => {
  const {displayTitle = true,
    displayLegend = true,
    legendPosition = 'right',
    location = 'Massachusetts'
  } = props

  return (
    <div className='chart'>
      <Bar
        data={getChartData}
        options={{
          title: {
            display: displayTitle,
            text: 'Largest Cities In ' + location,
            fontSize: 25
          },
          legend: {
            display: displayLegend,
            position: legendPosition
          }
        }}
        />

      <Line
        data={getChartData}
        options={{
          title: {
            display: displayTitle,
            text: 'Largest Cities In ' + location,
            fontSize: 25
          },
          legend: {
            display: displayLegend,
            position: legendPosition
          }
        }}
        />

      <Pie
        data={getChartData}
        options={{
          title: {
            display: displayTitle,
            text: 'Largest Cities In ' + location,
            fontSize: 25
          },
          legend: {
            display: displayLegend,
            position: legendPosition
          }
        }}
        />
    </div>
  )
}

export default Chart
