import React from 'react'
import Tile from '../components/Tile.js'



class TilesContainer extends React.Component{

  renderTile = () => this.props.events.map(event => <Tile key={event.id} event={event}/>)

  render(){
    return  (

      <div className="main-container">
        {this.renderTile()}
      </div>
    )
  }
}

export default TilesContainer;
