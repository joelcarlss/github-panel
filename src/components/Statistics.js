import React from 'react'

const Statistics = (props) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      <p>{props.match.params.id}</p>
    </div>
  )
}

export default Statistics
