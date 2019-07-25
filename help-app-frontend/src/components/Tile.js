import React from 'react'

class Tile extends React.Component{
  render(){
    return(
      <div>
        <h1>{this.props.event.title}</h1>
        <h2>{this.props.event.description}</h2>
        <h2>{this.props.event.goal}</h2>
        <h2>{this.props.event.raised_donation}</h2>
      </div>
    )
  }
}

export default Tile
