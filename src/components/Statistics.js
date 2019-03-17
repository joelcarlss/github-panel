import React from 'react'
import Chart from './Chart'

const Statistics = (props) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      <p>{props.match.params.id}</p>
      <Chart />
    </div>
  )
}

export default Statistics
