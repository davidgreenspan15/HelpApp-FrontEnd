import React from 'react'

const ProgressBar = (props) => {

  return(
    <div className="progress-bar">
    { props.progress >= 6
      ? <div className="filler" style={{width: `${props.progress}%`}}></div>
      : null
    }
    </div>
  )
}

export default ProgressBar
